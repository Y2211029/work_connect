<?php

namespace App\Http\Controllers;

use App\Models\w_company_information;
use App\Models\w_company;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;


class CompanyInformationController extends Controller
{

    public function company_informations(Request $request)
    {
        try {
            $CompanyName = $request->input("CompanyName");

            // 入力のログ
            Log::info("企業名: " . $CompanyName);

            // データ取得
            $all_company_information_array = $this->all_company_informations_pull($CompanyName);

            // 正常レスポンス
            Log::info("all_company_information_array: " . json_encode($all_company_information_array));

            return response()->json([
                'success' => true,
                'message' => '会社情報を取得しました',
                'all_company_information' => $all_company_information_array
            ], 200);
        } catch (\Exception $e) {
            // 例外処理
            Log::error("データ取得中にエラーが発生しました: " . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'サーバーエラーが発生しました',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function company_informations_save(Request $request)
    {
        Log::info("company_informations_save通りました");

        $companyInformationArray = $request->input("CompanyInformation");
        $CompanyName = $request->input("CompanyName");



        $company = w_company::where('user_name',$CompanyName)
            ->first();

        $companyId = $company->id;

        Log::info("companyInformationArray" . json_encode($companyInformationArray));
        Log::info("CompanyName" . $CompanyName);


        foreach ($companyInformationArray as $companyInformation) {
            Log::info("Processing ID: {$companyInformation['id']}");

            $updated = w_company_information::where('id', $companyInformation['id'])
                ->update([
                    'title' => $companyInformation['title'],
                    'contents' => $companyInformation['contents'],
                    'company_id' => $companyInformation['company_id'],
                    'public_status' => $companyInformation['public_status'],
                    'row_number' => $companyInformation['id'],
                ]);

            if ($updated === 0) {
                $existingRecord = w_company_information::where('title', $companyInformation['title'])
                    ->where('contents', $companyInformation['contents'])
                    ->where('company_id', $companyInformation['company_id'])
                    ->first();

                if (!$existingRecord) {
                    w_company_information::create([
                        'title' => $companyInformation['title'],
                        'contents' => $companyInformation['contents'],
                        'company_id' => $companyInformation['company_id'],
                        'public_status' => $companyInformation['public_status'],
                        'row_number' => $companyInformation['id'],
                    ]);
                } else {
                    Log::info("Duplicate entry found, not creating a new record for ID: {$companyInformation['id']}");
                }
            }
        }

        $title_contents_array = $this->getCompanyInformationData($CompanyName);
        $all_company_information_array = $this->all_company_informations_pull($CompanyName);


        return response()->json(['message' => '処理が完了しました',
        'title_contents' => $title_contents_array ,
        'all_company_information' => $all_company_information_array,
        'company_id' => $companyId
        ]);
    }


    public function all_company_informations_pull($CompanyName)
    {

        Log::info("all_company_informations_pull通ってます");

        // リクエストから名前を取得し、w_compinesテーブルからidを取得
        Log::info("CompanyName: {$CompanyName}");

        $company = w_company::where('user_name', $CompanyName)->first();

        $CompanyId = $company->id;
        Log::info("CompanyId: {$CompanyId}");


        // 企業情報が存在するかチェック
        $company_information = w_company_information::where('company_id', $CompanyId)
            ->join('w_companies', 'w_companies_information.company_id', '=', 'w_companies.id')
            ->select(
                'w_companies_information.*',
                'w_companies.*',
                'w_companies_information.id as company_information_id',
                'w_companies.company_name as company_name'
            )
            ->orderBy('w_companies_information.row_number', 'asc')
            ->get();

        // 企業情報が存在するかチェック
        if ($company_information->isNotEmpty()) {
            Log::info("企業情報が見つかりました: 件数 " . $company_information->count());
            return $company_information->map(function ($item) {
                return [
                    'title' => $item->title,
                    'contents' => $item->contents,
                    'company_name' => $item->company_name,
                    'id' => $item->company_information_id,
                    'company_id' => $item->company_id,
                    'row_number' => $item->row_number,
                    'public_status' => $item->public_status,
                ];
            })->toArray();
        } else {
            // 企業情報がない場合は未保存のままの配列をデフォルトとして入れる
            $title_contents_array = $this->CompanyInformationDefaultInsert($company);
            Log::info("企業情報が見つかりませんでした");


            return response()->json([
                $title_contents_array
            ]);
        }
    }

    //企業情報が0件の場合に、テンプレートの情報を保存する
    public function CompanyInformationDefaultInsert($company)
    {
        $DefaultInsertArray = [
            ['title' => '企業名', 'contents' => $company->company_name],
            ['title' => '企業概要', 'contents' => $company->intro],
            ['title' => '本社所在地', 'contents' => $company->address]
        ];

        foreach ($DefaultInsertArray as $index => $data) {
            w_company_information::create([
                'title' => $data['title'],
                'contents' => $data['contents'],
                'company_id' => $company->id,
                'public_status' => 0,
                'row_number' => $index + 1,
            ]);
        }

        // 追加した企業情報を取得
        $company_information = w_company_information::where('company_id', $company->id)
            ->join('w_companies', 'w_companies_information.company_id', '=', 'w_companies.id')
            ->select(
                'w_companies_information.*',
                'w_companies.*',
                'w_companies_information.id as company_information_id',
                'w_companies.company_name as company_name'
            )
            ->orderBy('w_companies_information.row_number', 'asc')
            ->get();

        // title と contents を配列にまとめる
        return $company_information->map(function ($item) {
            return [
                'title' => $item->title,
                'contents' => $item->contents,
                'company_name' => $item->company_name,  // 直接アクセス
                'id' => $item->company_information_id,  // 直接アクセス
                'company_id' => $item->company_id,       // 直接アクセス
                'public_status' => $item->public_status, // 直接アクセス
                'row_number' => $item->row_number // 直接アクセス
            ];
        });
    }
}
