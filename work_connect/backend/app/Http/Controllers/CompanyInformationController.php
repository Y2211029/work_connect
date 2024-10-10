<?php

namespace App\Http\Controllers;

use App\Models\w_company_information;
use App\Models\w_company;
use Illuminate\Support\Facades\Log;


class CompanyInformationController extends Controller
{
    public function company_information($CompanyName)
    {
        // company_name で w_companies テーブルから ID を取得
        $company = w_company::where('company_name', $CompanyName)->first();

        // company が存在しない場合、エラーメッセージを返す
        if (!$company) {
            return response()->json(['error' => '会社が見つかりません'], 404);
        }

        $Company_Id = $company->id;

        // 企業情報が存在するかチェック
        $company_information = w_company_information::where('company_id', $Company_Id)
            ->where('public_status', 1)
            ->join('w_companies', 'w_companies_information.company_id', '=', 'w_companies.id')
            ->select('w_companies_information.*', 'w_companies.*',
                     'w_companies_information.id as company_information_id',
                     'w_companies.company_name as company_name')
            ->orderBy('w_companies_information.created_at', 'desc')
            ->get();

        // 企業情報が存在するかチェック
        if ($company_information->isNotEmpty()) {
            // title と contents を配列にまとめる
            $title_contents_array = $company_information->map(function($item) {
                return [
                    'title' => $item->title,
                    'contents' => $item->contents,
                    'company_name' => $item->company_name,  // 直接アクセス
                    'id' => $item->company_information_id,  // 直接アクセス
                    'company_id' => $item->company_id       // 直接アクセス
                ];
            });

            // 最初の企業情報を取得
            $first_company = $company_information->first(); // 最初のアイテムを取得

            // Logのために企業情報を記録
            Log::info("タイトルコンテンツ配列の中身", $title_contents_array->toArray());
            Log::info("Company information", [
                'company_name' => $first_company->company_name ?? 'Not found',  // nullチェックを追加
                'company_id' => $first_company->company_id ?? 'Not found',      // nullチェックを追加
                'id' => $first_company->id ?? 'Not found'                        // nullチェックを追加
            ]);

        } else {
            $title_contents_array = []; // 企業情報がない場合は空配列
            Log::info("企業情報が見つかりませんでした");
        }

        return response()->json([
            'title_contents' => $title_contents_array,
        ]);
    }



}

