<?php

namespace Database\Seeders;

use App\Models\RequestStatus;
use Illuminate\Database\Seeder;

class RequestStatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        RequestStatus::insert([
            [
                'name' => 'draft',
                'description' => 'El pedido aun no hay sido enviado.',
            ],
            [
                'name' => 'submitted',
                'description' => 'El pedido ha sido enviado y esta eperando aprobación.',
            ],
            [
                'name' => 'approved',
                'description' => 'El pedido ha sido aprobado.',
            ],
            [
                'name' => 'rejected',
                'description' => 'El pedido ha sido rechazado.',
            ],
            [
                'name' => 'cancelled',
                'description' => 'El pedido ha sido cancelado.',
            ],
        ]);
    }
}
