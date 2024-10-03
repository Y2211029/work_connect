import YoutubeURL from "../../../sections/work/WorkPosting/YoutubeURL";
import ImageUpload from "../../../sections/work/WorkPosting/ImageUpload";
import WorkTitle from "../../../sections/work/WorkPosting/WorkTitle";
import WorkGenre from "../../../sections/work/WorkPosting/WorkGenre";
import Introduction from "../../../sections/work/WorkPosting/Introduction";
import Obsession from "../../../sections/work/WorkPosting/Obsession";
import Language from "../../../sections/work/WorkPosting/Language";
import Environment from "../../../sections/work/WorkPosting/Environment";
// import Modal from "react-modal";

import "../../../App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// ログインのモーダル CSS設定
// const modalStyle = {
//   content: {
//     position: "none",
//     backgroundColor: "rgb(0 0 0 / 70%)",
//     border: "none",
//     borderRadius: "0",
//     padding: "1.5rem",
//     overflow: "none",
//   },
// };

const WorkPosting = () => {
  // const [showModal, setShowModal] = useState(false);
  let navigation = useNavigate();

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

  const [imageFiles, setImageFiles] = useState([]);
  const [message, setMessage] = useState("");
  const [imagesName, setImagesName] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [videoId, setVideoId] = useState("");
  const [hasError, setHasError] = useState(false);

  const [Image, setImage] = useState();

  const coleSetImage = (e) => {
    setImage(e);
    // console.log("image: ",Image);
  };

  useEffect(() => {
    console.log("workData", workData);
  }, [workData]);

  const callSetWorkData = (key, value) => {
    setWorkData({
      ...workData,
      [key]: value,
    });
  };

  const handleImageChange = (images) => {
    console.log("images: ", images);
    setImageFiles(images);
    setImagesName(images.map((item) => item.name).join(", "));
  };

  // useEffectでstateが更新された直後に処理を実行する
  useEffect(() => {
    console.log("imagesName updated: ", imagesName);
  }, [imagesName]);

  useEffect(() => {
    console.log("imageFiles updated: ", imageFiles);
    console.log(Array.isArray(imageFiles)); // trueなら配列です
  }, [imageFiles]);

  const handleChange = (event) => {
    const url = event.target.value;
    setVideoUrl(url);
    setHasError(url === "");

    // 入力が空の場合、videoIdをリセットしてYoutubeURLをクリア
    if (url === "") {
      setVideoId(""); // videoIdを空にリセット
      callSetWorkData("YoutubeURL", ""); // YoutubeURLもリセット
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
      callSetWorkData("YoutubeURL", extractedVideoId); // 最新のvideoIdを反映
    }
  };

  const WorkSubmit = async (e) => {
    e.preventDefault();
    console.log("e", e.target);
    async function PostData() {
      const formData = new FormData();
      console.log("Image: ", Image);
      // imageFiles.forEach((file) => {
      //   formData.append(`images[]`, file);
      //   console.log(file);
      // });

      // formDataに画像データを1個追加
      // Imageに入っているデータの形がfileListのため、mapやforEachでループできない
      // imageFilesが配列として扱える場合
      imageFiles.forEach((file) => {
        formData.append("images[]", file); // ファイルの追加
      });

      for (const key in workData) {
        formData.append(key, workData[key]);
      }
      // formData.append("imagesName", imagesName);
      console.log("...formData.entries(): ", ...formData.entries());

      try {
        const response = await axios.post(
          "http://localhost:8000/work_posting",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log(formData);
        navigation("/WorkSelect");
        setMessage(response.data.message);
      } catch (error) {
        setMessage(error.message);
      }
    }

    if (
      !workData.WorkTitle ||
      !workData.WorkGenre ||
      !workData.Introduction ||
      !workData.Obsession ||
      !FileList
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
      <div className="WorkPostingFormContainer">
        <form onSubmit={WorkSubmit} method="post" id="youtubeForm">
          <h3>作品投稿</h3>
          <div className="WorkPostingUiForm">
            <div className="ImageUpload">
              <div className="Image">
                <div className="WorkPostingFormField">
                  <YoutubeURL
                    onChange={handleChange}
                    value={videoUrl}
                    error={hasError}
                  />
                </div>
                {videoId ? (
                  <p>
                    <br />
                  </p>
                ) : (
                  <p>
                    YouTubeのURL、ID、またはiframeコードを入力してください。
                  </p>
                )}
                <div className="WorkPostingImageFormField">
                  <ImageUpload
                    onImagesUploaded={handleImageChange}
                    coleSetImage={coleSetImage}
                  />
                </div>
              </div>
            </div>
            <div className="WorkInformation">
              <div className="WorkPostingFormField">
                <WorkTitle callSetWorkData={callSetWorkData} />
              </div>
              {/* ジャンル */}
              <div className="WorkPostingFormField">
                <div className="workGenre" id="workGenre">
                  <p className="work_genre">
                    ジャンル*
                    {/* ジャンル&nbsp;<span className="red_txt">必須</span>
                    &nbsp;
                    <span className="alert_red_txt" id="alert_a_3">
                      タグを入れてください
                    </span> */}
                  </p>
                  <WorkGenre callSetWorkData={callSetWorkData} />
                </div>
              </div>
              <br />
              <div className="WorkPostingFormField">
                <Introduction callSetWorkData={callSetWorkData} />
              </div>
              <div className="WorkPostingFormField">
                <Obsession callSetWorkData={callSetWorkData} />
              </div>
              <div className="WorkPostingFormField">
                <p>
                  プログラミング言語
                  <Language callSetWorkData={callSetWorkData} />
                </p>
              </div>
              <div className="WorkPostingFormField">
                <p>
                  開発環境
                  <Environment callSetWorkData={callSetWorkData} />
                </p>
              </div>
            </div>
          </div>
          <input type="submit" value="送信" className="WorkSubmit" />
        </form>
        {message && <p>{message}</p>}
      </div>
      {/* </Modal> */}
    </div>
  );
};

export default WorkPosting;
