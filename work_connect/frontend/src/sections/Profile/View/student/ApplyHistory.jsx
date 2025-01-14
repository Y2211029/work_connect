import { forwardRef, useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./ApplyHistory.css"; // デザイン用のCSSファイル
import axios from "axios";
import { postDateTimeDisplay } from "src/components/view/PostDatatime";
import Stack from '@mui/material/Stack';
import { ColorRing } from "react-loader-spinner";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import { useSessionStorage } from "src/hooks/use-sessionStorage";
import Tooltip from "@mui/material/Tooltip";
import { Link } from "react-router-dom";

const Apply_history = forwardRef(({ id }, ref) => {
  const [applyHistories, setApplyHistories] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const [elementExpanded, setElementExpanded] = useState(false);
  const { getSessionData } = useSessionStorage();

  const accountData = getSessionData("accountData");
  console.log("accountData", accountData.user_name);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleElementChange = (panel) => (event, isElementExpanded) => {
    setElementExpanded(isElementExpanded ? panel : false);
  };

  console.log("ApplyHistoryのid", id);

  useEffect(() => {
    // ニュースのデータを抽出する
    async function fetchData() {
      try {
        const response = await axios.post(
          `http://localhost:8000/get_apply_history`,
          {
            MyId: id, // 今ログインしている人のid
          }
        );
        console.log("apply_histories", response.data);
        setApplyHistories(response.data.apply_histories); // データを state にセット
      } catch (error) {
        console.error("データの取得中にエラーが発生しました！", error);
      }
    }
    fetchData();
  }, []);

  //日付をYY/MM/DDに変換する
  const formatDate = (dateString) => {
    const dateObj = new Date(dateString);
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth() + 1;
    const day = dateObj.getDate();
    return `${year}/${month}/${day}`;
  };

  const getEventDayMessage = (event_day, check_read) => {
    const today = new Date();
    const eventDayDate = new Date(event_day);


    const CheckReadMessage = (check_read) => {

      const checkReadMessage = (check_read === "既読") ? "確認済" : "確認できていません";
      const AlertColor = (check_read === "既読") ? "info,dark" : "error";
      return (
        <>
          <Typography className="CheckReadAlert" variant="body1" color={AlertColor}>
            {checkReadMessage}
          </Typography>
        </>
      )
    }

    // 日付の差分を計算 (ミリ秒 -> 日)
    const diffInDays = Math.ceil((eventDayDate - today) / (1000 * 60 * 60 * 24));



    // 日付の差分を月単位で計算
    const diffInMonths =
      (eventDayDate.getFullYear() - today.getFullYear()) * 12 +
      (eventDayDate.getMonth() - today.getMonth());

    // 残り1週間以内は1日単位で表示
    if (diffInDays > 0 && diffInDays <= 7) {
      return (
        <>
          <Stack direction={"row"}>
            <Typography className="EventDayAlert" variant="body1" color="error">
              開催日まで残り{diffInDays}日!
            </Typography>
            {CheckReadMessage(check_read)}
          </Stack>
        </>

      );
    }

    // 残り2週間以内なら週数単位で表示
    if (diffInDays > 7 && diffInDays <= 14) {
      const weeksLeft = Math.ceil(diffInDays / 7); // 残りの週数を計算
      return (
        <>
          <Typography className="EventDayAlert" variant="body1" color="primary">
            開催日まで残り{weeksLeft}週間!
          </Typography>
          {CheckReadMessage(check_read)}
        </>

      );
    }

    // 残り1ヶ月以上の場合は月数を表示
    if (diffInMonths >= 1) {
      return (
        <>
          <Typography className="EventDayAlert" variant="body1" color="info.dark">
            開催日まで残り{diffInMonths}ヶ月!
          </Typography>
          {CheckReadMessage(check_read)}
        </>

      );
    }

    // マイナスだった場合すでに開催されていると判断し、開催済みと表示
    if (diffInDays < 0) {
      return (
        <Typography className="EventDayAlert" variant="body1" color="success">
          開催されました!
        </Typography>
      );
    }

    // それ以外は何も返さない
    return null;
  };

  // ヘッダー部分の表示
  const renderHeader = (posts) => {
    let Apply_genre = null;
    switch (posts.news_genre) {
      case 'Internship':
        Apply_genre = 'インターンシップへの応募日';
        break;
      case 'Session':
        Apply_genre = '説明会への応募日';
        break;
      case 'JobOffer':
        Apply_genre = '求人への応募日';
        break;
    }
    console.log("ユーザーネーム", posts.user_name);
    return (
      <>
        {getEventDayMessage(posts.event_day, posts.check_read)}
        <Tooltip title={`クリックすると${posts.companies_name}さんのプロフィールにリンクします`}>
          <Link to={`/Profile/${posts.companies_user_name}`}
            style={{
              textDecoration: "none",
              color: "common.black",
              height: 30,
              fontWeight: "Bold",
            }}>
            <Stack direction={"row"}>
              <div className="post_card_header">
                <img
                  src={
                    posts.icon
                      ? `http://localhost:8000/storage/images/userIcon/${posts.icon}`
                      : <svg className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-67i7n3-MuiSvgIcon-root" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="PersonIcon"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4m0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4"></path></svg> // 代替画像のURLを設定
                  }
                  id={posts.id}
                  alt={`${posts.companies_name || "未設定"} ヘッダー画像`}
                  className="post_card_img"
                />
              </div>
              <div className="ApplyFormCompaniesName">
                <Typography className="CompaniesName">{posts.companies_name}</Typography>
              </div>
            </Stack>
          </Link>
        </Tooltip>
        <Stack direction={"row"}>
          <p className="form_writed_at">{Apply_genre}</p>
          <p className="postDateTimeDisplay">{formatDate(posts.form_writed_at)}({postDateTimeDisplay(posts.form_writed_at)})</p>
        </Stack>

      </>

    );
  };

  // コンテンツ部分の表示
  const renderDetails = (posts) => {
    console.log("posts", posts.news_id);
    console.log("posts", posts.write_form.elements);
    return (
      <div className="post_card_content">
        {posts.public_status !== "1" ? (
          <Tooltip title="このニュースは見ることができません" placement="top">
            <Typography className="post_card_title">
              {posts.news_title}
            </Typography>

          </Tooltip>
        ) : (
          <Tooltip title="クリックするとニュース詳細にリンクします" placement="top">
            <Link
              to={`/NewsDetail/${posts.news_id}`}
              className="link"
              style={{
                color: "common.black",
                height: 30,
                fontWeight: "Bold",
              }}
            >
              <Typography className="post_card_title">
                {posts.news_title}
              </Typography>
            </Link>
          </Tooltip>
        )}



        <div className="post_card_form">
          <Accordion className="ApplyHistoryAccordionMenu" expanded={expanded === posts.id} onChange={handleChange(posts.id)}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Typography className="ApplyDetails" component="span">応募内容</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <>
                {posts.write_form.elements.map((form, idx) => (
                  <Accordion key={`Element${idx}`} expanded={elementExpanded === `Element${idx}`} onChange={handleElementChange(`Element${idx}`)}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1bh-content"
                      id="panel1bh-header"
                    >
                      <Typography className="ApplyDetailsTitle">
                        {form.title}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography className="ApplyDetailsResponse">
                        {form.response || "なし"}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </>
            </AccordionDetails>
          </Accordion>


        </div>
      </div>
    );
  };

  return (
    <>
      <Typography variant="h4" className="ApplyFormUserName">
        {accountData.user_name}の応募履歴一覧
      </Typography>

      {Array.isArray(applyHistories) ? (
        applyHistories.length > 0 ? (
          <div className="apply_history_container">
            {applyHistories.map((posts, index) => (
              <div className="post_card" ref={ref} key={index}>
                {/* ヘッダー部分 */}
                {renderHeader(posts)}
                {/* コンテンツ部分 */}
                {renderDetails(posts)}
              </div>
            ))}
          </div>
        ) : (
          <p>応募履歴がありません。</p>
        )
      ) : (
        <ColorRing
          visible={true}
          height="100"
          width="100"
          ariaLabel="color-ring-loading"
          wrapperStyle={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
          wrapperClass="custom-color-ring-wrapper"
          colors={["#41a4ff", "#FFFFFF", "#41a4ff", "#41a4ff", "#FFFFFF"]}
        />
      )}
    </>
  );
});

Apply_history.displayName = "Apply_history";

Apply_history.propTypes = {
  id: PropTypes.string.isRequired,
};

export default Apply_history;
