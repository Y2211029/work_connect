import { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";

import TextField from "@mui/material/TextField";
import { Container, RegistarCard } from "./css/RegistarStyled";

// 仮登録からemailに届いたURLをクリックしたアカウントのemailを表示するための準備
import { emailContext } from "src/components/account/students/EmailContext";

// sessionStrage呼び出し
import { useSessionStorage } from "../../hooks/use-sessionStorage";

const AccountRegistar = () => {
  // アカウントデータの状態管理
  const [accountData, setAccountData] = useState({
    sei: "",
    mei: "",
    seiCana: "",
    meiCana: "",
    userName: "",
    password: "",
    passwordCheck: "",
  });

  // 入力エラーの状態管理
  const [inputError, setInputError] = useState({
    userName: false,
    password: false,
    // trueだった時にエラーを表示
    passwordCheck: false,
  });

  // 登録項目確認の際に利用
  const { getSessionData, updateSessionData, updateObjectSessionData } = useSessionStorage();

  useEffect(() => {
    // 外部URLから本アプリにアクセスした際に、sessionStrageに保存する
    if (performance.navigation.type !== performance.navigation.TYPE_RELOAD) {
      console.log("外部URLからアクセスしたです。");
      if (getSessionData("accountData") === undefined) {
        updateObjectSessionData("accountData", accountData);
      }
    }
  }, []);

  // sessionStrageに保存されているデータを取得する
  useEffect(() => {
    let sessionDataAccount = getSessionData("accountData");
    console.log("sessionDataAccount", sessionDataAccount);

    setAccountData((prev) => ({
      ...prev,
      sei: sessionDataAccount.sei,
      mei: sessionDataAccount.mei,
      seiCana: sessionDataAccount.seiCana,
      meiCana: sessionDataAccount.meiCana,
      userName: sessionDataAccount.userName,
      password: sessionDataAccount.password,
      passwordCheck: sessionDataAccount.passwordCheck,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // リロードしたときに、accountDataのオブジェクト内のvalueに値があれば、sessionStrageに保存する
  useEffect(() => {
    if (Object.values({ ...accountData }).some((value) => value !== "")) {
      console.log("空じゃないです。");
      updateObjectSessionData("accountData", accountData);
    } else {
      console.log("空。");
    }

    // ESlintError削除、推奨されて無いので他の方法を追々考えます。
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accountData]);

  // const AccountData = useContext(emailContext);
  // const objAccountData = {};

  // //
  // for (const [key, value] of AccountData) {
  //   objAccountData[key] = value;
  // }

  // input要素に全て値が入力されたかどうかをチェック
  // const allInputsFilled = (accountData, inputError, passwordMatch) => {
  //   const allInputsTrue =
  //     !inputError.userName &&
  //     accountData.userName !== "" &&
  //     !inputError.password &&
  //     accountData.password !== "" &&
  //     passwordMatch &&
  //     accountData.passwordCheck !== "";

  //   return allInputsTrue;
  // };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAccountData((prev) => ({ ...prev, [name]: value }));
    // 条件が一致していない場合はエラーを表示
    if (!e.target.checkValidity()) {
      setInputError((prev) => ({ ...prev, [name]: true }));
    } else {
      setInputError((prev) => ({ ...prev, [name]: false }));
    }
  };

  // パスワード確認
  useEffect(() => {
    const passwordMatch = accountData.password === accountData.passwordCheck;
    setInputError((prev) => ({ ...prev, passwordCheck: !passwordMatch }));
  }, [accountData, inputError]); // パスワードまたはパスワード確認が変更されたときに実行

  // sessionStrageにaccountDataを保存

  const AccountData = useContext(emailContext);
  const objAccountData = {};
  for (const [key, value] of AccountData) {
    objAccountData[key] = value;
  }
  updateSessionData("accountData", "mail", AccountData[0][1]);
  return (
    <>
      <Container>
        <RegistarCard>
          <div>
            <TextField
              fullWidth
              label="メールアドレス"
              margin="normal"
              required
              type="email"
              value={objAccountData.email}
              variant="outlined"
              disabled
            />
            <div style={{ display: "flex" }}>
              <TextField
                fullWidth
                label="姓"
                margin="normal"
                name="sei"
                onChange={handleChange}
                required
                type="text"
                value={accountData.sei}
                variant="outlined"
              />
              <TextField
                fullWidth
                label="名"
                margin="normal"
                name="mei"
                onChange={handleChange}
                required
                type="text"
                value={accountData.mei}
                variant="outlined"
              />
            </div>
            <div style={{ display: "flex" }}>
              <TextField
                fullWidth
                label="セイ"
                margin="normal"
                name="seiCana"
                onChange={handleChange}
                required
                type="text"
                value={accountData.seiCana}
                variant="outlined"
              />
              <TextField
                fullWidth
                label="メイ"
                margin="normal"
                name="meiCana"
                onChange={handleChange}
                required
                type="text"
                value={accountData.meiCana}
                variant="outlined"
              />
            </div>
            <TextField
              error={inputError.userName}
              fullWidth
              helperText={
                (inputError.userName ? "ユーザー名が条件に合致していません" : "") +
                "※大文字・小文字・英数字・8文字以上16文字以内"
              }
              label="ユーザー名"
              margin="normal"
              name="userName"
              onChange={handleChange}
              required
              type="text"
              value={accountData.userName}
              inputProps={{
                pattern: "^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\\d).{8,16}$",
                // ^                : 文字列の開始
                // (?=.*[a-z])      : 少なくとも一つの小文字の英字が含まれていること
                // (?=.*[A-Z])      : 少なくとも一つの大文字の英字が含まれていること
                // (?=.*\\d)        : 少なくとも一つの数字が含まれていること
                // .{8,16}          : 全体の長さが8文字以上16文字以下であること
                // $                : 文字列の終了
              }}
              variant="outlined"
            />
            <TextField
              error={inputError.password}
              fullWidth
              helperText={
                (inputError.password ? "パスワードが条件に合致していません" : "") +
                "※大文字・小文字・英数字・8文字以上30文字以内"
              }
              label="パスワード"
              margin="normal"
              name="password"
              onChange={handleChange}
              required
              type="password"
              value={accountData.password}
              inputProps={{
                pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*]).{8,30}$",
                // ^                : 文字列の開始
                // (?=.*[a-z])      : 少なくとも一つの小文字の英字が含まれていること
                // (?=.*[A-Z])      : 少なくとも一つの大文字の英字が含まれていること
                // (?=.*\\d)        : 少なくとも一つの数字が含まれていること
                // (?=.*[!@#$%^&*]) : 少なくとも一つの記号 (!@#$%^&*) が含まれていること
                // .{8,30}          : 全体の長さが8文字以上30文字以下であること
                // $                : 文字列の終了
              }}
              variant="outlined"
            />
            <TextField
              disabled={
                !accountData.password ||
                !new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*]).{8,30}$").test(
                  accountData.password
                )
              }
              error={inputError.passwordCheck}
              fullWidth
              helperText={
                inputError.passwordCheck ? "パスワードが一致しません" : "パスワードが一致しました"
              }
              label="パスワード確認"
              margin="normal"
              name="passwordCheck"
              onChange={handleChange}
              required
              type="password"
              value={accountData.passwordCheck}
              variant="outlined"
            />
          </div>
        </RegistarCard>
      </Container>
    </>
  );
};

AccountRegistar.propTypes = {
  accountData: PropTypes.shape({
    email: PropTypes.string.isRequired,
    userName: PropTypes.string.isRequired,
  }).isRequired,
  inputError: PropTypes.shape({
    userName: PropTypes.bool.isRequired,
  }).isRequired,
  handleChange: PropTypes.func.isRequired, // 必須の関数として定義
  SessionSaveTrigger: PropTypes.string, // ここでSessionSaveTriggerの型を定義
};

export default AccountRegistar;
