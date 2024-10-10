<?php

namespace App\Http\Controllers;

use App\Models\w_create_form;
use App\Models\w_wright_form;
use App\Models\w_news;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;

class FormController extends Controller

{

    public function create_form_save(Request $request)
    {
        // 日本の現在時刻を取得
        $now = Carbon::now('Asia/Tokyo');

        // react側からのリクエスト
        $create_form_id = $request->input('create_form_id');
        $create_form = json_encode($request->input('create_form')); // 配列をJSONに変換
        $news_id = $request->input('create_news_id'); // 修正
        $company_id = $request->input('company_id');


        Log::info('create_form_id: ' . $create_form_id);
        Log::info('create_form: ' . json_encode($create_form)); // JSONエンコードしてログに出力
        Log::info('news_id: ' . $news_id);
        Log::info('company_id: ' . $company_id);

        // create_form_idのデフォルトが0のため、保存されていない。
        // 0の場合は新規作成
        if ($create_form_id == 0) {
            $w_create_form = w_create_form::create([
                'company_id' => $company_id,
                'news_id' => $news_id,
                'create_form' => $create_form,
                'createformDateTime' => $now
            ]);
        } else {
            $w_create_form = w_create_form::find($create_form_id);
            if (!$w_create_form) {
                return response()->json(['error' => 'Record not found'], 404);
            }
            $w_create_form->news_id = $news_id;
            $w_create_form->create_form = $create_form;
            $w_create_form->createformDateTime = $now;
            $w_create_form->save();
        }

        // 作成または更新されたレコードのIDを取得する
        $id = $w_create_form->id;

        // IDを返す
        return response()->json([
            'create_form_id' => $id,
        ], 200);
    }



    public function write_form_get(Request $request, $NewsDetailId)
    {
        Log::info("write_form_get通っています");
        $newsdetail_id = (string) $NewsDetailId;
        Log::info('newsdetail_id: ' . $newsdetail_id);

        try {

            $page = (int) $request->query('page', 1);
            $perPage = 20;
            $offset = ($page - 1) * $perPage;
            $sortOption = $request->query('sort');
            $userName = $request->query('userName');

            // 基本クエリ: news_idを元にw_newsテーブルと結合し、その後company_idを元にw_companiesテーブルと結合する
            $query = w_create_form::where('w_create_forms.news_id', $newsdetail_id)
                ->join('w_news', 'w_create_forms.news_id', '=', 'w_news.id') // news_idでw_newsと結合
                ->join('w_companies', 'w_news.company_id', '=', 'w_companies.id') // company_idでw_companiesと結合
                ->select('w_create_forms.*', 'w_news.*', 'w_companies.*'); // 必要なカラムを選択

            // ユーザー名によるフィルタリング
            if ($userName !== null) {
                $query->where('w_companies.user_name', $userName);
            }

            // ソートオプションによる並び替え
            if ($sortOption === 'orderNewPostsDate') {
                $query->orderBy('w_create_forms.createformDateTime', 'desc');
            } elseif ($sortOption === 'orderOldPostsDate') {
                $query->orderBy('w_create_forms.createformDateTime', 'asc');
            }

            // ページネーション
            $posts = $query->skip($offset)
                ->take($perPage)
                ->get();

            // クエリログを確認
            Log::info(\DB::getQueryLog());

            // JSON デコード
            foreach ($posts as $post) {
                $decodedForm = json_decode($post->create_form);
                if (json_last_error() !== JSON_ERROR_NONE) {
                    Log::error('JSON デコードエラー: ' . json_last_error_msg());
                } else {
                    $post->create_form = $decodedForm;
                    Log::info($decodedForm);
                }
            }

            Log::info($posts);
            return response()->json($posts);
        } catch (\Exception $e) {
            Log::error('write_form_get エラー: ' . $e->getMessage());
            return response()->json(['error' => 'データ取得中にエラーが発生しました。'], 500);
        }
    }


    public function wright_form_save(Request $request)
    {
        // 日本の現在時刻を取得
        $now = Carbon::now('Asia/Tokyo');

        // react側からのリクエスト
        $FormData = json_encode($request->input('FormData'));
        $NewsId = strval($request->input('NewsId'));
        $MyId = $request->input('MyId');

        $w_wright_form = w_wright_form::create([
            'user_id' => $MyId,
            'news_id' => $NewsId,
            'wright_form' => $FormData,
            'wrightformDateTime' => $now
        ]);

        //IDを返す
        return response()->json([
            'success' => 0,
            'form' => $w_wright_form
        ]);
    }
}
