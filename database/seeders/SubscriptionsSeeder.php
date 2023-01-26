<?php

namespace Database\Seeders;

use App\Models\Company;
use App\Models\Subscription;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SubscriptionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $subscriptions = [
            [
                'name' => 'Basic',
                'description' => 'Basic subscription',
                'price' => 10.00,
                'company_id' => Company::inRandomOrder()->first()->id,
            ],
            [
                'name' => 'Premium',
                'description' => 'Premium subscription',
                'price' => 20.00,
                'company_id' => Company::inRandomOrder()->first()->id,
            ],
            [
                'name' => 'Basic',
                'description' => 'Basic subscription',
                'price' => 10.00,
                'company_id' => Company::inRandomOrder()->first()->id,
            ],
            [
                'name' => 'Premium',
                'description' => 'Premium subscription',
                'price' => 20.00,
                'company_id' => Company::inRandomOrder()->first()->id,
            ],
        ];

        Subscription::insert($subscriptions);
    }
}
