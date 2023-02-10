<?php

namespace App\Models;

use App\Traits\Multitenantable;
use Dyrynda\Database\Support\CascadeSoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Company extends Model
{
    use HasFactory;
    use SoftDeletes;
    use CascadeSoftDeletes;
    use MultiTenantable;

    protected $with = ['headquarters', 'paymentMethods'];

    protected array $cascadeDeletes = ['users'];

    protected $fillable = [
        'name',
        'description',
        'company_id',
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
        'company_id'
    ];

    public function users()
    {
        return $this->hasMany(User::class);
    }

    public function headquarters()
    {
        return $this->belongsTo(Company::class, 'company_id', 'id')->withTrashed();
    }

    public function branches()
    {
        return $this->hasMany(Company::class, 'company_id', 'id')->withTrashed();
    }

    public function paymentMethods()
    {
        return $this->belongsToMany(PaymentMethod::class, 'companies_payment_methods');
    }

    public function isHeadquarters()
    {
        return $this->company_id === null;
    }

    public function isBranch()
    {
        return $this->company_id !== null;
    }
}
