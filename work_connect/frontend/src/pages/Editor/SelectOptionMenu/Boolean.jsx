import { useEffect,useState } from "react";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import Autocomplete from '@mui/material/Autocomplete';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";



export default function Boolean({ onSave,onCancel,questionData }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [renderAs, setRenderAs] = useState("");
    const [titleLocation,setTitleLocation] = useState("top");
    const [expanded, setExpanded] = useState(false);


        // questionData が変更されたら、各フィールドにデータをセットする
        useEffect(() => {
            if (questionData) {
                console.log("質問の内容",questionData);
                setTitle(questionData.title || "");
                setDescription(questionData.description || "");
                setRenderAs(questionData.renderAs || "");
                setTitleLocation(questionData.titleLocation || "top");

            }
        }, [questionData]);



    const handleSave = () => {
        const settings = {
            title: title || "新しい質問",
            description: description || "",
            renderAs: renderAs.name || undefined,
            titleLocation: titleLocation || "",
            valueTrue: "Yes",
            valueFalse: "No",
        };

        onSave(settings);
        console.log("設定", settings);
    };

        //編集をキャンセルして追加したフォームを削除
        const handleCancel = () => {
            onCancel();
        }

    const inputtype = [
        { label: 'デフォルト', id: 1, name: "" },
        { label: 'ラジオボタン', id: 2, name: "radio" },
        { label: 'チェックボックス', id: 3, name: "checkbox" },
    ];

    return (
        <div className="TextSetting">
            <Stack spacing={2}>
                <Typography variant="h6">クローズドクエスチョンメニューフォーム設定</Typography>

                <Autocomplete
                    disablePortal
                    options={inputtype}
                    value={renderAs}
                    onChange={(event, newValue) => setRenderAs(newValue)}
                    isOptionEqualToValue={(option, value) => option.name === value.name}
                    fullWidth
                    renderInput={(params) => <TextField {...params} label="種類" />}
                />

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

                {renderAs?.name === "checkbox" && (
                    <div>
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
                        <Typography sx={{ fontSize: "15px", width: "80%", flexShrink: 0 }}>テキストの位置</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                    <Stack direction="row" alignItems="center" spacing={1}>
                            <RadioGroup
                                value={titleLocation}
                                onChange={(e) => setTitleLocation(e.target.value)}
                            >
                                <FormControlLabel value="top" control={<Radio />} label="上側" />
                                <FormControlLabel value="bottom" control={<Radio />} label="下側" />
                                <FormControlLabel value="left" control={<Radio />} label="左側" />
                                <FormControlLabel value="hidden" control={<Radio />} label="隠す" />
                            </RadioGroup>
                        </Stack>
                    </AccordionDetails>
                </Accordion>




                    </div>
                )}


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

Boolean.propTypes = {
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    questionData: PropTypes.object
};
