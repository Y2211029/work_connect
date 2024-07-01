import PropTypes from "prop-types";

import { Container, RegistarCard } from "../css/RegistarStyled";

import CompanyOccupation from "../CompanyInfomation/CompanyOccupation";
import CompanyPrefecture from "../CompanyInfomation/CompanyPrefecture";
import CompanyHP_URL from "../CompanyInfomation/CompanyHP_URL";
// import FacultyName from "./SchoolInfomation/FacultyName";

const SchoolInformation = () => {
  return (
    <Container>
      <RegistarCard>
      <CompanyOccupation />
      <CompanyPrefecture />
      <CompanyHP_URL />
      </RegistarCard>
    </Container>
  );
};

SchoolInformation.propTypes = {
  SessionSaveTrigger: PropTypes.string, // ここでSessionSaveTriggerの型を定義
};

export default SchoolInformation;
