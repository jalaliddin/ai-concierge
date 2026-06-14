<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Guest extends Model
{
    protected $fillable = [
        'guest_house_id', 'room_number', 'name', 'email',
        'phone', 'language', 'last_active_at',
    ];

    protected $casts = [
        'last_active_at' => 'datetime',
    ];

    public function guestHouse()
    {
        return $this->belongsTo(GuestHouse::class);
    }

    public function conversations()
    {
        return $this->hasMany(Conversation::class);
    }

    public function activeConversation()
    {
        return $this->hasOne(Conversation::class)->where('status', 'active')->latest();
    }

    public function transferBookings()
    {
        return $this->hasMany(TransferBooking::class);
    }

    public function requests()
    {
        return $this->hasMany(GuestRequest::class);
    }

    public function registrations()
    {
        return $this->hasMany(Registration::class);
    }
}
