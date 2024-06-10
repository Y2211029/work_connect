// ;
import Select from 'react-select';

// 現在の年とその前後5年間の年度を生成する関数
const generateYearOptions = (startYear, range) => {
  const currentYear = new Date().getFullYear();
  const options = [];
  for (let i = currentYear; i <= currentYear + range; i++) {
    options.push({ value: i, label: `${i}年` });
  }
  return options;
};

const GraduationYearDropdown = () => {
  const yearOptions = generateYearOptions(new Date().getFullYear(), 5);

  const handleChange = (selectedOption) => {
    console.log(`Selected year: ${selectedOption.value}`);
  };

  return (
    <div>
      <Select options={yearOptions} onChange={handleChange} />
    </div>
  );
};

export default GraduationYearDropdown;
