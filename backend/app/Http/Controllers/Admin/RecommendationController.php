<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Recommendation;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class RecommendationController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $user = $request->user();
        $query = Recommendation::with('guestHouse:id,name');

        if (!$user->isSuperAdmin() && $user->guest_house_id) {
            $query->where('guest_house_id', $user->guest_house_id);
        }

        return response()->json($query->orderBy('category')->get());
    }

    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'guest_house_id' => 'required|exists:guest_houses,id',
            'category' => 'required|in:restaurant,cafe,attraction,shopping,pharmacy,other',
            'name' => 'required|string|max:200',
            'description' => 'required|string',
            'address' => 'nullable|string|max:300',
            'distance_text' => 'nullable|string|max:50',
            'latitude' => 'nullable|numeric',
            'longitude' => 'nullable|numeric',
            'image' => 'nullable|string',
            'is_active' => 'boolean',
        ]);
        return response()->json(Recommendation::create($data), 201);
    }

    public function show(Recommendation $recommendation): JsonResponse
    {
        return response()->json($recommendation);
    }

    public function update(Request $request, Recommendation $recommendation): JsonResponse
    {
        $data = $request->validate([
            'category' => 'sometimes|in:restaurant,cafe,attraction,shopping,pharmacy,other',
            'name' => 'sometimes|string|max:200',
            'description' => 'sometimes|string',
            'address' => 'nullable|string|max:300',
            'distance_text' => 'nullable|string|max:50',
            'latitude' => 'nullable|numeric',
            'longitude' => 'nullable|numeric',
            'image' => 'nullable|string',
            'is_active' => 'boolean',
        ]);
        $recommendation->update($data);
        return response()->json($recommendation);
    }

    public function destroy(Recommendation $recommendation): JsonResponse
    {
        $recommendation->delete();
        return response()->json(null, 204);
    }
}
