<?php

namespace App\Http\Controllers\company;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\w_company;
use App\Models\w_follow;
use Illuminate\Support\Facades\Log;


class GetCompanyListController extends Controller
{

    public function GetCompanyListController(Request $request, $id)
    {
        try {
            // 全企業ユーザーリストを取得
            $CompanyOfList = w_company::select()->get();

            // もしも$idが学生側の場合
            if ("S" === $id[0]) {

                // 各ユーザーのフォロー状態を確認して更新
                $CompanyOfList = $CompanyOfList->map(function ($user) use ($id) {
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
                $CompanyOfList = $CompanyOfList->map(function ($user) {
                    $user->follow_status = 'フォローできません';
                    return $user;
                });
            }

            Log::info(json_encode($CompanyOfList));

            // 結果をJSON形式で返す
            return response()->json($CompanyOfList);
        } catch (\Exception $e) {
            Log::info('GetStudentListController: エラー');
            Log::info($e);

            // エラーメッセージをJSON形式で返す
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
