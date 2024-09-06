import { useState, useEffect } from "react";
import Select from "react-select";
import PropTypes from 'prop-types';
import { useSessionStorage } from "src/hooks/use-sessionStorage";
import GetTagAllList from "src/components/tag/GetTagAllList";


const Hobby = ({ HobbyData }) => {
  const [selectedHobby, setSelectedHobby] = useState([]);
  const { getSessionData, updateSessionData } = useSessionStorage();

  const [options, setOptions] = useState([]);

  const { GetTagAllListFunction } = GetTagAllList();

  useEffect(() => {
    let optionArrayPromise = GetTagAllListFunction("hobby");
    optionArrayPromise.then((result) => {
      setOptions(result);
    });
  }, []);



  // valueの初期値をセット
  useEffect(() => {
    if (getSessionData("accountData") !== undefined) {
      const SessionData = getSessionData("accountData");
      if (SessionData.HobbyEditing && SessionData.Hobby) {
        // セッションストレージから最新のデータを取得
        const devtagArray = SessionData.Hobby.split(",").map(item => ({
          value: item,
          label: item,
        }));
        setSelectedHobby(devtagArray);
      } else if (
        (SessionData.HobbyEditing && SessionData.Hobby && HobbyData) ||
        (!SessionData.HobbyEditing && HobbyData)
      ) { // DBから最新のデータを取得
        const devtagArray = HobbyData.split(",").map(item => ({
          value: item,
          label: item,
        }));
        setSelectedHobby(devtagArray);
      }
    }
  }, [HobbyData]);

  useEffect(() => {
    let devTag = "";
    let devTagArray = [];
    selectedHobby.map((item) => {
      devTagArray.push(item.value);
    });
    devTag = devTagArray.join(",");

    updateSessionData("accountData", "Hobby", devTag);
  }, [selectedHobby]);

  const handleChange = (selectedOption) => {
    // newValueをセット
    setSelectedHobby(selectedOption);
    // 編集中状態をオン(保存もしくはログアウトされるまで保持)
    updateSessionData("accountData", "HobbyEditing", true);
  };

  return (
    <div>
      <Select
        id="hobbyDropdown"
        value={selectedHobby}
        onChange={handleChange}
        options={options}
        placeholder="Select..."
        isMulti
      />
    </div>
  );
};

Hobby.propTypes = {
  HobbyData: PropTypes.string,
};

export default Hobby;
