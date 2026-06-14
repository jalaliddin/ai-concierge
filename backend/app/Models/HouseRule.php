<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HouseRule extends Model
{
    protected $fillable = [
        'guest_house_id', 'category', 'title', 'content',
        'sort_order', 'language', 'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    public function guestHouse()
    {
        return $this->belongsTo(GuestHouse::class);
    }
}
