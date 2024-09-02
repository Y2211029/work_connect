<<<<<<< HEAD
=======
<<<<<<< HEAD
import PropTypes from "prop-types";

import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
// import { alpha } from "@mui/material/styles";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";

// import { fDate } from "src/utils/format-time";

import { fShortenNumber } from "src/utils/format-number";

import Iconify from "src/components/iconify";
import SvgColor from "src/components/svg-color";

// ----------------------------------------------------------------------

export default function PostCard({ post, index }) {
  const { cover, title, selectedOccupation, prefecture, view, comment, author } = post;

  const latestPostLarge = index === -1;

  // const latestPost = index === 1 || index === 2;

  const renderAvatar = (
    <Avatar
      // alt={author.name}
      src={author.avatarUrl}
      sx={{
        zIndex: 9,
        width: 32,
        height: 32,
        position: "absolute",
        left: (theme) => theme.spacing(3),
        bottom: (theme) => theme.spacing(-2),
        // ...((latestPostLarge || latestPost) && {
        //   zIndex: 9,
        //   top: 24,
        //   left: 24,
        //   width: 40,
        //   height: 40,
        // }),
      }}
    />
  );

  const renderTitle = (
    <Link
      color="inherit"
      variant="subtitle2"
      underline="hover"
      sx={{
        height: 44,
        overflow: "hidden",
        WebkitLineClamp: 2,
        display: "-webkit-box",
        WebkitBoxOrient: "vertical",
        // ...(latestPostLarge && { typography: "h5", height: 60 }),
        // ...((latestPostLarge || latestPost) && {
        //   color: "common.white",
        // }),
      }}
    >
      {title}
    </Link>
  );

  // 募集職種
  const renderSelectedOccupation = selectedOccupation !== null ? <Typography opacity="0.48">募集職種: {selectedOccupation}</Typography> : null;

  // 勤務地
  const renderPrefecture = prefecture !== null ? <Typography opacity="0.48">勤務地: {prefecture}</Typography> : null;

  const renderInfo = (
    <Stack
      direction="row"
      flexWrap="wrap"
      spacing={1.5}
      justifyContent="flex-end"
      sx={{
        mt: 3,
        color: "text.disabled",
      }}
    >
      {[
        { number: comment, icon: "eva:message-circle-fill" },
        { number: view, icon: "eva:eye-fill" },
        // { number: share, icon: "eva:share-fill" },
      ].map((info, _index) => (
        <Stack
          key={_index}
          direction="row"
          sx={
            {
              // ...((latestPostLarge || latestPost) && {
              //   opacity: 0.48,
              //   color: "common.white",
              // }),
            }
          }
        >
          <Iconify width={16} icon={info.icon} sx={{ mr: 0.5 }} />
          <Typography variant="caption">{fShortenNumber(info.number)}</Typography>
        </Stack>
      ))}
    </Stack>
  );

  const renderCover = (
    <Box
      component="img"
      // alt={title}
      src={cover}
      sx={{
        top: 0,
        width: 1,
        height: 1,
        objectFit: "cover",
        position: "absolute",
      }}
    />
  );

  // const renderDate = (
  //   <Typography
  //     variant="caption"
  //     component="div"
  //     sx={{
  //       mb: 2,
  //       color: "text.disabled",
  //       ...((latestPostLarge || latestPost) && {
  //         opacity: 0.48,
  //         color: "common.white",
  //       }),
  //     }}
  //   >
  //     {fDate(createdAt, "yyyy MM dd")}
  //   </Typography>
  // );

  const renderShape = (
    <SvgColor
      color="paper"
      src="/assets/icons/shape-avatar.svg"
      sx={{
        width: 80,
        height: 36,
        zIndex: 9,
        bottom: -15,
        position: "absolute",
        color: "background.paper",
        // ...((latestPostLarge || latestPost) && { display: "none" }),
      }}
    />
  );

  return (
    <Grid xs={12} sm={latestPostLarge ? 12 : 6} md={latestPostLarge ? 6 : 3}>
      <Card>
        <Box
          sx={{
            position: "relative",
            pt: "calc(100% * 3 / 4)",
            // ...((latestPostLarge || latestPost) && {
            //   pt: "calc(100% * 4 / 3)",
            //   "&:after": {
            //     top: 0,
            //     content: "''",
            //     width: "100%",
            //     height: "100%",
            //     position: "absolute",
            //     bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
            //   },
            // }),
            // ...(latestPostLarge && {
            //   pt: {
            //     xs: "calc(100% * 4 / 3)",
            //     sm: "calc(100% * 3 / 4.66)",
            //   },
            // }),
          }}
        >
          {renderShape}

          {renderAvatar}

          {renderCover}
        </Box>

        <Box
          sx={{
            p: (theme) => theme.spacing(4, 3, 3, 3),
            // ...((latestPostLarge || latestPost) && {
            //   width: 1,
            //   bottom: 0,
            //   position: "absolute",
            // }),
          }}
        >
          {renderTitle}

          {renderSelectedOccupation}

          {renderPrefecture}

          {renderInfo}
        </Box>
      </Card>
    </Grid>
  );
}

PostCard.propTypes = {
  post: PropTypes.object.isRequired,
  index: PropTypes.number,
};
=======
>>>>>>> a8f81805d7881191f4c8b687c9cc54c98922b3f3
import { useEffect, useState } from "react";
import { forwardRef } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
// import { alpa } from "@mui/material/styles";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";
import { follow } from "src/_mock/follow";
import { fShortenNumber } from "src/utils/format-number";
import Iconify from "src/components/iconify";
import SvgColor from "src/components/svg-color";
import { useSessionStorage } from "src/hooks/use-sessionStorage";
// ----------------------------------------------------------------------

const PostCard = forwardRef(({ post, index }, ref) => {
  const {
    company_id,
    userName,
    selectedOccupation,
    prefecture,
    cover,
    // createdAt,
    view,
    comment,
    // favorite,
    author,
    followStatus: initialFollowStatus,
  } = post;

  const [followStatus, setFollowStatus] = useState(initialFollowStatus);
  // const navigate = useNavigate();
  const latestPostLarge = index === -1;

  // const [followStatus, setFollowStatus] = useState(initialFollowStatus);
  const { getSessionData } = useSessionStorage();
  const accountData = getSessionData("accountData");
  const data = {
    account_id: accountData.id,
  };

  useEffect(() => {
    console.log("company_id", company_id);
  }, [company_id]);

  const handleFollowClick = async () => {
    try {
      const updatedFollowStatus = await follow(data.account_id, company_id);
      if (updatedFollowStatus) {
        setFollowStatus(updatedFollowStatus);
      }
    } catch (error) {
      console.error("フォロー処理中にエラーが発生しました！", error);
    }
  };

  const renderAvatar = (
    <Avatar
      alt={author.name}
      src={author.avatarUrl}
      sx={{
        zIndex: 9,
        width: 32,
        height: 32,
        position: "absolute",
        left: (theme) => theme.spacing(3),
        bottom: (theme) => theme.spacing(-2),
      }}
    />
  );

  const renderUserName = (
    <Link
      to={`/Profile/${userName}`}
      color="inherit"
      variant="subtitle2"
      underline="hover"
      sx={{
        overflow: "hidden",
        WebkitLineClamp: 2,
        display: "-webkit-box",
        WebkitBoxOrient: "vertical",
        typography: "h5",
        height: 60,
      }}
    >
      {userName}
    </Link>
  );

  const renderFollow = (
    <Typography opacity="0.48" onClick={handleFollowClick}>
      {followStatus}
    </Typography>
  );

  // 募集職種
  const renderSelectedOccupation =
    selectedOccupation !== null ? (
      <div>
        募集職種:
        <Button
          variant="contained"
          // color="primary"
          sx={{
            padding: "2px",
            margin: "2px",
            // background: "#41A4FF",
            background: "linear-gradient(#41A4FF, #9198e5)",
            "&:hover": {
              background: "linear-gradient(#c2c2c2, #e5ad91)",
            },
          }}
        >
          {selectedOccupation}
        </Button>
      </div>
    ) : null;

  // 勤務地
  const renderPrefecture =
    prefecture !== null ? (
      <div>
        勤務地:
        <Button
          variant="contained"
          // color="primary"
          sx={{
            padding: "2px",
            margin: "2px",
            // background: "#41A4FF",
            background: "linear-gradient(#41A4FF, #9198e5)",
            "&:hover": {
              background: "linear-gradient(#c2c2c2, #e5ad91)",
            },
          }}
        >
          {prefecture}
        </Button>
      </div>
    ) : null;

  const renderInfo = (
    <Stack
      direction="row"
      flexWrap="wrap"
      spacing={1.5}
      justifyContent="flex-end"
      sx={{
        mt: 3,
        color: "text.disabled",
      }}
    >
      {[
        { number: comment, icon: "eva:message-circle-fill" },
        { number: view, icon: "eva:eye-fill" },
        // { number: share, icon: "eva:share-fill" },
      ].map((info, _index) => (
        <Stack key={_index} direction="row">
          <Iconify width={16} icon={info.icon} sx={{ mr: 0.5 }} />
          <Typography variant="caption">{fShortenNumber(info.number)}</Typography>
        </Stack>
      ))}
    </Stack>
  );

  const renderCover = (
    <Box
      component="img"
      // altをアンコメント（コメントアウトの逆のこと）をするとアイコンの上に名前が表示されてしまうので注意
      // alt={title}
      src={cover}
      sx={{
        top: 0,
        width: 1,
        height: 1,
        objectFit: "cover",
        position: "absolute",
      }}
    />
  );

  // const renderDate = (
  //   <Typography
  //     variant="caption"
  //     component="div"
  //     sx={{
  //       mb: 2,
  //       color: "text.disabled",
  //     }}
  //   >
  //     {fDate(createdAt, "yyyy MM dd")}
  //   </Typography>
  // );

  const renderShape = (
    <SvgColor
      color="paper"
      src="/assets/icons/shape-avatar.svg"
      sx={{
        width: 80,
        height: 36,
        zIndex: 9,
        bottom: -15,
        position: "absolute",
        color: "background.paper",
      }}
    />
  );

  return (
    <Grid xs={12} sm={latestPostLarge ? 12 : 6} md={latestPostLarge ? 6 : 3}>
      <div ref={ref}>
        <Card>
          <Box
            sx={{
              position: "relative",
              pt: "calc(100% * 3 / 4)",
            }}
          >
            {renderShape}

            {renderAvatar}

            {renderCover}
          </Box>

          <Box
            sx={{
              p: (theme) => theme.spacing(4, 3, 3, 3),
            }}
          >
            {renderFollow}

            {renderUserName}

            {renderSelectedOccupation}

            {renderPrefecture}

            {renderInfo}
          </Box>
        </Card>
      </div>
    </Grid>
  );
});

// `displayName` の追加
PostCard.displayName = "PostCard";

PostCard.propTypes = {
  post: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
};

export default PostCard;
<<<<<<< HEAD
=======
>>>>>>> 1251a7d83d65dbd03393e8f4b952d240f5d5c002
>>>>>>> a8f81805d7881191f4c8b687c9cc54c98922b3f3
