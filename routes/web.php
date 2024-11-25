<?php

use App\Http\Controllers\Auth\DeleteAccountController;
use App\Http\Controllers\Profile\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware('auth')->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::get('/account-deletion', [DeleteAccountController::class, 'edit'])->name('destroy.view');
    Route::delete('/account-deletion', [DeleteAccountController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
