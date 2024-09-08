<?php

namespace App\Http\Controllers;

use App\Models\w_news;
use App\Models\w_follow;
use App\Models\w_company;
use App\Models\w_bookmark;
use Illuminate\Http\Request;
use Carbon\Carbon;

class NewsController extends Controller
{
    // パラメータから取得したIDを元にニュースのデータを取得するメソッド
    public function news_detail_get(Request $request, $id)
    {
        // MyId を取得
        $MyId = $request->input("MyId");

        // $id を文字列に変換
        $id = (string) $id;

        // ログ出力で確認
        \Log::info('MyId: ' . $MyId);
        \Log::info('ID as string: ' . $id);

        // w_companies テーブルと結合する
        $news_detail = w_news::where('w_news.id', $id)
            ->join('w_companies', 'w_news.company_id', '=', 'w_companies.id')
            ->select('w_news.*', 'w_companies.*', 'w_news.created_at as news_created_at', 'w_news.id as news_id')
            ->first();

        // データが存在する場合
        if ($news_detail) {
            // summary カラムの値を JSON から文字列に変換
            $news_detail->summary = json_decode($news_detail->summary);

            // フォロー状況をチェック
            $isFollowing = w_follow::where('follow_sender_id', $MyId)
                ->where('follow_recipient_id', $news_detail->id)
                ->exists();

            $isFollowedByUser = w_follow::where('follow_sender_id', $news_detail->id)
                ->where('follow_recipient_id', $MyId)
                ->exists();

            // フォロー状況を決定
            if ($isFollowing && $isFollowedByUser) {
                $followStatus = '相互フォローしています';
            } elseif ($isFollowing) {
                $followStatus = 'フォローしています';
            } elseif ($isFollowedByUser) {
                $followStatus = 'フォローされています';
            } elseif ($news_detail->id == $MyId) {
                $followStatus = 'フォローできません';
            } else {
                $followStatus = 'フォローする';
            }

            // フォロー状況を各ニュースに追加する
            $news_detail->follow_status = $followStatus;

            return response()->json($news_detail);
        } else {
            return response()->json(['error' => 'ニュースが見つかりませんでした。'], 404);
        }
    }


    //ブックマークした情報を入れる
    public function news_bookmark(Request $request)
    {

        // 日本の現在時刻を取得
        $now = Carbon::now('Asia/Tokyo');

        // react側からのリクエスト
        $session_id = $request->input('session_id');
        $bookmark_id = $request->input('id');
        $category = $request->input('category');

        //既にブックマークしているかどうかをチェック
        $news_bookmark = w_bookmark::where('position_id', $session_id)->where('bookmark_id', $bookmark_id)->exists();

        if ($news_bookmark) {
            //もしも存在したら
            w_bookmark::where('position_id', $session_id)->where('bookmark_id', $bookmark_id)->delete();
            echo json_encode(["message" => "削除成功しました"], JSON_UNESCAPED_UNICODE);
        } else {
            //もしも存在しなかったら
            w_bookmark::create([
                'position_id' => $session_id,
                'category' => $category,
                'bookmark_id' => $bookmark_id,
                'created_at' => $now,
            ]);

            echo json_encode(["message" => "新規追加成功しました"], JSON_UNESCAPED_UNICODE);
        }
    }

    // 企業のIDから特定の企業が投稿したニュースのデータを取得するメソッド
    public function special_company_news(Request $request, $id)
    {
        // 特定の企業が投稿したニュースを取得
        $special_company_news = w_news::where('company_id', $id)
            ->where('public_status', 1)
            ->join('w_companies', 'w_news.company_id', '=', 'w_companies.id')
            ->select('w_news.*', 'w_companies.*', 'w_news.created_at as news_created_at', 'w_news.id as news_id')
            ->orderBy('news_created_at', 'desc')
            ->get();

        // データが存在する場合
        if ($special_company_news) {
            return response()->json($special_company_news);
        } else {
            return response()->json(['error' => 'ニュースが見つかりませんでした。'], 404);
        }
    }

    public function all_news_get(Request $request)
    {
        $MyId = $request->input('MyId');

        // ニュースのデータと関連する会社のデータを結合して取得する
        $posts = w_news::where('w_news.public_status', 1)
            ->join('w_companies', 'w_news.company_id', '=', 'w_companies.id')
            ->select('w_news.*', 'w_companies.*', 'w_news.created_at as news_created_at', 'w_news.id as news_id')
            ->get();

        // 各ニュースに対してフォロー状況を追加する
        foreach ($posts as $post) {
            $isFollowing = w_follow::where('follow_sender_id', $MyId)
                ->where('follow_recipient_id', $post->id)
                ->exists();

            $isFollowedByUser = w_follow::where('follow_sender_id', $post->id)
                ->where('follow_recipient_id', $MyId)
                ->exists();

            // フォロー状況を決定
            if ($isFollowing && $isFollowedByUser) {
                $followStatus = '相互フォローしています';
            } elseif ($isFollowing) {
                $followStatus = 'フォローしています';
            } elseif ($isFollowedByUser) {
                $followStatus = 'フォローされています';
            } else {
                $followStatus = 'フォローする';
            }

            // フォロー状況を各ニュースに追加する
            $post->follow_status = $followStatus;
        }

        return response()->json($posts);
    }
}
