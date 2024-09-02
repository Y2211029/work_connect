<?php

namespace App\Http\Controllers\student;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\w_users;

class GetStudentListController extends Controller
{
<<<<<<< HEAD
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
=======
    public function GetStudentListController(Request $request, $id)
    {
        try {

            $page = (int) $request->query('page', 1);
            $perPage = 20; //一ページ当たりのアイテム数
            $offset = ($page - 1) * $perPage;

            $StudentOfList = w_users::skip($offset)
                ->take($perPage)
                ->get();

            // 各ユーザーのフォロー状態を確認して更新
            $StudentOfList = $StudentOfList->map(function ($user) {
                // 藤田が変更：URLのGETパラメータ値(ID)を取得していたが、無限ロードの関係上一つのURLで20個アイテムを取得する使用なので、IDが不整合になる。
                // そのため、w_usersからidを直接取得する。
                // $StudentOfList = $StudentOfList->map(function ($user) use ($id) {

                // ユーザーのIDを取得
                $id = $user->id;

                // ユーザーがログインしているアカウントをフォローしているかどうか
                $isFollowing = w_follow::where('follow_sender_id', $id)
                    ->where('follow_recipient_id', $id)
                    ->exists();

                // ログインしているアカウントがユーザーをフォローしているかどうか
                $isFollowedByUser = w_follow::where('follow_sender_id', $id)
                    ->where('follow_recipient_id', $id)
                    ->exists();

                    if ($isFollowing && $isFollowedByUser) {
                        $user->follow_status = '相互フォローしています';
                    } elseif ($isFollowing) {
                        $user->follow_status = 'フォローしています';
                    } elseif ($isFollowedByUser) {
                        $user->follow_status = 'フォローされています';
                    } else {
                        $user->follow_status = 'フォローする';
                    }

                    return $user;
                });
            // } else {
            //     // $idが学生の場合、フォローできないメッセージを設定
            //     $studentList = $studentList->map(function ($user) {
            //         $user->follow_status = 'フォローできません';
            //         return $user;
            //     });
            // }

            Log::info('IDの値:');
            Log::info(var_export($id, true));

            Log::info('ID[0]の値:');
            Log::info(var_export($id[0], true));


            // Log::info('GetStudentListController: $studentList:');
            // Log::info(json_encode($studentList));

            // 結果をJSON形式で返す
            return json_encode($StudentOfList);
        } catch (\Exception $e) {
            Log::error('GetStudentListController: エラー');
            Log::error($e);
>>>>>>> 1251a7d83d65dbd03393e8f4b952d240f5d5c002

            /*reactに返す*/
            echo json_encode($e);
        }
    }
}
