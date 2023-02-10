<?php

namespace App\Http\Requests\User;

use App\Enums\RoleEnum;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            'name' => ['string', 'required', 'max:100'],
            'email' => ['string', 'required', 'max:100', 'email', 'unique:users,email,' . $this->user->id],
            'role_id' => ['numeric', 'required', 'exists:roles,id', Rule::notIn([RoleEnum::SUPERADMIN])], // Do not allow creating superadmins via API
            'company_id' => ['numeric', 'exists:companies,id', Rule::requiredIf(auth()->user()->company?->id === null)]
        ];
    }
}
