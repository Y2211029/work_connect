import { useState, useEffect } from "react";
import Modal from "react-modal";
import PropTypes from "prop-types";
import TextField from "@mui/material/TextField";

import axios from "axios";

import $ from "jquery";

import "src/App.css";

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

const StudentPreSignModal = (props) => {
  const [showModal, setShowModal] = useState(true);
  const [formValues, setFormValues] = useState({
    mail: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [csrfToken, setCsrfToken] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const url = "http://localhost:8000/s_pre_register";
  const csrf_url = "http://localhost:8000/csrf-token";

  // 親に渡す。
  const handleOpenCompanyPreModal = () => {
    props.callSetPreModalChange("企業");
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFormErrors({}); // エラーメッセージをリセット
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };
  useEffect(() => {
    async function fetchCsrfToken() {
      try {
        const response = await axios.get(csrf_url); // CSRFトークンを取得するAPIエンドポイント
        console.log(response.data.csrf_token); // ログ
        console.log("fetching CSRF token:OK"); // ログ
        const csrfToken = response.data.csrf_token;
        setCsrfToken(csrfToken); // 状態を更新
      } catch (error) {
        console.error("Error fetching CSRF token:", error);
      }
    }
    fetchCsrfToken(); // ページがロードされた時点でCSRFトークンを取得
  }, []); // 空の依存配列を渡して、初回のみ実行するようにする

  const handleSubmit = async (e) => {
    setIsSubmitting(true); // ボタンを無効化する
    // 
    e.preventDefault();

    // フォームの送信処理
    const errors = validate(formValues, true);
    setFormErrors(errors);
    setIsSubmit(true);

    // バリデーションエラーがある場合、処理を中断する
    if (Object.keys(errors).length > 0) {
      return;
    }
    const mail = formValues.mail;
    const kind = "s";
    console.log("mail=" + mail);

    //ajax
    $.ajax({
      url: url, // アクセスするURL
      type: "GET", // POST または GET
      cache: false, // cacheを使うか使わないかを設定
      dataType: "json", // データタイプ (script, xmlDocument, jsonなど)
      data: {
        mail: mail,
        kind: kind,
      },
      headers: {
        "X-CSRF-TOKEN": csrfToken,
      },
    })
      .done(function (data) {
        // ajax成功時の処理

        if (data != null) {
          // すでに入力されたメールアドレスが存在している場合に警告文を表示
          if (data == "true") {
            alert("メールアドレスを送信しました。");
            console.log(data);
            console.log("つくれます");

            // 二重送信を防ぐため初期化
            formValues.mail = "";
          } else {
            alert("このメールアドレスは使用できません。");
            console.log(data);
            console.log("つくれません");
            setFormErrors(validate(null, false));

            // メールアドレスの文字を選択状態にする
            document.getElementsByName("mail")[0].select();

            // データの保存(セッションストレージ)
            // sessionStorage.setItem('user_id', data.id);
            // console.log("ユーザーidは"+sessionStorage.getItem('user_id'));
          }
        } else {
          console.log("login失敗");
          alert("ログインに失敗しました。\nユーザー名、メールアドレス、パスワードをご確認ください。");
        }
      })
      .fail(function (textStatus, errorThrown) {
        //ajax失敗時の処理
        console.log("Error:", textStatus, errorThrown);
      });

    // handleCloseModal(); // モーダルを閉じる
  };

  const validate = (values, boolean) => {
    const errors = {};
    const regex = /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/;
    // メールアドレスがまだ存在しないときはboolean == "true"
    if (boolean == true && !values.mail) {
      errors.mail = "メールアドレスを入力してください";
    } else if (boolean == true && !regex.test(values.mail)) {
      errors.mail = "正しいメールアドレスを入力してください";
    }
    // メールアドレスが既に存在するときはboolean == "false"
    if (boolean == false) {
      errors.mail = "このメールアドレスは既に登録されています。";
    }
    return errors;
  };

  return (
    <div>
      {/* 条件付きレンダリングを使用 */}

      <Modal isOpen={showModal} contentLabel="Example Modal" style={modalStyle}>
        <div className="preSignUpFormContainer">
          <form onSubmit={handleSubmit} className="formInModal">
            <h3>Work & Connect 仮登録</h3>
            <hr />
            <div className="preSignUpUiForm">
              <TextField
                fullWidth
                label="メールアドレス"
                margin="normal"
                name="mail"
                onChange={handleChange}
                type="text"
                value={formValues.mail}
                variant="outlined"
              />
              <p className="errorMsg">{formErrors.mail}</p>
              <button type="submit" className="submitButton" disabled={isSubmitting}>
                {isSubmitting ? '送信中...' : '仮登録'}
              </button>
              {Object.keys(formErrors).length === 0 && isSubmit && handleCloseModal}
              <button onClick={handleCloseModal}>閉じる</button>
              <div onClick={handleOpenCompanyPreModal} id="PreSignCompanyModalLink">
                企業の方はこちら
              </div>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

StudentPreSignModal.propTypes = {
  FromCompanyPage: PropTypes.bool.isRequired,
  callSetPreModalChange: PropTypes.func.isRequired,
};
export default StudentPreSignModal;