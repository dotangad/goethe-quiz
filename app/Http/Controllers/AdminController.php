<?php

namespace App\Http\Controllers;

use App\Models\Question;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function index()
    {
        return Inertia::render('admin/index', [
            'stats' => [
                'Students Registered' => User::where('type', 'team')->count(),
                'Questions' => Question::count(),
            ]
        ]);
    }

    public function loginShow()
    {
        return Inertia::render('auth/team_login', ['admin' => true]);
    }

    public function login(Request $request)
    {
        $body = $request->validate([
            'email' => 'required|email',
            'password' => 'required|min:8|max:24',
        ]);

        $user = User::where([
            ['email', '=', $body['email']],
        ])->first();

        if (!$user) {
            return Inertia::render('auth/team_login', ['error' => 'A user with that email does not exist']);
        }

        if ($user->type !== "admin") {
            return Inertia::render('auth/team_login', ['error' => 'Only admin accounts are allowed to login here']);
        }

        if (!Hash::check($body['password'], $user->password) && !Hash::check($body['password'], $user->password_1)) {
            return Inertia::render('auth/team_login', ['error' => 'Incorrect password']);
        }

        Auth::login($user, true);

        $user->logged_in = true;
        $user->save();

        return redirect('/');
    }
}
