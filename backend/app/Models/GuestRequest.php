<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class GuestRequest extends Model
{
    protected $table = 'requests';

    protected $fillable = [
        'guest_id', 'guest_house_id', 'type', 'subject',
        'description', 'priority', 'status',
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
