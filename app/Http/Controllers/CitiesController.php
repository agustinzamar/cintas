<?php

namespace App\Http\Controllers;

use App\Models\City;
use App\Models\Province;
use Illuminate\Http\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

class CitiesController extends Controller
{
    public function index(): JsonResponse
    {
        return new JsonResponse(City::all(), Response::HTTP_OK);
    }

    public function getByProvince(int $provinceId): JsonResponse
    {
        Province::findOrFail($provinceId);
        return new JsonResponse(City::where('province_id', $provinceId)->orderBy('name', 'ASC')->get(), Response::HTTP_OK);
    }
}
