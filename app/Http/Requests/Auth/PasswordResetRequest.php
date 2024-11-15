<?php

namespace App\Http\Requests\Auth;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class PasswordResetRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'email' => 'required|lowercase|email:rfc,dns,',
        ];
    }

    public function messages(): array
    {
        return [
            'email.required' => 'Email is required',
            'email.lowercase' => 'E-Mail must be lowercase.',
            'email.email' => 'E-Mail must be a valid email address.',
            'email.rfc' => 'E-Mail must be a valid email address.',
            'email.dns' => 'E-Mail must be a valid email address.',
        ];
    }
}
