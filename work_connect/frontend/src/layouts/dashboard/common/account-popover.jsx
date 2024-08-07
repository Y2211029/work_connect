import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import Popover from "@mui/material/Popover";
import { alpha } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";

import Box from "@mui/material/Box";

import { account } from "src/_mock/account";
import { useSessionStorage } from "src/hooks/use-sessionStorage";

// ----------------------------------------------------------------------



// ----------------------------------------------------------------------

export default function AccountPopover() {
  const [open, setOpen] = useState(null);
  const navigate = useNavigate();

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleMenuItemClick = (path) => {
    handleClose();
    navigate(path);
  };

  const handleLogout = () => {
    const confirmed = window.confirm("ログアウトしますか？");
    if (confirmed) {
      // 「はい」が選択された場合の処理
      // ログアウト
      sessionStorage.removeItem("accountData");
      alert("ログアウトしました。");
      // 画面を一度だけリロードする(リロードしないとモーダルに前の情報が残ったままになる)
      window.location.href = "/Top";
    } else {
      // 「いいえ」が選択された場合の処理
    }
  };

   // セッションストレージ取得
   const { getSessionData } = useSessionStorage();
   const accountData = getSessionData("accountData");
 
   const [UserName, setUserName] = useState("");
   const [Mail, setMail] = useState("");
   const [login_state, setLoginState] = useState(false);
 
   useEffect(() => {
    
     if (accountData) {
      
       setUserName(accountData.user_name);
       setMail(accountData.mail);
       if (UserName && Mail) {
         setLoginState(true);
         
       }
     }
   }, [accountData]);
 
   // MENU_OPTIONSの設定
   const MENU_OPTIONS = [
    // {
    //   label: 'Home',
    //   icon: 'eva:home-fill',
    // },
    {
      label: "プロフィール",
      path: `/Profile/${UserName}`,
      icon: "eva:person-fill",
    },
    {
      label: "設定",
      icon: "eva:settings-2-fill",
    },
  ];
  

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          width: 40,
          height: 40,
          background: (theme) => alpha(theme.palette.grey[500], 0.08),
          ...(open && {
            background: (theme) => `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
          }),
        }}
      >
        <Avatar
          src={account.photoURL}
          alt={account.displayName}
          sx={{
            width: 36,
            height: 36,
            border: (theme) => `solid 2px ${theme.palette.background.default}`,
          }}
        >
          {account.displayName.charAt(0).toUpperCase()}
        </Avatar>
      </IconButton>

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

        <Divider sx={{ borderStyle: "dashed", display: login_state ? "block" : "none" }} />

        {MENU_OPTIONS.map((option) => (
          <MenuItem key={option.label} onClick={() => handleMenuItemClick(option.path)} sx={{ display: login_state ? "block" : "none" }}>
            {option.label}
          </MenuItem>
        ))}

        <Divider sx={{ borderStyle: "dashed", m: 0, display: login_state ? "block" : "none" }} />

        <MenuItem
          disableRipple
          disableTouchRipple
          onClick={handleLogout}
          sx={{ typography: "body2", color: "error.main", py: 1.5, display: login_state ? "block" : "none" }}
        >
          ログアウト
        </MenuItem>
      </Popover>
    </>
  );
}
