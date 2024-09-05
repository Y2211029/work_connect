import { useState, useEffect } from "react";
import Select from "react-select";
import PropTypes from 'prop-types';
import { useSessionStorage } from "src/hooks/use-sessionStorage";
import GetTagAllList from "src/components/tag/GetTagAllList";

const FacultyNameDropdown = ({ FacultyNameData }) => {
  const [selectedFaculty, setSelectedFaculty] = useState(FacultyNameData);

  const { getSessionData, updateSessionData } = useSessionStorage();

  const [options, setOptions] = useState([]);

  const { GetTagAllListFunction } = GetTagAllList();

  useEffect(() => {
    let optionArrayPromise = GetTagAllListFunction("faculty_name");
    optionArrayPromise.then((result) => {
      setOptions(result);
    });
  }, []);

  // valueの初期値をセット
  useEffect(() => {
    if (getSessionData("accountData") !== undefined) {
      const SessionData = getSessionData("accountData");
      if (SessionData.FacultyNameEditing && SessionData.FacultyName) {
        // セッションストレージから最新のデータを取得
        setSelectedFaculty({
          value: SessionData.FacultyName,
          label: SessionData.FacultyName,
        });
      } else if (
        (SessionData.FacultyNameEditing && SessionData.FacultyName && FacultyNameData) ||
        (!SessionData.FacultyNameEditing && FacultyNameData)
      ) {
        // DBから最新のデータを取得
        setSelectedFaculty({
          value: FacultyNameData,
          label: FacultyNameData,
        });
      }
    }
  }, [FacultyNameData]);

  useEffect(() => {
    if (selectedFaculty) {
      updateSessionData("accountData", "FacultyName", selectedFaculty.value);
    }
  }, [selectedFaculty]);

  const handleChange = (selectedOption) => {
    setSelectedFaculty(selectedOption);
    // sessionStrageに値を保存
    if (selectedOption) {
      updateSessionData("accountData", "FacultyName", selectedOption.value);
    } else {
      // なしの場合
      updateSessionData("accountData", "FacultyName", "");
    }
    // 編集中状態をオン(保存もしくはログアウトされるまで保持)
    updateSessionData("accountData", "FacultyNameEditing", true);
  };

  return (
    <div>
      <Select
        id="departmentDropdown"
        value={selectedFaculty}
        onChange={handleChange}
        options={options}
        placeholder="Select..."
        isClearable
      />
    </div>
  );
};

FacultyNameDropdown.propTypes = {
  FacultyNameData: PropTypes.string,
};

export default FacultyNameDropdown;
