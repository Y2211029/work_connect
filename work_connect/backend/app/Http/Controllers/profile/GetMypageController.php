<?php

namespace App\Http\Controllers\profile;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\w_users;

class GetMypageController extends Controller
{
    public function GetMypageController(Request $request)
    {
        try {
            // ProfileUserNameを取得 
            $profileId = $request->input('ProfileUserName');
            $userList = w_users::where('user_name', $profileId)->get();
            //$userListArray = json_decode(json_encode($userList), true);
            \Log::info($userList);

            return json_encode($userList);
        } catch (\Exception $e) {
            \Log::info('GetMypageController:user_name重複チェックエラー');
            \Log::info($e);

            /*reactに返す*/
            echo json_encode($e);
        }
    }
}
