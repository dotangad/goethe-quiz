<?php

namespace App\Http\Controllers;

use App\Models\Question;
use App\Rules\CheckAnswer;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PlayController extends Controller
{
  public function index(Request $request)
  {
    $request->user()->school;
    $question = $request->user()->question;
    $showHint = $question
      ? $request->user()->attempts()->where('question_id', $question->id)->count() >= 3
      : false;
    $skipAllowed = $question
      ? $request->user()->attempts()->where('question_id', $question->id)->count() >= 5
      : false;

    return Inertia::render('play', [
      'question' => $question
        ? ($showHint
          ? $question->only(['id', 'text', 'hint'])
          : $question->only(['id', 'text']))
        : null,
      'showHint' => $showHint,
      'skipAllowed' => $skipAllowed,
      'attemptNumber' => $request->user()->attempts()->where('question_id', $question->id)->count() + 1,
    ]);
  }

  public function attempt(Request $request)
  {
    $request->validate([
      'answer' => [
        'required',
        // 'regex:/^[a-z0-9_-]+$/',
        'max:255',
        new CheckAnswer
      ],
    ]);

    $u = request()->user();
    $u->last_solved = \Carbon\Carbon::now();
    $u->points = $u->points + 1;
    $q = Question::find($u->question_id + 1);
    if ($q) {
      $u->question_id = $q->id;
    } else {
      $u->question_id = null;
    }

    $u->save();
    return redirect()->back();
  }

  public function skip(Request $request)
  {
    $u = request()->user();
    $q = Question::find($u->question_id + 1);
    if (!$q) {
      $question = $request->user()->question;
      $showHint = $question
        ? $request->user()->attempts()->where('question_id', $question->id)->count() >= 7
        : false;
      $skipAllowed = $question
        ? $request->user()->attempts()->where('question_id', $question->id)->count() >= 5
        : false;
      return Inertia::render('play', [
        'question' => $question
          ? ($showHint
            ? $question->only(['id', 'text', 'hint'])
            : $question->only(['id', 'text']))
          : null,
        'showHint' => $showHint,
        'message' => 'This is the last question. You cannot skip it.',
        'skipAllowed' => $skipAllowed,
        'attemptNumber' => $request->user()->attempts()->where('question_id', $question->id)->count() + 1,
      ]);
    }

    $u->question_id = $q->id;
    $u->save();
    return redirect()->back();
  }
}
