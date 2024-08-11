import { forwardRef } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useState } from "react";
import Box from "@mui/material/Box";
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
    cover,
    userName,
    graduationYear,
    schoolName,
    desiredWorkRegion,
    desiredOccupation,
    view,
    comment,
    author,
    followStatus: initialFollowStatus,
    id,
  } = post;

  const [followStatus, setFollowStatus] = useState(initialFollowStatus);
  const latestPostLarge = index === -1;

  const { getSessionData } = useSessionStorage();
  const accountData = getSessionData("accountData");
  const data = {
    account_id: accountData.id,
  };

  const handleFollowClick = async () => {
    try {
      const updatedFollowStatus = await follow(data.account_id, id);
      if (updatedFollowStatus) {
        setFollowStatus(updatedFollowStatus);
      }
    } catch (error) {
      console.error('フォロー処理中にエラーが発生しました！', error);
    }
  };

  const [followStatus, setFollowStatus] = useState(initialFollowStatus);
  const { getSessionData } = useSessionStorage();
  const accountData = getSessionData("accountData");
  const data = {
    account_id: accountData.id,
  };

  const handleFollowClick = async () => {
    try {
      const updatedFollowStatus = await follow(data.account_id, id);
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
  const renderGraduationYear = <Typography opacity="0.48">卒業年度:{graduationYear}</Typography>;
  const renderSchoolName = <Typography>学校名:{schoolName}</Typography>;
  const renderDesiredWorkRegion =
    desiredWorkRegion !== null ? <Typography>希望勤務地:{desiredWorkRegion}</Typography> : null;
  const renderDesiredOccupation =
    desiredOccupation !== null ? <Typography>希望職種: {desiredOccupation}</Typography> : null;

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

            {renderGraduationYear}

            {renderSchoolName}

            {renderDesiredWorkRegion}

            {renderDesiredOccupation}

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
