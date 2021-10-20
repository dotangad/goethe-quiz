<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UserChanges extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    Schema::table('users', function (Blueprint $table) {
      // School
      $table->dropColumn('country');
      $table->dropColumn('phone');
      $table->string('postal_code')->nullable();
      $table->string('principal_mobile')->nullable();
      $table->string('teacher_incharge_email')->nullable();
      $table->string('teacher_incharge_mobile')->nullable();

      // Team
      $table->dropColumn('student_1');
      $table->dropColumn('student_2');
      $table->string('student_name')->nullable();
      $table->string('student_mobile')->nullable();
    });
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down()
  {
    Schema::table('users', function (Blueprint $table) {
      // School
      $table->string('country')->nullable();
      $table->string('phone')->nullable();
      $table->dropColumn('postal_code');
      $table->dropColumn('principal_mobile');
      $table->dropColumn('teacher_incharge_email');
      $table->dropColumn('teacher_incharge_mobile');
      $table->dropColumn('postal_code');

      // Team
      $table->string('student_1')->nullable();
      $table->string('student_2')->nullable();
      $table->dropColumn('student_name');
      $table->dropColumn('student_mobile');
    });
  }
}
