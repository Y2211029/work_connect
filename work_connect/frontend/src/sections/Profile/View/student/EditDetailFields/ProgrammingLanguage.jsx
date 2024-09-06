import { useState, useEffect } from "react";
import Select from "react-select";
import PropTypes from 'prop-types';
import { useSessionStorage } from "src/hooks/use-sessionStorage";
import GetTagAllList from "src/components/tag/GetTagAllList";

const ProgrammingLanguage = ({ ProgrammingLanguageData }) => {
  const [selectedProgrammingLanguage, setselectedProgrammingLanguage] = useState([]);

  const { getSessionData, updateSessionData } = useSessionStorage();

  const [options, setOptions] = useState([]);

  const { GetTagAllListFunction } = GetTagAllList();

  useEffect(() => {
    let optionArrayPromise = GetTagAllListFunction("student_programming_language");
    optionArrayPromise.then((result) => {
      setOptions(result);
    });
  }, []);


  // valueの初期値をセット
  useEffect(() => {

    if (getSessionData("accountData") !== undefined) {
      const SessionData = getSessionData("accountData");
      if (SessionData.ProgrammingLanguageEditing && SessionData.ProgrammingLanguage) {
        // セッションストレージから最新のデータを取得
        const devtagArray = SessionData.ProgrammingLanguage.split(",").map(item => ({
          value: item,
          label: item,
        }));
        setselectedProgrammingLanguage(devtagArray);
      } else if (
        (SessionData.ProgrammingLanguageEditing && SessionData.ProgrammingLanguage && ProgrammingLanguageData) ||
        (!SessionData.ProgrammingLanguageEditing && ProgrammingLanguageData)
      ) { // DBから最新のデータを取得
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
  ProgrammingLanguageData: PropTypes.string,
};

export default ProgrammingLanguage;
