import { useEffect, useState } from "react";
import axios from "axios";
// ----------------------------------------------------------------------
/*--------------------------------------------*/
/* 学生一覧のデータを取得する処理を追加しました。 */
/*--------------------------------------------*/
// 下のMovieOfListの形に合わせたオブジェクト(WorkItem～:の形)にしたresponse.dataが入ります
// ! 注意 ! titleやuserNamaなどのキーはDBのカラム名になっています。

export const StudentListItem = () => {
  // 学生一覧のデータを保持するステート
  const [StudentOfList, setStudentOfList] = useState([]);

  // 学生の一覧データを取得する用URL
  const url = "http://localhost:8000/get_student_list";

  useEffect(() => {
    async function StudentListFunction() {
      try {
        // Laravel側から学生一覧データを取得
        const response = await axios.get(url, {
          params: {},
        });

        // response.dataは配列の中にオブジェクトがある形になっています
        // console.log("response.data:", response.data);

        // 希望職業、希望勤務地、取得資格、プログラミング言語、開発環境、ソフトウェア、趣味、その他
        // はタグのため、カンマ区切りの文字列を配列に変換する
        response.data.forEach((element) => {
          element.desired_occupation !== null ? (element.desired_occupation = element.desired_occupation.split(",")) : "";
          element.desired_work_region !== null ? (element.desired_work_region = element.desired_work_region.split(",")) : "";
          element.acquisition_qualification !== null ? (element.acquisition_qualification = element.acquisition_qualification.split(",")) : "";
          element.programming_language !== null ? (element.programming_language = element.programming_language.split(",")) : "";
          element.desired_work_region !== null ? (element.desired_work_region = element.desired_work_region.split(",")) : "";
          element.development_environment !== null ? (element.development_environment = element.development_environment.split(",")) : "";
          element.software !== null ? (element.software = element.software.split(",")) : "";
          element.hobby !== null ? (element.hobby = element.hobby.split(",")) : "";
          element.other !== null ? (element.other = element.other.split(",")) : "";
        });

        setStudentOfList(response.data);
        console.log("StudentListObject:", response.data);
      } catch (err) {
        console.log("err:", err);
      }
    }
    StudentListFunction();
  }, []); // 空の依存配列を渡すことで初回のみ実行されるようにする

  const posts = StudentOfList.map((index, key) => ({
    id: StudentOfList[key].id,
    cover: `/assets/images/covers/cover_${index + 1}.jpg`,
    title: StudentOfList[key].student_surname + StudentOfList[key].student_name,
    // createdAt: StudentOfList[key].post_datetime,

    // view: StudentOfList[key].title,
    // comment: StudentOfList[key].title,
    // share: StudentOfList[key].title,
    // favorite: StudentOfList[key].title,
    author: {
    //   name: "",
      avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
    },
  }));

  return posts;
};

export default StudentListItem;
