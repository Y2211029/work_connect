import { useState } from "react";
import Select from "react-select";
import { useSessionStorage } from "src/hooks/use-sessionStorage";

const Software = () => {
  const [selectedSoftware, setSelectedSoftware] = useState("");

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

  const handleChange = (selectedOption) => {
    setSelectedSoftware(selectedOption);

    // sessionStrageに値を保存
    updateSessionData("accountData", "software", selectedOption.label);
  };

  return (
    <>
      <p>ソフトウェア</p>
      <Select id="software" value={selectedSoftware} onChange={handleChange} options={options} placeholder="Select..." isMulti />
    </>
  );
};

export default Software;
