// import { useEffect } from "react";
import { Container, RegistarCard } from "./css/RegistarStyled";

// import { useSessionStorage } from "src/hooks/use-sessionStorage";
import Email from "./email/emai";

export const Confirmation = () => {
  // const { getSessionData } = useSessionStorage();

  return (
    <Container>
      <RegistarCard>
        <ul>
          <li>
            <p>メールアドレス</p>
            <span>{<Email />}</span>
          </li>
          <li>
            <p>ユーザー名</p>
            <span></span>
          </li>
          <li>
            <p>パスワード</p>
          </li>
        </ul>

        <p>卒業年度</p>
        <p>学校名</p>
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
