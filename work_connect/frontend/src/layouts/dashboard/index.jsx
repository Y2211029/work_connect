import { createContext, useState } from "react";
import PropTypes from "prop-types";

export const MyContext = createContext();
export const AllItemsContext = createContext();
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

  /**
   * ユーザーが開いているページが"localhost5174/Top"だった時
   * headerに表示されている不必要なボタンなどを表示しない
   */

  const HomePage = location.pathname === "/Top" ? "none" : "";

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

  return (
    <>
      <MyContext.Provider value={HomePage}>
        <AllItemsContext.Provider value={value1}>
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
        </AllItemsContext.Provider>
      </MyContext.Provider>
    </>
  );
}

DashboardLayout.propTypes = {
  children: PropTypes.node,
};
