import { styled } from "@mui/system";

import SchoolNameDropdown from "./SchoolInfomation/SchoolNameDropdown";
import GraduationYearDropdown from "./SchoolInfomation/GraduationYearDropdown";
import DepartmentNameDropdown from "./SchoolInfomation/DepartmentNameDropdown";
import FacultyName from "./SchoolInfomation/FacultyName";
const SchoolInformation = () => {
  const Container = styled("div")({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center", // height: "",
    // backgroundColor: "#f0f0f0",
  });

  const LoginCard = styled("div")({
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
  });

  return (
    <Container>
      <LoginCard>
        <GraduationYearDropdown />
        <SchoolNameDropdown />
        <p>学部</p>
        <DepartmentNameDropdown />
        <p>学科</p>
        <FacultyName />
        <p>専攻</p>
        <p>コース</p>
      </LoginCard>
    </Container>
  );
};

export default SchoolInformation;
