import { useState, useEffect } from "react";
import Select from "react-select";
import PropTypes from 'prop-types';
import { useSessionStorage } from "src/hooks/use-sessionStorage";
import GetTagAllList from "src/components/tag/GetTagAllList";

const CourseNameDropdown = ({ CourseNameData }) => {
  const [selectedFaculty, setSelectedFaculty] = useState(CourseNameData);

  const { getSessionData, updateSessionData } = useSessionStorage();

  const [options, setOptions] = useState([]);

  const { GetTagAllListFunction } = GetTagAllList();

  useEffect(() => {
    let optionArrayPromise = GetTagAllListFunction("course_name");
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
        setSelectedFaculty({
          value: SessionData.CourseName,
          label: SessionData.CourseName,
        });
      } else if (
        (SessionData.CourseNameEditing && SessionData.CourseName && CourseNameData) ||
        (!SessionData.CourseNameEditing && CourseNameData)
      ) {
        // DBから最新のデータを取得
        setSelectedFaculty({
          value: CourseNameData,
          label: CourseNameData,
        });
      }
    }
  }, [CourseNameData]);

  useEffect(() => {
    if (selectedFaculty) {
      updateSessionData("accountData", "CourseName", selectedFaculty.value);
    }
  }, [selectedFaculty]);

  const handleChange = (selectedOption) => {
    setSelectedFaculty(selectedOption);
    // sessionStrageに値を保存
    if (selectedOption) {
      updateSessionData("accountData", "CourseName", selectedOption.value);
    } else {
      // なしの場合
      updateSessionData("accountData", "CourseName", "");
    }
    // 編集中状態をオン(保存もしくはログアウトされるまで保持)
    updateSessionData("accountData", "CourseNameEditing", true);
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

CourseNameDropdown.propTypes = {
  CourseNameData: PropTypes.string,
};

export default CourseNameDropdown;
