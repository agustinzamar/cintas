<?php

namespace Database\Seeders;

use App\Models\Vendor;
use Illuminate\Database\Seeder;

class VendorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Vendor::insert([
            ['name' => 'Proveedor 1'],
            ['name' => 'Proveedor 2'],
            ['name' => 'Proveedor 3'],
        ]);
    }
}
