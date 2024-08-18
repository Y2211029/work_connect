import { useContext, useState } from "react";
import PropTypes from "prop-types";
import $ from "jquery";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import { useTheme } from "@mui/material/styles";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import Button from "@mui/material/Button";

import StudentLoginModal from "src/components/account/students/StudentLoginModal";
import CompanyLoginModal from "src/components/account/company/CompanyLoginModal";

// import SignUp from "src/components/account/students/SignUp";
// import SignUp1 from "src/components/account/students/SignUp1";
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

// ゲストモード時、作品投稿・動画投稿・通知
import { MyContext } from "src/layouts/dashboard/index";

import StudentPreSignModal from "../../components/account/students/StudentPreSignModal";
import CompanyPreSignModal from "../../components/account/company/CompanyPreSignModal";

// ----------------------------------------------------------------------

export default function Header({ onOpenNav }) {
  const [ModalChange, setModalChange] = useState("");
  const [PreModalChange, setPreModalChange] = useState("");
  const Display = useContext(MyContext);

  const theme = useTheme();
  const lgUp = useResponsive("up", "lg");
  let navigation = useNavigate();

  // style CSS ここから
  const buttonStyle = {
    display: Display,
    margin: 4,
    "&:hover": {
      backgroundColor: "#a9a9a9",
    },
  };
  // style CSS ここまで

  const handleOpenModal = () => {
    // setShowModal(true);
    navigation("WorkPosting");
  };
  const handleOpenModal2 = () => {
    // setShowModal(true);
    navigation("VideoPosting");
  };

  const callSetModalChange = (newValue) => {
    setModalChange(newValue);
  };
  const callSetPreModalChange = (newValue) => {
    setPreModalChange(newValue);
  };

  const handleChange = (e) => {
    if (e.target.id === "LoginButton") {
      setModalChange("学生");
      setPreModalChange("");
    } else {
      setModalChange("");
      setPreModalChange("学生");
    }
  };

  //クリックすると一番上まで戻るボタン
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ログインのform内以外をクリックしたときにモーダルを閉じる処理
  $("*").click(function (e) {
    // クリックした要素の<html>までのすべての親要素の中に"formInModal"クラスがついている要素を取得
    var targetParants = $(e.target).parents(".formInModal");

    // 取得した要素の個数が0個の場合
    // ***if (targetParants.length == 0 || $(e.target).text() == "閉じる")***
    // console.log($(e.target).text());
    if (targetParants.length == 0 || $(e.target).text() == "閉じる") {
      // クリックした要素に"formInModal"クラスがついていない場合
      if (
        $(e.target).attr("class") != "formInModal" &&
        $(e.target).attr("id") != "LoginButton" &&
        $(e.target).attr("id") != "loginCompanyModalLink" &&
        $(e.target).attr("id") != "loginStudentModalLink"
      ) {
        // ログインモーダルを閉じる
        setModalChange("");
      }

      if (
        $(e.target).attr("class") != "formInModal" &&
        $(e.target).attr("id") != "PreSignButton" &&
        $(e.target).attr("id") != "PreSignCompanyModalLink" &&
        $(e.target).attr("id") != "PreSignStudentModalLink"
      ) {
        // 新規登録モーダルを閉じる
        setPreModalChange("");
      }
    }
  });

  const renderContent = (
    <>
      {!lgUp && (
        <IconButton onClick={onOpenNav} sx={{ mr: 1, display: Display }}>
          {/* ハンバーガーメニュー */}
          <Iconify icon="eva:menu-2-fill" />
        </IconButton>
      )}

      {/* 検索バー */}
      <Searchbar />

      <Box sx={{ flexGrow: 1 }} />

      {/* ログイン、新規登録、本登録、チャット、通知、アカウントプロフィール */}
      <Stack direction="row" alignItems="center" spacing={1}>
        <Button onClick={handleOpenModal} variant="contained" sx={buttonStyle}>
          作品投稿
        </Button>
        <Button onClick={handleOpenModal2} variant="contained" sx={buttonStyle}>
          動画投稿
        </Button>
        {/* <SignUp1 /> */}

        <Button id="LoginButton" onClick={handleChange} style={{ display: Display === "" ? "none" : "block" }}>
          ログイン
        </Button>

        <Button id="PreSignButton" onClick={handleChange} style={{ display: Display === "" ? "none" : "block" }}>
          新規登録
        </Button>

        {ModalChange === "学生" ? (
          <StudentLoginModal callSetModalChange={callSetModalChange} />
        ) : ModalChange === "企業" ? (
          <CompanyLoginModal callSetModalChange={callSetModalChange} />
        ) : null}

        {PreModalChange === "学生" ? (
          <StudentPreSignModal callSetPreModalChange={callSetPreModalChange} />
        ) : PreModalChange === "企業" ? (
          <CompanyPreSignModal callSetPreModalChange={callSetPreModalChange} />
        ) : null}

        {/* <SignUp /> */}
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
        <ArrowUpwardIcon
          onClick={handleScrollToTop}
          style={{
            cursor: "pointer",
            width: "50px",
            height: "50px",
            position: "fixed",
            top: "800px",
            right: "20px",
            color: "black",
            borderRadius: "50%",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
          }}
        />
      </AppBar>
    </>
  );
}

Header.propTypes = {
  onOpenNav: PropTypes.func,
};
