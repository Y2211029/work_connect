import { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import { useTheme } from "@mui/material/styles";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";




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

//学生か企業かで、ヘッダー内容を切り替え、Linkを用いてジャンプする
import { useSessionStorage } from "src/hooks/use-sessionStorage";


{/* TopPageList-view.jsxに移動しました。藤田2024/09/30 ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓*/ }
// import $ from "jquery";
// import StudentLoginModal from "src/components/account/students/StudentLoginModal";
// import CompanyLoginModal from "src/components/account/company/CompanyLoginModal";
// import StudentPreSignModal from "../../components/account/students/StudentPreSignModal";
// import CompanyPreSignModal from "../../components/account/company/CompanyPreSignModal";
{/* TopPageList-view.jsxに移動しました。藤田2024/09/30 ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑*/ }
// ----------------------------------------------------------------------

export default function Header({ onOpenNav }) {

  {/* TopPageList-view.jsxに移動しました。藤田2024/09/30 ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓*/ }
  // const [ModalChange, setModalChange] = useState("");
  // const [PreModalChange, setPreModalChange] = useState("");
  {/* TopPageList-view.jsxに移動しました。藤田2024/09/30 ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑*/ }
  const Display = useContext(MyContext);
  const [open, setOpen] = useState(null);

  const { getSessionData } = useSessionStorage();
  const accountData = getSessionData("accountData") || {};
  const data = {
    id: accountData.id || "",
  };
  const [login_state, setLoginState] = useState(false);


  const theme = useTheme();
  const lgUp = useResponsive("up", "lg");
  let navigate = useNavigate();

  // style CSS ここから
  const buttonStyle = {
    display: Display.HomePage,
    margin: 4,
    "&:hover": {
      backgroundColor: "#a9a9a9",
    },
  };
  // style CSS ここまで

  useEffect(() => {
    if (accountData) {
      if (accountData.user_name) {
        setLoginState(true);
      }
    }
  }, [accountData]);

  const handleOpenModal = () => {
    // setShowModal(true);
    navigate("WorkPosting");
  };
  const handleOpenModal2 = () => {
    // setShowModal(true);
    navigate("VideoPosting");
  };

  //   {/* TopPageList-view.jsxに移動しました。藤田2024/09/30 ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓*/ }
  // const callSetModalChange = (newValue) => {
  //   setModalChange(newValue);
  // };
  // const callSetPreModalChange = (newValue) => {
  //   setPreModalChange(newValue);
  // };
  {/* TopPageList-view.jsxに移動しました。藤田2024/09/30 ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑*/ }

  {/* TopPageList-view.jsxに移動しました。藤田2024/09/30 ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓*/ }
  // const handleChange = (e) => {
  //   if (e.target.id === "LoginButton") {
  //     setModalChange("学生");
  //     setPreModalChange("");
  //   } else {
  //     setModalChange("");
  //     setPreModalChange("学生");
  //   }
  // };
  {/* TopPageList-view.jsxに移動しました。藤田2024/09/30 ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑*/ }
  // const handleNewsJump = () => {
  //   navigate('/Editor');
  // }

  const handleOpen = (event) => {
    setOpen(event.currentTarget); // ボタンがクリックされた要素を保存
  };

  const handleClose = () => {
    setOpen(null); // ポップオーバーを閉じる
  };

  const NEWS_MENU_OPTIONS = [
    {
      label: "インターンシップの記事を投稿する",
      path: `/Editor/Internship`,
      icon: "eva:person-fill",
    },
    {
      label: "説明会の記事を投稿する",
      path: `/Editor/Session`,
      icon: "eva:person-fill",
    },
    {
      label: "求人の記事を投稿する",
      path: "/Editor/JobOffer",
      icon: "eva:settings-2-fill",
    },
    {
      label: "ブログの記事を投稿する",
      path: "/Editor/Blog",
      icon: "eva:settings-2-fill",
    },
  ];


  const handleMenuItemClick = (path) => {
    handleClose();
    navigate(path);
  };


  //クリックすると一番上まで戻るボタン
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  {/* TopPageList-view.jsxに移動しました。藤田2024/09/30 ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓*/ }

  // ログインのform内以外をクリックしたときにモーダルを閉じる処理
  // $("*").click(function (e) {
  // クリックした要素の<html>までのすべての親要素の中に"formInModal"クラスがついている要素を取得
  // var targetParants = $(e.target).parents(".formInModal");

  // 取得した要素の個数が0個の場合
  // ***if (targetParants.length == 0 || $(e.target).text() == "閉じる")***
  // console.log($(e.target).text());
  // if (targetParants.length == 0 || $(e.target).text() == "閉じる") {
  // クリックした要素に"formInModal"クラスがついていない場合
  // if (
  //   $(e.target).attr("class") != "formInModal" &&
  //   $(e.target).attr("id") != "LoginButton" &&
  //   $(e.target).attr("id") != "loginCompanyModalLink" &&
  //   $(e.target).attr("id") != "loginStudentModalLink"
  // ) {
  // ログインモーダルを閉じる
  // setModalChange("");
  // }

  //     if (
  //       $(e.target).attr("class") != "formInModal" &&
  //       $(e.target).attr("id") != "PreSignButton" &&
  //       $(e.target).attr("id") != "PreSignCompanyModalLink" &&
  //       $(e.target).attr("id") != "PreSignStudentModalLink"
  //     ) {
  //       // 新規登録モーダルを閉じる
  //       setPreModalChange("");
  //     }
  //   }
  // });
  {/* TopPageList-view.jsxに移動しました。藤田2024/09/30 ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑*/ }

  const renderContent = (
    <>
      {!lgUp && (
        <IconButton onClick={onOpenNav} sx={{ mr: 1, display: Display.HomePage }}>
          {/* ハンバーガーメニュー */}
          <Iconify icon="eva:menu-2-fill" />
        </IconButton>
      )}


      {/* 検索バー */}
      <Searchbar style={{ display: Display.MyPage }} />

      <Box sx={{ flexGrow: 1 }} />
      {/* ログイン、新規登録、本登録、チャット、通知、アカウントプロフィール */}
      <Stack direction="row" alignItems="center" spacing={1}>
        {data.id[0] === "S" ? (
          <>
            <Button onClick={handleOpenModal} variant="contained" sx={buttonStyle}>
              作品投稿
            </Button>
            <Button onClick={handleOpenModal2} variant="contained" sx={buttonStyle}>
              動画投稿
            </Button>
          </>
        ) : data.id[0] === "C" ? (
          <>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Button onClick={handleOpen} variant="contained">
                ニュース投稿
              </Button>

              <Popover
                open={!!open}
                anchorEl={open}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                PaperProps={{
                  sx: {
                    p: 0,
                    mt: 1,
                    ml: 0.75,
                    width: 250,
                  },
                }}
              >
                {NEWS_MENU_OPTIONS.map((option) => (
                  <MenuItem
                    key={option.label}
                    onClick={() => handleMenuItemClick(option.path)}
                    sx={{ display: login_state ? 'block' : 'none' }}
                  >
                    {option.label}
                    <Divider sx={{ borderStyle: 'dashed', display: 'block' }} />
                  </MenuItem>
                ))}

              </Popover>
            </Stack>
          </>
        ) : null}
        <ChatPng />
        {login_state == true && (
          <>
            <NotificationsPopover />
          </>
        )
        }
        <AccountPopover />
      </Stack>
    </>
  );

  useEffect(() => {
    console.log("theme.zIndex", theme.zIndex);
  }, [theme]);

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
          ...(lgUp && !Display.HomePage && {
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
            top: "873px",
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