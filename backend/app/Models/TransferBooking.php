<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TransferBooking extends Model
{
    protected $fillable = [
        'guest_id', 'transfer_id', 'pickup_time', 'pickup_location',
        'passengers', 'notes', 'status',
    ];

    protected $casts = [
        'pickup_time' => 'datetime',
    ];

    public function guest()
    {
        return $this->belongsTo(Guest::class);
    }

    public function transfer()
    {
        return $this->belongsTo(Transfer::class);
    }
}
