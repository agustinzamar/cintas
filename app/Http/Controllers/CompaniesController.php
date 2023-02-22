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

        if (count($company->users) > 0) {
            return new JsonResponse('Cannot delete branch while has active users.', Response::HTTP_BAD_REQUEST);
        }

        $company->delete();

        return new JsonResponse(null, Response::HTTP_NO_CONTENT);
    }

    public function restore(Company $company): JsonResponse
    {
        if (!$this->isAllowedToAccessCompany($company)) {
            return new JsonResponse('Unauthorized', Response::HTTP_UNAUTHORIZED);
        }

        $company->restore();

        return new JsonResponse($company, Response::HTTP_OK);
    }

    private function isAllowedToAccessCompany(Company $company): bool
    {
        /** @var User $user */
        $user = auth()->user();

        if ($user->isSuperAdmin() || $user->isAdmin()) {
            return true;
        }

        return $company->id === $user->company->id;
    }
}
