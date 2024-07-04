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

// import "../../App.css";

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

  return (
    <div>
      {/* <button>作品投稿</button> */}
      {/* <Modal
        isOpen={showModal}
        contentLabel="Example Modal"
        ariaHideApp={false}
        style={modalStyle}
      > */}
        <div className="WorkPostingFormContainer">
          <form action="" method="post" id="youtubeForm">
            <h3>作品投稿</h3>
            <hr />
            <div className="WorkPostingUiForm">
              <div className="WorkPostingFormField">
                <YoutubeURL />
              </div>
              <div className="WorkPostingFormField">
                <ImageUpload />
              </div>
              <div className="WorkPostingFormField">
                <WorkTitle />
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
                  <WorkGenre />
                </div>
              </div>
              <div className="WorkPostingFormField">
                <Introduction />
              </div>
              <div className="WorkPostingFormField">
                <Obsession />
              </div>
              <div className="WorkPostingFormField">
                <p>プログラミング言語</p>
                <Language />
              </div>
              <div className="WorkPostingFormField">
                <p>開発環境</p>
                <Environment />
              </div>

              {/* <button onClick={handleCloseModal}>閉じる</button> */}
            </div>
          </form>
        </div>
      {/* </Modal> */}
    </div>
  );
};

export default WorkPosting;
