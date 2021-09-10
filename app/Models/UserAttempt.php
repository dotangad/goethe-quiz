<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserAttempt extends Model
{
  use HasFactory;

  /**
   * User that owns this attempt
   */
  public function user()
  {
    return $this->belongsTo(User::class, 'user_id');
  }

  /**
   * Question that this attempt is for
   */
  public function question()
  {
    return $this->belongsTo(Question::class, 'question_id');
  }
}
