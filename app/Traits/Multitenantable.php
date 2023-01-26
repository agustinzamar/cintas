<?php

namespace App\Traits;

use App\Enums\RoleEnum;
use Illuminate\Database\Eloquent\Builder;

trait Multitenantable
{
    public static function bootMultitenantable(): void
    {
        if (auth()->check()) {
            static::creating(function ($model) {
                $model->company_id = $model->company_id ?? auth()->user()->company_id;
            });

            static::addGlobalScope('company_id', function (Builder $builder) {
                $isSuperAdmin = auth()->user()->role_id === RoleEnum::SUPERADMIN;
                if (! $isSuperAdmin) {
                    return $builder->where('company_id', auth()->user()->company_id);
                }

                return null;
            });
        }
    }
}
