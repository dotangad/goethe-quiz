<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller
{
  public function index()
  {
    return Inertia::render('admin/index', [
      'stats' => [
        'Schools Registered' => User::where('type', 'school')->count(),
        'Students Registered' => User::where('type', 'team')->count(),
      ]
    ]);
  }
}
