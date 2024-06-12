import { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";

import Modal from "react-modal";
import axios from "axios";

import $ from "jquery";

import "src/App.css";
import LoginModal from "src/components/account/students/LoginModal";

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

const CompanyLoginModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [formValues, setFormValues] = useState({
    user_name: "",
    mail: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [csrfToken, setCsrfToken] = useState("");

  const clickOneTimes = useRef(false); // 一度だけ処理させたい処理を管理するuseRefを作成する

  const url = "http://localhost:8000/s_login";
  const csrf_url = "http://localhost:8000/csrf-token";


  // ヘッダーのログインボタンを押したときにログインモーダルを開いたり閉じたりする処理
  $("#CompanyloginModalOpenButton").click(function (e) {
    e.preventDefault();
    e.stopPropagation();

    if (clickOneTimes.current) return; // 送信処理中かを判定する（trueなら抜ける）
    clickOneTimes.current = true; // 送信処理中フラグを立てる

    if (showModal == true) {
      setShowModal(false);
    } else {
      setShowModal(true);
    }

    clickOneTimes.current = false; // 送信処理中フラグを下げる
  });
  
  // ログインのform内以外をクリックしたときにモーダルを閉じる処理
  $("*").click(function (e) {
    // クリックした要素の<html>までのすべての親要素の中に"formInModal"クラスがついている要素を取得
    var targetParants = $(e.target).parents(".formInModal");

    // 取得した要素の個数が0個の場合
    if (targetParants.length == 0) {
      // クリックした要素に"formInModal"クラスがついていない場合
      if ($(e.target).attr("class") != "formInModal" && $(e.target).attr("id") != "CompanyloginModalOpenButton") {
        // ログインモーダルを閉じる
        setShowModal(false);
      }
    }
  });
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

  // aysncつけました
  const handleSubmit = async (e) => {
    e.preventDefault();
    // フォームの送信処理
    setFormErrors(validate(formValues));
    setIsSubmit(true);

    //////////////////////////////////////////////////////////////////////////////////////////////////////

    const user_name = document.getElementsByName("user_name")[0].value;
    const password = document.getElementsByName("password")[0].value;

    console.log("user_name" + user_name);
    console.log("password" + password);

    //ajax
    $.ajax({
      url: url, // アクセスするURL "http://localhost:8000/login"
      type: "GET", // POST または GET
      cache: false, // cacheを使うか使わないかを設定
      dataType: "json", // データタイプ (script, xmlDocument, jsonなど)
      data: {
        user_name: user_name,
        password: password,
      },
      headers: {
        "X-CSRF-TOKEN": csrfToken,
      },
    })
      .done(function (data) {
        // ajax成功時の処理

        if (data != null) {
          console.log(data.id);
          console.log("login成功");
          alert("ログインに成功しました。");

          // データの保存(セッションストレージ)
          sessionStorage.setItem("user_id", data.id);
          console.log("ユーザーidは" + sessionStorage.getItem("user_id"));
        } else {
          console.log("login失敗");
          alert(
            "ログインに失敗しました。\nユーザー名、メールアドレス、パスポートをご確認ください。"
          );
        }
      })
      .fail(function (textStatus, errorThrown) {
        //ajax失敗時の処理
        console.log("Error:", textStatus, errorThrown);
      });

    //////////////////////////////////////////////////////////////////////////////////////////////////////
    // handleCloseModal(); // モーダルを閉じる
  };

  const validate = (values) => {
    const errors = {};
    // 有効なメールアドレスか検証
    const regex =
      /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/;

    if (!values.user_name) {
      errors.user_name = "ユーザー名またはメールアドレスを入力してください";
    } else if (/[@]/.test(values.user_name) && !regex.test(values.user_name)) {
      // @マークを含み(メールアドレス)かつ、メールアドレスが無効の場合
      errors.mail = "正しいメールアドレスを入力してください";
    }

    if (!values.password) {
      errors.password = "パスワードを入力してください";
    } else if (values.password.length < 4 || values.password.length > 15) {
      errors.password = "4文字以上15文字以下のパスワードを入力してください";
    }

    return errors;
  };

  return (
    <div>
      {/* javascript:void(0)でリロードを停止させてます。 */}
      <a
        href="javascript:void(0)"
        onClick={handleOpenModal}
        id="CompanyloginModalOpenButton"
      >
        企業の方はこちら
      </a>
      <Modal isOpen={showModal} contentLabel="Example Modal" style={modalStyle}>
        <div className="loginFormContainer">
          <form onSubmit={handleSubmit} className="formInModal">
            <h3>Work & Connect ログイン</h3>
            <hr />
            <div className="loginUiForm">
              <div className="loginFormField">
                <label>ユーザー名またはメールアドレス</label>
                <input
                  type="text"
                  name="user_name"
                  value={formValues.user_name}
                  onChange={handleChange}
                />
              </div>
              <p className="errorMsg">{formErrors.user_name}</p>

              <div className="loginFormField">
                <label>パスワード</label>
                <input
                  type="password"
                  name="password"
                  value={formValues.password}
                  onChange={handleChange}
                />
              </div>
              <p className="errorMsg">{formErrors.password}</p>
              <button type="submit" className="submitButton">
                ログイン
              </button>
              {Object.keys(formErrors).length === 0 &&
                isSubmit &&
                handleCloseModal}
              <button onClick={handleCloseModal}>閉じる</button>
              <LoginModal FromCompanyPage={true} />
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

CompanyLoginModal.propTypes = {
  FromCompanyPage: PropTypes.bool.isRequired,
};

export default CompanyLoginModal;
