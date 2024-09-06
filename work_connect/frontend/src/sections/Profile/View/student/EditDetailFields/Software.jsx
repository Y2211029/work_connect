import { useState, useEffect } from "react";
import Select from "react-select";
import PropTypes from 'prop-types';
import { useSessionStorage } from "src/hooks/use-sessionStorage";
import GetTagAllList from "src/components/tag/GetTagAllList";

const Software = ({ SoftwareData }) => {
  const [selectedSoftware, setSelectedSoftware] = useState([]);
  const { getSessionData, updateSessionData } = useSessionStorage();

  const [options, setOptions] = useState([]);

  const { GetTagAllListFunction } = GetTagAllList();

  useEffect(() => {
    let optionArrayPromise = GetTagAllListFunction("software");
    optionArrayPromise.then((result) => {
      setOptions(result);
    });
  }, []);

  // valueの初期値をセット
  useEffect(() => {
    if (getSessionData("accountData") !== undefined) {
      const SessionData = getSessionData("accountData");
      if (SessionData.SoftwareEditing && SessionData.Software) {
        // セッションストレージから最新のデータを取得
        const devtagArray = SessionData.Software.split(",").map(item => ({
          value: item,
          label: item,
        }));
        setSelectedSoftware(devtagArray);
      } else if (
        (SessionData.SoftwareEditing && SessionData.Software && SoftwareData) ||
        (!SessionData.SoftwareEditing && SoftwareData)
      ) { // DBから最新のデータを取得
        const devtagArray = SoftwareData.split(",").map(item => ({
          value: item,
          label: item,
        }));
        setSelectedSoftware(devtagArray);
      }
    }
  }, [SoftwareData]);

  useEffect(() => {
    let devTag = "";
    let devTagArray = [];
    selectedSoftware.map((item) => {
      devTagArray.push(item.value);
    });
    devTag = devTagArray.join(",");

    updateSessionData("accountData", "Software", devTag);
  }, [selectedSoftware]);

  const handleChange = (selectedOption) => {
    // newValueをセット
    setSelectedSoftware(selectedOption);
    // 編集中状態をオン(保存もしくはログアウトされるまで保持)
    updateSessionData("accountData", "SoftwareEditing", true);
  };

  return (
    <>
      <Select
        id="Software"
        value={selectedSoftware}
        onChange={handleChange}
        options={options}
        placeholder="Select..."
        isMulti
      />
    </>
  );
};

Software.propTypes = {
  SoftwareData: PropTypes.string,
};

export default Software;
