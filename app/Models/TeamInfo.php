<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TeamInfo extends Model
{
  use HasFactory;

  public $fillable = [
    'email',
    'student_1',
    'student_2',
    'user_id',
    'school_id'
  ];

  public function user()
  {
    return $this->belongsTo(User::class, 'user_id');
  }

  public function school()
  {
    return $this->belongsTo(User::class, 'school_id');
  }
}
