import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import PropTypes from 'prop-types'; // prop-types をインポート
import { useSessionStorage } from "src/hooks/use-sessionStorage";

const CompanyKanaName = ({CompanyKanaNameData}) => {

  const [CompanyKanaName, setCompanyKanaName] = useState(CompanyKanaNameData);
  const { getSessionData, updateSessionData } = useSessionStorage();

  // valueの初期値をセット
  useEffect(() => {
    // セッションデータ取得
    const SessionData = getSessionData("accountData");

    /// 編集の途中ならセッションストレージからデータを取得する。
    /// (リロードした時も、データが残った状態にする。)
    if ((SessionData.CompanyKanaName !== undefined && SessionData.CompanyKanaName !== "") ||
    SessionData.CompanyKanaNameEditing) {
      // セッションストレージから最新のデータを取得
      setCompanyKanaName(SessionData.CompanyKanaName);
    } else {
      // DBから最新のデータを取得
      setCompanyKanaName(CompanyKanaNameData);
    }
  }, [CompanyKanaNameData]);

  const handleChange = (e) => {
    const newValue = e.target.value;
    if(e.target.name === "CompanyKanaName"){
      setCompanyKanaName(newValue);
      updateSessionData("accountData", "CompanyKanaNameEditing", true);
    }
  };

  // 編集中のデータを保存しておく
  useEffect(() => {
    updateSessionData("accountData", "CompanyKanaName", CompanyKanaName);
  }, [CompanyKanaName]);


  return (
    <div style={{ display: "flex" }}>
        <TextField
            // error={NULL_validation2 == true || inputError.student_name}
            fullWidth
            label="企業名(カタカナ)"
            margin="normal"
            name="CompanyKanaName"
            onChange={handleChange}
            // required
            type="text"
            value={CompanyKanaName}
            variant="outlined"
            sx={{
                backgroundColor: '#fff', // 背景色を指定
                borderRadius: '8px', // 角の丸みを設定
                marginTop:'6px',
                marginBottom:'0'
            }}
        />
        </div>
  );
};

// プロパティの型を定義
CompanyKanaName.propTypes = {
  CompanyKanaNameData: PropTypes.string.isRequired,
};

export default CompanyKanaName;