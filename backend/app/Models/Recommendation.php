<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Recommendation extends Model
{
    protected $fillable = [
        'guest_house_id', 'category', 'name', 'description',
        'address', 'distance_text', 'latitude', 'longitude',
        'image', 'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'latitude' => 'float',
        'longitude' => 'float',
    ];

    public function guestHouse()
    {
        return $this->belongsTo(GuestHouse::class);
    }
}
