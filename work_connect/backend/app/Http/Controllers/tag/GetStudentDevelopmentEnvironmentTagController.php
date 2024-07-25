<?php

namespace App\Http\Controllers\tag;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\w_tags;

class GetStudentDevelopmentEnvironmentTagController extends Controller
{
    public function GetStudentDevelopmentEnvironmentTagController(Request $request){
        $tag = w_tags::where("item_id", 6)->get();
        return json_encode($tag);
    }
}
