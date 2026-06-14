<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\HouseRule;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class HouseRuleController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $user = $request->user();
        $query = HouseRule::with('guestHouse:id,name');

        if (!$user->isSuperAdmin() && $user->guest_house_id) {
            $query->where('guest_house_id', $user->guest_house_id);
        }

        return response()->json($query->orderBy('sort_order')->get());
    }

    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'guest_house_id' => 'required|exists:guest_houses,id',
            'category' => 'required|in:general,check_in,safety,pets,smoking,noise',
            'title' => 'required|string|max:200',
            'content' => 'required|string',
            'sort_order' => 'integer',
            'language' => 'string|max:5',
            'is_active' => 'boolean',
        ]);
        return response()->json(HouseRule::create($data), 201);
    }

    public function show(HouseRule $houseRule): JsonResponse
    {
        return response()->json($houseRule);
    }

    public function update(Request $request, HouseRule $houseRule): JsonResponse
    {
        $data = $request->validate([
            'category' => 'sometimes|in:general,check_in,safety,pets,smoking,noise',
            'title' => 'sometimes|string|max:200',
            'content' => 'sometimes|string',
            'sort_order' => 'integer',
            'language' => 'string|max:5',
            'is_active' => 'boolean',
        ]);
        $houseRule->update($data);
        return response()->json($houseRule);
    }

    public function destroy(HouseRule $houseRule): JsonResponse
    {
        $houseRule->delete();
        return response()->json(null, 204);
    }
}
