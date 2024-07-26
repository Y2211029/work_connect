import { createContext, useState } from "react";
import PropTypes from "prop-types";
export const MyContext = createContext();

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

  const [DataList, setDataList] = useState([]);

  const value = {
    DataList,
    setDataList,
  };

  return (
    <>
      <MyContext.Provider value={HomePage}>
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
      </MyContext.Provider>
    </>
  );
}

DashboardLayout.propTypes = {
  children: PropTypes.node,
};
