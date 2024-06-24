import { Container, RegistarCard } from "./css/RegistarStyled";

import Environment from "./DetailInfomation/EnvironmentDropdown";
import Hobby from "./DetailInfomation/Hobby";
import PrefectureSelect from "./DetailInfomation/PrefectureDropdown";
import ProgrammingLanguage from "./DetailInfomation/ProgrammingLanguage";
import Qualification from "./DetailInfomation/Qualification";
import Software from "./DetailInfomation/SoftwareDropdown";

const MoreInformation = () => {
  return (
    <Container>
      <RegistarCard>
        <Environment />
        <Hobby />
        <PrefectureSelect />
        {/* desired_occupation */}
        <ProgrammingLanguage />
        <Qualification />
        <Software />
      </RegistarCard>
    </Container>
  );
};

export default MoreInformation;
