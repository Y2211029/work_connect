import { faker } from "@faker-js/faker";
import { useEffect, useState } from "react";
import axios from "axios";
// ----------------------------------------------------------------------
/*--------------------------------------------*/
/* 動画一覧のデータを取得する処理を追加しました。 */
/*--------------------------------------------*/
// 下のMovieOfListの形に合わせたオブジェクト(WorkItem～:の形)にしたresponse.dataが入ります
// ! 注意 ! titleやuserNamaなどのキーはDBのカラム名になっています。

export const VideoListItem = () => {
  // 作品一覧のデータを保持するステート
  const [MovieOfList, setMovieOfList] = useState([]);

  // 作品の一覧データを取得する用URL
  const url = "http://localhost:8000/get_movie_list";

  useEffect(() => {
    // 非同期関数
    async function MovieListFunction() {
      try {
        // Laravel側から作品一覧データを取得
        const response = await axios.get(url, {
          params: {},
        });

        // response.dataは配列の中にオブジェクトがある形になっています
        // console.log("response.data:", response.data);

        // ジャンルはタグのため、カンマ区切りの文字列を配列に変換する
        response.data.forEach((element) => {
          element.genre = element.genre.split(",");
        });

        setMovieOfList(response.data);
        console.log("MovieListObject:", response.data);
      } catch (err) {
        console.log("err:", err);
      }
    }
    MovieListFunction();
  }, []); // 空の依存配列を渡すことで初回のみ実行されるようにする

  const posts = MovieOfList.map((index, key) => ({
    id: MovieOfList[key].movie_id,
    cover: `/assets/images/covers/cover_${5 + 1}.jpg`,
    title: MovieOfList[key].title,
    author: {
      avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
    },
    thumbnail: `"../../../public/assets/videoImages/thumbnail/cover_${index + 1}.jpg"`,
    view: faker.number.int(99999),
    comment: faker.number.int(99999),
    favorite: faker.number.int(99999),
    userName: MovieOfList[key].user_name,
    createdAt: MovieOfList[key].post_datetime,
  }));

  console.log("aadlkmbadkmbkmda;", posts);
  return posts;
};

export default VideoListItem;
