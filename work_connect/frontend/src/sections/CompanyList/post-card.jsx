import { useEffect, useState } from "react";
import { forwardRef } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
<<<<<<< HEAD
// import { alpha } from "@mui/material/styles";
import { follow } from "src/_mock/follow";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";
import { useSessionStorage } from "src/hooks/use-sessionStorage";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// import { fDate } from "src/utils/format-time";

=======
// import { alpa } from "@mui/material/styles";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";
import { follow } from "src/_mock/follow";
>>>>>>> b1cb22e56087783203dace346729860a7372dce3
import { fShortenNumber } from "src/utils/format-number";
import Iconify from "src/components/iconify";
import SvgColor from "src/components/svg-color";
import { useSessionStorage } from "src/hooks/use-sessionStorage";
// ----------------------------------------------------------------------

<<<<<<< HEAD
export default function PostCard({ post, index }) {
  const { cover, title, selectedOccupation, prefecture, view, comment, author,followStatus:initialFollowStatus,id } = post;
=======
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
>>>>>>> b1cb22e56087783203dace346729860a7372dce3

  const [followStatus, setFollowStatus] = useState(initialFollowStatus);
  const navigate = useNavigate();
  const latestPostLarge = index === -1;

<<<<<<< HEAD
=======
  const [followStatus, setFollowStatus] = useState(initialFollowStatus);
>>>>>>> b1cb22e56087783203dace346729860a7372dce3
  const { getSessionData } = useSessionStorage();
  const accountData = getSessionData("accountData");
  const data = {
    account_id: accountData.id,
  };

<<<<<<< HEAD
  const handleFollowClick = async () => {
    try {
      const updatedFollowStatus = await follow(data.account_id, id);
=======
  useEffect(() => {
    console.log("company_id", company_id);
  }, [company_id]);

  const handleFollowClick = async () => {
    try {
      const updatedFollowStatus = await follow(data.account_id, company_id);
>>>>>>> b1cb22e56087783203dace346729860a7372dce3
      if (updatedFollowStatus) {
        setFollowStatus(updatedFollowStatus);
      }
    } catch (error) {
<<<<<<< HEAD
      console.error('フォロー処理中にエラーが発生しました！', error);
    }
  };

  const renderFollow = () => {
    if (followStatus === "フォローできません") {
      return (
        <Typography opacity="0.48">
        </Typography>
      );
    } else {
      return (
        <Typography opacity="0.48" onClick={handleFollowClick}>
          {followStatus}
        </Typography>
      );
    }
  };

  const handleProfileJump = () => {
    navigate(`/Profile/${title}`);
  }


  // const latestPost = index === 1 || index === 2;
=======
      console.error("フォロー処理中にエラーが発生しました！", error);
    }
  };
>>>>>>> b1cb22e56087783203dace346729860a7372dce3

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

<<<<<<< HEAD

  const renderTitle = (
    <Link
      onClick={handleProfileJump}
=======
  const renderUserName = (
    <Link
      to={`/Profile/${userName}`}
>>>>>>> b1cb22e56087783203dace346729860a7372dce3
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

<<<<<<< HEAD
=======
  const renderFollow = (
    <Typography opacity="0.48" onClick={handleFollowClick}>
      {followStatus}
    </Typography>
  );
>>>>>>> b1cb22e56087783203dace346729860a7372dce3

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

<<<<<<< HEAD
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

          <div>
          {renderFollow()}
          </div>

          {renderTitle}
=======
            {renderCover}
          </Box>

          <Box
            sx={{
              p: (theme) => theme.spacing(4, 3, 3, 3),
            }}
          >
            {renderFollow}
>>>>>>> b1cb22e56087783203dace346729860a7372dce3

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
