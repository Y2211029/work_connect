import { useState, useEffect } from "react";
import Select from "react-select";
import { useSessionStorage } from "src/hooks/use-sessionStorage";

// 現在の年とその前後5年間の年度を生成する関数
const generateYearOptions = (range) => {
  const currentYear = new Date().getFullYear();
  const options = [];
  for (let i = currentYear; i <= currentYear + range; i++) {
    options.push({ value: i, label: `${i}年` });
  }
  return options;
};

const GraduationYearDropdown = () => {
  const yearOptions = generateYearOptions(new Date().getFullYear(), 5);
  const [selectedGraduation, setSelectedGraduation] = useState({
    value: 2024,
    label: `2024年`,
  });

  // 登録項目確認の際に利用
  const { getSessionData, updateSessionData } = useSessionStorage();

  // 外部URLから本アプリにアクセスした際に、sessionStrageに保存する
  useEffect(() => {
    // if (performance.navigation.type !== performance.navigation.TYPE_RELOAD) {
    // console.log("外部URLからアクセスしたです。");
    if (getSessionData("accountData") !== undefined) {
      let SessionData = getSessionData("accountData");
      console.log("aiueokakikukeko", SessionData.graduation_year);

      if (SessionData.graduation_year !== undefined && SessionData.graduation_year !== "") {
        setSelectedGraduation({
          value: SessionData.graduation_year,
          label: `${SessionData.graduation_year}年`,
        });
      }
    }
    // }
  }, []);
  console.log("graduation_year", selectedGraduation);

  const handleChange = (selectedOption) => {
    setSelectedGraduation(selectedOption);
    console.log("selectedOption", selectedOption);

    updateSessionData("accountData", "graduation_year", `${selectedOption.value}`);
  };

  return (
    <div>
      <label htmlFor="yearOptions">卒業年度</label>
      <Select
        name="yearOptions"
        options={yearOptions}
        value={selectedGraduation}
        onChange={handleChange}
      />
    </div>
  );
};

export default GraduationYearDropdown;
