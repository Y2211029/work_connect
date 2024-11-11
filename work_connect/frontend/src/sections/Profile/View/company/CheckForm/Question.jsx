import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
// import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const Question = ({ application_form, selectedIndex }) => {
    const [groupedResponses, setGroupedResponses] = useState({});
    const [selectedTitle, setSelectedTitle] = useState("");
    const [responses, setResponses] = useState({ responses: [], username: "", id: "" });
    const [maxId, setMaxId] = useState(0);
    const [idNumber, setIdNumber] = useState("");

    useEffect(() => {
        if (application_form[selectedIndex]?.user_name) {
            const grouped = application_form[selectedIndex].user_name.reduce((acc, user) => {
                user.write_form.forEach((response) => {
                    if (!acc[response.title]) {
                        acc[response.title] = {
                            responses: [],
                            type: response.type,
                            contents: response.contents,
                            username: user.user_name,
                            id: response.id,
                        };
                    }
                    acc[response.title].responses.push(response.response);
                });
                return acc;
            }, {});
            setGroupedResponses(grouped);
            const MaxId = Math.max(...Object.values(grouped).map(response => Number(response.id)));
            setMaxId(MaxId);

            const firstTitle = Object.keys(grouped)[0];
            if (firstTitle) {
                setSelectedTitle(firstTitle);
                const initialId = Number(grouped[firstTitle].id) || 1;
                setResponses({
                    responses: grouped[firstTitle].responses,
                    username: grouped[firstTitle].username,
                    id: grouped[firstTitle].id,
                });
                setIdNumber(initialId);
            }
        }
    }, [application_form, selectedIndex]);

    const handleTitleChange = (event) => {
        const title = event.target.value;
        setSelectedTitle(title);
        const newId = groupedResponses[title]?.id ? Number(groupedResponses[title].id) : "";
        setResponses({
            responses: groupedResponses[title]?.responses || [],
            username: groupedResponses[title]?.username || "",
            id: groupedResponses[title]?.id || "",
        });
        setIdNumber(newId);  // ドロップダウンで選択した時も TextField の idNumber を更新
    };

    const handleIdChange = (event) => {
        const newId = event.target.value;

        // 入力が空の場合、idNumberをリセット
        if (newId === "") {
            setIdNumber("");  // 空文字にリセット
            return;
        }

        // 数値に変換
        const numericId = Number(newId);

        // 数値がNaNでない場合のみ更新
        if (!isNaN(numericId)) {
            setIdNumber(numericId);

            // idNumber が変更されたら、それに対応する title を検索して更新
            const matchedTitle = Object.keys(groupedResponses).find(
                (title) => Number(groupedResponses[title].id) === numericId
            );

            if (matchedTitle) {
                setSelectedTitle(matchedTitle);
                setResponses({
                    responses: groupedResponses[matchedTitle].responses || [],
                    username: groupedResponses[matchedTitle].username || "",
                    id: groupedResponses[matchedTitle].id || "",
                });
            }
        }
    };


    const handleCountUp = () => {
        setIdNumber((prev) => {
            const newId = prev + 1;
            // newIdがmaxId以下の場合のみ更新
            if (newId <= maxId) {
                handleIdChange({ target: { value: newId } }); // handleIdChangeを呼び出す
                return newId;
            }
            return prev; // maxIdを超えた場合は更新しない
        });
    };

    const handleCountDown = () => {
        setIdNumber((prev) => {
            const newId = Math.max(prev - 1, 1);
            handleIdChange({ target: { value: newId } }); // handleIdChangeを呼び出す
            return newId;
        });
    };

    console.log("質問の内容",groupedResponses);
    console.log("質問の件数", maxId);

    return (
        <div className="question">
            <Select value={selectedTitle} onChange={handleTitleChange} displayEmpty className="title-dropdown">
                {Object.keys(groupedResponses).map((title, index) => (
                    <MenuItem key={index} value={title}>
                        {title}
                    </MenuItem>
                ))}
            </Select>

            <Stack direction="row" spacing={1} alignItems="center">

                <ArrowBackIosNewIcon onClick={handleCountDown}/>

                <TextField
                    id="standard-number"
                    type="number"
                    value={idNumber}
                    onChange={handleIdChange}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    inputProps={{
                        min: 1,
                        max: maxId,
                    }}
                    sx={{
                        width: '40px',
                    }}
                /> / {maxId}個の質問

                <ArrowForwardIosIcon onClick={handleCountUp}/>


                {/* <Button variant="outlined" onClick={handleCountUp}>
                    アップ
                </Button>
                <Button variant="outlined" onClick={handleCountDown}>
                    ダウン
                </Button> */}
            </Stack>

            {selectedTitle && (
                <div>
                    <h3>{selectedTitle}</h3>
                    <p>ユーザー名: {responses.username}</p>
                    <p>回答:</p>
                    <ul>
                        {responses.responses.map((response, idx) => (
                            <li key={idx}><p>{response}</p></li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

Question.propTypes = {
    application_form: PropTypes.arrayOf(
        PropTypes.shape({
            article_title: PropTypes.string.isRequired,
            user_name: PropTypes.arrayOf(
                PropTypes.shape({
                    news_created_at: PropTypes.string.isRequired,
                    user_name: PropTypes.string.isRequired,
                    write_form: PropTypes.arrayOf(
                        PropTypes.shape({
                            id: PropTypes.string.isRequired,
                            title: PropTypes.string.isRequired,
                            type: PropTypes.string.isRequired,
                            response: PropTypes.string.isRequired,
                            contents: PropTypes.string.isRequired,
                        })
                    ).isRequired,
                    write_form_id: PropTypes.number.isRequired,
                })
            ).isRequired,
        })
    ).isRequired,
    selectedIndex: PropTypes.number.isRequired,
};

export default Question;
