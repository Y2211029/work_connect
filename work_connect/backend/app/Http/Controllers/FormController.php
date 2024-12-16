<?php

namespace App\Http\Controllers;

use App\Models\w_create_form;
use App\Models\w_write_form;
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
        $create_form = json_encode($request->input('create_form')); // フォーム内容
        $news_id = $request->input('create_news_id'); //投稿するニュースのID
        $company_id = $request->input('company_id'); //企業のID
        $deadline = $request->input('deadline'); //締切日

        Log::info('create_form: ' . $create_form); // JSONエンコードしてログに出力
        Log::info('news_id: ' . $news_id);
        Log::info('company_id: ' . $company_id); //企業のID


        // news_id と company_id に基づいてレコードを検索
        $w_create_form = w_create_form::firstOrNew(attributes: [
            'news_id' => $news_id,
            'company_id' => $company_id,
        ]);

        // レコードが見つかれば更新、なければ新規作成
        $w_create_form->create_form = $create_form;
        $w_create_form->createformDateTime = $now;
        $w_create_form->save();

        // 作成または更新されたレコードのIDを取得する
        $id = $w_create_form->id;

        // w_newsテーブルの更新または新規作成
        $w_news = w_news::firstOrNew([
            'id' => $news_id,
            'company_id' => $company_id,
        ]);

        // w_newsテーブルにdeadlineを保存
        $w_news->deadline = $deadline;
        $w_news->save();
        
        // IDを返す
        return response()->json([
            'create_form_id' => $id,
        ], 200);
    }

    public function create_form_get($NewsDetailId)
    {
        Log::info("create_form_get通ってます");
        $newsdetail_id = (string) $NewsDetailId;
        Log::info('newsdetail_id: ' . $newsdetail_id);

        try {
            // w_newsテーブルでnews_idが存在するか確認
            $news_check = w_news::where('id', $newsdetail_id)->first();

            // 基本クエリ: news_idでw_newsテーブルと結合し、company_idでw_companiesテーブルと結合する
            $query = w_create_form::where('w_create_forms.news_id', $newsdetail_id)
                ->join('w_news', 'w_create_forms.news_id', '=', 'w_news.id') // news_idでw_newsと結合
                ->join('w_companies', 'w_news.company_id', '=', 'w_companies.id') // company_idでw_companiesと結合
                ->select('w_create_forms.*', 'w_news.*', 'w_companies.*'); // 必要なカラムを選択

            // 最初の1件だけ取得
            $post = $query->first();

            // ニュースは保存しているが、フォームはまだ未保存の場合
            if ($news_check && !$post) {
                $article_title = $news_check->article_title ?? 'タイトル未定';
                $company_id = $news_check->company_id ?? null;

                $templatePost = (object) [
                    'create_form' => [
                        [
                            'name' => 'Question1',
                            'title' => 'デモ質問',
                            'type' => 'text',
                            'placeholder' => 'この質問はテキストを入力できます'
                        ]
                    ],
                    'news_id' => $newsdetail_id,
                    'company_id' => $company_id,
                    'article_title' => $article_title,
                ];

                return response()->json([$templatePost], 200);

                // ニュースもフォームも未保存の場合
            } else {
                // JSON デコード
                $decodedForm = json_decode($post->create_form);
                if (json_last_error() !== JSON_ERROR_NONE) {
                    Log::error('JSON デコードエラー: ' . json_last_error_msg());
                } else {
                    $post->create_form = $decodedForm;
                    Log::info($decodedForm);
                }
                Log::info('ポストの中身' . $post);
                return response()->json([$post]);
            }
        } catch (\Exception $e) {
            Log::error('create_form_get エラー: ' . $e->getMessage());
            return response()->json(['error' => 'データ取得中にエラーが発生しました。'], 500);
        }
    }

    public function write_form_get(Request $request)
    {

        $NewsDetailId = $request->input('NewsId');


        Log::info("write_form_get通っています");
        Log::info('newsdetail_id: ' . $NewsDetailId);

        try {
            $post = w_create_form::where('w_create_forms.news_id', $NewsDetailId)
                ->join('w_news', 'w_create_forms.news_id', '=', 'w_news.id')
                ->join('w_companies', 'w_news.company_id', '=', 'w_companies.id')
                ->select(
                    'w_create_forms.create_form as create_form',
                    'w_create_forms.news_id as news_id',
                    'w_create_forms.company_id as company_id',
                    'w_news.article_title as title'
                )
                ->first();

            if ($post) {
                $decodedForm = json_decode($post->create_form);
                if (json_last_error() !== JSON_ERROR_NONE) {
                    Log::error('JSON デコードエラー: ' . json_last_error_msg());
                } else {
                    $post->create_form = $decodedForm;
                    Log::info('デコード後のデータ: ' . json_encode($decodedForm)); // デコード後のデータをログ出力
                }
            } else {
                Log::info('対象の投稿が見つかりませんでした。');
            }

            return response()->json($post);
        } catch (\Exception $e) {
            Log::error('write_form_get エラー: ' . $e->getMessage());
            return response()->json(['error' => 'データ取得中にエラーが発生しました。'], 500);
        }
    }


    public function write_form_save(Request $request)
    {
        // 日本の現在時刻を取得
        $now = Carbon::now('Asia/Tokyo');

        // react側からのリクエスト
        $FormData = json_encode($request->input('FormData'));
        $NewsId = strval($request->input('NewsId'));
        $MyId = $request->input('MyId');
        $RecipientCompanyId = $request->input('RecipientCompanyId');


        $w_write_form = w_write_form::create([
            'user_id' => $MyId,
            'news_id' => $NewsId,
            'recipient_company_id' => $RecipientCompanyId,
            'write_form' => $FormData,
            'writeformDateTime' => $now
        ]);

        //IDを返す
        return response()->json([
            'success' => 0,
            'form' => $w_write_form
        ]);
    }
}
