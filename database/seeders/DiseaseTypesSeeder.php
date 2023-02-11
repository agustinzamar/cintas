<?php

namespace Database\Seeders;

use App\Models\DiseaseType;
use Illuminate\Database\Seeder;

class DiseaseTypesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DiseaseType::insert([
            [
                'name' => 'Alergia',
            ],
            [
                'name' => 'Enfermedad crónica',
            ],
            [
                'name' => 'Lesión',
            ],
        ]);
    }
}
