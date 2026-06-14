<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Transfer;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class TransferController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $user = $request->user();
        $query = Transfer::query();

        if (!$user->isSuperAdmin() && $user->guest_house_id) {
            $query->where(fn ($q) => $q->where('guest_house_id', $user->guest_house_id)->orWhereNull('guest_house_id'));
        }

        return response()->json($query->with('guestHouse:id,name')->orderBy('name')->get());
    }

    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'guest_house_id' => 'nullable|exists:guest_houses,id',
            'name' => 'required|string|max:200',
            'from_location' => 'required|string|max:150',
            'to_location' => 'required|string|max:150',
            'vehicle_type' => 'required|in:sedan,minivan,bus',
            'capacity' => 'required|integer|min:1',
            'price' => 'required|numeric|min:0',
            'currency' => 'nullable|string|max:3',
            'duration_minutes' => 'nullable|integer',
            'description' => 'nullable|string',
            'image' => 'nullable|string',
            'show_on_landing' => 'boolean',
            'slug' => 'nullable|string|unique:transfers,slug',
            'meta_title' => 'nullable|string|max:200',
            'meta_description' => 'nullable|string|max:300',
            'is_active' => 'boolean',
        ]);

        if (empty($data['slug'])) {
            $data['slug'] = Str::slug($data['name'] . '-' . Str::random(6));
        }

        $transfer = Transfer::create($data);
        return response()->json($transfer, 201);
    }

    public function show(Transfer $transfer): JsonResponse
    {
        return response()->json($transfer->load('guestHouse:id,name'));
    }

    public function update(Request $request, Transfer $transfer): JsonResponse
    {
        $data = $request->validate([
            'guest_house_id' => 'nullable|exists:guest_houses,id',
            'name' => 'sometimes|string|max:200',
            'from_location' => 'sometimes|string|max:150',
            'to_location' => 'sometimes|string|max:150',
            'vehicle_type' => 'sometimes|in:sedan,minivan,bus',
            'capacity' => 'sometimes|integer|min:1',
            'price' => 'sometimes|numeric|min:0',
            'currency' => 'nullable|string|max:3',
            'duration_minutes' => 'nullable|integer',
            'description' => 'nullable|string',
            'image' => 'nullable|string',
            'show_on_landing' => 'boolean',
            'slug' => 'nullable|string|unique:transfers,slug,' . $transfer->id,
            'meta_title' => 'nullable|string|max:200',
            'meta_description' => 'nullable|string|max:300',
            'is_active' => 'boolean',
        ]);

        $transfer->update($data);
        return response()->json($transfer);
    }

    public function destroy(Transfer $transfer): JsonResponse
    {
        $transfer->delete();
        return response()->json(null, 204);
    }
}
