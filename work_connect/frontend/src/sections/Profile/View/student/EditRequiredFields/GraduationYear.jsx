import { useState, useEffect } from "react";
import Select from "react-select";
import { useSessionStorage } from "src/hooks/use-sessionStorage";
import PropTypes from 'prop-types';

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
  const yearOptions = generateYearOptions(5);
  const [selectedGraduation, setSelectedGraduation] = useState("");

  // 登録項目確認の際に利用
  const { getSessionData, updateSessionData } = useSessionStorage();

  // 外部URLから本アプリにアクセスした際に、sessionStrageに保存する
  useEffect(() => {
    if (getSessionData("accountData") !== undefined) {
      let SessionData = getSessionData("accountData");

      if (SessionData.graduation_year !== undefined && SessionData.graduation_year !== "") {
        setSelectedGraduation({
          value: SessionData.graduation_year,
          label: `${SessionData.graduation_year}年`,
        });
      }
    }
  }, []);

  const handleChange = (selectedOption) => {
    setSelectedGraduation(selectedOption);
    console.log("selectedOption", selectedOption);

    updateSessionData("accountData", "graduation_year", `${selectedOption.value}`);
  };

  return (
      <Select
        name="yearOptions"
        options={yearOptions}
        value={selectedGraduation}
        onChange={handleChange}
        placeholder="Select..."
        required
      />
  );
};

GraduationYearDropdown.propTypes = {
  coleSetRequiredCheck: PropTypes.func,
};

export default GraduationYearDropdown;

