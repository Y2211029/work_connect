import { createContext, useState } from "react";
import PropTypes from "prop-types";
<<<<<<< HEAD

export const MyContext = createContext();
export const AllItemsContext = createContext();
// export const DataListContext = createContext();
// export const SearchCheckContext = createContext();
// export const SortOption = createContext();
=======
export const MyContext = createContext();
>>>>>>> a8f81805d7881191f4c8b687c9cc54c98922b3f3

import Box from "@mui/material/Box";

import Nav from "./nav";
import Main from "./main";
import Header from "./header";

// ----------------------------------------------------------------------

<<<<<<< HEAD
=======
export const DataListContext = createContext();

>>>>>>> a8f81805d7881191f4c8b687c9cc54c98922b3f3
export default function DashboardLayout({ children }) {
  const [openNav, setOpenNav] = useState(false);

  /**
   * ユーザーが開いているページが"localhost5174/Top"だった時
   * headerに表示されている不必要なボタンなどを表示しない
   */
<<<<<<< HEAD

  const HomePage = location.pathname === "/Top" ? "none" : "";

  const [AllItems, setAllItems] = useState({
    DataList: [],
    IsSearch: { searchToggle: 0, Check: false, searchResultEmpty: false },
    Page: 1,
    // ResetItem: false,
    sortOption: "orderNewPostsDate",
  });

  const value1 = {
    AllItems,
    setAllItems,
=======
  const HomePage = location.pathname === "/Top" ? "none" : "";

  const [DataList, setDataList] = useState([]);

  const value = {
    DataList,
    setDataList,
>>>>>>> a8f81805d7881191f4c8b687c9cc54c98922b3f3
  };

  return (
    <>
      <MyContext.Provider value={HomePage}>
<<<<<<< HEAD
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
=======
        <DataListContext.Provider value={value}>
          <Header onOpenNav={() => setOpenNav(true)} />
        </DataListContext.Provider>
        <Box
          sx={{
            minHeight: 1,
            display: "flex",
            flexDirection: { xs: "column", lg: "row" },
          }}
        >
          <Nav openNav={openNav} onCloseNav={() => setOpenNav(false)} />

          <DataListContext.Provider value={value}>
            <Main>{children}</Main>
          </DataListContext.Provider>
        </Box>
>>>>>>> a8f81805d7881191f4c8b687c9cc54c98922b3f3
      </MyContext.Provider>
    </>
  );
}

DashboardLayout.propTypes = {
  children: PropTypes.node,
};
