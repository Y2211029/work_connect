import { useState } from "react";
import Select from "react-select";
import { useSessionStorage } from "src/hooks/use-sessionStorage";

const FacultyNameDropdown = () => {
  const [selectedFaculty, setSelectedFaculty] = useState("");

  const { updateSessionData } = useSessionStorage();

  const options = [
    { value: "旅行", label: "法律学科" },
    { value: "読書", label: "政治経済学科" },
    { value: "ドライブ", label: "新聞学科" },
    { value: "映画鑑賞", label: "経営法学科" },
    { value: "筋トレ", label: "公共政策学科" },
    { value: "カラオケ", label: "哲学科" },
    { value: "スポーツ観戦", label: "史学科" },
    { value: "ゲーム", label: "国文学科" },
    { value: "プログラミング", label: "中国語中国文化学科" },
    { value: "DIY", label: "英文学科" },
    { value: "釣り", label: "ドイツ文学科" },
    { value: "料理", label: "社会学科" },
    { value: "ツーリング", label: "社会福祉学科" },
    { value: "音楽鑑賞", label: "教育学科" },
    { value: "プログラミング", label: "体育学科" },
    { value: "DIY", label: "心理学科" },
    { value: "釣り", label: "地理学科" },
    { value: "料理", label: " 地球科学科" },
    { value: "ツーリング", label: "数学科" },
    { value: "音楽鑑賞", label: "情報科学科" },
    { value: "プログラミング", label: "物理学科" },
    { value: "DIY", label: "生命科学科" },
    { value: "釣り", label: "化学科" },
    { value: "料理", label: " 経済学科" },
    { value: "ツーリング", label: "産業経営学科" },
    { value: "音楽鑑賞", label: "金融公共経済学科" },
    { value: "音楽鑑賞", label: "商業学科" },
    { value: "音楽鑑賞", label: "経営学科" },
    { value: "音楽鑑賞", label: "会計学科" },
    { value: "音楽鑑賞", label: "写真学科" },
    { value: "音楽鑑賞", label: "映画学科" },
    { value: "音楽鑑賞", label: "美術学科" },
    { value: "音楽鑑賞", label: "音楽学科" },
    { value: "音楽鑑賞", label: "文芸学科" },
    { value: "音楽鑑賞", label: "演劇学科" },
    { value: "音楽鑑賞", label: "放送学科" },
    { value: "音楽鑑賞", label: "デザイン学科" },
    { value: "音楽鑑賞", label: "国際総合政策学科" },
    { value: "音楽鑑賞", label: "国際教養学科" },
    { value: "音楽鑑賞", label: "危機管理学科" },
    { value: "音楽鑑賞", label: "競技スポーツ学科" },
    { value: "音楽鑑賞", label: "土木工学科" },
    { value: "音楽鑑賞", label: "交通システム工学科" },
    { value: "音楽鑑賞", label: "建築学科" },
    { value: "音楽鑑賞", label: "海洋建築工学科" },
    { value: "音楽鑑賞", label: "まちづくり工学科" },
    { value: "音楽鑑賞", label: "機械工学科" },
    { value: "音楽鑑賞", label: "精密機械工学科" },
    { value: "音楽鑑賞", label: "航空宇宙工学科" },
    { value: "音楽鑑賞", label: "電気工学科" },
    { value: "音楽鑑賞", label: "電子工学科" },
    { value: "音楽鑑賞", label: "応用情報工学科" },
    { value: "音楽鑑賞", label: "物質応用化学科" },
    { value: "音楽鑑賞", label: "物理学科" },
    { value: "音楽鑑賞", label: "数学科" },
    { value: "音楽鑑賞", label: "機械工学科" },
    { value: "音楽鑑賞", label: "電気電子工学科" },
    { value: "音楽鑑賞", label: "土木工学科" },
    { value: "音楽鑑賞", label: "建築工学科" },
    { value: "音楽鑑賞", label: "応用分子化学科" },
    { value: "音楽鑑賞", label: "マネジメント工学科" },
    { value: "音楽鑑賞", label: "数理情報工学科" },
    { value: "音楽鑑賞", label: "環境安全工学科" },
    { value: "音楽鑑賞", label: "創生デザイン学科" },
    { value: "音楽鑑賞", label: "土木工学科" },
    { value: "音楽鑑賞", label: "建築学科" },
    { value: "音楽鑑賞", label: "機械工学科" },
    { value: "音楽鑑賞", label: "電気電子工学科" },
    { value: "音楽鑑賞", label: "生命応用化学科" },
    { value: "音楽鑑賞", label: "情報工学科" },
    { value: "音楽鑑賞", label: "医学科" },
    { value: "音楽鑑賞", label: "歯学科" },
    { value: "音楽鑑賞", label: "バイオサイエンス学科" },
    { value: "音楽鑑賞", label: "動物学科" },
    { value: "音楽鑑賞", label: "海洋生物学科" },
    { value: "音楽鑑賞", label: "森林学科" },
    { value: "音楽鑑賞", label: "環境学科" },
    { value: "音楽鑑賞", label: "アグリサイエンス学科" },
    { value: "音楽鑑賞", label: "食品開発学科" },
    { value: "音楽鑑賞", label: "食品ビジネス学科" },
    { value: "音楽鑑賞", label: "国際共生学科" },
    { value: "音楽鑑賞", label: "獣医保健看護学科" },
    { value: "音楽鑑賞", label: "獣医学科" },
    { value: "音楽鑑賞", label: "薬学科" },
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
