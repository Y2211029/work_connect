import { useState } from "react";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import Checkbox from "@mui/material/Checkbox";

export default function CheckBox({ onSave }) {
    const [title, setTitle] = useState("");
    const [isRequired, setIsRequired] = useState(false);
    const [showNoneItem, setShowNoneItem] = useState(false);
    const [showOtherItem, setShowOtherItem] = useState(false);
    const [showSelectAllItem, setshowSelectAllItem] = useState(false);
    const [separateSpecialChoices, setseparateSpecialChoices] = useState(false);
    const [colCount, setColCount] = useState(1);

    
    const [choices, setChoices] = useState([""]);

    

    const handleChoiceChange = (index, value) => {
        const updatedChoices = [...choices];
        updatedChoices[index] = value;
        setChoices(updatedChoices);
    };

    const addChoiceField = () => {
        setChoices([...choices, ""]);
    };

    const handleSave = () => {
        const settings = {
            title: title || "新しい質問",
            fitToContainer: false,
            isRequired: isRequired || false,
            showNoneItem: showNoneItem || false,
            showOtherItem: showOtherItem || false,
            showSelectAllItem: showSelectAllItem || false,
            separateSpecialChoices: separateSpecialChoices || false,
            colCount: colCount || 1,
            choices: choices.filter((choice) => choice.trim() !== ""), // 空白の選択肢を除く
        };

        if (showNoneItem) {
            settings.noneText = "該当なし";
        }

        if (showOtherItem) {
            settings.otherText = "その他";
        }

        if (showSelectAllItem) {
            settings.selectallText = "すべて選択";
        }

        onSave(settings);
        console.log("設定", settings);
    };


    return (
        <div className="TextSetting">
            <Stack spacing={2}>
                <Typography variant="h6">チェックボックスメニューフォーム設定</Typography>

                <TextField
                    label="タイトル"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    fullWidth
                />

                <Stack direction="row" alignItems="center" spacing={1}>
                    <Checkbox
                        checked={showNoneItem}
                        onChange={(e) => setShowNoneItem(e.target.checked)}
                    />
                    <Typography>「該当なし」の選択肢を追加する</Typography>
                </Stack>

                <Stack direction="row" alignItems="center" spacing={1}>
                    <Checkbox
                        checked={showOtherItem}
                        onChange={(e) => setShowOtherItem(e.target.checked)}
                    />
                    <Typography>「その他」の選択肢を追加する</Typography>
                </Stack>

                
                <Stack direction="row" alignItems="center" spacing={1}>
                    <Checkbox
                        checked={showOtherItem}
                        onChange={(e) => setshowSelectAllItem(e.target.checked)}
                    />
                    <Typography>「すべて選択」の選択肢を追加する</Typography>
                </Stack>

                <Stack direction="row" alignItems="center" spacing={1}>
                    <Checkbox
                        checked={showOtherItem}
                        onChange={(e) => setseparateSpecialChoices(e.target.checked)}
                    />
                    <Typography>特別な質問を区切る</Typography>
                </Stack>

             

                <Stack direction="row" alignItems="center" spacing={1}>
                    <Checkbox
                        checked={isRequired}
                        onChange={(e) => setIsRequired(e.target.checked)}
                    />
                    <Typography>フォームを必須にする</Typography>
                </Stack>

                <TextField
                    label="列数"
                    type="number"
                    value={colCount}
                    onChange={(e) => {
                        const value = e.target.value;
                        // 空の文字列の場合は状態を空にする
                        setColCount(value === "" ? "" : Number(value));
                    }}
                    fullWidth
                />


                <Typography>チェックボックスの選択肢</Typography>
                {choices.map((choice, index) => (
                    <TextField
                        key={index}
                        label={`選択肢 ${index + 1}`}
                        value={choice}
                        onChange={(e) => handleChoiceChange(index, e.target.value)}
                        fullWidth
                    />
                ))}
                <Button variant="outlined" onClick={addChoiceField}>
                    選択肢を追加
                </Button>

                <Button variant="contained" color="primary" onClick={handleSave}>
                    保存
                </Button>
            </Stack>
        </div>
    );
}

CheckBox.propTypes = {
    onSave: PropTypes.func.isRequired,
};
