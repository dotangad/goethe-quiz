<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class DashboardController extends Controller
{
  public function index()
  {
    if (!Auth::check()) {
      return Inertia::render('index');
    }

    $user = User::find(Auth::user()->id);
    return Inertia::render('dashboard', [
      'teams' => $user->teams
    ]);
  }

  public function update(Request $request)
  {
    $body = $request->validate([
      'name' => 'required',
      'principal' => 'required',
      'principal_mobile' => ['required', 'digits:10'],
      'teacher_incharge' => 'required',
      'teacher_incharge_email' => ['required', 'email'],
      'teacher_incharge_mobile' => ['required', 'digits:10'],
      'postal_code' => ['required', 'digits:6'],
      'address' => 'required',
    ]);

    User::where('id', Auth::user()->id)
      ->update(
        collect($body)
          ->only([
            'name',
            'principal',
            'principal_mobile',
            'teacher_incharge',
            'teacher_incharge_email',
            'teacher_incharge_mobile',
            'postal_code',
            'address'
          ])
          ->toArray()
      );

    return redirect('/dashboard');
  }
}
