import { forwardRef } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import Box from "@mui/material/Box";
<<<<<<< HEAD
import Button from "@mui/material/Button";
=======
>>>>>>> a8f81805d7881191f4c8b687c9cc54c98922b3f3
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
<<<<<<< HEAD
// ----------------------------------------------------------------------

const PostCard = forwardRef(({ post }, ref) => {
  const { work_id, genre, /* cover, */ title, intro, thumbnail, view, comment, author, userName, createdAt } = post;
=======

// ----------------------------------------------------------------------

const PostCard = forwardRef(({ post }, ref) => {
  const { work_id, genre, cover, title, intro, thumbnail, view, comment, author, userName, createdAt } = post;
>>>>>>> a8f81805d7881191f4c8b687c9cc54c98922b3f3

  const renderAvatar = (
    <Avatar
      alt={author.name}
      src={author.avatarUrl}
      sx={{
        position: "absolute",
<<<<<<< HEAD
        bottom: (theme) => theme.spacing(0),
        zIndex: 9,
        top: 45,
        left: 20,
=======
        bottom: (theme) => theme.spacing(-2),
        zIndex: 9,
        top: 24,
        left: 24,
>>>>>>> a8f81805d7881191f4c8b687c9cc54c98922b3f3
        width: 40,
        height: 40,
      }}
    />
  );

  // ジャンル
<<<<<<< HEAD
  const renderGenre =
    genre !== null ? (
      <div>
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
          {genre}
        </Button>
      </div>
    ) : null;
  const renderTitle = (
    <Link
      to={`/WorkDetail/${work_id}`}
      // color="inherit"
=======
  const renderGenre = genre !== null ? <Typography>{genre}</Typography> : null;

  const renderTitle = (
    <Link
      to={`/WorkDetail/${work_id}`}
      color="inherit"
>>>>>>> a8f81805d7881191f4c8b687c9cc54c98922b3f3
      variant="subtitle2"
      underline="none"
      className="link"
      style={{
<<<<<<< HEAD
        color: "common.black",
        height: 30,
        fontWeight: "Bold",
        padding: "5px",
=======
        height: 30,
        typography: "h5",
>>>>>>> a8f81805d7881191f4c8b687c9cc54c98922b3f3
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
<<<<<<< HEAD
        aspectRatio: 16 / 9,
        borderRadius: "10px",
        // width: 1,
        // height: 200,
        // objectFit: "cover",
        marginBottom: "10px",
=======
        width: 1,
        height: 200,
        objectFit: "cover",
>>>>>>> a8f81805d7881191f4c8b687c9cc54c98922b3f3
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
<<<<<<< HEAD
        // color: "common.white",
        color: "common.black",
=======
        color: "common.white",
>>>>>>> a8f81805d7881191f4c8b687c9cc54c98922b3f3
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
<<<<<<< HEAD
        // color: "text.disabled",
        color: "common.black",
=======
        color: "text.disabled",
>>>>>>> a8f81805d7881191f4c8b687c9cc54c98922b3f3
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
<<<<<<< HEAD
            // color: "common.white",
            color: "common.black",
=======
            color: "common.white",
>>>>>>> a8f81805d7881191f4c8b687c9cc54c98922b3f3
          }}
        >
          <Iconify width={16} icon={info.icon} sx={{ mr: 0.5 }} />
          <Typography variant="caption">{fShortenNumber(info.number)}</Typography>
        </Stack>
      ))}
      {renderDate}
    </Stack>
  );

<<<<<<< HEAD
  // const renderCover = (
  //   <Box
  //     component="img"
  //     alt={title}
  //     src={cover}
  //     sx={{
  //       top: 0,
  //       width: 1,
  //       height: 1,
  //       objectFit: "cover",
  //       position: "absolute",
  //     }}
  //   />
  // );
=======
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
>>>>>>> a8f81805d7881191f4c8b687c9cc54c98922b3f3

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
<<<<<<< HEAD
        // color: "common.white",
        color: "common.black",
=======
        color: "common.white",
>>>>>>> a8f81805d7881191f4c8b687c9cc54c98922b3f3
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
<<<<<<< HEAD
                bgcolor: (theme) => alpha(theme.palette.grey[900], 0.1),
              },
              pt: {
                sm: "calc(100% * 3 / 3)",
              },
              // "&:hover": {
              //   borderStyle: "1px",
              // },
=======
                bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
              },
              pt: {
                sm: "calc(100% * 3 / 4.66)",
              },
>>>>>>> a8f81805d7881191f4c8b687c9cc54c98922b3f3
            }}
          >
            {renderShape}
            {renderAvatar}
<<<<<<< HEAD
            {/* {renderCover} */}
          </Box>
          <Box
            sx={{
              p: (theme) => theme.spacing(1, 1, 2, 1),
=======
            {renderCover}
          </Box>
          <Box
            sx={{
              p: (theme) => theme.spacing(4, 3, 3, 3),
>>>>>>> a8f81805d7881191f4c8b687c9cc54c98922b3f3
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
