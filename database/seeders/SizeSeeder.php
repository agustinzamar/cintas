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
            ['label' => '18 - 21', 'values' => json_encode([18, 19, 20, 21]), 'description' => 'Bebé'],
            ['label' => '22 - 26', 'values' => json_encode([22, 23, 24, 25, 26]), 'description' => 'Niño'],
            ['label' => '27 - 34', 'values' => json_encode([27, 28, 29, 30, 31, 32, 33, 34]), 'description' => 'Juvenil'],
            ['label' => '34 - 40', 'values' => json_encode([34, 35, 36, 37, 38, 39, 40]), 'description' => 'Dama'],
            ['label' => '39 - 44', 'values' => json_encode([39, 40, 41, 42, 43, 44]), 'description' => 'Hombre'],
        ]);
    }
}
