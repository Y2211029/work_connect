import { useState, useEffect } from "react";
import Select from "react-select";
import PropTypes from 'prop-types';
import { useSessionStorage } from "src/hooks/use-sessionStorage";
import GetTagAllList from "src/components/tag/GetTagAllList";



const DepartmentNameDropdown = ({ DepartmentNameData }) => {
  const [selectedDepartment, setSelectedDepartment] = useState(DepartmentNameData);

  const { getSessionData, updateSessionData } = useSessionStorage();

  const [options, setOptions] = useState([]);

  const { GetTagAllListFunction } = GetTagAllList();

  useEffect(() => {
    let optionArrayPromise = GetTagAllListFunction("department_name");
    optionArrayPromise.then((result) => {
      setOptions(result);
    });
  }, []);



  // valueの初期値をセット
  useEffect(() => {
    if (getSessionData("accountData") !== undefined) {
      const SessionData = getSessionData("accountData");

      if (SessionData.DepartmentNameEditing && SessionData.DepartmentName) {
        // セッションストレージから最新のデータを取得
        setSelectedDepartment({
          value: SessionData.DepartmentName,
          label: SessionData.DepartmentName,
        });
      } else if (
        (SessionData.DepartmentNameEditing && SessionData.DepartmentName && DepartmentNameData) ||
        (!SessionData.DepartmentNameEditing && DepartmentNameData)
      ) {
        // DBから最新のデータを取得
        setSelectedDepartment({
          value: DepartmentNameData,
          label: DepartmentNameData,
        });
      }
    }
  }, [DepartmentNameData]);

  useEffect(() => {
    if (selectedDepartment) {
      updateSessionData("accountData", "DepartmentName", selectedDepartment.value);
    }
  }, [selectedDepartment]);

  const handleChange = (selectedOption) => {
    setSelectedDepartment(selectedOption);
    // sessionStrageに値を保存
    if (selectedOption) {
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
  DepartmentNameData: PropTypes.string,
};

export default DepartmentNameDropdown;



