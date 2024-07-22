import { createContext, useState } from "react";
import PropTypes from "prop-types";
export const MyContext = createContext();

import Box from "@mui/material/Box";

import Nav from "./nav";
import Main from "./main";
import Header from "./header";

// ----------------------------------------------------------------------

export default function DashboardLayout({ children }) {
  const [openNav, setOpenNav] = useState(false);

  // ユーザーが開いているページがTopだった時、headerコンポーネントに一部表示しない
  const HomePage = location.pathname === "/Top" ? "none" : "";

  return (
    <>
      {/* stateのような関数をpropsとして渡すときはアロー関数が必要 */}
      {/* 逆に必要でないときは、bool、文字列、数値、オブジェクトなど */}
      <MyContext.Provider value={HomePage}>
        <Header onOpenNav={() => setOpenNav(true)} />
      </MyContext.Provider>
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
    </>
  );
}

DashboardLayout.propTypes = {
  children: PropTypes.node,
};
