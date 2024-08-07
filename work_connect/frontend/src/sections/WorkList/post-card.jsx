import { forwardRef } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import { alpha } from "@mui/material/styles";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";

import "src/App.css";

import { fDate } from "src/utils/format-time";
import { fShortenNumber } from "src/utils/format-number";
import Iconify from "src/components/iconify";
import SvgColor from "src/components/svg-color";

// ----------------------------------------------------------------------

const PostCard = forwardRef(({ post }, ref) => {
  const { work_id, genre, cover, title, intro, thumbnail, view, comment, author, userName, createdAt } = post;

  const renderAvatar = (
    <Avatar
      alt={author.name}
      src={author.avatarUrl}
      sx={{
        position: "absolute",
        bottom: (theme) => theme.spacing(-2),
        zIndex: 9,
        top: 24,
        left: 24,
        width: 40,
        height: 40,
      }}
    />
  );

  // ジャンル
  const renderGenre = genre !== null ? <Typography>{genre}</Typography> : null;

  const renderTitle = (
    <Link
      to={`/WorkDetail/${work_id}`}
      color="inherit"
      variant="subtitle2"
      underline="none"
      className="link"
      style={{
        height: 30,
        typography: "h5",
      }}
    >
      {title}
    </Link>
  );

  const renderThumbnail = (
    <Box
      component="img"
      src={thumbnail}
      sx={{
        width: 1,
        height: 200,
        objectFit: "cover",
      }}
    />
  );

  const renderDate = (
    <Typography
      variant="caption"
      component="div"
      sx={{
        mb: 2,
        opacity: 0.48,
        color: "common.white",
      }}
    >
      {fDate(createdAt, "yyyy MM dd")}
    </Typography>
  );

  const renderUserName = (
    <Typography
      variant="caption"
      component="div"
      sx={{
        mb: 2,
        opacity: 0.48,
        color: "common.white",
      }}
    >
      {userName}
    </Typography>
  );

  const renderInfo = (
    <Stack
      direction="row"
      flexWrap="wrap"
      spacing={1.5}
      justifyContent="center"
      sx={{
        mt: 3,
        color: "text.disabled",
      }}
    >
      {renderUserName}
      {[
        { number: comment, icon: "eva:message-circle-fill" },
        { number: view, icon: "eva:eye-fill" },
      ].map((info, _index) => (
        <Stack
          key={_index}
          direction="row"
          sx={{
            opacity: 0.48,
            color: "common.white",
          }}
        >
          <Iconify width={16} icon={info.icon} sx={{ mr: 0.5 }} />
          <Typography variant="caption">{fShortenNumber(info.number)}</Typography>
        </Stack>
      ))}
      {renderDate}
    </Stack>
  );

  const renderCover = (
    <Box
      component="img"
      alt={title}
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
        display: "none",
      }}
    />
  );

  const renderIntro = (
    <Typography
      variant="caption"
      component="div"
      sx={{
        mb: 2,
        opacity: 0.85,
        color: "common.white",
      }}
    >
      {intro}
    </Typography>
  );

  return (
    <Grid xs={12} sm={6} md={4}>
      <div ref={ref}>
        <Card>
          <Box
            sx={{
              position: "relative",
              "&:after": {
                top: 0,
                content: "''",
                width: "100%",
                height: "100%",
                position: "absolute",
                bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
              },
              pt: {
                sm: "calc(100% * 3 / 4.66)",
              },
            }}
          >
            {renderShape}
            {renderAvatar}
            {renderCover}
          </Box>
          <Box
            sx={{
              p: (theme) => theme.spacing(4, 3, 3, 3),
              width: 1,
              bottom: 0,
              position: "absolute",
            }}
          >
            {renderThumbnail}
            {renderGenre}
            {renderTitle}
            {renderIntro}
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
};

export default PostCard;
