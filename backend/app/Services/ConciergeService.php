<?php

namespace App\Services;

use App\Models\Conversation;
use App\Models\Guest;
use App\Models\GuestHouse;
use App\Models\GuestRequest;
use App\Models\KnowledgeBase;
use App\Models\Message;
use App\Models\Recommendation;
use App\Models\Registration;
use App\Models\Transfer;
use App\Models\TransferBooking;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;

class ConciergeService
{
    public function __construct(
        protected GeminiService $gemini,
        protected TelegramService $telegram
    ) {}

    public function chat(Conversation $conversation, string $userMessage): string
    {
        $guest = $conversation->guest;
        $house = $conversation->guestHouse;

        // Save user message
        $conversation->messages()->create([
            'role' => 'user',
            'content' => $userMessage,
        ]);

        // Update guest activity
        $guest->update(['last_active_at' => now()]);

        // Build chat history for Gemini
        $contents = $this->buildContents($conversation);
        $systemInstruction = $this->buildSystemInstruction($guest, $house);
        $tools = $this->getFunctionDeclarations();

        $assistantText = $this->runAgentLoop($conversation, $guest, $house, $contents, $systemInstruction, $tools);

        // Save final assistant response
        $conversation->messages()->create([
            'role' => 'assistant',
            'content' => $assistantText,
        ]);

        return $assistantText;
    }

    protected function runAgentLoop(
        Conversation $conversation,
        Guest $guest,
        GuestHouse $house,
        array $contents,
        string $systemInstruction,
        array $tools,
        int $maxIterations = 5
    ): string {
        for ($i = 0; $i < $maxIterations; $i++) {
            $response = $this->gemini->generateContent($contents, $systemInstruction, $tools);

            $functionCall = $this->gemini->extractFunctionCallFromResponse($response);

            if (!$functionCall) {
                return $this->gemini->extractTextFromResponse($response)
                    ?? 'Kechirasiz, javob olishda xatolik yuz berdi.';
            }

            // Execute tool and get result
            $toolResult = $this->executeTool($functionCall['name'], $functionCall['args'] ?? [], $guest, $house);

            // Add model's function call turn to contents
            $contents[] = $this->gemini->getContent($response);

            // Add function response turn
            $contents[] = [
                'role' => 'user',
                'parts' => [[
                    'functionResponse' => [
                        'name' => $functionCall['name'],
                        'response' => ['result' => $toolResult],
                    ],
                ]],
            ];
        }

        return "Kechirasiz, so'rovingizni to'liq bajara olmadim. Iltimos, qayta urinib ko'ring.";
    }

    protected function executeTool(string $name, array $args, Guest $guest, GuestHouse $house): mixed
    {
        return match ($name) {
            'get_available_transfers' => $this->toolGetTransfers($house),
            'book_transfer' => $this->toolBookTransfer($args, $guest, $house),
            'get_house_rules' => $this->toolGetHouseRules($args, $house),
            'create_request' => $this->toolCreateRequest($args, $guest, $house),
            'get_recommendations' => $this->toolGetRecommendations($args, $house),
            'search_knowledge_base' => $this->toolSearchKnowledgeBase($args, $house),
            'request_registration_card' => $this->toolRequestRegistration($args, $guest, $house),
            default => ['error' => "Unknown tool: {$name}"],
        };
    }

    protected function toolGetTransfers(GuestHouse $house): array
    {
        $transfers = Transfer::where('guest_house_id', $house->id)
            ->orWhereNull('guest_house_id')
            ->where('is_active', true)
            ->get(['id', 'name', 'from_location', 'to_location', 'vehicle_type', 'capacity', 'price', 'currency', 'duration_minutes', 'description'])
            ->toArray();

        return ['transfers' => $transfers];
    }

    protected function toolBookTransfer(array $args, Guest $guest, GuestHouse $house): array
    {
        $transfer = Transfer::find($args['transfer_id'] ?? null);
        if (!$transfer) {
            return ['error' => 'Transfer topilmadi.'];
        }

        try {
            $pickupTime = Carbon::parse($args['pickup_time']);
        } catch (\Exception) {
            return ['error' => 'Noto\'g\'ri vaqt formati. Masalan: 2024-12-25 14:00'];
        }

        $booking = TransferBooking::create([
            'guest_id' => $guest->id,
            'transfer_id' => $transfer->id,
            'pickup_time' => $pickupTime,
            'pickup_location' => $args['pickup_location'] ?? $house->address,
            'passengers' => $args['passengers'] ?? 1,
            'notes' => $args['notes'] ?? null,
            'status' => 'pending',
        ]);

        // Telegram notification (non-blocking)
        try {
            $this->telegram->notifyNewBooking([
                'guest_name' => $guest->name,
                'transfer_name' => $transfer->name,
                'pickup_time' => $pickupTime->format('d.m.Y H:i'),
                'pickup_location' => $booking->pickup_location,
                'passengers' => $booking->passengers,
                'guest_house' => $house->name,
            ], $house->telegram_chat_id);
        } catch (\Exception $e) {
            Log::error('Telegram notification failed', ['error' => $e->getMessage()]);
        }

        return [
            'success' => true,
            'booking_id' => $booking->id,
            'transfer_name' => $transfer->name,
            'pickup_time' => $pickupTime->format('d.m.Y H:i'),
            'pickup_location' => $booking->pickup_location,
            'passengers' => $booking->passengers,
            'price' => $transfer->price,
            'currency' => $transfer->currency,
            'message' => 'Transfer muvaffaqiyatli bron qilindi! Admin tez orada tasdiqlab chiqadi.',
        ];
    }

    protected function toolGetHouseRules(array $args, GuestHouse $house): array
    {
        $query = $house->houseRules()->where('is_active', true);

        if (!empty($args['category'])) {
            $query->where('category', $args['category']);
        }

        $rules = $query->orderBy('sort_order')->get(['category', 'title', 'content'])->toArray();
        return ['rules' => $rules];
    }

    protected function toolCreateRequest(array $args, Guest $guest, GuestHouse $house): array
    {
        $request = GuestRequest::create([
            'guest_id' => $guest->id,
            'guest_house_id' => $house->id,
            'type' => $args['type'] ?? 'other',
            'subject' => $args['subject'],
            'description' => $args['description'],
            'priority' => $args['priority'] ?? 'medium',
            'status' => 'new',
        ]);

        try {
            $this->telegram->notifyNewRequest([
                'guest_name' => $guest->name,
                'type' => $request->type,
                'subject' => $request->subject,
                'priority' => $request->priority,
                'guest_house' => $house->name,
            ], $house->telegram_chat_id);
        } catch (\Exception $e) {
            Log::error('Telegram notification failed', ['error' => $e->getMessage()]);
        }

        return [
            'success' => true,
            'request_id' => $request->id,
            'message' => "So'rovingiz #{$request->id} raqami bilan qabul qilindi. Admin tez orada ko'rib chiqadi.",
        ];
    }

    protected function toolGetRecommendations(array $args, GuestHouse $house): array
    {
        $query = $house->recommendations()->where('is_active', true);

        if (!empty($args['category'])) {
            $query->where('category', $args['category']);
        }

        $recs = $query->get(['category', 'name', 'description', 'address', 'distance_text'])->toArray();
        return ['recommendations' => $recs];
    }

    protected function toolSearchKnowledgeBase(array $args, GuestHouse $house): array
    {
        $query = $args['query'] ?? '';
        $results = KnowledgeBase::where('is_active', true)
            ->where(function ($q) use ($house) {
                $q->where('guest_house_id', $house->id)->orWhereNull('guest_house_id');
            })
            ->where(function ($q) use ($query) {
                $q->where('question', 'LIKE', "%{$query}%")
                  ->orWhere('answer', 'LIKE', "%{$query}%");
            })
            ->limit(5)
            ->get(['question', 'answer'])
            ->toArray();

        return ['results' => $results];
    }

    protected function toolRequestRegistration(array $args, Guest $guest, GuestHouse $house): array
    {
        $registration = Registration::create([
            'guest_id' => $guest->id,
            'guest_house_id' => $house->id,
            'notes' => $args['notes'] ?? null,
            'status' => 'requested',
        ]);

        try {
            $this->telegram->notifyNewRegistration([
                'guest_name' => $guest->name,
                'guest_email' => $guest->email,
                'guest_house' => $house->name,
            ], $house->telegram_chat_id);
        } catch (\Exception $e) {
            Log::error('Telegram notification failed', ['error' => $e->getMessage()]);
        }

        return [
            'success' => true,
            'registration_id' => $registration->id,
            'message' => "Registratsiya kartochkasi so'rovi qabul qilindi. Admin kartochkani tayyorlab, {$guest->email} emailingizga yuboradi.",
        ];
    }

    protected function buildContents(Conversation $conversation): array
    {
        $messages = $conversation->messages()
            ->whereIn('role', ['user', 'assistant'])
            ->orderBy('id')
            ->get();

        return $messages->map(function (Message $msg) {
            return [
                'role' => $msg->role === 'assistant' ? 'model' : 'user',
                'parts' => [['text' => $msg->content]],
            ];
        })->toArray();
    }

    protected function buildSystemInstruction(Guest $guest, GuestHouse $house): string
    {
        $langMap = ['uz' => "o'zbek", 'ru' => 'rus', 'en' => 'ingliz'];
        $langName = $langMap[$guest->language] ?? 'ingliz';

        return <<<PROMPT
Sen "{$house->name}" mehmon uyining do'stona, professional virtual konsyerjisan.
Mehmon ismi: {$guest->name}. Til: {$langName}.
HAR DOIM mehmon yozgan tilda (o'zbek/rus/ingliz) javob ber.

Mehmonxona ma'lumotlari:
- Wi-Fi: {$house->wifi_name} (parol: {$house->wifi_password})
- Check-in: {$house->check_in_time}, Check-out: {$house->check_out_time}
- Manzil: {$house->address}
- Telefon: {$house->phone}

Qoidalar:
- Transfer: avval get_available_transfers ni chaqir, mehmon tanlagach book_transfer. Bron oldidan vaqt/yo'lovchi sonini tasdiqlat.
- Shikoyat/so'rov: create_request funksiyasini ishlat, so'rov raqamini ayt.
- Qoidalar: get_house_rules dan ol.
- Registratsiya kartochkasi so'rasa: request_registration_card, admin emailga yuborishini ayt.
- Atrofdagi joylar: get_recommendations.
- Aniq bilmasang: search_knowledge_base.

Qisqa, samimiy, aniq javob ber. Narx/ma'lumotni O'ZINGDAN TO'QIMA — faqat tool natijalaridan foydalan.
PROMPT;
    }

    protected function getFunctionDeclarations(): array
    {
        return [
            [
                'name' => 'get_available_transfers',
                'description' => 'Mavjud transfer xizmatlarini olish (airport, shaharlar orasidagi)',
                'parameters' => ['type' => 'object', 'properties' => new \stdClass()],
            ],
            [
                'name' => 'book_transfer',
                'description' => 'Transfer bron qilish',
                'parameters' => [
                    'type' => 'object',
                    'properties' => [
                        'transfer_id' => ['type' => 'integer', 'description' => 'Transfer ID'],
                        'pickup_time' => ['type' => 'string', 'description' => 'Olib ketish vaqti (YYYY-MM-DD HH:mm)'],
                        'pickup_location' => ['type' => 'string', 'description' => 'Olib ketish manzili'],
                        'passengers' => ['type' => 'integer', 'description' => 'Yo\'lovchilar soni'],
                        'notes' => ['type' => 'string', 'description' => 'Qo\'shimcha izoh'],
                    ],
                    'required' => ['transfer_id', 'pickup_time', 'pickup_location', 'passengers'],
                ],
            ],
            [
                'name' => 'get_house_rules',
                'description' => 'Mehmonxona qoidalarini olish',
                'parameters' => [
                    'type' => 'object',
                    'properties' => [
                        'category' => [
                            'type' => 'string',
                            'enum' => ['general', 'check_in', 'safety', 'pets', 'smoking', 'noise'],
                            'description' => 'Qoida kategoriyasi',
                        ],
                    ],
                ],
            ],
            [
                'name' => 'create_request',
                'description' => 'Mehmon so\'rovi yoki shikoyati yaratish',
                'parameters' => [
                    'type' => 'object',
                    'properties' => [
                        'type' => [
                            'type' => 'string',
                            'enum' => ['cleaning', 'maintenance', 'amenity', 'complaint', 'other'],
                        ],
                        'subject' => ['type' => 'string', 'description' => 'Mavzu'],
                        'description' => ['type' => 'string', 'description' => 'Batafsil tavsif'],
                        'priority' => [
                            'type' => 'string',
                            'enum' => ['low', 'medium', 'high'],
                        ],
                    ],
                    'required' => ['type', 'subject', 'description'],
                ],
            ],
            [
                'name' => 'get_recommendations',
                'description' => 'Yaqin atrofdagi joylar, restoranlar, diqqatga sazovor joylarni olish',
                'parameters' => [
                    'type' => 'object',
                    'properties' => [
                        'category' => [
                            'type' => 'string',
                            'enum' => ['restaurant', 'cafe', 'attraction', 'shopping', 'pharmacy', 'other'],
                        ],
                    ],
                ],
            ],
            [
                'name' => 'search_knowledge_base',
                'description' => 'Ko\'p so\'raladigan savollarga javob izlash',
                'parameters' => [
                    'type' => 'object',
                    'properties' => [
                        'query' => ['type' => 'string', 'description' => 'Qidiruv so\'zi'],
                    ],
                    'required' => ['query'],
                ],
            ],
            [
                'name' => 'request_registration_card',
                'description' => 'Registratsiya kartochkasi so\'rash',
                'parameters' => [
                    'type' => 'object',
                    'properties' => [
                        'notes' => ['type' => 'string', 'description' => 'Qo\'shimcha izoh'],
                    ],
                ],
            ],
        ];
    }
}
