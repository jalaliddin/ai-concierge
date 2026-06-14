<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\GuestRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class RequestController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $user = $request->user();
        $query = GuestRequest::with(['guest:id,name,email,room_number', 'guestHouse:id,name']);

        if (!$user->isSuperAdmin() && $user->guest_house_id) {
            $query->where('guest_house_id', $user->guest_house_id);
        }

        return response()->json($query->orderByDesc('created_at')->paginate(20));
    }

    public function update(Request $request, GuestRequest $guestRequest): JsonResponse
    {
        $data = $request->validate([
            'status' => 'required|in:new,in_progress,resolved',
            'priority' => 'sometimes|in:low,medium,high',
        ]);
        $guestRequest->update($data);
        return response()->json($guestRequest);
    }
}
