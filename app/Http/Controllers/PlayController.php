<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Rules\CheckAnswer;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PlayController extends Controller
{
  public function index(Request $request)
  {
    $question = $request->user()->question;
    return Inertia::render('play', [
      'question' => $question ? $question->only(['id', 'text', 'hint']) : null,
      'showHint' => $request->user()->attempts()->where('question_id', $question->id)->count() >= 10
    ]);
  }

  public function attempt(Request $request)
  {
    $body = $request->validate([
      'answer' => [
        'required',
        'regex:/^[a-z0-9_-]+$/',
        'max:255',
        new CheckAnswer
      ],
    ]);

    $u = request()->user();
    $u->last_solved = \Carbon\Carbon::now();
    $u->question_id = $u->question_id + 1;
    try {
      $u->save();
    } catch (QueryException $e) {
      $u->question_id = null;
      $u->save();
    }

    return redirect()->back();
  }
}
