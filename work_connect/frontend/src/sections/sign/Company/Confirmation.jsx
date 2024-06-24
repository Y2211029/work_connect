import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Container, RegistarCard } from "../css/RegistarStyled";
import { useSessionStorage } from "src/hooks/use-sessionStorage";

function CreateTagElements({ itemContents }) {
  return <button className="greeting">{itemContents}</button>;
}

// li要素のP要素に項目名を表示させるのに必要なオブジェクトをセット
const displayContentsName = {
  mail: "メールアドレス",
  sei: "企業名",
  seiCana: "企業名(カタカナ)",
  userName: "ユーザーネーム",
  password: "パスワード",
  // passwordCheck: "パスワードチェック",
  occupation: "職種",
  Prefecture: "勤務地",
  HP_URL: "ホームページURL",
};

// メールチェック

// 複数選択タグを表示するための関数
const useTagListShow = (tagName, sessionData) => {
  const [tags, setTags] = useState([]);
  useEffect(() => {
    if (sessionData && sessionData[tagName]) {
      const commaArray = sessionData[tagName].split(",");
      const devtagComponents = commaArray.map((item) => (
        <CreateTagElements key={item} itemContents={item} />
      ));
      setTags(devtagComponents);
    }
  }, [sessionData, tagName]);
  return tags;
};

// 別コンポーネントに分離する。
const SessionDataList = ({ sessionData }) => {
  const Occupation = useTagListShow("Occupation", sessionData);
  const Prefecture = useTagListShow("Prefecture", sessionData);
  let itemContentValues = [];

  return (
    <>
      <ul>
        {/* entriesはオブジェクト内のkeyとvalueをセットで"配列"にして渡してくれる。 */}
        {Object.entries(displayContentsName).map(([key, label]) => {
          const value = sessionData[key];
          // Occupationこの作成したタグを入れ替えたい。
          // sessionDataから取り出した値が空でないものを表示する。
          if (value !== null && value !== "" && value !== undefined) {
            if (label === "職種") {
              itemContentValues = <span>{Occupation}</span>;
            } else if (label === "勤務地") {
              itemContentValues = <span>{Prefecture}</span>;
            } else {
              itemContentValues = value;
            }
            return (
              <li key={key}>
                <p>{label}</p>
                {itemContentValues}
              </li>
            );
          }
          return null;
        })}
      </ul>
    </>
  );
};

SessionDataList.propTypes = {
  sessionData: PropTypes.object.isRequired,
};
const Confirmation = () => {
  // セッションデータを取得する関数
  const { getSessionData } = useSessionStorage();
  const [sessionData, setSessionData] = useState({});

  useEffect(() => {
    const data = getSessionData("accountData");
    if (data) {
      setSessionData(data);
    }
  }, []);

  return (
    <Container>
      <RegistarCard>
        <SessionDataList sessionData={sessionData} />
      </RegistarCard>
    </Container>
  );
};

export default Confirmation;

CreateTagElements.propTypes = {
  itemContents: PropTypes.string.isRequired,
};
// SessionDataList.propTypes = {
//   itemContents: PropTypes.string.isRequired,
// };
