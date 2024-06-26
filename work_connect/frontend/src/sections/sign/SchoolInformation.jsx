import PropTypes from "prop-types";

import { Container, RegistarCard } from "./css/RegistarStyled";

import SchoolNameDropdown from "./SchoolInfomation/SchoolNameDropdown";
import GraduationYearDropdown from "./SchoolInfomation/GraduationYearDropdown";
import DepartmentNameDropdown from "./SchoolInfomation/DepartmentNameDropdown";
import FacultyName from "./SchoolInfomation/FacultyName";

const SchoolInformation = () => {
  console.log("SchoolInformationです");
  return (
    <Container>
      <RegistarCard>
        <GraduationYearDropdown />
        <SchoolNameDropdown />
        <DepartmentNameDropdown />
        <FacultyName />
        <p>専攻</p>
        <p>コース</p>
      </RegistarCard>
    </Container>
  );
};

SchoolInformation.propTypes = {
  SessionSaveTrigger: PropTypes.string, // ここでSessionSaveTriggerの型を定義
};

export default SchoolInformation;
