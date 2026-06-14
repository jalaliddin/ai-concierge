<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class GuestHouse extends Model
{
    protected $fillable = [
        'name', 'slug', 'address', 'phone', 'description',
        'wifi_name', 'wifi_password', 'check_in_time', 'check_out_time',
        'latitude', 'longitude', 'image', 'primary_color',
        'qr_token', 'telegram_chat_id', 'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'latitude' => 'float',
        'longitude' => 'float',
    ];

    protected static function booted(): void
    {
        static::creating(function (GuestHouse $house) {
            if (empty($house->qr_token)) {
                $house->qr_token = Str::random(40);
            }
            if (empty($house->slug)) {
                $house->slug = Str::slug($house->name);
            }
        });
    }

    public function guests()
    {
        return $this->hasMany(Guest::class);
    }

    public function conversations()
    {
        return $this->hasMany(Conversation::class);
    }

    public function transfers()
    {
        return $this->hasMany(Transfer::class);
    }

    public function houseRules()
    {
        return $this->hasMany(HouseRule::class);
    }

    public function requests()
    {
        return $this->hasMany(GuestRequest::class);
    }

    public function knowledgeBase()
    {
        return $this->hasMany(KnowledgeBase::class);
    }

    public function recommendations()
    {
        return $this->hasMany(Recommendation::class);
    }

    public function users()
    {
        return $this->hasMany(User::class);
    }
}
