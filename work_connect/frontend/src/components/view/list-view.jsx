import { useContext, useEffect, useState } from "react";
import { ColorRing } from "react-loader-spinner";
import useSWR from "swr";
import PropTypes from "prop-types";
import { faker } from "@faker-js/faker";

import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";

import LoginStatusCheck from "src/components/account/loginStatusCheck/loginStatusCheck";
import sessionAccountData from "src/components/account/loginStatusCheck/sessionAccountData";
import CreateTagElements from "src/components/tag/CreateTagElements";
import { AllItemsContext } from "src/layouts/dashboard";
import { useIntersection } from "src/routes/hooks/use-intersection";

const fetcher = (lastUrl) => fetch(lastUrl).then((res) => res.json());
const setting = {
  rootMargin: "40px",
};

const funcSetWorksItem = (idKey, tags, currentWorkList, setWorkList, newWorks, setLoading, setItemLoading, error) => {
  if (newWorks) {
    // w_works.work_id IDを取り出す。
    const uniqueRepoIds = new Set(currentWorkList.map((work) => work[idKey]));

    // ※ 【filter】 条件に合うものを探して取り出す。 【has】 特定の値が存在する場合は trueを返す
    // newWorks = data または DataListが代入されている。
    // data または DataListの中にwork.work_idが被っているものは排除して新しいデータだけを代入
    const uniqueRepos = newWorks.filter((item) => !uniqueRepoIds.has(item[idKey]));

    uniqueRepos.forEach((element) => {
      tags.forEach((tag) => {
        if (typeof element[tag] === "string" && element[tag] !== null) {
          element[tag] = createTagElements(element[tag]);
        }
      });
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

// --------------------------------ItemObjectAndPostCard--------------------------------
export default function ItemObjectAndPostCard({ type, ParamUserName }) {
  // sessiondata取得
  const [SessionAccountData, setSessionAccountData] = useState(sessionAccountData);
  const [PathName, setPathName] = useState(window.location.pathname);
  const [PostCard, setPostCard] = useState(null);
  const [PostSort, setPostSort] = useState(null);

  useEffect(() => {
    setSessionAccountData(SessionAccountData);
  }, [SessionAccountData]);

  useEffect(() => {
    setPathName(PathName);
    console.log("PathName", PathName);
  }, [PathName]);

  useEffect(() => {
    // URLごとにpost-sort、post-card.jsxを各フォルダから取得
    const loadComponents = async () => {
      if (
        PathName === "/" ||
        PathName === `/Profile/${SessionAccountData.user_name}` ||
        PathName === `/Profile/${ParamUserName}`
      ) {
        const { default: WorkListPostCard } = await import("src/sections/WorkList/post-card");
        const { default: WorkListPostSort } = await import("src/sections/WorkList/post-sort");
        setPostCard(() => WorkListPostCard);
        setPostSort(() => WorkListPostSort);
        console.log("WorkListPostCard");
      } else if (
        PathName === "/VideoList" ||
        PathName === `/Profile/${SessionAccountData.user_name}` ||
        PathName === `/Profile/${ParamUserName}`
      ) {
        const { default: VideoListPostCard } = await import("src/sections/VideoList/post-card");
        const { default: VideoListPostSort } = await import("src/sections/VideoList/post-sort");
        setPostCard(() => VideoListPostCard);
        setPostSort(() => VideoListPostSort);
        console.log("VideoListPostCard");
      } else if (PathName === "/StudentList") {
        const { default: StundetListPostCard } = await import("src/sections/StudentList/post-card");
        setPostCard(() => StundetListPostCard);
        console.log("StundetListPostCard");
      } else if (PathName === "/CompanyList") {
        const { default: CompanyListPostCard } = await import("src/sections/CompanyList/post-card");
        setPostCard(() => CompanyListPostCard);
        console.log("CompanyListPostCard");
      }
    };

    loadComponents();
  }, [SessionAccountData.user_name, PathName]);

  const urlMapping = {
    works: {
      ItemName: "作品一覧",
      url: "http://localhost:8000/get_work_list",
      idKey: "work_id",
      tags: ["work_genre"],
      generatePosts: (WorkOfList) =>
        WorkOfList.map((work, key) => ({
          work_id: work.work_id,
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
        })),
    },
    movies: {
      ItemName: "動画一覧",
      url: "http://localhost:8000/get_movie_list",
      idKey: "movie_id",
      tags: ["genre"],
      generatePosts: (WorkOfList) =>
        WorkOfList.map((movie) => ({
          movie_id: movie.movie_id,
          title: movie.title,
          genre: movie.genre,
          intro: movie.intro.length > 200 ? movie.intro.substring(0, 200) + "..." : movie.intro,
          author: {
            avatarUrl: `/assets/images/avatars/avatar_${movie.icon}.jpg`,
          },
          view: faker.number.int(99999),
          comment: faker.number.int(99999),
          favorite: faker.number.int(99999),
          userName: movie.user_name,
          createdAt: movie.created_at,
        })),
    },
    students: {
      ItemName: "学生一覧",
      url: "http://localhost:8000/get_student_list/S_000000000001",
      idKey: "id",
      tags: [
        "desired_occupation",
        "desired_work_region",
        "programming_language",
        "development_environment",
        "software",
        "acquisition_qualification",
        "hobby",
      ],
      generatePosts: (WorkOfList) =>
        WorkOfList.map((student, key) => ({
          student_id: student.id,
          cover: `/assets/images/covers/cover_${key + 1}.jpg`,
          userName: student.user_name,
          graduationYear: student.graduation_year,
          schoolName: student.school_name,
          desiredWorkRegion: student.desired_work_region,
          desiredOccupation: student.desired_occupation,
          followStatus: student.follow_status,
          view: faker.number.int(99999),
          comment: faker.number.int(99999),
          favorite: faker.number.int(99999),
          createdAt: student.created_at,
          author: {
            avatarUrl: `/assets/images/avatars/avatar_${student.icon}.jpg`,
          },
        })),
    },
    companies: {
      ItemName: "企業一覧",
      url: "http://localhost:8000/get_company_list/S_000000000001",
      idKey: "id",
      tags: ["selected_occupation", "prefecture"],
      generatePosts: (WorkOfList) =>
        WorkOfList.map((company, key) => ({
          company_id: company.id,
          userName: company.company_name,
          selectedOccupation: company.selected_occupation,
          prefecture: company.prefecture,
          cover: `/assets/images/covers/cover_${key + 1}.jpg`,
          createdAt: company.created_at,
          view: faker.number.int(99999),
          comment: faker.number.int(99999),
          favorite: faker.number.int(99999),
          author: {
            avatarUrl: `/assets/images/avatars/avatar_${company.icon}.jpg`,
          },
        })),
    },
  };
  return (
    <ListView
      SessionAccountData={SessionAccountData}
      PathName={PathName}
      urlMapping={urlMapping[type]}
      PostCard={PostCard}
      PostSort={PostSort}
      ParamUserName={ParamUserName}
    />
  );
}

ItemObjectAndPostCard.propTypes = {
  type: PropTypes.string,
  ParamUserName: PropTypes.string,
};

// ------------------------------------------------ListView------------------------------------------------
const ListView = ({ SessionAccountData, PathName, urlMapping, PostCard, PostSort, ParamUserName }) => {
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
  const { DataList, IsSearch, Page, sortOption } = AllItems;
  // スクロールされたらtrueを返す。
  const [isIntersecting, ref] = useIntersection(setting);
  // 現在のURL取得

  useEffect(() => {
    loginStatusCheckFunction();
  }, [loginStatusCheckFunction]);

  const { ItemName, url, idKey, tags, generatePosts } = urlMapping || {};

  // 並べ替え
  const handleSortChange = (event) => {
    // 並べ替え内容「例：投稿日が新しい順」を取得
    const newValue = event.target.value;
    // URLパラメータにセットしてLaravel側でデータを1取得するための準備
    setAllItems((prevItems) => ({
      ...prevItems,
      Page: 1,
      sortOption: newValue,
    }));
    // ローディング表示
    setIsLoadColorLing(true);
    // 無駄なアイテム追加を防ぐために一度綺麗にする
    setWorkOfList([]);
  };

  //   一覧データ取得URL
  let lastUrl = "";

  // URLとPathNameが有効かつ、現在のPathNameがProfileページでない場合
  if (
    url &&
    (PathName === "/" || PathName === "/VideoList" || PathName === "/StudentList" || PathName === "/CompanyList")
  ) {
    console.log(" URLとPathNameが有効かつ、現在のPathNameがProfileページでない場合");
    lastUrl = `${url}?page=${Page}&sort=${sortOption}`;
  } else if (ParamUserName === SessionAccountData.user_name) {
    console.log("ユーザーネームもセッションネームも同じ場合");
    lastUrl = `${url}?page=${Page}&sort=${sortOption}&userName=${SessionAccountData.user_name}`;
  } else if (ParamUserName && ParamUserName !== SessionAccountData.user_name) {
    console.log("ユーザーネームとセッションネームが違う場合");
    lastUrl = `${url}?page=${Page}&sort=${sortOption}&userName=${ParamUserName}`;
  }

  const { data, error } = useSWR(lastUrl, fetcher);

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
    /*----- 検索されていないかつ作品データがあるとき -----*/
    if (!IsSearch.Check && data) {
      setAllItems((prevItems) => ({
        ...prevItems, //既存のパラメータ値を変更するためにスプレッド演算子を使用
        ResetItem: false, //リセットされ作品一覧データを際代入するこのタイミングでリセットされないように変更
      }));
      funcSetWorksItem(idKey, tags, WorkOfList, setWorkOfList, data, setIsLoadColorLing, setIsLoadItemColorLing, error);
    }

    /*----- 検索されたかつ、検索結果が帰ってきたとき -----*/
    if (IsSearch.Check) {
      if (DataList.length !== 0) {
        console.log("あああ");
        funcSetWorksItem(
          idKey,
          tags,
          WorkOfList,
          setWorkOfList,
          DataList,
          setIsLoadColorLing,
          setIsLoadItemColorLing,
          error
        );
      } else {
        setIsLoadItemColorLing(false);
      }
    }
  }, [data, error, DataList, IsSearch.Check, IsSearch.searchResultEmpty]);

  const workItems = IsSearch.searchResultEmpty
    ? "検索結果は0件です" // フラグに基づいて表示
    : typeof generatePosts === "function"
      ? generatePosts(WorkOfList)
      : null;

  // 作品アイテムをHTML要素に当てはめて表示する準備
  const renderWorkItems =
    typeof workItems === "object" && Array.isArray(workItems) && PostCard ? (
      workItems.map((post, index) => (
        <PostCard
          ref={index === WorkOfList.length - 1 ? ref : null}
          key={`${post}-${index}`}
          post={post}
          index={index}
        />
      ))
    ) : typeof workItems === "string" ? (
      <>
        <Typography variant="h4">{workItems}</Typography>
      </>
    ) : null; // 検索結果が文字列の場合、その文字列を表示

  useEffect(() => {
    console.log("ParamUserName", ParamUserName);
    console.log("urlMapping", urlMapping);
    console.log("workItems", workItems);
    console.log("renderWorkItems", renderWorkItems);
  }, [ParamUserName, urlMapping, workItems, renderWorkItems]);

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
          {typeof ItemName === "string" ? (
            <>
              <Typography variant="h4">{ItemName}</Typography>
            </>
          ) : null}
        </Stack>
        <Stack mb={5} direction="row" alignItems="center" justifyContent="flex-end">
          {/*
          IsSearch.searchResultEmpty = false 作品データあり
          IsSearch.searchResultEmpty = true 作品データなし
          
          IsSearch.searchResultEmpty !== true
          「検索結果が0件でない場合に表示」
            
          // 学生・企業一覧の場合は並び替え必要ないので非表示にする。
          */}

          {PostSort &&
            PathName !== "CompanyList" &&
            PathName !== "StudentList" &&
            IsSearch.searchResultEmpty !== true && (
              <PostSort
                options={[
                  { value: "orderNewPostsDate", label: "投稿日が新しい順" },
                  { value: "orderOldPostsDate", label: "投稿日が古い順" },
                ]}
                sortOption={sortOption}
                onSort={handleSortChange}
              />
            )}
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
};

ListView.propTypes = {
  SessionAccountData: PropTypes.object,
  PathName: PropTypes.string,
  urlMapping: PropTypes.object,
  generatePosts: PropTypes.func,
  PostCard: PropTypes.elementType,
  PostSort: PropTypes.elementType,
  ParamUserName: PropTypes.string,
};
