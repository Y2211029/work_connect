import { useState, useEffect } from "react";
import Select from "react-select";
import PropTypes from 'prop-types';
import { useSessionStorage } from "src/hooks/use-sessionStorage";

const options = [
  { value: "IT", label: "IT" },
  { value: "Sler", label: "Sler" },
  { value: "独立系", label: "独立系" },
  { value: "フィンテック", label: "フィンテック" },
  { value: "デジタルトランスフォーメーション", label: "デジタルトランスフォーメーション" },
  { value: "IoT", label: "IoT" },
  { value: "AI", label: "AI" },
  { value: "RPA", label: "RPA" },
  { value: "BtoB", label: "BtoB" },
];

const Industry = ({IndustryData}) => {
  const [selectedIndustry, setSelectedIndustry] = useState([]);
  const { getSessionData, updateSessionData } = useSessionStorage();

// valueの初期値をセット
useEffect(() => {
  if (getSessionData("accountData") !== undefined){
    const SessionData = getSessionData("accountData");
    if(SessionData.IndustryEditing && SessionData.Industry){
      // セッションストレージから最新のデータを取得
      const devtagArray = SessionData.Industry.split(",").map(item => ({
        value: item,
        label: item,
      }));
      setSelectedIndustry(devtagArray);
    } else if(
      (SessionData.IndustryEditing && SessionData.Industry && IndustryData)||
      (!SessionData.IndustryEditing && IndustryData)
    ){ // DBから最新のデータを取得
      const devtagArray = IndustryData.split(",").map(item => ({
        value: item,
        label: item,
      }));
      setSelectedIndustry(devtagArray);
    }
  }
}, [IndustryData]);

  useEffect(() => {
    let devTag = "";
    let devTagArray = [];
    selectedIndustry.map((item) => {
      devTagArray.push(item.value);
    });
    devTag = devTagArray.join(",");

    updateSessionData("accountData", "Industry", devTag);
  }, [selectedIndustry]);

  const handleChange = (selectedOption) => {
    // newValueをセット
    setSelectedIndustry(selectedOption);
    // 編集中状態をオン(保存もしくはログアウトされるまで保持)
    updateSessionData("accountData", "IndustryEditing", true);
  };

  return (
    <>
      <Select
        id="acquisitionIndustry"
        value={selectedIndustry}
        onChange={handleChange}
        options={options}
        placeholder="Select..."
        isMulti
      />
    </>
  );
};

Industry.propTypes = {
  IndustryData: PropTypes.string ,
};

export default Industry;
