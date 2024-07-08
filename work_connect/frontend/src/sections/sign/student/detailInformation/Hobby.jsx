import { useState, useEffect } from "react";
import Select from "react-select";
import { useSessionStorage } from "src/hooks/use-sessionStorage";

const Hobby = () => {
  const [selectedDepartment, setSelectedHobby] = useState([]);
  const { getSessionData, updateSessionData } = useSessionStorage();
  
  const options = [
    { value: "旅行", label: "旅行" },
    { value: "読書", label: "読書" },
    { value: "ドライブ", label: "ドライブ" },
    { value: "映画鑑賞", label: "映画鑑賞" },
    { value: "筋トレ", label: "筋トレ" },
    { value: "カラオケ", label: "カラオケ" },
    { value: "スポーツ観戦", label: "スポーツ観戦" },
    { value: "ゲーム", label: "ゲーム" },
    { value: "プログラミング", label: "プログラミング" },
    { value: "DIY", label: "DIY" },
    { value: "釣り", label: "釣り" },
    { value: "料理", label: "料理" },
    { value: "ツーリング", label: "ツーリング" },
    { value: "音楽鑑賞", label: "音楽鑑賞" },
  ];

  // すでに趣味がsessionStrageに保存されていればその値をstateにセットして表示する。
  useEffect(() => {
    if (getSessionData("accountData") !== undefined) {
      let SessionData = getSessionData("accountData");

      if (SessionData.hobby !== undefined && SessionData.hobby !== "") {
        let commaArray = SessionData.hobby.split(",");
        let devtagArray = [];
        commaArray.map((item) => {
          devtagArray.push({ value: item, label: item });
        });
        setSelectedHobby(devtagArray);
      }
    }
  }, []);

  useEffect(() => {
    let devTag = "";
    let devTagArray = [];
    selectedDepartment.map((item) => {
      devTagArray.push(item.value);
    });
    devTag = devTagArray.join(",");

    updateSessionData("accountData", "hobby", devTag);
  }, [selectedDepartment]);

  const handleChange = (selectedOption) => {
    setSelectedHobby(selectedOption);
  };

  return (
    <div>
      <p>趣味</p>
      <Select
        id="hobbyDropdown"
        value={selectedDepartment}
        onChange={handleChange}
        options={options}
        placeholder="Select..."
        isMulti
      />
    </div>
  );
};

export default Hobby;
