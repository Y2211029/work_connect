import { useState, useEffect } from "react";
import Select from "react-select";
import { useSessionStorage } from "src/hooks/use-sessionStorage";

const Qualification = () => {
  const [selectedQualification, setSelectedQualification] = useState([]);
  const { getSessionData, updateSessionData } = useSessionStorage();

  const options = [
    { value: "ITパスポート", label: "ITパスポート" },
    { value: "基本情報技術者試験", label: "基本情報技術者試験" },
    { value: "情報セキュリティマネジメント試験", label: "情報セキュリティマネジメント試験" },
    { value: "ITストラテジスト", label: "ITストラテジスト" },
    { value: "普通自動車免許", label: "普通自動車免許" },
    { value: "普通自動二輪免許", label: "普通自動二輪免許" },
    { value: "漢字能力検定 2級", label: "漢字能力検定 2級" },
    { value: "野菜スペシャリスト", label: "野菜スペシャリスト" },
    { value: "Microsoft Office Specialist", label: "Microsoft Office Specialist" },
  ];

  // すでに取得資格がsessionStrageに保存されていればその値をstateにセットして表示する。
  useEffect(() => {
    if (getSessionData("accountData") !== undefined) {
      let SessionData = getSessionData("accountData");

      if (SessionData.acquisition_qualification !== undefined && SessionData.acquisition_qualification !== "") {
        let commaArray = SessionData.acquisition_qualification.split(",");
        let devtagArray = [];
        commaArray.map((item) => {
          devtagArray.push({ value: item, label: item });
        });
        setSelectedQualification(devtagArray);
      }
    }
  }, []);

  useEffect(() => {
    let devTag = "";
    let devTagArray = [];
    selectedQualification.map((item) => {
      devTagArray.push(item.value);
    });
    devTag = devTagArray.join(",");

    updateSessionData("accountData", "acquisition_qualification", devTag);
  }, [selectedQualification]);

  const handleChange = (selectedOption) => {
    setSelectedQualification(selectedOption);
  };

  return (
    <>
      <p>取得資格</p>
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

export default Qualification;
