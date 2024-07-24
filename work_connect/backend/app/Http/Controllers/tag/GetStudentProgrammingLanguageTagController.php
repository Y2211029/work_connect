<?php

namespace App\Http\Controllers\tag;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\w_tags;

class GetStudentProgrammingLanguageTagController extends Controller
{
    public function GetStudentProgrammingLanguageTagController(Request $request){
        $language_tag = w_tags::where("item_id", 4)->get();
        return json_encode($language_tag);
    }
}