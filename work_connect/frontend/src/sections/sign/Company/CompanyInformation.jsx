import PropTypes from "prop-types";

import { Container, RegistarCard } from "../css/RegistarStyled";

import CompanyOccupation from "../CompanyInformation/CompanyOccupation";
import CompanyPrefecture from "../CompanyInformation/CompanyPrefecture";
import CompanyHP_URL from "../CompanyInformation/CompanyHP_URL";
// import FacultyName from "./SchoolInformation/FacultyName";

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
