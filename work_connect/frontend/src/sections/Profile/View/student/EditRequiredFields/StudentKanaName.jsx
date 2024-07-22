import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { useSessionStorage } from "src/hooks/use-sessionStorage";

const StudentKanaName = () => {

  const [StudentKanaSurName, setStudentKanaSurName] = useState('');
  const [StudentKanaName, setStudentKanaName] = useState('');
  const { getSessionData, updateSessionData } = useSessionStorage();

  // 外部URLから本アプリにアクセスした際に、sessionStorageに保存する
  useEffect(() => {
    const SessionData = getSessionData("accountData");
    if (SessionData.StudentKanaSurName !== undefined && SessionData.StudentKanaSurName !== "") {
      setStudentKanaSurName(SessionData.StudentKanaSurName);
    }
    if (SessionData.StudentKanaName !== undefined && SessionData.StudentKanaName !== "") {
      setStudentKanaName(SessionData.StudentKanaName);
    }
  }, []); // 初回マウント時のみ実行

  const handleChange = (e) => {
    const newValue = e.target.value;
    if(e.target.name === "StudentKanaSurName"){
      setStudentKanaSurName(newValue);
    } else if(e.target.name === "StudentKanaName"){
      setStudentKanaName(newValue);
    }
    
  };

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

export default StudentKanaName;