import { useEffect, useState } from "react";
import { Container, RegistarCard } from "./css/RegistarStyled";
import { useSessionStorage } from "src/hooks/use-sessionStorage";
function Greeting({ test }) {
  return (
    <button className="greeting">
    {test}
    </button>
  );
}

export const Confirmation = () => {
  const [developmentEnvironment, setDevelopmentEnvironment] = useState();
  const { getSessionData } = useSessionStorage();
  let Account = "";
  Account = getSessionData("accountData");

  let devtagString = "";

  useEffect(() => {
    // if (performance.navigation.type !== performance.navigation.TYPE_RELOAD) {
    // console.log("外部URLからアクセスしたです。");

    if (getSessionData("accountData") !== undefined) {
      let SessionData = getSessionData("accountData");

      if (
        SessionData.development_environment !== undefined &&
        SessionData.development_environment !== ""
      ) {
        let commaArray = SessionData.development_environment.split(",");

        commaArray.map((item) => {
          // devtagString += `<button>${item}</button>`;
          devtagString = {<Greeting test=item />};
        });

        setDevelopmentEnvironment(devtagString);
      }
    }
    // }
  }, []);
  console.log("devtagString", developmentEnvironment);

  return (
    <Container>
      <RegistarCard>
        <ul>
          <li>
            <p>メールアドレス</p>
            <span>{Account.mail}</span>
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
            <span>{developmentEnvironment}</span>
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
