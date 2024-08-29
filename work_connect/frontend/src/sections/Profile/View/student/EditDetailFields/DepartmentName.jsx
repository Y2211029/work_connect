import { useState, useEffect } from "react";
import Select from "react-select";
import PropTypes from 'prop-types';
import { useSessionStorage } from "src/hooks/use-sessionStorage";

const options = [
  { value: "総合政策学部", label: "総合政策学部" },
  { value: "経済学部", label: "経済学部" },
  { value: "経営学部", label: "経営学部" },
  { value: "商学部", label: "商学部" },
  { value: "社会学部", label: "社会学部" },
  { value: "観光学部", label: "観光学部" },
  { value: "国際関係学部", label: "国際関係学部" },
  { value: "国際文化学部", label: "国際文化学部" },
  { value: "国際教養学部", label: "国際教養学部" },
  { value: "文学部", label: "文学部" },
  { value: "人間科学部", label: "人間科学部" },
  { value: "外国語学部", label: "外国語学部" },
  { value: "教育学部", label: "教育学部" },
  { value: "子ども学部", label: "子ども学部" },
  { value: "社会福祉学部", label: "社会福祉学部" },
  { value: "家政学部", label: "家政学部" },
  { value: "芸術学部", label: "芸術学部" },
  { value: "体育学部", label: "体育学部" },
  { value: "健康科学部", label: "健康科学部" },
  { value: "教養学部", label: "教養学部" },
  { value: "理学部", label: "理学部" },
  { value: "工学部", label: "工学部" },
  { value: "農学部", label: "農学部" },
  { value: "水産学部", label: "水産学部" },
  { value: "獣医学部", label: "獣医学部" },
  { value: "医学部", label: "医学部" },
  { value: "歯学部", label: "歯学部" },
  { value: "薬学部", label: "薬学部" },
  { value: "看護学部", label: "看護学部" },
  { value: "保健学部", label: "保健学部" },
  { value: "医療技術学部", label: "医療技術学部" },
];

const DepartmentNameDropdown = ({DepartmentNameData}) => {
  const [selectedDepartment, setSelectedDepartment] = useState(DepartmentNameData);

  const { getSessionData, updateSessionData } = useSessionStorage();

  // valueの初期値をセット
  useEffect(() => {
    if (getSessionData("accountData") !== undefined) {
      const SessionData = getSessionData("accountData");
     
      if(SessionData.DepartmentNameEditing && SessionData.DepartmentName){
        // セッションストレージから最新のデータを取得
        setSelectedDepartment({
          value: SessionData.DepartmentName,
          label: SessionData.DepartmentName,
        });
      } else if(
        (SessionData.DepartmentNameEditing && SessionData.DepartmentName && DepartmentNameData)||
        (!SessionData.DepartmentNameEditing && DepartmentNameData)
      ){
        // DBから最新のデータを取得
        setSelectedDepartment({
          value: DepartmentNameData,
          label: DepartmentNameData,
        });
      }
    }
  }, [DepartmentNameData]);

  useEffect(() => {
    if(selectedDepartment){
    updateSessionData("accountData", "DepartmentName", selectedDepartment.value);
    }
  }, [selectedDepartment]);

  const handleChange = (selectedOption) => {
    setSelectedDepartment(selectedOption);
    // sessionStrageに値を保存
    if(selectedOption){
      updateSessionData("accountData", "DepartmentName", selectedOption.value);
    } else {
      // なしの場合
      updateSessionData("accountData", "DepartmentName", "");
    }
    // 編集中状態をオン(保存もしくはログアウトされるまで保持)
    updateSessionData("accountData", "DepartmentNameEditing", true);
  };

  return (
    <div>
      <Select
        id="departmentDropdown"
        value={selectedDepartment}
        onChange={handleChange}
        options={options}
        placeholder="Select..."
        isClearable
      />
    </div>
  );
};

DepartmentNameDropdown.propTypes = {
  DepartmentNameData: PropTypes.string ,
};

export default DepartmentNameDropdown;



