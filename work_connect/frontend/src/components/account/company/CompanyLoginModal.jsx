import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Modal from "react-modal";
import PropTypes from "prop-types";
import axios from "axios";
import $ from "jquery";

import { TopPageModalContext } from "../../../layouts/dashboard";
import { useSessionStorage } from "src/hooks/use-sessionStorage";
import LoginStatusCheck from "src/components/account/loginStatusCheck/loginStatusCheck";

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import "src/App.css";
import ModalStyle from "../ModalStyle";

const CompanyLoginModal = () => {
  const { updateSessionData } = useSessionStorage();
  const { loginStatusCheckFunction } = LoginStatusCheck();

  const navigate = useNavigate();

  const { IsModalContextState, setIsModalContextState } = useContext(TopPageModalContext);
  const { modalOpen } = IsModalContextState;
  const [formValues, setFormValues] = useState({
    user_name: "",
    mail: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [csrfToken, setCsrfToken] = useState("");

  const url = "http://localhost:8000/s_login";
  const csrf_url = "http://localhost:8000/csrf-token";

  // パスワード表示/非表示の切り替え(パスワード)
  const [showPassword, setShowPassword] = useState("");

  const dataUsers = (userName, password) => {
    // e.stopPropagation(); // イベントの伝播を防止
    setFormValues((prev) => ({
      ...prev,
      user_name: userName,
      password: password,
    }));
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClose = (reason) => {
    if (reason === "backdropClick") return;
    setIsModalContextState((prev) => ({
      ...prev,
      modalOpen: false,
    }));
    setFormErrors({}); // エラーメッセージをリセットz
  };

  const handleOnRequestClose = () => {
    setIsModalContextState((prev) => ({
      ...prev,
      modalOpen: false,
    }));
  };

  const handleOpenStudentModal = () => {
    setIsModalContextState((prev) => ({
      ...prev,
      modalType: "学生",
    }));
  };

  // const handleCloseModal = () => {
  //   setShowModal(false);
  //   setFormErrors({}); // エラーメッセージをリセット
  // };

  const handleChange = (e) => {
    console.log("CompanyLogine.target", e.target); // ログ
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
    console.log("Submitted Form: ", formValues); // 追加
    // フォームの送信処理architect_2024-09-12_14-10-31.png
    setFormErrors(validate(formValues));
    setIsSubmit(true);

    //////////////////////////////////////////////////////////////////////////////////////////////////////

    const user_name = formValues.user_name;
    const password = formValues.password;
    const kind = "c";

    console.log("user_name=" + user_name);
    console.log("password=" + password);
    console.log("kind=" + kind);

    async function GetData(user_name, id) {
      try {
        const response = await axios.get("http://localhost:8000/get_profile_mypage", {
          params: {
            ProfileUserName: user_name, // プロフィールとして表示されている人のユーザーネーム
            MyUserId: id, //ログイン中のID
          },
        });
        if (response) {
          updateSessionData("accountData", "CourseName", "");
          updateSessionData("accountData", "DepartmentName", "");
          updateSessionData("accountData", "DesiredOccupation", "");
          updateSessionData("accountData", "Environment", "");
          updateSessionData("accountData", "FacultyName", "");
          updateSessionData("accountData", "Graduation", "");
          updateSessionData("accountData", "Hobby", "");
          updateSessionData("accountData", "Icon", "");
          updateSessionData("accountData", "Intro", "");
          updateSessionData("accountData", "MajorName", "");
          updateSessionData("accountData", "Prefecture", "");
          updateSessionData("accountData", "ProgrammingLanguage", "");
          updateSessionData("accountData", "Qualification", "");
          updateSessionData("accountData", "SchoolName", "");
          updateSessionData("accountData", "Software", "");
          updateSessionData("accountData", "StudentKanaName", "");
          updateSessionData("accountData", "StudentKanaSurName", "");
          updateSessionData("accountData", "StudentName", "");
          updateSessionData("accountData", "StudentSurName", "");

          updateSessionData("accountData", "CourseName", response.data[0].course_name);
          updateSessionData("accountData", "DepartmentName", response.data[0].department_name);
          updateSessionData("accountData", "DesiredOccupation", response.data[0].desired_occupation);
          updateSessionData("accountData", "Environment", response.data[0].development_environment);
          updateSessionData("accountData", "FacultyName", response.data[0].faculty_name);
          updateSessionData("accountData", "Graduation", response.data[0].graduation_year);
          updateSessionData("accountData", "Hobby", response.data[0].hobby);
          updateSessionData("accountData", "Icon", response.data[0].icon);
          updateSessionData("accountData", "Intro", response.data[0].intro);
          updateSessionData("accountData", "MajorName", response.data[0].major_name);
          updateSessionData("accountData", "Prefecture", response.data[0].desired_work_region);
          updateSessionData("accountData", "ProgrammingLanguage", response.data[0].programming_language);
          updateSessionData("accountData", "Qualification", response.data[0].acquisition_qualification);
          updateSessionData("accountData", "SchoolName", response.data[0].school_name);
          updateSessionData("accountData", "Software", response.data[0].software);
          updateSessionData("accountData", "StudentKanaName", response.data[0].student_kananame);
          updateSessionData("accountData", "StudentKanaSurName", response.data[0].student_kanasurname);
          updateSessionData("accountData", "StudentName", response.data[0].student_name);
          updateSessionData("accountData", "StudentSurName", response.data[0].student_surname);

          updateSessionData("accountData", "CompanyAddress", response.data[0].address);
          updateSessionData("accountData", "CompanyAddressMap", response.data[0].map_url);
          updateSessionData("accountData", "CompanyEnvironment", response.data[0].development_environment);
          updateSessionData("accountData", "CompanyHPMap", response.data[0].hp_url);
          updateSessionData("accountData", "CompanyIcon", response.data[0].icon);
          updateSessionData("accountData", "CompanyIndustry", response.data[0].industry);
          updateSessionData("accountData", "CompanyIntro", response.data[0].intro);
          updateSessionData("accountData", "CompanyIntroVideo", response.data[0].video_url);
          updateSessionData("accountData", "CompanyKanaName", response.data[0].company_namecana);
          updateSessionData("accountData", "CompanyName", response.data[0].company_name);
          updateSessionData("accountData", "CompanyPrefecture", response.data[0].prefecture);
          updateSessionData("accountData", "CompanyProgrammingLanguage", response.data[0].programming_language);
          updateSessionData("accountData", "CompanyQualification", response.data[0].acquisition_qualification);
          updateSessionData("accountData", "CompanySelectedOccupation", response.data[0].selected_occupation);
          updateSessionData("accountData", "CompanySoftware", response.data[0].software);
        }
      } catch (err) {
        console.log("err:", err);
      }
    }

    //ajax
    $.ajax({
      url: url, // アクセスするURL "http://localhost:8000/login"
      type: "GET", // POST または GET
      cache: false, // cacheを使うか使わないかを設定
      dataType: "json", // データタイプ (script, xmlDocument, jsonなど)
      data: {
        user_name: user_name,
        password: password,
        kind: kind,
      },
      headers: {
        "X-CSRF-TOKEN": csrfToken,
      },
    })
      .done(function (data) {
        // ajax成功時の処理
        console.log("data", data);

        if (data != null) {
          console.log(data.id);
          console.log("login成功");
          // alert("ログインに成功しました。");

          // データの保存(セッションストレージ)
          updateSessionData("accountData", "id", data.id);
          updateSessionData("accountData", "user_name", data.user_name);
          updateSessionData("accountData", "mail", data.mail);
          updateSessionData("accountData", "popover_icon", data.icon);

          // 右上から自分のプロフィールに飛んだ時に、セッションにデータをセットする
          GetData(data.user_name, data.id);

          console.log("ユーザーidは" + sessionStorage.getItem("user_id"));

          // 二重送信を防ぐため初期化
          // formValues.user_name = "";
          // formValues.password = "";

          loginStatusCheckFunction();

          /*------------------------------------------------------------------*/
          /* ログイン成功時にモーダルを閉じて、作品一覧に飛ばす処理を追加しました。 */
          /*------------------------------------------------------------------*/
          setIsModalContextState((prev) => ({
            ...prev,
            modalOpen: false,
          }));

          setFormValues({
            ...formValues,
            user_name: "",
            password: "",
          });
          navigate("/");
        } else {
          console.log("login失敗");
          alert("ログインに失敗しました。\nユーザー名、メールアドレス、パスワードをご確認ください。");
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
    const regex = /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/;

    if (!values.user_name) {
      errors.user_name = "企業名またはメールアドレスを入力してください";
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

  const renderLoginAccount = (
    <div className="panel-container">
      <div className="panel-content">
        <img className="loginSotushin2025" src="http://localhost:8000/storage/images/work/sotushin2025.png" alt="sotushin panel" />
        <div className="button-container">
          <button type="button" className="login_Honban_data" onClick={() => dataUsers("TechCompany", "TechPassword")}>
            TechCompany
          </button>
          <button type="button" className="login_Honban_data" onClick={() => dataUsers("EcoGreen", "EcoGreenPassword")}>
            EcoGreen
          </button>
          <button type="button" className="login_Honban_data" onClick={() => dataUsers("Financials", "FinancialsPassword")}>
            Financials
          </button>
          <button type="button" className="login_Honban_data" onClick={() => dataUsers("MedicalCare", "MedicalCarePassword")}>
            MedicalCare
          </button>
          <button type="button" className="login_Honban_data" onClick={() => dataUsers("Architect", "ArchitectPassword")}>
            Architect
          </button>
          <button type="button" className="login_Honban_data" onClick={() => dataUsers("Entertainment", "EntertainmentPassword")}>
            Entertainment
          </button>
          <button type="button" className="login_Honban_data" onClick={() => dataUsers("Transport", "TransportPassword")}>
            Transport
          </button>
          <button type="button" className="login_Honban_data" onClick={() => dataUsers("Telecom", "TelecomPassword")}>
            Telecom
          </button>
          <button type="button" className="login_Honban_data" onClick={() => dataUsers("InteriorDesign", "InteriorDesignPassword")}>
            InteriorDesign
          </button>
          <button type="button" className="login_Honban_data" onClick={() => dataUsers("FoodService", "FoodServicePassword")}>
            FoodService
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="LoginModalTopElement">
      {/* 条件付きレンダリングを使用 */}
      <Modal
        isOpen={modalOpen}
        contentLabel="Example Modal"
        onRequestClose={handleOnRequestClose}
        shouldCloseOnOverlayClick={true}
        appElement={document.getElementById("root")}
        style={ModalStyle}
      >
        <div className="Modal">
          <form onSubmit={handleSubmit} className="formInModal">
            {renderLoginAccount}
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
                  ログイン（企業）
                </Typography>
              </Stack>
              {/* モーダル右上の❌ボタン */}
              <IconButton onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </Stack>
            <Divider sx={{ borderStyle: "solid", my: 2, display: "block" }} />
            <div className="loginUiForm">
              <TextField
                label="企業名またはメールアドレス"
                margin="normal"
                name="user_name"
                onChange={handleChange}
                required
                type="text"
                value={formValues.user_name}
                variant="outlined"
                sx={{
                  width: { xs: "95%", sm: "90%", md: "80%" },
                  "& .MuiInputLabel-root": {
                    fontSize: { xs: "10px", sm: "14px", md: "16px" }, // レスポンシブなフォントサイズ
                  },
                }}
              />
              <TextField
                label="パスワード"
                margin="normal"
                name="password"
                onChange={handleChange}
                required
                type={showPassword ? "text" : "password"}
                value={formValues.password}
                variant="outlined"
                sx={{
                  width: { xs: "95%", sm: "90%", md: "80%" },
                  "& .MuiInputLabel-root": {
                    fontSize: { xs: "10px", sm: "14px", md: "16px" }, // レスポンシブなフォントサイズ
                  },
                }}
                // パスワード表示/非表示の切り替え
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        // onMouseDown={handleMouseDownPassword}
                        edge="end"
                        variant="outlined"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              {/* <Button variant="outlined" type="button" className="Login_modal_Button" onClick={fillDemoCredentials} sx={{ width: { xs: "95%", sm: "90%", md: "80%" } }}>
                ユーザーネーム:株式会社アーキテクト パスワード:ArchitectPassword
              </Button> */}
              <Button variant="outlined" className="Login_modal_Button" type="submit" sx={{ width: { xs: "95%", sm: "90%", md: "80%" } }}>
                ログイン
              </Button>
              {Object.keys(formErrors).length === 0 && isSubmit && handleClose}
              <div>
                学生の方はこちらから
                <Link href="" onClick={handleOpenStudentModal} id="loginStudentModalLink" className="Login_Sign_select_C_or_S">
                  ログイン
                </Link>
              </div>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

CompanyLoginModal.propTypes = {
  FromCompanyPage: PropTypes.bool,
  // callSetModalChange: PropTypes.func.isRequired,
};

export default CompanyLoginModal;
