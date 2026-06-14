<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\GuestHouse;
use App\Services\QrService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class GuestHouseController extends Controller
{
    public function __construct(protected QrService $qr) {}

    public function index(Request $request): JsonResponse
    {
        $user = $request->user();
        $query = GuestHouse::query();

        if (!$user->isSuperAdmin()) {
            $query->where('id', $user->guest_house_id);
        }

        return response()->json($query->orderBy('name')->get());
    }

    public function store(Request $request): JsonResponse
    {
        if (!$request->user()->isSuperAdmin()) {
            return response()->json(['message' => 'Ruxsat yo\'q.'], 403);
        }
        $data = $request->validate([
            'name' => 'required|string|max:150',
            'address' => 'required|string|max:300',
            'phone' => 'nullable|string|max:30',
            'description' => 'nullable|string',
            'wifi_name' => 'nullable|string|max:100',
            'wifi_password' => 'nullable|string|max:100',
            'check_in_time' => 'nullable|string|max:20',
            'check_out_time' => 'nullable|string|max:20',
            'primary_color' => 'nullable|string|max:10',
            'telegram_chat_id' => 'nullable|string|max:50',
            'is_active' => 'boolean',
        ]);

        $house = GuestHouse::create($data);
        return response()->json($house, 201);
    }

    public function show(GuestHouse $guestHouse): JsonResponse
    {
        return response()->json($guestHouse);
    }

    public function update(Request $request, GuestHouse $guestHouse): JsonResponse
    {
        $data = $request->validate([
            'name' => 'sometimes|string|max:150',
            'address' => 'sometimes|string|max:300',
            'phone' => 'nullable|string|max:30',
            'description' => 'nullable|string',
            'wifi_name' => 'nullable|string|max:100',
            'wifi_password' => 'nullable|string|max:100',
            'check_in_time' => 'nullable|string|max:20',
            'check_out_time' => 'nullable|string|max:20',
            'primary_color' => 'nullable|string|max:10',
            'telegram_chat_id' => 'nullable|string|max:50',
            'is_active' => 'boolean',
        ]);

        $guestHouse->update($data);
        return response()->json($guestHouse);
    }

    public function destroy(GuestHouse $guestHouse): JsonResponse
    {
        $guestHouse->delete();
        return response()->json(null, 204);
    }

    public function qrCode(GuestHouse $guestHouse): \Illuminate\Http\Response
    {
        $png = $this->qr->generatePng($guestHouse);
        return response($png, 200)->header('Content-Type', 'image/png');
    }
}
