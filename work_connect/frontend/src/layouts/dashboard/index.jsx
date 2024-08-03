import { createContext, useState } from "react";
import PropTypes from "prop-types";

export const MyContext = createContext();
export const PageContext = createContext();
export const DataListContext = createContext();
export const SearchCheckContext = createContext();

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

  const [Page, setPage] = useState(1);
  const [DataList, setDataList] = useState([]);
  const [IsSearch, setIsSearch] = useState({ searchToggle: 0, Check: false });

  // 一覧画面でスクロールされた時にデータ〇〇件取得するための処理
  const value1 = {
    Page,
    setPage,
  };

  // 検索結果を保存
  const value2 = {
    DataList,
    setDataList,
  };

  // 検索チェック
  const value3 = {
    IsSearch,
    setIsSearch,
  };

  return (
    <>
      <MyContext.Provider value={HomePage}>
        <SearchCheckContext.Provider value={value3}>
          <PageContext.Provider value={value1}>
            <DataListContext.Provider value={value2}>
              <Header onOpenNav={() => setOpenNav(true)} />
            </DataListContext.Provider>
          </PageContext.Provider>
          <Box
            sx={{
              minHeight: 1,
              display: "flex",
              flexDirection: { xs: "column", lg: "row" },
            }}
          >
            <Nav openNav={openNav} onCloseNav={() => setOpenNav(false)} />

            <PageContext.Provider value={value1}>
              <DataListContext.Provider value={value2}>
                <Main>{children}</Main>
              </DataListContext.Provider>
            </PageContext.Provider>
          </Box>
        </SearchCheckContext.Provider>
      </MyContext.Provider>
    </>
  );
}

DashboardLayout.propTypes = {
  children: PropTypes.node,
};
