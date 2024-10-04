import { forwardRef, /*useEffect, /*useState*/ } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

import SvgColor from "src/components/svg-color";
import { postDateTimeDisplay } from "src/components/view/PostDatatime";

// ----------------------------------------------------------------------

const PostCard = forwardRef(({ post }, ref) => {
  const { work_id, genre, thumbnail, icon, /* cover, */ title, intro,  /*view, comment,*/ author, userName, createdAt } = post;



  const renderThumbnail = (
    <Box
      component="img"
      src={thumbnail}
      sx={{
        aspectRatio: 16 / 9,
        borderRadius: "10px",
        width: "100%",
        // height: 200,
        objectFit: "cover",
        marginBottom: "10px",
      }}
    />
  );

  // アイコン
  const renderAvatar = (
    <Avatar
      alt={author.name}
      src={icon ? `http://localhost:8000/storage/images/userIcon/${icon}` : author.avatarUrl}
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
      to={`/WorkDetail/${work_id}`}
      // color="inherit"
      variant="subtitle2"
      underline="none"
      className="link item-Link"
    >
      {title}
    </Link>
  );

  // ジャンル
  const renderGenre =
    genre !== null ? (
      <div>
        {genre}
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
        fontSize: "12px"
      }}
    >
      {/* {fDate(createdAt, "yyyy MM dd")} */}
      {postDateTimeDisplay(createdAt)}
    </Typography>
  );

  const renderUserName = (
    <Typography
      variant="caption"
      component="div"
      sx={{
        mb: 2,
        opacity: 0.48,
        // color: "common.white",
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
        paddingTop: "10px",
        width: "100%",
        margin: "0px",
      }}
    >
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
        {renderAvatar}
        {renderUserName}
      </Stack>
    </Stack>
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
        fontSize: "12px",
        color: "common.black",
        margin: "0px",
        overflowWrap: "anywhere",
      }}
    >
      {intro}
    </Typography>
  );

  return (
    <div ref={ref} >
      <Stack sx={{ display: "inline-block" }}>
        <div className="postCard" style={{ width: '100%' }}>
          {renderShape}
          {renderThumbnail}
          {renderTitle}
          <div style={{ borderBottom: "1px solid #bbb", margin: "5px 0px 10px 0px" }}></div>
          {renderIntro}
          {/* <div style={{ borderBottom: "1px solid #bbb", margin: "10px 0px 5px 0px" }}></div> */}
          {renderGenre}
          <div style={{ borderBottom: "1px solid #bbb", margin: "10px 0px 5px 0px" }}></div>
          {renderInfo}
        </div>
      </Stack >
    </div >
  );
});

// `displayName` の追加
PostCard.displayName = "PostCard";

PostCard.propTypes = {
  post: PropTypes.object.isRequired,
};

export default PostCard;