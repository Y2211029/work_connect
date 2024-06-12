import { useState, useEffect } from "react";

import { TextField } from "@mui/material";

import "./css/AccountRegistration.css";

const AccountRegistar = () => {
  // アカウントデータの状態管理
  const [accountData, setAccountData] = useState({
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

  // input要素に全て値が入力されたかどうかをチェック
  const allInputsFilled = (accountData, inputError, passwordMatch) => {
    const allInputsTrue =
      !inputError.userName &&
      accountData.userName !== "" &&
      !inputError.password &&
      accountData.password !== "" &&
      passwordMatch &&
      accountData.passwordCheck !== "";

    return allInputsTrue;
  };

  useEffect(() => {
    const passwordMatch = accountData.password === accountData.passwordCheck;
    setInputError((prev) => ({ ...prev, passwordCheck: !passwordMatch }));
    console.log(
      "InputFilled",
      allInputsFilled(accountData, inputError, passwordMatch)
    );
  }, [accountData, inputError]); // パスワードまたはパスワード確認が変更されたときに実行

  // useEffect(() => {
  //   const passwordMatch = accountData.password === accountData.passwordCheck;
  //   setInputError((prev) => ({ ...prev, passwordCheck: !passwordMatch }));
  //   console.log(
  //     "InputFilled",
  //     allInputsFilled(accountData, inputError, passwordMatch)
  //   );
  // }, [
  //   accountData.userName,
  //   accountData.password,
  //   accountData.passwordCheck,
  //   inputError.userName,
  //   inputError.password,
  //   inputError.passwordCheck,
  // ]); // パスワードまたはパスワード確認が変更されたときに実行

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

  return (
    <>
      <div className="Container">
        <div className="LoginCard">
          <div>
            <h3>新規登録</h3>

            <TextField
              error={inputError.userName}
              fullWidth
              helperText={
                (inputError.userName
                  ? "ユーザー名が条件に合致していません"
                  : "") + "　※大文字・小文字・英数字・8文字以上16文字以内"
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
                (inputError.password
                  ? "パスワードが条件に合致していません"
                  : "") + "　※大文字・小文字・英数字・8文字以上30文字以内"
              }
              label="パスワード"
              margin="normal"
              name="password"
              onChange={handleChange}
              required
              type="password"
              value={accountData.password}
              inputProps={{
                pattern:
                  "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*]).{8,30}$",
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
                !new RegExp(
                  "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*]).{8,30}$"
                ).test(accountData.password)
              }
              error={inputError.passwordCheck}
              fullWidth
              helperText={
                inputError.passwordCheck
                  ? "パスワードが一致しません"
                  : "パスワードが一致しました"
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
        </div>
      </div>
    </>
  );
};

export default AccountRegistar;
