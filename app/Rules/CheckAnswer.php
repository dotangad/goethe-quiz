<?php

namespace App\Rules;

use App\Models\UserAttempt;
use Illuminate\Contracts\Validation\Rule;

class CheckAnswer implements Rule
{
  /**
   * Create a new rule instance.
   *
   * @return void
   */
  public function __construct()
  {
    //
  }

  /**
   * Determine if the validation rule passes.
   *
   * @param  string  $attribute
   * @param  mixed  $value
   * @return bool
   */
  public function passes($attribute, $value)
  {
    $q = request()->user()->question;
    $answer = $q->answer;

    (new UserAttempt([
      'user_id' => request()->user()->id,
      'question_id' => $q->id,
      'attempt' => $value
    ]))->save();

    return $answer === $value;
  }

  /**
   * Get the validation error message.
   *
   * @return string
   */
  public function message()
  {
    return 'Incorrect answer, please try again.';
  }
}
