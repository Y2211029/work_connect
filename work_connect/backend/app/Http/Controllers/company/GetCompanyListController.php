<?php

namespace App\Http\Controllers\company;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\w_company;


class GetCompanyListController extends Controller
{

    public function GetCompanyListController(Request $request)
    {
        try {
            $page = (int) $request->query('page', 1);
            $perPage = 20; //一ページ当たりのアイテム数
            $offset = ($page - 1) * $perPage;

            $companyList = w_company::skip($offset)
                ->take($perPage)
                ->get();
            $companyListArray = json_decode(json_encode($companyList), true);

            \Log::info('GetCompanyListController:$companyListArray:');
            \Log::info(json_encode($companyListArray));
            // echo json_encode($companyListArray);
            return json_encode($companyListArray);
        } catch (\Exception $e) {
            \Log::info('GetCompanyListController:company_name重複チェックエラー');
            \Log::info($e);

            /*reactに返す*/
            echo json_encode($e);
        }
    }
}
