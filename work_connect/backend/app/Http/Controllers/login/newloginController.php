<?php

namespace App\Http\Controllers\login;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class newloginController extends Controller
{
    //
    public function loginController(Request $request){

        
        $userName = $request->input('user_name');
        $mail = $request->input('mail');
        $password = $request->input('password');
       
        \Log::info('aaaaaaaaaaaaaaaaaa');
        // 
        \Log::info('get_InputValue: ' . json_encode($userName));
    
        
        if(!empty($userName)&&!empty($mail)&&!empty($password)){
          $userInfo2 = DB::table('w_users')
          // ->where('user_name', json_encode($userName))
          ->where('user_name', "$userName")
          ->where('mail', "$mail")
          ->where('password', "$password")
          ->first();
          \Log::info('get_InputValue(b): ' . json_encode($userName));
          \Log::info('userInfo2: ' . json_encode($userInfo2));
          // return json_encode($userInfo2);
          /*reactに返す*/
          echo json_encode($userInfo2);
          //return response()->json($userInfo2, 200, [], JSON_UNESCAPED_UNICODE);
          //return '<script>alert("やあ")</script>';
        
        }
    }

}
