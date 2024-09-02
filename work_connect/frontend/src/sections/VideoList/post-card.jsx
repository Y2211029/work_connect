<<<<<<< HEAD
import { forwardRef } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
=======
import { Link } from "react-router-dom";
import "src/App.css";
import PropTypes from "prop-types";

import Box from "@mui/material/Box";
>>>>>>> a8f81805d7881191f4c8b687c9cc54c98922b3f3
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import { alpha } from "@mui/material/styles";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";

<<<<<<< HEAD
import "src/App.css";

=======
>>>>>>> a8f81805d7881191f4c8b687c9cc54c98922b3f3
import { fDate } from "src/utils/format-time";
import { fShortenNumber } from "src/utils/format-number";

import Iconify from "src/components/iconify";
import SvgColor from "src/components/svg-color";

// ----------------------------------------------------------------------

<<<<<<< HEAD
const PostCard = forwardRef(({ post }, ref) => {
  const { movie_id, title, genre, intro, view, comment, author, userName, createdAt } = post;
=======
export default function PostCard({ post /*index*/ }) {
  const { id, cover, title, genre, intro, thumbnail, view, comment, author, userName, createdAt } = post;
>>>>>>> a8f81805d7881191f4c8b687c9cc54c98922b3f3

  // const latestPostLarge = index === -1;

  // const latestPost = index === 1 || index === 2;

  // アイコン
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

  // タイトル
  const renderTitle = (
    <Link
<<<<<<< HEAD
      to={`/VideoDetail/${movie_id}`}
=======
      to={`/VideoDetail/${id}`}
>>>>>>> a8f81805d7881191f4c8b687c9cc54c98922b3f3
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
=======
  const renderGenre = genre !== null ? <Typography>{genre}</Typography> : null;

  // サムネイル
  const renderThumbnail = <img src={thumbnail} alt="" width="100%" height="100" />;
>>>>>>> a8f81805d7881191f4c8b687c9cc54c98922b3f3

  /* 投稿日 */
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

  /*  ユーザー名 */
  const renderUserName = (
    <Typography
      // キャプションは通常、小さいサイズで補足情報や注釈などを表示するために使われます。
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

  /* 表示：ユーザー名、コメント数、閲覧数、投稿日 */
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
      {/* 学生名前 */}
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
          {/* コメント数 */}
          <Iconify width={16} icon={info.icon} sx={{ mr: 0.5 }} />

          {/* 閲覧数 */}
          <Typography variant="caption">{fShortenNumber(info.number)}</Typography>
        </Stack>
      ))}

      {/* 投稿日 */}
      {renderDate}
    </Stack>
  );

<<<<<<< HEAD
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
        color: "common.white",
      }}
    >
      {intro}
    </Typography>
  );

  return (
    <Grid xs={12} sm={6} md={4}>
<<<<<<< HEAD
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
          </Box>
          <Box
            sx={{
              p: (theme) => theme.spacing(4, 3, 3, 3),
              width: 1,
              bottom: 0,
              position: "absolute",
            }}
          >
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
=======
      {/* // <Grid xs={12} sm={latestPostLarge ? 12 : 6} md={latestPostLarge ? 6 : 3}> */}
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
              // xs: "calc(100% * 4 / 3)",
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
            // ...((latestPostLarge || latestPost) && {
            width: 1,
            bottom: 0,
            position: "absolute",
            // }),
          }}
        >
          {renderThumbnail}
          {renderGenre}
          {renderTitle}
          {/* ここに紹介文配置、配置語にこのコメントを削除する */}
          {renderIntro}
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
>>>>>>> a8f81805d7881191f4c8b687c9cc54c98922b3f3
