<?php

namespace App\Http\Controllers;

use App\Models\Province;
use Illuminate\Http\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

class ProvincesController extends Controller
{
    public function index(): JsonResponse
    {
        return new JsonResponse(Province::all(), Response::HTTP_OK);
    }
}
