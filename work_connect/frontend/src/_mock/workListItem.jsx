import { useEffect, useState } from "react";
import axios from "axios";

import { faker } from "@faker-js/faker";

// タグボタン作成コンポーネント
import CreateTagElements from "src/components/tag/CreateTagElements";

// ----------------------------------------------------------------------
/*--------------------------------------------*/
/* 作品一覧のデータを取得する処理を追加しました。 */
/*--------------------------------------------*/
// 下のWorkOfListの形に合わせたオブジェクト(WorkItem～:の形)にしたresponse.dataが入ります
// ! 注意 ! titleやuserNameなどのキーはDBのカラム名になっています。
export const WorkListItem = () => {
  // 作品一覧のデータを保持するステート
  const [WorkOfList, setWorkOfList] = useState([]);

  // 作品の一覧データを取得する用URL
  const url = "http://localhost:8000/get_work_list";

  useEffect(() => {
    async function workListFunction() {
      try {
        // Laravel側かaら作品一覧データを取得
        const response = await axios.get(url, {
          params: {},
        });

        // response.dataは配列の中にオブジェクトがある形になっています
        // console.log("response.data:", response.data);

        // プログラミング言語、開発環境、その他はタグのため、カンマ区切りの文字列を配列に変換する
        response.data.forEach((element) => {
          element.work_genre !== null
            ? (element.work_genre = element.work_genre.split(",").map((item) => <CreateTagElements key={item} itemContents={item} />))
            : "";
        });

        setWorkOfList(response.data);
        console.log("response:", response);
      } catch (err) {
        console.log("err:", err);
      }
    }
    workListFunction();
  }, []); // 空の依存配列を渡すことで初回のみ実行されるようにする

  const posts = WorkOfList.map((_, key) => ({
    id: WorkOfList[key].id,
    cover: `/assets/images/covers/cover_${key + 1}.jpg`,
    thumbnail: `"../../../public/assets/videoImages/thumbnail/cover_${key + 1}.jpg"`,
    title: WorkOfList[key].work_name,
    genre: WorkOfList[key].work_genre,
    // substring(0, 200) 第一引数：文字列の開始位置。第二引数：開始位置から何文字目を取得する。
    // introの文字数が200文字以上の時、「...」を表示する。
    intro: WorkOfList[key].work_intro.length > 200 ? WorkOfList[key].work_intro.substring(0, 200) + "..." : WorkOfList[key].work_intro,

    author: {
      avatarUrl: `/assets/images/avatars/avatar_${key + 1}.jpg`,
    },
    view: faker.number.int(99999),
    comment: faker.number.int(99999),
    favorite: faker.number.int(99999),
    userName: WorkOfList[key].user_name,
    createdAt: WorkOfList[key].post_datetime,
  }));

  console.log("posts:", posts);
  return posts;
};

export default WorkListItem;
