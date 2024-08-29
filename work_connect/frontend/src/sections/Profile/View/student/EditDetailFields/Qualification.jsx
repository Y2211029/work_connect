import { useState, useEffect } from "react";
import Select from "react-select";
import PropTypes from 'prop-types';
import { useSessionStorage } from "src/hooks/use-sessionStorage";

const options = [
  { value: "ITパスポート", label: "ITパスポート" },
  { value: "基本情報技術者試験", label: "基本情報技術者試験" },
  { value: "情報セキュリティマネジメント試験", label: "情報セキュリティマネジメント試験" },
  { value: "ITストラテジスト", label: "ITストラテジスト" },
  { value: "普通自動車免許", label: "普通自動車免許" },
  { value: "普通自動二輪免許", label: "普通自動二輪免許" },
  { value: "漢字能力検定 2級", label: "漢字能力検定 2級" },
  { value: "野菜スペシャリスト", label: "野菜スペシャリスト" },
  { value: "Microsoft Office Specialist", label: "Microsoft Office Specialist" },
];

const Qualification = ({QualificationData}) => {
  const [selectedQualification, setSelectedQualification] = useState([]);
  const { getSessionData, updateSessionData } = useSessionStorage();

// valueの初期値をセット
useEffect(() => {
  if (getSessionData("accountData") !== undefined) {
    const SessionData = getSessionData("accountData");
    if(SessionData.QualificationEditing && SessionData.Qualification){
      // セッションストレージから最新のデータを取得
      const devtagArray = SessionData.Qualification.split(",").map(item => ({
        value: item,
        label: item,
      }));
      setSelectedQualification(devtagArray);
    } else if(
      (SessionData.QualificationEditing && SessionData.Qualification && QualificationData)||
      (!SessionData.QualificationEditing && QualificationData)
    ){ // DBから最新のデータを取得
      const devtagArray = QualificationData.split(",").map(item => ({
        value: item,
        label: item,
      }));
      setSelectedQualification(devtagArray);
    }
  }
}, [QualificationData]);

  useEffect(() => {
    let devTag = "";
    let devTagArray = [];
    selectedQualification.map((item) => {
      devTagArray.push(item.value);
    });
    devTag = devTagArray.join(",");

    updateSessionData("accountData", "Qualification", devTag);
  }, [selectedQualification]);

  const handleChange = (selectedOption) => {
    // newValueをセット
    setSelectedQualification(selectedOption);
    // 編集中状態をオン(保存もしくはログアウトされるまで保持)
    updateSessionData("accountData", "QualificationEditing", true);
  };

  return (
    <>
      <Select
        id="acquisitionQualification"
        value={selectedQualification}
        onChange={handleChange}
        options={options}
        placeholder="Select..."
        isMulti
      />
    </>
  );
};

Qualification.propTypes = {
  QualificationData: PropTypes.string ,
};

export default Qualification;
