import { useEffect, useState } from "react";
import Select from "react-select";
// import axios from "axios";
import PropTypes from 'prop-types';
import { useSessionStorage } from "src/hooks/use-sessionStorage";
import GetTagAllList from "src/components/tag/GetTagAllList";

const DesiredOccupation = ({ DesiredOccupationData }) => {

  const { getSessionData, updateSessionData } = useSessionStorage();

  const [selectedOccupation, setSelectedOccupation] = useState([]);
  const [options, setOptions] = useState([]);

  const { GetTagAllListFunction } = GetTagAllList();

  useEffect(() => {
    let optionArrayPromise = GetTagAllListFunction("desired_occupation");
    optionArrayPromise.then((result) => {
      setOptions(result);
    });
  }, []);



  // valueの初期値をセット
  useEffect(() => {
    if (getSessionData("accountData") !== undefined) {
      const SessionData = getSessionData("accountData");
      if (SessionData.DesiredOccupationEditing && SessionData.DesiredOccupation) {
        // セッションストレージから最新のデータを取得
        const devtagArray = SessionData.DesiredOccupation.split(",").map(item => ({
          value: item,
          label: item,
        }));
        setSelectedOccupation(devtagArray);
      } else if (
        (SessionData.DesiredOccupationEditing && SessionData.DesiredOccupation && DesiredOccupationData) ||
        (!SessionData.DesiredOccupationEditing && DesiredOccupationData)
      ) { // DBから最新のデータを取得
        const devtagArray = DesiredOccupationData.split(",").map(item => ({
          value: item,
          label: item,
        }));
        setSelectedOccupation(devtagArray);
      }
    }
  }, [DesiredOccupationData]);

  useEffect(() => {
    let devTag = "";
    let devTagArray = [];
    selectedOccupation.map((item) => {
      devTagArray.push(item.label);
    });
    devTag = devTagArray.join(",");

    updateSessionData("accountData", "DesiredOccupation", devTag);
  }, [selectedOccupation]);

  const handleChange = (selectedOption) => {
    // newValueをセット
    setSelectedOccupation(selectedOption);
    // 編集中状態をオン(保存もしくはログアウトされるまで保持)
    updateSessionData("accountData", "DesiredOccupationEditing", true);
  };

  return (
    <Select
      name="selectedOccupation"
      id="prefecturesDropdwon"
      value={selectedOccupation}
      onChange={handleChange}
      options={options}
      placeholder="Select..."
      isMulti
    />
  );
};

DesiredOccupation.propTypes = {
  DesiredOccupationData: PropTypes.string,
};

export default DesiredOccupation;



