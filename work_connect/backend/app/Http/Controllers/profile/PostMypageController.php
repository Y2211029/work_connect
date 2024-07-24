<?php

namespace App\Http\Controllers\profile;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\w_users;

class PostMypageController extends Controller
{
    public function PostMypageController(Request $request)
    {
        try {
            $userList = w_users::select()->get();
            $userListArray = json_decode(json_encode($userList), true);

            \Log::info('PostMypageController:$userListArray:');
            \Log::info(json_encode($userListArray));
            // echo json_encode($userListArray);
            return json_encode($userListArray);
        } catch (\Exception $e) {
            \Log::info('PostMypageController:user_name重複チェックエラー');
            \Log::info($e);

            /*reactに返す*/
            echo json_encode($e);
        }
    }
}
