<?php

namespace App\Http\Controllers;

use App\Http\Requests\Companies\StoreCompanyRequest;
use App\Models\Company;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

class CompaniesController extends Controller
{
    public function index(): JsonResponse
    {
        /** @var User $user */
        $user = auth()->user();
        $isSuperAdmin = $user->isSuperAdmin();

        if ($isSuperAdmin) {
            $companies = Company::withTrashed()->get();
        } else {
            $headquartersId = $user->headquarters->id;
            $companies = Company::where('id', $headquartersId)->orWhere('company_id', $headquartersId)->get();
        }

        return new JsonResponse($companies, Response::HTTP_OK);
    }

    public function show(Company $company): JsonResponse
    {
        if (!$this->isAllowedToAccessCompany($company)) {
            return new JsonResponse('Unauthorized', Response::HTTP_UNAUTHORIZED);
        }

        return new JsonResponse($company, Response::HTTP_OK);
    }

    public function store(StoreCompanyRequest $request): JsonResponse
    {
        $validated = $request->validated();
        $company = Company::create($validated);
        $this->setCompanyHeadquarters($company);

        return new JsonResponse($company, Response::HTTP_CREATED);
    }

    public function update(StoreCompanyRequest $request, Company $company): JsonResponse
    {
        if (!$this->isAllowedToAccessCompany($company)) {
            return new JsonResponse('Unauthorized', Response::HTTP_UNAUTHORIZED);
        }

        $validated = $request->validated();
        $company->update($validated);
        $this->setCompanyHeadquarters($company);

        return new JsonResponse($company, Response::HTTP_OK);
    }

    public function destroy(Company $company): JsonResponse
    {
        if (!$this->isAllowedToAccessCompany($company)) {
            return new JsonResponse('Unauthorized', Response::HTTP_UNAUTHORIZED);
        }

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
        if (!$this->isAllowedToAccessCompany($company)) {
            return new JsonResponse('Unauthorized', Response::HTTP_UNAUTHORIZED);
        }

        // If is a branch but it's headquarters is deleted, dont restore it
        if ($company->isBranch() && $company->headquarters->trashed()) {
            return new JsonResponse('Cannot be restored while headquarters is deleted', Response::HTTP_BAD_REQUEST);
        }

        $company->restore();

        return new JsonResponse($company, Response::HTTP_OK);
    }

    private function setCompanyHeadquarters(Company $company): void
    {
        /** @var User $user */
        $user = auth()->user();
        $isSuperAdmin = $user->isSuperAdmin();

        if (!$isSuperAdmin) {
            $headquartersId = $user->headquarters->id;
            $company->company_id = $headquartersId;
            $company->save();
        }
    }

    private function isAllowedToAccessCompany(Company $company): bool
    {
        /** @var User $user */
        $user = auth()->user();
        $isSuperAdmin = $user->isSuperAdmin();

        if ($isSuperAdmin) {
            return true;
        }

        $headquartersId = $user->headquarters->id;
        return in_array($headquartersId, [$company->id, $company->company_id], true);
    }
}
