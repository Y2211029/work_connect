import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import PropTypes from 'prop-types'; // prop-types をインポート
import { useSessionStorage } from "src/hooks/use-sessionStorage";
import Iframe from 'react-iframe'; //紹介動画やマップを埋め込む


const CompanyAddressMap = ({ CompanyAddressMapData }) => {


  const [CompanyAddressMap, setCompanyAddressMap] = useState(CompanyAddressMapData);
  const { getSessionData, updateSessionData } = useSessionStorage();


  // valueの初期値をセット
  useEffect(() => {
    // セッションデータ取得
    const SessionData = getSessionData("accountData");

    /// 編集の途中ならセッションストレージからデータを取得する。
    /// (リロードした時も、データが残った状態にする。)
    if ((SessionData.CompanyAddressMap !== undefined) ||
    SessionData.CompanyAddressMapEditing) {
      // セッションストレージから最新のデータを取得
      console.log(SessionData.CompanyAddressMap);
      setCompanyAddressMap(SessionData.CompanyAddressMap);
    }

  }, [CompanyAddressMapData]);

  const handleChange = (e) => {
    const newValue = e.target.value;
    if (e.target.name === "CompanyAddressMap") {
      setCompanyAddressMap(newValue);
      updateSessionData("accountData", "CompanyAddressMapEditing", true);
    }
  };

  // 編集中のデータを保存しておく
  useEffect(() => {
    updateSessionData("accountData", "CompanyAddressMap", CompanyAddressMap);
  }, [CompanyAddressMap]);


  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <TextField
        fullWidth
        label=""
        margin="normal"
        name="CompanyAddressMap"
        onChange={handleChange}
        required
        type="text"
        value={CompanyAddressMap}
        variant="outlined"
        sx={{
          backgroundColor: '#fff', // 背景色を指定
          borderRadius: '8px', // 角の丸みを設定
          marginTop: '6px',
          marginBottom: '0'
        }}
      />
      <Iframe
        url={CompanyAddressMap}
        width="100%"
        height="400px"
      />
    </div>


  );
};

// プロパティの型を定義
CompanyAddressMap.propTypes = {
  CompanyAddressMapData: PropTypes.string.isRequired,
};

export default CompanyAddressMap;