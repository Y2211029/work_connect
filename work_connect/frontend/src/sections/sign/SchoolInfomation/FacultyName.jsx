import { useState } from "react";
import Select from "react-select";
import { useSessionStorage } from "src/hooks/use-sessionStorage";

const FacultyNameDropdown = () => {
  const [selectedFaculty, setSelectedFaculty] = useState("");

  const { updateSessionData } = useSessionStorage();

  const options = [
    { value: "法律学科", label: "法律学科" },
    { value: "政治経済学科", label: "政治経済学科" },
    { value: "新聞学科", label: "新聞学科" },
    { value: "経営法学科", label: "経営法学科" },
    { value: "公共政策学科", label: "公共政策学科" },
    { value: "哲学科", label: "哲学科" },
    { value: "史学科", label: "史学科" },
    { value: "国文学科", label: "国文学科" },
    { value: "中国語中国文化学科", label: "中国語中国文化学科" },
    { value: "英文学科", label: "英文学科" },
    { value: "ドイツ文学科", label: "ドイツ文学科" },
    { value: "社会学科", label: "社会学科" },
    { value: "社会福祉学科", label: "社会福祉学科" },
    { value: "教育学科", label: "教育学科" },
    { value: "体育学科", label: "体育学科" },
    { value: "心理学科", label: "心理学科" },
    { value: "地理学科", label: "地理学科" },
    { value: "地球科学科", label: "地球科学科" },
    { value: "数学科", label: "数学科" },
    { value: "情報科学科", label: "情報科学科" },
    { value: "物理学科", label: "物理学科" },
    { value: "生命科学科", label: "生命科学科" },
    { value: "化学科", label: "化学科" },
    { value: "経済学科", label: "経済学科" },
    { value: "産業経営学科", label: "産業経営学科" },
    { value: "金融公共経済学科", label: "金融公共経済学科" },
    { value: "商業学科", label: "商業学科" },
    { value: "経営学科", label: "経営学科" },
    { value: "会計学科", label: "会計学科" },
    { value: "写真学科", label: "写真学科" },
    { value: "映画学科", label: "映画学科" },
    { value: "美術学科", label: "美術学科" },
    { value: "音楽学科", label: "音楽学科" },
    { value: "文芸学科", label: "文芸学科" },
    { value: "演劇学科", label: "演劇学科" },
    { value: "放送学科", label: "放送学科" },
    { value: "デザイン学科", label: "デザイン学科" },
    { value: "国際総合政策学科", label: "国際総合政策学科" },
    { value: "国際教養学科", label: "国際教養学科" },
    { value: "危機管理学科", label: "危機管理学科" },
    { value: "競技スポーツ学科", label: "競技スポーツ学科" },
    { value: "土木工学科", label: "土木工学科" },
    { value: "交通システム工学科", label: "交通システム工学科" },
    { value: "建築学科", label: "建築学科" },
    { value: "海洋建築工学科", label: "海洋建築工学科" },
    { value: "まちづくり工学科", label: "まちづくり工学科" },
    { value: "機械工学科", label: "機械工学科" },
    { value: "精密機械工学科", label: "精密機械工学科" },
    { value: "航空宇宙工学科", label: "航空宇宙工学科" },
    { value: "電気工学科", label: "電気工学科" },
    { value: "電子工学科", label: "電子工学科" },
    { value: "応用情報工学科", label: "応用情報工学科" },
    { value: "物質応用化学科", label: "物質応用化学科" },
    { value: "物理学科", label: "物理学科" },
    { value: "数学科", label: "数学科" },
    { value: "機械工学科", label: "機械工学科" },
    { value: "電気電子工学科", label: "電気電子工学科" },
    { value: "土木工学科", label: "土木工学科" },
    { value: "建築工学科", label: "建築工学科" },
    { value: "応用分子化学科", label: "応用分子化学科" },
    { value: "マネジメント工学科", label: "マネジメント工学科" },
    { value: "数理情報工学科", label: "数理情報工学科" },
    { value: "環境安全工学科", label: "環境安全工学科" },
    { value: "創生デザイン学科", label: "創生デザイン学科" },
    { value: "土木工学科", label: "土木工学科" },
    { value: "建築学科", label: "建築学科" },
    { value: "機械工学科", label: "機械工学科" },
    { value: "電気電子工学科", label: "電気電子工学科" },
    { value: "生命応用化学科", label: "生命応用化学科" },
    { value: "情報工学科", label: "情報工学科" },
    { value: "医学科", label: "医学科" },
    { value: "歯学科", label: "歯学科" },
    { value: "バイオサイエンス学科", label: "バイオサイエンス学科" },
    { value: "動物学科", label: "動物学科" },
    { value: "海洋生物学科", label: "海洋生物学科" },
    { value: "森林学科", label: "森林学科" },
    { value: "環境学科", label: "環境学科" },
    { value: "アグリサイエンス学科", label: "アグリサイエンス学科" },
    { value: "食品開発学科", label: "食品開発学科" },
    { value: "食品ビジネス学科", label: "食品ビジネス学科" },
    { value: "国際共生学科", label: "国際共生学科" },
    { value: "獣医保健看護学科", label: "獣医保健看護学科" },
    { value: "獣医学科", label: "獣医学科" },
    { value: "薬学科", label: "薬学科" },
  ];
  const handleChange = (selectedOption) => {
    setSelectedFaculty(selectedOption);

    // sessionStrageに値を保存
    updateSessionData("accountData", "faculty_name", selectedOption.label);
  };

  return (
    <div>
      <p>学科</p>
      <Select
        id="departmentDropdown"
        value={selectedFaculty}
        onChange={handleChange}
        options={options}
        placeholder="Select..."
      />
    </div>
  );
};

export default FacultyNameDropdown;
