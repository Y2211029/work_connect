import { Container, RegistarCard } from "./css/RegistarStyled";

import Environment from "./DetailInformation/EnvironmentDropdown";
import Hobby from "./DetailInformation/Hobby";
import PrefectureSelect from "./DetailInformation/PrefectureDropdown";
import DesiredOccupation from "./DetailInformation/DesiredOccupation";
import ProgrammingLanguage from "./DetailInformation/ProgrammingLanguage";
import Qualification from "./DetailInformation/Qualification";
import Software from "./DetailInformation/SoftwareDropdown";

const MoreInformation = () => {
  return (
    <Container>
      <RegistarCard>
        
        {/* 開発環境 */}
        <Environment />
        
        {/* 趣味 */}
        <Hobby />
        
        {/* 希望勤務地 */}
        <PrefectureSelect />
        
        {/* 希望職種 */}
        <DesiredOccupation />
        
        {/* プログラミング言語 */}
        <ProgrammingLanguage />
        
        {/* 取得資格 */}
        <Qualification />
        
        {/* ソフトウェア */}
        <Software />
        
      </RegistarCard>
    </Container>
  );
};

export default MoreInformation;
