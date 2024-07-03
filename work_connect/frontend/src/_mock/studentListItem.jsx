import { faker } from "@faker-js/faker";
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

  // タグ作成
  function CreateTagElements({ itemContents }) {
    return <button className="greeting">{itemContents}</button>;
  }

  useEffect(() => {
    async function StudentListFunction() {
      try {
        // Laravel側から学生一覧データを取得
        const response = await axios.get(url, {
          params: {},
        });

        // response.dataは配列の中にオブジェクトがある形になっています
        // console.log("response.data:", response.data);

        // 卒業年度、学校名、希望職業、希望勤務地、はタグのため、カンマ区切りの文字列を配列に変換する
        response.data.forEach((element) => {
          element.desired_work_region !== null
            ? (element.desired_work_region = element.desired_work_region
                .split(",")
                .map((item) => <CreateTagElements key={item} itemContents={item} />))
            : "";
          element.desired_occupation !== null
            ? (element.desired_occupation = element.desired_occupation
              .split(",")
              .map((item) => <CreateTagElements key={item} itemContents={item} />))
            : "";
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
    cover: `/assets/images/covers/cover_${6 + 1}.jpg`,
    title: StudentOfList[key].student_surname + StudentOfList[key].student_name,
    graduationYear: StudentOfList[key].graduation_year,
    schoolName: StudentOfList[key].school_name,
    desiredWorkRegion: StudentOfList[key].desired_work_region,
    desiredOccupation: StudentOfList[key].desired_occupation,
    
    view: faker.number.int(99999),
    comment: faker.number.int(99999),
    favorite: faker.number.int(99999),
    author: {
      avatarUrl: `/assets/images/avatars/avatar_${5 + 1}.jpg`,
    },
  }));

  return posts;
};

export default StudentListItem;
