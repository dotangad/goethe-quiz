<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\SchoolAuthController;
use App\Http\Controllers\TeamController;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

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

Route::get('/', function () {
  return Inertia::render('index');
})->middleware(['guest'])
  ->name('home');

// ----- Authentication -----
Route::prefix('/auth')
  ->middleware(['guest'])
  ->name('auth.')
  ->group(function () {
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

Route::get('/dashboard', [DashboardController::class, 'index'])
  ->middleware(['auth', 'school'])
  ->name('dashboard');

Route::post('/dashboard/teams', [TeamController::class, 'create'])
  ->middleware(['auth', 'school'])
  ->name('dashboard.teams.create');

Route::post('/dashboard/teams/del/{team}', [TeamController::class, 'destroy'])
  ->middleware(['auth', 'school'])
  ->name('dashboard.teams.delete');

Route::post('/dashboard/school/edit', [DashboardController::class, 'update'])
  ->middleware(['auth', 'school'])
  ->name('dashboard.school.edit');

if (App::environment('local')) {
  Route::get('/authn', function () {
    return dd(Auth::user());
  })->middleware(['auth']);
}
