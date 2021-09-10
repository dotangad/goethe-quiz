<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
  use HasFactory;

  public $fillable = [
    'text',
    'hint',
    'answer',
  ];

  public function users()
  {
    return $this->hasMany(User::class, 'question_id');
  }

  public function attempts()
  {
    return $this->hasMany(UserAttempt::class);
  }
}
