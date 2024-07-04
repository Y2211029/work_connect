import PropTypes from "prop-types";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import { useTheme } from "@mui/material/styles";

import LoginModal from "src/components/account/students/LoginModal";
import PreSignModal from "src/components/account/students/PreSignModal";
import SignUp from "src/components/account/students/SignUp";
import SignUp1 from "src/components/account/students/SignUp1";
import { useResponsive } from "src/hooks/use-responsive";

import { bgBlur } from "src/theme/css";

import AccountPopover from "./common/account-popover";
import Iconify from "src/components/iconify";
import { NAV, HEADER } from "./config-layout";
import Searchbar from "./common/searchbar";
// import LanguagePopover from './common/language-popover';
// import chatPopover from './common/chat_popover';
import ChatPng from "./common/chatPng";
import NotificationsPopover from "./common/notifications-popover";

import { useNavigate } from "react-router-dom";


// ----------------------------------------------------------------------

export default function Header({ onOpenNav }) {
  const theme = useTheme();
  const lgUp = useResponsive("up", "lg");
  let navigation = useNavigate();
  const handleOpenModal = () => {
    // setShowModal(true);
    navigation("WorkPosting");
  };

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
        <button onClick={handleOpenModal}>作品投稿</button>
        <SignUp1 />
        <LoginModal FromCompanyPage={false}/>
        <PreSignModal FromCompanyPage={false}/>
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
