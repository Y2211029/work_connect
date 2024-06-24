import { Container, RegistarCard } from "./css/RegistarStyled";

import Environment from "./DetailInfomation/EnvironmentDropdown";
import Hobby from "./DetailInfomation/Hobby";
import PrefectureSelect from "./DetailInfomation/PrefectureDropdown";
import DesiredOccupation from "./DetailInfomation/DesiredOccupation";
import ProgrammingLanguage from "./DetailInfomation/ProgrammingLanguage";
import Qualification from "./DetailInfomation/Qualification";
import Software from "./DetailInfomation/SoftwareDropdown";

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
