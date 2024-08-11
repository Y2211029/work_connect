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

            $page = (int) $request->query('page', 1);
            $perPage = 20; //一ページ当たりのアイテム数
            $offset = ($page - 1) * $perPage;

            $StudentOfList = w_users::skip($offset)
                ->take($perPage)
                ->get();

            // 各ユーザーのフォロー状態を確認して更新
            $StudentOfList = $StudentOfList->map(function ($user) use ($id) {
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

            Log::info('GetStudentListController:$StudentOfList:');
            Log::info(json_encode($StudentOfList));

            // 結果をJSON形式で返す
            return response()->json($StudentOfList);
        } catch (\Exception $e) {
            Log::error('GetStudentListController: エラー');
            Log::error($e);

            // エラーメッセージをJSON形式で返す
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
