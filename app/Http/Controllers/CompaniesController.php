<?php

namespace App\Http\Controllers;

use App\Http\Requests\Companies\StoreCompanyRequest;
use App\Models\Company;
use Illuminate\Http\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

class CompaniesController extends Controller
{
    public function index(): JsonResponse
    {
        return new JsonResponse(Company::all(), Response::HTTP_OK);
    }

    public function show(Company $company): JsonResponse
    {
        return new JsonResponse($company, Response::HTTP_OK);
    }

    public function store(StoreCompanyRequest $request): JsonResponse
    {
        $validated = $request->validated();
        $company = Company::create($validated);
        return new JsonResponse($company, Response::HTTP_CREATED);
    }

    public function update(StoreCompanyRequest $request, Company $company): JsonResponse
    {
        $validated = $request->validated();
        $company->update($validated);
        return new JsonResponse($company, Response::HTTP_OK);
    }

    public function destroy(Company $company): JsonResponse
    {
        if (count($company->users) > 0) {
            return new JsonResponse('Cannot delete branch while has active users.', Response::HTTP_BAD_REQUEST);
        }

        $company->delete();
        return new JsonResponse(null, Response::HTTP_NO_CONTENT);
    }

    public function restore(Company $company): JsonResponse
    {
        $company->restore();
        return new JsonResponse($company, Response::HTTP_OK);
    }
}
