<?php

namespace App\Http\Controllers\tag;

use App\Http\Controllers\Controller;
use App\Models\w_tags;
use Illuminate\Http\Request;

class GetDesiredWorkRegionTagController extends Controller
{
    public function GetDesiredWorkRegionTagController(Request $request){
        $tag = \DB::table('w_tags')
            ->where('item_id', 3)
            ->whereExists(function ($query) {
                $query->select(\DB::raw(1))
                    ->from('w_users')
                    ->whereRaw('w_users.desired_work_region REGEXP CONCAT("(^|,)", w_tags.name, "(,|$)")');
            })
            ->get();
        return json_encode($tag);
    }
}
