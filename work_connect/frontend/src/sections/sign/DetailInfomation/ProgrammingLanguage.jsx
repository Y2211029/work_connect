import { useState } from "react";
import Select from "react-select";
import { useSessionStorage } from "src/hooks/use-sessionStorage";

const ProgrammingLanguage = () => {
  const [selectedProgrammingLanguage, setselectedProgrammingLanguage] = useState("");

  const { updateSessionData } = useSessionStorage();
  const options = [
    { value: "Python", label: "Python" },
    { value: "C", label: "C" },
    { value: "C++", label: "C++" },
    { value: "C#", label: "C#" },
    { value: "Java", label: "Java" },
    { value: "JavaScript", label: "JavaScript" },
    { value: "SQL", label: "SQL" },
    { value: "Go", label: "Go" },
    { value: "Scratch", label: "Scratch" },
    { value: "Visual Basic", label: "Visual Basic" },
    { value: "Assembly language", label: "Assembly language" },
    { value: "PHP", label: "PHP" },
    { value: "MATLAB", label: "MATLAB" },
    { value: "Fortran", label: "Fortran" },
    { value: "Delphi/Object Pascal", label: "Delphi/Object Pascal" },
    { value: "Swift", label: "Swift" },
    { value: "Rust", label: "Rust" },
    { value: "Ruby", label: "Ruby" },
    { value: "Kotlin", label: "Kotlin" },
    { value: "COBOL", label: "COBOL" },
  ];

  const handleChange = (selectedOption) => {
    setselectedProgrammingLanguage(selectedOption);

    // sessionStrageに値を保存
    updateSessionData("accountData", "programming_language", selectedOption.label);
  };

  return (
    <div>
      <p>プログラミング言語</p>
      <Select
        id="programmingLanguageDropdown"
        value={selectedProgrammingLanguage}
        onChange={handleChange}
        options={options}
        placeholder="Select..."
        isMulti
      />
    </div>
  );
};

export default ProgrammingLanguage;
