import { useState } from "react";
import Select from "react-select";
import { useSessionStorage } from "src/hooks/use-sessionStorage";

const Software = () => {
  const [selectedDepartment, setSelectedDepartment] = useState("");

  const { updateSessionData } = useSessionStorage();
  const options = [
    { value: "Adobe Photoshop", label: "Adobe Photoshop" },
    { value: "Adobe Illustrator", label: "Adobe Illustrator" },
    { value: "Adobe XD", label: "Adobe XD" },
    { value: "Adobe Dreamweaver", label: "Adobe Dreamweaver" },
    { value: "Krita", label: "Krita" },
    { value: "GIMP", label: "GIMP" },
    { value: "Inkscape", label: "Inkscape" },
    { value: "InVision Studio", label: "InVision Studio" },
    { value: "Figma", label: "Figma" },
    { value: "Adobe PremierePro", label: "Adobe PremierePro" },
  ];
  return (
    <>
      <p>ソフトウェア</p>
      <Select options={options} isMulti />
    </>
  );
};

export default Software;
