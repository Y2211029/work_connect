import { useState } from "react";
import Select from "react-select";
import { useSessionStorage } from "src/hooks/use-sessionStorage";

const Environment = () => {
  const [selectedDevEnvironment, setSelectedDevEnvironment] = useState("");
  const { updateSessionData } = useSessionStorage();

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

  const handleChange = (selectedOption) => {
    setSelectedDevEnvironment(selectedOption);

    // sessionStrageに値を保存
    updateSessionData("accountData", "development_environment", selectedOption);
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
