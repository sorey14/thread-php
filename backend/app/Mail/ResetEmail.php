<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class ResetEmail extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        $mailData = [
            'subject' => 'Mailtrap Confirmation reset password',
            'destination' => 'reset paaasword',
        ];
        $html = view('auth.passwords.reset', $mailData)->render();
        return $html;
        //return $this->subject('Welcome!')->view('auth.passwords.reset');
       /* return $this->from('laravel@example.com', 'Mailtrap')
            ->subject('Mailtrap Confirmation reset password')
            ->markdown('auth.passwords.reset');*/
    }
}
