<?php

namespace App\Http\Controllers;

use App\Http\Requests\PaymentMethods\StorePaymentMethodsRequest;
use App\Models\PaymentMethod;
use Illuminate\Http\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

class PaymentMethodsController extends Controller
{
    public function index(): JsonResponse
    {
        return new JsonResponse(PaymentMethod::all(), Response::HTTP_OK);
    }

    public function store(StorePaymentMethodsRequest $request)
    {
        //Only members of companies can make changes
        $company = auth()->user()->company;
        if (! $company) {
            return new JsonResponse('No tiene permitido realizar esta acción', Response::HTTP_UNAUTHORIZED);
        }

        $validated = $request->validated();
        $paymentMethods = PaymentMethod::query()->whereIn('name', $validated['payment_methods'])->get();
        $company->paymentMethods()->sync($paymentMethods);

        return new JsonResponse($company->paymentMethods, Response::HTTP_OK);
    }

    public function showByCompany()
    {
        //Only members of companies can use this endpoint
        $company = auth()->user()->company;
        if (! $company) {
            return new JsonResponse('El usuario no pertenece a ninguna empresa', Response::HTTP_UNAUTHORIZED);
        }

        return new JsonResponse($company->paymentMethods, Response::HTTP_OK);
    }

    public function show($id)
    {
    }

    public function destroy($id)
    {
        //
    }
}
