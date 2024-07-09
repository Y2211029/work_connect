import { useEffect, useState } from "react";
import Select from "react-select";
import axios from "axios";
import { useSessionStorage } from "src/hooks/use-sessionStorage";

const PrefectureSelect = () => {
  const [prefectures, setPrefectures] = useState([]);
  const [Prefectures, setPrefecture] = useState([]);

  const { getSessionData, updateSessionData } = useSessionStorage();
  useEffect(() => {
    // RESAS APIのエンドポイントとAPIキー
    const apiEndpoint = "https://opendata.resas-portal.go.jp/api/v1/prefectures";
    const apiKey = "VmOPglAdJHKbMUCUooHSY8qaA0llxEVlwqqCpmof"; // ここに取得したAPIキーを入力してください

    const fetchPrefectures = async () => {
      try {
        const response = await axios.get(apiEndpoint, {
          headers: { "X-API-KEY": apiKey },
        });
        const data = response.data.result.map((pref) => ({
          value: pref.prefCode,
          label: pref.prefName,
        }));
        setPrefectures(data);
      } catch (error) {
        console.error("Failed to fetch prefectures", error);
      }
    };

    fetchPrefectures();
  }, []);

  // 外部URLから本アプリにアクセスした際に、sessionStrageに保存する
  useEffect(() => {
    // if (performance.navigation.type !== performance.navigation.TYPE_RELOAD) {
    // console.log("外部URLからアクセスしたです。");
    if (getSessionData("accountData") !== undefined) {
      let SessionData = getSessionData("accountData");

      if (SessionData.desired_work_region !== undefined && SessionData.desired_work_region !== "") {
        let commaArray = SessionData.desired_work_region.split(",");
        let devtagArray = [];
        commaArray.map((item) => {
          devtagArray.push({ value: item, label: item });
        });
        setPrefecture(devtagArray);
      }
    }
    // }
  }, []);

  useEffect(() => {
    let devTag = "";
    let devTagArray = [];
    console.log("Prefectures", Prefectures);
    Prefectures.map((item) => {
      devTagArray.push(item.label);
    });
    devTag = devTagArray.join(",");

    updateSessionData("accountData", "desired_work_region", devTag);
  }, [Prefectures]);

  const handleChange = (selectedOption) => {
    setPrefecture(selectedOption);
  };

  return (
    <div>
      <>
        <p>希望勤務地</p>
        <Select
          id="prefecturesDropdwon"
          value={Prefectures}
          onChange={handleChange}
          options={prefectures}
          placeholder="Select..."
          isMulti
        />
      </>
    </div>
  );
};

export default PrefectureSelect;
