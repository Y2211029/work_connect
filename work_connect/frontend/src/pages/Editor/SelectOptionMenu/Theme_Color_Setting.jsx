import { useState, useEffect } from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import PropTypes from "prop-types";
import Select from "react-select";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { MuiColorInput } from "mui-color-input";
import "../CreateForm.css";

export default function Theme_Color_Setting({
  BackGroundColor,
  TitleColor,
  BarColor,
  QuestionColor,
  theme,
  light_dark,
  onSave,
  onClose,
}) {
  const [alignment, setAlignment] = useState(light_dark || "Light");
  const [selectingTheme, setSelectingTheme] = useState(null);

  // 色の状態
  const [colorToggle, setColorToggle] = useState("Title");
  const [backgroundColor, setbackGroundColor] = useState(BackGroundColor || "#FFFFFF");
  const [titleColor, setTitleColor] = useState(TitleColor || "#000000");
  const [barColor, setBarColor] = useState(BarColor || "#000000");
  const [questionColor, setQuestionColor] = useState(QuestionColor || "#000000");

  // テーマ選択オプション
  const Options = [
    { label: "デフォルト", value: "default", theme: "Default" },
    { label: "シャープ", value: "sharp", theme: "Sharp" },
    { label: "ボーダーレス", value: "borderless", theme: "Borderless" },
    { label: "フラット", value: "flat", theme: "Flat" },
    { label: "無地", value: "plain", theme: "Plain" },
    { label: "二重枠", value: "doubleborder", theme: "DoubleBorder" },
    { label: "レイヤード", value: "layered", theme: "Layered" },
    { label: "固体", value: "solid", theme: "Solid" },
    { label: "3D", value: "threedimensional", theme: "ThreeDimensional" },
    { label: "対比", value: "contrast", theme: "Contrast" },
  ];

  // 初期テーマ設定
  useEffect(() => {
    if (theme) {
      const selectedOption = Options.find((option) => option.value === theme);
      setSelectingTheme(selectedOption || null);
    }
  }, [theme]);

  // ライト/ダークモードの切り替え
  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  // 色タイプの切り替え
  const handleColorToggleChange = (event, newColorToggle) => {
    console.log(`${newColorToggle}に変更です`);
    if (newColorToggle) {
      setColorToggle(newColorToggle);
    } else {
      console.warn("色タイプが選択されていません");
    }
  };

  // テーマ選択の変更
  const handleThemeChange = (newSelectingTheme) => {
    setSelectingTheme(newSelectingTheme);
  };

  // 現在の色を選択
  const ColorSelect = () => {
    switch (colorToggle) {
      case "Title":
        return titleColor;
      case "BackGround":
        return backgroundColor;
      case "Question":
        return questionColor;
      case "Bar":
        return barColor;
      default:
        return "#000000"; // デフォルト色
    }
  };

  // 色の変更
  const handleColorChange = (newColor) => {
    console.log(`${colorToggle} が ${newColor} に変更`);
    switch (colorToggle) {
      case "Title":
        setTitleColor(newColor);
        break;
      case "BackGround":
        setbackGroundColor(newColor);
        break;
      case "Question":
        setQuestionColor(newColor);
        break;
      case "Bar":
        setBarColor(newColor);
        break;
      default:
        console.warn("無効な色タイプが選択されました");
    }
  };

  // ライト/ダークモードのボタン
  const light_dark_children = [
    <ToggleButton value="Light" key="Light">
      ライト
    </ToggleButton>,
    <ToggleButton value="Dark" key="Dark">
      ダーク
    </ToggleButton>,
  ];

  // 色タイプ選択のボタン
  const color_children = [
    <Stack direction={"column"} key="color-toggle-buttons">
      <ToggleButton value="Title" key="Title">
        タイトルテキストカラー
      </ToggleButton>
      <ToggleButton value="BackGround" key="BackGround">
        背景色
      </ToggleButton>
      <ToggleButton value="Question" key="Question">
        質問テキストカラー
      </ToggleButton>
      <ToggleButton value="Bar" key="Bar">
        バーカラー
      </ToggleButton>
    </Stack>,
  ];

  // キャンセル処理
  const handleCancel = () => {
    onClose();
  };

  return (
    <div className="TextSetting">
      <Stack spacing={2}>
        <Typography variant="h6">テーマ・色の設定</Typography>

        {/* 色タイプ選択 */}
        <ToggleButtonGroup
          size="thin"
          value={colorToggle}
          exclusive
          onChange={handleColorToggleChange}
          aria-label="Large sizes"
        >
          {color_children}
        </ToggleButtonGroup>

        {/* カラーピッカー */}
        <MuiColorInput
          className="Color_input"
          format="hex"
          value={ColorSelect()} // 現在の色
          onChange={handleColorChange} // 色変更
        />

        {/* ライト/ダークモード */}
        <ToggleButtonGroup
          size="thin"
          value={alignment}
          exclusive
          onChange={handleChange}
          aria-label="Large sizes"
        >
          {light_dark_children}
        </ToggleButtonGroup>

        {/* テーマ選択 */}
        <Select
          placeholder="テーマを選択"
          options={Options}
          onChange={handleThemeChange}
          value={selectingTheme}
          isClearable
          className="Theme_Select"
        />

        {/* 保存ボタン */}
        <Button
          variant="contained"
          color="primary"
          onClick={() =>
            onSave(selectingTheme, alignment, backgroundColor, titleColor, barColor, questionColor)
          }
          className="FormButton"
        >
          保存
        </Button>

        {/* キャンセルボタン */}
        <Button
          variant="contained"
          onClick={handleCancel}
          color="primary"
          className="FormButton"
        >
          キャンセル
        </Button>
      </Stack>
    </div>
  );
}

Theme_Color_Setting.propTypes = {
  BackGroundColor: PropTypes.string.isRequired,
  TitleColor: PropTypes.string.isRequired,
  QuestionColor: PropTypes.string.isRequired,
  BarColor: PropTypes.string.isRequired,
  theme: PropTypes.string,
  light_dark: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};
