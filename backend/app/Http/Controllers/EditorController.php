<?php

namespace App\Http\Controllers;

use App\Models\w_news;
use App\Models\w_company;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class EditorController extends Controller
{

    //ニュースをセーブ(保存)する
    public function news_save(Request $request)
    {
        // 日本の現在時刻を取得
        $now = Carbon::now('Asia/Tokyo');

        // react側からのリクエスト
        $value = $request->input('value');
        $summaryJson = json_encode($value); // JSON文字列に変換
        $title = $request->input('title');
        $news_id = $request->input('news_id');
        $company_id = $request->input('company_id');

        if ($title === NULL) {
            $title = "タイトル未設定";
        }

        if ($news_id == 0) {
            // 新規作成
            $w_news = w_news::create([
                'company_id' => $company_id,
                'summary' => $summaryJson,
                'article_title' => $title,
                'created_at' => $now,
                'public_status' => "0"
            ]);
        } else {
            // 更新
            $w_news = w_news::find($news_id);
            if (!$w_news) {
                return response()->json(['error' => 'Record not found'], 404);
            }
            $w_news->summary = $summaryJson;
            $w_news->article_title = $title;
            $w_news->created_at = $now;
            $w_news->save();
        }

        // 作成または更新されたレコードのIDを取得する
        $id = $w_news->id;

        // IDを返す
        return response()->json(['id' => $id], 200);
    }

    public function image_save(Request $request)
    {
        // 日本の現在時刻を取得
        $now = Carbon::now('Asia/Tokyo');

        // リクエストからnews_idを取得
        $news_id = $request->input('news_id');
        $company_id = $request->input('company_id');

        // 画像を保存
        if ($request->hasFile('file')) {
            $image = $request->file('file');
            $originalFilename = pathinfo($image->getClientOriginalName(), PATHINFO_FILENAME);
            $extension = $image->getClientOriginalExtension();
            $timestamp = $now->format('Y-m-d_H-i-s'); // タイムスタンプのフォーマットを変更

            // 新しいファイル名を作成
            $filename = $originalFilename . '_' . $timestamp . '.' . $extension;
            // 画像を指定したフォルダに保存
            $destinationPath = 'C:\xampp\apps\work_connect\frontend\public\header_img'; // 絶対パスを使用
            $image->move($destinationPath, $filename);


            if ($news_id == 0) {
                // 新規作成
                $w_news = w_news::create([
                    'company_id' => $company_id,
                    'header_img' => $filename, // ファイル名を保存
                    'created_at' => $now,
                    'public_status' => "0"
                ]);
            } else {
                // 更新
                $w_news = w_news::find($news_id);
                if (!$w_news) {
                    return response()->json(['error' => 'Record not found'], 404);
                }
                $w_news->company_id = $company_id;
                $w_news->header_img = $filename; // ファイル名を保存
                $w_news->created_at = $now;
                $w_news->save();
            }

            // 作成または更新されたレコードのIDを取得する
            $id = $w_news->id;
            $filename = $w_news->header_img;

            // IDと画像パスを返す
            return response()->json(['id' => $id, 'image' => $filename], 200);
        }

        return response()->json(['error' => '画像が選択されていません'], 400);
    }

    //ニュースを公開する
    public function news_upload(Request $request)
    {
        // 日本の現在時刻を取得
        $now = Carbon::now('Asia/Tokyo');

        $news_id = $request->input('news_id');
        $message = $request->input('message');
        $genre = $request->input('genre');
        $public_status = 1;

        $w_news = w_news::find($news_id);
        if (!$w_news) {
            return response()->json(['error' => 'Record not found'], 404);
        }
        $w_news->message = $message;
        $w_news->genre = $genre;
        $w_news->public_status = $public_status;
        $w_news->created_at = $now;
        $w_news->save();
    }


    public function editor_get()
    {
        // ニュースのデータを取得する
        $posts = DB::table('w_news')
            ->join('w_companies', 'w_news.company_id', '=', 'w_companies.id')
            ->where('w_news.public_status', '=', 1)
            ->select('w_news.*', 'w_companies.*','w_news.created_at as news_created_at','w_news.id as news_id')
            ->get();

        return response()->json($posts);
    }
}
