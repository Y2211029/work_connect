import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { useSessionStorage } from "src/hooks/use-sessionStorage";

const StudentName = () => {

  const [StudentSurName, setStudentSurName] = useState('');
  const [StudentName, setStudentName] = useState('');
  const { getSessionData, updateSessionData } = useSessionStorage();

  // 外部URLから本アプリにアクセスした際に、sessionStorageに保存する
  useEffect(() => {
    const SessionData = getSessionData("accountData");
    if (SessionData.StudentSurName !== undefined && SessionData.StudentSurName !== "") {
      setStudentSurName(SessionData.StudentSurName);
    }
    if (SessionData.StudentName !== undefined && SessionData.StudentName !== "") {
      setStudentName(SessionData.StudentName);
    }
  }, []); // 初回マウント時のみ実行

  const handleChange = (e) => {
    const newValue = e.target.value;
    if(e.target.name === "StudentSurName"){
      setStudentSurName(newValue);
    } else if(e.target.name === "StudentName"){
      setStudentName(newValue);
    }
    
  };

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

export default StudentName;