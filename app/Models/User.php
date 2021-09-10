<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
  use HasApiTokens, HasFactory, Notifiable;

  /**
   * The attributes that are mass assignable.
   *
   * @var array
   */
  protected $fillable = [
    'email',
    'password',
    'type',
    'name',
    'principal',
    'country',
    'phone',
    'teacher_incharge',
    'address',
    'student_1',
    'student_2',
    'school_id'
  ];

  /**
   * The attributes that should be hidden for arrays.
   *
   * @var array
   */
  protected $hidden = [
    'password',
    'remember_token',
  ];

  /**
   * The attributes that should be cast to native types.
   *
   * @var array
   */
  protected $casts = [
    'email_verified_at' => 'datetime',
  ];

  public function teams()
  {
    return $this->hasMany(User::class, 'school_id');
  }

  public function school()
  {
    return $this->belongsTo(User::class, 'school_id');
  }

  /**
   * Generate a random password, meant for team accounts
   * 
   * @return string $password
   */
  public static function randomPwd()
  {
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $password = '';
    for ($i = 0; $i < 15; $i++) {
      $password = $password . $characters[rand(0, strlen($characters) - 1)];
    }

    return $password;
  }
}
