import { forwardRef, useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./ApplyHistory.css"; // デザイン用のCSSファイル
import axios from "axios";
import { postDateTimeDisplay } from "src/components/view/PostDatatime";
import Stack from '@mui/material/Stack';
import Button from "@mui/material/Button";


const Apply_history = forwardRef(({ id }, ref) => {
  const [applyHistories, setApplyHistories] = useState([]);
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

  // ヘッダー部分の表示
  const renderHeader = (posts) => {
    return (
      <>
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
          <p>会社名: {posts.companies_name}</p>
        </Stack>
        <Stack direction={"row"}>
          <p className="form_writed_at">応募日: {formatDate(posts.form_writed_at)}</p>
          <p>({postDateTimeDisplay(posts.form_writed_at)})</p>
        </Stack>
      </>

    );
  };

  // コンテンツ部分の表示
  const renderDetails = (posts) => {
    let genre = null;
    switch (posts.news_genre) {
      case 'Internship':
        genre = 'インターンシップ';
        break;
      case 'Session':
        genre = '説明会';
        break;
      case 'JobOffer':
        genre = '求人';
        break;
    }
    console.log("posts", posts);
    return (
      <div className="post_card_content">
        <h2 className="post_card_title">{posts.news_title}</h2>
        <Button
          variant="contained"
          sx={{
            fontSize: "10px",
            padding: "8px 16px",
            margin: "4px",
            background: "linear-gradient(#41A4FF, #9198e5)",
            "&:hover": {
              background: "linear-gradient(#c2c2c2, #e5ad91)",
            },
          }}
        >

          {genre}

        </Button>

        <div className="post_card_form">
          <h3>応募内容:</h3>
          <ul>
            {posts.write_form.map((form, idx) => (
              <li key={idx}>
                <strong>{form.title}:</strong> {form.response || "なし"}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

  return (
    <>
      {applyHistories.length === 0 ? (
        <p>応募履歴がありません。</p>
      ) : (
        applyHistories.map((posts, index) => (
          <div className="post_card" ref={ref} key={index}>
            {/* ヘッダー部分 */}
            {renderHeader(posts)}
            {/* コンテンツ部分 */}
            {renderDetails(posts)}
          </div>
        ))
      )}
    </>
  );
});

Apply_history.displayName = "Apply_history";

Apply_history.propTypes = {
  id: PropTypes.string.isRequired,
};

export default Apply_history;
