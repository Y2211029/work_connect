import { useContext, useEffect, useState } from "react";
import { ColorRing } from "react-loader-spinner";
import useSWR from "swr";
import { faker } from "@faker-js/faker";

import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";

import LoginStatusCheck from "src/components/account/loginStatusCheck/loginStatusCheck";
import { useIntersection } from "src/routes/hooks/use-intersection";
import CreateTagElements from "src/components/tag/CreateTagElements";
import { AllItemsContext } from "src/layouts/dashboard";
import PostCard from "src/sections/StudentList/post-card";
// import PostSort from "src/sections/StudentList/post-sort";

const fetcher = (url) => fetch(url).then((res) => res.json());

const setting = {
  rootMargin: "40px",
};

//
const funcSetWorksItem = (currentWorkList, setWorkList, newWorks, setLoading, setItemLoading, error) => {
  // Laravelでw_worksテーブルから取得し、データがあればtrue
  if (newWorks) {
    // w_works.work_id IDを取り出す。
    const uniqueRepoIds = new Set(currentWorkList.map((work) => work.work_id));

    // ※ 【filter】 条件に合うものを探して取り出す。 【has】 特定の値が存在する場合は trueを返す
    // newWorks = data または DataListが代入されている。
    // data または DataListの中にwork.work_idが被っているものは排除して新しいデータだけを代入
    const uniqueRepos = newWorks.filter((item) => !uniqueRepoIds.has(item.work_id));

    uniqueRepos.forEach((element) => {
      if (typeof element.genre === "string" && element.genre !== null) {
        element.genre = createTagElements(element.genre);
      }
    });

    setWorkList((prev) => [...prev, ...uniqueRepos]);
    setLoading(false);
    setItemLoading(false);
  }

  if (error) {
    console.error(error);
    setLoading(false);
    setItemLoading(false);
  }
};

const createTagElements = (genreString) => {
  return genreString.split(",").map((item) => <CreateTagElements key={item} itemContents={item} />);
};

const generatePosts = (WorkOfList) => {
  return WorkOfList.map((student, key) => ({
    student_id: student.id,
    cover: `/assets/images/covers/cover_${key + 1}.jpg`,
    userName: student.user_name,
    schoolName: student.school_name,
    desiredWorkRegion: student.desired_work_region,
    desiredOccupation: student.desired_occupation,
    view: faker.number.int(99999),
    comment: faker.number.int(99999),
    favorite: faker.number.int(99999),
    createdAt: student.created_at,
    author: {
      avatarUrl: `/assets/images/avatars/avatar_${student.icon}.jpg`,
    },
  }));
};

export default function WorkOfListView() {
  // ログインチェック
  const { loginStatusCheckFunction } = LoginStatusCheck();
  // 作品アイテム格納
  const [WorkOfList, setWorkOfList] = useState([]);
  // 画面全体ローディング
  const [isLoadColorLing, setIsLoadColorLing] = useState(true);
  // 作品アイテム最後尾ローディング
  const [isLoadItemColorLing, setIsLoadItemColorLing] = useState(false);
  // AllItemsContextから状態を取得
  const { AllItems, setAllItems } = useContext(AllItemsContext);
  const { DataList, IsSearch, Page, ResetItem /*sortOption*/ } = AllItems;
  // スクロールされたらtrueを返す。
  const [isIntersecting, ref] = useIntersection(setting);

  useEffect(() => {
    loginStatusCheckFunction();
  }, [loginStatusCheckFunction]);


  // useSWR = Pageが変更されたら作品データを取得し、その取得したデータはキャッシュデータに残る。
  const url = DataList.length > 0 ? null : `http://localhost:8000/get_student_list?page=${Page}`;
  const { data, error } = useSWR(url, fetcher);

  // 作品アイテムの一番最後までスクロールされたらデータを取得する。
  useEffect(() => {
    if (isIntersecting) {
      setIsLoadItemColorLing(true);
      setAllItems((prevItems) => ({
        ...prevItems,
        Page: prevItems.Page + 1,
      }));
    }
  }, [isIntersecting]);

  useEffect(() => {
    // 検索が行われたときの初期処理
    if (IsSearch.Check) {
      setWorkOfList([]);
    }
  }, [IsSearch.searchToggle]);

  useEffect(() => {
    /* ----- サイドバー「💡作品一覧」が押されたときに正常に再表示するための処理 ここから -----*/
    // リセット
    if (ResetItem) {
      setAllItems((prevItems) => ({
        ...prevItems, //既存のパラメータ値を変更するためにスプレッド演算子を使用
        DataList: [], //検索してない状態にするために初期化 //searchbar.jsxのsearchSourceも初期化
        IsSearch: { searchToggle: 0, Check: false, searchResultEmpty: false },
        Page: 1, //スクロールする前の状態にするために初期化
        // sortOption: "orderNewPostsDate", //並び替える前の状態にするために初期化
      }));

      setWorkOfList([]); //検索結果やスクロールした際に追加された作品データを一度初期化
      setIsLoadColorLing(true); //ローディングアニメーションを表示
    }
    /*----- サイドバー「💡作品一覧」が押されたときに正常に再表示するための処理 ここまで -----*/

    /*----- 検索されていないかつ作品データがあるとき ここから-----*/
    if (!IsSearch.Check && data) {
      setAllItems((prevItems) => ({
        ...prevItems, //既存のパラメータ値を変更するためにスプレッド演算子を使用
        ResetItem: false, //リセットされ作品一覧データを際代入するこのタイミングでリセットされないように変更
      }));
      funcSetWorksItem(WorkOfList, setWorkOfList, data, setIsLoadColorLing, setIsLoadItemColorLing, error);
    }
    /*----- 検索されていないかつ作品データがあるとき ここまで -----*/

    /*----- 検索されたかつ、検索結果が帰ってきたとき -----*/
    // 検索されたか確認
    if (IsSearch.Check) {
      if (DataList.length !== 0) {
        console.log("あああ");
        funcSetWorksItem(WorkOfList, setWorkOfList, DataList, setIsLoadColorLing, setIsLoadItemColorLing, error);
      }
    }
    /*----- 検索されたかつ、検索結果が帰ってきたとき ここまで -----*/
  }, [data, error, DataList, IsSearch.Check, IsSearch.searchResultEmpty, ResetItem]);

  const workItems = IsSearch.searchResultEmpty
    ? "検索結果は0件です" // フラグに基づいて表示
    : generatePosts(WorkOfList);

  // 作品アイテムをHTML要素に当てはめて表示する準備
  const renderWorkItems = Array.isArray(workItems) ? (
    workItems.map((post, index) => (
      <PostCard
        ref={index === WorkOfList.length - 1 ? ref : null}
        key={`${post.id}-${index}`}
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
          <Typography variant="h4">学生一覧</Typography>
        </Stack>

        <Grid container spacing={3}>
          {/* 学生アイテムの表示 */}
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

// import Stack from "@mui/material/Stack";
// import Container from "@mui/material/Container";
// import Grid from "@mui/material/Unstable_Grid2";
// import Typography from "@mui/material/Typography";

// import StudentListItem from "src/_mock/studentListItem";

// import PostCard from "src/sections/StudentList/post-card";
// // import PostSort from "src/sections/StudentList/post-sort";

// // import Button from '@mui/material/Button';
// // import Iconify from 'src/components/iconify';
// // import PostSearch from 'src/sections/VideoList/post-search';

// // ----------------------------------------------------------------------

// export default function StudentListView() {
//   const postsFromBlog = StudentListItem();
//   console.log("postsFromBlog", postsFromBlog);
//   return (
//     <Container>
//       <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
//         <Typography variant="h4">学生一覧</Typography>
//       </Stack>

//       <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">

//         {/* <PostSort
//           options={[
//             { value: "latest", label: "Latest" },
//             { value: "popular", label: "Popular" },
//             { value: "oldest", label: "Oldest" },
//           ]}
//         /> */}
//       </Stack>

//       <Grid container spacing={3}>
//         {postsFromBlog.map((post, index) => (
//           <PostCard key={post.id} post={post} index={index} />
//         ))}
//       </Grid>
//     </Container>
//   );
// }
