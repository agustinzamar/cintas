<?php

namespace App\Http\Controllers;

use App\Http\Requests\Settings\UpdateSettingsRequest;
use App\Models\Setting;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Symfony\Component\HttpFoundation\Response as Response;

class SettingsController extends Controller
{

    public function index(): JsonResponse
    {
        return new JsonResponse(Setting::all(), Response::HTTP_OK);
    }

    public function store(UpdateSettingsRequest $request): JsonResponse
    {
        /** @var User $user */
        $user = auth()->user();
        $company = $user->headquarters;

        if (!$company) {
            return new JsonResponse('User unexpectendly didnt have a company', Response::HTTP_BAD_REQUEST);
        }

        $validated = $request->validated();
        $settingId = Setting::where('name', $validated['name'])->first()->id;
        $company->settings()->syncWithPivotValues([$settingId], ['is_enabled' => $validated['is_enabled']]);
        $company->save();

        return new JsonResponse($company->settings, Response::HTTP_OK);
    }
}
