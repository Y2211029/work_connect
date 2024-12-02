import { forwardRef } from "react";
import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

import { postDateTimeDisplay } from "src/components/view/PostDatatime";
import Divider from "@mui/material/Divider";

import EditButtons from "src/components/Edit/EditButtons";

// ----------------------------------------------------------------------

const PostCard = forwardRef(({ post }, ref) => {
  const { movie_id, movie, icon, title, genre, intro, author, userName, createdAt } = post;
  const myProfileURL = useLocation();
  const isNotMyProfile = myProfileURL.pathname != "/Profile/" + userName;

  // youtube iframe
  const renderMovie = movie !== null && (
    <Box
      component="img"
      src={`https://img.youtube.com/vi/${movie}/mqdefault.jpg`}
      sx={{
        aspectRatio: 16 / 9,
        borderRadius: "5px",
        width: "100%",
        objectFit: "cover",
        marginBottom: "10px",
      }}
    />
  );

  // アイコン
  const renderAvatar = icon !== null && (
    <Avatar
      alt={author.name}
      src={icon ? `http://localhost:8000/storage/images/userIcon/${icon}` : author.avatarUrl}
      sx={{
        zIndex: 9,
        width: 30,
        height: 30,
      }}
    />
  );

  // タイトル
  const renderTitle = title !== null && title;

  // ジャンル
  const renderGenre = genre !== null ? <div>{genre}</div> : null;

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
      {postDateTimeDisplay(createdAt)}
    </Typography>
  );
  /*  ユーザー名 */
  const renderUserName = userName !== null && (
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
  const renderInfo = renderDate !== null && renderAvatar !== null && renderUserName !== null && (
    // 素を垂直または水平方向に整列
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      spacing={1}
      sx={{
        mt: 3,
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
          color: "common.black",
        }}
      >
        {isNotMyProfile ? renderAvatar : <EditButtons videoId={movie_id}/>}
        {isNotMyProfile ? renderUserName : null}
      </Stack>
    </Stack>
  );

  // 動画紹介文
  const renderIntro = (
    <Typography
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

  const renderItems = (
    <div ref={ref}>
      <Link to={`/VideoDetail/${movie_id}`} variant="subtitle2" underline="none" className="link item-Link">
        <Stack sx={{ display: "inline-block", width: "100%" }}>
          <div className="postCard item-stack" style={{ width: "100%" }}>
            {renderMovie}
            {renderTitle}
            <Divider sx={{ borderStyle: "dashed", display: "block", margin: "10px 0px 0px 0px" }} />
            {renderGenre}
            <Divider sx={{ borderStyle: "dashed", display: "block", margin: "5px 0px" }} />
            {renderIntro}
            <Divider sx={{ borderStyle: "dashed", display: "block", margin: "10px 0px 5px 0px" }} />
            {renderInfo}
          </div>
        </Stack>
      </Link>
    </div>
  );
  const renderEditItems = (
    <div ref={ref}>
      <Stack sx={{ display: "inline-block", width: "100%" }}>
        <div className="postCard item-stack" style={{ width: "100%" }}>
          <Link to={`/VideoDetail/${movie_id}`} variant="subtitle2" underline="none" className="link item-Link">
            {renderMovie}
            {renderTitle}
            <Divider sx={{ borderStyle: "dashed", display: "block", margin: "10px 0px 0px 0px" }} />
            {renderGenre}
            <Divider sx={{ borderStyle: "dashed", display: "block", margin: "5px 0px" }} />
            {renderIntro}
            <Divider sx={{ borderStyle: "dashed", display: "block", margin: "10px 0px 5px 0px" }} />
          </Link>
          {renderInfo}
        </div>
      </Stack>
    </div>
  );

  return isNotMyProfile ? renderItems : renderEditItems;
});

PostCard.displayName = "PostCard";
PostCard.propTypes = {
  post: PropTypes.object.isRequired,
};

export default PostCard;