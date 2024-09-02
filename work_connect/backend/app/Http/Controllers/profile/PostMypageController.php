<?php

namespace App\Http\Controllers\profile;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\w_users;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class PostMypageController extends Controller
{
    public function PostMypageController(Request $request)
    {
        // reactからデータを取得 
        // 必須項目
        $ProfileUserName = $request->input('ProfileUserName');
        
        $StudentSurName = $request->input('StudentSurName');
        $StudentName = $request->input('StudentName');
        $StudentKanaSurName = $request->input('StudentKanaSurName');
        $StudentKanaName = $request->input('StudentKanaName');
        $Intro = $request->input('Intro');
        $Graduation = $request->input('Graduation');
        $SchoolName = $request->input('SchoolName');
        // 詳細項目(自動的にNULLを設定)
        $Icon = $request->input('Icon') === "" ? null : $request->input('Icon');
        $DepartmentName = $request->input('DepartmentName') === "" ? null : $request->input('DepartmentName');
        $FacultyName = $request->input('FacultyName') === "" ? null : $request->input('FacultyName');
        $Environment = $request->input('Environment') === "" ? null : $request->input('Environment');
        $Hobby = $request->input('Hobby') === "" ? null : $request->input('Hobby');
        $Prefecture = $request->input('Prefecture') === "" ? null : $request->input('Prefecture');
        $DesiredOccupation = $request->input('DesiredOccupation') === "" ? null : $request->input('DesiredOccupation');
        $ProgrammingLanguage = $request->input('ProgrammingLanguage') === "" ? null : $request->input('ProgrammingLanguage');
        $Qualification = $request->input('Qualification') === "" ? null : $request->input('Qualification');
        $Software = $request->input('Software') === "" ? null : $request->input('Software');

        try {
            // updateする項目
            $data = [
                'icon' => $Icon,
                'student_surname' => $StudentSurName,
                'student_name' => $StudentName,
                'student_kanasurname' => $StudentKanaSurName,
                'student_kananame' => $StudentKanaName,
                'intro' => $Intro,
                'graduation_year' => $Graduation,
                'school_name' => $SchoolName,
                'department_name' => $DepartmentName,
                'faculty_name' => $FacultyName,
                'development_environment' => $Environment,
                'hobby' => $Hobby,
                'desired_work_region' => $Prefecture,
                'desired_occupation' => $DesiredOccupation,
                'programming_language' => $ProgrammingLanguage,
                'acquisition_qualification' => $Qualification,
                'software' => $Software,
            ];
            // user_nameを指定しデータを更新
            DB::table('w_users')
            ->where('user_name', $ProfileUserName)
            ->update($data);

            return json_encode(true);

        } catch (\Exception $e) {

            \Log::info('registerController:新規登録データのDB保存処理エラー');
            \Log::info($e);
            
        }
    }


    // 画像のアップロード
    public function UploadImageController(Request $request){

        if ($request->hasFile('image')) {
            // 画像の読み込み
            $file = $request->file('image');
            // 重複しない名前を作る
            $filename = time() . '-' . $file->getClientOriginalName();
            // パスを生成
            $destinationPath = public_path('storage/images/userIcon'); 
            // アップロード
            $file->move($destinationPath, $filename); 

            // reactにデータを返す。
            return response()->json(['fileName' => $filename, 'path' => asset('storage/images/userIcon/' . $filename)]);
        }

        return response()->json(['error' => 'No file uploaded'], 400);
    }

}
