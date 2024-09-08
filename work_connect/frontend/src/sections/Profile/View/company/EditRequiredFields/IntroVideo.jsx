import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import PropTypes from 'prop-types';
import { useSessionStorage } from "src/hooks/use-sessionStorage";
import Iframe from 'react-iframe'; //紹介動画やマップを埋め込む


const IntroVideo = ({ IntroVideoData }) => {


  const [IntroVideo, setIntroVideo] = useState(IntroVideoData);
  const [IntroVideoURL, setIntroVideoURL] = useState(null);
  const { getSessionData, updateSessionData } = useSessionStorage();


  // valueの初期値をセット
  useEffect(() => {
    // セッションデータ取得
    const SessionData = getSessionData("accountData");

    /// 編集の途中ならセッションストレージからデータを取得する。
    /// (リロードした時も、データが残った状態にする。)
    if ((SessionData.IntroVideo !== undefined) ||
    SessionData.IntroVideoEditing) {
      // セッションストレージから最新のデータを取得
      setIntroVideo(SessionData.IntroVideo);
    }

  }, [IntroVideoData]);

  const handleChange = (e) => {
    const newValue = e.target.value;
    if (e.target.name === "IntroVideo") {
      setIntroVideo(newValue);
      iframeURLChange(newValue);
      updateSessionData("accountData", "IntroVideoEditing", true);
    }
  };


  const iframeURLChange = (URL) => {
    let extractedUrl = null;

    // 共有リンクを入力した場合
    if (URL.includes("youtu.be")) {
      const videoId = URL.split('/').pop().split('?')[0];
      extractedUrl = `https://www.youtube.com/embed/${videoId}`;
    }
    // 埋め込み用リンクを入力した場合(Iframeから始まる)
    else if (URL.includes("iframe")) {
      const regex = /src="([^"]+)"/;
      const match = URL.match(regex);
      if (match && match[1]) {
        extractedUrl = match[1];
      }
    }else if (URL.includes("watch?v=")) {
      const videoId = URL.split('v=')[1].split('&')[0]; // Extract the video ID
      extractedUrl = `https://www.youtube.com/embed/${videoId}`;
    }
    setIntroVideoURL(extractedUrl);
    console.log(extractedUrl);
  };

  // 編集中のデータを保存しておく
  useEffect(() => {
    updateSessionData("accountData", "IntroVideo", IntroVideo);

  }, [IntroVideo]);


  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <TextField
        fullWidth
        label="紹介動画"
        margin="normal"
        name="IntroVideo"
        onChange={handleChange}
        required
        type="text"
        value={IntroVideo}
        variant="outlined"
        sx={{
          backgroundColor: '#fff', // 背景色を指定
          borderRadius: '8px', // 角の丸みを設定
          marginTop: '6px',
          marginBottom: '0'
        }}
      />
      <Iframe
        url={IntroVideoURL}
        width="100%"
        height="400px"
      />
    </div>


  );
};

// プロパティの型を定義
IntroVideo.propTypes = {
  IntroVideoData: PropTypes.string.isRequired,
};

export default IntroVideo;