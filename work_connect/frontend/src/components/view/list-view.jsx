import { useContext, useEffect, useState } from "react";
import { ColorRing } from "react-loader-spinner";
import { useLocation, useParams } from "react-router-dom";
import useSWR from "swr";
import PropTypes from "prop-types";
import { faker } from "@faker-js/faker";

import Stack from "@mui/material/Stack";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import LoginStatusCheck from "src/components/account/loginStatusCheck/loginStatusCheck";
import sessionAccountData from "src/components/account/loginStatusCheck/sessionAccountData";
import { AllItemsContext } from "src/layouts/dashboard";
import { useIntersection } from "src/routes/hooks/use-intersection";

import { UseCreateTagbutton } from "src/hooks/use-createTagbutton";
import { useSessionStorage } from "src/hooks/use-sessionStorage";
import { DeleteIdContext } from "src/layouts/dashboard/index";


const setting = {
  rootMargin: "40px",
};

const funcSetWorksItem = (idKey, tags, currentWorkList, setWorkList, newWorks, setLoading, setItemLoading, error, generatePosts) => {
  // ジャンル
  const { tagCreate } = UseCreateTagbutton();

  if (newWorks) {
    console.log("newWorks", newWorks);

    const existingIds = new Set(currentWorkList.map((item) => item[idKey]));

    let filteredNewWorks;
    if (newWorks.title_contents) {
      filteredNewWorks = newWorks.title_contents.filter((element) => !existingIds.has(element[idKey]));
    } else {
      filteredNewWorks = newWorks.filter((element) => !existingIds.has(element[idKey]));
    }

    console.log("idKey", idKey); // idKey の値を確認
    console.log("filteredNewWorks", filteredNewWorks); // フィルタリング後の結果

    // 全作品アイテム
    filteredNewWorks.forEach((element) => {
      // 作品のジャンル取り出す
      tags.forEach((tag) => {
        // 取り出した配列の中にあるカンマ区切りの項目をtagCreateに渡す
        if (typeof element[tag] === "string" && element[tag] !== null) {
          element[tag] = tagCreate(element[tag]);
        }
      });
    });

    setWorkList((prev) => [...prev, ...generatePosts(filteredNewWorks)]);
    setLoading(false);
    setItemLoading(false);
  }

  if (error) {
    console.error(error);
    setLoading(false);
    setItemLoading(false);
  }
};

// --------------------------------ItemObjectAndPostCard--------------------------------
export default function ItemObjectAndPostCard({ type, ParamUserName }) {
  const [SessionAccountData, setSessionAccountData] = useState(sessionAccountData);
  const [DecodeURL, setDecode] = useState(decodeURIComponent(window.location.pathname)); // decodeURIComponentを追加
  const [PostCard, setPostCard] = useState(null);
  const [PostSort, setPostSort] = useState(null);
  const { newsdetail_id, NewsId } = useParams();
  const searchParams = new URLSearchParams(window.location.search); // クエリパラメータを取得
  const page = searchParams.get("page");
  const category = searchParams.get("category");
  const [PathName, setPathName] = useState(window.location.pathname);
  const [NewsDetailId, setNewsDetailId] = useState(newsdetail_id || NewsId);

  useEffect(() => {
    setSessionAccountData(SessionAccountData);
  }, []);

  useEffect(() => {
    const currentPath = window.location.pathname;
    setDecode(decodeURIComponent(currentPath));
  }, [window.location.pathname]);

  useEffect(() => {
    if (window.location.search !== undefined && window.location.search !== "/") {
      const profileLocation = window.location.pathname + window.location.search;
      setPathName(profileLocation);
    }
  }, [window.location.pathname]);

  useEffect(() => {
    setNewsDetailId(NewsDetailId);
  }, [NewsDetailId]);

  // あいうえ

  useEffect(() => {
    const loadComponentForPath = async (path, options = {}) => {
      switch (true) {
        case path === "/" || path === `/Profile/${SessionAccountData.user_name}?page=work` || path === `/Profile/${ParamUserName}?page=work`: {
          const { default: WorkListPostCard } = await import("src/sections/WorkList/post-card");
          const { default: WorkListPostSort } = await import("src/sections/WorkList/post-sort");
          setPostCard(() => WorkListPostCard);
          setPostSort(() => WorkListPostSort);
          console.log("WorkListPostCard");
          break;
        }

        case path === "/VideoList" ||
          path === `/Profile/${SessionAccountData.user_name}?page=movie` ||
          path === `/Profile/${ParamUserName}?page=movie`: {
            const { default: VideoListPostCard } = await import("src/sections/VideoList/post-card");
            const { default: VideoListPostSort } = await import("src/sections/VideoList/post-sort");
            setPostCard(() => VideoListPostCard);
            setPostSort(() => VideoListPostSort);
            console.log("VideoListPostCard");
            break;
          }

        case path === "/StudentList": {
          const { default: StudentListPostCard } = await import("src/sections/StudentList/post-card");
          setPostCard(() => StudentListPostCard);
          console.log("StudentListPostCard");
          break;
        }

        case path === "/CompanyList": {
          const { default: CompanyListPostCard } = await import("src/sections/CompanyList/post-card");
          setPostCard(() => CompanyListPostCard);
          console.log("CompanyListPostCard");
          break;
        }

        case path === `/Internship_JobOffer` ||
          (options.DecodeURL === `/Profile/${ParamUserName}` &&
            options.page === "news" &&
            ["JobOffer", "Internship", "Blog", "Session"].includes(options.category)): {
            const { default: Internship_JobOfferPostCard } = await import("src/sections/InternshipJobOffer/post-card");
            setPostCard(() => Internship_JobOfferPostCard);
            console.log("Internship_JobOfferPostCard");
            break;
          }

        case path === `/Profile/${ParamUserName}` && options.page === "checkform": {
          const { default: CheckFormPostCard } = await import("src/sections/Profile/View/company/CheckForm/post-card");
          setPostCard(() => CheckFormPostCard);
          console.log("CheckFormPostCard");
          break;
        }

        default:
          console.log("No matching path found.");
          break;
      }

      console.log("パス名", path);
      console.log("パラムユーザーネーム", ParamUserName);
      console.log("デコードURL", options.DecodeURL);
      console.log("カテゴリ名", options.category);
      console.log("ページ名", options.page);
      console.log("PathNamePathNamePathNamePathName", PathName);
    };

    loadComponentForPath(PathName, { DecodeURL, category, page });
  }, [SessionAccountData.user_name, PathName, NewsDetailId, ParamUserName, DecodeURL, category, page]);

  const urlMapping = {
    works: {
      ItemName: "作品一覧",
      url: "http://localhost:8000/get_work_list",
      idKey: "work_id",
      tags: ["work_genre"],
      generatePosts: (WorkOfList) =>
        WorkOfList.map((work /*, key*/) => ({
          work_id: work.work_id,
          thumbnail: `http://localhost:8000/storage/images/work/${work.thumbnail}`,
          youtubeURL: work.youtube_url,
          icon: work.icon,
          title: work.work_name,
          genre: work.work_genre,
          intro: work.intro !== null && work.work_intro.length > 200 ? work.work_intro.trim().substring(0, 200) + "..." : work.work_intro,
          // view: faker.number.int(99999),
          // comment: faker.number.int(99999),
          favorite: faker.number.int(99999),
          userName: work.user_name,
          createdAt: work.created_at,
          author: {
            avatarUrl: `/assets/images/avatars/avatar_0.jpg`,
          },
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
          icon: movie.icon,
          movie: movie.youtube_url,
          title: movie.title,
          genre: movie.genre,
          intro: movie.intro !== null && movie.intro.length > 200 ? movie.intro.substring(0, 200) + "..." : movie.intro,
          // view: faker.number.int(99999),
          // comment: faker.number.int(99999),
          favorite: faker.number.int(99999),
          userName: movie.user_name,
          createdAt: movie.created_at,
          author: {
            avatarUrl: `/assets/images/avatars/avatar_0.jpg`,
          },
        })),
    },
    students: {
      ItemName: "学生一覧",
      url: `http://localhost:8000/get_student_list/${SessionAccountData.id}`,
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
          icon: student.icon,
          cover: `/assets/images/covers/cover_${key + 1}.jpg`,
          userName: student.user_name,
          studentName: student.student_surname + student.student_name,
          graduationYear: student.graduation_year,
          departmentName: student.department_name,
          facultyName: student.faculty_name,
          majorName: student.major_name,
          courseName: student.course_name,
          intro: student.intro !== null && student.intro.length > 200 ? student.intro.substring(0, 200) + "..." : student.intro,
          desiredWorkRegion: student.desired_work_region,
          desiredOccupation: student.desired_occupation,
          followStatus: student.follow_status,
          author: {
            avatarUrl: `/assets/images/avatars/avatar_0.jpg`,
          },
        })),
    },
    companies: {
      ItemName: "企業一覧",
      url: `http://localhost:8000/get_company_list/${SessionAccountData.id}`,
      idKey: "id",
      tags: ["selected_occupation", "prefecture"],
      generatePosts: (WorkOfList) =>
        WorkOfList.map((company, key) => ({
          company_id: company.id,
          icon: company.icon,
          companyName: company.company_name,
          userName: company.user_name,
          industry: company.industry,
          selectedOccupation: company.selected_occupation,
          prefecture: company.prefecture,
          intro: company.intro !== null && company.intro.length > 200 ? company.intro.substring(0, 200) + "..." : company.intro,
          cover: `/assets/images/covers/cover_${key + 1}.jpg`,
          author: {
            avatarUrl: `/assets/images/avatars/avatar_${company.icon}.jpg`,
          },
          followStatus: company.follow_status,
        })),
    },
    Joboffer: {
      ItemName: "求人一覧",
      url: `http://localhost:8000/Internship_JobOffer/${SessionAccountData.id}/JobOffer`,
      idKey: "id",
      tags: ["genre", "open_jobs"],
      generatePosts: (WorkOfList) => {
        return WorkOfList.map((company) => ({
          // id: index + 1,
          company_id: company.company_id,
          news_id: company.news_id,
          company_name: company.company_name,
          user_name: company.user_name,
          article_title: company.article_title,
          genre: company.genre,
          header_img: company.header_img,
          news_created_at: company.news_created_at,
          icon: company.icon,
          followStatus: company.follow_status,
          deadline: company.deadline,
          // deadlineStatus: company.deadline_status,
          // open_jobs: company.open_jobs,
          event_day: company.event_day,
          count: company.form_data_count,
          author: {
            avatarUrl: `/assets/images/avatars/avatar_${company.icon}.jpg`,
          },
        }));
      },
    },
    Internship: {
      ItemName: "インターンシップ一覧",
      url: `http://localhost:8000/Internship_JobOffer/${SessionAccountData.id}/Internship`,
      idKey: "id",
      tags: ["genre", "open_jobs"],
      generatePosts: (WorkOfList) => {
        console.log("WorkOfListの中身:", WorkOfList); // WorkOfListの中身を確認
        return WorkOfList.map((company, index) => ({
          id: index + 1,
          company_id: company.company_id,
          news_id: company.news_id,
          user_name: company.user_name,
          company_name: company.company_name,
          article_title: company.article_title,
          genre: company.genre,
          header_img: company.header_img,
          news_created_at: company.news_created_at,
          icon_id: company.icon,
          followStatus: company.follow_status,
          deadline: company.deadline,
          deadlineStatus: company.deadline_status,
          open_jobs: company.open_jobs,
          event_day: company.event_day,
          count: company.form_data_count,
          author: {
            avatarUrl: `/assets/images/avatars/avatar_${company.icon}.jpg`,
          },
        }));
      },
    },
    Session: {
      ItemName: "説明会一覧",
      url: `http://localhost:8000/Internship_JobOffer/${SessionAccountData.id}/Session`,
      idKey: "id",
      tags: ["genre", "open_jobs"],
      generatePosts: (WorkOfList) => {
        console.log("WorkOfListの中身:", WorkOfList); // WorkOfListの中身を確認
        return WorkOfList.map((company, index) => ({
          id: index + 1,
          company_id: company.company_id,
          news_id: company.news_id,
          user_name: company.user_name,
          company_name: company.company_name,
          article_title: company.article_title,
          genre: company.genre,
          header_img: company.header_img,
          news_created_at: company.news_created_at,
          icon_id: company.icon,
          followStatus: company.follow_status,
          deadline: company.deadline,
          deadlineStatus: company.deadline_status,
          open_jobs: company.open_jobs,
          event_day: company.event_day,
          count: company.form_data_count,
          author: {
            avatarUrl: `/assets/images/avatars/avatar_${company.icon}.jpg`,
          },
        }));
      },
    },
    Blog: {
      ItemName: "ブログ一覧",
      url: `http://localhost:8000/Internship_JobOffer/${SessionAccountData.id}/Blog`,
      idKey: "id",
      tags: ["genre"],
      generatePosts: (WorkOfList) => {
        return WorkOfList.map((company) => ({
          company_id: company.company_id,
          news_id: company.news_id,
          user_name: company.user_name,
          company_name: company.company_name,
          article_title: company.article_title,
          genre: company.genre,
          header_img: company.header_img,
          news_created_at: company.news_created_at,
          icon_id: company.icon,
          followStatus: company.follow_status,
          event_day: company.event_day,
          count: company.form_data_count,
          author: {
            avatarUrl: `/assets/images/avatars/avatar_${company.icon}.jpg`,
          },
        }));
      },
    },

    specialjoboffers: {
      ItemName: `${ParamUserName}の求人一覧`,
      url: `http://localhost:8000/Internship_JobOffer/special_company_news/${ParamUserName}/${SessionAccountData.id}/JobOffer`,
      idKey: "id",
      tags: ["genre"],
      generatePosts: (WorkOfList) => {
        return WorkOfList.map((company) => ({
          company_id: company.company_id,
          news_id: company.news_id,
          user_name: company.user_name,
          company_name: company.company_name,
          article_title: company.article_title,
          genre: company.genre,
          header_img: company.header_img,
          news_created_at: company.news_created_at,
          icon_id: company.icon,
          followStatus: company.follow_status,
          event_day: company.event_day,
          count: company.form_data_count,
          author: {
            avatarUrl: `/assets/images/avatars/avatar_${company.icon}.jpg`,
          },
        }));
      },
    },
    specialinternships: {
      ItemName: `${ParamUserName}のインターンシップ一覧`,
      url: `http://localhost:8000/Internship_JobOffer/special_company_news/${ParamUserName}/${SessionAccountData.id}/Internship`,
      idKey: "id",
      tags: ["genre", "Occupation"],
      generatePosts: (WorkOfList) => {
        return WorkOfList.map((company) => ({
          company_id: company.company_id,
          news_id: company.news_id,
          user_name: company.user_name,
          company_name: company.company_name,
          article_title: company.article_title,
          genre: company.genre,
          header_img: company.header_img,
          news_created_at: company.news_created_at,
          icon_id: company.icon,
          followStatus: company.follow_status,
          event_day: company.event_day,
          count: company.form_data_count,
          author: {
            avatarUrl: `/assets/images/avatars/avatar_${company.icon}.jpg`,
          },
        }));
      },
    },
    specialsessions: {
      ItemName: `${ParamUserName}の説明会一覧`,
      url: `http://localhost:8000/Internship_JobOffer/special_company_news/${ParamUserName}/${SessionAccountData.id}/Session`,
      idKey: "id",
      tags: ["genre", "Occupation"],
      generatePosts: (WorkOfList) => {
        return WorkOfList.map((company) => ({
          company_id: company.company_id,
          news_id: company.news_id,
          user_name: company.user_name,
          company_name: company.company_name,
          article_title: company.article_title,
          genre: company.genre,
          header_img: company.header_img,
          news_created_at: company.news_created_at,
          icon_id: company.icon,
          followStatus: company.follow_status,
          event_day: company.event_day,
          count: company.form_data_count,
          author: {
            avatarUrl: `/assets/images/avatars/avatar_${company.icon}.jpg`,
          },
        }));
      },
    },
    specialblogs: {
      ItemName: `${ParamUserName}のブログ一覧`,
      url: `http://localhost:8000/Internship_JobOffer/special_company_news/${ParamUserName}/${SessionAccountData.id}/Blog`,
      idKey: "id",
      tags: ["genre"],
      generatePosts: (WorkOfList) => {
        return WorkOfList.map((company) => ({
          company_id: company.company_id,
          news_id: company.news_id,
          user_name: company.user_name,
          company_name: company.company_name,
          article_title: company.article_title,
          genre: company.genre,
          header_img: company.header_img,
          news_created_at: company.news_created_at,
          icon_id: company.icon,
          followStatus: company.follow_status,
          event_day: company.event_day,
          count: company.form_data_count,
          author: {
            avatarUrl: `/assets/images/avatars/avatar_${company.icon}.jpg`,
          },
        }));
      },
    },
    specialforms: {
      ItemName: `応募フォーム一覧`,
      url: `http://localhost:8000/special_forms/${SessionAccountData.id}`,
      idKey: "id",
      tags: ["genre"],
      generatePosts: (WorkOfList) => {
        if (Array.isArray(WorkOfList)) {
          console.log("応募フォーム一覧のWorkOfList",WorkOfList);
          const application_form = WorkOfList.map((company) => ({
            article_title: company.article_title,
            user_name: company.users,
          }));
          return [{ application_form }];
        }
      },
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
      NewsDetailId={NewsDetailId}
      DecodeURL={DecodeURL}
      page={page}
      category={category}
    />
  );
}

ItemObjectAndPostCard.propTypes = {
  SessionAccountData: PropTypes.string,
  type: PropTypes.string,
  ParamUserName: PropTypes.string,
  NewsDetailId: PropTypes.string,
  DecodeURL: PropTypes.string,
  page: PropTypes.string,
  category: PropTypes.string,
};

// ------------------------------------------------ListView------------------------------------------------
const ListView = ({ SessionAccountData, PathName, urlMapping, PostCard, PostSort, ParamUserName, DecodeURL, page, category }) => {
  // ログインチェック
  const { loginStatusCheckFunction } = LoginStatusCheck();
  // 作品アイテム格納
  const [WorkOfList, setWorkOfList] = useState([]);
  // 一覧アイテム最後尾ローディング
  const [isLoadItemColorLing, setIsLoadItemColorLing] = useState(false);
  // AllItemsContextから状態を取得
  const { AllItems, setAllItems } = useContext(AllItemsContext);
  const { IsLoading, DataList, IsSearch, Page, sortOption, ResetItem } = AllItems;
  const [isLoadItem, setIsLoadItem] = useState(false);
  // スクロールされたらtrueを返す。
  const [isIntersecting, ref] = useIntersection(setting);

  const { ItemName, url, idKey, tags, generatePosts } = urlMapping || {};
  // 初回ロード完了のフラグ
  const [hasLoadedOnce, setHasLoadedOnce] = useState(false);

  const location = useLocation();
  const { user_name } = useParams();
  const searchParams = new URLSearchParams(window.location.search); // クエリパラメータを取得
  const pageParam = searchParams.get("page");

  const { getSessionData } = useSessionStorage();
  const accountData = getSessionData("accountData");
  const { DeleteId } = useContext(DeleteIdContext);

  useEffect(() => {
    loginStatusCheckFunction();
  }, []);

  useEffect(() => {
    if (IsLoading) {
      setIsLoadItem(true);
    } else {
      setHasLoadedOnce(true);
      setIsLoadItem(false);
    }
  }, [IsLoading]);

  // 並べ替え
  const handleSortChange = (event) => {
    // 並べ替え内容「例：投稿日が新しい順」を取得
    const newValue = event.target.value;
    // URLパラメータにセットしてLaravel側でデータを1取得するための準備
    setAllItems((prevItems) => ({
      ...prevItems,
      IsLoading: true,
      Page: 1,
      sortOption: newValue,
    }));
    // 無駄なアイテム追加を防ぐために一度綺麗にする
    setWorkOfList([]);
  };

  //   一覧データ取得URL
  let lastUrl = "";
  console.log(url);
  console.log(DecodeURL);
  // URLとPathNameが有効かつ、現在のPathNameがProfileページでない場合
  if (
    url &&
    (PathName === "/" ||
      PathName === "/VideoList" ||
      PathName === "/StudentList" ||
      PathName === "/CompanyList" ||
      PathName === "/Internship_JobOffer" ||
      PathName === "/Internship_JobOffer?page=JobOffer" ||
      PathName === "/Internship_JobOffer?page=Internship" ||
      PathName === "/Internship_JobOffer?page=Session" ||
      PathName === "/Internship_JobOffer?page=Blog" ||
      (DecodeURL === `/Profile/${ParamUserName}` &&
        page === "news" &&
        (category === "JobOffer" || category === "Internship" || category === "Blog" || category === "Session")) ||
      (PathName === `/Profile/${ParamUserName}` && page === "checkform"))
  ) {
    // console.log(" URLとPathNameが有効かつ、現在のPathNameがProfileページでない場合");
    lastUrl = `${url}?page=${Page}&sort=${sortOption}`;
    console.log("lastUrl", lastUrl);
  } else if (ParamUserName === SessionAccountData.user_name) {
    // console.log("ユーザーネームもセッションネームも同じ場合");
    lastUrl = `${url}?page=${Page}&sort=${sortOption}&userName=${SessionAccountData.user_name}`;
  } else if (ParamUserName && ParamUserName !== SessionAccountData.user_name) {
    // console.log("ユーザーネームとセッションネームが違う場合");
    lastUrl = `${url}?page=${Page}&sort=${sortOption}&userName=${ParamUserName}`;
  } else {
    console.log("lastUrllastUrl", url);
    console.log("lastUrllastUrl:PathName", PathName);
  }





  const fetcher = (lastUrl) =>
    fetch(lastUrl).then((res) => {
      return res.json().then((data) => {
        console.log("fetcher:res:data:  ", data);
        if (data.length == 0) {
          setAllItems((prevItems) => ({
            ...prevItems,
            IsLoading: false,
            DataList: [],
          }));
        }
        return data;
      });
    });

  const { data, error, isLoading } = useSWR(lastUrl, fetcher);

  let LaravelResponse = isLoading;

  useEffect(() => {
    if (DeleteId !== null) {
      if (pageParam == "work") {
        setWorkOfList((prevList) =>
          prevList.filter((item) => item.work_id !== DeleteId)
        );
      } else if (pageParam == "movie") {
        setWorkOfList((prevList) =>
          prevList.filter((item) => item.movie_id !== DeleteId)
        );
      }
    }
  }, [DeleteId]);

  // 検索時にsetWorkOfListをリセット
  useEffect(() => {
    // タグを選択した状態
    if (IsSearch.Check) {
      setWorkOfList([]);
    }
  }, [IsSearch.searchToggle, IsSearch.Check]);

  useEffect(() => {
    // タグを選択していない状態
    if (!IsSearch.Check && DataList.length == 0) {
      console.log("タグを選択していない状態");
      setWorkOfList([]); // 検索結果をクリア
      setAllItems((prevItems) => ({
        ...prevItems,
        Page: 1, // ページを初期化
      }));
    }
  }, [IsSearch.Check, DataList.length]);

  useEffect(() => {
    console.log("WorkOfListResetItem", WorkOfList);
    if (ResetItem === true) {
      // ここでアイテム消える
      setWorkOfList([]);
      setAllItems((prevItems) => ({
        ...prevItems,
        ResetItem: false, // リセットが完了したら false に戻す
      }));
    }
  }, [ResetItem, setWorkOfList, setAllItems]);

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

  // ブラウザバックなどでPageが更新されたままにならないようにする。
  useEffect(() => {
    setAllItems((prevItems) => ({
      ...prevItems,
      Page: 1,
    }));
    setIsLoadItem(true);
  }, [PathName]);

  /*----- 検索されていないかつ作品データがあるとき -----*/
  useEffect(() => {
    if (!ResetItem && !IsSearch.Check && data) {

      funcSetWorksItem(idKey, tags, WorkOfList, setWorkOfList, data, setIsLoadItem, setIsLoadItemColorLing, error, generatePosts);

      console.log("data:", data);
      if (data.length !== 0) {
        setIsLoadItem(false);
        console.log("data:setIsLoadItem:false");
      }
      setAllItems((prev) => ({
        ...prev,
        IsLoading: false, 
      }));
      // }
    }
  }, [data, error, ResetItem, IsSearch.Check, IsSearch.searchResultEmpty]);

  // 検索された場合
  useEffect(() => {
    if (IsSearch.Check && DataList) {
      console.log("検索されたかつ、検索結果が帰ってきたとき", WorkOfList);
      console.log("datadataDataList", DataList);
      console.log("datadataDataList:AllItems", AllItems);

      funcSetWorksItem(idKey, tags, WorkOfList, setWorkOfList, DataList, setIsLoadItem, setIsLoadItemColorLing, error, generatePosts);

      // データ取得後にisLoadingをfalseにする
      if (DataList.length !== 0) {
        setIsLoadItem(false);
        console.log("DataList:setIsLoadItem:false");
      }
      if (DataList.length !== 0 || Page !== 1) {
        console.log("ローディング削除:3");
        setAllItems((prev) => ({
          ...prev,
          IsLoading: false, // データが空のときはtrueにしてローディングを維持
        }));
      }
    }
  }, [DataList, IsSearch.Check, IsSearch.searchResultEmpty]);

  useEffect(() => {
    if (LaravelResponse == false && Page != 1) {
      console.log("ローディング削除:1");
      setAllItems((prevItems) => ({
        ...prevItems,
        IsLoading: false, // 一時的にローディングを解除
      }));
    }
  }, [LaravelResponse, lastUrl]);

  const renderWorkItems =
    WorkOfList.length !== 0 && PostCard
      ? WorkOfList.map((post, index) => (
        <PostCard className="mediaCard" ref={index === WorkOfList.length - 1 ? ref : null} key={`${post}-${index}`} post={post} index={index} />
      ))
      : WorkOfList.length === 0 && !IsLoading && !LaravelResponse && hasLoadedOnce
        ? "0件です"
        : "";

  return (
    <>
      {isLoadItem && (
        <ColorRing
          visible={true}
          height="100"
          width="100"
          ariaLabel="color-ring-loading"
          wrapperStyle={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
          wrapperClass="custom-color-ring-wrapper" // カスタムクラスを指定
          colors={["#41a4ff", "#FFFFFF", "#41a4ff", "#41a4ff", "#FFFFFF"]}
          style={{ flexDirection: "column" }}
        />
      )}

      <div className="list-view-Container">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          {location.pathname == `/Profile/${accountData.user_name}` && accountData.id[0] == "S" ? (
            <>
              <Typography variant="h4">{user_name + "の" + ItemName}</Typography>
            </>
          ) : location.pathname == `/Profile/${user_name}` && accountData.id[0] == "S" ? (
            <>
              <Typography variant="h4">{user_name + "の" + ItemName}</Typography>
            </>
          ) : location.pathname == `/Profile/${user_name}` && pageParam !== "news" && accountData.id[0] == "C" ? (
            <>
              <Typography variant="h4">{user_name + "の" + ItemName}</Typography>
            </>
          ) : (
            <>
              <Typography variant="h4">{ItemName}</Typography>
            </>
          )}
        </Stack>
        <Stack mb={5} direction="row" alignItems="center" justifyContent="flex-end">

          {PostSort && PathName !== "CompanyList" && PathName !== "StudentList" && IsSearch.searchResultEmpty !== true && (
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

        <Grid className="column-container" spacing={1}>
          {renderWorkItems}
          {isLoadItemColorLing && (
            <ColorRing
              visible={true}
              height="50"
              width="50"
              ariaLabel="color-ring-loading"
              wrapperStyle={{}}
              wrapperClass="color-ring-wrapper"
              colors={["#41a4ff", "#FFFFFF", "#41a4ff", "#41a4ff", "#FFFFFF"]}
            />
          )}
        </Grid>
      </div>
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
  NewsDetailId: PropTypes.string,
  DecodeURL: PropTypes.string,
  page: PropTypes.string,
  category: PropTypes.string,
};
