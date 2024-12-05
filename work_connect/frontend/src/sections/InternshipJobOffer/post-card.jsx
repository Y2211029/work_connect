import { forwardRef, useState } from "react";
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
import axios from "axios";
// import { TypographyItems } from "src/components/typography/ItemTypography";
// import NewsDisplayed from "src/components/search/NewsDisplayed";

// ----------------------------------------------------------------------

const PostCard = forwardRef(({ post }, ref) => {
  const { news_list } = post;
  console.log("all_news_list", news_list);

  const [newsList, setNewsList] = useState(news_list);
  const { getSessionData } = useSessionStorage();
  const accountData = getSessionData("accountData");
  const news_delete_url = `http://localhost:8000/news_delete`;
  console.log("締切日", newsList.deadline);
  console.log("開催日", newsList.event_day);
  console.log("ニュースリスト", newsList);

  const handleFollowClick = async (company_id, news_id) => {
    console.log(news_id);
    try {
      // フォロー処理を実行し、更新後のフォローステータスを取得
      const updatedFollowStatus = await follow(accountData.id, company_id);
      if (updatedFollowStatus) {
        console.log("更新後のフォローステータス", updatedFollowStatus);

        // newsList 内の特定のデータを更新
        setNewsList((prevList) =>
          prevList.map((news) =>
            news.news_id === news_id
              ? { ...news, followStatus: updatedFollowStatus } // フォロー状況更新
              : news
          )
        );
      } else {
        console.log("じゃあないってこと?");
      }
    } catch (error) {
      console.error("フォロー処理中にエラーが発生しました！", error);
    }
  };

  const handleNewsDelete = async (news_id) => {
    try {
      console.log("ニュースid", news_id);
      const NewsDeleteCheck = confirm("本当に削除しますか?");
      if (NewsDeleteCheck) {
        console.log("通ってます");
        console.log("ニュースid", news_id);
        const response = await axios.post(news_delete_url, {
          news_id: news_id,
        });
        if (response) {
          setNewsList((prevList) => prevList.filter((news) => news.news_id !== news_id));
          console.log("成功");
        }
      }
    } catch (error) {
      console.error("フォロー処理中にエラーが発生しました！", error);
    }
  }

  console.log("アイコンID", newsList.icon);
  console.log("ユーザーネーム", newsList.user_name);

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
  const renderAvatar = (company_name, icon) => (
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

  console.log("ユーザネーム", newsList.user_name);

  // フォームのレンダリング（企業の投稿の場合）
  const renderForm = (company_id, count, user_name) =>
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
  const renderGenre = (news) => {
    if (!news.genre) return null; // genreがnullまたはundefinedなら何も返さない
    const company_id = news.company_id;
    const count = news.count;
    const user_name = news.user_name;

    return (
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
        {/* ジャンル表示 */}
        {/* <div>
          {genre === "Internship"
            ? "インターンシップ"
            : genre === "Blog"
            ? "ブログ"
            : genre === "JobOffer"
            ? "求人"
            : genre === "Session"
            ? "説明会"
            : genre}
        </div> */}

        {/* フォーム表示 */}
        {renderForm(company_id, count, user_name)}

        {/* 締切日をフォーマットして表示 */}
        {news.deadline && formatDate(news.deadline)}

        {/* 開催日があれば表示 */}
        {news.event_day && <div>開催日: {news.event_day}</div>}
      </Stack>
    );
  };

  // タイトル
  const renderTitle = (news_id, title) => (
    <Link
      to={`/news_detail/${news_id}`}
      className="link"
      style={{
        color: "common.black",
        height: 30,
        fontWeight: "Bold",
      }}
    >
      {title}
    </Link>
  );

  // 職種
  // if (isDisplayed && (Occupation !== null || Occupation !== "" || Occupation !== undefined)) {
  //   renderOccupation = <TypographyItems ItemName="職種 " ItemDetail={Occupation} />;
  // } else {
  //   renderDeatLine = "";
  // }

  // // 応募締切 renderDeatLine
  // if (isDisplayed && (DeatLine !== null || DeatLine !== "" || DeatLine !== undefined)) {
  //   renderDeatLine = <TypographyItems ItemName="応募締切" ItemDetail={DeatLine} />;
  // } else {
  //   renderDeatLine = "";
  // }

  // // 開催日
  // if (isDisplayed && (EventDate !== null || EventDate !== "" || EventDate !== undefined)) {
  //   renderEventDate = <TypographyItems ItemName="開催日" ItemDetail={EventDate} />;
  // } else {
  //   renderEventDate = "";
  // }

  // タイトル
  // const renderTitle = article_title !== null && article_title;

  // console.log("renderDeatLine", renderDeatLine);
  // console.log("renderEventDate", renderEventDate);
  // console.log("renderOccupation", renderOccupation);

  // const alternativeImage = "http://localhost:8000/storage/images/work/NoImage.png";
  // サムネイル
  const renderThumbnail = (header_img) => (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        marginBottom: "10px",
        borderRadius: "10px",
      }}>
      {/* 画像 */}
      <Box
        component="img"
        src={header_img}
        sx={{
          aspectRatio: "16 / 9",
          width: "400px",
          height: "250px",
        }}
      />

      {/* ×ボタン */}
      {newsList.company_id === accountData.id && (
        <Tooltip title="このニュースを削除します">
          <Typography
            onClick={() => handleNewsDelete(newsList.news_id)} // 実際の削除処理を追加
            sx={{
              position: "absolute",
              top: "10px",
              right: "10px",
              backgroundColor: "rgba(255, 255, 255, 0.7)",
              padding: "5px 10px",
              borderRadius: "5px",
              cursor: "pointer",
              opacity: 0.8,
              "&:hover": {
                opacity: 1,
              },
            }}
          >
            ×
          </Typography>
        </Tooltip>
      )}
    </Box>
  );


  //フォローステータス
  const renderFollow = (followStatus, company_id, news_id) => {
    if (followStatus === "フォローできません") {
      return <Typography opacity="0.48"></Typography>;
    } else {
      return (
        <Typography opacity="0.48" onClick={() => handleFollowClick(company_id, news_id)} sx={{ cursor: "pointer" }}>
          {followStatus}
        </Typography>
      );
    }
  };

  // 投稿日
  const renderDate = (news_created_at) => (
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
  const renderCompanyName = (company_name) => (
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
  const renderInfo = (news) => (
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
      {renderDate(news.news_created_at)}
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
        {renderAvatar(news.company_name, news.icon)}
        {renderCompanyName(news.company_name)}
      </Stack>
    </Stack>
  );

  // const renderDay = {
  //   <>
  //   renderDeatLine
  //            renderEventDate
  //            renderOccupation
  //   </>
  // };

  return (
    <>
      {newsList.map((news, index) => (
        <div key={index} ref={ref}>
          <Stack sx={{ display: "inline-block" }}>
            <div className="postCard" style={{ width: "100%" }}>
              {renderThumbnail(news.header_img)}
              {renderTitle(news.news_id, news.article_title)}
              {renderGenre(news)}
              {renderFollow(news.followStatus, news.company_id, news.news_id)}
              {renderInfo(news)}
            </div>
          </Stack>
        </div>
      ))}
    </>
  );
});

PostCard.displayName = "PostCard";

PostCard.propTypes = {
  post: PropTypes.object.isRequired,
};

export default PostCard;
