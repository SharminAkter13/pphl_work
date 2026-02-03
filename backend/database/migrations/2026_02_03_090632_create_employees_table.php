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

            $table->string('department')->nullable(); // radio
            $table->boolean('is_active')->default(false); // checkbox

            $table->integer('salary_range')->nullable(); // range
            $table->string('favorite_color')->nullable(); // color

            $table->string('profile_image')->nullable(); // file/image
            $table->string('resume')->nullable(); // file

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
