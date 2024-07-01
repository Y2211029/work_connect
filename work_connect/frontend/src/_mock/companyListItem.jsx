import { useEffect, useState } from "react";
import axios from "axios";
// ----------------------------------------------------------------------
/*--------------------------------------------*/
/* 企業一覧のデータを取得する処理を追加しました。 */
/*--------------------------------------------*/
// 下のMovieOfListの形に合わせたオブジェクト(WorkItem～:の形)にしたresponse.dataが入ります
// ! 注意 ! titleやuserNamaなどのキーはDBのカラム名になっています。

export const CompanyListItem = () => {
  // 企業一覧のデータを保持するステート
  const [CompanyOfList, setCompanyOfList] = useState([]);

  // 企業の一覧データを取得する用URL
  const url = "http://localhost:8000/get_Company_list";

  useEffect(() => {
    async function CompanyListFunction() {
      try {
        // Laravel側から企業一覧データを取得
        const response = await axios.get(url, {
          params: {},
        });

        // response.dataは配列の中にオブジェクトがある形になっています
        // console.log("response.data:", response.data);

        // 希望職業、希望勤務地、取得資格、プログラミング言語、開発環境、ソフトウェア、趣味、その他
        // はタグのため、カンマ区切りの文字列を配列に変換する
        response.data.forEach((element) => {
          element.selected_occupation !== null ? (element.selected_occupation = element.selected_occupation.split(",")) : "";
          element.desired_work_region !== null ? (element.desired_work_region = element.desired_work_region.split(",")) : "";
          element.acquisition_qualification !== null ? (element.acquisition_qualification = element.acquisition_qualification.split(",")) : "";
        });

        setCompanyOfList(response.data);
        console.log("CompanyListObject:", response.data);
      } catch (err) {
        console.log("err:", err);
      }
    }
    CompanyListFunction();
  }, []); // 空の依存配列を渡すことで初回のみ実行されるようにする

  const posts = CompanyOfList.map((index, key) => ({
    id: CompanyOfList[key].id,
    cover: `/assets/images/covers/cover_${index + 1}.jpg`,
    title: CompanyOfList[key].company_name,
    // createdAt: CompanyOfList[key].post_datetime,

    // view: CompanyOfList[key].title,
    // comment: CompanyOfList[key].title,
    // share: CompanyOfList[key].title,
    // favorite: CompanyOfList[key].title,
    author: {
    //   name: "",
      avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
    },
  }));

  return posts;
};

export default CompanyListItem;
