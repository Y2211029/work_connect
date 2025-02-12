import { useState, useEffect } from "react";
import axios from "axios";

import $ from "jquery";

import CircularIndeterminate from "src/components/loading/circle";

import HorizontalLinearStepper from "src/sections/sign/Company/stepbar.jsx";

import { emailContext } from "./EmailContext";

const PreSignUrlCheck = () => {
  const [csrfToken, setCsrfToken] = useState("");
  const [Circul, setCircul] = useState("block");
  const [Stepbar, setStepbar] = useState("none");
  const [AccountData, setAccountData] = useState({ email: "", tf: "" });

  // const oneTimes = useRef(false); // 一度だけ処理させたい処理を管理するuseRefを作成する

  let GetUrl = new URL(window.location.href);
  let params = GetUrl.searchParams;
  const url = "http://localhost:8000/s_pre_register_check";
  const csrf_url = "http://localhost:8000/csrf-token";

  useEffect(() => {
    async function fetchCsrfToken() {
      console.log("fetching CSRF token:OK"); // ログ
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

  useEffect(() => {
    //ajax
    $.ajax({
      url: url, // アクセスするURL
      type: "GET", // POST または GET
      cache: false, // cacheを使うか使わないかを設定
      dataType: "json", // データタイプ (script, xmlDocument, jsonなど)
      data: {
        url_token: params.get("urltoken"),
        kind: "c",
      },
      headers: {
        "X-CSRF-TOKEN": csrfToken,
      },
    })
      .done(function (data) {
        // ajax成功時の処理

        if (data != null) {
          // すでに入力されたメールアドレスが存在している場合に警告文を表示
          if (data.tf == "true") {
            console.log(data);
            console.log("正しいです。");
            setAccountData({ ...AccountData, email: data.email });

            //  ローディングcircle非表示
            <CircularIndeterminate Circul={setCircul("none")} />;
            //  ステップバー表示
            <HorizontalLinearStepper Stepbar={setStepbar("block")} />;
          } else {
            console.log(data);
            console.log("違います。");
            location.href = "/404";

          }
        } else {
          console.log("login失敗");
          alert(
            "ログインに失敗しました。\nユーザーネーム、メールアドレス、パスワードをご確認ください。"
          );
        }

      })
      .fail(function (textStatus, errorThrown) {
        //ajax失敗時の処理
        console.log("Error:", textStatus, errorThrown);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // 空の依存配列を渡して、初回のみ実行するようにする

  let newArray = Object.entries(AccountData);

  // const emailContext = useContext(AccountData);


  return (
    <>
      {/* ローディングcircle表示 */}
      <CircularIndeterminate Circul={Circul} />
      {/* ステップバー */}
      <emailContext.Provider value={newArray}>
        <HorizontalLinearStepper Stepbar={Stepbar} />
      </emailContext.Provider>
      {/* <AccountRegistar /> */}
    </>
  );
};

export default PreSignUrlCheck;
