<?php

namespace App\Http\Controllers\Auth;

use App\Actions\Auth\PasswordResetLinkAction;
use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\PasswordResetRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class PasswordResetLinkController extends Controller
{
    private PasswordResetLinkAction $passwordResetLinkAction;

    public function __construct(PasswordResetLinkAction $passwordResetLinkAction)
    {
        $this->passwordResetLinkAction = $passwordResetLinkAction;
    }

    /**
     * Display the password reset link request view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/ForgotPassword', [
            'status' => session('status'),
        ]);
    }

    /**
     * Handle an incoming password reset link request.
     *
     * @throws ValidationException
     */
    public function store(PasswordResetRequest $request): RedirectResponse
    {
        $this->passwordResetLinkAction->send_link($request->only('email'));

        return back()->with('status', 'Password reset link sent on your email address.');
    }
}
