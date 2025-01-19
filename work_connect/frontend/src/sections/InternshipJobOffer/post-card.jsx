import { forwardRef, useEffect, useLayoutEffect, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import Divider from "@mui/material/Divider";
import Popover from "@mui/material/Popover";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import { postDateTimeDisplay } from "src/components/view/PostDatatime";
import { UseCreateTagbutton } from "src/hooks/use-createTagbutton";
import { useSessionStorage } from "../../hooks/use-sessionStorage";
import axios from "axios";

// ----------------------------------------------------------------------

const getDeadlineMessage = (deadline) => {
  const today = new Date();
  const deadlineDate = new Date(deadline);

  // 日付の差分を計算 (ミリ秒 -> 日)
  const diffInDays = Math.ceil((deadlineDate - today) / (1000 * 60 * 60 * 24));

  // 残り1週間以内は1日単位で表示
  if (diffInDays > 0 && diffInDays <= 7) {
    return `締め切りまで残り${diffInDays}日`;
  }

  // 残り2週間以内なら週数単位で表示
  if (diffInDays > 7 && diffInDays <= 14) {
    const weeksLeft = Math.ceil(diffInDays / 7); // 残りの週数を計算
    return `締め切りまで残り${weeksLeft}週間`;
  }

  // それ以外は何も返さない
  return null;
};

const PostCard = forwardRef((props, ref) => {
  const {
    NewItem: {
      company_id,
      news_id,
      company_name,
      user_name,
      article_title,
      header_img,
      news_created_at,
      icon,
      follow_status,
      open_jobs,
      deadline,
      event_day,
      form_data_count,
    },
  } = props;

  console.log("company_id", props);

  const [open, setOpen] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const { getSessionData } = useSessionStorage();
  const accountData = getSessionData("accountData");
  const [PathName, setPathName] = useState("");
  const { tagCreate } = UseCreateTagbutton();

  useLayoutEffect(() => {
    let url = new URL(window.location.href);
    let urlPageParams = url.searchParams.get("page");
    if (urlPageParams != null) {
      setPathName(location.pathname + "/" + urlPageParams);
    } else {
      setPathName(location.pathname);
    }
  }, [window.location.href]);

  useEffect(() => {
    console.log("pageParam", PathName);
  }, [PathName]); // location に依存するように変更

  const deadlineMessage = getDeadlineMessage(deadline);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
    setExpanded(!expanded);
  };
  const handleClose = () => {
    setOpen(null);
    setExpanded(false);
  };

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

    const today = new Date();
    // 日付の差分を計算 (ミリ秒 -> 日)
    const diffInDays = Math.ceil((dateObj - today) / (1000 * 60 * 60 * 24));

    // 日付の差分を月単位で計算
    const diffInMonths = (dateObj.getFullYear() - today.getFullYear()) * 12 + (dateObj.getMonth() - today.getMonth());

    const weeksLeft = Math.ceil(diffInDays / 7);

    let deadlineMessage;
    switch (true) {
      case diffInDays <= 0:
        deadlineMessage = "既に締め切られています!";
        break;
      case diffInDays > 0 && diffInDays <= 7:
        deadlineMessage = "締め切り間近!";
        break;
      case diffInDays > 7 && diffInDays <= 14:
        deadlineMessage = `締め切りまで${weeksLeft}週間!`;
        break;
      case diffInMonths >= 1:
        deadlineMessage = `締め切りまで${diffInMonths}ヶ月!`;
        break;
    }

    return (
      <Tooltip title={`${deadlineMessage}`}>
        {year}/{month}/{day}
      </Tooltip>
    );
  };

  const handleDeleteClick = async (news_id) => {
    const confirmed = window.confirm("本当に削除しますか？");

    if (confirmed) {
      console.log("news_id", news_id);
      try {
        await axios.post(`http://localhost:8000/news_delete/${news_id}`);
        alert("削除しました");
        window.location.reload();
      } catch (error) {
        alert("削除に失敗しました");
        console.error(error);
      }
    }
  };

  // 企業アイコン
  const renderAvatar =
    (console.log("icon", icon),
    (
      <Avatar
        src={icon ? `http://localhost:8000/storage/images/userIcon/${icon}` : "/assets/images/avatars/avatar_0.jpg"}
        sx={{
          zIndex: 9,
          width: 30,
          height: 30,
        }}
      />
    ));

  // サムネイル
  const renderThumbnail = (
    <Box
      component="img"
      src={header_img}
      onError={(e) => {
        e.target.src = "http://localhost:8000/storage/images/work/NoImage.png"; // エラー時にサンプル画像をセット
      }}
      sx={{
        aspectRatio: 16 / 9,
        borderRadius: "10px",
        marginBottom: "10px",
        width: "400px",
        // height: "250px",
        borderColor: "blue",
        objectFit: "contain",
      }}
    />
  );

  // タイトル
  const renderTitle = (
    <>
      <Link
        to={`/NewsDetail/${news_id}`}
        className="link"
        style={{
          color: "common.black",
          height: 30,
          fontWeight: "Bold",
        }}
      >
        {article_title}
      </Link>
    </>
  );
  // フォームのレンダリング（企業の投稿の場合）
  // const renderForm =
  //   company_id === accountData.id && form_data_count > 0 ? (

  //     <Typography
  //       sx={{ opacity: 0.48, cursor: "pointer", textAlign: "right" }}
  //       onClick={() => {
  //         navigate(`/Profile/${user_name}?page=checkform`);
  //       }}
  //     >
  //       {form_data_count}件のフォーム回答
  //     </Typography>
  //   ) : null;

  const renderForm =
    company_id === accountData.id && form_data_count > 0 ? (
      <Link
        to={`/Profile/${user_name}?page=checkform`}
        style={{
          opacity: 0.48,
          cursor: "pointer",
          textAlign: "right",
          textDecoration: "none", // デフォルトの下線を消す場合
          color: "inherit", // 見た目を他のテキストと統一したい場合
        }}
      >
        {form_data_count}件のフォーム回答
      </Link>
    ) : null;

  //フォローステータス
  const renderFollow = follow_status !== "フォローできません" && follow_status !== "フォローする" && (
    <div className="stack_follow_status">
      <Typography opacity="0.48" sx={{ width: "100%" }} className="follow_status">
        {follow_status}
      </Typography>
    </div>
  );

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

  // ジャンル
  const renderGenre = open_jobs ? (
    <Box sx={{ justifyContent: "center ", alignItems: "center" }}>
      <Divider
        sx={{
          borderStyle: "dashed",
          m: 1,
          display: PathName === "/Internship_JobOffer/Blog" ? "none" : "block",
        }}
      />
      <Button
        onClick={handleOpen}
        startIcon={
          <PlayCircleIcon
            style={{
              transform: expanded ? "rotate(90deg)" : "rotate(0)",
              transition: "0.5s",
            }}
          />
        }
        className="news_list_view_items news_acordion_button"
      >
        職種
      </Button>
      <Popover
        open={open}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "center",
          horizontal: "left",
        }}
        PaperProps={{
          sx: {
            mt: 1.5,
            ml: 0.75,
            width: "fit-content",
            maxWidth: "300px",
            maxHeight: "50vh",
          },
        }}
      >
        <Box className="news_job_acordion_menu">{tagCreate(open_jobs)}</Box>
      </Popover>

      {renderForm}
    </Box>
  ) : null;

  const renderDay = (
    <>
      {deadlineMessage !== null ? <Box className="news_list_view_items">{deadlineMessage}</Box> : ""}
      {event_day !== null ? (
        <>
          <Box className="news_list_view_items">開催日: {formatDate(event_day)}</Box>
          <Divider
            sx={{
              borderStyle: "dashed",
              m: 1,
              display: PathName === "/Internship_JobOffer/Blog" ? "none" : "block",
            }}
          />
        </>
      ) : (
        ""
      )}
    </>
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

      {company_id === accountData.id ? (
        <Tooltip title="削除">
          <Button onClick={() => handleDeleteClick(news_id)}>
            <DeleteIcon sx={{ color: "red" }} />
          </Button>
        </Tooltip>
      ) : (
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
      )}
    </Stack>
  );

  return (
    <div ref={ref}>
      <Stack sx={{ display: "inline-block" }}>
        <div className="postCard" style={{ width: "100%" }}>
          {renderThumbnail}
          {renderTitle}
          {renderGenre}
          {renderDay}
          {renderFollow}
          {renderInfo}
        </div>
      </Stack>
    </div>
  );
});

// displayName は、React コンポーネントに名前を設定するプロパティです。特に、開発ツール（例えば、React DevTools）
// でコンポーネントを確認したり、コンポーネントのスタックトレースを見たりするときに役立ちます.
PostCard.displayName = "PostCard"; // displayName を設定

PostCard.propTypes = {
  Internship: PropTypes.object.isRequired,
};

export default PostCard;
PostCard.propTypes = {
  NewItem: PropTypes.object.isRequired,
};
