<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
  public function destroy(Request $request)
  {
    if ($request->user()->type === 'team') {
      $u = $request->user();
      $u->logged_in = false;
      $u->save();
    }

    Auth::logout();
    $request->session()->invalidate();
    $request->session()->regenerateToken();
    return redirect('/');
  }
}
