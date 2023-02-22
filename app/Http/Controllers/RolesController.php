<?php

namespace App\Http\Controllers;

use App\Models\Role;
use Illuminate\Http\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

class RolesController extends Controller
{
    public function index(): JsonResponse
    {
        return new JsonResponse(Role::where('is_public', true)->get(), Response::HTTP_OK);
    }
}
