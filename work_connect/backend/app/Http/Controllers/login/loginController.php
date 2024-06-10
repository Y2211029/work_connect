<?php

namespace App\Http\Controllers\login;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;

class loginController extends Controller
{
    //
    public function loginController(Request $request){

        
        $userName = $request->input('user_name');
        $password = $request->input('password');
        $password_x = Hash::make($password);
        // 試し
        \Log::info('hash:'.$password_x);
        // Hash::check(平文のパスワード, ハッシュ化したパスワード)
        if(Hash::check($password, $password_x)){
          \Log::info('hash OK');
        }
        // 
        \Log::info('get_InputValue: ' . json_encode($userName));
    
        
        if(!empty($userName)&&!empty($password)){
          if(preg_match('/@/', $userName)){
            // @マークを含む(メールアドレス)
            $userInfo = DB::table('w_users')
            ->where('mail', "$userName")
            ->where('password', "$password")
            ->first();
          } else {
            // @マークを含まない(ユーザー名)
            $userInfo = DB::table('w_users')
            ->where('user_name', "$userName")
            ->where('password', "$password")
            ->first();
          }
          
          \Log::info('get_InputValue(b): ' . json_encode($userName));
          \Log::info('userInfo: ' . json_encode($userInfo));
          // return json_encode($userInfo);
          /*reactに返す*/
          echo json_encode($userInfo);
          //return response()->json($userInfo2, 200, [], JSON_UNESCAPED_UNICODE);
          //return '<script>alert("やあ")</script>';
        
        }
    }

}
