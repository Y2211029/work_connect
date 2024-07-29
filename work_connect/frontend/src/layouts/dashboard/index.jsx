import { createContext, useState } from "react";
import PropTypes from "prop-types";

export const MyContext = createContext();
export const PageContext = createContext();

import Box from "@mui/material/Box";

import Nav from "./nav";
import Main from "./main";
import Header from "./header";

// ----------------------------------------------------------------------

export const DataListContext = createContext();

export default function DashboardLayout({ children }) {
  const [openNav, setOpenNav] = useState(false);

  /**
   * ユーザーが開いているページが"localhost5174/Top"だった時
   * headerに表示されている不必要なボタンなどを表示しない
   */
  const HomePage = location.pathname === "/Top" ? "none" : "";

  const [Page, setPage] = useState(1);
  const [DataList, setDataList] = useState([]);

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

  return (
    <>
      <MyContext.Provider value={HomePage}>
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
      </MyContext.Provider>
    </>
  );
}

DashboardLayout.propTypes = {
  children: PropTypes.node,
};
