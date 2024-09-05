import { useEffect, useState } from "react";
import Select from "react-select";
// import axios from "axios";
import PropTypes from 'prop-types';
import { useSessionStorage } from "src/hooks/use-sessionStorage";


const options = [
  { value: "システムエンジニア", label: "システムエンジニア" },
  { value: "プログラマー", label: "プログラマー" },
  { value: "インフラエンジニア", label: "インフラエンジニア" },
  { value: "サーバーエンジニア", label: "サーバーエンジニア" },
  { value: "ネットワークエンジニア", label: "ネットワークエンジニア" },
  { value: "セキュリティエンジニア", label: "セキュリティエンジニア" },
  { value: "組み込みエンジニア", label: "組み込みエンジニア" },
  { value: "データベースエンジニア", label: "データベースエンジニア" },
  { value: "クラウドエンジニア", label: "クラウドエンジニア" },
  { value: "AIエンジニア", label: "AIエンジニア" },
  { value: "WEBエンジニア", label: "WEBエンジニア" },
  { value: "フロントエンドエンジニア", label: "フロントエンドエンジニア" },
  { value: "バックエンドエンジニア", label: "バックエンドエンジニア" },
  { value: "セールスエンジニア", label: "セールスエンジニア" },
  { value: "サービスエンジニア", label: "サービスエンジニア" },
  { value: "プロジェクトマネージャー", label: "プロジェクトマネージャー" },
  { value: "ITコンサルタント", label: "ITコンサルタント" },
  { value: "ヘルプデスク", label: "ヘルプデスク" },
  { value: "Webディレクター", label: "Webディレクター" },
  { value: "Webクリエイター", label: "Webクリエイター" },
  { value: "Webデザイナー", label: "Webデザイナー" },
  { value: "グラフィックデザイナー", label: "グラフィックデザイナー" },
  { value: "UI/UXデザイナー", label: "UI/UXデザイナー" },
  { value: "3DCGデザイナー", label: "3DCGデザイナー" },
  { value: "ゲームエンジニア", label: "ゲームエンジニア" },
  { value: "ゲームデザイナー", label: "ゲームデザイナー" },
  { value: "ゲームプランナー", label: "ゲームプランナー" },
];

const SelectedOccupation = ({SelectedOccupationData}) => {

  //console.log("SelectedOccupationData:::"+SelectedOccupationData);

  const { getSessionData, updateSessionData } = useSessionStorage();

  const [selectedOccupation, setSelectedOccupation] = useState([]);

  // valueの初期値をセット
  useEffect(() => {
    if (getSessionData("accountData") !== undefined) {
      const SessionData = getSessionData("accountData");
      if(SessionData.SelectedOccupationEditing && SessionData.SelectedOccupation){
        // セッションストレージから最新のデータを取得
        const devtagArray = SessionData.SelectedOccupation.split(",").map(item => ({
          value: item,
          label: item,
        }));
        setSelectedOccupation(devtagArray);
      } else if(
        (SessionData.SelectedOccupationEditing && SessionData.SelectedOccupation && SelectedOccupationData)||
        (!SessionData.SelectedOccupationEditing && SelectedOccupationData)
      ){ // DBから最新のデータを取得
        const devtagArray = SelectedOccupationData.split(",").map(item => ({
          value: item,
          label: item,
        }));
        setSelectedOccupation(devtagArray);
      }
    }
  }, [SelectedOccupationData]);

  useEffect(() => {
    let devTag = "";
    let devTagArray = [];
    console.log("selectedOccupation", selectedOccupation);
    selectedOccupation.map((item) => {
      devTagArray.push(item.label);
    });
    devTag = devTagArray.join(",");

    updateSessionData("accountData", "SelectedOccupation", devTag);
  }, [selectedOccupation]);

  const handleChange = (selectedOption) => {
    // newValueをセット
    setSelectedOccupation(selectedOption);
    // 編集中状態をオン(保存もしくはログアウトされるまで保持)
    updateSessionData("accountData", "SelectedOccupationEditing", true);
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

SelectedOccupation.propTypes = {
  SelectedOccupationData: PropTypes.string ,
};

export default SelectedOccupation;



