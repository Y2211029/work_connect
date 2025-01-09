import VideoYoutubeURL from "../../../sections/video/VideoYoutubeURL";
import VideoTitle from "../../../sections/video/VideoTitle";
import VideoGenre from "../../../sections/video/VideoGenre";
import VideoIntroduction from "../../../sections/video/VideoIntroduction";
import YouTube from "react-youtube";
// import Modal from "react-modal";

import "../../../App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSessionStorage } from "src/hooks/use-sessionStorage";

const VideoEdit = () => {
  let navigation = useNavigate();
  const { getSessionData } = useSessionStorage();
  const accountData = getSessionData("accountData");

  const movie_id = useParams();
  const [videoData, setVideoData] = useState({
    creatorId: "",
    YoutubeURL: "",
    VideoTitle: "",
    VideoGenre: "",
    VideoIntroduction: "",
  });
  // const [getMovieData, setGetMovieData] = useState("");
  // const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [message, setMessage] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [videoId, setVideoId] = useState("");
  const [hasError, setHasError] = useState(false);

  // 動画データ
  const movieDetailUrl = "http://localhost:8000/get_movie_detail";

  useEffect(() => {
    const fetchWorkDetails = async () => {
      try {
        // Laravel側から作品詳細データを取得
        const response = await axios.get(movieDetailUrl, {
          params: { id: movie_id },
          headers: {
            "Content-Type": "json",
          },
        });

        if (response.status !== 200) {
          throw new Error("サーバーからのデータ取得に失敗しました。");
        }

        const data = await response.data;
        console.log("data:", data);

        // setGetMovieData(data["動画"][0]); // 取得したデータを保存
        setVideoData({
          YoutubeURL: data["動画"][0].youtube_url,
          VideoTitle: data["動画"][0].title,
          VideoGenre: data["動画"][0].genre,
          VideoIntroduction: data["動画"][0].intro,
        });
        setVideoUrl(data["動画"][0].youtube_url);
        console.log(data["動画"][0].youtube_url);
      } catch (error) {
        setError(error.message);
      } finally {
        // setLoading(false); // ローディングを終了
      }
    };

    fetchWorkDetails();
    console.log("movie_id:", movie_id);
  }, []);

  useEffect(() => {
    console.log("videoData: ", videoData);
  }, [videoData]);

  // ロード時のyoutubeURL取得
  useEffect(() => {
    console.log("videoUrl:", videoUrl);
    if (videoUrl) {
      setVideoId(videoUrl); // videoIdを設定
      callSetVideoData("YoutubeURL", videoUrl); // 最新のvideoIdを反映
    }
  }, [videoUrl]);

  const callSetVideoData = (key, value) => {
    console.log("key.value", key,value);

    setVideoData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleChange = (event) => {
    const url = event.target.value;
    setVideoUrl(url);
    setHasError(url === "");

    callSetVideoData("creatorId", accountData.id);

    // 入力が空の場合、videoIdをリセットしてYoutubeURLをクリア
    if (url === "") {
      setVideoId(""); // videoIdを空にリセット
      callSetVideoData("YoutubeURL", ""); // YoutubeURLもリセット
      return; // ここで処理を終了
    }

    let extractedVideoId = "";

    // YouTubeの動画IDを抽出
    // iframe入力時
    if (url.includes("iframe")) {
      const srcMatch = url.match(
        /src="https:\/\/www\.youtube\.com\/embed\/([^"]+)?/
      );
      const srcMatch2 = srcMatch[1].match(/([^?]+)?/);

      if (srcMatch && srcMatch2[1]) {
        extractedVideoId = srcMatch2[1];
      }
    }
    // URL入力時
    else if (url.includes("youtube.com/watch?v=")) {
      const urlObj = new URL(url);
      const params = new URLSearchParams(urlObj.search);
      extractedVideoId = params.get("v");
    }
    // 短縮URL入力時
    else if (url.includes("youtu.be/")) {
      const urlObj = new URL(url);
      extractedVideoId = urlObj.pathname.substring(1);
    }
    // 動画ID入力時
    else {
      extractedVideoId = url;
    }

    if (extractedVideoId) {
      setVideoId(extractedVideoId); // videoIdを設定
      callSetVideoData("YoutubeURL", extractedVideoId); // 最新のvideoIdを反映
    }
  };

  const opts = {
    height: "283",
    width: "450",
    playerVars: {
      modestbranding: 1,
      controls: 1,
      iv_load_policy: 3,
      showinfo: 0,
      rel: 0,
    },
  };

  const VideoSubmit = async (e) => {
    e.preventDefault();
    console.log("e", e.target);
    console.log("videoData[key]", videoData);
    async function PostData() {
      const formData = new FormData();

      for (const key in videoData) {
        formData.append(key, videoData[key]);
        console.log(formData.get(key));
        console.log(key);
        console.log(videoData[key]);
      }
      try {
        const response = await axios.post(
          `http://localhost:8000/video_edit/${movie_id.id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log("formData: ", formData);
        navigation("/VideoSelect");
        setMessage(response.data.message);
      } catch (error) {
        console.error(
          "Error:",
          error.response ? error.response.data : error.message
        );
        setMessage(
          error.response ? error.response.data.message : error.message
        );
      }
    }

    if (
      !videoData.YoutubeURL ||
      !videoData.VideoTitle ||
      !videoData.VideoGenre ||
      !videoData.VideoIntroduction
    ) {
      alert("エラー：未入力項目があります。");
    } else {
      // それ以外(実行)
      PostData();
    }
    // e.target.map
  };

  return (
    <div>
      <div className="VideoPostingFormContainer">
        <form onSubmit={VideoSubmit} method="post" id="youtubeForm">
          <h3>動画投稿</h3>
          <div className="VideoPostingUiForm">
            <div className="ImageUpload">
              <div className="VideoPostingFormField">
                <VideoYoutubeURL
                  onChange={handleChange}
                  value={videoUrl}
                  error={hasError}
                />
              </div>
              <br />
              {videoId ? (
                <YouTube
                  videoId={videoId}
                  opts={opts}
                  movieData={videoData.YoutubeURL}
                  onReady={(event) => {
                    const iframe = event.target.getIframe();
                    iframe.src = iframe.src.replace(
                      "https://www.youtube.com",
                      "https://www.youtube-nocookie.com"
                    );
                  }}
                />
              ) : (
                <p>YouTubeのURL、ID、またはiframeコードを入力してください。</p>
              )}
            </div>
            <div className="VideoInformation">
              <div className="VideoPostingFormField">
                <VideoTitle
                  callSetVideoData={callSetVideoData}
                  movieData={videoData.VideoTitle}
                />
              </div>
              {/* ジャンル */}
              <div className="VideoPostingFormField">
                <div className="workGenre" id="workGenre">
                  <p className="work_genre">
                    ジャンル
                    {/* ジャンル&nbsp;<span className="red_txt">必須</span>
                    &nbsp;
                    <span className="alert_red_txt" id="alert_a_3">
                      タグを入れてください
                    </span> */}
                  </p>
                  <VideoGenre
                    callSetVideoData={callSetVideoData}
                    movieData={videoData.VideoGenre}
                  />
                </div>
              </div>
              <br />
              <div className="VideoPostingFormField">
                <VideoIntroduction
                  callSetVideoData={callSetVideoData}
                  movieData={videoData.VideoIntroduction}
                />
              </div>
            </div>
          </div>
          <input type="submit" value="送信" className="VideoSubmit" />
        </form>
        {message && <p>{message}</p>}
        {error && <p>{error}</p>}
      </div>
      {/* </Modal> */}
    </div>
  );
};

export default VideoEdit;
