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
  // 登録項目確認の際に利用
  const { updateSessionData } = useSessionStorage();

  const yearOptions = generateYearOptions(new Date().getFullYear(), 5);

  const handleChange = (selectedOption) => {
    updateSessionData("accountData", "graduation_year", selectedOption.value);
  };

  return (
    <div>
      <label htmlFor="yearOptions">卒業年度</label>
      <Select name="yearOptions" options={yearOptions} onChange={handleChange} />
    </div>
  );
};

export default GraduationYearDropdown;
