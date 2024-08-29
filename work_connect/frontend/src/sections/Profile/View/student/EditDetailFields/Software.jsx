import { useState, useEffect } from "react";
import Select from "react-select";
import PropTypes from 'prop-types';
import { useSessionStorage } from "src/hooks/use-sessionStorage";

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

const Software = ({SoftwareData}) => {
  const [selectedSoftware, setSelectedSoftware] = useState([]);
  const { getSessionData, updateSessionData } = useSessionStorage();

   // valueの初期値をセット
   useEffect(() => {
    if (getSessionData("accountData") !== undefined) {
      const SessionData = getSessionData("accountData");
      if(SessionData.SoftwareEditing && SessionData.Software){
        // セッションストレージから最新のデータを取得
        const devtagArray = SessionData.Software.split(",").map(item => ({
          value: item,
          label: item,
        }));
        setSelectedSoftware(devtagArray);
      } else if(
        (SessionData.SoftwareEditing && SessionData.Software && SoftwareData)||
        (!SessionData.SoftwareEditing && SoftwareData)
      ){ // DBから最新のデータを取得
        const devtagArray = SoftwareData.split(",").map(item => ({
          value: item,
          label: item,
        }));
        setSelectedSoftware(devtagArray);
      }
    }
  }, [SoftwareData]);

  useEffect(() => {
    let devTag = "";
    let devTagArray = [];
    selectedSoftware.map((item) => {
      devTagArray.push(item.value);
    });
    devTag = devTagArray.join(",");

    updateSessionData("accountData", "Software", devTag);
  }, [selectedSoftware]);

  const handleChange = (selectedOption) => {
    // newValueをセット
    setSelectedSoftware(selectedOption);
    // 編集中状態をオン(保存もしくはログアウトされるまで保持)
    updateSessionData("accountData", "SoftwareEditing", true);
  };

  return (
    <>
      <Select
        id="Software"
        value={selectedSoftware}
        onChange={handleChange}
        options={options}
        placeholder="Select..."
        isMulti
      />
    </>
  );
};

Software.propTypes = {
  SoftwareData: PropTypes.string ,
};

export default Software;
