import { forwardRef, useEffect, /*useRef,*/ useState } from "react";
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
    work_id,
    genre,
    thumbnail,
    icon,
    title,
    intro,
    author,
    userName,
    createdAt,
  } = post;
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [open, setOpen] = useState(false);
  // const buttonRef = useRef(null);
  // マイページの作品を参照している際は編集（・・・）ボタンを表示。
  const isNotMyProfile = myProfileURL.pathname != "/Profile/" + userName;
  const navigate = useNavigate();

  // 外部クリックを検出するための関数
  // const handleClickOutside = (e) => {
  //   // もしポップアップが開いていて、クリックされたターゲットがボタン以外なら閉じる
  //   if (open && !e.target.closest(".button-container")) {
  //     console.log("ボタン要素以外をクリックしました")
  //     setOpen(false);
  //   }
  // };

  // // useEffect で、外部クリックのリスナーを追加
  // useEffect(() => {
  //   if (open) {
  //     document.addEventListener("click", handleClickOutside);
  //   } else {
  //     document.removeEventListener("click", handleClickOutside);
  //   }

  //   return () => {
  //     document.removeEventListener("click", handleClickOutside);
  //   };
  // }, [open]);

  // ボタンがクリックされたときの処理

  const handleButtonClick = (e, action) => {
    if (action == "edit") {
      // 作品編集
      navigate(`/WorkEdit/${work_id}`);
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

  const alternativeImage =
    "http://localhost:8000/storage/images/work/NoImage.png";

  const renderThumbnail =
    (console.log("thumbnail", thumbnail),
    (
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
    ));

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
  const renderGenre =
    genre !== null ? (
      <div style={{ margin: "10px 0px 10px 0px" }}>{genre}</div>
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
        fontSize: "12px",
      }}
    >
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
      {intro}
    </Typography>
  );

  const renderItems = (
    <div ref={ref}>
      <Link
        to={`/WorkDetail/${work_id}`}
        variant="subtitle2"
        underline="none"
        className="link item-Link"
      >
        <Stack sx={{ display: "inline-block", width: "100%" }}>
          <div className="postCard item-stack" style={{ width: "100%" }}>
            {renderShape}
            {renderThumbnail}
            {renderTitle}
            <Divider
              sx={{
                borderStyle: "dashed",
                display: "block",
                margin: "10px 0px 0px 0px",
              }}
            />
            {renderGenre}
            <Divider
              sx={{
                borderStyle: "dashed",
                display: "block",
                margin: "0px 0px 5px 0px",
              }}
            />
            {renderIntro}
            <Divider
              sx={{
                borderStyle: "dashed",
                display: "block",
                margin: "10px 0px 5px 0px",
              }}
            />
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
          <Link
            to={`/WorkDetail/${work_id}`}
            variant="subtitle2"
            underline="none"
            className="link item-Link"
          >
            {renderShape}
            {renderThumbnail}
            {renderTitle}
            <Divider
              sx={{
                borderStyle: "dashed",
                display: "block",
                margin: "10px 0px 0px 0px",
              }}
            />
            {renderGenre}
            <Divider
              sx={{
                borderStyle: "dashed",
                display: "block",
                margin: "0px 0px 5px 0px",
              }}
            />
            {renderIntro}
            <Divider
              sx={{
                borderStyle: "dashed",
                display: "block",
                margin: "10px 0px 5px 0px",
              }}
            />
          </Link>
          {renderInfo}
        </div>
      </Stack>
    </div>
  );

  return isNotMyProfile ? renderItems : renderEditItems;
});

// `displayName` の追加
PostCard.displayName = "PostCard";

PostCard.propTypes = {
  post: PropTypes.object.isRequired,
};

export default PostCard;
