<?php

namespace App\Http\Controllers\tag;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\w_tags;


class GetGenreTagController extends Controller
{
    public function GetGenreTagController(Request $request)
    {
        $tag = \DB::table('w_tags')
            ->where('item_id', 11)
            ->whereExists(function ($query) {
                $query->select(\DB::raw(1))
                    ->from('w_works')
                    ->whereRaw('w_works.work_genre REGEXP CONCAT("(^|,)", w_tags.name, "(,|$)")');
            })
            ->get();
        return json_encode($tag);
    }
}
