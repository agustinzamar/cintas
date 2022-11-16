<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call([
            RoleSeeder::class,
            UserSeeder::class,
            PaymentMethodSeeder::class,
        ]);

        if (config('app.env') === 'local') {
            $this->call([
                CompanySeeder::class,
            ]);
        }
    }
}
