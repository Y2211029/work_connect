import { useEffect, useState } from "react";
import Select from "react-select";
import axios from "axios";
import PropTypes from 'prop-types';
import { useSessionStorage } from "src/hooks/use-sessionStorage";

const PrefectureDropdown = ({PrefectureData}) => {
  const [APIs, setAPIs] = useState([]);
  const [Prefecture, setPrefecture] = useState([]);

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
        setAPIs(data);
        // console.log("data:::"+data.value);
      } catch (error) {
        console.error("Failed to fetch APIs", error);
      }
    };

    fetchPrefectures();
  }, []);
  

  // valueの初期値をセット
  useEffect(() => {
    if (getSessionData("accountData") !== undefined) {
      const SessionData = getSessionData("accountData");
      if(SessionData.PrefectureEditing && SessionData.Prefecture){
        // セッションストレージから最新のデータを取得
        const devtagArray = SessionData.Prefecture.split(",").map(item => ({
          value: item,
          label: item,
        }));
        setPrefecture(devtagArray);
      } else if(
        (SessionData.PrefectureEditing && SessionData.Prefecture && PrefectureData)||
        (!SessionData.PrefectureEditing && PrefectureData)
      ){ // DBから最新のデータを取得
        const devtagArray = PrefectureData.split(",").map(item => ({
          value: item,
          label: item,
        }));
        setPrefecture(devtagArray);
      }
    }
  }, [PrefectureData]);

  useEffect(() => {
    let devTag = "";
    let devTagArray = [];
    Prefecture.map((item) => {
      devTagArray.push(item.label);
    });
    devTag = devTagArray.join(",");

    updateSessionData("accountData", "Prefecture", devTag);
  }, [Prefecture]);

  const handleChange = (selectedOption) => {
    // newValueをセット
    setPrefecture(selectedOption);
    // 編集中状態をオン(保存もしくはログアウトされるまで保持)
    updateSessionData("accountData", "PrefectureEditing", true);
  };

  return (
    <div>
      <>
        <Select
          id="prefecturesDropdwon"
          value={Prefecture}
          onChange={handleChange}
          options={APIs}
          placeholder="Select..."
          isMulti
        />
      </>
    </div>
  );
};

PrefectureDropdown.propTypes = {
  PrefectureData: PropTypes.string ,
};

export default PrefectureDropdown;