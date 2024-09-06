import YoutubeURL from "../../../sections/work/WorkPosting/YoutubeURL";
import VideoTitle from "../../../sections/work/WorkPosting/WorkTitle";
import VideoGenre from "../../../sections/video/VideoGenre";
import Introduction from "../../../sections/work/WorkPosting/Introduction";
import YouTube from "react-youtube";
// import Modal from "react-modal";
// import { useNavigate } from "react-router-dom";

import "../../../App.css";
import { useEffect, useState } from "react";
import axios from "axios";

// // ログインのモーダル CSS設定
// // const modalStyle = {
// //   content: {
// //     position: "none",
// //     backgroundColor: "rgb(0 0 0 / 70%)",
// //     border: "none",
// //     borderRadius: "0",
// //     padding: "1.5rem",
// //     overflow: "none",
// //   },
// // };

// const VideoPosting = () => {
//   // const [showModal, setShowModal] = useState(false);
//   // let navigation = useNavigate();

//   // const handleOpenModal = () => {
//   //   // setShowModal(true);
//   //   navigation("VideoPosting");
//   // };

//   // const handleCloseModal = () => {
//   //   setShowModal(false);
//   //   // setFormErrors({}); // エラーメッセージをリセット
//   // };

//   const [workData, setVideoData] = useState({
//     YoutubeURL: "",
//     VideoTitle: "",
//     VideoGenre: "",
//     Introduction: "",
//     Obsession: "",
//     Language: "",
//     Environment: "",
//   });
//   const [videoUrl, setVideoUrl] = useState("");
//   const [videoId, setVideoId] = useState("");

//   useEffect(() => {
//     console.log(workData);
//   }, [workData]);

//   const callSetVideoData = (key, value) => {
//     setVideoData({
//       ...workData,
//       [key]: value,
//     });
//   };

//   const handleChange = (event) => {
//     const url = event.target.value;
//     setVideoUrl(url);
//     callSetVideoData("YoutubeURL", url);

//     // YouTubeの動画IDを抽出
//     const urlPattern =
//       /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^&]+)|youtu\.be\/([^?&]+)/;
//     const match = url.match(urlPattern);
//     if (match) {
//       const id = match[1] || match[2];
//       setVideoId(id);
//     } else {
//       setVideoId("");
//     }
//   };

//   const opts = {
//     height: "390",
//     width: "640",
//     playerVars: {
//       autoplay: 1,
//     },
//   };

//   const VideoSubmit = async (e) => {
//     e.preventDefault();
//     console.log("e", e.target);

//     const formData = new FormData();
//     for (const key in workData) {
//       formData.append(key, workData[key]);
//     }
//     try {
//       const response = await axios.post(
//         "http://localhost:8000/video_posting",
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );
//       console.log(formData);
//       console.log(response.data.message);
//     } catch (error) {
//       console.log(error.message);
//     }

//     // e.target.map
//   };

//   return (
//     <div>
//       <div className="VideoPostingFormContainer">
//         <form onSubmit={VideoSubmit} method="post" id="youtubeForm">
//           <h3>動画投稿</h3>
//           <hr />
//           <div className="VideoPostingUiForm">
//             <div className="ImageUpload">
//               <div className="VideoPostingFormField">
//                 <YoutubeURL onChange={handleChange} value={videoUrl} />
//                  <YouTube videoId={videoId} opts={opts} />
//               </div>
//             </div>
//             <div className="Information">
//               <div className="VideoPostingFormField">
//                 <VideoTitle callSetVideoData={callSetVideoData} />
//               </div>
//               {/* ジャンル */}
//               <div className="VideoPostingFormField">
//                 <div className="workGenre" id="workGenre">
//                   <p className="work_genre">
//                     ジャンル&nbsp;<span className="red_txt">必須</span>
//                     &nbsp;
//                     <span className="alert_red_txt" id="alert_a_3">
//                       タグを入れてください
//                     </span>
//                   </p>
//                   <VideoGenre callSetVideoData={callSetVideoData} />
//                 </div>
//               </div>
//               <div className="VideoPostingFormField">
//                 <Introduction callSetVideoData={callSetVideoData} />
//               </div>
//             </div>
//           </div>
//           <input type="submit" value="送信" className="submit" />
//         </form>
//       </div>
//       {/* </Modal> */}
//     </div>
//   );
// };

const VideoPosting = () => {
  // const [showModal, setShowModal] = useState(false);
  // let navigation = useNavigate();

  // const handleOpenModal = () => {
  //   // setShowModal(true);
  //   navigation("VideoPosting");
  // };

  // const handleCloseModal = () => {
  //   setShowModal(false);
  //   // setFormErrors({}); // エラーメッセージをリセット
  // };

  const [workData, setVideoData] = useState({
    YoutubeURL: "",
    VideoTitle: "",
    VideoGenre: "",
    Introduction: "",
    Obsession: "",
    Language: "",
    Environment: "",
  });
  const [videoUrl, setVideoUrl] = useState("");
  const [videoId, setVideoId] = useState("");

  useEffect(() => {
    console.log(workData);
  }, [workData]);

  const callSetVideoData = (key, value) => {
    setVideoData({
      ...workData,
      [key]: value,
    });
  };

  const handleChange = (event) => {
    const url = event.target.value;
    setVideoUrl(url);

    // YouTubeの動画IDを抽出
    // iframe入力時
    if (url.includes("iframe")) {
      const srcMatch = url.match(/src="https:\/\/www\.youtube\.com\/embed\/([^"]+)?/);
      const srcMatch2 = srcMatch[1].match(/([^?]+)?/);

      if (srcMatch && srcMatch2[1]) {
        setVideoId(srcMatch2[1]);
        console.log("videoId :", videoId);
        callSetVideoData("YoutubeURL", videoId);
      }
    }
    // URL入力時
    else if (url.includes("youtube.com/watch?v=")) {
      const urlObj = new URL(url);
      const params = new URLSearchParams(urlObj.search);
      setVideoId(params.get("v"));
      callSetVideoData("YoutubeURL", videoId);
    }
    // 短縮URL入力時
    else if (url.includes("youtu.be/")) {
      const urlObj = new URL(url);
      setVideoId(urlObj.pathname.substring(1));
      callSetVideoData("YoutubeURL", videoId);
    }
    // 動画ID入力時
    else {
      setVideoId(url);
      callSetVideoData("YoutubeURL", videoId);
    }
  };

  const opts = {
    height: "283",
    width: "450",
    playerVars: {
      modestbranding: 0,
      controls: 0,
      iv_load_policy: 3,
    },
  };

  const VideoSubmit = async (e) => {
    e.preventDefault();
    console.log("e", e.target);

    const formData = new FormData();
    for (const key in workData) {
      formData.append(key, workData[key]);
    }
    try {
      const response = await axios.post("http://localhost:8000/video_posting", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(formData);
      console.log(response.data.message);
    } catch (error) {
      console.log(error.message);
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
                <YoutubeURL onChange={handleChange} value={videoUrl} />
              </div>
              <br />
              {videoId ? <YouTube videoId={videoId} opts={opts} /> : <p>YouTubeのURL、ID、またはiframeコードを入力してください。</p>}
            </div>
            <div className="VideoInformation">
              <div className="VideoPostingFormField">
                <VideoTitle callSetVideoData={callSetVideoData} />
              </div>
              <br />
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
                  <VideoGenre callSetVideoData={callSetVideoData} />
                </div>
              </div>
              <br />
              <div className="VideoPostingFormField">
                <Introduction callSetVideoData={callSetVideoData} />
              </div>
            </div>
          </div>
          <input type="submit" value="送信" className="VideoSubmit" />
        </form>
      </div>
      {/* </Modal> */}
    </div>
  );
};

export default VideoPosting;
