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
            // ProfileIdを取得 
            $profileId = $request->input('ProfileId');
            $userList = w_users::where('id', $profileId)->get();
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
