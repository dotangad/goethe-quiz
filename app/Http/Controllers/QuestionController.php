<?php

namespace App\Http\Controllers;

use App\Models\Question;
use Illuminate\Http\Request;
use Inertia\Inertia;

class QuestionController extends Controller
{
  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function index()
  {
    return Inertia::render('admin/questions', [
      'questions' => Question::all(),
      'createError' => null
    ]);
  }

  /**
   * Show the form for creating a new resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function create(Request $request)
  {
    //
  }

  /**
   * Store a newly created resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return \Illuminate\Http\Response
   */
  public function store(Request $request)
  {
    $body = $request->validate([
      'text' => 'required',
      'hint' => 'required',
      'answer' => ['required', 'regex:/^[0-9 a-z]+$/']
    ]);

    (new Question($body))->save();

    return redirect()->back();
  }

  /**
   * Display the specified resource.
   *
   * @param  \App\Models\Question  $question
   * @return \Illuminate\Http\Response
   */
  public function show(Question $question)
  {
    //
  }

  /**
   * Show the form for editing the specified resource.
   *
   * @param  \App\Models\Question  $question
   * @return \Illuminate\Http\Response
   */
  public function edit(Question $question)
  {
    //
  }

  /**
   * Update the specified resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @param  \App\Models\Question  $question
   * @return \Illuminate\Http\Response
   */
  public function update(Request $request, Question $question)
  {
    $body = $request->validate([
      'text' => 'required',
      'hint' => 'required',
      'answer' => ['required', 'regex:/^[0-9 a-z]+$/']
    ]);

    Question::where('id', $question->id)
      ->update(
        collect($body)
          ->only(['text', 'hint', 'answer'])
          ->toArray()
      );

    return redirect()->back();
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param  \App\Models\Question  $question
   * @return \Illuminate\Http\Response
   */
  public function destroy(Question $question)
  {
    //
  }
}
