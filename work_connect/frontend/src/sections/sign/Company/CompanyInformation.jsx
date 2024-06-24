import PropTypes from "prop-types";

import { Container, RegistarCard } from "../css/RegistarStyled";

import CompanyOccupation from "../CompanyInfomation/CompanyOccupation";
import CompanyPrefecture from "../CompanyInfomation/CompanyPrefecture";
// import DepartmentNameDropdown from "./SchoolInfomation/DepartmentNameDropdown";
// import FacultyName from "./SchoolInfomation/FacultyName";

const SchoolInformation = () => {
  return (
    <Container>
      <RegistarCard>
      <CompanyOccupation />
      <CompanyPrefecture />
        <p>ホームページURL</p>
      </RegistarCard>
    </Container>
  );
};

SchoolInformation.propTypes = {
  SessionSaveTrigger: PropTypes.string, // ここでSessionSaveTriggerの型を定義
};

export default SchoolInformation;
