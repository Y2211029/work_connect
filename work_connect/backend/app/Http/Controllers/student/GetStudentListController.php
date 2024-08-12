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
            $page = (int) $request->query('page', 1);
            $perPage = 20; //一ページ当たりのアイテム数
            $offset = ($page - 1) * $perPage;

            $userList = w_users::skip($offset)
                ->take($perPage)
                ->get();
            $userListArray = json_decode(json_encode($userList), true);

            \Log::info('GetStudentListController:$userListArray:');
            \Log::info(json_encode($userListArray));

            return json_encode($userListArray);
        } catch (\Exception $e) {
            \Log::error('GetStudentListController:user_name重複チェックエラー');
            \Log::error($e);

            return response()->json($e->getMessage(), 500);
        }
    }
}
