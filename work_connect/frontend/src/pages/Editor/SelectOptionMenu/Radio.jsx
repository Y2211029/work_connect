import { useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import Checkbox from "@mui/material/Checkbox";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";


export default function Radio({ onSave, onCancel, questionData }) {
    const [title, setTitle] = useState("");
    const [isRequired, setIsRequired] = useState(false);
    const [showNoneItem, setShowNoneItem] = useState(false);
    const [showOtherItem, setShowOtherItem] = useState(false);
    const [choices, setChoices] = useState([""]);
    const [colCount, setColCount] = useState(1);
    const [separateSpecialChoices, setseparateSpecialChoices] = useState(false);
    const [showClearButton, setshowClearButton] = useState(false);
    const [expanded, setExpanded] = useState(false);


    const handleChoiceChange = (index, value) => {
        const updatedChoices = [...choices];
        updatedChoices[index] = value;
        setChoices(updatedChoices);
    };

    const addChoiceField = () => {
        setChoices([...choices, ""]);
        setExpanded("ChoiceListAccordion")
    };

    // questionData が変更されたら、各フィールドにデータをセットする
    useEffect(() => {
        if (questionData) {
            setTitle(questionData.title || "");
            setIsRequired(questionData.isRequired || false);
            setShowNoneItem(questionData.showNoneItem || false);
            setShowOtherItem(questionData.showOtherItem || false);

            // choicesが存在する場合、テキストを抽出してセットする
            const processedChoices = (questionData.choices || []).map(choice => {
                // `text` または `jsonObj` からテキストを取り出す
                return choice.text || choice.jsonObj || "";
            });
            setChoices(processedChoices);

            setColCount(questionData.colCount || 1);
            setseparateSpecialChoices(questionData.separateSpecialChoices || false);
            setshowClearButton(questionData.showClearButton || false);

        }
    }, [questionData]);


    const handleSave = () => {
        const settings = {
            title: title || "新しい質問",
            isRequired: isRequired || false,
            showNoneItem: showNoneItem || false,
            showOtherItem: showOtherItem || false,
            choices: choices.filter((choice) => choice.trim() !== ""), // 空白の選択肢を除く
            colCount: colCount || 1,
            separateSpecialChoices: separateSpecialChoices || false,
            showClearButton: showClearButton || false,
        };

        if (showNoneItem) {
            settings.noneText = "該当なし";
        }

        if (showOtherItem) {
            settings.otherText = "その他";
        }

        if (showClearButton) {
            settings.clearText = "クリア";
        }

        onSave(settings);
        console.log("設定", settings);
    };

    //編集をキャンセルして追加したフォームを削除
    const handleCancel = () => {
        onCancel();
    }

    return (
        <div className="TextSetting">
            <Stack spacing={2} className="FormMenuScroll">
                <Typography variant="h6">ラジオボタンフォーム設定</Typography>

                <TextField
                    label="タイトル"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    fullWidth
                />

                <Accordion
                    expanded={expanded === "optionAccordion"}
                    onChange={() => setExpanded(expanded === "optionAccordion" ? false : "optionAccordion")}
                    className="Accordion"
                >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="optionAccordion-content"
                        id="optionAccordion-header"
                    >
                        <Typography sx={{ fontSize: "15px", width: "80%", flexShrink: 0 }}>オプション</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
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


                        {(showNoneItem || showOtherItem) && (
                            <div>
                                <Stack direction="row" alignItems="center" spacing={1}>
                                    <Checkbox
                                        checked={separateSpecialChoices}
                                        onChange={(e) => setseparateSpecialChoices(e.target.checked)}
                                    />
                                    <Typography>「該当なし」「その他」の選択肢を区切る</Typography>
                                </Stack>
                            </div>
                        )}

                        <Stack direction="row" alignItems="center" spacing={1}>
                            <Checkbox
                                checked={isRequired}
                                onChange={(e) => setIsRequired(e.target.checked)}
                            />
                            <Typography>フォームを必須にする</Typography>
                        </Stack>

                        <Stack direction="row" alignItems="center" spacing={1}>
                            <Checkbox
                                checked={showClearButton}
                                onChange={(e) => setshowClearButton(e.target.checked)}
                            />
                            <Typography>クリアボタンを設置する</Typography>
                        </Stack>

                    </AccordionDetails>
                </Accordion>



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
                {Array.isArray(choices) && choices.length > 0 && (
                    <Accordion
                        expanded={expanded === "ChoiceListAccordion"}
                        onChange={() =>
                            setExpanded(expanded === "ChoiceListAccordion" ? false : "ChoiceListAccordion")
                        }
                        className="Accordion"
                    >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="ChoiceListAccordion-content"
                            id="ChoiceListAccordion-header"
                        >
                            <Typography sx={{ fontSize: "15px", width: "80%", flexShrink: 0 }}>
                                選択肢一覧
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            {choices.map((choice, index) => (
                                <TextField
                                    key={`choice-${index}`} // key を一意にする
                                    label={`選択肢 ${index + 1}`}
                                    value={choice}
                                    onChange={(e) => handleChoiceChange(index, e.target.value)}
                                    fullWidth
                                />
                            ))}
                        </AccordionDetails>
                    </Accordion>
                )}

                <Button variant="outlined" onClick={addChoiceField}>
                    選択肢を追加
                </Button>

                <Button variant="contained" color="primary" onClick={handleSave} className="FormButton">
                    保存
                </Button>

                <Button variant="contained" color="primary" onClick={handleCancel} className="FormButton">
                    キャンセル
                </Button>
            </Stack>
        </div>
    );
}

Radio.propTypes = {
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    questionData: PropTypes.object
};
