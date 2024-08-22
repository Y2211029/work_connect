import { forwardRef } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";

import "src/App.css";

import SvgColor from "src/components/svg-color";
import { postDateTimeDisplay } from "src/components/view/PostDatatime";

// import { alpha } from "@mui/material/styles";
// import { fDate } from "src/utils/format-time";
// import { fShortenNumber } from "src/utils/format-number";
// import Iconify from "src/components/iconify";

// ----------------------------------------------------------------------

const PostCard = forwardRef(({ post }, ref) => {
  const { movie_id, title, genre, intro, /* view, comment,*/ author, userName, createdAt } = post;

  // アイコン
  const renderAvatar = (
    <Avatar
      alt={author.name}
      src={author.avatarUrl}
      sx={{
        // position: "absolute",
        // bottom: (theme) => theme.spacing(0),
        zIndex: 9,
        // top: 45,
        // left: 20,
        width: 30,
        height: 30,
      }}
    />
  );

  // タイトル
  const renderTitle = (
    <Link
      to={`/VideoDetail/${movie_id}`}
      color="inherit"
      variant="subtitle2"
      underline="none" // デフォルトで下線を消す
      className="link"
      style={{
        height: 30,
        typography: "h5",
      }}
    >
      {title}
    </Link>
  );

  // ジャンル
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

  /* 投稿日 */
  const renderDate = (
    <Typography
      variant="caption"
      component="div"
      sx={{
        mb: 2,
        opacity: 0.48,
        color: "common.black",
      }}
    >
      {/* {fDate(createdAt, "yyyy MM dd")} */}
      {postDateTimeDisplay(createdAt)}
    </Typography>
  );
  /*  ユーザー名 */
  const renderUserName = (
    <Typography
      // キャプションは通常、小さいサイズで補足情報や注釈などを表示するために使われます。
      variant="caption"
      component="div"
      sx={{
        mb: 2,
        opacity: 0.48,
        color: "common.black",
      }}
    >
      {userName}
    </Typography>
  );

  /* 表示：ユーザー名、コメント数、閲覧数、投稿日 */
  const renderInfo = (
    // 素を垂直または水平方向に整列
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      spacing={1}
      sx={{
        mt: 3,
        // color: "text.disabled",
        color: "common.black",
        padding: "5px",
      }}
    >
      {/* 投稿時間 */}
      {renderDate}
      <Stack
        direction="row"
        justifyContent="flex-end"
        alignItems="center"
        spacing={1}
        sx={{
          mt: 3,
          // color: "text.disabled",
          color: "common.black",
        }}
      >
        {/* アイコン */}
        {renderAvatar}
        {/* ユーザーネーム */}
        {renderUserName}
      </Stack>
    </Stack>
  );

  {
    /* {[
    { number: comment, icon: "eva:message-circle-fill" },
    { number: view, icon: "eva:eye-fill" },
    ].map((info, _index) => (
      <Stack
      key={_index}
      direction="row"
      justifyContent="center"
      alignItems="center"
      spacing={1}
      sx={{
        opacity: 0.48,
        // color: "common.white",
        color: "common.black",
        }}
        >
        <Iconify width={16} icon={info.icon} sx={{ mr: 0.5 }} />
        <Typography variant="caption">{fShortenNumber(info.number)}</Typography>
        </Stack>
        ))} */
  }
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

  // アイコンのCSSを変更してる。
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

  // 動画紹介文
  const renderIntro = (
    <Typography
      //  variant="caption"、キャプションは通常、小さいサイズで補足情報や注釈などを表示するために使われます。
      variant="caption"
      component="div"
      sx={{
        mb: 2,
        opacity: 0.85,
        color: "common.black",
      }}
    >
      {intro}
    </Typography>
  );

  return (
    //XS(Extra small) 0px以上 画面サイズがスマホ並みに狭いとき
    //SM(Small) 600px以上
    //MD(Medium) 960px以上
    // グリッドは12分割されており、
    <Grid xs={12} sm={6} md={3}>
      <div ref={ref}>
        <Card>
          <Box
            sx={{
              padding: "5px 5px 5px 5px ",
            }}
          >
            {renderShape}
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
