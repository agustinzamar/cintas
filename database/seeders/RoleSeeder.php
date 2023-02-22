<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Role::insert([
            ['name' => 'Superadmin', 'is_public' => false],
            ['name' => 'Administrador', 'is_public' => true],
            ['name' => 'Gerente', 'is_public' => true]
        ]);
    }
}
