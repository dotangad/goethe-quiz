<?php

namespace App\Http\Controllers;

use App\Mail\TeamCreatedMail;
use App\Models\Question;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

class TeamAuthController extends Controller
{
    private function timeCheck()
    {
        return (\Carbon\Carbon::now('Asia/Kolkata'))->gt(\Carbon\Carbon::parse(env('REG_DATE')));
    }

    private function regClosed()
    {
        return (\Carbon\Carbon::now('Asia/Kolkata'))->gt(\Carbon\Carbon::parse(env('REG_END_DATE')));
    }

    private function playTimeCheck()
    {
        return \Carbon\Carbon::parse(env('START_DATE'))
            ->lt(\Carbon\Carbon::now('Asia/Kolkata')) &&
            \Carbon\Carbon::parse(env('END_DATE'))
            ->gt(\Carbon\Carbon::now('Asia/Kolkata'));
    }

    public function loginShow()
    {
        if (!$this->playTimeCheck()) return redirect('/');
        return Inertia::render('auth/team_login');
    }

    public function login(Request $request)
    {
        if (!$this->playTimeCheck()) return redirect('/');
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

        /* if ($user->logged_in) { */
        /*   return Inertia::render('auth/team_login', ['error' => 'This account is logged in from another device']); */
        /* } */

        if (!Hash::check($body['password'], $user->password) && !Hash::check($body['password'], $user->password_1)) {
            return Inertia::render('auth/team_login', ['error' => 'Incorrect password']);
        }

        Auth::login($user, true);

        $user->logged_in = true;
        $user->save();

        return redirect('/');
    }

    public function registerShow()
    {
        if (!$this->timeCheck() || $this->regClosed()) return redirect('/');
        return Inertia::render('auth/team_register');
    }

    public function register(Request $request)
    {
        if (!$this->timeCheck() || $this->regClosed()) return redirect('/');

        $body = $request->validate([
            'name' => 'required',
            'email' => 'required|unique:users|email',
            'password' => 'required|min:8|max:24',
            'confirm-password' => 'required|same:password',
        ]);

        $user = new User($body + [
            'student_name' => $request->get('name'),
            'question_id' => Question::count() > 0 ? 1 : null,
            'type' => 'team'
        ]);
        $user->password = Hash::make($user->password);
        $user->save();

        Mail::to($user)->queue(new TeamCreatedMail($user));
        $message = "You have successfully registered! Come back on the day of the quiz to be able to login.";
        if ($this->playTimeCheck()) {
            Auth::login($user, true);
            $message = null;
        }
        return redirect("/")->with(
            "message",
            $message
        );
    }
}
