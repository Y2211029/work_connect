import { createContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import PropTypes from "prop-types";
export const MyContext = createContext();
export const AllItemsContext = createContext();
<<<<<<< HEAD
export const WorkImageContext = createContext();
// export const DataListContext = createContext();
// export const SearchCheckContext = createContext();
// export const SortOption = createContext();
=======
export const WebScokectContext = createContext();
>>>>>>> 22c4975d546402fda792f6cf3c2215860da22a92

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
  });
  const [workImage, setWorkImage] = useState([]);

  if (accountData == undefined) {
    accountData = {
      id: "029",
    }
  }

  useEffect(() => {
    const page = searchParams.get("page");
    console.log("header-Mypage-page", page);
    // ページパラメータが"mypage"の場合、MyPageを"none"に設定
    setPageStyles({
      HomePage: location.pathname === "/Top" ? "none" : "",
      MyPage: page === "mypage" ? "none" : "block",
    });
  }, [location.pathname, searchParams]); // location.pathname や searchParams が変わるたびに実行

  const [AllItems, setAllItems] = useState({
    DataList: [],
    IsSearch: { searchToggle: 0, Check: false, searchResultEmpty: false },
    Page: 1,
    ResetItem: false,
    sortOption: "orderNewPostsDate",
  });

  const [WebSocketState, setWebSocketState] = useState({
    notification: {},
    Chat: "",
    workComment: "",
    websocketFollowStatus: "",
  });

  const value1 = {
    AllItems,
    setAllItems,
  };

<<<<<<< HEAD
  const value3 = {
    workImage,
    setWorkImage,
  };

=======


  // WebSocket接続
  useEffect(() => {
    if (accountData !== undefined) {
      const newWs = new WebSocket(`ws://localhost:3000?userId=${accountData.id}`);
      newWs.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.kind === "notification") {
          if (data.type === "follow") {
            console.log("通ってると", data.noticeData);
            setWebSocketState((prev) => ({
              ...prev,
              notification: data,
              websocketFollowStatus: data.followData,
            }));
          }
        }
        if (data.kind === "follow") {
          if (data.type === "follow") {
            console.log("通ってると", data);
            setWebSocketState((prev) => ({
              ...prev,
              websocketFollowStatus: data,
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

  const value2 = {
    WebSocketState,
    setWebSocketState,
  };


>>>>>>> 22c4975d546402fda792f6cf3c2215860da22a92
  return (
    <>
      <MyContext.Provider value={pageStyles}>
        <AllItemsContext.Provider value={value1}>
<<<<<<< HEAD
          <WorkImageContext.Provider value={value3}>
=======
          <WebScokectContext.Provider value={value2}>
>>>>>>> 22c4975d546402fda792f6cf3c2215860da22a92
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
<<<<<<< HEAD
          </WorkImageContext.Provider>
=======
          </WebScokectContext.Provider>
>>>>>>> 22c4975d546402fda792f6cf3c2215860da22a92
        </AllItemsContext.Provider>
      </MyContext.Provider>
    </>
  );
}

DashboardLayout.propTypes = {
  children: PropTypes.node,
};
