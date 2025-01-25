import { createContext, useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import PropTypes from "prop-types";
export const MyContext = createContext();
export const AllItemsContext = createContext();
export const WorkImageContext = createContext();
export const WebScokectContext = createContext();
export const DeleteIdContext = createContext();
export const TopPageModalContext = createContext();

import Box from "@mui/material/Box";

import Nav from "./nav";
import Main from "./main";
import Header from "./header";

import { useSessionStorage } from "src/hooks/use-sessionStorage";
// ----------------------------------------------------------------------

export default function DashboardLayout({ children }) {
  // セッションからログインしているアカウントのデータ取得
  const { getSessionData } = useSessionStorage();
  let accountData = getSessionData("accountData");

  const [openNav, setOpenNav] = useState(false);
  const [searchParams] = useSearchParams();

  const [pageStyles, setPageStyles] = useState({
    HomePage: location.pathname === "/Top" ? "none" : "",
    MyPage: "block",
    thisCompanyNews: "flex",
  });
  const [workImage, setWorkImage] = useState([]);

  if (accountData == undefined) {
    accountData = {
      id: "029",
    };
  }
  console.log("header-Mypage-searchParams", searchParams);

  const pageLocation = useLocation();

  const page = searchParams.get("page");
  useEffect(() => {
    const page = searchParams.get("page");
    const url = location.pathname;
    const basePath = url.split("/")[1];
    // const param = page.split("?page=")[1];
    // console.log("header-Mypage-page", param);
    console.log("header-Mypage-location.pathname", location.pathname);
    console.log("header-Mypage-basePath", basePath);
    console.log("header-Mypage-page", page);
    // ページパラメータが"mypage"の場合、MyPageを"none"に設定

    if ((location && location.pathname && basePath == "Profile" && page == "news") || page == "mypage") {
      setPageStyles((prev) => ({
        ...prev,
        thisCompanyNews: "none",
      }));
      console.log("thisCompanyNews: none");
    } else {
      setPageStyles((prev) => ({
        ...prev,
        thisCompanyNews: "flex",
      }));
    }
    setPageStyles((prev) => ({
      ...prev,
      HomePage: location.pathname === "/Top" ? "none" : "",
      MyPage: page === "mypage" ? "none" : "block",
    }));
  }, [location.pathname, page, pageLocation]); // location.pathname や searchParams が変わるたびに実行

  useEffect(() => {
    console.log("pageStyles", pageStyles);
  }, [pageStyles]);
  const [AllItems, setAllItems] = useState({
    // 一覧ローディング
    IsLoading: true,
    DataList: [],
    IsSearch: { searchToggle: 0, Check: false, searchResultEmpty: false },
    Page: 1,
    ResetItem: false,
    sortOption: "orderNewPostsDate",
  });

  const [WebSocketState, setWebSocketState] = useState({
    notification: {},
    Chat: "",
    Chat2: "",
    workComment: "",
    websocketFollowStatus: "",
  });

  const [DeleteId, setDeleteId] = useState();
  const [IsModalContextState, setIsModalContextState] = useState({
    modalType: "学生",
    modalOpen: false,
    preModalType: "学生",
    preModalOpen: false,
  });

  const value1 = {
    AllItems,
    setAllItems,
  };

  const value2 = {
    WebSocketState,
    setWebSocketState,
  };

  const value3 = {
    workImage,
    setWorkImage,
  };

  const value4 = {
    DeleteId,
    setDeleteId,
  };

  const value5 = {
    IsModalContextState,
    setIsModalContextState,
  };

  // WebSocket接続
  useEffect(() => {
    if (accountData !== undefined) {
      const newWs = new WebSocket(`ws://localhost:3000?userId=${accountData.id}`);
      newWs.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log("index.js : data:", data);
        if (data.kind === "notification") {
          if (data.type === "follow") {
            console.log("index.js : data:", data);
            setWebSocketState((prev) => ({
              ...prev,
              notification: data,
              websocketFollowStatus: data.followData,
            }));
          } else if (data.type === "workPosting" || data.type === "videoPosting" || data.type === "newsPosting") {
            console.log("index.js : data:", data);
            setWebSocketState((prev) => ({
              ...prev,
              notification: data,
            }));
          }
        }
        if (data.kind === "follow") {
          if (data.type === "follow") {
            console.log("index.js : data.noticeData :", data);
            setWebSocketState((prev) => ({
              ...prev,
              websocketFollowStatus: data,
            }));
          }
        }
        if (data.kind === "chat") {
          if (data.type === "post") {
            console.log("index.js : data.noticeData :", data);
            setWebSocketState((prev) => ({
              ...prev,
              Chat: data,
            }));
          } else if (data.type === "already_read" || data.type === "delete" || data.type === "update") {
            console.log("index.js : data.noticeData :", data);
            setWebSocketState((prev) => ({
              ...prev,
              Chat2: data,
            }));
          }
        }
      };
      newWs.onclose = () => {
        console.log("WebSocket connection closed");
      };

      return () => {
        newWs.close();
      };
    }
  }, [accountData.id]);

  return (
    <>
      <MyContext.Provider value={pageStyles}>
        <AllItemsContext.Provider value={value1}>
          <WorkImageContext.Provider value={value3}>
            <WebScokectContext.Provider value={value2}>
              <DeleteIdContext.Provider value={value4}>
                <TopPageModalContext.Provider value={value5}>
                  <Header onOpenNav={() => setOpenNav(true)} />
                  <Box
                    sx={{
                      minHeight: 1,
                      display: "flex",
                      flexDirection: { xs: "column", lg: "row" },
                    }}
                  >
                    <Nav openNav={openNav} onCloseNav={() => setOpenNav(false)} />
                    <Main>{children}</Main>
                  </Box>
                </TopPageModalContext.Provider>
              </DeleteIdContext.Provider>
            </WebScokectContext.Provider>
          </WorkImageContext.Provider>
        </AllItemsContext.Provider>
      </MyContext.Provider>
    </>
  );
}

DashboardLayout.propTypes = {
  children: PropTypes.node,
};
