import { useState, useEffect } from "react";
import Select from "react-select";
import { useSessionStorage } from "src/hooks/use-sessionStorage";

const Software = () => {
  const [selectedSoftware, setSelectedSoftware] = useState([]);
  const { getSessionData, updateSessionData } = useSessionStorage();

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

  // すでに趣味がsessionStrageに保存されていればその値をstateにセットして表示する。
  useEffect(() => {
    if (getSessionData("accountData") !== undefined) {
      let SessionData = getSessionData("accountData");

      if (SessionData.software !== undefined && SessionData.software !== "") {
        let commaArray = SessionData.software.split(",");
        let devtagArray = [];
        commaArray.map((item) => {
          devtagArray.push({ value: item, label: item });
        });
        setSelectedSoftware(devtagArray);
      }
    }
  }, []);

  useEffect(() => {
    let devTag = "";
    let devTagArray = [];
    selectedSoftware.map((item) => {
      devTagArray.push(item.value);
    });
    devTag = devTagArray.join(",");

    updateSessionData("accountData", "software", devTag);
  }, [selectedSoftware]);

  const handleChange = (selectedOption) => {
    setSelectedSoftware(selectedOption);
  };

  return (
    <>
      <p>ソフトウェア</p>
      <Select
        id="software"
        value={selectedSoftware}
        onChange={handleChange}
        options={options}
        placeholder="Select..."
        isMulti
      />
    </>
  );
};

export default Software;
