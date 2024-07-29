import { useContext, useEffect, useState } from "react";
import { ColorRing } from "react-loader-spinner";
import useSWR from "swr";
import { faker } from "@faker-js/faker";

import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";

import { useIntersection } from "/src/routes/hooks/use-intersection";
import PostCard from "src/sections/WorkList/post-card";
import PostSort from "src/sections/WorkList/post-sort";
import LoginStatusCheck from "src/components/account/loginStatusCheck/loginStatusCheck";
import CreateTagElements from "src/components/tag/CreateTagElements";
import { PageContext } from "src/layouts/dashboard";
import { DataListContext } from "src/layouts/dashboard/index";
// import AppCurrentVisits from "src/sections/overview/app-current-visits";

/*------------------------------------------------------------------------------------------------*/

// リクエスト成功したらオブジェクト返す。
const fetcher = (url) => fetch(url).then((res) => res.json());

// コンポーネント内で定義するとレンダリングの度に新しいオブジェクトが生成されるので外に定義
// もしくはuseStateやuseRefの初期値として定義
const setting = {
  rootMargin: "40px",
};

// w_worksのカンマ繋がりの文字列をタグボタンに変換
const createTagElements = (genreString) => {
  return genreString.split(",").map((item) => <CreateTagElements key={item} itemContents={item} />);
};

const generatePosts = (WorkOfList) => {
  return WorkOfList.map((_, key) => ({
    work_number: key,
    work_id: WorkOfList[key].work_id,
    cover: `/assets/images/covers/cover_${key + 1}.jpg`,
    thumbnail: `/assets/workImages/thumbnail/cover_${key + 1}.jpg`,
    title: WorkOfList[key].work_name,
    genre: WorkOfList[key].work_genre,
    // substring(0, 200) 第一引数：文字列の開始位置。第二引数：開始位置から何文字目を取得する。
    // introの文字数が200文字以上の時、「...」を表示する。
    intro: WorkOfList[key].work_intro.length > 200 ? WorkOfList[key].work_intro.substring(0, 200) + "..." : WorkOfList[key].work_intro,
    author: {
      avatarUrl: `/assets/images/avatars/avatar_${WorkOfList[key].icon}.jpg`,
    },
    view: faker.number.int(99999),
    comment: faker.number.int(99999),
    favorite: faker.number.int(99999),
    userName: WorkOfList[key].user_name,
    createdAt: WorkOfList[key].created_at,
  }));
};

export default function WorkOfListView() {
  // ログインチェック
  const { loginStatusCheckFunction } = LoginStatusCheck();
  // スクロールした際に次のデータを取得するために必要
  const { Page, setPage } = useContext(PageContext);
  // 作品一覧のデータを保持するステート
  const [WorkOfList, setWorkOfList] = useState([]);
  const [searchInitiated, setSearchInitiated] = useState(false); // 検索の初回フラグ
  // 検索結果を反映させるためのContext
  const { DataList } = useContext(DataListContext);
  // スクロールされたら新しいデータを取得
  const [isIntersecting, ref] = useIntersection(setting);
  // 全体画面ローディング
  const [isLoadColorLing, setIsLoadColorLing] = useState(true);
  // 作品アイテムスクロール時ローディング
  const [isLoadItemColorLing, setIsLoadItemColorLing] = useState(false);

  // 無駄なレンダリングを回避する。
  useEffect(() => {
    loginStatusCheckFunction();
  }, [loginStatusCheckFunction]);

  // 今表示されているアイテムの一番下までスクロールしたら次のデータを取得する。
  useEffect(() => {
    if (isIntersecting) {
      setIsLoadItemColorLing(true);
      console.log("WorkOfList:setPage Before = ", Page);
      setPage((p) => p + 1);
    }
    // if(WorkOfList.length - 1)
  }, [isIntersecting]);

  useEffect(() => {
    console.log("WorkOfList:setPage After = ", Page);
    // if(WorkOfList.length - 1)
  }, [Page]);

  /**
   *---------- useSWR--------------
   * 概要：取得したデータを保持（キャッシュ）し、再レンダリング時にその保持したデータを使用する。
   * useSWRの解説：https://swr.vercel.app/ja  |  https://qiita.com/musenmai/items/e09c0b798a05522a33cf
   *
   * 現在の使用状況：スクロールされたら、データを取得し、キャッシュデータを使用してスクロールする前に表示されていた作品アイテムに追加する。
   */

  // レスポンス情報を常に持っておくことで、毎回API通信がされるのを防ぐhooks

  // 何も検索されていない、素の状態。
  console.log("WorkOfList-view.jsx", DataList);
  const url = DataList.length === 0 ? `http://localhost:8000/get_work_list?page=${Page}` : null;
  const { data, error } = useSWR(url, fetcher);

  useEffect(() => {
    console.log("WorkOfList-view.jsx", DataList);
    if (DataList.length === 0) {
      if (searchInitiated) {
        setWorkOfList([]); // 初回のみリセット
        setSearchInitiated(false);
        console.log("リセットしました。");
      }

      if (data) {
        //
        console.log("data通りました。");
        const uniqueRepoIds = new Set(WorkOfList.map((WorkOfList) => WorkOfList.work_id));
        const uniqueRepos = data.filter((item) => !uniqueRepoIds.has(item.work_id));
        // console.log("WorkOfList-view.jsx:uniqueRepos", uniqueRepos);

        uniqueRepos.forEach((element) => {
          if (typeof element.work_genre === "string" && element.work_genre !== null) {
            element.work_genre = createTagElements(element.work_genre, element.work_genre);
          }
        });

        // 作品アイテムを追加
        setWorkOfList((prev) => [...prev, ...uniqueRepos]);

        // ローディング
        setIsLoadColorLing(false);
        setIsLoadItemColorLing(false);
      }
      if (error) {
        console.error(error);

        // ローディング
        setIsLoadColorLing(false);
        setIsLoadItemColorLing(false);
      }
    } else {
      setIsLoadItemColorLing(false);
    }
  }, [data, error, DataList]);

  // 検索されたら実行
  useEffect(() => {
    if (DataList.length !== 0 && typeof DataList !== "string") {
      if (!searchInitiated) {
        setWorkOfList([]); // 初回のみリセット
        setSearchInitiated(true);
        console.log("リセットしました。");
      }
      // デバッグ用ログ
      // console.log("WorkOfList before uniqueRepoIds:", WorkOfList);
      // console.log("DataList:", DataList);

      // const uniqueRepoIds = new Set(WorkOfList.map((WorkOfList) => WorkOfList.work_id));
      // console.log("uniqueRepoIdsとuniqueReposの間");
      // const uniqueRepos = DataList.filter((item) => uniqueRepoIds.has(item.work_id));

      // console.log("uniqueRepoIds", uniqueRepoIds);
      // console.log("uniqueRepos", uniqueRepos);

      console.log("DataList.length", DataList.length);

      DataList.forEach((element) => {
        if (typeof element.work_genre === "string" && element.work_genre !== null) {
          element.work_genre = createTagElements(element.work_genre, element.work_genre);
        }
      });

      // 作品アイテムを追加
      // setWorkOfList((prev) => [...prev, ...uniqueRepos]);
      setWorkOfList((prev) => [...prev, ...DataList]);

      // ローディング
      setIsLoadColorLing(false);
      setIsLoadItemColorLing(false);
      if (error) {
        console.error(error);

        // ローディング
        setIsLoadColorLing(false);
        setIsLoadItemColorLing(false);
      }
      // }
    }
    
    if(DataList === "検索結果0件") {
      console.log("setIsLoadItemColorLing",isLoadItemColorLing);
      setIsLoadItemColorLing(false);
    }
  }, [data, error, DataList]);

  // 検索結果0件の場合、WorkOfListに"検索結果0件"が入ってるのでそのまま表示する。
  const workItems = WorkOfList !== "検索結果0件" ? generatePosts(WorkOfList) : WorkOfList;
  const currentTime = new Intl.DateTimeFormat("ja-JP", {
    dateStyle: "medium",
    timeStyle: "medium",
    timeZone: "Asia/Tokyo",
  }).format(new Date());

  console.log("currentTime", currentTime);

  return (
    // Container 真ん中にコンテンツを寄せて表示したいときに使う
    <>
      {/* ローディング */}
      {isLoadColorLing && (
        <ColorRing
          visible={true}
          height="100"
          width="100"
          ariaLabel="color-ring-loading"
          wrapperStyle={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
          wrapperClass="color-ring-wrapper"
          colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
        />
      )}
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          {/* Typography 注釈みたいなもの */}
          <Typography variant="h4">作品一覧</Typography>
        </Stack>
        {/* 並べ替えボタン */}
        <Stack mb={5} direction="row" alignItems="center" justifyContent="flex-end">
          <PostSort
            options={[
              { value: "orderNewPostsDate", label: "投稿日が新しい順" },
              { value: "orderOldPostsDate", label: "投稿日が古い順" },
            ]}
          />
        </Stack>

        <Grid container spacing={3}>
          {workItems !== "検索結果0件"
            ? workItems.map((post, index) => (
                // WorkOfList内にあるデータの一番最後の時に、useRefでスクロールした際に反応させる。
                <PostCard ref={index === WorkOfList.length - 1 ? ref : null} key={`${post.work_id}-${currentTime}`} post={post} index={index} />
              ))
            : workItems}
          {/* ローディング */}
          {isLoadItemColorLing && (
            <ColorRing
              visible={true}
              height="50"
              width="50"
              ariaLabel="color-ring-loading"
              wrapperStyle={{}}
              wrapperClass="color-ring-wrapper"
              colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
            />
          )}
        </Grid>
      </Container>
    </>
  );
}
