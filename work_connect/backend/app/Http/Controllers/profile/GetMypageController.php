<?php

namespace App\Http\Controllers\profile;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\w_users;
use App\Models\w_company;

class GetMypageController extends Controller
{
    public function GetMypageController(Request $request)
    {
        try {
            // 学生か企業か判断
            $profileKind = $request->input('kind');
            // ProfileUserNameを取得
            $profileUserName = $request->input('ProfileUserName');
            if($profileKind === "s"){
                $userList = w_users::where('user_name', $profileUserName)->get();
            } else if($profileKind === "c"){
                $userList = w_company::where('user_name', $profileUserName)->get();
            } else {
                \Log::info('$profileKindエラー');
            }

            $userListIcon = $userList->first()->icon;
            $userList->first()->icon = asset('storage/images/userIcon/' .$userListIcon);
            //\Log::info("userIconUrl::".$userIconUrl);

            return json_encode($userList);
        } catch (\Exception $e) {
            \Log::info('GetMypageController:user_name重複チェックエラー');
            \Log::info($e);

            /*reactに返す*/
            echo json_encode($e);
        }
    }
}
