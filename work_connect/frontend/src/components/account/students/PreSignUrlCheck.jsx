import { useState, useEffect } from "react";
import axios from "axios";

import $ from "jquery";

import CircularIndeterminate from "../../loading/circle";

import HorizontalLinearStepper from "../stepbar";

const PreSignUrlCheck = () => {
  const [csrfToken, setCsrfToken] = useState("");
  const [Circul, setCircul] = useState("block");
  const [Stepbar, setStepbar] = useState("none");

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

  //ajax
  $.ajax({
    url: url, // アクセスするURL
    type: "GET", // POST または GET
    cache: false, // cacheを使うか使わないかを設定
    dataType: "json", // データタイプ (script, xmlDocument, jsonなど)
    data: {
      url_token: params.get("urltoken"),
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
          console.log(data);
          console.log("正しいです。");
          //  ローディングcircle非表示
          <CircularIndeterminate Circul={setCircul("none")} />;
          //  ステップバー表示
          <HorizontalLinearStepper Stepbar={setStepbar("block")} />;
          // <AccountRegistar />;
        } else {
          console.log(data);
          console.log("違います。");
          location.href = "/404";
        }
      } else {
        console.log("login失敗");
        alert(
          "ログインに失敗しました。\nユーザー名、メールアドレス、パスワードをご確認ください。"
        );
      }
    })
    .fail(function (textStatus, errorThrown) {
      //ajax失敗時の処理
      console.log("Error:", textStatus, errorThrown);
    });
  return (
    <>
      {/* ローディングcircle表示 */}
      <CircularIndeterminate Circul={Circul} />
      {/* ステップバー */}
      <HorizontalLinearStepper Stepbar={Stepbar} />
      {/* <AccountRegistar /> */}
    </>
  );
};

export default PreSignUrlCheck;
