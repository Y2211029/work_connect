<?php


namespace App\Http\Controllers\settings;

use App\Models\w_users;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\w_pre_check_email;
use Illuminate\Support\Facades\Crypt; // Cryptファサードをインポート

class SettingCheckEmailController extends Controller
{
    public function settingCheckEmail(Request $request)
    {
        $kind = $request->input("kind");
        $urltoken = $request->input("urltoken");
        $email = $request->input("email");
        \Log::info('$kind.' . $kind);
        \Log::info('$urltoken.' . $urltoken);
        \Log::info('$email.' . $email);

        if ($kind == "s") {
            // トークンと暗号化されたメールが一致するレコードを取得
            $preCheckEmail = w_pre_check_email::where("urltoken", $urltoken)
                ->where("mail", $email)
                ->first();

            \Log::info('$preCheckEmail.' . $preCheckEmail);

            if ($preCheckEmail) {
                // 一致するレコードがあればメールを復号化
                $decryptedEmail = Crypt::decryptString($preCheckEmail->mail);

                // w_usersテーブルの該当ユーザーを更新
                w_users::where('id', $preCheckEmail->user_id)
                    ->update(['mail' => $decryptedEmail]);

                \Log::info('w_usersテーブルのmailを変更しました。: ' . $preCheckEmail->user_id);

                w_pre_check_email::where("urltoken", $urltoken)->where("mail", $email)->delete();

                return json_encode("success");
            } else {
                \Log::info('mailを変更できませんでした。.');
                return json_encode("error: no matching record found");
            }
        }
    }
}
