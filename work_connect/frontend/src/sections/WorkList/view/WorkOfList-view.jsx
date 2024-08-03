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
import { PageContext, DataListContext, SearchCheckContext } from "src/layouts/dashboard";

const fetcher = (url) => fetch(url).then((res) => res.json());

const setting = {
  rootMargin: "40px",
};

const funcSetWorksItem = (currentWorkList, setWorkList, newWorks, setLoading, setItemLoading) => {
  if (newWorks) {
    const uniqueRepoIds = new Set(currentWorkList.map((work) => work.work_id));
    const uniqueRepos = newWorks.filter((item) => !uniqueRepoIds.has(item.work_id));

    uniqueRepos.forEach((element) => {
      if (typeof element.work_genre === "string" && element.work_genre !== null) {
        element.work_genre = createTagElements(element.work_genre);
      }
    });

    setWorkList((prev) => [...prev, ...uniqueRepos]);
    setLoading(false);
    setItemLoading(false);
  }
};

const createTagElements = (genreString) => {
  return genreString.split(",").map((item) => <CreateTagElements key={item} itemContents={item} />);
};

const generatePosts = (WorkOfList) => {
  return WorkOfList.map((work, key) => ({
    work_number: key,
    work_id: work.work_id,
    cover: `/assets/images/covers/cover_${key + 1}.jpg`,
    thumbnail: `/assets/workImages/thumbnail/cover_${key + 1}.jpg`,
    title: work.work_name,
    genre: work.work_genre,
    intro: work.work_intro.length > 200 ? work.work_intro.substring(0, 200) + "..." : work.work_intro,
    author: {
      avatarUrl: `/assets/images/avatars/avatar_${work.icon}.jpg`,
    },
    view: faker.number.int(99999),
    comment: faker.number.int(99999),
    favorite: faker.number.int(99999),
    userName: work.user_name,
    createdAt: work.created_at,
  }));
};

// const handleSortChange = (event, setState) => {
//   const newValue = event.target.value;
//   setState(newValue);
//   console.log("newValue", newValue);
//   //  http://localhost:8000/get_work_list?page=${Page}&sort="orderNewPostsDate"
//   //  http://localhost:8000/get_work_list?page=${Page}&sort="orderOldPostsDate"
// };

export default function WorkOfListView() {
  const { loginStatusCheckFunction } = LoginStatusCheck();
  // スクロールされた際にデータを取得するためのトリガー
  const { Page, setPage } = useContext(PageContext);
  // 検索されているか確認するためのcontext
  const { IsSearch } = useContext(SearchCheckContext);
  // 作品アイテム格納
  const [WorkOfList, setWorkOfList] = useState([]);
  // 検索結果格納
  const { DataList } = useContext(DataListContext);
  // スクロールされたらtrue
  const [isIntersecting, ref] = useIntersection(setting);
  // 画面全体ローディング
  const [isLoadColorLing, setIsLoadColorLing] = useState(true);
  // 作品アイテム最後尾ローディング
  const [isLoadItemColorLing, setIsLoadItemColorLing] = useState(false);
  // 並べ替え
  const [selectedOption, setSelectedOption] = useState("orderNewPostsDate");

  useEffect(() => {
    loginStatusCheckFunction();
  }, [loginStatusCheckFunction]);

  const handleSortChange = (event) => {
    const newValue = event.target.value;
    setSelectedOption(newValue);
    console.log("newValue", newValue);
    setIsLoadColorLing(true);
    setWorkOfList([]);
    setPage(1);
    // URLを更新してデータを取得するロジックを追加
    // 例: fetch(`http://localhost:8000/get_work_list?page=${Page}&sort=${newValue}`)
  };

  // useSWR = Pageが変更されたら作品データを取得し、その取得したデータはキャッシュデータに残る。
  const url = DataList.length > 0 ? null : `http://localhost:8000/get_work_list?page=${Page}&sort=${selectedOption}`;
  const { data, error } = useSWR(url, fetcher);

  // 作品アイテムの一番最後までスクロールされたらデータを取得する。
  useEffect(() => {
    if (isIntersecting) {
      setIsLoadItemColorLing(true);
      setPage((p) => p + 1);
    }
  }, [isIntersecting]);

  useEffect(() => {
    console.log("selectedOption", selectedOption);
  }, [selectedOption]);

  // 検索ボタンがクリック、検索タグが入力されている場合に一度綺麗にする。
  useEffect(() => {
    if (IsSearch.Check) {
      setWorkOfList([]);
    }
  }, [IsSearch.searchToggle]);

  // 検索されていないかつ作品データがあるとき
  useEffect(() => {
    if (!IsSearch.Check && data) {
      funcSetWorksItem(WorkOfList, setWorkOfList, data, setIsLoadColorLing, setIsLoadItemColorLing);
      if (error) {
        console.error(error);
        setIsLoadColorLing(false);
        setIsLoadItemColorLing(false);
      }
    }
  }, [data, error, IsSearch.Check]);

  useEffect(() => {
    if (IsSearch.Check && DataList.length > 0 && typeof DataList !== "string") {
      console.log("DataList", DataList);
      funcSetWorksItem(WorkOfList, setWorkOfList, DataList, setIsLoadColorLing, setIsLoadItemColorLing);
    }

    if (typeof DataList === "string" && DataList === "検索結果は0件です") {
      setWorkOfList(DataList);
    }
  }, [DataList, IsSearch.Check]);

  // 検索結果が文字列の場合、その文字列をworkItemsに設定
  const workItems =
    typeof WorkOfList === "string"
      ? WorkOfList // WorkOfListが文字列（"検索結果は0件です"）の場合
      : generatePosts(WorkOfList); // それ以外の場合は生成された投稿リスト

  useEffect(() => {
    console.log("workItems", workItems);
  }, [workItems]);

  // 作品アイテムをHTML要素に当てはめて表示する準備
  const renderWorkItems = Array.isArray(workItems) ? (
    workItems.map((post, index) => (
      <PostCard
        ref={index === WorkOfList.length - 1 ? ref : null}
        key={`${post.work_id}-${index}`}
        post={post}
        index={index}
      />
    ))
  ) : (
    <Typography>{workItems}</Typography>
  ); // 検索結果が文字列の場合、その文字列を表示

  return (
    <>
      {isLoadColorLing && (
        <ColorRing
          visible={true}
          height="100"
          width="100"
          ariaLabel="color-ring-loading"
          wrapperStyle={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
          wrapperClass="custom-color-ring-wrapper" // カスタムクラスを指定
          colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
        />
      )}
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4">作品一覧</Typography>
        </Stack>
        <Stack mb={5} direction="row" alignItems="center" justifyContent="flex-end">
          <PostSort
            options={[
              { value: "orderNewPostsDate", label: "投稿日が新しい順" },
              { value: "orderOldPostsDate", label: "投稿日が古い順" },
            ]}
            selectedOption={selectedOption}
            onSort={handleSortChange}
          />
        </Stack>

        <Grid container spacing={3}>
          {/* 作品アイテムの表示 */}
          {renderWorkItems}

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
