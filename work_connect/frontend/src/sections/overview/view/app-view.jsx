import { useEffect, useState } from "react";
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

  // 作品一覧のデータを保持するステート
  const [WorkOfList, setWorkOfList] = useState({});

  // 作品の一覧データを取得する用URL
  const url = "http://localhost:8000/get_work_list";

  useEffect(() => {
    async function workListFunction() {
      try {
        // Laravel側から作品一覧データを取得
        const response = await axios.get(url, {
          params: {},
        });

        // response.dataは配列の中にオブジェクトがある形になっています
        // console.log("response.data:", response.data);

        // プログラミング言語、開発環境、その他はタグのため、カンマ区切りの文字列を配列に変換する
        console.log("response", response);
        response.data.forEach((element) => {
          element.programming_language !== null ? (element.programming_language = element.programming_language.split(",")) : "";
          element.development_environment !== null ? (element.development_environment = element.development_environment.split(",")) : "";
          element.other !== null ? (element.other = element.other.split(",")) : "";
        });

        // 取得した作品データを表示用のオブジェクトにセットする
        const updatedWorkOfList = {};
        response.data.forEach((element, index) => {
          const keyString = "WorkItem" + (index + 1);
          updatedWorkOfList[keyString] = element;
        });

        setWorkOfList(updatedWorkOfList);
        console.log("workListObject:", updatedWorkOfList);
      } catch (err) {
        console.log("err:", err);
      }
    }
    workListFunction();
  }, []); // 空の依存配列を渡すことで初回のみ実行されるようにする

  /*--------------------------------------------*/
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
              <p>{WorkItem.work_name}</p>
              <p>{WorkItem.thumbnail}</p>
              <p>{WorkItem.work_genre}</p>
              <p>{WorkItem.post_datetime}</p>
              <p>{WorkItem.user_name}</p>
            </Grid>
          </Grid>
        );
      })}
    </Container>
  );
}
