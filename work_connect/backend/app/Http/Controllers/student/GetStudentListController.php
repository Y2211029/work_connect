<?php

namespace App\Http\Controllers\student;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\w_users;

class GetStudentListController extends Controller
{
    public function GetStudentListController(Request $request)
    {
        try {
            $userList = w_users::select()->get();
            $userListArray = json_decode(json_encode($userList), true);

            \Log::info('GetStudentListController:$userListArray:');
            \Log::info(json_encode($userListArray));
            // echo json_encode($userListArray);
            return json_encode($userListArray);
        } catch (\Exception $e) {
            \Log::info('GetStudentListController:user_name重複チェックエラー');
            \Log::info($e);

            /*reactに返す*/
            echo json_encode($e);
        }
    }
}
