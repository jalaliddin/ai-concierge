<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('house_rules', function (Blueprint $table) {
            $table->id();
            $table->foreignId('guest_house_id')->constrained()->cascadeOnDelete();
            $table->enum('category', ['general', 'check_in', 'safety', 'pets', 'smoking', 'noise']);
            $table->string('title');
            $table->text('content');
            $table->unsignedSmallInteger('sort_order')->default(0);
            $table->string('language', 5)->default('en');
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('house_rules');
    }
};
