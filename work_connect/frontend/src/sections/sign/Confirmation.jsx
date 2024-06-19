import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Container, RegistarCard } from "./css/RegistarStyled";
import { useSessionStorage } from "src/hooks/use-sessionStorage";

function Greeting({ test }) {
  return (
    <button className="greeting">
      {test}
    </button>
  );
}

Greeting.propTypes = {
  test: PropTypes.string.isRequired,
};

export const Confirmation = () => {
  const [developmentEnvironment, setDevelopmentEnvironment] = useState([]);
  const { getSessionData } = useSessionStorage();
  let Account = getSessionData("accountData") || {};

  useEffect(() => {
    if (getSessionData("accountData")) {
      let SessionData = getSessionData("accountData");

      if (SessionData.development_environment) {
        let commaArray = SessionData.development_environment.split(",");
        let devtagComponents = commaArray.map((item, index) => (
          <Greeting key={index} test={item} />
        ));
        setDevelopmentEnvironment(devtagComponents);
      }
    }
  }, []);

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
