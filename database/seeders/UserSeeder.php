<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //create the superadmin
        $user = User::create([
            'name' => 'SuperAdmin',
            'dni' => '00000000',
            'email' => config('auth.superadmin.email'),
            'password' => config('auth.superadmin.password'),
            'role_id' => 1,
        ]);

        $token = $user->createToken(config('app.name'))->plainTextToken;
        error_log($token);
    }
}
