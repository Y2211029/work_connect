import React from "react";
import PropTypes from "prop-types";

import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

// import AccountRegistar from "src/sections/sign/AccountRegistration";
// import SchoolInformation from "src/sections/sign/SchoolInformation";

const steps = ["アカウント", "学校情報", "詳細情報", "確認"];
let stepConnectorLinesArray = [];

export default function HorizontalLinearStepper({ Stepbar }) {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    console.log("nananananananan");
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
    // ステップバーの色を変える処理

    console.log("aaa", activeStep);
    console.log("iii", stepConnectorLinesArray[activeStep]);
    stepConnectorLinesArray[activeStep].style.borderTop = "5px solid #1976d2";
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    stepConnectorLinesArray[activeStep - 1].style.borderTop =
      "5px solid #868686";
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  // const stepBar = () => {

  // }
  // document.getElementById("")
  // console.log(activeStep);

  window.addEventListener("load", () => {
    const stepConnectorLines = document.querySelectorAll(
      ".MuiStepConnector-line"
    );
    stepConnectorLinesArray = Array.from(stepConnectorLines);

    // console.log(activeStep);
    // console.log(stepConnectorLinesArray); // stepConnectorLinesArrayに配列が格納されます
  });

  return (
    <Box
      sx={{
        width: "calc(100% - 20px)",
        padding: "50px 10px",
        display: Stepbar,
      }}
    >
      {/* alternativeLabel ステップナンバーとステップ名の縦並び */}
      <Stepper
        activeStep={activeStep}
        alternativeLabel
        sx={{
          "& .MuiStepConnector-line": {
            borderTop: "5px solid #868686",
            borderRadius: "20px",
          },
        }}
      >
        {steps.map((label, index) => {
          // console.log("stepsインデックス", activeStep);
          const stepProps = {};
          const labelProps = {};
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {/* 入力フォーム表示位置 */}
      {/* {activeStep === 0 ? <AccountRegistar /> : ""}
      {activeStep === 1 ? <SchoolInformation /> : ""} */}

      {/* 
      {activeStep === 2 ? <MoreInformation /> : ""};
      {activeStep === 3 ? <Confirmation /> : ""};  */}

      {activeStep === steps.length ? (
        <React.Fragment>
          {/* すべてのステップが完了したメッセージ */}
          <Typography sx={{ mt: 2, mb: 1 }}>登録が完了しました。</Typography>

          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          {/* <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography> */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "row",
              pt: 2,
            }}
          >
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              戻る
            </Button>
            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? "保存" : "次へ"}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}

HorizontalLinearStepper.propTypes = {
  Stepbar: PropTypes.string.isRequired, // StepbarがReact要素（コンポーネント）であると仮定
};
