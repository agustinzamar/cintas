<?php

namespace Database\Seeders;

use App\Models\OrderStatus;
use Illuminate\Database\Seeder;

class OrderStatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        OrderStatus::insert([
            [
                'name' => 'Borrador',
                'description' => 'El pedido aun no hay sido enviado.',
            ],
            [
                'name' => 'Enviado',
                'description' => 'El pedido ha sido enviado y esta eperando aprobación.',
            ],
            [
                'name' => 'Approbado',
                'description' => 'El pedido ha sido aprobado.',
            ],
            [
                'name' => 'Rechazado',
                'description' => 'El pedido ha sido rechazado.',
            ],
            [
                'name' => 'Cancelado',
                'description' => 'El pedido ha sido cancelado.',
            ],
        ]);
    }
}
