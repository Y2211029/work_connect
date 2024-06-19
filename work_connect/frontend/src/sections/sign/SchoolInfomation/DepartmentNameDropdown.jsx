import { useState } from "react";
import Select from "react-select";
import { useSessionStorage } from "src/hooks/use-sessionStorage";

const DepartmentNameDropdown = () => {
  const [selectedDepartment, setSelectedDepartment] = useState("");

  const { updateSessionData } = useSessionStorage();

  const options = [
    { value: "旅行", label: "総合政策学部" },
    { value: "読書", label: "経済学部" },
    { value: "ドライブ", label: "経営学部" },
    { value: "映画鑑賞", label: "商学部" },
    { value: "筋トレ", label: "社会学部" },
    { value: "カラオケ", label: "観光学部" },
    { value: "スポーツ観戦", label: "国際関係学部" },
    { value: "ゲーム", label: "国際文化学部" },
    { value: "プログラミング", label: "国際教養学部" },
    { value: "DIY", label: "文学部" },
    { value: "釣り", label: "人間科学部" },
    { value: "料理", label: "外国語学部" },
    { value: "ツーリング", label: "教育学部" },
    { value: "音楽鑑賞", label: "子ども学部" },
    { value: "プログラミング", label: "社会福祉学部" },
    { value: "DIY", label: "家政学部" },
    { value: "釣り", label: "芸術学部" },
    { value: "料理", label: " 体育学部" },
    { value: "ツーリング", label: "健康科学部" },
    { value: "音楽鑑賞", label: "教養学部" },
    { value: "プログラミング", label: "理学部" },
    { value: "DIY", label: "工学部" },
    { value: "釣り", label: "農学部" },
    { value: "料理", label: " 水産学部" },
    { value: "ツーリング", label: "獣医学部" },
    { value: "音楽鑑賞", label: "医学部" },
    { value: "音楽鑑賞", label: "歯学部" },
    { value: "音楽鑑賞", label: "薬学部" },
    { value: "音楽鑑賞", label: "看護学部" },
    { value: "音楽鑑賞", label: "保健学部" },
    { value: "音楽鑑賞", label: "医療技術学部" },
  ];

  const handleChange = (selectedOption) => {
    setSelectedDepartment(selectedOption);

    // sessionStrageに値を保存
    updateSessionData("accountData", "department_name", selectedOption.label);
  };

  return (
    <div>
      <p>学部</p>
      <Select
        id="departmentDropdown"
        value={selectedDepartment}
        onChange={handleChange}
        options={options}
        placeholder="Select..."
      />
    </div>
  );
};

export default DepartmentNameDropdown;
