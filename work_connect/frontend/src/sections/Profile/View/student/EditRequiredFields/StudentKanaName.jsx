import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import PropTypes from 'prop-types'; // prop-types をインポート
import { useSessionStorage } from "src/hooks/use-sessionStorage";

const StudentKanaName = ({StudentKanaSurnameData, StudentKananameData}) => {

  const [StudentKanaSurName, setStudentKanaSurName] = useState(StudentKanaSurnameData);
  const [StudentKanaName, setStudentKanaName] = useState(StudentKananameData);
  const { getSessionData, updateSessionData } = useSessionStorage();

  // valueの初期値をセット
  useEffect(() => {
    // セッションデータ取得
    const SessionData = getSessionData("accountData");
    
    /// 編集の途中ならセッションストレージからデータを取得する。
    /// (リロードした時も、データが残った状態にする。)
    if (SessionData.StudentKanaSurName !== undefined && SessionData.StudentKanaSurName !== "") {
      // セッションストレージから最新のデータを取得
      setStudentKanaSurName(SessionData.StudentKanaSurName);
    } else {
      // DBから最新のデータを取得
      setStudentKanaSurName(StudentKanaSurnameData);
    }

    if (SessionData.StudentKanaName !== undefined && SessionData.StudentKanaName !== "") {
      // セッションストレージから最新のデータを取得
      setStudentKanaName(SessionData.StudentKanaName);
    } else {
      // DBから最新のデータを取得
      setStudentKanaName(StudentKananameData);
    }
  }, [StudentKanaSurnameData, StudentKananameData]);

  const handleChange = (e) => {
    const newValue = e.target.value;
    if(e.target.name === "StudentKanaSurName"){
      setStudentKanaSurName(newValue);
    } else if(e.target.name === "StudentKanaName"){
      setStudentKanaName(newValue);
    }
  };

  // 編集中のデータを保存しておく
  useEffect(() => {
    updateSessionData("accountData", "StudentKanaSurName", StudentKanaSurName);
    updateSessionData("accountData", "StudentKanaName", StudentKanaName);
  }, [StudentKanaSurName,StudentKanaName]);


  return (
    <div style={{ display: "flex" }}>
        <TextField
            // error={NULL_validation1 == true || inputError.student_surname}
            fullWidth
            label="セイ"
            margin="normal"
            name="StudentKanaSurName"
            onChange={handleChange}
            required
            type="text"
            value={StudentKanaSurName}
            variant="outlined"
            sx={{
                backgroundColor: '#fff', // 背景色を指定
                borderRadius: '8px', // 角の丸みを設定
                marginTop:'6px',
                marginBottom:'0'
            }}
        />
        <TextField
            // error={NULL_validation2 == true || inputError.student_name}
            fullWidth
            label="メイ"
            margin="normal"
            name="StudentKanaName"
            onChange={handleChange}
            required
            type="text"
            value={StudentKanaName}
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
StudentKanaName.propTypes = {
  StudentKanaSurnameData: PropTypes.string.isRequired,
  StudentKananameData: PropTypes.string.isRequired,
};

export default StudentKanaName;