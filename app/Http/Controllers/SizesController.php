<?php

namespace App\Http\Controllers;


use App\Models\Size;
use Illuminate\Http\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

class SizesController extends Controller
{
    public function index(): JsonResponse
    {
        return new JsonResponse(Size::all(), Response::HTTP_OK);
    }
}
