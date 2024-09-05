import { useState, useEffect } from "react";
import Select from "react-select";
import PropTypes from 'prop-types';
import { useSessionStorage } from "src/hooks/use-sessionStorage";

const options = [
  { value: "Python", label: "Python" },
  { value: "C", label: "C" },
  { value: "C++", label: "C++" },
  { value: "C#", label: "C#" },
  { value: "Java", label: "Java" },
  { value: "JavaScript", label: "JavaScript" },
  { value: "SQL", label: "SQL" },
  { value: "Go", label: "Go" },
  { value: "Scratch", label: "Scratch" },
  { value: "Visual Basic", label: "Visual Basic" },
  { value: "Assembly language", label: "Assembly language" },
  { value: "PHP", label: "PHP" },
  { value: "MATLAB", label: "MATLAB" },
  { value: "Fortran", label: "Fortran" },
  { value: "Delphi/Object Pascal", label: "Delphi/Object Pascal" },
  { value: "Swift", label: "Swift" },
  { value: "Rust", label: "Rust" },
  { value: "Ruby", label: "Ruby" },
  { value: "Kotlin", label: "Kotlin" },
  { value: "COBOL", label: "COBOL" },
];

const ProgrammingLanguage = ({ProgrammingLanguageData}) => {
  const [selectedProgrammingLanguage, setselectedProgrammingLanguage] = useState([]);

  const { getSessionData, updateSessionData } = useSessionStorage();
  

  // valueの初期値をセット
  useEffect(() => {
     
    if (getSessionData("accountData") !== undefined) {
      const SessionData = getSessionData("accountData");
      if(SessionData.ProgrammingLanguageEditing && SessionData.ProgrammingLanguage){
        // セッションストレージから最新のデータを取得
        const devtagArray = SessionData.ProgrammingLanguage.split(",").map(item => ({
          value: item,
          label: item,
        }));
        setselectedProgrammingLanguage(devtagArray);
      } else if(
        (SessionData.ProgrammingLanguageEditing && SessionData.ProgrammingLanguage && ProgrammingLanguageData)||
        (!SessionData.ProgrammingLanguageEditing && ProgrammingLanguageData)
      ){ // DBから最新のデータを取得
        const devtagArray = ProgrammingLanguageData.split(",").map(item => ({
          value: item,
          label: item,
        }));
        setselectedProgrammingLanguage(devtagArray);
      }
    }
  }, [ProgrammingLanguageData]);

  useEffect(() => {
    let devTag = "";
    let devTagArray = [];
    selectedProgrammingLanguage.map((item) => {
      devTagArray.push(item.value);
    });
    devTag = devTagArray.join(",");

    updateSessionData("accountData", "ProgrammingLanguage", devTag);
  }, [selectedProgrammingLanguage]);

  const handleChange = (selectedOption) => {
    // newValueをセット
    setselectedProgrammingLanguage(selectedOption);
    // 編集中状態をオン(保存もしくはログアウトされるまで保持)
    updateSessionData("accountData", "ProgrammingLanguageEditing", true);
  };

  return (
    <div>
      <Select
        id="programmingLanguageDropdown"
        value={selectedProgrammingLanguage}
        onChange={handleChange}
        options={options}
        placeholder="Select..."
        isMulti
      />
    </div>
  );
};

ProgrammingLanguage.propTypes = {
  ProgrammingLanguageData: PropTypes.string ,
};

export default ProgrammingLanguage;
