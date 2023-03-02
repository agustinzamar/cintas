<?php

namespace App\Models;

use App\Enums\OrderStatusEnum;
use App\Traits\Multitenantable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Order extends Model
{
    use HasFactory, Multitenantable, SoftDeletes;

    protected $with = ['items', 'status'];

    protected $fillable = [
        'order_status_id',
        'user_id',
        'company_id',
    ];

    public function items(): HasMany
    {
        return $this->hasMany(OrderItem::class);
    }

    public function status(): BelongsTo
    {
        return $this->belongsTo(OrderStatus::class, 'order_status_id');
    }

    public function canBeEdited(): bool
    {
        return $this->status->id === OrderStatusEnum::DRAFT;
    }
}
