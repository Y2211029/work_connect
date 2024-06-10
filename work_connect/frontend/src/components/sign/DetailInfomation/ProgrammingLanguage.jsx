
import Select from "react-select";

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

const ProgrammingLanguage = () => {
  return (
    <>
      <p>プログラミング言語</p>
      <Select options={options} isMulti />
    </>
  );
};

export default ProgrammingLanguage;
