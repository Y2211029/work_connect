<?php

namespace App\Http\Controllers\register;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\w_users;
use App\Models\WPreUser;

class registerController extends Controller
{
    public function registerController(Request $request){

        /* 学生アカウント新規登録のデータをリクエストから取得 */
        // メールアドレス
        $mail = $request->input('mail');
        // ユーザー名
        $user_name = $request->input('user_name');
        // パスワード
        $password = $request->input('password');
        // 苗字
        $student_surname = $request->input('student_surname');
        // 名前
        $student_name = $request->input('student_name');
        // フリガナ苗字
        $student_kanasurname = $request->input('student_kanasurname');
        // フリガナ名前
        $student_kananame = $request->input('student_kananame');
        // 学校名
        $school_name = $request->input('school_name');
        // 学科名
        $department_name = $request->input('department_name');
        // 学部名
        $faculty_name = $request->input('faculty_name');
        // 専攻名
        $major_name = $request->input('major_name');
        // コース名
        $course_name = $request->input('course_name');
        // 出身地
        $user_from = $request->input('user_from');
        // プログラミング言語
        $programming_language = $request->input('programming_language');
        // 開発環境
        $development_environment = $request->input('development_environment');
        // ソフトウェア
        $software = $request->input('software');
        // 取得資格
        $acquisition_qualification = $request->input('acquisition_qualification');
        // 希望勤務地
        $desired_work_region = $request->input('desired_work_region');
        // 趣味
        $hobby = $request->input('hobby');
        // その他
        $others = $request->input('others');
        // 卒業年
        $graduation_year = $request->input('graduation_year');
        // 希望職種
        $desired_occupation = $request->input('desired_occupation');

        /* 学生アカウントのID生成 */
        try {
            // フラグをセット
            $flg = false;

            // 重複しないidが生成されるまでループ
            while(!$flg) {
                // 12桁(0埋め有)のランダムな数値を生成
                $randNum = str_pad(rand(1, 999999999999), 12, 0, STR_PAD_LEFT);
                
                // id用に「S_」を前に付ける
                $id = "S_" . "$randNum";

                // w_usersテーブルに同じidのデータが存在するかチェック
                // idが存在すればtrue、存在しなければfalse
                $idExists = w_users::where('id', $id)->exists();

                // idが存在しなかった場合にフラグをtrueにする
                if(!$idExists) {
                    $flg = true;
                }
            }

        } catch (\Exception $e) {
            \Log::info('registerController:id重複チェックエラー');
            \Log::info($e);

            /*reactに返す*/
            echo json_encode($e);
            exit;
        }
    
        /* DBにデータを登録 */
        if(!empty($mail)){
            try {
                // w_usersにデータをINSERT
                w_users::create([
                    'id' => $id,
                    'user_name' => $user_name,
                    'password' => $password,
                    'mail' => $mail,
                    'student_surname' => $student_surname,
                    'student_name' => $student_name,
                    'student_kanasurname' => $student_kanasurname,
                    'student_kananame' => $student_kananame,
                    'school_name' => $school_name,
                    'department_name' => $department_name,
                    'faculty_name' => $faculty_name,
                    'major_name' => $major_name,
                    'course_name' => $course_name,
                    'user_from' => $user_from,
                    'programming_language' => $programming_language,
                    'development_environment' => $development_environment,
                    'software' => $software,
                    'acquisition_qualification' => $acquisition_qualification,
                    'desired_work_region' => $desired_work_region,
                    'hobby' => $hobby,
                    'others' => $others,
                    'graduation_year' => $graduation_year,
                    'desired_occupation' => $desired_occupation,
                ]);

                // w_pre_usersテーブルのflgを0から1にUPDATEする
                WPreUser::where('mail', $mail)->update(['flag' => 1]);

                \Log::info('新規登録データのDB保存処理成功');

                /*reactに返す*/
                echo json_encode('新規登録データのDB保存処理成功');
                exit;

            } catch (\Exception $e) {

                \Log::info('registerController:新規登録データのDB保存処理エラー');
                \Log::info($e);

                /*reactに返す*/
                echo json_encode($e);
                exit;
            }
        } else {
            \Log::info('registerController:INSERTエラー');

            /*reactに返す*/
            echo json_encode('「mail」が送られていません');
            exit;
        }
    }
}