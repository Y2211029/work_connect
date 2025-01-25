import { useState, useEffect, useRef, useContext } from "react";
import Modal from "react-modal";
import PropTypes from "prop-types";
import axios from "axios";
import $ from "jquery";
import { Link } from "react-router-dom";

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";

import { TopPageModalContext } from "../../../layouts/dashboard";

import "src/App.css";
import ModalStyle from "../ModalStyle";
const CompanyPreSignModal = () => {
  // const [showModal, setShowModal] = useState(true);
  const [formValues, setFormValues] = useState({
    mail: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [csrfToken, setCsrfToken] = useState("");
  const [isSubmitting, setIsSubmitting] = useState({
    // 二回目仮登録メール送ろうとした際にボタンの文字を”再送信”に変える
    retransmissionFlag: false,
    setIsSubmitting: false,
  });

  const clickOneTimes = useRef(false); // 一度だけ処理させたい処理を管理するuseRefを作成する

  const { IsModalContextState, setIsModalContextState } = useContext(TopPageModalContext);
  const { preModalOpen } = IsModalContextState;

  const url = "http://localhost:8000/s_pre_register";
  const csrf_url = "http://localhost:8000/csrf-token";

  $("#CompanypreSignModalOpenButton").click(function () {
    if (clickOneTimes.current) return; // 送信処理中かを判定する（trueなら抜ける）
    clickOneTimes.current = true; // 送信処理中フラグを立てる
    clickOneTimes.current = false; // 送信処理中フラグを下げる
  });

  // 親に渡す。
  const handleOpenStudentPreModal = () => {
    // props.callSetPreModalChange("学生");
    setIsModalContextState((prev) => ({
      ...prev,
      preModalType: "学生",
    }));
  };

  const handleCloseModal = (reason) => {
    if (reason === "backdropClick") return;
    setIsModalContextState((prev) => ({
      ...prev,
      preModalOpen: false,
    }));
    setFormErrors({}); // エラーメッセージをリセット
  };

  const handleOnRequestClose = () => {
    setIsModalContextState((prev) => ({
      ...prev,
      preModalOpen: false,
    }));
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
    setIsSubmitting({
      ...setIsSubmitting,
      retransmissionFlag: true, // 二回目仮登録メール送ろうとした際にボタンの文字を”再送信”に変える
      setIsSubmitting: true, //  "仮登録"から"送信中..."にボタンの文字を変える
    });

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
    const kind = "c";

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
        setIsSubmitting({
          ...setIsSubmitting,
          retransmissionFlag: true,
          setIsSubmitting: false, //  "仮登録"から"送信中..."にボタンの文字を変える
        });
        if (data != null) {
          // すでに入力されたメールアドレスが存在している場合に警告文を表示
          if (data == "true") {
            console.log(data);
            console.log("つくれます");
            alert("メールアドレスを送信しました。");

            // 二重送信を防ぐため初期化
            formValues.mail = "";
          } else {
            console.log(data);
            console.log("つくれません");
            alert("このメールアドレスは使用できません。");
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
      {/* #でリロードを停止させてます。 */}

      {/* 条件付きレンダリングを使用 */}
      {/* <button onClick={handleOpenModal}>新規登録</button> */}
      <Modal
        isOpen={preModalOpen}
        contentLabel="Example Modal"
        onRequestClose={handleOnRequestClose}
        shouldCloseOnOverlayClick={true}
        appElement={document.getElementById("root")}
        style={ModalStyle}
      >
        <div className="Modal">
          <form onSubmit={handleSubmit} className="formInModal">
            <Stack
              direction="row"
              spacing={2}
              sx={{
                // height: "100%",
                justifyContent: "space-between",
                alignItems: "align-items: center",
              }}
            >
              <Stack
                direction={{ xs: "column", sm: "column", md: "row" }}
                spacing={2}
                sx={{
                  justifyContent: "space-between",
                  alignItems: "align-items: center",
                }}
              >
                <Typography variant="h5" className="login_modal_items">
                  Work&Connect
                </Typography>
                <Typography variant="h" className="login_modal_items">
                  新規登録（企業）
                </Typography>
              </Stack>
              {/* モーダル右上の❌ボタン */}
              <IconButton onClick={handleCloseModal}>
                <CloseIcon />
              </IconButton>
            </Stack>
            <Divider sx={{ borderStyle: "solid", my: { xs: 1, sm: 2 }, display: "block" }} />
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
              <Button
                variant="outlined"
                className="Login_modal_Button"
                type="submit"
                disabled={isSubmitting.setIsSubmitting}
                sx={{ width: { xs: "95%", sm: "90%", md: "80%" } }}
              >
                {isSubmitting.setIsSubmitting == true ? "送信中..." : isSubmitting.retransmissionFlag == true ? "再送信" : "仮登録"}
              </Button>
              {Object.keys(formErrors).length === 0 && isSubmit && handleCloseModal}
              <Typography variant="h5" className="login_modal_items">
                学生の方はこちらから
                <Link href="" onClick={handleOpenStudentPreModal} id="PreSignStudentModalLink" className="Login_Sign_select_C_or_S">
                  仮登録
                </Link>
              </Typography>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};
CompanyPreSignModal.propTypes = {
  FromCompanyPage: PropTypes.bool,
};
export default CompanyPreSignModal;
