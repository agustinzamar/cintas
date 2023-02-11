<?php

namespace App\Http\Controllers;

use App\Enums\RoleEnum;
use App\Models\Role;
use Illuminate\Http\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

class RolesController extends Controller
{
    public function index(): JsonResponse
    {
        $role_id = auth()->user()->role_id;

        switch ($role_id) {
            case RoleEnum::SUPERADMIN:
            case RoleEnum::ADMINISTRATOR:
                $roles = Role::where('is_public', true)->get();
                break;
            case RoleEnum::CASHIER:
            case RoleEnum::PROFESSOR:
                $roles = Role::where('id', RoleEnum::CUSTOMER)->get();
                break;
            default:
                $roles = [];
        }

        return new JsonResponse($roles, Response::HTTP_OK);
    }
}
