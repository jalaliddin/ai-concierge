<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class KnowledgeBase extends Model
{
    protected $table = 'knowledge_base';

    protected $fillable = [
        'guest_house_id', 'category', 'question', 'answer',
        'language', 'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    public function guestHouse()
    {
        return $this->belongsTo(GuestHouse::class);
    }
}
