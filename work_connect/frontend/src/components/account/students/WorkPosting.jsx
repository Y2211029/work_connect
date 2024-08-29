import YoutubeURL from "../../../sections/work/WorkPosting/YoutubeURL";
import ImageUpload from "../../../sections/work/WorkPosting/ImageUpload";
import WorkTitle from "../../../sections/work/WorkPosting/WorkTitle";
import WorkGenre from "../../../sections/work/WorkPosting/WorkGenre";
import Introduction from "../../../sections/work/WorkPosting/Introduction";
import Obsession from "../../../sections/work/WorkPosting/Obsession";
import Language from "../../../sections/work/WorkPosting/Language";
import Environment from "../../../sections/work/WorkPosting/Environment";
// import Modal from "react-modal";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

import "../../../App.css";
import { useEffect, useState } from "react";
import axios from "axios";

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

  const [imageFiles, setImageFiles] = useState([]);
  const [message, setMessage] = useState("");
  const [imagesName, setImagesName] = useState("");

  const [Image, setImage] = useState();

  const coleSetImage = (e) => {
    setImage(e);
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
    console.log(images);
    setImagesName(images.map((item) => item.name).join(", "));
    console.log(imagesName);
    // images.forEach(image => {
    //   console.log(`File name: ${image.name}, URL: ${image.image}`);
    // });
    // console.log("bbbb");

    setImageFiles(images);
    console.log(imageFiles);
  };

  const WorkSubmit = async (e) => {
    e.preventDefault();
    console.log("e", e.target);

    const formData = new FormData();
    console.log("Image: ", Image);
    // imageFiles.forEach((file) => {
    //   formData.append(`images[]`, file);
    //   console.log(file);
    // });

    // formDataに画像データを1個追加
    // Imageに入っているデータの形がfileListのため、mapやforEachでループできない
    for (let i = 0; i < Image.length; i++) {
      formData.append("images[]", Image[i]);
    }

    for (const key in workData) {
      formData.append(key, workData[key]);
    }
    formData.append("imagesName", imagesName);
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
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.message);
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
                  <YoutubeURL callSetWorkData={callSetWorkData} />
                </div>
                <div className="WorkPostingImageFormField">
                  <ImageUpload
                    onImagesUploaded={handleImageChange}
                    coleSetImage={coleSetImage}
                  />
                </div>
              </div>
            </div>
            <div className="Information">
              <div className="WorkPostingFormField">
                <WorkTitle callSetWorkData={callSetWorkData} />
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
                  <WorkGenre callSetWorkData={callSetWorkData} />
                </div>
              </div>
              <div className="WorkPostingFormField">
                <Introduction callSetWorkData={callSetWorkData} />
              </div>
              <div className="WorkPostingFormField">
                <Obsession callSetWorkData={callSetWorkData} />
              </div>
              <div className="WorkPostingFormField">
                <p>プログラミング言語</p>
                <Language callSetWorkData={callSetWorkData} />
              </div>
              <div className="WorkPostingFormField">
                <p>開発環境</p>
                <Environment callSetWorkData={callSetWorkData} />
              </div>
            </div>
          </div>
          <input type="submit" value="送信" className="submit" />
        </form>
        {message && <p>{message}</p>}
      </div>
      {/* </Modal> */}
    </div>
  );
};

export default WorkPosting;
