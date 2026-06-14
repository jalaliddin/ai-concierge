<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Transfer extends Model
{
    protected $fillable = [
        'guest_house_id', 'name', 'from_location', 'to_location',
        'vehicle_type', 'capacity', 'price', 'currency',
        'duration_minutes', 'description', 'image', 'show_on_landing',
        'slug', 'meta_title', 'meta_description', 'is_active',
    ];

    protected $casts = [
        'price' => 'decimal:2',
        'show_on_landing' => 'boolean',
        'is_active' => 'boolean',
    ];

    protected static function booted(): void
    {
        static::creating(function (Transfer $transfer) {
            if (empty($transfer->slug)) {
                $transfer->slug = Str::slug($transfer->name . '-' . Str::random(6));
            }
        });
    }

    public function guestHouse()
    {
        return $this->belongsTo(GuestHouse::class);
    }

    public function bookings()
    {
        return $this->hasMany(TransferBooking::class);
    }

    public function orderItems()
    {
        return $this->morphMany(OrderItem::class, 'itemable');
    }
}
