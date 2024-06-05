<?php

namespace App\Http\Controllers\register;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Mail\mailSend;
use App\Models\WPreUser;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;


class pre_registerController extends Controller
{
    //
    public function pre_registerController(Request $request){

        // react側からのリクエスト
        $mail = $request->input('mail');
        
        // w_usersテーブルから$mailと一致するユーザー情報を抽出
        $userInfo = DB::table('w_users')
            ->where('mail', "$mail")
            ->first();

        if($userInfo == null){
            // w_usersテーブルにアドレスが存在しない場合、アカウント作成ができる
            \Log::info('アドレス：'.$mail);
            \Log::info('アカウント作れます');

            // w_pre_usersテーブルにトークンとメールアドレスを挿入
            // Eloquentモデルを使用
            $w_pre_user = WPreUser::create([
                'urltoken' => Str::random(60), // urltokenに値を設定
                'mail' => "$mail", 
            ]);


            $details = [
                'title' => '仮登録ありがとうございます。',
                'body' => '下記URLをクリックして、本登録を完了させてください。',
                'url' => 'http://localhost:5174/?urltoken='.$w_pre_user->urltoken
            ];
        
            Mail::to($mail)->send(new mailSend($w_pre_user,$details));
        
            return json_encode("true");
        } else {
            // w_usersテーブルにアドレスが存在する場合、アカウントは作れない
            \Log::info('アドレス：'.$mail);
            \Log::info('アカウント作れません');
        
            return json_encode("false");
        }

        
        
    }

}



