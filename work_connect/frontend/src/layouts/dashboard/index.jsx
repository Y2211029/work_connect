import { createContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import PropTypes from "prop-types";
export const MyContext = createContext();
export const AllItemsContext = createContext();
export const WorkImageContext = createContext();
// export const DataListContext = createContext();
// export const SearchCheckContext = createContext();
// export const SortOption = createContext();

import Box from "@mui/material/Box";

import Nav from "./nav";
import Main from "./main";
import Header from "./header";

// ----------------------------------------------------------------------

export default function DashboardLayout({ children }) {
  const [openNav, setOpenNav] = useState(false);
  const [searchParams] = useSearchParams();
  const [pageStyles, setPageStyles] = useState({
    HomePage: location.pathname === "/Top" ? "none" : "",
    MyPage: "block",
  });
  const [workImage, setWorkImage] = useState([]);

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

  const value1 = {
    AllItems,
    setAllItems,
  };

  const value3 = {
    workImage,
    setWorkImage,
  };

  return (
    <>
      <MyContext.Provider value={pageStyles}>
        <AllItemsContext.Provider value={value1}>
          <WorkImageContext.Provider value={value3}>
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
          </WorkImageContext.Provider>
        </AllItemsContext.Provider>
      </MyContext.Provider>
    </>
  );
}

DashboardLayout.propTypes = {
  children: PropTypes.node,
};
