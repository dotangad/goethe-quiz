<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
  public function index()
  {
    if (!Auth::check()) {
      return Inertia::render('index');
    }

    return Inertia::render('dashboard');
  }
}
