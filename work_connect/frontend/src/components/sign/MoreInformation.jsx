import React from "react";
import { styled } from "@mui/material";
import Environment from "./DetailInfomation/EnvironmentDropdown";
import Hobby from "./DetailInfomation/Hobby";
import PrefectureSelect from "./DetailInfomation/PrefectureDropdown";
import ProgrammingLanguage from "./DetailInfomation/ProgrammingLanguage";
import Qualification from "./DetailInfomation/Qualification";
import Software from "./DetailInfomation/SoftwareDropdown";

const MoreInformation = () => {
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
        <Environment/>
        <Hobby />
        <PrefectureSelect/>
        <ProgrammingLanguage/>
        <Qualification/>
        <Software/>
      </LoginCard>
    </Container>
  );
};

export default MoreInformation;
