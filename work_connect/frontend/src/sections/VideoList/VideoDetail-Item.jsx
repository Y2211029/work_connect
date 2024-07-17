import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Iframe from "react-iframe";
import axios from "axios";

import Box from "@mui/material/Box";

import { useCreateTagbutton } from "src/hooks/use-createTagbutton";

const VideoDetailItem = () => {
  const { id } = useParams();
  // -----動画データ-----
  const [VideoDetail, setVideoDetail] = useState([]);
  
  // -----タグ-----
  const { tagCreate } = useCreateTagbutton();
  // ジャンル
  const [VideoGenre, setVideoGenre] = useState("");


  const url = "http://localhost:8000/get_movie_detail";
  // Laravel側から動画詳細データを取得
  useEffect(() => {
    async function VideoListFunction() {
      try {
        // Laravel側から動画詳細データを取得
        const response = await axios.get(url, {
          params: { id: id },
          headers: {
            "Content-Type": "json",
          },
        });

        setVideoDetail(response.data);
        console.log("response.data", response.data);
      } catch (err) {
        console.log("err:", err);
      }
    }
    VideoListFunction();
  }, [id]); // 空の依存配列を渡すことで初回のみ実行されるようにする

  // タグ作成
  useEffect(() => {
    //ジャンル
    setVideoGenre(tagCreate(VideoDetail.genre));
    console.log("VideoDetail", VideoDetail);
  }, [VideoDetail]);

  // 動画タイトル
  const renderTitle = VideoDetail.title && VideoDetail.title.length > 0 && (
    <>
      <p>{VideoDetail.title}</p>
    </>
  );

  // 動画投稿者アイコン
  const renderIcon = VideoDetail.icon && VideoDetail.icon.length > 0 && (
    <>
      <Link to="/">
        <img src={`/assets/images/avatars/avatar_${VideoDetail.icon}.jpg`} alt="" />
      </Link>
    </>
  );

  // 動画作成者ユーザーネーム
  const renderUserName = VideoDetail.user_name && VideoDetail.user_name.length > 0 && (
    <>
      <span>{VideoDetail.user_name}</span>
    </>
  );

  // 動画URL
  const renderYoutubeFrame = (
    <>
      <Iframe
        url={"https://www.youtube.com/embed/hge3fr50o0o?iv_load_policy=3&modestbranding=1&fs=0"}
        width="100%"
        height="500px"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
      />
    </>
  );

  // 動画紹介文
  const renderIntro = VideoDetail.intro && VideoDetail.intro.length > 0 && (
    <>
      <p>紹介文</p>
      <textarea
        style={{
          width: "100%",
          height: "300px",
        }}
        value={VideoDetail.intro}
        readOnly // 読み取り専用にする場合
      />
    </>
  );

  // 動画ジャンル
  const renderGenre = VideoGenre && VideoGenre.length > 0 && (
    <>
      <p>ジャンル</p>
      {VideoGenre}
    </>
  );

  return (
    <>
      <Link to="/VideoList">動画一覧に戻る</Link>

      <div>
        {renderTitle}
        <div>
          {renderIcon}
          {renderUserName}
        </div>
      </div>
      {/* 各項目の表示、ここから */}
      <Box>
        {renderYoutubeFrame}
        {renderGenre}
        {renderIntro}
      </Box>
      {/* 各項目の表示、ここまで */}
    </>
  );
};

export default VideoDetailItem;
