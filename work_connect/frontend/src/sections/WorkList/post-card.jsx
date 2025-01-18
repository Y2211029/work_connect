import { forwardRef } from "react";
import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

import SvgColor from "src/components/svg-color";
import { postDateTimeDisplay } from "src/components/view/PostDatatime";
import Divider from "@mui/material/Divider";
import { UseCreateTagbutton } from "src/hooks/use-createTagbutton";
import EditButtons from "src/components/Edit/EditButtons";
// ----------------------------------------------------------------------

const PostCard = forwardRef((props, ref) => {
  const {
    works: { work_id, work_genre, thumbnail, youtube_url, icon, work_name, work_intro, user_name, created_at },
  } = props;

  const { tagCreate } = UseCreateTagbutton();

  const myProfileURL = useLocation();
  const isNotMyProfile = myProfileURL.pathname != "/Profile/" + user_name;

  const alternativeImage = "http://localhost:8000/storage/images/work/NoImage.png";

  const renderThumbnail =
    // Youtube動画がある場合
    youtube_url !== null ? (
      <Box
        component="div"
        onError={(e) => {
          e.target.src = alternativeImage; // エラー時にサンプル画像をセット
        }}
        sx={{
          position: "relative",
          width: "100%",
          aspectRatio: "16 / 9",
          overflow: "hidden",
          cursor: "pointer",
        }}
      >
        <Box
          component="img"
          src={`https://img.youtube.com/vi/${youtube_url}/hqdefault.jpg`} //サムネイル画像                        >
          alt="youTube Thumbnail"
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </Box>
    ) : (
      // 画像だけ
      <>
        <Box
          component="img"
          src={thumbnail}
          onError={(e) => {
            e.target.src = alternativeImage; // エラー時にサンプル画像をセット
          }}
          sx={{
            aspectRatio: 16 / 9,
            borderRadius: "5px",
            width: "100%",
            objectFit: "cover",
            marginBottom: "10px",
          }}
        />
      </>
    );

  // アイコン
  const renderAvatar = (
    <Avatar
      src={icon ? `http://localhost:8000/storage/images/userIcon/${icon}` : "/assets/images/avatars/avatar_0.jpg"}
      sx={{
        zIndex: 9,
        width: 30,
        height: 30,
      }}
    />
  );

  // タイトル
  const renderTitle = work_name && work_name;

  // ジャンル
  const renderGenre = work_genre !== null && <div style={{ margin: "10px 0px 10px 0px" }}>{tagCreate(work_genre)}</div>;

  /* 投稿日 */
  const renderDate = (
    <Typography
      variant="caption"
      component="div"
      sx={{
        mb: 2,
        opacity: 0.48,
        color: "common.black",
        fontSize: "12px",
      }}
    >
      {postDateTimeDisplay(created_at)}
    </Typography>
  );

  const renderUserName = (
    <Typography
      variant="caption"
      component="div"
      sx={{
        mb: 2,
        opacity: 0.48,
        color: "common.black",
      }}
    >
      {user_name}
    </Typography>
  );

  const renderInfo = (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      spacing={1}
      sx={{
        mt: 3,
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
          color: "common.black",
        }}
      >
        {isNotMyProfile ? renderAvatar : <EditButtons deleteId={work_id} />}
        {isNotMyProfile ? renderUserName : null}
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
      {work_intro}
    </Typography>
  );

  const renderItems = (
    <div ref={ref}>
      <Link to={`/WorkDetail/${work_id}`} variant="subtitle2" underline="none" className="link item-Link">
        <Stack sx={{ display: "inline-block", width: "100%" }}>
          <div className="postCard item-stack" style={{ width: "100%" }}>
            {renderShape}
            {renderThumbnail}
            {renderTitle}
            <Divider sx={{ borderStyle: "dashed", display: "block", margin: "10px 0px 0px 0px" }} />
            {renderGenre}
            <Divider sx={{ borderStyle: "dashed", display: "block", margin: "0px 0px 5px 0px" }} />
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
          <Link to={`/WorkDetail/${work_id}`} variant="subtitle2" underline="none" className="link item-Link">
            {renderShape}
            {renderThumbnail}
            {renderTitle}
            <Divider sx={{ borderStyle: "dashed", display: "block", margin: "10px 0px 0px 0px" }} />
            {renderGenre}
            <Divider sx={{ borderStyle: "dashed", display: "block", margin: "0px 0px 5px 0px" }} />
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
  works: PropTypes.object.isRequired,
};

export default PostCard;
