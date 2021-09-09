<?php

namespace App\Mail;

use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class TeamPasswordReset extends Mailable
{
  use Queueable, SerializesModels;

  /**
   * Create a new message instance.
   *
   * @return void
   */
  public function __construct(User $user, string $password)
  {
    $this->user = $user;
    $this->password = $password;
  }

  /**
   * Build the message.
   *
   * @return $this
   */
  public function build()
  {
    return $this->subject('DPS Goethe Quiz: Password reset')
      ->view('mail.team_password_reset')
      ->with([
        'user' => $this->user,
        'password' => $this->password,
      ]);
  }
}
