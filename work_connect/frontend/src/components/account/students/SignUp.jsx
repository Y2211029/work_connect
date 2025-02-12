import { useState } from "react";
import Modal from "react-modal";
import "src/App.css";
import "src/components/tag/tag.css";
import GraduationYearDropdown from "src/sections/sign/student/SchoolInformation/GraduationYearDropdown";
import SchoolNameDropdown from "src/sections/sign/student/SchoolInformation/SchoolNameDropdown";


// ログインのモーダル CSS設定
const modalStyle = {
  content: {
    position: "none",
    backgroundColor: "rgb(0 0 0 / 70%)",
    border: "none",
    borderRadius: "0",
    padding: "1.5rem",
    overflow: "none",
  },
};

const SignUp = () => {
  const [showModal, setShowModal] = useState(false);
  const [formValues, setFormValues] = useState({
    user_name: "",
    mail: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFormErrors({}); // エラーメッセージをリセット
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // フォームの送信処理
    setFormErrors(validate(formValues));
    setIsSubmit(true);
    // handleCloseModal(); // モーダルを閉じる
  };

  const validate = (values) => {
    const errors = {};
    const regex =
      /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/;
    if (!values.mail) {
      errors.mail = "メールアドレスを入力してください";
    } else if (!regex.test(values.mail)) {
      errors.mail = "正しいメールアドレスを入力してください";
    }
    return errors;
  };

  return (
    <div>
      <button onClick={handleOpenModal}>本登録</button>
      <Modal
        isOpen={showModal}
        contentLabel="Example Modal"
        ariaHideApp={false}
        style={modalStyle}
      >
        <div className="signUpFormContainer">
          <form onSubmit={handleSubmit}>
            <h3>Work&Connect 本登録</h3>
            <hr />
            <div className="signUpUiForm">
              <div className="signUpFormField">
                <label>ユーザーネーム</label>
                <input
                  type="text"
                  name="mail"
                  value={formValues.mail}
                  onChange={handleChange}
                />
              </div>
              <p className="errorMsg">{formErrors.mail}</p>
              <br />

              <div className="signUpFormField">
                <label>パスワード</label>
                <input
                  type="text"
                  name="mail"
                  value={formValues.mail}
                  onChange={handleChange}
                />
              </div>
              <p className="errorMsg">{formErrors.mail}</p>
              <br />

              <div className="signUpFormField_name">
                <div className="signUpFormField_kanji">
                  <label>名前</label>
                  <br />
                  <input
                    type="text"
                    name="mail"
                    value={formValues.mail}
                    placeholder="姓"
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    name="mail"
                    value={formValues.mail}
                    placeholder="名"
                    onChange={handleChange}
                  />
                </div>
                <p className="errorMsg">{formErrors.mail}</p>
                <br />

                <div className="signUpFormField_kana">
                  <label>フリガナ</label>
                  <br />
                  <input
                    type="text"
                    name="mail"
                    value={formValues.mail}
                    placeholder="セイ"
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    name="mail"
                    value={formValues.mail}
                    placeholder="メイ"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <p className="errorMsg">{formErrors.mail}</p>
              <br />

              <div className="signUpFormField">
                <label>学校名</label>
                <SchoolNameDropdown />
              </div>
              <p className="errorMsg">{formErrors.mail}</p>
              <br />

              <div className="signUpFormField">
                <label>卒業予定年度</label>
                <GraduationYearDropdown />
              </div>
              <p className="errorMsg">{formErrors.mail}</p>
              <br />

              <button type="submit" className="submitButton">
                登録
              </button>
              {Object.keys(formErrors).length === 0 &&
                isSubmit &&
                handleCloseModal}
              <button onClick={handleCloseModal}>閉じる</button>
              <a href="">企業の方はこちら</a>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default SignUp;
