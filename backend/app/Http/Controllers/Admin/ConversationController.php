<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Conversation;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ConversationController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $user = $request->user();
        $query = Conversation::with(['guest:id,name,email,room_number', 'guestHouse:id,name']);

        if (!$user->isSuperAdmin() && $user->guest_house_id) {
            $query->where('guest_house_id', $user->guest_house_id);
        }

        return response()->json($query->orderByDesc('updated_at')->paginate(20));
    }

    public function show(Conversation $conversation): JsonResponse
    {
        $conversation->load(['guest', 'guestHouse', 'messages']);
        return response()->json($conversation);
    }
}
