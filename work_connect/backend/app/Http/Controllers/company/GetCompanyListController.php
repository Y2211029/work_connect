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
            $companyList = w_company::select()->get();
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
