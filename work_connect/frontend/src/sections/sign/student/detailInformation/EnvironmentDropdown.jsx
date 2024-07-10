import { useState, useEffect } from "react";
import Select from "react-select";
import { useSessionStorage } from "src/hooks/use-sessionStorage";

const Environment = () => {
  const [selectedDevEnvironment, setSelectedDevEnvironment] = useState([]);
  // 登録項目確認の際に利用
  const { getSessionData, updateSessionData } = useSessionStorage();

  const options = [
    { value: "Visual Studio", label: "Visual Studio" },
    { value: "Eclipse", label: "Eclipse" },
    { value: "Xcode", label: "Xcode" },
    { value: "Android Studio", label: "Android Studio" },
    { value: "Claris FileMaker", label: "Claris FileMaker" },
    { value: "Unity", label: "Unity" },
    { value: "Visual Studio Code", label: "Visual Studio Code" },
    { value: "MySQL", label: "MySQL" },
    { value: "XAMMP", label: "XAMMP" },
    { value: "ロリポップ", label: "ロリポップ" },
  ];

  // 外部URLから本アプリにアクセスした際に、sessionStrageに保存する
  useEffect(() => {
    // if (performance.navigation.type !== performance.navigation.TYPE_RELOAD) {
    // console.log("外部URLからアクセスしたです。");
    if (getSessionData("accountData") !== undefined) {
      let SessionData = getSessionData("accountData");

      if (
        SessionData.development_environment !== undefined &&
        SessionData.development_environment !== ""
      ) {
        let commaArray = SessionData.development_environment.split(",");
        let devtagArray = [];
        commaArray.map((item) => {
          devtagArray.push({ value: item, label: item });
        });
        setSelectedDevEnvironment(devtagArray);
      }
    }
    // }
  }, []);

  useEffect(() => {
    let devTag = "";
    let devTagArray = [];
    selectedDevEnvironment.map((item) => {
      devTagArray.push(item.value);
    });
    devTag = devTagArray.join(",");

    updateSessionData("accountData", "development_environment", devTag);
  }, [selectedDevEnvironment]);

  const handleChange = (selectedOption) => {
    setSelectedDevEnvironment(selectedOption);
  };

  return (
    <div>
      <p>開発環境</p>
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

export default Environment;
