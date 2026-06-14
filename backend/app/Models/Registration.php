<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Registration extends Model
{
    protected $fillable = [
        'guest_id', 'guest_house_id', 'notes',
        'file_path', 'file_name', 'status', 'sent_at',
    ];

    protected $casts = [
        'sent_at' => 'datetime',
    ];

    public function guest()
    {
        return $this->belongsTo(Guest::class);
    }

    public function guestHouse()
    {
        return $this->belongsTo(GuestHouse::class);
    }
}
