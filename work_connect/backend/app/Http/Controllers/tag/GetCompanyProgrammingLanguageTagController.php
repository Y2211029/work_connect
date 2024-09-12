<?php

namespace App\Http\Controllers\tag;

use App\Http\Controllers\Controller;
use App\Models\w_tags;
use Illuminate\Http\Request;

class GetCompanyProgrammingLanguageTagController extends Controller
{
    public function GetCompanyProgrammingLanguageTagController(Request $request){
        $tag = \DB::table('w_tags')
            ->where('item_id', 24)
            ->whereExists(function ($query) {
                $query->select(\DB::raw(1))
                    ->from('w_companies')
                    ->whereRaw('w_companies.selected_occupation REGEXP CONCAT("(^|,)", w_tags.name, "(,|$)")');
            })
            ->get();
        return json_encode($tag);
    }
}
