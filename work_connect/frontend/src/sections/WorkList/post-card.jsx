import PropTypes from "prop-types";

import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import { alpha } from "@mui/material/styles";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";

import { fDate } from "src/utils/format-time";
import { fShortenNumber } from "src/utils/format-number";

import Iconify from "src/components/iconify";
import SvgColor from "src/components/svg-color";

// ----------------------------------------------------------------------

export default function PostCard({ post, index }) {
  const { cover, title, genre, intro, thumbnail, view, comment, author, userName, createdAt } = post;

  const latestPostLarge = index === 0;

  const latestPost = index === 1 || index === 2;

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
      color="inherit"
      variant="subtitle2"
      underline="hover"
      sx={{
        height: 44,
        overflow: "hidden",
        WebkitLineClamp: 2,
        display: "-webkit-box",
        WebkitBoxOrient: "vertical",
        typography: "h5",
        color: "common.white",
      }}
    >
      {title}
    </Link>
  );

  // ジャンル
  const renderGenre = genre !== null ? <Typography>{genre}</Typography> : null;

  // サムネイル
  const renderThumbnail = <img src={thumbnail} alt="" width="100%" height="100" />;

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
    <Grid xs={12} sm={latestPostLarge ? 12 : 6} md={latestPostLarge ? 6 : 3}>
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
              xs: "calc(100% * 4 / 3)",
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
            ...((latestPostLarge || latestPost) && {
              width: 1,
              bottom: 0,
              position: "absolute",
            }),
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
