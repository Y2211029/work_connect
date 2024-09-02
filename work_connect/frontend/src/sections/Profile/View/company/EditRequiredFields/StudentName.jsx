import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import PropTypes from 'prop-types'; // prop-types をインポート
import { useSessionStorage } from "src/hooks/use-sessionStorage";

const StudentName = ({StudentSurnameData, StudentnameData}) => {
  
  const [StudentSurName, setStudentSurName] = useState(StudentSurnameData);
  const [StudentName, setStudentName] = useState(StudentnameData);
  const { getSessionData, updateSessionData } = useSessionStorage();

  // valueの初期値をセット
  useEffect(() => {
    // セッションデータ取得
    const SessionData = getSessionData("accountData");
    
    /// 編集の途中ならセッションストレージからデータを取得する。
    /// (リロードした時も、データが残った状態にする。)
    if (SessionData.StudentSurName !== undefined && SessionData.StudentSurName !== "") {
      // セッションストレージから最新のデータを取得
      setStudentSurName(SessionData.StudentSurName);
    } else {
      // DBから最新のデータを取得
      setStudentSurName(StudentSurnameData);
    }

    if (SessionData.StudentName !== undefined && SessionData.StudentName !== "") {
      // セッションストレージから最新のデータを取得
      setStudentName(SessionData.StudentName);
    } else {
      // DBから最新のデータを取得
      setStudentName(StudentnameData);
    }
    
  }, [StudentSurnameData, StudentnameData]);

  const handleChange = (e) => {
    const newValue = e.target.value;
    if (e.target.name === "StudentSurName") {
      setStudentSurName(newValue);
    } else if (e.target.name === "StudentName") {
      setStudentName(newValue);
    }
  };

  // 編集中のデータを保存しておく
  useEffect(() => {
    updateSessionData("accountData", "StudentSurName", StudentSurName);
    updateSessionData("accountData", "StudentName", StudentName);
  }, [StudentSurName,StudentName]);


  return (
    <div style={{ display: "flex" }}>
        <TextField
            // error={NULL_validation1 == true || inputError.student_surname}
            fullWidth
            label="姓"
            margin="normal"
            name="StudentSurName"
            onChange={handleChange}
            required
            type="text"
            value={StudentSurName}
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
            label="名"
            margin="normal"
            name="StudentName"
            onChange={handleChange}
            required
            type="text"
            value={StudentName}
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
StudentName.propTypes = {
  StudentSurnameData: PropTypes.string.isRequired,
  StudentnameData: PropTypes.string.isRequired,
};

export default StudentName;