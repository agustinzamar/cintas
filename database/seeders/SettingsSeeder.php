<?php

namespace Database\Seeders;

use App\Models\Setting;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SettingsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $settings = [
            [
                'name' => 'customer_can_use_any_branch',
                'label' => 'Permitir a los clientes usar cualquier sucursal',
                'description' => 'Permitir a los clientes usar cualquier sucursal',
            ],
            [
                'name' => 'stock_control_enabled',
                'label' => 'Habilitar el control de stock',
                'description' => 'Habilita o deshabilita el control de stock',
            ]
        ];

        Setting::insert($settings);
    }
}
