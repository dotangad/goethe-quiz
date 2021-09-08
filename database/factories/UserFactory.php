<?php

namespace Database\Factories;

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
  public $teams = 2;

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
    ];
  }

  public function configure()
  {
    return $this->afterCreating(function (User $user) {
      if ($user->type == 'school') {
        (new \App\Models\SchoolInfo([
          'user_id' => $user->id,
          'name' => $this->faker->company(),
          'principal' => $this->faker->name(),
          'country' => 'India',
          'phone' => '+91 1234567890',
          'teacher_incharge' => $this->faker->name(),
          'address' => $this->faker->address()
        ]))->save();

        for ($i = 0; $i < $this->teams; $i++) {
          $u = new User([
            'type' => 'team',
            'email' => $this->faker->unique()->safeEmail(),
            'password' => Hash::make('password'), // password
          ]);
          $u->save();

          (new \App\Models\TeamInfo([
            'email' => $u->email,
            'student_1' => $this->faker->name(),
            'student_2' => $this->faker->name(),
            'user_id' => $u->id,
            'school_id' => $user->id,
          ]))->save();
        }
      }
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
        'password' => $password ? $password : $attr['password'],
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
