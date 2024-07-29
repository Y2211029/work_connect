<?php

namespace App\Http\Controllers\tag;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class GetPrefectureTagController extends Controller
{
    public function GetPrefectureTagController(Request $request){
        $tag = \DB::table('w_tags')
            ->where('item_id', 16)
            ->whereExists(function ($query) {
                $query->select(\DB::raw(1))
                    ->from('w_companies')
                    ->whereRaw('w_companies.prefecture REGEXP CONCAT("(^|,)", w_tags.name, "(,|$)")');
            })
            ->get();
        return json_encode($tag);
    }
}
