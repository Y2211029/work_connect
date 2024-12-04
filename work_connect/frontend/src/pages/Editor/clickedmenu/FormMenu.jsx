import PropTypes from "prop-types";
import "../CreateForm.css";

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
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Stack from "@mui/material/Stack";
import Button from '@mui/material/Button';



import TranslateIcon from '@mui/icons-material/Translate';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import MoneyIcon from '@mui/icons-material/Money';
import RadioIcon from '@mui/icons-material/Radio';
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';
// import BrushIcon from '@mui/icons-material/Brush';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import FlakyIcon from '@mui/icons-material/Flaky';
import NotesIcon from '@mui/icons-material/Notes';
import AssessmentIcon from '@mui/icons-material/Assessment';
import StarIcon from '@mui/icons-material/Star';
import BurstModeIcon from '@mui/icons-material/BurstMode';


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

const FormMenu = ({ menuKey, questions = [], addQuestion = () => { }, CreateFormSave = () => { } }) => {
    dayjs.locale("ja");
    console.log("addQuestion関数", addQuestion);

    // 入力タイプに基づくラベルの配列
    const TypeChangeArray = [
        { menu: "text", text: "テキスト" },
        { menu: "username", text: "ユーザーネーム" },
        { menu: "email", text: "メールアドレス" },
        { menu: "password", text: "パスワード" },
        { menu: "url", text: "URL" },
        { menu: "date", text: "日付" },
        { menu: "time", text: "時間" },
        { menu: "datetime-local", text: "年月日/時分" },
        { menu: "month", text: "月間" },
        { menu: "week", text: "週間" },
        { menu: "number", text: "数値" },
        { menu: "range", text: "範囲" },
        { menu: "tel", text: "電話番号" },
        { menu: "radio", text: "単一選択:ラジオボタン" },
        { menu: "radiogroup", text: "複数選択:ラジオボタン" },
        { menu: "dropdown", text: "単一選択:ドロップダウンメニュー" },
        { menu: "tagbox", text: "複数選択:ドロップダウンメニュー" },
        { menu: "checkbox", text: "チェックボックス" },
        { menu: "boolean", text: "真偽値" },
        { menu: "comment", text: "コメント" },
        { menu: "rating", text: "評価" },
        { menu: "ranking", text: "ランキング" },
        { menu: "imagepicker", text: "画像ピッカー" },
    ];

    const typechange = (type) => {
        const matched = TypeChangeArray.find((item) => item.menu === type);
        return matched ? matched.text : "不明なタイプ";
    };

    // 締切日を設定するコンポーネント
    const settingdeadlinerender = (
        <InputDateWithTime
            date={dayjs()} // 初期値を適宜設定
            deadlineChange={(newDate) => {
                const formattedDate = dayjs(newDate.$d).format("YYYY-MM-DD HH:mm:ss");
                console.log("新しい締切日", formattedDate);
            }}
        />
    );

    // フォーム情報を表示するコンポーネント
    const formInformationrender = (
        <div className="form_information">
            <TableContainer component={Paper}>
                <Table sx={{ maxWidth: 700 }} aria-label="simple table">
                    <TableBody>
                        {questions.map((question, index) => (
                            <div key={index}>
                                <TableRow>
                                    <TableCell className="table_label">ナンバー</TableCell>
                                    <TableCell>{question.id}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="table_label">タイトル</TableCell>
                                    <TableCell>{question.title}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="table_label">タイプ</TableCell>
                                    <TableCell>{typechange(question.type)}</TableCell>
                                </TableRow>
                        </div>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );


    const FormSelectArray = [
        { lavel: 'テキスト', icon: <TranslateIcon />, click: () => addQuestion('text') },
        { lavel: '日時', icon: <WatchLaterIcon />, click: () => addQuestion('date') },
        { lavel: '数値', icon: <MoneyIcon />, click: () => addQuestion('number') },
        { lavel: 'ラジオボタン', icon: <RadioIcon />, click: () => addQuestion('radio') },
        { lavel: 'ドロップダウン', icon: <ArrowDropDownCircleIcon />, click: () => addQuestion('dropdown') },
        { lavel: 'チェックボックス', icon: <CheckBoxIcon />, click: () => addQuestion('checkbox') },
        { lavel: 'クローズドクエスチョン', icon: <FlakyIcon />, click: () => addQuestion('boolean') },
        { lavel: 'テキストボックス', icon: <NotesIcon />, click: () => addQuestion('comment') },
        { lavel: '評価', icon: <AssessmentIcon />, click: () => addQuestion('rating') },
        { lavel: 'ランキング', icon: <StarIcon />, click: () => addQuestion('ranking') },
        { lavel: '画像ピッカー', icon: <BurstModeIcon />, click: () => addQuestion('imagepicker') },
        { lavel: '保存する', icon: <BurstModeIcon />, click: () => CreateFormSave() },
    ];

    const addFormrender = (
        <div>
            {FormSelectArray.map((form, index) => (
                <Stack key={index} direction={'row'} className="QuestionMenu_Hamburger">
                    <Button
                        startIcon={form.icon}
                        onClick={form.click}
                        variant="outlined"
                        sx={{
                            width: "240px",
                            justifyContent: "flex-start",
                            left:"10%",
                        }}
                    >
                        <Typography
                            sx={{
                                flex: 1,
                                textAlign: "center",
                            }}
                        >
                            {form.lavel}
                        </Typography>
                    </Button>
                </Stack>
            ))}
        </div>
    );

    // `menuKey` に基づいてレンダリングする内容を切り替え
    const renderComponentByKey = (key) => {
        switch (key) {
            case 'settingdeadline':
                return settingdeadlinerender;
            case 'formInformation':
                return formInformationrender;
            case 'addForm':
                return addFormrender;
            default:
                return null;
        }
    };

    return (
        <div>
            {renderComponentByKey(menuKey)}
        </div>
    );
};

FormMenu.propTypes = {
    menuKey: PropTypes.string.isRequired,
    questions: PropTypes.array,
    addQuestion: PropTypes.func,
    CreateFormSave: PropTypes.func,
};

FormMenu.defaultProps = {
    questions: [],
    addQuestion: () => { },
    CreateFormSave: () => { },
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
