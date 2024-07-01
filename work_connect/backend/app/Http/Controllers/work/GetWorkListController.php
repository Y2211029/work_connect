<?php

namespace App\Http\Controllers\work;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\w_work;

class GetWorkListController extends Controller
{
    public function GetWorkListController(Request $request){
        try {
            $workList = w_work::select()->get();
            $workListArray = json_decode(json_encode($workList), true);
            
            echo json_encode($workListArray);
            \Log::info('GetWorkListController:$workListArray:');
            \Log::info(json_encode($workListArray));

        } catch (\Exception $e) {
            \Log::info('GetWorkListController:user_name重複チェックエラー');
            \Log::info($e);

            /*reactに返す*/
            echo json_encode($e);
        }
    }
}
