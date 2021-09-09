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
      'country' => ['required', Rule::in(['India', 'Nepal', 'Bangladesh', 'Pakistan'])],
      'phone' => ['required', 'regex:/^\+(91|977|92|880)(\d|\s)+$/'],
      'teacher_incharge' => 'required',
      'address' => 'required',
    ]);

    User::where('id', Auth::user()->id)
      ->update(
        collect($body)
          ->only([
            'name',
            'principal',
            'country',
            'phone',
            'teacher_incharge',
            'address'
          ])
          ->toArray()
      );

    return redirect('/');
  }
}
