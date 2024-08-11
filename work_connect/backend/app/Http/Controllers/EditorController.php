<?php

namespace App\Http\Controllers;

use App\Models\w_news;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;

class EditorController extends Controller
{

    //ニュースをセーブ(保存)する
    public function news_save(Request $request)
    {
        // 日本の現在時刻を取得
        $now = Carbon::now('Asia/Tokyo');

        // react側からのリクエスト
        $value = json_encode($request->input('value')); // JSON文字列に変換
        $title = $request->input('title');
        $news_id = $request->input('news_id');
        $Company_id = $request->input('company_id');


        if ($title === NULL) {
            $title = "タイトル未設定";
        }

        if ($news_id == 0) {
            // 新規作成
            $w_news = w_news::create([
                'company_id' => $Company_id,
                'summary' => $value,
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
            $w_news->summary = $value;
            $w_news->article_title = $title;
            $w_news->updated_at = $now;
            $w_news->save();
        }

        // 作成または更新されたレコードのIDを取得する
        $id = $w_news->id;

        // news_draft_list 関数を呼び出してニュースドラフトリストを取得
        $newsDraftList = $this->news_draft_list($request, $Company_id);


        // IDを返す
        return response()->json(['id' => $id,
        'news_draft_list' => $newsDraftList],
        200);
    }

    public function thumbnail_image_save(Request $request)
    {
        // 日本の現在時刻を取得
        $now = Carbon::now('Asia/Tokyo');

        // リクエストからnews_idとsession_idを取得
        $news_id = $request->input('news_id');
        $Company_Id = $request->input('session_id');

        // 画像を保存
        if ($request->hasFile('file')) {
            $image = $request->file('file');
            $originalFilename = pathinfo($image->getClientOriginalName(), PATHINFO_FILENAME);
            $extension = $image->getClientOriginalExtension();
            $timestamp = $now->format('Y-m-d_H-i-s'); // タイムスタンプのフォーマットを変更

            // 新しいファイル名を作成
            $filename = $originalFilename . '_' . $timestamp . '.' . $extension;

            // 画像を指定したフォルダに保存
            $destinationPath = 'C:\xampp\apps\work_connect\work_connect\frontend\public\header_img'; // 絶対パスを使用
            $image->move($destinationPath, $filename);


            if ($news_id == 0) {
                // 新規作成
                $w_news = w_news::create([
                    'company_id' => "1",
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
                $w_news->header_img = $filename; // ファイル名を保存
                $w_news->created_at = $now;
                $w_news->save();
            }

            // 作成または更新されたレコードのIDを取得する
            $id = $w_news->id;
            $filename = $w_news->header_img;

            // news_draft_list 関数を呼び出してニュースドラフトリストを取得
            $newsDraftList = $this->news_draft_list($request, $Company_Id);

            // IDと画像パスを返す
            return response()->json([
                'id' => $id,
                'image' => $filename,
                'success' => true,
                'news_draft_list' => $newsDraftList // 配列が直接返される
            ], 200);
        }

        return response()->json(['error' => '画像が選択されていません'], 400);
    }

    public function contents_image_save(Request $request)
    {
        if ($request->hasFile('file')) {
            $file = $request->file('file');
            $destinationPath = public_path('storage/images/news_contents'); // 保存先ディレクトリ
            $fileName = $file->getClientOriginalName(); // 元のファイル名
            $file->move($destinationPath, $fileName); // ファイルを移動

            Log::info($fileName);
            Log::info(asset('storage/images/news_contents/' . $fileName));

            return response()->json([
                'success' => 1,
                'url' => asset('storage/images/news_contents/' . $fileName) // アップロードされた画像のURLを返す
            ]);
        }

        return response()->json([
            'success' => 0,
            'message' => 'Failed to upload image'
        ]);
    }



    //選んだ画像リンクを削除・別フォルダに移動したファイルを削除
    public function thumbnail_img_delete(Request $request, $id)
    {
        try {

            $Company_Id = $request->input('Company_Id');

            // 条件に一致する画像リンクを取得
            $header_img_delete = w_news::where('id', $id)
                ->select('header_img')
                ->first();

            if ($header_img_delete && $header_img_delete->header_img) {
                // 画像パスを取得
                $imagePath = 'C:/xampp/apps/work_connect/work_connect/frontend/public/header_img/' . $header_img_delete->header_img;

                // ファイルが存在するか確認
                if (file_exists($imagePath)) {
                    // ファイルを削除
                    unlink($imagePath);
                }

                // データベースのheader_imgカラムをnullに更新
                w_news::where('id', $id)->update(['header_img' => null]);

                // news_draft_list 関数を呼び出してニュースドラフトリストを取得
                $prevDraftList = $this->news_draft_list($request, $Company_Id);

                Log::info($prevDraftList);
            }

            // レスポンスとして成功ステータスを返す
            return response()->json([
                'message' => '成功',
                'success' => true,
                'news_draft_list' => $prevDraftList,
            ]);
        } catch (\Exception $e) {
            // エラー発生時のレスポンス
            Log::error('画像削除中にエラーが発生しました: ' . $e->getMessage());

            return response()->json([
                'message' => '画像の削除に失敗しました',
                'success' => false,
                'error' => $e->getMessage(),
            ], 500);
        }
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
        $w_news->summary = $genre;
        $w_news->public_status = $public_status;
        $w_news->created_at = $now;
        $w_news->updated_at = $now;
        $w_news->save();
    }

    public function news_draft_list(Request $request, $id)
    {
        try {

            // 条件に一致するニュースドラフトリストを取得
            $newsDraftList = w_news::where('company_id', $id)
                ->where('public_status', 0)
                ->orderBy('updated_at', 'desc') // 降順でソート
                ->get();

            Log::info($newsDraftList);


            return $newsDraftList;
        } catch (\Exception $e) {
            // エラーレスポンスを返す
            return response()->json([
                'error' => 'Failed to fetch news draft list',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function editor_get()
    {

        // ニュースのデータを取得する
        $posts = w_news::where('public_status', 1)->get();
        return response()->json($posts);
    }
}
