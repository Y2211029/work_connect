// 
import Select from "react-select";

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

const Environment = () => {
  return (
    <>
      <p>開発環境</p>
      <Select options={options} isMulti />
    </>
  );
};

export default Environment;
