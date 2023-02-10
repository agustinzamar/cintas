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
        return new JsonResponse(Company::withTrashed()->get(), Response::HTTP_OK);
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
        // Dont delete if is headquarters and it has active branches
        if ($company->isHeadquarters() && $company->branches()->withoutTrashed()->count() > 0) {
            return new JsonResponse('Cannot be deleted while there are active branches', Response::HTTP_BAD_REQUEST);
        }

        // If is a branch update users company_id to headquarters
        if ($company->isBranch()) {
            $company->users()->update(['company_id' => $company->company_id]);
        }

        $company->delete();
        return new JsonResponse(null, Response::HTTP_NO_CONTENT);
    }

    public function restore(Company $company): JsonResponse
    {
        // If is a branch but it's headquarters is deleted, dont restore it
        if ($company->isBranch() && $company->headquarters->trashed()) {
            return new JsonResponse('Cannot be restored while headquarters is deleted', Response::HTTP_BAD_REQUEST);
        }

        $company->restore();
        return new JsonResponse($company, Response::HTTP_OK);
    }
}
