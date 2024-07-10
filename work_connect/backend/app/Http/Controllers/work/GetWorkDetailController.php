<?php

namespace App\Http\Controllers\work;

use Illuminate\Support\Facades\Storage;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\w_work;
use App\Models\w_images;

class GetWorkDetailController extends Controller
{
    public function GetWorkDetailController(Request $request)
    {
        $id = $request->input('id');
        try {
            $workList = w_work::join('w_users', 'w_works.creator_id', '=', 'w_users.id')
                ->select(
                    'w_users.programming_language AS users_programming_language',
                    'w_users.development_environment AS users_development_environment',
                    'w_users.other AS users_other',

                    'w_users.*',
                    'w_works.*',

                )->where('work_id', $id)->get();


            $workImageList = w_images::select('*')->where('work_id', $id)->get();

            $workImageSrc = "";
            foreach ($workImageList as $key => $imageList) {
                $workImageSrc = asset("/storage/images/work/". "$imageList->image");
                // $workImageSrc = "aaa";
                $workImageList[$key]->imageSrc = $workImageSrc;
            }

            if ($workList[0]) {
                $workList[0]->images = $workImageList;
            }

            \Log::info('GetWorkDetailController:$workList[0]:');
            \Log::info(json_decode(json_encode($workList[0]), true));
            $workListArray = json_decode(json_encode($workList), true);

            // $workListがnullでない場合に$workImageListを結合する
            echo json_encode($workListArray);
            \Log::info('GetWorkDetailController:$workListArray:');
            \Log::info(json_encode($workListArray));
        } catch (\Exception $e) {
            \Log::info('GetWorkDetailController:user_name重複チェックエラー');
            \Log::info($e);
            /*reactに返す*/
            echo json_encode($e);
        }
    }
}
