import PropTypes from "prop-types";

import { Container, RegistarCard } from "./css/RegistarStyled";

import SchoolNameDropdown from "./SchoolInfomation/SchoolNameDropdown";
import GraduationYearDropdown from "./SchoolInfomation/GraduationYearDropdown";
import DepartmentNameDropdown from "./SchoolInfomation/DepartmentNameDropdown";
import FacultyName from "./SchoolInfomation/FacultyName";

import { useEffect, useState } from "react";

const SchoolInformation = (props) => {

  // 必須項目チェック用
  const [requiredCheck, setRequiredCheck] = useState({
    // 必須項目に入力されている場合のみfalseになる
    graduation_year: false,
    school_name: false,
  });
  
  // 必須項目の入力チェック
  const coleSetRequiredCheck = (key, value) => {
    console.log("key, value: ", key, value);
    setRequiredCheck((test) => ({
      ...test,
      [key]: value,
    }));
  };
  
  useEffect(() => {
    // 卒業年度と学校名の両方に入力されている場合に次へを押せるようにする
    if (requiredCheck.graduation_year == false && requiredCheck.school_name == false) {
      props.coleSetUserNameCheck("required", false);
    } else {
      props.coleSetUserNameCheck("required", true);
    }
  }, [requiredCheck]);

  console.log("SchoolInformationです");
  return (
    <Container>
      <RegistarCard>
        <GraduationYearDropdown coleSetRequiredCheck={coleSetRequiredCheck}/>
        <SchoolNameDropdown  coleSetRequiredCheck={coleSetRequiredCheck}/>
        <DepartmentNameDropdown />
        <FacultyName />
        {/* <p>専攻</p>
        <p>コース</p> */}
      </RegistarCard>
    </Container>
  );
};

SchoolInformation.propTypes = {
  SessionSaveTrigger: PropTypes.string, // ここでSessionSaveTriggerの型を定義
  coleSetUserNameCheck: PropTypes.func,
};

export default SchoolInformation;
