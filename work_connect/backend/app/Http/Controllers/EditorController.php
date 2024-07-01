<?php

namespace App\Http\Controllers;

use App\Models\w_news;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class EditorController extends Controller
{
    //ニュースをセーブ(保存)する
    public function news_save(Request $request){

        // react側からのリクエスト
        $image = $request->input('image');
        $value = $request->input('value');
        $summaryJson = json_encode($value); // JSON文字列に変換
        $title = $request->input('title');
        $news_id = $request->input('news_id');

        if($title === NULL){
            $title = "タイトル未設定";
        }

        if($news_id == 0){
            // 新規作成
            $w_news = w_news::create([
                'company_id' => "1",
                'header_img' => $image,
                'summary' => $summaryJson,
                'article_title' => $title,
                'created_at' => Carbon::now(),
                'public_status' => "0"
            ]);
        }else{
            // 更新
            $w_news = w_news::find($news_id);
            if(!$w_news) {
                return response()->json(['error' => 'Record not found'], 404);
            }
            $w_news->header_img = $image;
            $w_news->summary = $summaryJson;
            $w_news->article_title = $title;
            $w_news->created_at = Carbon::now();
            $w_news->save();
        }

        // 作成または更新されたレコードのIDを取得する
        $id = $w_news->id;

        // IDを返す
        return response()->json(['id' => $id], 200);
    }

    //ニュースを公開する
    public function news_upload(Request $request){

        $news_id = $request->input('news_id');
        $message = $request->input('message');
        $genre = $request->input('genre');
        $public_status = 1;

        $w_news = w_news::find($news_id);
        if(!$w_news) {
            return response()->json(['error' => 'Record not found'], 404);
        }
        $w_news->message = $message;
        $w_news->summary = $genre;
        $w_news->public_status = $public_status;
        $w_news->created_at = Carbon::now();
        $w_news->save();
    }


    public function editor_get(){
        // ニュースのデータを取得する
        $posts = w_news::where('public_status', 1)->get();
        return response()->json($posts);    
    }
}
