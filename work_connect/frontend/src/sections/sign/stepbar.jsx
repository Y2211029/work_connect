import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import SchoolInformation from "./SchoolInformation";
import AccountRegistar from "./AccountRegistration";
import MoreInformation from "./MoreInformation";
import Confirmation from "./Confirmation";

// sessionStrage
import { useSessionStorage } from "../../hooks/use-sessionStorage";

const steps = ["アカウント", "学校情報", "詳細情報", "確認"];
let stepConnectorLinesArray = [];

export default function HorizontalLinearStepper({ Stepbar }) {
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  // const [SessionTrigger, setSessionTrigger] = React.useState("");
  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  // 登録項目確認の際に利用
  const { getSessionData, updateSessionData } = useSessionStorage();

  useEffect(() => {
    let sessionStep = getSessionData("ActiveStep");
    if (sessionStep !== undefined) {
      setActiveStep(sessionStep.step);
    }
  }, []);

  useEffect(() => {
    updateSessionData("ActiveStep", "step", activeStep);
  }, [activeStep]);

  // setActiveStep(getSessionData("ActiveStep"));

  // 次へボタン押されたとき
  const handleNext = () => {
    let newSkipped = skipped;

    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);

    // ステップバーの色を変える処理
    stepConnectorLinesArray[activeStep].style.borderTop = "5px solid #1976d2";
  };

  // 戻るボタン押されたとき
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    stepConnectorLinesArray[activeStep - 1].style.borderTop = "5px solid #898989";
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  useEffect(() => {
    const stepConnectorLines = document.querySelectorAll(".MuiStepConnector-line");
    stepConnectorLinesArray = Array.from(stepConnectorLines);

    // console.log("gaijneranjngaenrnj", stepConnectorLinesArray); // stepConnectorLinesArrayに配列が格納されます
  }, []);

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
            borderTop: "5px solid #898989",
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

      {/*ーーーーーーーーーーーーーーーーーーーーーー 入力フォーム表示位置 ーーーーーーーーーーーーーーーーーーーーーー*/}

      {/* handleValueChange 入力した値を */}
      {activeStep === 0 ? <AccountRegistar /> : ""}
      {activeStep === 1 ? <SchoolInformation /> : ""}
      {activeStep === 2 ? <MoreInformation /> : ""}
      {activeStep === 3 ? <Confirmation /> : ""}

      {/*ーーーーーーーーーーーーーーーーーーーーーー 入力フォーム表示位置 ーーーーーーーーーーーーーーーーーーーーーー*/}

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
            <Button color="inherit" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
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
