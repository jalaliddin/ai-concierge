<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Conversation;
use App\Models\Guest;
use App\Models\GuestRequest;
use App\Models\Order;
use App\Models\TransferBooking;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function stats(Request $request): JsonResponse
    {
        $user = $request->user();
        $guestHouseId = $user->isSuperAdmin() ? null : $user->guest_house_id;

        $today = Carbon::today();
        $weekAgo = Carbon::now()->subWeek();

        $guestsToday = Guest::when($guestHouseId, fn ($q) => $q->where('guest_house_id', $guestHouseId))
            ->whereDate('created_at', $today)->count();

        $activeConversations = Conversation::when($guestHouseId, fn ($q) => $q->where('guest_house_id', $guestHouseId))
            ->where('status', 'active')->count();

        $pendingBookings = TransferBooking::when($guestHouseId, function ($q) use ($guestHouseId) {
            $q->whereHas('guest', fn ($g) => $g->where('guest_house_id', $guestHouseId));
        })->where('status', 'pending')->count();

        $pendingOrders = $user->isSuperAdmin()
            ? Order::where('status', 'new')->count()
            : 0;

        $newRequests = GuestRequest::when($guestHouseId, fn ($q) => $q->where('guest_house_id', $guestHouseId))
            ->where('status', 'new')->count();

        // Weekly guests chart
        $weeklyGuests = Guest::when($guestHouseId, fn ($q) => $q->where('guest_house_id', $guestHouseId))
            ->where('created_at', '>=', $weekAgo)
            ->selectRaw('DATE(created_at) as date, COUNT(*) as count')
            ->groupBy('date')
            ->orderBy('date')
            ->get();

        // Weekly orders revenue (super admin only)
        $weeklyRevenue = $user->isSuperAdmin()
            ? Order::where('created_at', '>=', $weekAgo)
                ->where('status', '!=', 'cancelled')
                ->selectRaw('DATE(created_at) as date, SUM(total) as revenue')
                ->groupBy('date')
                ->orderBy('date')
                ->get()
            : collect();

        return response()->json([
            'kpi' => [
                'guests_today' => $guestsToday,
                'active_conversations' => $activeConversations,
                'pending_bookings' => $pendingBookings,
                'pending_orders' => $pendingOrders,
                'new_requests' => $newRequests,
            ],
            'weekly_guests' => $weeklyGuests,
            'weekly_revenue' => $weeklyRevenue,
        ]);
    }
}
