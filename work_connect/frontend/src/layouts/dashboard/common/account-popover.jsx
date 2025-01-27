import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import PropTypes from "prop-types";

import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import Popover from "@mui/material/Popover";
import { alpha } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
// ゲストモード時、作品投稿・動画投稿・通知
import { MyContext } from "src/layouts/dashboard/index";
import { account } from "src/_mock/account";
import { useSessionStorage } from "src/hooks/use-sessionStorage";
import { AllItemsContext } from "src/layouts/dashboard/index";
import DefaultIcon from "src/sections/Profile/View/DefaultIcon";
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function AccountPopover({phoneSize}) {
  const Display = useContext(MyContext);
  const [open, setOpen] = useState(null);
  const navigate = useNavigate();
  // セッションストレージ取得
  const { getSessionData } = useSessionStorage();
  const accountData = getSessionData("accountData");
  const { setAllItems } = useContext(AllItemsContext);
  const [UserName, setUserName] = useState("");
  const [Mail, setMail] = useState("");
  const [popoverIcon, setpopoverIcon] = useState("");
  const [login_state, setLoginState] = useState(false);

  useEffect(() => {
    if (accountData) {
      setUserName(accountData.user_name);
      setMail(accountData.mail);
      setpopoverIcon(accountData.popover_icon);
      if (UserName && Mail) {
        setLoginState(true);
      }
    }
  }, [accountData]);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleMenuItemClick = (path) => {
    if (path == `/Profile/${accountData.user_name}`) {
      // console.log("path", path);
      // 作品・動画一覧を正常に再表示するために必要な処理
      setAllItems((prevItems) => ({
        ...prevItems, //既存のパラメータ値を変更するためにスプレッド演算子を使用
        ResetItem: true,
        DataList: [], //検索してない状態にするために初期化 //searchbar.jsxのsearchSourceも初期化
        IsSearch: { searchToggle: 0, Check: false, searchResultEmpty: false },
        Page: 1, //スクロールする前の状態にするために初期化
        sortOption: "orderNewPostsDate", //並び替える前の状態にするために初期化
      }));
    }
    handleClose();

    navigate(path);
    window.location.reload();
  };

  const handleLogout = () => {
    const confirmed = window.confirm("ログアウトしますか？");
    if (confirmed) {
      // 「はい」が選択された場合の処理
      // ログアウト
      sessionStorage.removeItem("accountData");
      // alert("ログアウトしました。");
      // 画面を一度だけリロードする(リロードしないとモーダルに前の情報が残ったままになる)
      window.location.href = "/Top";
    } else {
      // 「いいえ」が選択された場合の処理
    }
  };

  // MENU_OPTIONSの設定
  const MENU_OPTIONS = [
    {
      label: "プロフィール",
      path: `/Profile/${UserName}`,
      icon: "eva:person-fill",
    },
    {
      label: "設定",
      path: "/Settings",
      icon: "eva:settings-2-fill",
    },
  ];

  const HeaderAccountPopover = (
    <Tooltip
      title="アカウント"
      sx={{
        display: Display.HomePage === "none" ? "none" : "flex",
      }}
    >
      <IconButton
        onClick={handleOpen}
        sx={{
          width: 40,
          height: 40,
          background: (theme) => alpha(theme.palette.grey[500], 0.08),
          ...(open && {
            background: (theme) => `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
          }),

          marginLeft: "auto", // 右揃え
          "&:hover": { backgroundColor: "#f0f0f0", title: "a" },
          display: Display.HomePage === "none" ? "none" : { xs: "none", md: "flex" },
        }}
      >
        {popoverIcon ? (
          // アイコンを設定しているとき
          <Avatar
            src={`http://localhost:8000/storage/images/userIcon/${popoverIcon}`}
            alt={account.displayName}
            sx={{
              width: 36,
              height: 36,
              border: (theme) => `solid 2px ${theme.palette.background.default}`,
            }}
          >
            {account.displayName.charAt(0).toUpperCase()}
          </Avatar>
        ) : (
          // アイコンを設定していないとき
          <DefaultIcon
            sx={{
              width: 36,
              height: 36,
              border: (theme) => `solid 2px ${theme.palette.background.default}`,
            }}
          />
        )}
      </IconButton>
    </Tooltip>
  );
  const ToolAccountPopover = (
    <Tooltip
      title="アカウント"
      sx={{
        display: Display.HomePage === "none" ? "none" : "flex",
      }}
    >
      <IconButton
        onClick={handleOpen}
        sx={{
          marginLeft: "auto", // 右揃え
          "&:hover": { backgroundColor: "#f0f0f0" },
          width: "30px",
          height: "30px",
          background: (theme) => alpha(theme.palette.grey[500], 0.08),
          ...(open && {
            background: (theme) => `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
          }),
          display: Display.HomePage === "none" ? "none" : { xs: "flex", md: "none" },
        }}
      >
        {popoverIcon ? (
          // アイコンを設定しているとき
          <Avatar
            src={`http://localhost:8000/storage/images/userIcon/${popoverIcon}`}
            alt={account.displayName}
            sx={{
              width: 36,
              height: 36,
              border: (theme) => `solid 2px ${theme.palette.background.default}`,
            }}
          >
            {account.displayName.charAt(0).toUpperCase()}
          </Avatar>
        ) : (
          // アイコンを設定していないとき
          <DefaultIcon
            sx={{
              width: 36,
              height: 36,
              border: (theme) => `solid 2px ${theme.palette.background.default}`,
            }}
          />
        )}
      </IconButton>
    </Tooltip>
  );

  return (
    <>
      {phoneSize ? ToolAccountPopover : HeaderAccountPopover}
      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1,
            ml: 0.75,
            width: 200,
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2 }}>
          <Typography variant="subtitle2" noWrap>
            {/* セッションストレージからユーザーネームを取得、なければデフォルト */}
            {UserName !== "" && login_state ? UserName : account.displayName}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
            {/* セッションストレージからメールアドレスを取得、なければデフォルト */}
            {Mail != "" && login_state ? Mail : ""}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: "dashed", m: 0, display: login_state ? "block" : "none" }} />

        {MENU_OPTIONS.map((option, index) => (
          <MenuItem key={option.label} onClick={() => handleMenuItemClick(option.path)} sx={{ display: login_state ? "block" : "none" }}>
            <div key={index} style={{ display: "flex", alignItems: "center", margin: "10px 0px" }}>
              <Icon icon={option.icon} style={{ fontSize: "24px", color: "rgba(0, 0, 0, 0.54)", marginRight: "10px" }} />
              <span>{option.label}</span>
            </div>
          </MenuItem>
        ))}
        <Divider sx={{ borderStyle: "dashed", m: "0 !important", display: login_state ? "block" : "none" }} />

        <MenuItem
          disableRipple
          disableTouchRipple
          onClick={handleLogout}
          sx={{ typography: "body2", color: "error.main", py: 1.2, display: login_state ? "block" : "none" }}
        >
          ログアウト
        </MenuItem>
      </Popover>
    </>
  );
}

AccountPopover.propTypes = {
  phoneSize: PropTypes.bool,
};
