<?php

namespace App\Http\Controllers\tag;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\w_tags;

class GetStudentProgrammingLanguageTagController extends Controller
{
<<<<<<< HEAD
    public function GetStudentProgrammingLanguageTagController(Request $request)
    {
=======
    public function GetStudentProgrammingLanguageTagController(Request $request){
>>>>>>> a8f81805d7881191f4c8b687c9cc54c98922b3f3
        $tag = \DB::table('w_tags')
            ->where('item_id', 4)
            ->whereExists(function ($query) {
                $query->select(\DB::raw(1))
                    ->from('w_users')
                    ->whereRaw('w_users.programming_language REGEXP CONCAT("(^|,)", w_tags.name, "(,|$)")');
            })
            ->get();
<<<<<<< HEAD

        \Log::info('GetStudentProgrammingLanguageTagController.php:$tag:');
        \Log::info($tag);
=======
>>>>>>> a8f81805d7881191f4c8b687c9cc54c98922b3f3
        return json_encode($tag);
    }
}