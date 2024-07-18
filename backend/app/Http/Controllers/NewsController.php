<?php

namespace App\Http\Controllers;

use App\Models\w_news;
use App\Models\w_company;
use App\Models\w_bookmark;
use Illuminate\Http\Request;
use Carbon\Carbon;

class NewsController extends Controller
{
    // パラメータから取得したIDを元にニュースのデータを取得するメソッド
    public function news_detail_get(Request $request, $id)
    {
        //w_companiesテーブルと結合する
        $news_detail = w_news::where('w_news.id', $id)
            ->join('w_companies', 'w_news.company_id', '=', 'w_companies.id')
            ->select('w_news.*', 'w_companies.*', 'w_news.created_at as news_created_at', 'w_news.id as news_id')
            ->first();

        // データが存在する場合
        if ($news_detail) {
            // summaryカラムの値をJSONから文字列に変換
            $news_detail->summary = json_decode($news_detail->summary);
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
        $session_id = $request->input('session_id');;
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
}
