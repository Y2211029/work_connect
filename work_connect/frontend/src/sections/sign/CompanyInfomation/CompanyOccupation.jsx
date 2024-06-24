import { useState, useEffect } from "react";
import Select from "react-select";
import { useSessionStorage } from "src/hooks/use-sessionStorage";

const OccupationNameDropdown = () => {
  const [selectedOccupation, setSelectedOccupation] = useState("");

  const { getSessionData, updateSessionData } = useSessionStorage();

  const options = [
    { value: "システムエンジニア", label: "システムエンジニア" },
    { value: "プログラマー", label: "プログラマー" },
    { value: "インフラエンジニア", label: "システムエンジニア" },
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
    if (getSessionData("accountData") !== undefined) {
      let SessionData = getSessionData("accountData");

      if (SessionData.Occupation_name !== undefined && SessionData.Occupation_name !== "") {
        setSelectedOccupation({
          value: SessionData.Occupation_name,
          label: `${SessionData.Occupation_name}年`,
        });
      }
    }
  }, []);

  const handleChange = (selectedOption) => {
    setSelectedOccupation(selectedOption);

    // sessionStrageに値を保存
    updateSessionData("accountData", "Occupation_name", selectedOption.label);
  };

  return (
    <div>
      <p>職種</p>
      <Select
        id="departmentDropdown"
        value={selectedOccupation}
        onChange={handleChange}
        options={options}
        placeholder="Select..."
        isMulti
      />
    </div>
  );
};

export default OccupationNameDropdown;
