<<<<<<< HEAD
import ListView from "src/components/view/list-view";

const WorkOfListView = () => {
  return <ListView type="works"/>;
};

export default WorkOfListView;
=======
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
import { DataListContext } from "src/layouts/dashboard/index";
// import AppCurrentVisits from "src/sections/overview/app-current-visits";

/*------------------------------------------------------------------------------------------------*/

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
    work_id: WorkOfList[key].work_id,
    cover: `/assets/images/covers/cover_${key + 1}.jpg`,
    thumbnail: `/assets/workImages/thumbnail/cover_${key + 1}.jpg`,
    title: WorkOfList[key].work_name,
    genre: WorkOfList[key].work_genre,
    // substring(0, 200) 第一引数：文字列の開始位置。第二引数：開始位置から何文字目を取得する。
    // introの文字数が200文字以上の時、「...」を表示する。
    intro:
      WorkOfList[key].work_intro.length > 200
        ? WorkOfList[key].work_intro.substring(0, 200) + "..."
        : WorkOfList[key].work_intro,
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
  const [page, setPage] = useState(1);
  // 作品一覧のデータを保持するステート
  const [WorkOfList, setWorkOfList] = useState([]);
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
      setPage((p) => p + 1);
    }
    // if(WorkOfList.length - 1)
  }, [isIntersecting]);

  /**
   *---------- useSWR--------------
   * 概要：取得したデータを保持（キャッシュ）し、再レンダリング時にその保持したデータを使用する。
   * useSWRの解説：https://swr.vercel.app/ja  |  https://qiita.com/musenmai/items/e09c0b798a05522a33cf
   * 
   * 現在の使用状況：スクロールされたら、データを取得し、キャッシュデータを使用してスクロールする前に表示されていた作品アイテムに追加する。
   */
 
  // レスポンス情報を常に持っておくことで、毎回API通信がされるのを防ぐhooks

  // 何も検索されていない、素の状態。
  useSWR(`http://localhost:8000/get_work_list?page=${page}`, fetcher, {
    onSuccess: (data) => {
      if (data && data.length > 0) {
        setWorkOfList((r) => {
          const uniqueRepoIds = new Set(r.map((WorkOfList) => WorkOfList.work_id));
          // 重複データを省く
          const uniqueRepos = data.filter((item) => !uniqueRepoIds.has(item.work_id));
          // ジャンルボタンの作成
          uniqueRepos.map((element) => {
            if (typeof element.work_genre === "string" && element.work_genre !== null) {
              element.work_genre = createTagElements(element.work_genre);
            }
            return element;
          });
          // 作品アイテムがスクロールされてデータが表示されたら、ローディングアニメーションをOFFにする。
          setIsLoadColorLing(false);
          // 現在表示している作品アイテムに新しいデータを追加。
          return [...r, ...uniqueRepos];
        });
      } else {
        // 作品アイテムがスクロールしてもデータが0件の場合、ローディングアニメーションをOFFにする。
        setIsLoadItemColorLing(false);
      }
    },
    onError: (err) => {
      console.log("err", err);
    },
  });

  // 検索されたら実行
  useEffect(() => {
    setWorkOfList(DataList);
    console.log("DataList:", DataList);
  }, [DataList]);

  // 検索結果0件の場合、WorkOfListに"検索結果0件"が入ってるのでそのまま表示する。
  const workItems = WorkOfList !== "検索結果0件" ? generatePosts(WorkOfList) : WorkOfList;

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
                <PostCard
                  ref={index === WorkOfList.length - 1 ? ref : null}
                  key={`${post.work_id}-${post.userName}`}
                  post={post}
                  index={index}
                />
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
>>>>>>> a8f81805d7881191f4c8b687c9cc54c98922b3f3
