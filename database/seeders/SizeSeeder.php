<?php

namespace Database\Seeders;

use App\Models\Size;
use Illuminate\Database\Seeder;

class SizeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Size::insert([
            ['from' => 18, 'to' => 21, 'description' => 'Bebé'],
            ['from' => 22, 'to' => 26, 'description' => 'Niño'],
            ['from' => 27, 'to' => 34, 'description' => 'Juvenil'],
            ['from' => 35, 'to' => 40, 'description' => 'Dama'],
            ['from' => 39, 'to' => 44, 'description' => 'Hombre'],
        ]);
    }
}
