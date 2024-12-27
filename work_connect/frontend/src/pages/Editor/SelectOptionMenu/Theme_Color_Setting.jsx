import { useState, useEffect } from "react";
import Stack from "@mui/material/Stack";
import Typography from '@mui/material/Typography';
import Button from "@mui/material/Button";
import PropTypes from 'prop-types';
import Select from "react-select";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import "../CreateForm.css";

// 背景色
import { MuiColorInput } from 'mui-color-input';

export default function Theme_Color_Setting({ backGroundColor, backGroundColorChange, onSave, onClose }) {
    const [alignment, setAlignment] = useState('light');
    const [light_dark_option, setLightDarkOption] = useState([]); // 動的に更新する選択肢の状態を追加
    const [selectingTheme, setSelectingTheme] = useState(null); 


    // light と dark のオプション
    const lightOptions = [
        { label: "デフォルト", value: "DefaultLight" },
        { label: "シャープ", value: "SharpLight" },
        { label: "ボーダーレス", value: "BorderlessLight" },
        { label: "フラット", value: "FlatLight" },
        { label: "無地", value: "PlainLight" },
        { label: "二重枠", value: "DoubleBorderLight" },
        { label: "レイヤード", value: "LayeredLight" },
        { label: "固体", value: "SolidLight" },
        { label: "3D", value: "ThreeDimensionalLight" },
        { label: "対比", value: "ContrastLight" },
    ];

    const darkOptions = [
        { label: "デフォルト", value: "DefaultDark" },
        { label: "シャープ", value: "SharpDark" },
        { label: "ボーダーレス", value: "BorderlessDark" },
        { label: "フラット", value: "FlatDark" },
        { label: "無地", value: "PlainDark" },
        { label: "二重枠", value: "DoubleBorderDark" },
        { label: "レイヤード", value: "LayeredDark" },
        { label: "固体", value: "SolidDark" },
        { label: "3D", value: "ThreeDimensionalDark" },
        { label: "対比", value: "ContrastDark" },
    ];

    // alignmentが変更されるたびに対応するオプションをセット
    useEffect(() => {
        if (alignment === 'light') {
            setLightDarkOption(lightOptions);
        } else {
            setLightDarkOption(darkOptions);
        }
    }, [alignment]); // alignmentが変更されたときに再実行される

    const handleCancel = () => {
        onClose();
    };

    const handleChange = (event, newAlignment) => {
        setAlignment(newAlignment); // トグルボタンの変更に応じてalignmentを更新
    };

    const handleThemeChange = (newSelectingTheme) =>{
        console.log("選択中のテーマ", newSelectingTheme);
        setSelectingTheme(newSelectingTheme);
    }

    const children = [
        <ToggleButton value="light" key="light">
            ライト
        </ToggleButton>,
        <ToggleButton value="dark" key="dark">
            ダーク
        </ToggleButton>,
    ];

    return (
        <div className="TextSetting">
            <Stack spacing={2}>
                <Typography variant="h6">テーマ・色の設定</Typography>

                <MuiColorInput className="Color_input" format="hex" value={backGroundColor} onChange={backGroundColorChange} />

                <ToggleButtonGroup size="large" value={alignment} onChange={handleChange} aria-label="Large sizes">
                    {children}
                </ToggleButtonGroup>

                <Select
                    placeholder="テーマを選択"
                    options={light_dark_option} // alignmentに基づいて動的に設定されたoptions
                    onChange={handleThemeChange} // テーマ変更時のコールバック
                    isClearable
                    className="Theme_Select"
                />

                <Button variant="contained" color="primary" onClick={() => onSave(selectingTheme)}  className="FormButton">
                    保存
                </Button>


                <Button variant="contained" onClick={handleCancel} color="primary" className="FormButton">
                    キャンセル
                </Button>
            </Stack>
        </div>
    );
}

Theme_Color_Setting.propTypes = {
    backGroundColor: PropTypes.string.isRequired,
    backGroundColorChange: PropTypes.func.isRequired,
    setTheme: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
};
