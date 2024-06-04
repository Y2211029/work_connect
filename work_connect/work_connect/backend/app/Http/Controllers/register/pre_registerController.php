<?php

namespace App\Http\Controllers\register;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Mail\mailSend;
use Illuminate\Support\Facades\Mail;

class pre_registerController extends Controller
{
    //
    public function pre_registerController(Request $request){

        $mail = $request->input('mail');
        
        

        $details = [
            'title' => 'Mail from Laravel',
            'body' => 'This is a test mail sent from Laravel.'
        ];
    
        Mail::to($mail)->send(new mailSend($details));
    
        return json_encode("Email Sent!");
        
    }

}



