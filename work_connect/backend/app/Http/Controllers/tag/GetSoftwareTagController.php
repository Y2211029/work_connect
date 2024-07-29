<?php

namespace App\Http\Controllers\tag;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\w_tags;

class GetSoftwareTagController extends Controller
{
    public function GetSoftwareTagController(Request $request){
        $tag = \DB::table('w_tags')
            ->where('item_id', 5)
            ->whereExists(function ($query) {
                $query->select(\DB::raw(1))
                    ->from('w_users')
                    ->whereRaw('w_users.software REGEXP CONCAT("(^|,)", w_tags.name, "(,|$)")');
            })
            ->get();
        return json_encode($tag);
    }
}
