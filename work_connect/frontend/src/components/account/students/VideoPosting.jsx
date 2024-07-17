import YoutubeURL from "../../../sections/work/WorkPosting/YoutubeURL";
import ImageUpload from "../../../sections/work/WorkPosting/ImageUpload";
import WorkTitle from "../../../sections/work/WorkPosting/WorkTitle";
import WorkGenre from "../../../sections/video/VideoGenre";
import Introduction from "../../../sections/work/WorkPosting/Introduction";
// import Modal from "react-modal";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

import "../../../App.css";
import { useEffect, useState } from "react";

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

  const [workData,setWorkData] = useState({
    YoutubeURL: "",
    WorkTitle: "",
    WorkGenre: "",
    Introduction: "",
    Obsession: "",
    Language: "",
    Environment: "",
  })

  useEffect(() => {
    console.log(workData);
  }, [workData])

  const callSetWorkData = (key, value) => {
    setWorkData({
      ...workData, [key]: value
    })
  }

  const WorkSubmit = (e) => {
    e.preventDefault();
    console.log("e" ,e.target);
    // e.target.map
    
  }

  return (
    <div>
      <div className="WorkPostingFormContainer">
        <form onSubmit={WorkSubmit} method="post" id="youtubeForm">
          <h3>作品投稿</h3>
          <hr />
          <div className="WorkPostingUiForm">
            <div className="ImageUpload">
              <div className="WorkPostingFormField">
                <YoutubeURL callSetWorkData={callSetWorkData} />
              </div>
              <div className="WorkPostingFormField">
                <ImageUpload />
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