<?php

namespace App\Http\Controllers\student;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\w_users;
use App\Models\w_follow;
use Illuminate\Support\Facades\Log;

class GetStudentListController extends Controller
{
    public function GetStudentListController(Request $request, $id)
    {
        try {
            // 全ユーザーリストを取得
            $studentList = w_users::all();

            // もしも$idが企業側の場合
            if ("C" === $id[0]) {
                Log::info($id[0]);
                Log::info($id);
                // 各ユーザーのフォロー状態を確認して更新
                $studentList = $studentList->map(function ($user) use ($id) {
                    // ユーザーがログインしているアカウントをフォローしているかどうか
                    $isFollowing = w_follow::where('follow_sender_id', $id)
                        ->where('follow_recipient_id', $user->id)
                        ->exists();

                    // ログインしているアカウントがユーザーをフォローしているかどうか
                    $isFollowedByUser = w_follow::where('follow_sender_id', $user->id)
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
            } else {
                // $idが学生の場合、フォローできないメッセージを設定
                $studentList = $studentList->map(function ($user) {
                    $user->follow_status = 'フォローできません';
                    return $user;
                });
            }

            Log::info('IDの値:');
            Log::info(var_export($id, true));

            Log::info('ID[0]の値:');
            Log::info(var_export($id[0], true));


            Log::info('GetStudentListController: $studentList:');
            Log::info(json_encode($studentList));

            // 結果をJSON形式で返す
            return response()->json($studentList);
        } catch (\Exception $e) {
            Log::error('GetStudentListController: エラー', ['error' => $e->getMessage()]);

            // エラーメッセージをJSON形式で返す
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
