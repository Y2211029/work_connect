<?php

namespace App\Http\Controllers\follow;

use App\Models\w_follow;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Carbon\Carbon;

class FollowController extends Controller
{
    // フォロー処理のメソッド
    public function FollowController(Request $request)
    {
        // 日本の現在時刻を取得
        $now = Carbon::now('Asia/Tokyo');

        // react側からのリクエスト
        $sender_id = $request->input('sender_id');
        $recipient_id = $request->input('recipient_id');

        // フォロー情報の存在を確認
        $follow_check = w_follow::where('follow_sender_id', $sender_id)
            ->where('follow_recipient_id', $recipient_id)
            ->first();

        if ($follow_check) {
            // フォロー情報が存在する場合、削除する
            $follow_check->delete();
        } else {
            // フォロー情報が存在しない場合、新規にフォロー情報を保存する
            w_follow::create([
                'follow_sender_id' => $sender_id,
                'follow_recipient_id' => $recipient_id,
                'follow_datetime' => $now,
            ]);
        }

        // フォロー状態を確認
        $isFollowing = w_follow::where('follow_sender_id', $sender_id)
            ->where('follow_recipient_id', $recipient_id)
            ->exists();

        $isFollowedByUser = w_follow::where('follow_sender_id', $recipient_id)
            ->where('follow_recipient_id', $sender_id)
            ->exists();

        // フォロー状態を決定
        if ($isFollowing && $isFollowedByUser) {
            $followStatus = '相互フォローしています';
        } elseif ($isFollowing) {
            $followStatus = 'フォローしています';
        } elseif ($isFollowedByUser) {
            $followStatus = 'フォローされています';
        } else {
            $followStatus = 'フォローする';
        }

        // フォロー状況を JSON 形式で返す
        return response()->json([
            'message' => 'フォロー処理が完了しました',
            'follow_status' => $followStatus
        ]);
    }
}
