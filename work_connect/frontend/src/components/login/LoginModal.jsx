import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import "../../App.css";
import axios from 'axios';

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


const url = "http://localhost:8000/login";

const LoginModal = () => {

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

  
  /////////////////////////// 初期化
  const [user_name, setUser_name] = useState('');
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [csrfToken, setCsrfToken] = useState('');
  const parser = new DOMParser();

// useEffect関数(importが必要)
  useEffect(() => {
    // async function fetchCsrfToken() {
    //   try {
    //     const response = await axios.get(url); // CSRFトークンを取得するAPIエンドポイント
    //     const newCsrfToken = response.data; // レスポンスからCSRFトークンを抽出
    //     const newCsrfToken2 = parser.parseFromString(newCsrfToken, "text/html"); // document形式に変換
    //     console.log('fetching CSRF token:OK'); // ログ
    //     const newcsrfToken3 = newCsrfToken2.querySelector('meta[name="csrf-token"]').getAttribute('content'); // metaタグのcontentを取得
    //     console.log(newcsrfToken3); // ログ
    //     setCsrfToken(newcsrfToken3); // 状態を更新
    //   } catch (error) {
    //     console.error('Error fetching CSRF token:', error);
    //   }
    // }

    // fetchCsrfToken(); // ページがロードされた時点でCSRFトークンを取得
  }, []); // 空の依存配列を渡して、初回のみ実行するようにする


  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("あああああああああああああああああ"+csrfToken);
    try {
      const response = await axios.post(url, {user_name, mail, password}, {
        headers: {
          'X-CSRF-TOKEN': csrfToken // CSRFトークンをリクエストヘッダーに含める
        }
      });
      console.log(response.data); // ログイン成功時の処理
    } catch (error) {
      console.error(error.response.data); // エラー処理
    }
    // フォームの送信処理
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  // validateの定義
  const validate = (values) => {
    const errors = {};
    const regex = /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/;
    if(!values.user_name) {
      errors.user_name = "ユーザー名を入力してください";
    }
    if(!values.mail) {
      errors.mail = "メールアドレスを入力してください";
    } else if (!regex.test(values.mail)) {
      errors.mail = "正しいメールアドレスを入力してください";
    }
    if(!values.password) {
      errors.password = "パスワードを入力してください";
    } else if (values.password.length < 4) {
      errors.password ="4文字以上15文字以下のパスワードを入力してください";
    } else if (values.password.length > 15) {
      errors.password ="4文字以上15文字以下のパスワードを入力してください";
    }
    return errors;
  };

  return (
    
    <div>
      <button onClick={handleOpenModal}>ログイン</button>
      <Modal isOpen={showModal} contentLabel="Example Modal" style={modalStyle}>
        <div className="loginFormContainer">
          <form onSubmit={handleSubmit}>
            
            <h3>Work & Connect ログイン</h3>
            <hr />
            <div className="loginUiForm">
              <div className="loginFormField">
                <label>ユーザー名</label>
                <input
                  type="text"
                  name="user_name"
                  
                  onChange={handleChange}
                />
              </div>
              <p className="errorMsg">{formErrors.user_name}</p>
              <div className="loginFormField">
                <label>メールアドレス</label>
                <input
                  type="text"
                  name="mail"
                  
                  onChange={handleChange}
                />
              </div>
              <p className="errorMsg">{formErrors.mail}</p>
              <div className="loginFormField">
                <label>パスワード</label>
                <input
                  type="text"
                  name="password"
                  
                  onChange={handleChange}
                />
              </div>
              <p className="errorMsg">{formErrors.password}</p>
              <button type="submit" className="submitButton">ログイン</button>
              {Object.keys(formErrors).length === 0 && isSubmit && handleCloseModal}
              <button onClick={handleCloseModal}>閉じる</button>
              <a href="">生徒の方はこちら</a>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default LoginModal;
