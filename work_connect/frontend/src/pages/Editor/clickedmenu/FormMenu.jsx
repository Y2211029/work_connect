import { useEffect, useState } from "react";
import Modal from "react-modal";
import PropTypes from "prop-types";
import "../CreateForm.css";

// MUIアイコン
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// 応募締め切り日を設定:MUI
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import "dayjs/locale/ja";

//フォーム情報 MUI
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const modalStyle = {
    overlay: {
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        zIndex: 1200,
        width: "100%",
        height: "100%",
    },
    content: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        border: "none",
        borderRadius: "4%",
        padding: "1.5rem",
        overflow: "hidden",
        zIndex: 1300,
        height: "60%",
        width: "70%",
    },
};

const InputDateWithTime = ({ date, deadlineChange, format = "YYYY/MM/DD HH:mm" }) => {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"ja"}>
            <DateTimePicker
                value={dayjs(date)}
                format={format}
                onChange={deadlineChange}
                slotProps={{ calendarHeader: { format: "YYYY/MM" } }}
                ampm={false}
            />        </LocalizationProvider>
    );
};

const FormMenu = ({ IsOpen, CloseModal, questions, SetDeadlineDate, deadlineDate }) => {
    dayjs.locale("ja");
    const [expanded, setExpanded] = useState(false);
    console.log("質問", questions);
    console.log("質問数", questions.length);


    const AccordionhandleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    useEffect(() => {
        Modal.setAppElement("#root");
    }, []);

    const TypeChangeArray =
        [
            //テキスト
            { menu: "text", text: "テキスト" },
            { menu: "username", text: "ユーザーネーム" },
            { menu: "email", text: "メールアドレス" },
            { menu: "password", text: "パスワード" },
            { menu: "url", text: "URL" },
            //日時
            { menu: "date", text: "日付" },
            { menu: "time", text: "時間" },
            { menu: "datetime-local", text: "年月日/時分" },
            { menu: "month", text: "月間" },
            { menu: "week", text: "週間" },
            //数値
            { menu: "number", text: "数値" },
            { menu: "range", text: "範囲" },
            { menu: "tel", text: "電話番号" },
            //ラジオボタン
            { menu: "radio", text: "単一選択:ラジオボタン" },
            { menu: "radiogroup", text: "複数選択:ラジオボタン" },
            //ドロップダウン
            { menu: "dropdown", text: "単一選択:ドロップダウンメニュー" },
            { menu: "tagbox", text: "複数選択:ドロップダウンメニュー" },
            //チェックボックス
            { menu: "checkbox", text: "チェックボックス" },
            //クローズドクエスチョン
            { menu: "boolean", text: "真偽値" },
            //ロングテキストボックス
            { menu: "comment", text: "コメント" },
            //(10段階)評価
            { menu: "rating", text: "評価" },
            //ランキング
            { menu: "ranking", text: "ランキング" },
            //画像ピッカー
            { menu: "imagepicker", text: "画像ピッカー" },
        ]

    const typechange = (type) => {
        const matched = TypeChangeArray.find((item) => item.menu === type);
        return matched ? matched.text : "不明なタイプ";
    };


    const formInformationrender = (
        <div className="form_information">
            <TableContainer component={Paper}>
                <Table sx={{ maxWidth: 700 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell className="table_number">ナンバー</TableCell>
                            <TableCell align="right" className="table_title">タイトル</TableCell>
                            <TableCell align="right" className="table_type">タイプ</TableCell>
                            {/* <TableCell align="right">バリデーションチェック</TableCell>
                                    <TableCell align="right">必須</TableCell> */}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {questions.map((question, index) => (
                            <TableRow
                                key={index + 1}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row" className="table_number">
                                    {question.id}
                                </TableCell>
                                <TableCell align="right" className="table_title">{question.title}</TableCell>
                                <TableCell align="right" className="table_type">{typechange(question.type)}</TableCell>
                                {/* <TableCell align="right">{row.carbs}</TableCell>
                                        <TableCell align="right">{row.protein}</TableCell> */}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

        </div>
    );

    const menuItems = [
        {
            key: "settingdeadline",
            text: "フォームの応募締め切り日を設定する",
            render: (
                <InputDateWithTime
                    date={deadlineDate}
                    deadlineChange={(newDate) => {
                        const formattedDate = dayjs(newDate.$d).format("YYYY-MM-DD HH:mm:ss");
                        console.log("新しい締切日", formattedDate);
                        SetDeadlineDate(formattedDate);
                    }}
                />

            ),
        },
        {
            key: "formInformation",
            text: "フォーム情報",
            render: formInformationrender,
        },
        {
            key: "releaseNews",
            text: "ニュースを公開する",
            render: <p><button>投稿</button></p>,
        },
        {
            key: "saveNews",
            text: "ニュースを保存する",
            render: (
                <div className="news_button">
                    <button id="save" className="save">下書きを保存する</button>
                </div>
            ),
        },
    ];

    return (
        <Modal
            isOpen={IsOpen}
            onRequestClose={CloseModal}
            shouldCloseOnOverlayClick={true}
            contentLabel="Example Modal"
            style={modalStyle}
        >
            <div className="FormMenu-Accordion">
                <Button
                    variant="outlined"
                    onClick={() => {
                        setExpanded(false);
                        CloseModal();
                    }}
                    className="CloseModalButton"
                >
                    閉じる
                </Button>

                {menuItems.map(({ key, text, render }) => (
                    <Accordion
                        key={key}
                        expanded={expanded === key}
                        onChange={AccordionhandleChange(key)}
                        className="Accordion"
                    >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls={`${key}-content`}
                            id={`${key}-header`}
                        >
                            <Typography sx={{ width: "70%", flexShrink: 0 }}>{text}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>{render}</AccordionDetails>
                    </Accordion>
                ))}
            </div>
        </Modal>
    );
};

FormMenu.propTypes = {
    IsOpen: PropTypes.bool.isRequired,
    CloseModal: PropTypes.func.isRequired,
    questions: PropTypes.array,
    SetDeadlineDate: PropTypes.func,
    deadlineDate: PropTypes.date
};

// PropTypesの型定義
InputDateWithTime.propTypes = {
    date: PropTypes.object,
    deadlineChange: PropTypes.func.isRequired,
    format: PropTypes.string,
};

// デフォルト値の設定（必要であれば）
InputDateWithTime.defaultProps = {
    format: "YYYY/MM/DD HH:mm",
};

export default FormMenu;
