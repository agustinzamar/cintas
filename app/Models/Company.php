<?php

namespace App\Models;

use Dyrynda\Database\Support\CascadeSoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Company extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $with = ['headquarters', 'paymentMethods'];

    protected $fillable = [
        'name',
        'description',
        'company_id',
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
        'company_id',
    ];

    public function users()
    {
        return $this->hasMany(User::class);
    }
}
