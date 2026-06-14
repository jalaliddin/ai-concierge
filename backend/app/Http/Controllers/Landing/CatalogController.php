<?php

namespace App\Http\Controllers\Landing;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Post;
use App\Models\Service;
use App\Models\Transfer;
use App\Services\TelegramService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class CatalogController extends Controller
{
    public function __construct(protected TelegramService $telegram) {}

    public function catalog(): JsonResponse
    {
        $transfers = Transfer::where('show_on_landing', true)->where('is_active', true)
            ->orderBy('price')->get();
        $services = Service::where('show_on_landing', true)->where('is_active', true)
            ->orderBy('sort_order')->get();

        return response()->json([
            'transfers' => $transfers,
            'services' => $services,
        ]);
    }

    public function transfers(Request $request): JsonResponse
    {
        $transfers = Transfer::where('show_on_landing', true)->where('is_active', true)
            ->orderBy('price')->get();
        return response()->json($transfers);
    }

    public function transfer(string $slug): JsonResponse
    {
        $transfer = Transfer::where('slug', $slug)->where('show_on_landing', true)->firstOrFail();
        return response()->json($transfer);
    }

    public function services(Request $request): JsonResponse
    {
        $query = Service::where('show_on_landing', true)->where('is_active', true);

        if ($request->filled('category')) {
            $query->where('category', $request->category);
        }

        return response()->json($query->orderBy('sort_order')->get());
    }

    public function service(string $slug): JsonResponse
    {
        $service = Service::where('slug', $slug)->where('show_on_landing', true)->firstOrFail();
        return response()->json($service);
    }

    public function posts(Request $request): JsonResponse
    {
        $posts = Post::published()
            ->when($request->filled('language'), fn ($q) => $q->where('language', $request->language))
            ->orderByDesc('published_at')
            ->get(['id', 'title', 'slug', 'excerpt', 'cover_image', 'language', 'published_at']);
        return response()->json($posts);
    }

    public function post(string $slug): JsonResponse
    {
        $post = Post::published()->where('slug', $slug)->firstOrFail();
        return response()->json($post);
    }

    public function placeOrder(Request $request): JsonResponse
    {
        $request->validate([
            'customer.name' => 'required|string|max:100',
            'customer.email' => 'required|email|max:150',
            'customer.phone' => 'required|string|max:30',
            'customer.preferred_date' => 'nullable|date',
            'customer.passengers' => 'nullable|integer|min:1|max:50',
            'customer.notes' => 'nullable|string|max:1000',
            'customer.language' => 'nullable|string|max:5',
            'items' => 'required|array|min:1',
            'items.*.type' => 'required|in:transfer,service',
            'items.*.id' => 'required|integer',
            'items.*.quantity' => 'nullable|integer|min:1',
            'items.*.pickup_location' => 'nullable|string|max:200',
            'items.*.scheduled_at' => 'nullable|date',
            '_honeypot' => 'max:0', // anti-spam
        ]);

        $customer = $request->customer;
        $itemsInput = $request->items;

        // Calculate total from DB (never trust frontend price)
        $total = 0;
        $resolvedItems = [];

        foreach ($itemsInput as $item) {
            $qty = $item['quantity'] ?? 1;

            if ($item['type'] === 'transfer') {
                $model = Transfer::where('id', $item['id'])->where('is_active', true)->first();
                $modelClass = Transfer::class;
            } else {
                $model = Service::where('id', $item['id'])->where('is_active', true)->first();
                $modelClass = Service::class;
            }

            if (!$model) {
                return response()->json(['error' => "Mahsulot #{$item['id']} topilmadi."], 422);
            }

            $lineTotal = $model->price * $qty;
            $total += $lineTotal;

            $resolvedItems[] = [
                'model' => $model,
                'model_class' => $modelClass,
                'quantity' => $qty,
                'pickup_location' => $item['pickup_location'] ?? null,
                'scheduled_at' => $item['scheduled_at'] ?? null,
                'line_total' => $lineTotal,
            ];
        }

        $order = DB::transaction(function () use ($customer, $resolvedItems, $total) {
            $order = Order::create([
                'customer_name' => $customer['name'],
                'customer_email' => $customer['email'],
                'customer_phone' => $customer['phone'],
                'preferred_date' => $customer['preferred_date'] ?? null,
                'passengers' => $customer['passengers'] ?? null,
                'total' => $total,
                'currency' => 'USD',
                'notes' => $customer['notes'] ?? null,
                'language' => $customer['language'] ?? 'en',
                'status' => 'new',
                'source' => 'landing',
            ]);

            foreach ($resolvedItems as $item) {
                OrderItem::create([
                    'order_id' => $order->id,
                    'itemable_type' => $item['model_class'],
                    'itemable_id' => $item['model']->id,
                    'item_name' => $item['model']->name,
                    'unit_price' => $item['model']->price,
                    'quantity' => $item['quantity'],
                    'pickup_location' => $item['pickup_location'],
                    'scheduled_at' => $item['scheduled_at'],
                    'line_total' => $item['line_total'],
                ]);
            }

            return $order;
        });

        // Telegram notification
        try {
            $this->telegram->notifyNewOrder([
                'order_number' => $order->order_number,
                'customer_name' => $order->customer_name,
                'customer_email' => $order->customer_email,
                'customer_phone' => $order->customer_phone,
                'total' => $order->total,
                'currency' => $order->currency,
            ]);
        } catch (\Exception $e) {
            Log::error('Telegram order notification failed', ['error' => $e->getMessage()]);
        }

        return response()->json([
            'order_number' => $order->order_number,
            'total' => $order->total,
            'currency' => $order->currency,
            'message' => 'Buyurtmangiz qabul qilindi! Tez orada siz bilan bog\'lanamiz.',
        ], 201);
    }

    public function orderStatus(string $orderNumber): JsonResponse
    {
        $order = Order::with('items')->where('order_number', $orderNumber)->firstOrFail();
        return response()->json([
            'order_number' => $order->order_number,
            'status' => $order->status,
            'total' => $order->total,
            'currency' => $order->currency,
            'customer_name' => $order->customer_name,
            'preferred_date' => $order->preferred_date,
            'items' => $order->items->map(fn ($i) => [
                'name' => $i->item_name,
                'quantity' => $i->quantity,
                'unit_price' => $i->unit_price,
                'line_total' => $i->line_total,
            ]),
        ]);
    }

    public function sitemap(): \Illuminate\Http\Response
    {
        $locales = ['uz', 'ru', 'en'];
        $baseUrl = rtrim(config('app.url'), '/');
        $landingUrl = rtrim(env('LANDING_URL', $baseUrl), '/');

        $urls = [];

        // Static pages
        foreach ($locales as $locale) {
            $urls[] = ['loc' => "{$landingUrl}/{$locale}", 'priority' => '1.0'];
            $urls[] = ['loc' => "{$landingUrl}/{$locale}/transfers", 'priority' => '0.9'];
            $urls[] = ['loc' => "{$landingUrl}/{$locale}/services", 'priority' => '0.9'];
            $urls[] = ['loc' => "{$landingUrl}/{$locale}/blog", 'priority' => '0.7'];
        }

        // Transfers
        $transfers = Transfer::where('show_on_landing', true)->where('is_active', true)->whereNotNull('slug')->get();
        foreach ($transfers as $transfer) {
            foreach ($locales as $locale) {
                $urls[] = [
                    'loc' => "{$landingUrl}/{$locale}/transfers/{$transfer->slug}",
                    'lastmod' => $transfer->updated_at->toDateString(),
                    'priority' => '0.8',
                ];
            }
        }

        // Services
        $services = Service::where('show_on_landing', true)->where('is_active', true)->get();
        foreach ($services as $service) {
            foreach ($locales as $locale) {
                $urls[] = [
                    'loc' => "{$landingUrl}/{$locale}/services/{$service->slug}",
                    'lastmod' => $service->updated_at->toDateString(),
                    'priority' => '0.8',
                ];
            }
        }

        // Blog posts
        $posts = Post::published()->get();
        foreach ($posts as $post) {
            $urls[] = [
                'loc' => "{$landingUrl}/{$post->language}/blog/{$post->slug}",
                'lastmod' => $post->updated_at->toDateString(),
                'priority' => '0.6',
            ];
        }

        $xml = '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
        $xml .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" ';
        $xml .= 'xmlns:xhtml="http://www.w3.org/1999/xhtml">' . "\n";

        foreach ($urls as $url) {
            $xml .= "  <url>\n";
            $xml .= "    <loc>{$url['loc']}</loc>\n";
            if (isset($url['lastmod'])) {
                $xml .= "    <lastmod>{$url['lastmod']}</lastmod>\n";
            }
            $xml .= "    <changefreq>weekly</changefreq>\n";
            $xml .= "    <priority>{$url['priority']}</priority>\n";
            $xml .= "  </url>\n";
        }

        $xml .= '</urlset>';

        return response($xml, 200)->header('Content-Type', 'application/xml');
    }
}
