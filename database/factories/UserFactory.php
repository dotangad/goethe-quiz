<?php

namespace Database\Factories;

use App\Models\Question;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserFactory extends Factory
{
  /**
   * The name of the factory's corresponding model.
   *
   * @var string
   */
  protected $model = User::class;

  /**
   * ID of user record (school) that owns team
   * @var int
   */
  public $school_id;

  /**
   * Number of teams to create per school
   * @var int
   */
  public $teams = 5;

  /**
   * Define the model's default state.
   *
   * @return array
   */
  public function definition()
  {
    return [
      'type' => 'school',
      'email' => $this->faker->unique()->safeEmail(),
      'email_verified_at' => now(),
      'password' => Hash::make('password'), // password
      'remember_token' => Str::random(10),

      'name' => $this->faker->company(),
      'principal' => $this->faker->name(),
      'principal_mobile' => '1234567890',
      'postal_code' => '110022',
      'teacher_incharge' => $this->faker->name(),
      'teacher_incharge_email' => $this->faker->unique()->safeEmail(),
      'teacher_incharge_mobile' => '1234567890',
      'address' => $this->faker->address()
    ];
  }

  public function configure()
  {
    return $this->afterCreating(function (User $user) {
      if ($user->type == 'school') {
        for ($i = 0; $i < $this->teams; $i++) {
          $u = new User([
            'type' => 'team',
            'email' => $this->faker->unique()->safeEmail(),
            'password' => Hash::make('password'), // password
            'student_name' => $this->faker->name(),
            'student_mobile' => '1234567890',
            'school_id' => $user->id,
            'question_id' => Question::count() > 0 ? 1 : null,
            'logged_in' => false
          ]);
          $u->save();
        }
      }
    });
  }

  /**
   * Set type of user to team
   * 
   * @var $school_id int
   */
  public function team($school_id)
  {
    return $this->state(function () use ($school_id) {
      return [
        'type' => 'team',
        'password' => Hash::make('password'), // password
        'student_name' => $this->faker->name(),
        'student_mobile' => '1234567890',
        'school_id' => $school_id,
        'question_id' => Question::count() > 0 ? 1 : null,
        'logged_in' => false,

        'name' => null,
        'principal' => null,
        'principal_mobile' => null,
        'postal_code' => null,
        'teacher_incharge' => null,
        'teacher_incharge_email' => null,
        'teacher_incharge_mobile' => null,
        'address' => null
      ];
    });
  }

  /**
   * Set type of user to admin
   * 
   * @var $email string
   * @var $password string
   */
  public function admin($email, $password)
  {
    return $this->state(function ($attr) use ($email, $password) {
      return [
        'type' => 'admin',
        'email' => $email ? $email : $attr['email'],
        'password' => $password ? Hash::make($password) : $attr['password'],

        'name' => null,
        'principal' => null,
        'principal_mobile' => null,
        'postal_code' => null,
        'teacher_incharge' => null,
        'teacher_incharge_email' => null,
        'teacher_incharge_mobile' => null,
        'address' => null
      ];
    });
  }

  /**
   * Indicate that the model's email address should be unverified.
   *
   * @return \Illuminate\Database\Eloquent\Factories\Factory
   */
  public function unverified()
  {
    return $this->state(function () {
      return [
        'email_verified_at' => null,
      ];
    });
  }
}
