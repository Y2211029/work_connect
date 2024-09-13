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
        $MyId = $request->input("MyId");
        $id = (string) $id;

        \Log::info('MyId: ' . $MyId);
        \Log::info('ID as string: ' . $id);

        $news_detail = w_news::where('w_news.id', $id)
            ->join('w_companies', 'w_news.company_id', '=', 'w_companies.id')
            ->select('w_news.*', 'w_companies.*', 'w_news.created_at as news_created_at', 'w_news.id as news_id')
            ->first();

        if ($news_detail) {
            $news_detail->summary = json_decode($news_detail->summary);

            $isFollowing = w_follow::where('follow_sender_id', $MyId)
                ->where('follow_recipient_id', $news_detail->id)
                ->exists();

            $isFollowedByUser = w_follow::where('follow_sender_id', $news_detail->id)
                ->where('follow_recipient_id', $MyId)
                ->exists();

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

            $news_detail->follow_status = $followStatus;

            return response()->json($news_detail);
        } else {
            return response()->json(['error' => 'ニュースが見つかりませんでした。'], 404);
        }
    }

    // ブックマーク機能
    public function news_bookmark(Request $request)
    {
        $now = Carbon::now('Asia/Tokyo');
        $session_id = $request->input('session_id');
        $bookmark_id = $request->input('id');
        $category = $request->input('category');

        $news_bookmark = w_bookmark::where('position_id', $session_id)
            ->where('bookmark_id', $bookmark_id)
            ->exists();

        if ($news_bookmark) {
            w_bookmark::where('position_id', $session_id)
                ->where('bookmark_id', $bookmark_id)
                ->delete();
            
            return response()->json(["message" => "削除成功しました"], 200);
        } else {
            w_bookmark::create([
                'position_id' => $session_id,
                'category' => $category,
                'bookmark_id' => $bookmark_id,
                'created_at' => $now,
            ]);

            return response()->json(["message" => "新規追加成功しました"], 201);
        }
    }

    // 企業ニュース取得
    public function special_company_news(Request $request, $id)
    {
        $special_company_news = w_news::where('company_id', $id)
            ->where('public_status', 1)
            ->join('w_companies', 'w_news.company_id', '=', 'w_companies.id')
            ->select('w_news.*', 'w_companies.*', 'w_news.created_at as news_created_at', 'w_news.id as news_id')
            ->orderBy('news_created_at', 'desc')
            ->get();

        if ($special_company_news->isNotEmpty()) {
            return response()->json($special_company_news);
        } else {
            return response()->json(['error' => 'ニュースが見つかりませんでした。'], 404);
        }
    }

    // 全ニュース取得
    public function all_news_get(Request $request, $id)
    {
        try {
            $page = (int) $request->query('page', 1);
            $perPage = 20;
            $offset = ($page - 1) * $perPage;
            $sortOption = $request->query('sort');
            $userName = $request->query('userName');

            $postsQuery = w_news::where('w_news.public_status', 1)
                ->join('w_companies', 'w_news.company_id', '=', 'w_companies.id')
                ->select('w_news.*', 'w_companies.*', 'w_news.created_at as news_created_at', 'w_news.id as news_id');

            if ($userName !== null) {
                $postsQuery->where('w_companies.user_name', $userName);
            }

            if ($sortOption === 'orderNewPostsDate') {
                $postsQuery->orderBy('w_news.created_at', 'desc');
            } elseif ($sortOption === 'orderOldPostsDate') {
                $postsQuery->orderBy('w_news.created_at', 'asc');
            }

            $posts = $postsQuery->skip($offset)
                ->take($perPage)
                ->get();

            foreach ($posts as $post) {
                $isFollowing = w_follow::where('follow_sender_id', $id)
                    ->where('follow_recipient_id', $post->id)
                    ->exists();

                $isFollowedByUser = w_follow::where('follow_sender_id', $post->id)
                    ->where('follow_recipient_id', $id)
                    ->exists();

                if ($isFollowing && $isFollowedByUser) {
                    $post->follow_status = '相互フォローしています';
                } elseif ($isFollowing) {
                    $post->follow_status = 'フォローしています';
                } elseif ($isFollowedByUser) {
                    $post->follow_status = 'フォローされています';
                } else {
                    $post->follow_status = 'フォローする';
                }
            }

            return response()->json($posts);
        } catch (\Exception $e) {
            \Log::error('all_news_get エラー: ' . $e->getMessage());
            return response()->json(['error' => 'データ取得中にエラーが発生しました。'], 500);
        }
    }
}

?>