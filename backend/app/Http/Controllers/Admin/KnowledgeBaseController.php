<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\KnowledgeBase;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class KnowledgeBaseController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $user = $request->user();
        $query = KnowledgeBase::with('guestHouse:id,name');

        if (!$user->isSuperAdmin() && $user->guest_house_id) {
            $query->where(fn ($q) => $q->where('guest_house_id', $user->guest_house_id)->orWhereNull('guest_house_id'));
        }

        return response()->json($query->orderBy('category')->get());
    }

    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'guest_house_id' => 'nullable|exists:guest_houses,id',
            'category' => 'required|string|max:100',
            'question' => 'required|string',
            'answer' => 'required|string',
            'language' => 'nullable|string|max:5',
            'is_active' => 'boolean',
        ]);
        return response()->json(KnowledgeBase::create($data), 201);
    }

    public function show(KnowledgeBase $knowledgeBase): JsonResponse
    {
        return response()->json($knowledgeBase);
    }

    public function update(Request $request, KnowledgeBase $knowledgeBase): JsonResponse
    {
        $data = $request->validate([
            'category' => 'sometimes|string|max:100',
            'question' => 'sometimes|string',
            'answer' => 'sometimes|string',
            'language' => 'nullable|string|max:5',
            'is_active' => 'boolean',
        ]);
        $knowledgeBase->update($data);
        return response()->json($knowledgeBase);
    }

    public function destroy(KnowledgeBase $knowledgeBase): JsonResponse
    {
        $knowledgeBase->delete();
        return response()->json(null, 204);
    }
}
