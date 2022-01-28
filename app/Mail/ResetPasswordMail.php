<?php

namespace App\Mail;

use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class ResetPasswordMail extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * The user (team) the email is being sent to
     * @var \App\Models\User
     */
    public $user;


    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(User $user)
    {
        $this->user = $user;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        $jwt = JWT::encode(array(
            "iss" => "https://dpsgoethequiz.com",
            "aud" => "https://dpsgoethequiz.com",
            "iat" => now()->timestamp,
            "exp" => now()->addHours(24)->timestamp,
            "id" => $this->user->id,
        ), env('JWT_KEY'), 'HS256');
        return $this->subject('Wunderking Quiz - Forgot Password')->from(env('MAIL_FROM_ADDRESS', 'dpsgoethequiz@dpsrkp.net'), env('MAIL_FROM_NAME', 'DPS Goethe Quiz'))->view('mail.forgot_password')->with([
            'user' => $this->user,
            'link' => url("/forgot-password/" . $jwt),
        ]);
    }
}
