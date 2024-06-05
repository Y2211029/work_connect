<?php

namespace App\Http\Controllers\register;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\WPreUser;

class preRegisterCheckController extends Controller
{
    public function preRegisterCheckController(Request $request){

        // react側からのリクエスト
        $url_token = $request->input('url_token');
        
        // w_pre_usersテーブルから$url_tokenと一致するユーザー情報を抽出
        $userInfo = DB::table('w_pre_users')
            ->where('token', "$url_token")
            ->where('flg', 0)
            ->first();

        if($userInfo == null){
            // w_pre_usersテーブルのurltokenと一致した場合、本登録ができる
            \Log::info('url_token：'.$url_token);
            \Log::info('url_tokenが存在します');
        
            return json_encode("true");
        } else {
            // w_pre_usersテーブルのurltokenと一致しない場合、本登録はできない
            \Log::info('url_token：'.$url_token);
            \Log::info('url_tokenが正しくありません');
        
            return json_encode("false");
        }
    }
}
