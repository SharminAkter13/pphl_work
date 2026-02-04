<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;  
use Illuminate\Notifications\Notifiable;

class Employee extends Authenticatable  
{
    use HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'phone',
        'website',
        'age',
        'dob',
        'office_time',
        'joining_datetime',
        'department',
        'is_active',
        'skills',
        'salary_range',
        'favorite_color',
        'joining_month',
        'joining_week',
        'profile_image',
        'resume',
    ];

    protected $hidden = [
        'password',  
        'remember_token',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'salary_range' => 'integer',
        'age' => 'integer',
        'dob' => 'date',
        'office_time' => 'datetime:H:i', 
        'joining_datetime' => 'datetime',
        'joining_month' => 'string', 
        'joining_week' => 'string',  
    ];
}