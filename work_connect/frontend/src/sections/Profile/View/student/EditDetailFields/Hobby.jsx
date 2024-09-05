import { useState, useEffect } from "react";
import Select from "react-select";
import PropTypes from 'prop-types';
import { useSessionStorage } from "src/hooks/use-sessionStorage";

const options = [
  { value: "旅行", label: "旅行" },
  { value: "読書", label: "読書" },
  { value: "ドライブ", label: "ドライブ" },
  { value: "映画鑑賞", label: "映画鑑賞" },
  { value: "筋トレ", label: "筋トレ" },
  { value: "カラオケ", label: "カラオケ" },
  { value: "スポーツ観戦", label: "スポーツ観戦" },
  { value: "ゲーム", label: "ゲーム" },
  { value: "プログラミング", label: "プログラミング" },
  { value: "DIY", label: "DIY" },
  { value: "釣り", label: "釣り" },
  { value: "料理", label: "料理" },
  { value: "ツーリング", label: "ツーリング" },
  { value: "音楽鑑賞", label: "音楽鑑賞" },
];

const Hobby = ({HobbyData}) => {
  const [selectedHobby, setSelectedHobby] = useState([]);
  const { getSessionData, updateSessionData } = useSessionStorage();
  
  

  // valueの初期値をセット
  useEffect(() => {
    if (getSessionData("accountData") !== undefined) {
      const SessionData = getSessionData("accountData");
      if(SessionData.HobbyEditing && SessionData.Hobby){
        // セッションストレージから最新のデータを取得
        const devtagArray = SessionData.Hobby.split(",").map(item => ({
          value: item,
          label: item,
        }));
        setSelectedHobby(devtagArray);
      } else if(
        (SessionData.HobbyEditing && SessionData.Hobby && HobbyData)||
        (!SessionData.HobbyEditing && HobbyData)
      ){ // DBから最新のデータを取得
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
  HobbyData: PropTypes.string ,
};

export default Hobby;
