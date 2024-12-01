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


export default function ImagePicker({ onSave, onCancel, questionData }) {
    const [title, setTitle] = useState("");
    const [isRequired, setIsRequired] = useState(false);
    const [description, setDescription] = useState("");
    const [choices, setChoices] = useState([""]);
    const [choicesImageUrl, setChoicesImageUrl] = useState([""]);
    const [multiSelect, setMultiSelect] = useState(false);
    const [showLabel, setShowLabel] = useState(true);
    const [expanded, setExpanded] = useState(false);


    // questionData が変更されたら、各フィールドにデータをセットする
    useEffect(() => {
        if (questionData) {
            console.log("質問の内容", questionData);
            setTitle(questionData.title || "");
            setIsRequired(questionData.isRequired || false);
            setMultiSelect(questionData.multiSelect || false);
            setShowLabel(questionData.showLabel || true);
            setDescription(questionData.description || "");

            // choicesが存在する場合、テキストと画像URLを抽出してセットする
            const processedChoices = (questionData.choices || []).map(choice => choice.text || "");
            const processedChoicesImageUrl = (questionData.choices || []).map(choice => choice.imageLink || "");
            setChoices(processedChoices);
            setChoicesImageUrl(processedChoicesImageUrl);
        }
    }, [questionData]);

    const handleSave = () => {
        const settings = {
            title: title || "新しい質問",
            isRequired: isRequired,
            multiSelect: multiSelect,
            showLabel: showLabel,
            description: description || "",
            choices: choices.map((choice, index) => ({
                text: choice.trim(),
                imageLink: choicesImageUrl[index].trim(),
                value: choice.toLowerCase().replace(/\s+/g, '-'), // 値を小文字に変換し、スペースをハイフンに変換
            })).filter(choice => choice.text && choice.imageLink) // テキストと画像URLが空でない選択肢のみ
        };

        onSave(settings);
        console.log("設定", settings);
    };

    const handleCancel = () => {
        onCancel();
    };

    const handleChoiceChange = (index, value) => {
        const updatedChoices = [...choices];
        updatedChoices[index] = value;
        setChoices(updatedChoices);
    };

    const handleImageUrlChange = (index, value) => {
        const updatedChoicesImageUrl = [...choicesImageUrl];
        updatedChoicesImageUrl[index] = value;
        setChoicesImageUrl(updatedChoicesImageUrl);
    };

    const addChoiceField = () => {
        setChoices([...choices, ""]);
        setChoicesImageUrl([...choicesImageUrl, ""]);
    };

    return (
        <div className="TextSetting">
            <Stack spacing={2} className="FormMenuScroll">
                <Typography variant="h6">画像ピッカーフォーム設定</Typography>

                <TextField
                    label="タイトル"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    fullWidth
                />

                <TextField
                    label="説明"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
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
                    <div key={index}>
                        <TextField
                            label={`選択肢 ${index + 1} テキスト`}
                            value={choice}
                            onChange={(e) => handleChoiceChange(index, e.target.value)}
                            fullWidth
                        />
                        <TextField
                            label={`選択肢 ${index + 1} 画像URL`}
                            value={choicesImageUrl[index]}
                            onChange={(e) => handleImageUrlChange(index, e.target.value)}
                            fullWidth
                            type="url"
                        />
                    </div>
                ))}
                        </AccordionDetails>
                    </Accordion>
                )}


                <Button variant="outlined" onClick={addChoiceField}>
                    選択肢を追加
                </Button>

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
                                checked={isRequired}
                                onChange={(e) => setIsRequired(e.target.checked)}
                            />
                            <Typography>フォームを必須にする</Typography>
                        </Stack>

                        <Stack direction="row" alignItems="center" spacing={1}>
                            <Checkbox
                                checked={multiSelect}
                                onChange={(e) => setMultiSelect(e.target.checked)}
                            />
                            <Typography>複数選択を可能にする</Typography>
                        </Stack>

                        <Stack direction="row" alignItems="center" spacing={1}>
                            <Checkbox
                                checked={showLabel}
                                onChange={(e) => setShowLabel(e.target.checked)}
                            />
                            <Typography>テキストを見せる</Typography>
                        </Stack>

                    </AccordionDetails>
                </Accordion>


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

ImagePicker.propTypes = {
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    questionData: PropTypes.object
};
