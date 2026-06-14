<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\TransferBooking;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class BookingController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $user = $request->user();
        $query = TransferBooking::with(['guest:id,name,email,room_number', 'transfer:id,name,from_location,to_location']);

        if (!$user->isSuperAdmin() && $user->guest_house_id) {
            $query->whereHas('guest', fn ($q) => $q->where('guest_house_id', $user->guest_house_id));
        }

        return response()->json($query->orderByDesc('created_at')->paginate(20));
    }

    public function update(Request $request, TransferBooking $transferBooking): JsonResponse
    {
        $data = $request->validate([
            'status' => 'required|in:pending,confirmed,completed,cancelled',
        ]);
        $transferBooking->update($data);
        return response()->json($transferBooking);
    }
}
