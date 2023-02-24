<?php

namespace App\Http\Requests\Request;

use App\Enums\RequestStatusEnum;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreRequestRequest extends FormRequest
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
            'request_status_id' => ['required', 'integer', Rule::in(RequestStatusEnum::DRAFT, RequestStatusEnum::SUBMITTED)],
            'items' => ['required', 'array'],
            'items.*.product_name' => ['required', 'string'],
            'items.*.product_code' => ['required', 'string'],
            'items.*.product_color' => ['required', 'string'],
            'items.*.product_size' => ['required', 'string'],
            'items.*.quantity' => ['required', 'integer'],
            'items.*.additional_information' => ['nullable', 'string'],
        ];
    }
}
