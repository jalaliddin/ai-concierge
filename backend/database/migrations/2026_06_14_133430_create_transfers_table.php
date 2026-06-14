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
        Schema::create('transfers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('guest_house_id')->nullable()->constrained()->nullOnDelete();
            $table->string('name');
            $table->string('from_location');
            $table->string('to_location');
            $table->enum('vehicle_type', ['sedan', 'minivan', 'bus']);
            $table->unsignedTinyInteger('capacity');
            $table->decimal('price', 10, 2);
            $table->string('currency', 3)->default('USD');
            $table->unsignedSmallInteger('duration_minutes')->nullable();
            $table->text('description')->nullable();
            $table->string('image')->nullable();
            $table->boolean('show_on_landing')->default(true);
            $table->string('slug')->nullable()->unique();
            $table->string('meta_title')->nullable();
            $table->string('meta_description')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transfers');
    }
};
