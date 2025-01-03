import { useState, useEffect } from "react";
import CreatableSelect from "react-select/creatable";
import PropTypes from 'prop-types';
import { useSessionStorage } from "src/hooks/use-sessionStorage";
import GetTagAllList from "src/components/tag/GetTagAllList";
import InsertTag from 'src/components/tag/InsertTag';


const DepartmentNameDropdown = ({ DepartmentNameData }) => {
  const {InsertTagFunction} = InsertTag();
  const [selectedDepartment, setSelectedDepartment] = useState(DepartmentNameData);

  const { getSessionData, updateSessionData } = useSessionStorage();

  const [options, setOptions] = useState([]);

  const { GetTagAllListFunction } = GetTagAllList();

  useEffect(() => {
    let optionArrayPromise = GetTagAllListFunction("student_department_name");
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
    } else {
      updateSessionData("accountData", "DepartmentName", "");
    }
  }, [selectedDepartment]);

  const handleChange = (selectedOption, actionMeta) => {
    // newValueをセット
    setSelectedDepartment(selectedOption);
    // 編集中状態をオン(保存もしくはログアウトされるまで保持)
    updateSessionData("accountData", "DepartmentEditing", true);

    if (actionMeta && actionMeta.action === 'create-option') {
        const inputValue = actionMeta;
        const newOption = { value: inputValue.option.value, label: inputValue.option.label };
        setOptions([...options, newOption]);
        // 17は学生の学科です。
        InsertTagFunction(inputValue.option.value, 17);
    }
};

return (
    <div>
        <CreatableSelect
        // プレフィックス＝接頭語
        // CreatableSelect内のInput要素のClass名の頭にMyPageEditItemsをつけるという意味
        classNamePrefix="MyPageEditItems"
            id="departmentDropdown"
            value={selectedDepartment}
            onChange={handleChange}
            options={options}
            placeholder="▼"

            isClearable
            styles={{
              control: (base) => ({
                ...base,
                fontSize: '20px', // テキストサイズを調整
              }),
              placeholder: (base) => ({
                ...base,
                fontSize: '20px', // プレースホルダーのサイズを調整
              }),
              menu: (base) => ({
                ...base,
                fontSize: '20px', // ドロップダウンメニューの文字サイズ
              }),
            }}
        />
    </div>
);

};

DepartmentNameDropdown.propTypes = {
  DepartmentNameData: PropTypes.string,
};

export default DepartmentNameDropdown;



