import { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import PostAddIcon from "@mui/icons-material/PostAdd";
import AddIcon from "@mui/icons-material/Add";

import { TopPageModalContext } from ".";
import { useResponsive } from "src/hooks/use-responsive";
import { bgBlur } from "src/theme/css";
import { NAV, HEADER } from "./config-layout";
import Iconify from "src/components/iconify";
import AccountPopover from "./common/account-popover";
import Searchbar from "./common/searchbar";
import ChatPng from "./common/chatPng";
import NotificationsPopover from "./common/notifications-popover";
import { useLocation, useNavigate } from "react-router-dom";
// ゲストモード時、作品投稿・動画投稿・通知
import { MyContext } from "src/layouts/dashboard/index";
//学生か企業かで、ヘッダー内容を切り替え、Linkを用いてジャンプする
import { useSessionStorage } from "src/hooks/use-sessionStorage";
// ログイン
import StudentLoginModal from "src/components/account/students/StudentLoginModal";
import CompanyLoginModal from "src/components/account/company/CompanyLoginModal";

// 新規登録
import StudentPreSignModal from "src/components/account/students/StudentPreSignModal";
import CompanyPreSignModal from "src/components/account/company/CompanyPreSignModal";

// ----------------------------------------------------------------------

export default function Header({ onOpenNav }) {
  const Display = useContext(MyContext);
  const { IsModalContextState, setIsModalContextState } = useContext(TopPageModalContext);
  const { modalOpen, modalType, preModalOpen, preModalType } = IsModalContextState;
  const location = useLocation();
  const { getSessionData } = useSessionStorage();
  const accountData = getSessionData("accountData") || {};
  const theme = useTheme();
  const lgUp = useResponsive("up", "lg");

  const data = {
    id: accountData.id || "",
  };
  const [open, setOpen] = useState(null);
  const [OpenToolbarNewsButton, setOpenToolbarNewsButton] = useState(null);
  const [login_state, setLoginState] = useState(false);

  const [IsChat, setIsChat] = useState(false);

  let navigate = useNavigate();

  // style CSS ここから
  const buttonStyle = {
    display: Display.HomePage,
    margin: 4,
    bgcolor: "#1e90ff",
    transition: "0.5s",
    "&:hover": { cursor: "pointer", backgroundColor: "#0567c8" },
    "&:active": { backgroundColor: "#1e90ff" },
  };

  // style CSS ここまで

  useEffect(() => {
    if (accountData) {
      if (accountData.user_name) {
        setLoginState(true);
      }
    }
  }, [accountData]);

  useEffect(() => {
    console.log("header : modalOpen : ", modalOpen);
  }, [modalOpen]); // 空の依存配列を渡して、初回のみ実行するようにする

  const handleOpenModal = () => {
    // setShowModal(true);
    navigate("WorkPosting");
  };
  const handleOpenModal2 = () => {
    // setShowModal(true);
    navigate("VideoPosting");
  };

  const handleChange = (e) => {
    if (e.target.id === "LoginButton") {
      setIsModalContextState((prev) => ({
        ...prev,
        modalType: "学生",
        modalOpen: true,
      }));
    }

    if (e.target.id === "PreSignButton") {
      console.log("e.target.id === PreSignButton");
      setIsModalContextState((prev) => ({
        ...prev,
        preModalType: "学生",
        preModalOpen: true,
      }));
    }
  };

  useEffect(() => {
    console.log("header: preModalOpen", preModalOpen);
  }, [preModalOpen]);

  const handleOpen = (event) => {
    setOpen(event.currentTarget); // ボタンがクリックされた要素を保存
    console.log("あいうえお通ってます!");
    //パスを取得
    console.log(location.pathname);
  };
  const handleOpenToolbarNews = (event) => {
    setOpenToolbarNewsButton(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null); // ポップオーバーを閉じる
  };
  const handleToolbarNewsButtonClose = () => {
    setOpenToolbarNewsButton(null); // ポップオーバーを閉じる
  };

  const NEWS_MENU_OPTIONS = [
    {
      label: "求人の記事を投稿する",
      path: "/Editor/JobOffer",
      icon: "eva:settings-2-fill",
    },
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
      label: "ブログの記事を投稿する",
      path: "/Editor/Blog",
      icon: "eva:settings-2-fill",
    },
  ];

  const handleMenuItemClick = (path) => {
    const now_pathname = window.location.pathname;

    handleClose();

    if (["/Editor/Session", "/Editor/Internship", "/Editor/JobOffer", "/Editor/Blog"].some((partialPath) => now_pathname.includes(partialPath))) {
      window.location.href = path; // 新しいパスに移動して即座にリロード
    } else {
      navigate(path); // 通常の遷移
    }
  };

  //クリックすると一番上まで戻るボタン
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    console.log("location.pathname", location.pathname);

    if (location.pathname == "/Chat") {
      setIsChat(true);
    } else {
      setIsChat(false);
    }
  }, [location]);

  const renderContent = (
    <>
      {!lgUp && (
        <IconButton onClick={onOpenNav} sx={{ mr: 1, display: Display.HomePage }}>
          {/* ハンバーガーメニュー */}
          <Iconify icon="eva:menu-2-fill" />
        </IconButton>
      )}
      <div
        style={{
          display: Display.HomePage === "none" ? "flex" : "none",
          alignItems: "center",
        }}
      >
        <img
          src={`/assets/Work&ConnectIcon.png`}
          style={{
            width: "100%",
            height: "100%",
            minWidth: "20px",
            minHeight: "20px",
            maxWidth: "50px",
            maxHeight: "50px",
          }}
        ></img>
        <span style={{ color: "black", fontWeight: "bold" }}>Work&Connect</span>
      </div>
      {/* 検索バー */}
      <Searchbar style={{ display: Display.MyPage }} />

      <Box sx={{ flexGrow: 1 }} />
      {/* ログイン、新規登録、本登録、チャット、通知、アカウントプロフィール */}
      <Stack direction="row" alignItems="center" spacing={1}>
        {data.id[0] === "S" ? (
          <>
            <Button
              onClick={handleOpenModal}
              variant="contained"
              sx={{
                display: Display.HomePage === "none" ? "none" : { xs: "none", md: "flex" },
                margin: 4,
                bgcolor: "#1e90ff",
                transition: "0.5s",
                "&:hover": { cursor: "pointer", backgroundColor: "#0567c8" },
                "&:active": { backgroundColor: "#1e90ff" },
              }}
            >
              作品投稿
            </Button>
            <Button
              onClick={handleOpenModal2}
              variant="contained"
              sx={{
                display: Display.HomePage === "none" ? "none" : { xs: "none", md: "flex" },
                margin: 4,
                bgcolor: "#1e90ff",
                transition: "0.5s",
                "&:hover": { cursor: "pointer", backgroundColor: "#0567c8" },
                "&:active": { backgroundColor: "#1e90ff" },
              }}
            >
              動画投稿
            </Button>
          </>
        ) : data.id[0] === "C" ? (
          <>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Button
                onClick={handleOpen}
                variant="contained"
                sx={{
                  display: Display.HomePage === "none" ? "none" : { xs: "none", md: "flex" },
                  bgcolor: "#1e90ff",
                  transition: "0.5s",
                  "&:hover": { cursor: "pointer", backgroundColor: "#0567c8" },
                  "&:active": { backgroundColor: "#1e90ff" },
                }}
              >
                ニュース投稿
              </Button>
              <Popover
                open={open}
                anchorEl={open}
                onClose={handleClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                PaperProps={{
                  sx: {
                    p: 0,
                    mt: 1,
                    ml: 0.75,
                    width: 250,
                  },
                }}
                disableScrollLock
              >
                {NEWS_MENU_OPTIONS.map((option) => (
                  <MenuItem key={option.label} onClick={() => handleMenuItemClick(option.path)} sx={{ display: login_state ? "block" : "none" }}>
                    {option.label}
                    <Divider sx={{ borderStyle: "dashed", display: "block" }} />
                  </MenuItem>
                ))}
              </Popover>
            </Stack>
          </>
        ) : null}

        <Button
          id="LoginButton"
          onClick={handleChange}
          variant="contained"
          sx={{ display: Display.HomePage == "none" ? { xs: "none", md: "none", lg: "flex" } : "none" }}
        >
          ログイン
        </Button>

        <Button
          id="PreSignButton"
          onClick={handleChange}
          variant="outlined"
          sx={{ display: Display.HomePage == "none" ? { xs: "none", md: "none", lg: "flex" } : "none" }}
        >
          新規登録
        </Button>

        {modalType === "学生" ? <StudentLoginModal /> : modalType === "企業" ? <CompanyLoginModal /> : ""}
        {preModalType === "学生" ? <StudentPreSignModal /> : preModalType === "企業" ? <CompanyPreSignModal /> : ""}

        <Tooltip title="チャット">
          <IconButton
            sx={{
              marginLeft: "auto", // 右揃え
              width: "30px",
              height: "30px",
              display: Display.HomePage === "none" ? "none" : { xs: "none", md: "flex" },
            }}
          >
            <ChatPng />
          </IconButton>
        </Tooltip>

        <NotificationsPopover />

        <AccountPopover phoneSize={false} />
      </Stack>
    </>
  );

  const renderArrowTopButton = !IsChat && (
    <ArrowUpwardIcon
      onClick={handleScrollToTop}
      className="arrow_up_ward_icon"
      sx={{ color: "#637381", display: Display.HomePage === "none" ? "none" : "block", overflow: "visible" }}
    />
  );

  const renderToolBar = (
    <>
      <Stack
        direction="row"
        justifyContent="space-around"
        alignItems="center"
        spacing={1}
        className="toolbar"
        sx={{
          height: HEADER.H_DESKTOP,
          display: Display.HomePage === "none" ? "none" : { xs: "flex", md: "none" },
          zIndex: theme.zIndex.appBar + 1,
        }}
      >
        {/* チャット */}
        <Tooltip title="チャット">
          <IconButton
            sx={{
              marginLeft: "auto", // 右揃え
              width: "30px",
              height: "30px",
              display: Display.HomePage ? "none" : "flex",
            }}
          >
            <ChatPng />
          </IconButton>
        </Tooltip>

        {/* ＋ */}

        {data.id[0] === "S" ? (
          <>
            <IconButton
              onClick={handleOpen}
              sx={{
                position: "relative",
                bottom: "22px",
                boxShadow: "0px 3px 7px 0px rgba(0, 0, 0, 0.3)",
                color: "white",
                backgroundColor: "#4BA2FB",
                width: "60px",
                height: "60px",
                "&:hover": {
                  backgroundColor: "#3b8fd4", // ホバー時の背景色
                },
                "&:focus": {
                  backgroundColor: "#4BA2FB", // フォーカス時の背景色を固定
                },
                "&:active": {
                  backgroundColor: "#367dc0", // クリック時の背景色
                },
              }}
            >
              <PostAddIcon />
            </IconButton>
            <Popover
              open={open}
              anchorEl={open}
              onClose={handleClose}
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
              transformOrigin={{ vertical: "bottom", horizontal: "center" }}
              // popover全体ではなく、ボタンを囲っている一つ階層が上の要素のスタイリングをする。
              sx={{
                p: 0,
              }}
              PaperProps={{
                sx: {
                  p: 0, // 内側の余白（padding）を0に設定
                  mt: 1, // 上方向のマージン（margin-top）を設定
                  ml: 0.75, // 左方向のマージン（margin-left）を設定
                  width: "fit-contents", // 幅を250pxに設定
                },
              }}
              disableScrollLock
            >
              <Button onClick={handleOpenModal} variant="contained" sx={buttonStyle}>
                作品投稿
              </Button>
              <Button onClick={handleOpenModal2} variant="contained" sx={buttonStyle}>
                動画投稿
              </Button>
            </Popover>
          </>
        ) : data.id[0] === "C" ? (
          <>
            <Stack direction="row" alignItems="center" spacing={1}>
              <IconButton
                onClick={handleOpenToolbarNews}
                sx={{
                  position: "relative",
                  bottom: "22px",
                  boxShadow: "0px 3px 7px 0px rgba(0, 0, 0, 0.3)",
                  color: "white",
                  backgroundColor: "#4BA2FB",
                  width: "60px",
                  height: "60px",
                  "&:hover": {
                    backgroundColor: "#3b8fd4", // ホバー時の背景色
                  },
                  "&:focus": {
                    backgroundColor: "#4BA2FB", // フォーカス時の背景色を固定
                  },
                  "&:active": {
                    backgroundColor: "#367dc0", // クリック時の背景色
                  },
                }}
              >
                <AddIcon />
              </IconButton>
              <Popover
                open={OpenToolbarNewsButton}
                anchorEl={OpenToolbarNewsButton}
                onClose={handleToolbarNewsButtonClose}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                transformOrigin={{ vertical: "bottom", horizontal: "center" }}
                // popover全体ではなく、ボタンを囲っている一つ階層が上の要素のスタイリングをする。

                PaperProps={{
                  sx: {
                    p: 0, // 内側の余白（padding）を0に設定
                    mt: 1, // 上方向のマージン（margin-top）を設定
                    ml: 0.75, // 左方向のマージン（margin-left）を設定
                    width: "fit-contents", // 幅を250pxに設定
                  },
                }}
                disableScrollLock
              >
                {NEWS_MENU_OPTIONS.map((option) => (
                  <MenuItem key={option.label} onClick={() => handleMenuItemClick(option.path)} sx={{ display: login_state ? "block" : "none" }}>
                    {option.label}
                    <Divider sx={{ borderStyle: "dashed", display: "block" }} />
                  </MenuItem>
                ))}
              </Popover>
            </Stack>
          </>
        ) : null}

        {/* アカウントアイコン */}
        {/* <Tooltip title="アカウント" sx={{ display: Display.HomePage ? "none" : "flex" }}>
          <IconButton
            sx={{
              marginLeft: "auto", // 右揃え
              "&:hover": { backgroundColor: "#f0f0f0", title: "a" },
              width: "30px",
              height: "30px",
              display: Display.HomePage ? "none" : "felx",
            }}
          > */}
        <AccountPopover phoneSize={true} />
        {/* </Tooltip>  */}
      </Stack>
    </>
  );
  useEffect(() => {
    console.log("theme.zIndex", theme.zIndex);
  }, [theme]);
  const renderPhoneSizeLogin = (
    <>
      <Box className="top_page_phone_size_box" sx={{ display: Display.HomePage == "none" ? { xs: "flex", md: "flex", lg: "none" } : "none" }}>
        <Button
          id="LoginButton"
          onClick={handleChange}
          className="top_page_phone_size_button"
          variant="contained"
          // sx={{ display: Display.HomePage === "none" ? "flex" : "none" }}
        >
          ログイン
        </Button>

        <Button
          id="PreSignButton"
          onClick={handleChange}
          className="top_page_phone_size_button"
          variant="outlined"
          // sx={{ display: Display.HomePage === "none" ? "flex" : "none" }}
        >
          新規登録
        </Button>
      </Box>
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
          ...(lgUp &&
            !Display.HomePage && {
              width: `calc(100% - ${NAV.WIDTH + 1}px)`,
              height: HEADER.H_DESKTOP,
            }),
        }}
      >
        <Toolbar
          sx={{
            px: Display.HomePage === "none" ? { lg: 30 } : { lg: 5 },
            height: 1,
          }}
        >
          {renderContent}
        </Toolbar>
      </AppBar>
      {renderArrowTopButton}
      {renderToolBar}
      {renderPhoneSizeLogin}
    </>
  );
}

Header.propTypes = {
  onOpenNav: PropTypes.func,
};
