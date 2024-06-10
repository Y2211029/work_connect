import { useState } from "react";
import Modal from "react-modal";
import "../../../App.css";
import PreSignModal from '../students/PreSignModal';

// ログインのモーダル CSS設定
const modalStyle = {
  content: {
    position: "none",
    backgroundColor: "rgb(0 0 0 / 70%)",
    border: "none",
    borderRadius: "0",
    padding: "1.5rem",
    overflow: "none"
    }
};

const CompanyPreSignModal = () => {

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
    const regex = /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/;
    if(!values.mail) {
      errors.mail = "メールアドレスを入力してください";
    } else if (!regex.test(values.mail)) {
      errors.mail = "正しいメールアドレスを入力してください";
    }
    return errors;
  };

  return (
    <div>
      {/* javascript:void(0)でリロードを停止させてます。 */}
      <a href="javascript:void(0)" onClick={handleOpenModal} id="goCampanyPreSign">企業の方はこちら</a>
      {/* <button onClick={handleOpenModal}>新規登録</button> */}
      <Modal isOpen={showModal} contentLabel="Example Modal" style={modalStyle}>
        <div className="preSignUpFormContainer">
          <form onSubmit={handleSubmit}>
            <h3>Work & Connect 仮登録</h3>
            <hr />
            <div className="preSignUpUiForm">
              <div className="preSignUpFormField">
                <label>メールアドレス</label>
                <input
                  type="text"
                  name="mail"
                  value={formValues.mail}
                  onChange={handleChange}
                />
              </div>
              <p className="errorMsg">{formErrors.mail}</p>
              <button type="submit" className="submitButton">仮登録</button>
              {Object.keys(formErrors).length === 0 && isSubmit && handleCloseModal}
              <button onClick={handleCloseModal}>閉じる</button>
              <PreSignModal FromCompanyPage={true}/>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default CompanyPreSignModal;
