<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use \App\Models\User;

class TeamCreatedMail extends Mailable
{
  use Queueable, SerializesModels;

  /**
   * The user (team) the email is being sent to
   * @var \App\Models\User
   */
  public $user;
  /**
   * @var string
   */
  public $password;

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
    return $this->subject('Registered for DPS Goethe Quiz')
      ->view('mail.team_created')
      ->with([
        'user' => $this->user,
        'password' => $this->password,
      ]);
  }
}
