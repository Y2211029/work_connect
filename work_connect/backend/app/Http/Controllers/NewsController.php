<?php

namespace App\Http\Controllers;

use App\Models\w_news;
use App\Models\w_follow;
use App\Models\w_company;
use App\Models\w_write_form;
use App\Models\w_create_form;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;

class NewsController extends Controller
{
    // パラメータから取得したIDを元にニュースのデータを取得するメソッド
    public function news_detail_get(Request $request, $newsdetail_id)
    {
        $MyId = $request->input("MyId");

        $news_detail = w_news::where('w_news.id', $newsdetail_id)
            ->join('w_companies', 'w_news.company_id', '=', 'w_companies.id')
            ->select('w_news.*', 'w_companies.*', 'w_news.created_at as news_created_at', 'w_news.id as news_id')
            ->first();


        if ($news_detail) {
            $news_detail->summary = json_decode($news_detail->summary);

            //フォロー状況をチェック
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
            } elseif ($news_detail->id === $MyId) {
                $followStatus = 'フォローできません';
            } else {
                $followStatus = 'フォローする';
            }

            $news_detail->follow_status = $followStatus;

            //フォームを作成しているかどうかチェック
            $createForm = w_create_form::where('news_id', $newsdetail_id)
                ->first();

            Log::info('クリエイトフォーム' . $createForm);
            Log::info('ジャンル' . $news_detail->genre);

            //もしもジャンルがブログではないかつフォームを作成していた場合
            //今見ている人が応募済みかどうかチェック
            if ($news_detail->genre !== 'Blog' && $createForm) { // 存在するかどうかをチェック

                $createFormStatus = true;
                $news_detail->createform_status = $createFormStatus;

                Log::info('クリエイトフォームステータス' . $createFormStatus);

                $writeformStatus = w_write_form::where('user_id', $MyId)
                    ->where('news_id', $newsdetail_id)
                    ->first();

                if ($writeformStatus) {
                    $news_detail->writeform_status = true;
                    $now = Carbon::now('Asia/Tokyo');

                    // 締め切りを確認する 締切日を設定していないもしくは締切日超過の場合はfalseを返す
                    if ($createForm->deadline !== null && $createForm->deadline->lt($now)) {
                        $news_detail->deadlineStatus = true;
                    } else {
                        $news_detail->deadlineStatus = false;
                    }
                } else {
                    $news_detail->writeform_status = false;
                    $news_detail->deadlineStatus = false;
                }
            } else {
                $news_detail->writeform_status = false;
                $news_detail->deadlineStatus = false;
                $news_detail->createform_status = false;
            }

            $CompanyId = $news_detail->company_id;
            $NewsId = $news_detail->news_id;

            $all_news_data = w_news::where('company_id', $CompanyId)
                ->where('public_status', 1)
                ->orderby('updated_at', 'asc')
                ->get();

            Log::info($all_news_data);

            // 該当ニュースの前後のニュースを取得
            $targetIndex = $all_news_data->search(function ($item) use ($NewsId) {
                return $item->id == $NewsId;
            });

            // 前のニュース（$targetIndex - 1）
            $previousNews = $all_news_data->get($targetIndex - 1) ?? null;

            // 次のニュース（$targetIndex + 1）
            $nextNews = $all_news_data->get($targetIndex + 1) ?? null;

            // Logで確認
            Log::info('前のニュース:', [$previousNews]);
            Log::info('次のニュース:', [$nextNews]);

            // ['apply_histories' => $posts]

            return response()->json(['news_detail' => $news_detail, 'previousNews' => $previousNews, 'nextNews' => $nextNews]);
        } else {
            return response()->json(['error' => 'ニュースが見つかりませんでした。'], 404);
        }
    }

    public function get_apply_history(Request $request)
    {

        $id = $request->input("MyId");


        $apply_history = w_write_form::where('user_id', $id)
            ->join('w_news', 'w_write_forms.news_id', '=', 'w_news.id')
            ->join('w_companies', 'w_write_forms.recipient_company_id', '=', 'w_companies.id')
            ->select(
                'w_companies.company_name as companies_name',
                'w_companies.icon as icon',
                'w_companies.user_name as companies_user_name',
                'w_news.id as news_id',
                'w_news.article_title as news_title',
                'w_news.event_day as event_day',
                'w_news.genre as news_genre',
                'w_news.header_img as img',
                'w_news.public_status as public_status',
                'w_write_forms.id as write_form_id',
                'w_write_forms.write_form as write_form',
                'w_write_forms.check_read as check_read',
                'w_write_forms.writeformDateTime as form_writed_at',
            )
            ->orderBy('form_writed_at', direction: 'desc')
            ->get();

        $posts = [];
        $id = 1;

        foreach ($apply_history as $app) {
            $posts[] = [
                'id' => $id,
                'companies_name' => $app->companies_name,
                'companies_user_name' => $app->companies_user_name,
                'news_id' => $app->news_id,
                'news_title' => $app->news_title,
                'news_genre' => $app->news_genre,
                'event_day' => $app->event_day,
                'img' => $app->img,
                'public_status' => $app->public_status,
                'write_form_id' => $app->write_form_id,
                'write_form' => json_decode($app->write_form, true), // 配列としてデコード
                'check_read' => $app->check_read,
                'form_writed_at' => $app->form_writed_at,
                'icon' => $app->icon,
            ];
            $id += 1;
        }

        // 配列全体をログ出力する
        Log::info('Posts data: ' . json_encode($posts, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

        // 特定の項目を個別に確認する
        foreach ($posts as $index => $post) {
            Log::info("Post #$index: ", $post);
        }

        return response()->json(['apply_histories' => $posts]);
    }



    //自社が投稿したニュースの中で応募フォームを作成したニュースを表示させる
    //応募フォームの回答(面談の日程とか?)とその人のプロフィールを確認することができる
    public function special_forms(Request $request, $CompanyId)
    {
        Log::info("special_forms通ってます");
        $page = (int) $request->query('page', 1);
        $perPage = 20;
        $offset = ($page - 1) * $perPage;
        $sortOption = $request->query('sort');

        // ニュースタイトル一覧を取得
        $title = w_write_form::where('recipient_company_id', $CompanyId)
            ->join('w_news', 'w_write_forms.news_id', '=', 'w_news.id')
            ->whereIn('w_news.public_status', [1, 2])
            ->groupBy('w_news.article_title','w_news.created_at')
            ->orderBy('w_news.created_at', 'desc')
            ->select('w_news.article_title');

        // ニュースデータを取得
        $query = w_write_form::where('recipient_company_id', $CompanyId)
            ->join('w_news', 'w_write_forms.news_id', '=', 'w_news.id')
            ->join('w_users', 'w_write_forms.user_id', '=', 'w_users.id')
            ->whereIn('w_news.public_status', [1, 2])
            ->orderBy('w_write_forms.writeformDateTime', 'desc')
            ->select('w_write_forms.*', 'w_news.*', 'w_users.*', 'w_news.created_at as news_created_at', 'w_write_forms.id as write_form_id')
            ->get();

        // ソート処理
        if ($sortOption === 'orderNewPostsDate') {
            $title->orderBy('w_news.created_at', 'desc');
        } elseif ($sortOption === 'orderOldPostsDate') {
            $title->orderBy('w_news.created_at', 'asc');
        } else {
            $title->orderBy('news_created_at', 'desc');
        }

        // ページネーション適用
        $posts = $title->skip($offset)->take($perPage)->get();


        // ユーザー情報の追加
        foreach ($posts as $post) {
            // usersプロパティを配列として初期化
            $users = [];

            // $queryのデータから一致するタイトルのユーザーデータを追加
            foreach ($query as $q) {
                if ($q->article_title === $post->article_title) {
                    // 該当するユーザー情報を配列として追加
                    $users[] = [
                        'write_form' => json_decode($q->write_form), // ここでデコード
                        'user_name' => $q->user_name,
                        'write_form_id' => $q->write_form_id,
                        'writeformDateTime' => $q->writeformDateTime,
                        'check_read' => $q->check_read,
                        'news_created_at' => $q->news_created_at,
                        'genre' => $q->genre,
                    ];
                }
            }

            // ここで users を設定
            $post->users = $users;
            Log::info("special_forms処理しています");
        }



        return response()->json($posts);
    }

    // 全ニュース取得
    public function all_news_get(Request $request, $id, $category)
    {       //$idは${SessionAccountData.id}なので自分のid
        try {
            Log::info("all_news_get通ってます");
            $page = (int) $request->query('page', 1);
            $perPage = 20;
            $offset = ($page - 1) * $perPage;
            $sortOption = $request->query('sort');
            $userName = $request->query('userName');

            $postsQuery = w_news::where('w_news.public_status', 1)
                ->where('w_news.genre', $category)
                ->join('w_companies', 'w_news.company_id', '=', 'w_companies.id')
                ->select('w_news.*', 'w_companies.*', 'w_news.created_at as news_created_at', 'w_news.genre as genre', 'w_news.id as news_id');

            if ($userName !== null) {
                $postsQuery->where('w_companies.user_name', $userName);
            }

            if ($sortOption === 'orderNewPostsDate') {
                $postsQuery->orderBy('w_news.event_day', 'asc');
            } elseif ($sortOption === 'orderOldPostsDate') {
                $postsQuery->orderBy('w_news.created_at', 'asc');
            }

            $totalItems = $postsQuery->count();
            $posts = $postsQuery->skip($offset)
                ->take($perPage)
                ->get();
            $message = null;
            if ($page == 1 && $totalItems === 0) {
                $message = "0件です。";
            }

            foreach ($posts as $post) {

                Log::info("ジャンル", ['genre' => $post->genre]);

                // w_create_formsテーブルから応募用フォームがあるかチェック
                $createformData = w_create_form::where('news_id', $post->news_id)->first();
                Log::info('$createformData' . $createformData);

                if ($createformData) {
                    // 現在のデッドラインを取得
                    $Deadline = $createformData->deadline;

                    // デッドラインが指定されている場合のみ更新
                    if (!empty($Deadline)) {
                        Log::info('デッドライン: ' . $Deadline);
                        $now = Carbon::now('Asia/Tokyo');
                        Log::info('現在の時刻: ' . $now);
                        info('データ型: ' . gettype($Deadline) . ', ' . gettype($now));

                        // デッドラインを Carbon オブジェクトに変換
                        try {
                            $DeadlineObject = Carbon::parse($Deadline);

                            // 締め切りを確認する 締切日を設定していないもしくは締切日超過の場合はfalseを返す
                            if ($DeadlineObject->lt($now)) {
                                $post->deadline_status = true;
                            } else {
                                $post->deadline_status = false;
                            }

                            // デッドラインを更新
                            $post->deadline = $DeadlineObject;
                        } catch (\Exception $e) {
                            Log::error('デッドラインの変換に失敗しました: ' . $e->getMessage());
                            $post->deadline_status = false; // 変換失敗時はデフォルト値にする
                        }
                    } else {
                        Log::info('新しいデッドラインが指定されていません。変更は行われません。');
                        $post->deadline_status = false;
                    }
                }

                // w_write_formsテーブルからすべてのフォームデータを取得
                $formData = w_write_form::where('news_id', $post->news_id)->get();


                // 取得したフォームデータの数をpostsに追加
                $post->form_data_count = $formData->count();

                Log::info('sender_id: ' . $id);
                Log::info('recipient_id: ' . $post->company_id);



                $isFollowing = w_follow::where('follow_sender_id', $id)
                    ->where('follow_recipient_id', $post->company_id)
                    ->exists();

                $isFollowedByUser = w_follow::where('follow_sender_id', $post->company_id)
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


        } catch (\Exception $e) {
            Log::error('all_news_get エラー: ' . $e->getMessage());
            return response()->json(['error' => 'データ取得中にエラーが発生しました。'], 500);
        }

        // return json_encode($posts);
        return response()->json([
            'list' => $posts,
            'count' => $totalItems,
            'message' => $message,
        ]);
    }

    public function special_company_news(Request $request, $username, $Myid, $Genre)
    {
        Log::info("special_combined_news_forms通ってます");
        $page = (int) $request->query('page', 1);
        $perPage = 20;
        $offset = ($page - 1) * $perPage;
        $sortOption = $request->query('sort');

        // w_companiesテーブルからIdを取得
        $company = w_company::where('user_name', $username)->first();

        if (!$company) {
            return response()->json(['error' => '指定されたユーザーが見つかりません。'], 404);
        }

        $special_company_news_id = $company->id; // IDを取得
        Log::info($special_company_news_id);
        Log::info($Genre);

        // ニュースの取得
        $newsQuery = w_news::where('company_id', $special_company_news_id)
            ->where('genre', $Genre)
            ->where('public_status', 1)
            ->join('w_companies', 'w_news.company_id', '=', 'w_companies.id')
            ->select('w_news.*', 'w_companies.*', 'w_news.created_at as news_created_at', 'w_news.id as news_id');

        // ソート処理
        if ($sortOption === 'orderNewPostsDate') {
            $newsQuery->orderBy('w_news.created_at', 'desc');
        } elseif ($sortOption === 'orderOldPostsDate') {
            $newsQuery->orderBy('w_news.created_at', 'asc');
        } else {
            // デフォルトのソート（最新の投稿が最初）
            $newsQuery->orderBy('news_created_at', 'desc');
        }

        $totalItems = $newsQuery->count();

        // ページネーションの適用
        $posts = $newsQuery->skip($offset)->take($perPage)->get();

        // フォームデータの取得
        foreach ($posts as $post) {
            // w_write_formsテーブルからすべてのフォームデータを取得
            $formData = w_write_form::where('news_id', $post->news_id)->get();

            // 取得したフォームデータの数をpostsに追加
            $post->form_data_count = $formData->count();

            // フォロー状況の確認
            $isFollowing = w_follow::where('follow_sender_id', $Myid)
                ->where('follow_recipient_id', $post->company_id)
                ->exists();

            $isFollowedByUser = w_follow::where('follow_sender_id', $post->company_id)
                ->where('follow_recipient_id', $Myid)
                ->exists();

            if ($Myid[0] == $post->company_id[0]) {
                $post->follow_status = 'フォローできません';
            } elseif ($isFollowing && $isFollowedByUser) {
                $post->follow_status = '相互フォローしています';
            } elseif ($isFollowing) {
                $post->follow_status = 'フォローしています';
            } elseif ($isFollowedByUser) {
                $post->follow_status = 'フォローされています';
            } else {
                $post->follow_status = 'フォローする';
            }
        }
        $message = null;
        if ($page == 1 && $totalItems === 0) {
            $message = "0件です。";
        }

        return response()->json([
            'list' => $posts,
            'count' => $totalItems,
            'message' => $message,
        ]);

    }

    public function news_delete(Request $request, $news_id)
    {
        try {
            // ログにリクエスト情報を記録
            Log::info("ニュース削除リクエスト: news_id=" . $news_id);

            // $news_idでニュースがあるかチェック
            $news_check = w_news::where('id', $news_id)->first();

            if (!$news_check) {
                // ニュースが存在しない場合
                Log::warning("ニュースが見つかりません: news_id=" . $news_id);
                return response()->json([
                    "message" => "ニュースが見つかりません。",
                    "status" => "error"
                ], 404);
            }

            // ニュースの公開状態を変更 (削除フラグとして2を設定)
            $news_check->update(['public_status' => 2]);

            Log::info("ニュース削除成功: news_id=" . $news_id);

            return response()->json([
                "message" => "ニュースが削除されました。",
                "status" => "success"
            ], 200);
        } catch (\Exception $e) {
            // 例外が発生した場合の処理
            Log::error("ニュース削除中にエラーが発生しました: " . $e->getMessage());

            return response()->json([
                "message" => "エラーが発生しました。",
                "status" => "error"
            ], 500);
        }
    }

    public function change_un_read(Request $request)
    {
        $unread_data = $request->input("unread_data");

        // 未読データの処理
        foreach ($unread_data as $data) {
            // `write_form_id`で該当のデータを取得
            $writeForm = w_write_form::where("id", $data["write_form_id"])->first();

            if ($writeForm) {
                // `check_read` を '既読' に更新
                $writeForm->update(['check_read' => "既読"]);
            }
        }

        // 成功レスポンス
        return response()->json([
            "message" => "既読になりました",
            "status" => "success"
        ], 200);
    }


}
