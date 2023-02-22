<?php

namespace App\Http\Controllers;

use App\Http\Requests\Vendor\StoreVendorRequest;
use App\Http\Requests\Vendor\UpdateVendorRequest;
use App\Models\Vendor;
use Illuminate\Http\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

class VendorsController extends Controller
{
    public function index(): JsonResponse
    {
        return new JsonResponse(Vendor::all(), Response::HTTP_OK);
    }

    public function store(StoreVendorRequest $request): JsonResponse
    {
        $validated = $request->validated();
        $vendor = Vendor::create($validated);
        return new JsonResponse($vendor, Response::HTTP_CREATED);
    }


    public function show(Vendor $vendor): JsonResponse
    {
        return new JsonResponse($vendor, Response::HTTP_OK);
    }

    public function update(UpdateVendorRequest $request, Vendor $vendor): JsonResponse
    {
        $validated = $request->validated();
        $vendor->update($validated);
        return new JsonResponse($validated, Response::HTTP_OK);
    }

    public function destroy(Vendor $vendor): JsonResponse
    {
        $vendor->delete();
        return new JsonResponse(null, Response::HTTP_NO_CONTENT);
    }

    public function restore(Vendor $vendor): JsonResponse
    {
        $vendor->restore();
        return new JsonResponse($vendor, Response::HTTP_OK);
    }
}
