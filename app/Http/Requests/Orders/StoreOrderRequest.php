<?php

namespace App\Http\Requests\Orders;

use App\Enums\OrderStatusEnum;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreOrderRequest extends FormRequest
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
            'order_status_id' => ['required', 'integer', Rule::in(OrderStatusEnum::DRAFT, OrderStatusEnum::SUBMITTED)],
            'items' => ['required', 'array'],
            'items.*.name' => ['nullable', 'string'],
            'items.*.code' => ['required', 'string'],
            'items.*.color' => ['required', 'string'],
            'items.*.size' => ['required', 'string'],
            'items.*.quantity' => ['required', 'integer'],
            'items.*.additional_information' => ['nullable', 'string'],
        ];
    }
}
