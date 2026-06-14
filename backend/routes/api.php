<?php

use App\Http\Controllers\Admin;
use App\Http\Controllers\Landing;
use App\Http\Controllers\Public;
use Illuminate\Support\Facades\Route;

// ─── Public API (mehmon QR - authsiz) ──────────────────────────────────────
Route::prefix('public')->middleware(['throttle:60,1'])->group(function () {
    Route::get('resolve/{token}', [Public\GuestController::class, 'resolve']);
    Route::post('start', [Public\GuestController::class, 'start']);
    Route::post('chat', [Public\GuestController::class, 'chat'])->middleware('throttle:20,1');
    Route::get('chat/{conversationId}/messages', [Public\GuestController::class, 'messages']);
    Route::get('{token}/rules', [Public\GuestController::class, 'rules']);
    Route::get('{token}/transfers', [Public\GuestController::class, 'transfers']);
    Route::get('{token}/recommendations', [Public\GuestController::class, 'recommendations']);
    Route::post('{token}/request', [Public\GuestController::class, 'submitRequest']);
});

// ─── Landing API (khivatourguide.com - authsiz) ─────────────────────────────
Route::prefix('landing')->group(function () {
    Route::get('catalog', [Landing\CatalogController::class, 'catalog']);
    Route::get('transfers', [Landing\CatalogController::class, 'transfers']);
    Route::get('transfers/{slug}', [Landing\CatalogController::class, 'transfer']);
    Route::get('services', [Landing\CatalogController::class, 'services']);
    Route::get('services/{slug}', [Landing\CatalogController::class, 'service']);
    Route::get('posts', [Landing\CatalogController::class, 'posts']);
    Route::get('posts/{slug}', [Landing\CatalogController::class, 'post']);
    Route::post('order', [Landing\CatalogController::class, 'placeOrder'])->middleware('throttle:10,1');
    Route::get('order/{orderNumber}', [Landing\CatalogController::class, 'orderStatus']);
});

// Dinamik sitemap
Route::get('/sitemap.xml', [Landing\CatalogController::class, 'sitemap']);

// ─── Admin API (auth:sanctum) ────────────────────────────────────────────────
Route::post('login', [Admin\AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('logout', [Admin\AuthController::class, 'logout']);
    Route::get('me', [Admin\AuthController::class, 'me']);

    // Dashboard
    Route::get('dashboard/stats', [Admin\DashboardController::class, 'stats']);

    // CRUD resurslar
    Route::apiResource('guest-houses', Admin\GuestHouseController::class);
    Route::get('guest-houses/{guest_house}/qr', [Admin\GuestHouseController::class, 'qrCode']);

    Route::apiResource('transfers', Admin\TransferController::class);
    Route::apiResource('services', Admin\ServiceController::class);
    Route::apiResource('house-rules', Admin\HouseRuleController::class);
    Route::apiResource('knowledge-base', Admin\KnowledgeBaseController::class);
    Route::apiResource('recommendations', Admin\RecommendationController::class);
    Route::apiResource('posts', Admin\PostController::class);

    // Bronlar
    Route::get('transfer-bookings', [Admin\BookingController::class, 'index']);
    Route::patch('transfer-bookings/{transferBooking}', [Admin\BookingController::class, 'update']);

    // Buyurtmalar
    Route::get('orders', [Admin\OrderController::class, 'index']);
    Route::get('orders/{order}', [Admin\OrderController::class, 'show']);
    Route::patch('orders/{order}', [Admin\OrderController::class, 'update']);

    // So'rovlar
    Route::get('requests', [Admin\RequestController::class, 'index']);
    Route::patch('requests/{guestRequest}', [Admin\RequestController::class, 'update']);

    // Registratsiyalar
    Route::get('registrations', [Admin\RegistrationController::class, 'index']);
    Route::post('registrations/{registration}/upload', [Admin\RegistrationController::class, 'upload']);
    Route::post('registrations/{registration}/send', [Admin\RegistrationController::class, 'send']);

    // Suhbatlar
    Route::get('conversations', [Admin\ConversationController::class, 'index']);
    Route::get('conversations/{conversation}', [Admin\ConversationController::class, 'show']);
});
