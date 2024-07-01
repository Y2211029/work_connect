// import { faker } from '@faker-js/faker';

import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";
import axios from "axios";

// import AppCurrentVisits from "src/sections/overview/app-current-visits";
// ----------------------------------------------------------------------

export default function AppView() {
  /*--------------------------------------------*/
  /* 作品一覧のデータを取得する処理を追加しました。 */
  /*--------------------------------------------*/
  // 下のWorkOfListの形に合わせたオブジェクト(WorkItem～:の形)にしたresponse.dataが入ります
  // ! 注意 ! titleやuserNamaなどのキーはDBのカラム名になっています。
  const WorkOfList_2 = {};

  // 作品の一覧データを取得する用URL
  const url = "http://localhost:8000/get_work_list";

  // Laravel側から作品一覧データを取得
  axios
    .get(url, {
      params: {},
    })
    // thenで成功した場合の処理
    .then((response) => {
      // response.dataは配列の中にオブジェクトがある形になっています
      // console.log("response.data:", response.data);

      // プログラミング言語、開発環境、その他はタグのため、カンマ区切りの文字列を配列に変換する
      response.data.forEach(element => {
        element.programming_language = element.programming_language.split(",");
        element.development_environment = element.development_environment.split(",");
        element.other = element.other.split(",");
      });

      // 取得した作品データを表示用のオブジェクトにセットする
      for (var i = 1; i <= response.data.length; i++) {
        const keyString = "WorkItem" + i;
        WorkOfList_2[keyString] = response.data[i - 1];
      }

      // console.log("workListObject:", WorkOfList_2);
    })
    // catchでエラー時の挙動を定義
    .catch((err) => {
      console.log("err:", err);
    });

  /*--------------------------------------------*/

  const WorkOfList = {
    WorkItem1: {
      title: "Connect",
      img: "test",
      tag: ["tagTest", "tagTest", "tagTest", "tagTest", "tagTest"],
      introductory: "この作品紹介文です。",
      userNama: "ryutyan",
      postDate: "3ヶ月",
    },
    WorkItem2: {
      title: "Connect",
      img: "test",
      tag: ["tagTest", "tagTest", "tagTest", "tagTest", "tagTest"],
      introductory: "この作品紹介文です。",
      userNama: "ryutyan",
      postDate: "3ヶ月",
    },
    WorkItem3: {
      title: "Connect",
      img: "test",
      tag: ["tagTest", "tagTest", "tagTest", "tagTest", "tagTest"],
      introductory: "この作品紹介文です。",
      userNama: "ryutyan",
      postDate: "3ヶ月",
    },
    WorkItem4: {
      title: "Connect",
      img: "test",
      tag: ["tagTest", "tagTest", "tagTest", "tagTest", "tagTest"],
      introductory: "この作品紹介文です。",
      userNama: "ryutyan",
      postDate: "3ヶ月",
    },
  };

  console.log("WorkOfList", WorkOfList);

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        作品一覧
      </Typography>

      {Object.keys(WorkOfList).map((key) => {
        const WorkItem = WorkOfList[key];
        return (
          <Grid container spacing={8} key={key}>
            <Grid xs={12} md={6} lg={4}>
              <h3>{WorkItem.title}</h3>
              <h3>{WorkItem.img}</h3>
              <h3>{WorkItem.tag}</h3>
              <h3>{WorkItem.introductory}</h3>
              <h3>{WorkItem.userNama}</h3>
              <h3>{WorkItem.postDate}</h3>
            </Grid>
          </Grid>
        );
      })}
    </Container>
  );
}
