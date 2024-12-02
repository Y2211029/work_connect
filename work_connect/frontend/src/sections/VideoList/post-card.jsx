import { forwardRef, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditNoteIcon from "@mui/icons-material/EditNote";
import Tooltip from "@mui/material/Tooltip";
import Popover from "@mui/material/Popover";

import SvgColor from "src/components/svg-color";
import { postDateTimeDisplay } from "src/components/view/PostDatatime";
import Divider from "@mui/material/Divider";
// ----------------------------------------------------------------------

const PostCard = forwardRef(({ post }, ref) => {
  const myProfileURL = useLocation();
  const {
    movie_id,
    movie,
    icon,
    title,
    genre,
    intro,
    /* view, comment,*/ author,
    userName,
    createdAt,
  } = post;
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [open, setOpen] = useState(false);
  // マイページの作品を参照している際は編集（・・・）ボタンを表示。
  const isNotMyProfile = myProfileURL.pathname != "/Profile/" + userName;
  const navigate = useNavigate();
  // const opts = {
  //   height: "100%",
  //   width: "100%",
  //   playerVars: {
  //     modestbranding: 0,
  //     controls: 0,
  //     iv_load_policy: 3,
  //   },
  // };

  const handleButtonClick = (e, action) => {
    if (action == "edit") {
      // 作品編集
      navigate("/VideoEdit", {state:{movie_id}});
    } else if (action == "delete") {
      // 削除
      navigate("/VideoList");
    }

    if (open) {
      console.log("open", open);
      setOpen(false);
    } else {
      console.log("open", open);
      setOpen(true);
    }

    e.preventDefault(); // これでリンクの遷移を防ぐ
    // 他の処理（例: ボタンのクリック時に実行したい処理）をここに書く
  };

  useEffect(() => {
    console.log("isPopoverOpen", isPopoverOpen);
  }, [isPopoverOpen]);

  // youtube iframe
  const renderMovie = (
    // <YouTube videoId={movie} opts={opts} />
    // <img style={{ borderRadius: "10px" }} src={`https://img.youtube.com/vi/${movie}/mqdefault.jpg`} alt="サンプル動画" width="100%" height="auto" />
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
  const renderAvatar = (
    <Avatar
      alt={author.name}
      src={
        icon
          ? `http://localhost:8000/storage/images/userIcon/${icon}`
          : author.avatarUrl
      }
      sx={{
        zIndex: 9,
        width: 30,
        height: 30,
      }}
    />
  );

  // タイトル
  const renderTitle = title && title;

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
        {/* 編集とゴミ箱 */}
        {isNotMyProfile ? (
          renderAvatar
        ) : (
          <>
            <Button
              /*ref={buttonRef}*/ onClick={(e) => handleButtonClick(e, "")}
            >
              <MoreVertIcon color="action" />
            </Button>
            <Popover
              open={open}
              anchorOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              onClose={() => setIsPopoverOpen(false)}
            >
              <div className="button-container">
                <Tooltip title="編集">
                  <Button onClick={(e) => handleButtonClick(e, "edit")}>
                    <EditNoteIcon color="action" />
                  </Button>
                </Tooltip>
                <Tooltip title="削除">
                  <Button onClick={(e) => handleButtonClick(e, "delete")}>
                    <DeleteIcon sx={{ color: "red" }} />
                  </Button>
                </Tooltip>
              </div>
            </Popover>
          </>
        )}
        {/* ユーザーネーム */}
        {isNotMyProfile ? renderUserName : null}
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
    <div ref={ref}>
      <Link
        to={`/VideoDetail/${movie_id}`}
        variant="subtitle2"
        underline="none"
        className="link item-Link"
      >
        <Stack sx={{ display: "inline-block", width: "100%" }}>
          <div className="postCard item-stack" style={{ width: "100%" }}>
            {renderShape}
            {renderMovie}
            {renderTitle}
            {/* <div style={{ borderBottom: "1px solid #bbb", margin: "5px 0px 10px 0px" }}></div> */}
            <Divider
              sx={{
                borderStyle: "dashed",
                display: "block",
                margin: "10px 0px 0px 0px",
              }}
            />
            {renderIntro}
            {/* <div style={{ borderBottom: "1px solid #bbb", margin: "10px 0px 5px 0px" }}></div> */}
            {renderGenre}
            <Divider
              sx={{
                borderStyle: "dashed",
                display: "block",
                margin: "10px 0px 0px 0px",
              }}
            />
            {/* <div style={{ borderBottom: "1px solid #bbb", margin: "10px 0px 5px 0px" }}></div> */}
            {renderInfo}
          </div>
        </Stack>
      </Link>
    </div>
  );
});

// `displayName` の追加
PostCard.displayName = "PostCard";

PostCard.propTypes = {
  post: PropTypes.object.isRequired,
};

export default PostCard;
