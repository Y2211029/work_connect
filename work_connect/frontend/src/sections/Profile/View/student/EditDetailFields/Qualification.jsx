import { useState, useEffect } from "react";
import Select from "react-select";
import PropTypes from 'prop-types';
import { useSessionStorage } from "src/hooks/use-sessionStorage";
import GetTagAllList from "src/components/tag/GetTagAllList";


const Qualification = ({ QualificationData }) => {
  const [selectedQualification, setSelectedQualification] = useState([]);
  const { getSessionData, updateSessionData } = useSessionStorage();

  const [options, setOptions] = useState([]);

  const { GetTagAllListFunction } = GetTagAllList();

  useEffect(() => {
    let optionArrayPromise = GetTagAllListFunction("acquisition_qualification");
    optionArrayPromise.then((result) => {
      setOptions(result);
    });
  }, []);

  // valueの初期値をセット
  useEffect(() => {
    if (getSessionData("accountData") !== undefined) {
      const SessionData = getSessionData("accountData");
      if (SessionData.QualificationEditing && SessionData.Qualification) {
        // セッションストレージから最新のデータを取得
        const devtagArray = SessionData.Qualification.split(",").map(item => ({
          value: item,
          label: item,
        }));
        setSelectedQualification(devtagArray);
      } else if (
        (SessionData.QualificationEditing && SessionData.Qualification && QualificationData) ||
        (!SessionData.QualificationEditing && QualificationData)
      ) { // DBから最新のデータを取得
        const devtagArray = QualificationData.split(",").map(item => ({
          value: item,
          label: item,
        }));
        setSelectedQualification(devtagArray);
      }
    }
  }, [QualificationData]);

  useEffect(() => {
    let devTag = "";
    let devTagArray = [];
    selectedQualification.map((item) => {
      devTagArray.push(item.value);
    });
    devTag = devTagArray.join(",");

    updateSessionData("accountData", "Qualification", devTag);
  }, [selectedQualification]);

  const handleChange = (selectedOption) => {
    // newValueをセット
    setSelectedQualification(selectedOption);
    // 編集中状態をオン(保存もしくはログアウトされるまで保持)
    updateSessionData("accountData", "QualificationEditing", true);
  };

  return (
    <>
      <Select
        id="acquisitionQualification"
        value={selectedQualification}
        onChange={handleChange}
        options={options}
        placeholder="Select..."
        isMulti
      />
    </>
  );
};

Qualification.propTypes = {
  QualificationData: PropTypes.string,
};

export default Qualification;
