
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



export default function Rating({ onSave, onCancel, questionData }) {
    const [title, setTitle] = useState("");
    const [isRequired, setIsRequired] = useState(false);
    const [choices, setChoices] = useState([""]);
    const [expanded, setExpanded] = useState(false);



    // questionData が変更されたら、各フィールドにデータをセットする
    useEffect(() => {
        if (questionData) {
            console.log("質問の内容", questionData);
            setTitle(questionData.title || "");
            setIsRequired(questionData.isRequired || false);
            setChoices(Array.isArray(questionData.choices) ? questionData.choices : []);
        }
    }, [questionData]);


    const handleSave = () => {
        const settings = {
            title: title || "新しい質問",
            isRequired: isRequired || false,
            choices: choices.filter((choice) => choice.trim() !== ""), // 空白の選択肢を除く
        };

        onSave(settings);
        console.log("設定", settings);
    };

    //編集をキャンセルして追加したフォームを削除
    const handleCancel = () => {
        onCancel();
    }

    const handleChoiceChange = (index, value) => {
        const updatedChoices = [...choices];
        updatedChoices[index] = value;
        setChoices(updatedChoices);
    };

    const addChoiceField = () => {
        setChoices([...choices, ""]);
    };


    return (
        <div className="TextSetting">
            <Stack spacing={2} className="FormMenuScroll">
                <Typography variant="h6">ランキングメニューフォーム設定</Typography>

                <TextField
                    label="タイトル"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    fullWidth
                />

                {/* 並び替えモードとドラックモード */}

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


                <Stack direction="row" alignItems="center" spacing={1}>
                    <Checkbox
                        checked={isRequired}
                        onChange={(e) => setIsRequired(e.target.checked)}
                    />
                    <Typography>フォームを必須にする</Typography>
                </Stack>



                <Button variant="contained" color="primary" onClick={handleSave}  className="FormButton">
                    保存
                </Button>

                <Button variant="contained" color="primary" onClick={handleCancel} className="FormButton">
                    キャンセル
                </Button>
            </Stack>
        </div>
    );
}

Rating.propTypes = {
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    questionData: PropTypes.object
};
