
import Select from "react-select";

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

const Software = () => {
  return (
    <>
      <p>ソフトウェア</p>
      <Select options={options} isMulti />
    </>
  );
};

export default Software;
