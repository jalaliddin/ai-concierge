<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Service;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ServiceController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(Service::orderBy('sort_order')->get());
    }

    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'category' => 'required|in:tour,guide,excursion,activity,other',
            'name' => 'required|string|max:200',
            'slug' => 'nullable|string|unique:services,slug',
            'short_description' => 'nullable|string|max:300',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'currency' => 'nullable|string|max:3',
            'duration_text' => 'nullable|string|max:100',
            'image' => 'nullable|string',
            'gallery' => 'nullable|array',
            'meta_title' => 'nullable|string|max:200',
            'meta_description' => 'nullable|string|max:300',
            'show_on_landing' => 'boolean',
            'sort_order' => 'integer',
            'is_active' => 'boolean',
        ]);

        return response()->json(Service::create($data), 201);
    }

    public function show(Service $service): JsonResponse
    {
        return response()->json($service);
    }

    public function update(Request $request, Service $service): JsonResponse
    {
        $data = $request->validate([
            'category' => 'sometimes|in:tour,guide,excursion,activity,other',
            'name' => 'sometimes|string|max:200',
            'slug' => 'nullable|string|unique:services,slug,' . $service->id,
            'short_description' => 'nullable|string|max:300',
            'description' => 'sometimes|string',
            'price' => 'sometimes|numeric|min:0',
            'currency' => 'nullable|string|max:3',
            'duration_text' => 'nullable|string|max:100',
            'image' => 'nullable|string',
            'gallery' => 'nullable|array',
            'meta_title' => 'nullable|string|max:200',
            'meta_description' => 'nullable|string|max:300',
            'show_on_landing' => 'boolean',
            'sort_order' => 'integer',
            'is_active' => 'boolean',
        ]);

        $service->update($data);
        return response()->json($service);
    }

    public function destroy(Service $service): JsonResponse
    {
        $service->delete();
        return response()->json(null, 204);
    }
}
