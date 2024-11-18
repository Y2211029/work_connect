<?php

namespace App\Http\Controllers\chat;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Carbon\Carbon;
use App\Models\w_follow;
use App\Models\w_chat;
use App\Models\w_users;
use App\Models\w_company;
use Illuminate\Support\Facades\Log;

class GetChannelListController extends Controller
{
    public function GetChannelListController(Request $request)
    {
        try {
            // Reactからログイン中のidを取得
            $MyUserId = $request->input('MyUserId');

            // 配列の初期化
            $follower_list = [];
            $unique_list = [];
            $channel_list = [];

            // follow_sender_id または follow_recipient_id のどちらかが $MyUserId と一致する場合のみ追加。
            // チャットの履歴が最新順の組み合わせから優先して並べる。チャット履歴がない場合はデフォルト順。
            $follower_list = w_follow::where('follow_sender_id', $MyUserId)
                ->orWhere('follow_recipient_id', $MyUserId)
                ->orderByRaw('chat_datetime IS NOT NULL DESC, chat_datetime DESC, id ASC')
                ->get();

            // フォロー関係にある人の数だけループ処理
            foreach ($follower_list as $record) {

                // $dataに学生/企業の情報を入れておく処理
                if ($record->follow_sender_id === $MyUserId) {
                    // 相手のid
                    $follow_recipient_id = $record->follow_recipient_id;
                    $data = $this->getUserData($follow_recipient_id, $MyUserId);
                    // 相手側とのフォロー状態
                    $followStatus = $this->profileFollowStatusCheck($follow_recipient_id, $MyUserId);
                } else if ($record->follow_recipient_id === $MyUserId) {
                    // 相手のid
                    $follow_sender_id = $record->follow_sender_id;
                    $data = $this->getUserData($follow_sender_id, $MyUserId);
                    // 相手側とのフォロー状態
                    $followStatus = $this->profileFollowStatusCheck($follow_sender_id, $MyUserId);
                }

                // 重複を避けるためにidが$unique_listに存在しない場合のみchannel_listに追加
                if (!in_array($data->id, $unique_list)) {

                    // 未読の件数取得
                    $unreadCount = $this->getUnreadCount($MyUserId, $data->id);

                    // チャットの履歴(最後にやり取りした時間)取得
                    $chat_datetime = $this->getChatDatetime($MyUserId, $data->id);

                    // channel_listに値を入れる
                    $channel_list[] = [
                        'id' => $data->id,
                        'user_name' => $data->user_name,
                        'company_name' => $data->company_name ?? null,
                        'icon' => $data->icon,
                        'follow_status' => $followStatus,
                        'unread' => $unreadCount,
                        'chat_log' => $chat_datetime
                    ];
                }

                // 重複防止のため、$unique_listにidを追加
                $unique_list[] = $data->id;
            }

            if ($channel_list) {
                // Reactに返す
                return response()->json($channel_list);
            }

        } catch (\Exception $e) {
            Log::error('GetChannelListController: エラー', ['exception' => $e]);

            // エラーメッセージをJSON形式で返す
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    // ユーザー情報を取得する関数
    private function getUserData($userId, $MyUserId)
    {
        if ($MyUserId[0] === "S") {
            // 自分が学生の場合、企業テーブルを参照
            return w_company::where('id', $userId)->first();
        } else if ($MyUserId[0] === "C") {
            // 自分が企業の場合、学生テーブルを参照
            return w_users::where('id', $userId)->first();
        }
    }

    // 未読件数を取得する関数
    private function getUnreadCount($MyUserId, $PairUserId)
    {
        return w_chat::where('get_user_id', $MyUserId)
            ->where('send_user_id', $PairUserId)
            ->where('check_read', '未読')
            ->count();
    }

    // チャットの最終やり取り日時を取得する関数
    private function getChatDatetime($MyUserId, $PairUserId)
    {
        $chatLog = w_follow::where(function ($query) use ($MyUserId, $PairUserId) {
            $query->where('follow_sender_id', $MyUserId)
                ->where('follow_recipient_id', $PairUserId);
        })
        ->orWhere(function ($query) use ($MyUserId, $PairUserId) {
            $query->where('follow_recipient_id', $MyUserId)
                ->where('follow_sender_id', $PairUserId);
        })
        ->first();

        if ($chatLog && $chatLog->chat_datetime) {
            // 現在時刻を取得
            $chatDate = Carbon::parse($chatLog->chat_datetime, 'Asia/Tokyo');

            // 日付ごとの処理
            if ($chatDate->isToday()) {
                // 今日の場合は時間のみ表示（例: 19:00）
                return $chatDate->format('H:i');
            } elseif ($chatDate->isYesterday()) {
                // 昨日の場合、「1日前」と表示
                return '1日前';
            } elseif ($chatDate->gt(Carbon::now('Asia/Tokyo')->subWeek())) {
                // 1週間以内の場合、「X日前」と表示
                $daysAgo = floor($chatDate->diffInDays(Carbon::now('Asia/Tokyo')));
                return $daysAgo . '日前';
            } elseif ($chatDate->gt(Carbon::now('Asia/Tokyo')->subMonth())) {
                // 1ヶ月以内の場合、「X週間前」と表示
                $daysAgo = $chatDate->diffInDays(Carbon::now('Asia/Tokyo'));
                $weeksAgo = floor($daysAgo / 7);  // 週間数を整数に変換
                return $weeksAgo . '週間前';
            } else {
                // それ以上前の場合、「Xヶ月前」と表示
                $daysAgo = $chatDate->diffInDays(Carbon::now('Asia/Tokyo'));
                $monthsAgo = floor($daysAgo / 30);  // 30日を1ヶ月として計算
                return $monthsAgo . 'ヶ月前';
            }
        }

        // 一致するレコードがなかった場合は null になる
        return null;
    }

    // フォローの状況をチェックする関数
    private function profileFollowStatusCheck($partner_follow_id, $id)
    {
        // フォロー状態を確認
        $isFollowing = w_follow::where('follow_sender_id', $partner_follow_id)
            ->where('follow_recipient_id', $id)
            ->exists();

        $isFollowedByUser = w_follow::where('follow_sender_id', $id)
            ->where('follow_recipient_id', $partner_follow_id)
            ->exists();

        // フォロー状態を決定
        if ($isFollowing && $isFollowedByUser) {
            return '相互フォローしています';
        } elseif ($isFollowing) {
            return 'フォローされています';
        } elseif ($isFollowedByUser) {
            return 'フォローしています';
        }
    }
}
