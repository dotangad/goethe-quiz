<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SchoolInfo extends Model
{
  use HasFactory;
  /**
   * The attributes that are mass assignable.
   *
   * @var array
   */
  protected $fillable = [
    'name',
    'principal',
    'country',
    'phone',
    'teacher_incharge',
    'address',
    'user_id'
  ];

  public function user()
  {
    return $this->belongsTo(User::class, 'user_id');
  }
}
