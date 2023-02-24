<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class RequestItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'request_id',
        'product_name',
        'product_code',
        'product_color',
        'product_size',
        'quantity',
        'additional_information',
    ];

    public function request(): BelongsTo
    {
        return $this->belongsTo(Request::class);
    }
}
