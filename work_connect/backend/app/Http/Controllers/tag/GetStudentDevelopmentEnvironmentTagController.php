<?php

namespace App\Http\Controllers\tag;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\w_tags;

class GetStudentDevelopmentEnvironmentTagController extends Controller
{
    public function GetStudentDevelopmentEnvironmentTagController(Request $request){
        $tag = \DB::table('w_tags')
            ->where('item_id', 6)
            ->whereExists(function ($query) {
                $query->select(\DB::raw(1))
                    ->from('w_users')
                    ->whereRaw('w_users.development_environment REGEXP CONCAT("(^|,)", w_tags.name, "(,|$)")');
            })
            ->get();
        return json_encode($tag);
    }
}
