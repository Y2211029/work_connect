import { Link, Routes, Route } from "react-router-dom";
import PropTypes from "prop-types";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import { useTheme } from "@mui/material/styles";

import HorizontalLinearStepper from "../../components/account/stepbar";
import LoginModal from "../../components/account/students/LoginModal";
import PreSignModal from "../../components/account/students/PreSignModal";
import SignUp from "../../components/account/students/SignUp";
import SignUp1 from "../../components/account/students/SignUp1";
import { useResponsive } from "../../hooks/use-responsive";

import { bgBlur } from "../../theme/css";

import AccountPopover from "./common/account-popover";
import Iconify from "../../components/iconify";
import { NAV, HEADER } from "./config-layout";
import Searchbar from "./common/searchbar";
// import LanguagePopover from './common/language-popover';
// import chatPopover from './common/chat_popover';
import ChatPng from "./common/chatPng";
import NotificationsPopover from "./common/notifications-popover";



// ----------------------------------------------------------------------

export default function Header({ onOpenNav }) {
  const theme = useTheme();
  const lgUp = useResponsive("up", "lg");
  const renderContent = (
    <>
      {!lgUp && (
        <IconButton onClick={onOpenNav} sx={{ mr: 1 }}>
          {/* ハンバーガーメニュー */}
          <Iconify icon="eva:menu-2-fill" />
        </IconButton>
      )}

      {/* 検索バー */}
      <Searchbar />

      <Box sx={{ flexGrow: 1 }} />

      {/* ログイン、新規登録、本登録、チャット、通知、アカウントプロフィール */}
      <Stack direction="row" alignItems="center" spacing={1}>
        <SignUp1 />
        <LoginModal />
        <PreSignModal />
        <SignUp />
        <ChatPng />
        <NotificationsPopover />
        <AccountPopover />
      </Stack>
    </>
  );

  return (
    <>
      <AppBar
        sx={{
          boxShadow: "none",
          height: HEADER.H_MOBILE,
          zIndex: theme.zIndex.appBar + 1,
          ...bgBlur({
            color: theme.palette.background.default,
          }),
          transition: theme.transitions.create(["height"], {
            duration: theme.transitions.duration.shorter,
          }),
          ...(lgUp && {
            width: `calc(100% - ${NAV.WIDTH + 1}px)`,
            height: HEADER.H_DESKTOP,
          }),
        }}
      >
        <Toolbar
          sx={{
            height: 1,
            px: { lg: 5 },
          }}
        >
          {renderContent}
        </Toolbar>
      </AppBar>
    </>
  );
}

Header.propTypes = {
  onOpenNav: PropTypes.func,
};
