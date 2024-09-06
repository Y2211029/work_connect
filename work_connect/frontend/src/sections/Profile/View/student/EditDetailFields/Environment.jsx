import { useState, useEffect } from "react";
import Select from "react-select";
import PropTypes from 'prop-types';
import { useSessionStorage } from "src/hooks/use-sessionStorage";
import GetTagAllList from "src/components/tag/GetTagAllList";


const Environment = ({ EnvironmentData }) => {
  const [selectedDevEnvironment, setSelectedDevEnvironment] = useState([]);

  const { getSessionData, updateSessionData } = useSessionStorage();

  const [options, setOptions] = useState([]);

  const { GetTagAllListFunction } = GetTagAllList();

  useEffect(() => {
    let optionArrayPromise = GetTagAllListFunction("student_development_environment");
    optionArrayPromise.then((result) => {
      setOptions(result);
    });
  }, []);

  // valueの初期値をセット
  useEffect(() => {
    if (getSessionData("accountData") !== undefined) {
      const SessionData = getSessionData("accountData");
      if (SessionData.EnvironmentEditing && SessionData.Environment) {
        // セッションストレージから最新のデータを取得
        const devtagArray = SessionData.Environment.split(",").map(item => ({
          value: item,
          label: item,
        }));
        setSelectedDevEnvironment(devtagArray);
      } else if (
        (SessionData.EnvironmentEditing && SessionData.Environment && EnvironmentData) ||
        (!SessionData.EnvironmentEditing && EnvironmentData)
      ) { // DBから最新のデータを取得
        const devtagArray = EnvironmentData.split(",").map(item => ({
          value: item,
          label: item,
        }));
        setSelectedDevEnvironment(devtagArray);
      }
    }
  }, [EnvironmentData]);

  useEffect(() => {
    let devTag = "";
    let devTagArray = [];
    selectedDevEnvironment.map((item) => {
      devTagArray.push(item.value);
    });
    devTag = devTagArray.join(",");

    updateSessionData("accountData", "Environment", devTag);
  }, [selectedDevEnvironment]);

  const handleChange = (selectedOption) => {
    // newValueをセット
    setSelectedDevEnvironment(selectedOption);
    // 編集中状態をオン(保存もしくはログアウトされるまで保持)
    updateSessionData("accountData", "EnvironmentEditing", true);
  };

  return (
    <div>
      <Select
        id="devEnvironment"
        value={selectedDevEnvironment}
        onChange={handleChange}
        options={options}
        placeholder="Select..."
        isMulti
      />
    </div>
  );
};

Environment.propTypes = {
  EnvironmentData: PropTypes.string,
};

export default Environment;
