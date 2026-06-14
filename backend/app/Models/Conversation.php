<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Conversation extends Model
{
    protected $fillable = ['guest_id', 'guest_house_id', 'status'];

    public function guest()
    {
        return $this->belongsTo(Guest::class);
    }

    public function guestHouse()
    {
        return $this->belongsTo(GuestHouse::class);
    }

    public function messages()
    {
        return $this->hasMany(Message::class);
    }
}
