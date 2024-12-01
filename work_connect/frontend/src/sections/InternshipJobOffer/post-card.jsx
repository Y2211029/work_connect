import { forwardRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";

import { postDateTimeDisplay } from "src/components/view/PostDatatime";
import { useSessionStorage } from "src/hooks/use-sessionStorage";
import { follow } from "src/_mock/follow";

// ----------------------------------------------------------------------

const PostCard = forwardRef(({ post }, ref) => {
  const {
    company_id,
    news_id,
    company_name,
    user_name,
    article_title,
    genre,
    header_img,
    news_created_at,
    follow_status: initialFollowStatus,
    icon,
    deadline,
    count,
  } = post;

  useEffect(() => {
    console.log("company_id", company_id);
  }, [company_id]);

  console.log("締切日", deadline);

  const [followStatus, setFollowStatus] = useState(initialFollowStatus);
  const { getSessionData } = useSessionStorage();
  const accountData = getSessionData("accountData");

  const handleFollowClick = async () => {
    try {
      const updatedFollowStatus = await follow(accountData.id, company_id);
      if (updatedFollowStatus) {
        setFollowStatus(updatedFollowStatus);
      }
    } catch (error) {
      console.error("フォロー処理中にエラーが発生しました！", error);
    }
  };

  console.log("アイコンID", icon);
  console.log("ユーザーネーム", user_name);

  // 日付をYY/MM/DDに変換する
  const formatDate = (dateString) => {
    if (!dateString) {
      return null; // nullを返して非表示にする
    }

    const dateObj = new Date(dateString);
    if (isNaN(dateObj.getTime())) {
      // 無効な日付の場合
      return null;
    }

    const year = dateObj.getFullYear();
    const month = dateObj.getMonth() + 1;
    const day = dateObj.getDate();
    return (
      <>
        <Tooltip title="締め切り間近!">
          応募締切日:{year}/{month}/{day}
        </Tooltip>
      </>
    );
  };

  // 企業アイコン
  const renderAvatar = (
    <Avatar
      alt={company_name}
      src={icon ? `http://localhost:8000/storage/images/userIcon/${icon}` : ""}
      sx={{
        zIndex: 9,
        width: 30,
        height: 30,
      }}
    />
  );

  // フォームのレンダリング（企業の投稿の場合）
  const renderForm =
    company_id === accountData.id && count > 0 ? (
      <Typography
        sx={{ opacity: 0.48, cursor: "pointer" }}
        onClick={() => {
          window.location.href = `/Profile/${user_name}?page=checkform`;
        }}
      >
        {count}件のフォーム回答
      </Typography>
    ) : null;

  // ジャンル
  const renderGenre = genre ? (
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
      <div>{genre}</div>
      {/* <div>
        {genre === "Internship"
          ? "インターンシップ"
          : genre === "Blog"
            ? "ブログ"
            : genre === "JobOffer"
              ? "求人"
              : genre === "Session"
                ? "説明会"
                : genre}{" "}
      </div> */}

      {renderForm}

      {formatDate(deadline)}
    </Stack>
  ) : null;

  // タイトル
  const renderTitle = (
    <Link
      to={`/news_detail/${news_id}`}
      className="link"
      style={{
        color: "common.black",
        height: 30,
        fontWeight: "Bold",
      }}
    >
      {article_title}
    </Link>
  );

  // サムネイル
  const renderThumbnail = (
    <Box
      component="img"
      src={header_img}
      sx={{
        aspectRatio: 16 / 9,
        borderRadius: "10px",
        marginBottom: "10px",
        width: "400px",
        height: "250px",
        borderColor: "blue",
      }}
    />
  );

  //フォローステータス
  const renderFollow = () => {
    if (followStatus === "フォローできません") {
      return <Typography opacity="0.48"></Typography>;
    } else {
      return (
        <Typography opacity="0.48" onClick={handleFollowClick}>
          {followStatus}
        </Typography>
      );
    }
  };

  // 投稿日
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
      {postDateTimeDisplay(news_created_at)}
    </Typography>
  );

  // 企業名
  const renderCompanyName = (
    <Typography
      variant="caption"
      component="div"
      sx={{
        mb: 2,
        opacity: 0.48,
        color: "common.black",
      }}
    >
      {company_name}
    </Typography>
  );

  // 投稿情報
  const renderInfo = (
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
        {renderAvatar}
        {renderCompanyName}
      </Stack>
    </Stack>
  );

  return (
    <div ref={ref}>
      <Stack sx={{ display: "inline-block" }}>
        <div className="postCard" style={{ width: "100%" }}>
          {renderThumbnail}
          {renderTitle}
          {renderGenre}
          {renderFollow}
          {renderInfo}
        </div>
      </Stack>
    </div>
  );
});

PostCard.displayName = "PostCard";

PostCard.propTypes = {
  post: PropTypes.object.isRequired,
};

export default PostCard;
