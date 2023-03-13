<?php

namespace App\Http\Requests\Vendor;

use Illuminate\Foundation\Http\FormRequest;

class UpdateVendorRequest extends FormRequest
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
            'email' => ['string', 'nullable', 'max:100'],
            'phone' => ['numeric', 'nullable', 'digits_between:10,11'],
            'website' => ['string', 'nullable', 'max:100'],
            'address' => ['string', 'nullable', 'max:100'],
        ];
    }
}
