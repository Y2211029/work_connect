import { useContext, useEffect } from "react";
import PropTypes from "prop-types";

import Stack from "@mui/material/Stack";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
<<<<<<< HEAD
// import Avatar from "@mui/material/Avatar";
import { alpha } from "@mui/material/styles";
// import Typography from "@mui/material/Typography";
=======
import Avatar from "@mui/material/Avatar";
import { alpha } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
>>>>>>> a8f81805d7881191f4c8b687c9cc54c98922b3f3
import ListItemButton from "@mui/material/ListItemButton";
import Box from "@mui/material/Box";

import { usePathname } from "src/routes/hooks";
import { RouterLink } from "src/routes/components";

import { useResponsive } from "src/hooks/use-responsive";

<<<<<<< HEAD
// import { account } from "src/_mock/account";
=======
import { account } from "src/_mock/account";
>>>>>>> a8f81805d7881191f4c8b687c9cc54c98922b3f3

import Logo from "src/components/logo";
import Scrollbar from "src/components/scrollbar/scrollbar";

import { NAV } from "./config-layout";
import navConfig from "./config-navigation";
import { MyContext } from "src/layouts/dashboard/index";
<<<<<<< HEAD
import { AllItemsContext } from "src/layouts/dashboard/index";
=======
>>>>>>> a8f81805d7881191f4c8b687c9cc54c98922b3f3

// ----------------------------------------------------------------------

export default function Nav({ openNav, onCloseNav }) {
  const Display = useContext(MyContext);

  const pathname = usePathname();

  const upLg = useResponsive("up", "lg");

  // セッションデータを取得
<<<<<<< HEAD
  // const sessionData = sessionStorage.getItem("accountData");
  // let user_name = "";
  // let login_state = false;
  // if (sessionData) {
  //   const accountData = JSON.parse(sessionData);
  //   user_name = accountData.user_name;
  //   if (user_name) {
  //     login_state = true;
  //   }
  // }
=======
  const sessionData = sessionStorage.getItem("accountData");
  let user_name = "";
  let login_state = false;
  if (sessionData) {
    const accountData = JSON.parse(sessionData);
    user_name = accountData.user_name;
    if (user_name) {
      login_state = true;
    }
  }
>>>>>>> a8f81805d7881191f4c8b687c9cc54c98922b3f3

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

<<<<<<< HEAD
  // const renderAccount = (
  //   <Box
  //     sx={{
  //       my: 3,
  //       mx: 2.5,
  //       py: 2,
  //       px: 2.5,
  //       display: "flex",
  //       borderRadius: 1.5,
  //       alignItems: "center",
  //       bgcolor: (theme) => alpha(theme.palette.grey[500], 0.12),
  //     }}
  //   >
  //     <Avatar src={account.photoURL} alt="photoURL" />

  //     <Box sx={{ ml: 2 }}>
  //       <Typography variant="subtitle2">
  //         {/* セッションストレージからユーザーネームを取得、なければデフォルト */}
  //         {user_name != "" && login_state == true ? user_name : account.displayName}
  //       </Typography>

  //       <Typography variant="body2" sx={{ color: "text.secondary" }}>
  //         {account.role}
  //       </Typography>
  //     </Box>
  //   </Box>
  // );
=======
  const renderAccount = (
    <Box
      sx={{
        my: 3,
        mx: 2.5,
        py: 2,
        px: 2.5,
        display: "flex",
        borderRadius: 1.5,
        alignItems: "center",
        bgcolor: (theme) => alpha(theme.palette.grey[500], 0.12),
      }}
    >
      <Avatar src={account.photoURL} alt="photoURL" />

      <Box sx={{ ml: 2 }}>
        <Typography variant="subtitle2">
          {/* セッションストレージからユーザーネームを取得、なければデフォルト */}
          {user_name != "" && login_state == true ? user_name : account.displayName}
        </Typography>

        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {account.role}
        </Typography>
      </Box>
    </Box>
  );
>>>>>>> a8f81805d7881191f4c8b687c9cc54c98922b3f3

  const renderMenu = (
    <Stack component="nav" spacing={0.5} sx={{ px: 2 }}>
      {navConfig.map((item) => (
        <NavItem key={item.title} item={item} />
      ))}
    </Stack>
  );

  // サイドバー
  const renderUpgrade = (
    <Box sx={{ px: 2.5, pb: 3, mt: 10 }}>
      <Stack alignItems="center" spacing={3} sx={{ pt: 5, borderRadius: 2, position: "relative" }}>
        {/* <Box
          component="img"
          src="/assets/illustrations/illustration_avatar.png"
          sx={{ width: 100, position: 'absolute', top: -50 }}
        /> */}

        <Box sx={{ textAlign: "center" }}>
          {/* <Typography variant="h6"></Typography> */}

          {/* <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
            From only $69
          </Typography> */}
        </Box>

        <Button
        // href="https://material-ui.com/store/items/minimal-dashboard/"
        // target="_blank"
        // variant="contained"
        // color="inherit"
        >
          {/* Upgrade to Pro */}
        </Button>
      </Stack>
    </Box>
  );

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        "& .simplebar-content": {
          height: 1,
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <Logo sx={{ mt: 3, ml: 4 }} />

<<<<<<< HEAD
      {/* {renderAccount} */}
=======
      {renderAccount}
>>>>>>> a8f81805d7881191f4c8b687c9cc54c98922b3f3

      {renderMenu}

      <Box sx={{ flexGrow: 1 }} />

      {renderUpgrade}
    </Scrollbar>
  );

  return (
    <Box
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV.WIDTH },
        // display: Display,
        display: Display,
      }}
    >
      {upLg ? (
        <Box
          sx={{
            height: 1,
            position: "fixed",
            width: NAV.WIDTH,
            borderRight: (theme) => `dashed 1px ${theme.palette.divider}`,
          }}
        >
          {renderContent}
        </Box>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          PaperProps={{
            sx: {
              width: NAV.WIDTH,
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}

Nav.propTypes = {
  openNav: PropTypes.bool,
  onCloseNav: PropTypes.func,
};

// ----------------------------------------------------------------------

function NavItem({ item }) {
  const pathname = usePathname();

  const active = item.path === pathname;

<<<<<<< HEAD
  const { setAllItems } = useContext(AllItemsContext);
  // const { setIsSearch } = useContext(SearchCheckContext);
  // const { setPage } = useContext(PageContext);

  // Page1にしてもworkOfListは初期化されていないので表示は変わらない
  // IsSearch Check がfalseの時は検索タグを初期化
  // selectedOption の初期化は正常に動いている。

  // サイドバークリック 一覧アイテム・並び替え・検索タグ 初期化
  const handleReset = () => {
    setAllItems((prevItems) => ({
      ...prevItems, //既存のパラメータ値を変更するためにスプレッド演算子を使用
      ResetItem: true,
      DataList: [], //検索してない状態にするために初期化 //searchbar.jsxのsearchSourceも初期化
      IsSearch: { searchToggle: 0, Check: false, searchResultEmpty: false },
      Page: 1, //スクロールする前の状態にするために初期化
      sortOption: "orderNewPostsDate", //並び替える前の状態にするために初期化
    }));
    // 必要に応じて、スクロール位置や他の状態もリセット
  };

=======
>>>>>>> a8f81805d7881191f4c8b687c9cc54c98922b3f3
  return (
    <ListItemButton
      component={RouterLink}
      href={item.path}
      sx={{
        minHeight: 44,
        borderRadius: 0.75,
        typography: "body2",
        color: "text.secondary",
        textTransform: "capitalize",
        fontWeight: "fontWeightMedium",
        ...(active && {
          color: "primary.main",
          fontWeight: "fontWeightSemiBold",
          bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
          "&:hover": {
            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.16),
          },
        }),
      }}
<<<<<<< HEAD
      onClick={handleReset}
=======
>>>>>>> a8f81805d7881191f4c8b687c9cc54c98922b3f3
    >
      <Box component="span" sx={{ width: 24, height: 24, mr: 2 }}>
        {item.icon}
      </Box>

      <Box component="span">{item.title} </Box>
    </ListItemButton>
  );
}

NavItem.propTypes = {
  item: PropTypes.object,
};
