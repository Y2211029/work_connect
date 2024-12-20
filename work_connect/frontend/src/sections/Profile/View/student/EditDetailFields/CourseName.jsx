import { useState, useEffect } from "react";
import CreatableSelect from "react-select/creatable";
import PropTypes from 'prop-types';
import { useSessionStorage } from "src/hooks/use-sessionStorage";
import GetTagAllList from "src/components/tag/GetTagAllList";
import InsertTag from 'src/components/tag/InsertTag';

const CourseNameDropdown = ({ CourseNameData }) => {
  const {InsertTagFunction} = InsertTag();
  const [selectedCourseName, setSelectedCourseName] = useState(CourseNameData);

  const { getSessionData, updateSessionData } = useSessionStorage();

  const [options, setOptions] = useState([]);

  const { GetTagAllListFunction } = GetTagAllList();

  useEffect(() => {
    let optionArrayPromise = GetTagAllListFunction("student_course_name");
    optionArrayPromise.then((result) => {
      setOptions(result);
    });
  }, []);

  // valueの初期値をセット
  useEffect(() => {
    if (getSessionData("accountData") !== undefined) {
      const SessionData = getSessionData("accountData");
      if (SessionData.CourseNameEditing && SessionData.CourseName) {
        // セッションストレージから最新のデータを取得
        setSelectedCourseName({
          value: SessionData.CourseName,
          label: SessionData.CourseName,
        });
      } else if (
        (SessionData.CourseNameEditing && SessionData.CourseName && CourseNameData) ||
        (!SessionData.CourseNameEditing && CourseNameData)
      ) {
        // DBから最新のデータを取得
        setSelectedCourseName({
          value: CourseNameData,
          label: CourseNameData,
        });
      }
    }
  }, [CourseNameData]);

  useEffect(() => {
    if (selectedCourseName) {
      updateSessionData("accountData", "CourseName", selectedCourseName.value);
    } else {
      updateSessionData("accountData", "CourseName", "");
    }
  }, [selectedCourseName]);

  const handleChange = (selectedOption, actionMeta) => {
    // newValueをセット
    setSelectedCourseName(selectedOption);
    // 編集中状態をオン(保存もしくはログアウトされるまで保持)
    updateSessionData("accountData", "CourseNameEditing", true);

    if (actionMeta && actionMeta.action === 'create-option') {
        const inputValue = actionMeta;
        const newOption = { value: inputValue.option.value, label: inputValue.option.label };
        setOptions([...options, newOption]);
        // 20は学生のコースです。
        InsertTagFunction(inputValue.option.value, 20);
    }
  };

  return (
    <div>
      <CreatableSelect
        // プレフィックス＝接頭語
        // CreatableSelect内のInput要素のClass名の頭にMyPageEditItemsをつけるという意味
        classNamePrefix="MyPageEditItems"
        id="departmentDropdown"
        value={selectedCourseName}
        onChange={handleChange}
        options={options}
        placeholder="▼"
        closeMenuOnSelect={false}
        isClearable
        styles={{
           // 12/5 
          // App.cssにそれぞれ
          // MyPageEditItems_control
          // MyPageEditItems_placeholder、
          // MyPageEditItems_menu
          // と移動し書き換えました。

          // control: (base) => ({
          //   ...base,
          //   fontSize: '20px', // テキストサイズを調整
          // }),
          // placeholder: (base) => ({
          //   ...base,
          //   fontSize: '20px', // プレースホルダーのサイズを調整
          // }),
          // menu: (base) => ({
          //   ...base,
          //   fontSize: '20px', // ドロップダウンメニューの文字サイズ
          // }),
        }}
      />
    </div>
  );
};

CourseNameDropdown.propTypes = {
  CourseNameData: PropTypes.string,
};

export default CourseNameDropdown;
