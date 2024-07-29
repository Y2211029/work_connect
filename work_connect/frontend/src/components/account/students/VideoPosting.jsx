import YoutubeURL from "../../../sections/work/WorkPosting/YoutubeURL";
import VideoTitle from "../../../sections/work/WorkPosting/WorkTitle";
import VideoGenre from "../../../sections/video/VideoGenre";
import Introduction from "../../../sections/work/WorkPosting/Introduction";
import YouTube from "react-youtube";
// import Modal from "react-modal";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// import "../../../App.css";
// import { useEffect, useState } from "react";
// import axios from "axios";

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
//   //   navigation("WorkPosting");
//   // };

//   // const handleCloseModal = () => {
//   //   setShowModal(false);
//   //   // setFormErrors({}); // エラーメッセージをリセット
//   // };

//   const [workData, setWorkData] = useState({
//     YoutubeURL: "",
//     WorkTitle: "",
//     WorkGenre: "",
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

//   const callSetWorkData = (key, value) => {
//     setWorkData({
//       ...workData,
//       [key]: value,
//     });
//   };

//   const handleChange = (event) => {
//     const url = event.target.value;
//     setVideoUrl(url);
//     callSetWorkData("YoutubeURL", url);

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

//   const WorkSubmit = async (e) => {
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
//       <div className="WorkPostingFormContainer">
//         <form onSubmit={WorkSubmit} method="post" id="youtubeForm">
//           <h3>動画投稿</h3>
//           <hr />
//           <div className="WorkPostingUiForm">
//             <div className="ImageUpload">
//               <div className="WorkPostingFormField">
//                 <YoutubeURL onChange={handleChange} value={videoUrl} />
//                  <YouTube videoId={videoId} opts={opts} />
//               </div>
//             </div>
//             <div className="Information">
//               <div className="WorkPostingFormField">
//                 <VideoTitle callSetWorkData={callSetWorkData} />
//               </div>
//               {/* ジャンル */}
//               <div className="WorkPostingFormField">
//                 <div className="workGenre" id="workGenre">
//                   <p className="work_genre">
//                     ジャンル&nbsp;<span className="red_txt">必須</span>
//                     &nbsp;
//                     <span className="alert_red_txt" id="alert_a_3">
//                       タグを入れてください
//                     </span>
//                   </p>
//                   <VideoGenre callSetWorkData={callSetWorkData} />
//                 </div>
//               </div>
//               <div className="WorkPostingFormField">
//                 <Introduction callSetWorkData={callSetWorkData} />
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
  //   navigation("WorkPosting");
  // };

  // const handleCloseModal = () => {
  //   setShowModal(false);
  //   // setFormErrors({}); // エラーメッセージをリセット
  // };

  const [workData, setWorkData] = useState({
    YoutubeURL: "",
    WorkTitle: "",
    WorkGenre: "",
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

  const callSetWorkData = (key, value) => {
    setWorkData({
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
      const srcMatch = url.match(
        /src="https:\/\/www\.youtube\.com\/embed\/([^"]+)?/
      );
      const srcMatch2 = srcMatch[1].match(/([^?]+)?/);

      if (srcMatch && srcMatch2[1]) {
        setVideoId(srcMatch2[1]);
        console.log("videoId :", videoId);
        callSetWorkData("YoutubeURL", videoId);
      }
    }
    // URL入力時
    else if (url.includes("youtube.com/watch?v=")) {
      const urlObj = new URL(url);
      const params = new URLSearchParams(urlObj.search);
      setVideoId(params.get("v"));
      callSetWorkData("YoutubeURL", videoId);
    }
    // 短縮URL入力時
    else if (url.includes("youtu.be/")) {
      const urlObj = new URL(url);
      setVideoId(urlObj.pathname.substring(1));
      callSetWorkData("YoutubeURL", videoId);
    }
    // 動画ID入力時
    else {
      setVideoId(url);
      callSetWorkData("YoutubeURL", videoId);
    }
  };

  const opts = {
    height: "283",
    width: "450",
    playerVars: {
      autoplay: 1,
    },
  };

  const WorkSubmit = async (e) => {
    e.preventDefault();
    console.log("e", e.target);

    const formData = new FormData();
    for (const key in workData) {
      formData.append(key, workData[key]);
    }
    try {
      const response = await axios.post(
        "http://localhost:8000/video_posting",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(formData);
      console.log(response.data.message);
    } catch (error) {
      console.log(error.message);
    }

    // e.target.map
  };

  return (
    <div>
      <div className="WorkPostingFormContainer">
        <form onSubmit={WorkSubmit} method="post" id="youtubeForm">
          <h3>動画投稿</h3>
          <div className="WorkPostingUiForm">
            <div className="ImageUpload">
              <div className="WorkPostingFormField">
                <YoutubeURL onChange={handleChange} value={videoUrl} />
              </div>
              {videoId ? <YouTube videoId={videoId} opts={opts} /> : <p>Please enter a valid YouTube URL, ID, or iframe code</p>}
            </div>
            <div className="Information">
              <div className="WorkPostingFormField">
                <VideoTitle callSetWorkData={callSetWorkData} />
              </div>
              {/* ジャンル */}
              <div className="WorkPostingFormField">
                <div className="workGenre" id="workGenre">
                  <p className="work_genre">
                    ジャンル&nbsp;<span className="red_txt">必須</span>
                    &nbsp;
                    <span className="alert_red_txt" id="alert_a_3">
                      タグを入れてください
                    </span>
                  </p>
                  <VideoGenre callSetWorkData={callSetWorkData} />
                </div>
              </div>
              <div className="WorkPostingFormField">
                <Introduction callSetWorkData={callSetWorkData} />
              </div>
            </div>
          </div>
          <input type="submit" value="送信" className="submit" />
        </form>
      </div>
      {/* </Modal> */}
    </div>
  );
};

export default VideoPosting;
