import { useEffect, useState } from "react";
import Select from "react-select";
import axios from "axios";

const PrefectureSelect = () => {
  const [prefectures, setPrefectures] = useState([]);

  useEffect(() => {
    // RESAS APIのエンドポイントとAPIキー
    const apiEndpoint =
      "https://opendata.resas-portal.go.jp/api/v1/prefectures";
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

  return (
    <div>
      <>
      <p>希望勤務地</p>
        <Select options={prefectures} isMulti />
      </>
    </div>
  );
};

export default PrefectureSelect;
