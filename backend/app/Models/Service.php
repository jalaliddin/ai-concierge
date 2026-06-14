<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Service extends Model
{
    protected $fillable = [
        'category', 'name', 'slug', 'short_description', 'description',
        'price', 'currency', 'duration_text', 'image', 'gallery',
        'meta_title', 'meta_description', 'show_on_landing', 'sort_order', 'is_active',
    ];

    protected $casts = [
        'price' => 'decimal:2',
        'gallery' => 'array',
        'show_on_landing' => 'boolean',
        'is_active' => 'boolean',
    ];

    protected static function booted(): void
    {
        static::creating(function (Service $service) {
            if (empty($service->slug)) {
                $service->slug = Str::slug($service->name);
            }
        });
    }

    public function orderItems()
    {
        return $this->morphMany(OrderItem::class, 'itemable');
    }
}
