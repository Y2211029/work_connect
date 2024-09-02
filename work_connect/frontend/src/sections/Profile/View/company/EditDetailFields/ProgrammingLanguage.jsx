import { useState, useEffect } from "react";
import Select from "react-select";
import { useSessionStorage } from "src/hooks/use-sessionStorage";

const ProgrammingLanguage = () => {
  const [selectedProgrammingLanguage, setselectedProgrammingLanguage] = useState([]);

  const { getSessionData, updateSessionData } = useSessionStorage();
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

  // すでにプログラミング言語がsessionStrageに保存されていればその値をstateにセットして表示する。
  useEffect(() => {
    if (getSessionData("accountData") !== undefined) {
      let SessionData = getSessionData("accountData");

      if (
        SessionData.programming_language !== undefined &&
        SessionData.programming_language !== ""
      ) {
        let commaArray = SessionData.programming_language.split(",");
        let devtagArray = [];
        commaArray.map((item) => {
          devtagArray.push({ value: item, label: item });
        });
        setselectedProgrammingLanguage(devtagArray);
      }
    }
  }, []);

  useEffect(() => {
    let devTag = "";
    let devTagArray = [];
    selectedProgrammingLanguage.map((item) => {
      devTagArray.push(item.value);
    });
    devTag = devTagArray.join(",");

    updateSessionData("accountData", "programming_language", devTag);
  }, [selectedProgrammingLanguage]);

  const handleChange = (selectedOption) => {
    setselectedProgrammingLanguage(selectedOption);
  };

  return (
    <div>
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
