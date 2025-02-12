<?php

namespace App\Http\Controllers\student;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\w_users;
use App\Models\w_follow;
use Illuminate\Support\Facades\Log;

class GetStudentListController extends Controller
{
    public function GetStudentListController(Request $request, $MyId)
    {
        try {

            // ページネーションの設定
            $page = (int) $request->query('page', 1);
            $perPage = 20; // 一ページ当たりのアイテム数
            $offset = ($page - 1) * $perPage;

            // 結果をJSON形式で返す


            // ユーザーリストを取得
            $StudentOfList = w_users::skip($offset)
                ->take($perPage)
                ->get();

            $totalItems = $StudentOfList->count();

            // 各ユーザーのフォロー状態を確認して更新
            $StudentOfList = $StudentOfList->map(function ($user) use ($MyId) {
                // ユーザーのIDを取得
                $id = $user->id;
                // Log::info('$user->id');
                // Log::info($id);
                // もしも $id の最初の文字が "S" であれば、フォロー状態を確認
                if ($id[0] !== $MyId[0]) {
                    // Log::info('ID[0]が "C" の場合の処理を実行');
                    // Log::info('IDの値: ' . $id);

                    // フォローしているかどうか
                    $isFollowing = w_follow::where('follow_sender_id', $MyId)
                        ->where('follow_recipient_id', $id)
                        ->exists();

                    // フォローされているかどうか
                    $isFollowedByUser = w_follow::where('follow_sender_id', $id)
                        ->where('follow_recipient_id', $MyId)
                        ->exists();

                    // フォロー状態を設定
                    if ($isFollowing && $isFollowedByUser) {
                        $user->follow_status = '相互フォローしています';
                    } elseif ($isFollowing) {
                        $user->follow_status = 'フォローしています';
                    } elseif ($isFollowedByUser) {
                        $user->follow_status = 'フォローされています';
                    } else {
                        $user->follow_status = 'フォローする';
                    }

                } else {
                    // $id の最初の文字が "S" でない場合はフォローできないメッセージを設定
                    $user->follow_status = 'フォローできません';
                }

                return $user;
            });

            Log::info('GetStudentListController: $StudentOfList:');
            Log::info(json_encode($StudentOfList));


            $message = null;
            if ($page == 1 && $totalItems === 0) {
                $message = "0件です。";
            }

            return response()->json([
                'list' => $StudentOfList,
                'count' => $totalItems,
                'message' => $message,
            ]);
            
        } catch (\Exception $e) {
            Log::error('GetStudentListController: エラー');
            Log::error($e);

            // エラーメッセージをJSON形式で返す
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
