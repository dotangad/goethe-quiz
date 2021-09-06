<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\SchoolAuthController;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Auth;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', [DashboardController::class, 'index'])->name('home');

// ----- Authentication -----
Route::prefix('/auth')
  ->middleware(['guest'])
  ->name('auth.')
  ->group(function () {
    Route::get('/register', [AuthController::class, 'registerShow'])
      ->name('register');
    Route::get('/login', [AuthController::class, 'loginShow'])
      ->name('login');
    Route::post('/register', [AuthController::class, 'register'])
      ->name('handleRegister');
    Route::post('/login', [AuthController::class, 'login'])
      ->name('handleLogin');

    Route::prefix('/school')
      ->name('school.')
      ->group(function () {
        Route::get('/login', [SchoolAuthController::class, 'loginShow'])
          ->name('login');
        Route::post('/login', [SchoolAuthController::class, 'login'])
          ->name('handleLogin');

        Route::get('/register', [SchoolAuthController::class, 'registerShow'])
          ->name('register');
        Route::post('/register', [SchoolAuthController::class, 'register'])
          ->name('handleRegister');
      });
  });
Route::get('/auth/logout', [AuthController::class, 'destroy'])
  ->middleware(['auth'])
  ->name('auth.logout');

if (App::environment('local')) {
  Route::get('/authn', function () {
    return dd(Auth::user());
  })->middleware(['auth']);
}
