<?php

namespace App\Models;

use App\Traits\Multitenantable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Request extends Model
{
    use HasFactory, Multitenantable, SoftDeletes;

    protected $with = ['items', 'status'];

    protected $fillable = [
        'request_status_id',
        'user_id',
        'company_id',
    ];

    public function items(): HasMany
    {
        return $this->hasMany(RequestItem::class);
    }

    public function status(): BelongsTo
    {
        return $this->belongsTo(RequestStatus::class, 'request_status_id');
    }
}
