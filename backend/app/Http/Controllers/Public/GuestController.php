<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Conversation;
use App\Models\Guest;
use App\Models\GuestHouse;
use App\Services\ConciergeService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class GuestController extends Controller
{
    public function __construct(protected ConciergeService $concierge) {}

    public function resolve(string $token): JsonResponse
    {
        $house = GuestHouse::where('qr_token', $token)->where('is_active', true)->firstOrFail();

        return response()->json([
            'id' => $house->id,
            'name' => $house->name,
            'address' => $house->address,
            'phone' => $house->phone,
            'description' => $house->description,
            'wifi_name' => $house->wifi_name,
            'check_in_time' => $house->check_in_time,
            'check_out_time' => $house->check_out_time,
            'image' => $house->image,
            'primary_color' => $house->primary_color,
        ]);
    }

    public function start(Request $request): JsonResponse
    {
        $request->validate([
            'token' => 'required|string',
            'name' => 'required|string|max:100',
            'email' => 'required|email|max:150',
            'phone' => 'nullable|string|max:30',
            'room_number' => 'nullable|string|max:20',
            'language' => 'nullable|in:uz,ru,en',
        ]);

        $house = GuestHouse::where('qr_token', $request->token)->where('is_active', true)->firstOrFail();

        // Find or create guest by email+house
        $guest = Guest::firstOrCreate(
            ['email' => $request->email, 'guest_house_id' => $house->id],
            [
                'name' => $request->name,
                'phone' => $request->phone,
                'room_number' => $request->room_number,
                'language' => $request->input('language', 'uz'),
                'last_active_at' => now(),
            ]
        );

        // Update name/phone if guest already exists
        if (!$guest->wasRecentlyCreated) {
            $guest->update([
                'name' => $request->name,
                'phone' => $request->phone ?? $guest->phone,
                'room_number' => $request->room_number ?? $guest->room_number,
                'last_active_at' => now(),
            ]);
        }

        // Find or create active conversation
        $conversation = $guest->conversations()
            ->where('status', 'active')
            ->latest()
            ->first();

        if (!$conversation) {
            $conversation = Conversation::create([
                'guest_id' => $guest->id,
                'guest_house_id' => $house->id,
                'status' => 'active',
            ]);
        }

        return response()->json([
            'conversation_id' => $conversation->id,
            'guest' => [
                'id' => $guest->id,
                'name' => $guest->name,
                'language' => $guest->language,
            ],
            'house' => [
                'name' => $house->name,
                'primary_color' => $house->primary_color,
            ],
        ]);
    }

    public function chat(Request $request): JsonResponse
    {
        $request->validate([
            'conversation_id' => 'required|integer',
            'message' => 'required|string|max:2000',
        ]);

        $conversation = Conversation::with(['guest', 'guestHouse'])->findOrFail($request->conversation_id);

        if ($conversation->status !== 'active') {
            return response()->json(['error' => 'Suhbat yopilgan.'], 400);
        }

        $reply = $this->concierge->chat($conversation, $request->message);

        return response()->json(['message' => $reply]);
    }

    public function messages(int $conversationId): JsonResponse
    {
        $conversation = Conversation::findOrFail($conversationId);
        $messages = $conversation->messages()
            ->whereIn('role', ['user', 'assistant'])
            ->orderBy('id')
            ->get(['id', 'role', 'content', 'created_at']);

        return response()->json($messages);
    }

    public function rules(string $token): JsonResponse
    {
        $house = GuestHouse::where('qr_token', $token)->firstOrFail();
        $rules = $house->houseRules()->where('is_active', true)->orderBy('sort_order')->get();
        return response()->json($rules);
    }

    public function transfers(string $token): JsonResponse
    {
        $house = GuestHouse::where('qr_token', $token)->firstOrFail();
        $transfers = \App\Models\Transfer::where(function ($q) use ($house) {
            $q->where('guest_house_id', $house->id)->orWhereNull('guest_house_id');
        })->where('is_active', true)->get();
        return response()->json($transfers);
    }

    public function recommendations(string $token): JsonResponse
    {
        $house = GuestHouse::where('qr_token', $token)->firstOrFail();
        $recs = $house->recommendations()->where('is_active', true)->get();
        return response()->json($recs);
    }

    public function submitRequest(Request $request, string $token): JsonResponse
    {
        $request->validate([
            'conversation_id' => 'required|integer',
            'type' => 'required|in:cleaning,maintenance,amenity,complaint,other',
            'subject' => 'required|string|max:200',
            'description' => 'required|string|max:2000',
            'priority' => 'nullable|in:low,medium,high',
        ]);

        $house = GuestHouse::where('qr_token', $token)->firstOrFail();
        $conversation = Conversation::findOrFail($request->conversation_id);

        \App\Models\GuestRequest::create([
            'guest_id' => $conversation->guest_id,
            'guest_house_id' => $house->id,
            'type' => $request->type,
            'subject' => $request->subject,
            'description' => $request->description,
            'priority' => $request->input('priority', 'medium'),
        ]);

        return response()->json(['message' => 'So\'rovingiz qabul qilindi.']);
    }
}
