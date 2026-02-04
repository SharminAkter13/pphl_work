<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('employees', function (Blueprint $table) {
            $table->id();

            $table->string('name');
            $table->string('email');
            $table->string('password');

            $table->string('phone')->nullable();
            $table->string('website')->nullable();

            $table->integer('age')->nullable();
            $table->date('dob')->nullable();
            $table->time('office_time')->nullable();
            $table->dateTime('joining_datetime')->nullable();

            $table->string('department')->nullable(); // Radio buttons (single selection)
            $table->boolean('is_active')->default(false); // Single checkbox

            $table->json('skills')->nullable(); // New: Multiple checkboxes (e.g., ["JavaScript", "React"])

            $table->integer('salary_range')->nullable(); // Range
            $table->string('favorite_color')->nullable(); // Color

            $table->string('profile_image')->nullable(); // File/image
            $table->string('resume')->nullable(); // File

            $table->string('joining_month')->nullable();
            $table->string('joining_week')->nullable();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('employees');
    }
};