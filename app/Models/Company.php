<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Company extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $with = ['city'];

    protected $fillable = [
        'name',
        'description',
        'address',
        'city_id',
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

    public function city()
    {
        return $this->belongsTo(City::class);
    }
}
