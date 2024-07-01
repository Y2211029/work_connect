import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Container, RegistarCard } from "./css/RegistarStyled";
import { useSessionStorage } from "src/hooks/use-sessionStorage";

function CreateTagElements({ itemContents }) {
  return <button className="greeting">{itemContents}</button>;
}

// li要素のP要素に項目名を表示させるのに必要なオブジェクトをセット
const displayContentsName = {
  mail: "メールアドレス",
  student_surname: "姓",
  student_name: "名",
  student_kanasurname: "セイ",
  student_kananame: "メイ",
  user_name: "ユーザーネーム",
  password: "パスワード",
  // passwordCheck: "パスワードチェック",
  graduation_year: "卒業年度",
  school_name: "学校名",
  department_name: "学部",
  faculty_name: "学科",
  desired_work_region: "希望勤務地",
  desired_occupation: "希望職種",
  development_environment: "開発環境",
  acquisition_qualification: "取得資格",
  programming_language: "プログラミング言語",
  software: "ソフトウェア",
  hobby: "趣味",
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
  const developmentEnvironment = useTagListShow("development_environment", sessionData);
  const hobby = useTagListShow("hobby", sessionData);
  const desiredWorkRegion = useTagListShow("desired_work_region", sessionData);
  const desiredOccupation = useTagListShow("desired_occupation", sessionData);
  const programmingLanguage = useTagListShow("programming_language", sessionData);
  const acquisitionQualification = useTagListShow("acquisition_qualification", sessionData);
  const software = useTagListShow("software", sessionData);

  let itemContentValues = [];

  return (
    <>
      <ul>
        {/* entriesはオブジェクト内のkeyとvalueをセットで"配列"にして渡してくれる。 */}
        {Object.entries(displayContentsName).map(([key, label]) => {
          const value = sessionData[key];
          // developmentEnvironmentこの作成したタグを入れ替えたい。
          // sessionDataから取り出した値が空でないものを表示する。
          if (value !== null && value !== "" && value !== undefined) {
            if (label === "開発環境") {
              itemContentValues = <span>{developmentEnvironment}</span>;
            } else if (label === "趣味") {
              itemContentValues = <span>{hobby}</span>;
            } else if (label === "希望勤務地") {
              itemContentValues = <span>{desiredWorkRegion}</span>;
            } else if (label === "希望職種") {
              itemContentValues = <span>{desiredOccupation}</span>;
             } else if (label === "プログラミング言語") {
              itemContentValues = <span>{programmingLanguage}</span>;
            } else if (label === "取得資格") {
              itemContentValues = <span>{acquisitionQualification}</span>;
            } else if (label === "ソフトウェア") {
              itemContentValues = <span>{software}</span>;
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
