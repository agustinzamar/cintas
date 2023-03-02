<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class OrderItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'order_id',
        'name',
        'code',
        'color',
        'size',
        'quantity',
        'additional_information',
    ];

    public function request(): BelongsTo
    {
        return $this->belongsTo(Order::class);
    }
}
