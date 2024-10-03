<?php

namespace App\Http\Controllers\settings;

use App\Models\w_users;
use App\Models\w_company;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Mail\mailSend;
use App\Models\w_pre_check_email;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;


class SettingChangeEmailController extends Controller
{
    // 色を変更する
    public function settingChangeEmail(Request $request)
    {
        $id = $request->input("id");
        $email = $request->input("email");
        \Log::info('ChangeEmaile' . $email);

        if ($id[0] === "S") {
            // 学生側 
            // w_pre_usersテーブルにトークンとメールアドレスを挿入
            // Eloquentモデルを使用
            $w_pre_check_email = w_pre_check_email::create([
                'urltoken' => Str::random(60), // urltokenに値を設定
                'mail' => "$email",
            ]);

            $details = [
                'title' => '【Work&Connect : メールアドレス確認】',
                'body' => '下記URLをクリックし、メールアドレス変更を完了してください',
                'url' => 'http://localhost:5174/Setting/?kind=s&urltoken=' . $w_pre_check_email->urltoken
            ];

            Mail::to($email)->send(new mailSend($w_pre_check_email, $details));


            // w_users::where('id', $id)->update([
            //     'mail' => $email,
            // ]);

        } else {
            w_company::where('id', $id)->update([
                'mail' => $email,
            ]);
        }

        \Log::info('ChangeEmailerror' . $email);

        return json_encode("success");
    }
}
