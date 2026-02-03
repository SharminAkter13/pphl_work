<?php

namespace App\Models\Admin;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Supplier extends Model
{
    use HasFactory;

    protected $fillable = [
        'supplier_name',
        'email',
        'phone',
        'address',
        'contact_person',
        'status',
    ];

    // Relationships
    public function products()
    {
        return $this->hasMany(Product::class);
    }
}