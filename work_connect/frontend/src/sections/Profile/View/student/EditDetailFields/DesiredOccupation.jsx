import { useEffect, useState } from "react";
import Select from "react-select";
// import axios from "axios";
import { useSessionStorage } from "src/hooks/use-sessionStorage";

const DesiredOccupation = () => {
  // const [prefectures, setPrefectures] = useState([]);
  // const [Prefectures, setPrefecture] = useState([]);

  const { getSessionData, updateSessionData } = useSessionStorage();

  const [selectedOccupation, setSelectedOccupation] = useState([]);

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


  // 外部URLから本アプリにアクセスした際に、sessionStrageに保存する
  useEffect(() => {
    // if (performance.navigation.type !== performance.navigation.TYPE_RELOAD) {
    // console.log("外部URLからアクセスしたです。");
    if (getSessionData("accountData") !== undefined) {
      let SessionData = getSessionData("accountData");

      if (
        SessionData.desired_occupation !== undefined &&
        SessionData.desired_occupation !== ""
      ) {
        let commaArray = SessionData.desired_occupation.split(",");
        let devtagArray = [];
        commaArray.map((item) => {
          devtagArray.push({ value: item, label: item });
        });
        setSelectedOccupation(devtagArray);
      }
    }
    // }
  }, []);

  useEffect(() => {
    let devTag = "";
    let devTagArray = [];
    console.log("selectedOccupation", selectedOccupation);
    selectedOccupation.map((item) => {
      devTagArray.push(item.label);
    });
    devTag = devTagArray.join(",");

    updateSessionData("accountData", "desired_occupation", devTag);
  }, [selectedOccupation]);

  const handleChange = (selectedOption) => {
    setSelectedOccupation(selectedOption);
  };

  return (
    <Select
        id="prefecturesDropdwon"
        value={selectedOccupation}
        onChange={handleChange}
        options={options}
        placeholder="Select..."
        isMulti
    />
  );
};

export default DesiredOccupation;
