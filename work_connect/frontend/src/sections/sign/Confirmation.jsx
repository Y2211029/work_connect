import { useContext } from "react";
import { Container, RegistarCard } from "./css/RegistarStyled";

import { useSessionStorage } from "src/hooks/use-sessionStorage";
import { emailContext } from "src/components/account/students/EmailContext";

export const Confirmation = () => {
  const AccountData = useContext(emailContext);
  const objAccountData = {};
  for (const [key, value] of AccountData) {
    objAccountData[key] = value;
  }

  const { getSessionData } = useSessionStorage();
  let Account = "";
  Account = getSessionData("accountData");

  // 任意項目入力チェック
  // if(Account)

  return (
    <Container>
      <RegistarCard>
        <ul>
          <li>
            <p>メールアドレス</p>
            <span>{objAccountData.email}</span>
          </li>
          <li>
            <p>姓名</p>
            <span>{Account.sei}</span>
            <span>{Account.mei}</span>
          </li>
          <li>
            <p>セイメイ</p>
            <span>{Account.seiCana}</span>
            <span>{Account.meiCana}</span>
          </li>
          <li>
            <p>ユーザー名</p>
            <span>{Account.userName}</span>
          </li>
          <li>
            <p>パスワード</p>
            <span>{Account.password}</span>
          </li>
          <li>
            <p>卒業年度</p>
            <span>{Account.graduation_year}年</span>
          </li>
          <li>
            <p>学校名</p>
            <span>{Account.school_name}</span>
          </li>
          <li>
            <p>開発環境</p>
            <span>
              
            </span>
          </li>
          <li>
            <p></p>
            <span></span>
          </li>
        </ul>
        <p>学科</p>
        <p>学部</p>
        <p>専攻</p>
        <p>コース</p>
        <p>開発環境</p>
        <p>趣味</p>
        <p>希望勤務地</p>
        <p>プログラミング言語</p>
        <p>取得資格ソフトウェア</p>
      </RegistarCard>
    </Container>
  );
};

export default Confirmation;
