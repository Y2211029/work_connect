import React, { useState, useEffect } from "react";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { ColorRing } from "react-loader-spinner";
import { useSessionStorage } from "src/hooks/use-sessionStorage";
import "./news_detail.css";
import { follow } from "src/_mock/follow";

//MUIアイコン
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const InternshipJobOfferPage = () => {
  const [csrfToken, setCsrfToken] = useState("");
  const [NewsDetail, SetNewsDetail] = useState(null);
  const [followStatus, setFollowStatus] = useState(null);
  const [writeformStatus, setWriteFormStatus] = useState(null);
  const [deadlinestatus, setDeadLineStatus] = useState(null);
  const [createformstatus, setCreateFormStatus] = useState(null);
  const [previousNews, setPreviousNews] = useState(null);
  const [nextNews, setNextNews] = useState(null);

  const csrf_url = "http://localhost:8000/csrf-token";
  const { news_id } = useParams(); // パラメータから id を取得
  const newsdetail_id = String(news_id); // id を文字列に変換する
  const navigate = useNavigate();
  console.log(csrfToken);

  const { getSessionData } = useSessionStorage();
  const accountData = getSessionData("accountData");
  const data = {
    id: accountData.id,
  };

  useEffect(() => {
    console.log("Myid", data.id);
    console.log("newsdetail_id", newsdetail_id);
    //ニュースのデータを抽出するc
    async function fetchData() {
      try {
        const response = await axios.get(`http://localhost:8000/news_detail/${newsdetail_id}`, {
          params: {
            MyId: data.id, //今ログインしている人のid
          },
        });
        console.log(response.data);
        console.log(response.data.news_detail);
        SetNewsDetail(response.data.news_detail);
        setFollowStatus(response.data.news_detail.follow_status);
        const writeform_status = response.data.news_detail.writeform_status;
        const deadline_status = response.data.news_detail.deadline_status;
        const createform_status = response.data.news_detail.createform_status;
        const previousNews = response.data.previousNews;
        const nextNews = response.data.nextNews;

        console.log("デッドラインステータス", deadline_status);
        console.log("ライトフォームステータス", writeform_status);
        console.log("クリエイトフォームステータス", createform_status);

        setWriteFormStatus(writeform_status);
        setDeadLineStatus(deadline_status);
        setCreateFormStatus(createform_status);
        setPreviousNews(previousNews);
        setNextNews(nextNews);

      } catch (error) {
        console.error("データの取得中にエラーが発生しました！", error);
      }
    }
    fetchData();
  }, [newsdetail_id]);

  useEffect(() => {
    async function fetchCsrfToken() {
      try {
        const response = await axios.get(csrf_url); // CSRFトークンを取得するAPIエンドポイント
        console.log(response.data.csrf_token); // ログ
        console.log("fetching CSRF token:OK"); // ログ
        const csrfToken = response.data.csrf_token;
        setCsrfToken(csrfToken); // 状態を更新
      } catch (error) {
        console.error("Error fetching CSRF token:", error);
      }
    }

    fetchCsrfToken(); // ページがロードされた時点でCSRFトークンを取得
  }, []);

  const handleFollowClick = async () => {
    try {
      const updatedFollowStatus = await follow(data.id, NewsDetail.company_id);
      if (updatedFollowStatus) {
        setFollowStatus(updatedFollowStatus);
      }
    } catch (error) {
      console.error("フォロー処理中にエラーが発生しました！", error);
    }
  };

  //日付をYY/MM/DDに変換する
  const formatDate = (dateString) => {
    const dateObj = new Date(dateString);
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth() + 1;
    const day = dateObj.getDate();
    return `${year}年${month}月${day}日`;
  };

  const handleProfileJump = () => {
    navigate(`/Profile/${NewsDetail.user_name}?page=mypage`);
  };

  const handleFormJump = () => {
    navigate(`/WriteForm/${newsdetail_id}`);
  };

  const handleChatJump = () => {
    navigate(`/Chat`);
  };

  const handleNewsJump = (newsdetail_id) => {
    navigate(`/NewsDetail/${newsdetail_id}`);
  };



  let Genre;
  if (NewsDetail && NewsDetail.genre === "Internship") {
    Genre = "インターンシップ";
  } else if (NewsDetail && NewsDetail.genre === "Blog") {
    Genre = "ブログ";
  } else if (NewsDetail && NewsDetail.genre === "Session") {
    Genre = "説明会";
  } else {
    Genre = "求人";
  }

  console.log("ジャンル", Genre);
  console.log("writeformStatus", writeformStatus);
  console.log("followstatus", followStatus);

  return (
    <>
      <Helmet>
        <title>ニュースの詳細 | Work&Connect</title>
      </Helmet>

      {NewsDetail ? (
        <div className="NewsDetailContainer">
          <div className="Menu">
            <Stack direction={"row"} spacing={2}>
              <Button className="NewsDetail_Button" variant="contained">
                {Genre}
              </Button>

              {Genre !== 'ブログ' ? (
                <div className='day_information'>
                  開催日:{formatDate(NewsDetail.event_day)}
                  締切日:{formatDate(NewsDetail.deadline)}
                </div>
              ) : null}



            </Stack>

            <h1 className="news_title">{NewsDetail.article_title}</h1>

            <div style={{display:'flex'}}>
              <Stack direction={'row'} sx={{alignItems: 'center' }}>
                <img
                  className="Company_News_img"
                  src={`http://localhost:8000/storage/images/userIcon/${NewsDetail.icon}`}
                  alt="Company Icon"
                />
                <div className="news_company_profile">
                  <Tooltip title="クリックするとプロフィールに行きます">
                    <p
                      className="news_company_name"
                      onClick={handleProfileJump}
                      style={{ margin: 0 }}
                    >
                      {NewsDetail.company_name}
                    </p>
                  </Tooltip>
                  <p className="news_created_at" style={{ margin: 0 }}>
                    {formatDate(NewsDetail.news_created_at)}
                  </p>
                </div>
              </Stack>
            </div>

            <Stack direction="row" spacing={2} className="NewsDetail_Stack">
              {data?.id?.[0] === "S" && (
                <>
                  <Button className="NewsDetail_Button" variant="contained" onClick={handleFollowClick}>
                    {followStatus}
                    {/* useStateから持ってくる */}
                  </Button>

                  {createformstatus ? ( // createformstatus が true の場合のみボタンを表示
                    <Button
                      className="Apply_Button"
                      variant="contained"
                      sx={{
                        background: deadlinestatus
                          ? "linear-gradient(#d3d3d3, #a6a6a6)" // 応募できない場合の背景
                          : writeformStatus
                            ? "linear-gradient(#d3d3d3, #a6a6a6)" // 応募済みの場合の背景
                            : "linear-gradient(#41A4FF, #9198e5)", // 応募する場合の背景
                        "&:hover": {
                          background: deadlinestatus
                            ? "linear-gradient(#b8b8b8, #9e9e9e)" // 応募できない場合のホバー時の背景
                            : writeformStatus
                              ? "linear-gradient(#b8b8b8, #9e9e9e)" // 応募済みの場合のホバー時の背景
                              : "linear-gradient(#c2c2c2, #e5ad91)", // 応募する場合のホバー時の背景
                        },
                        color: "white", // 締切が過ぎた場合の文字色を白に変更
                      }}
                      onClick={
                        deadlinestatus || writeformStatus
                          ? undefined // 応募できない場合または応募済みの場合は無効化
                          : handleFormJump // 応募可能な場合のクリックイベント
                      }
                      disabled={deadlinestatus || writeformStatus} // 応募できないまたは応募済みの場合にボタンを無効化
                    >
                      {deadlinestatus
                        ? "応募できません" // 締切が過ぎている場合
                        : writeformStatus
                          ? "応募済み" // 応募済みの場合
                          : "応募する"}
                    </Button>
                  ) : (
                    <Button
                      className="Apply_Button"
                      variant="contained"
                      sx={{
                        background: "linear-gradient(#d3d3d3, #a6a6a6)", // 応募できない場合の背景
                        "&:hover": {
                          background: "linear-gradient(#b8b8b8, #9e9e9e)", // 応募できない場合のホバー時の背景
                        },
                        color: "white", // 締切が過ぎた場合の文字色を白に変更
                      }}
                      disabled={true} // 応募できないまたは応募済みの場合にボタンを無効化
                    >
                      応募できません
                    </Button>
                  )}

                  {(followStatus === "フォローしています" || followStatus === "フォローされています") && (
                    <Button variant="contained" className="NewsDetail_Button" onClick={handleChatJump}>
                      チャットする
                    </Button>
                  )}
                </>
              )}
            </Stack>

            <Divider className="Menu_Divider"></Divider>
          </div>

          {/* NewsDetailHeader要素 サムネイルと会社名・お気に入りボタンを一括りにする */}
          <div className="NewsDetailHeader">
            <img src={`${NewsDetail.header_img}`} className="news_headerimg" alt={NewsDetail.article_title} />
          </div>

          {/* Editor.jsのプラグインによって内容を１行ずつ解釈し、それぞれにあった形でreturn */}
          <div className="news_summary">
            {NewsDetail.summary.blocks.map((block, index) => {
              switch (block.type) {
                case "paragraph":
                  return <div key={index} className="news_font" dangerouslySetInnerHTML={{ __html: block.data.text }} />;
                case "header":
                  return React.createElement(`h${block.data.level}`, {
                    key: index,
                    className: "news_font",
                    dangerouslySetInnerHTML: { __html: block.data.text },
                  });
                case "image":
                  return <img key={index} src={block.data.file.url} className="news_img" alt={block.data.caption} />;
                case "embed":
                  return <div key={index} dangerouslySetInnerHTML={{ __html: block.data.embed }} />;
                case "table":
                  return (
                    <table key={index} className="news_font">
                      <tbody>
                        {block.data.content.map((row, rowIndex) => (
                          <tr key={rowIndex}>
                            {row.map((cell, cellIndex) => (
                              <td key={cellIndex} dangerouslySetInnerHTML={{ __html: cell }} />
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  );
                case "checklist":
                  return (
                    <ul key={index} className="news_font">
                      {block.data.items.map((item, itemIndex) => (
                        <li
                          key={itemIndex}
                          style={{ textDecoration: item.checked ? "line-through" : "none" }}
                          dangerouslySetInnerHTML={{ __html: item.text }}
                        />
                      ))}
                    </ul>
                  );
                case "delimiter":
                  return <hr key={index} />;
                case "raw":
                  return <div key={index} dangerouslySetInnerHTML={{ __html: block.data.html }} />;
                case "quote":
                  return (
                    <blockquote key={index} className="news_font" dangerouslySetInnerHTML={{ __html: block.data.text }}>
                      <cite>{block.data.caption}</cite>
                    </blockquote>
                  );
                case "inlineCode":
                  return <code key={index} className="news_font" dangerouslySetInnerHTML={{ __html: block.data.text }} />;
                case "alert":
                  return <div key={index} className="news_font" dangerouslySetInnerHTML={{ __html: block.data.message }} />;
                case "toggle":
                  return (
                    <details key={index} className="news_font">
                      <summary>{block.data.title}</summary>
                      <div dangerouslySetInnerHTML={{ __html: block.data.content }} />
                    </details>
                  );
                case "audioPlayer":
                  return (
                    <audio key={index} controls>
                      <source src={block.data.url} type={block.data.mimeType} />
                    </audio>
                  );
                case "carousel":
                  return (
                    <div key={index} className="news_font">
                      {block.data.slides.map((slide, slideIndex) => (
                        <img key={slideIndex} src={slide.url} alt={slide.caption} className="news_img" />
                      ))}
                    </div>
                  );
                // 他のブロックタイプもここで処理できます
                default:
                  return null;
              }
            })}
          </div>

          <Stack direction={'row'} className="previous_back_article_stack">
            {previousNews ? (
              <div className="PreviousNews">
                <ArrowBackIosIcon className="PreviousNews_icon" />
                <div className="PreviousNews_content">
                  <span className="PreviousNews_span">前の記事</span>
                  <Typography
                    className="PreviousNews_text"
                    onClick={() => handleNewsJump(previousNews.id)}
                    sx={{ cursor: 'pointer' }}
                  >
                    {previousNews.article_title}
                  </Typography>
                </div>
              </div>
            ) : (<div className="PreviousNews">
          </div>)}

            {nextNews ? (
              <div className="NextNews">
                <div className="NextNews_content">
                  <span className="NextNews_span">次の記事</span>
                  <Typography
                    className="NextNews_text"
                    onClick={() => handleNewsJump(nextNews.id)}
                    sx={{ cursor: 'pointer' }}
                  >
                    {nextNews.article_title}
                  </Typography>
                </div>
                <ArrowForwardIosIcon className="NextNews_icon" />
              </div>
            ) : (<div className="NextNews">
          </div>)}
          </Stack>


        </div>
      ) : (
        <ColorRing
          visible={true}
          height="100"
          width="100"
          ariaLabel="color-ring-loading"
          wrapperStyle={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
          wrapperClass="custom-color-ring-wrapper" // カスタムクラスを指定
          colors={["#41a4ff", "#FFFFFF", "#41a4ff", "#41a4ff", "#FFFFFF"]}
          style={{ flexDirection: "column" }}
        />
      )}
    </>
  );
};

export default InternshipJobOfferPage;