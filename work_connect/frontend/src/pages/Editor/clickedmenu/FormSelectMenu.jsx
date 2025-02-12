import { useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import "../CreateForm.css";

// 応募締め切り日を設定:MUI
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import moment from "moment";
import "moment/locale/ja";
import Typography from "@mui/material/Typography";

//フォーム情報
import CheckBoxIcon from "@mui/icons-material/CheckBox";

//フォーム追加
import Stack from "@mui/material/Stack";

import TranslateIcon from "@mui/icons-material/Translate";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import MoneyIcon from "@mui/icons-material/Money";
import RadioIcon from "@mui/icons-material/Radio";
import ArrowDropDownCircleIcon from "@mui/icons-material/ArrowDropDownCircle";
import FlakyIcon from "@mui/icons-material/Flaky";
import NotesIcon from "@mui/icons-material/Notes";
import AssessmentIcon from "@mui/icons-material/Assessment";
import StarIcon from "@mui/icons-material/Star";
import BurstModeIcon from "@mui/icons-material/BurstMode";

import IconButton from "@mui/material/IconButton";
import ModeEditIcon from '@mui/icons-material/ModeEdit';

//エディタに戻る
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Tooltip from "@mui/material/Tooltip";

const InputDateWithTime = ({ date, SetDeadlineDate, format = "YYYY/MM/DD HH:mm" }) => {
  moment.locale("ja"); // 日本語設定
  return (
    <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale="ja">
      <DateTimePicker
        slotProps={{ calendarHeader: { format: 'YYYY年MM月' } }}
        value={moment(date).tz("Asia/Tokyo")}
        onChange={(newDate) => {
          if (newDate) {
            const formattedDate = moment(newDate).format("YYYY-MM-DD HH:mm:ss");
            console.log("formattedDate",formattedDate);
            SetDeadlineDate(formattedDate);
          }
        }}
        format={format}
        ampm={false}
        clearable
        className="InputDateWithTime"
      />
    </LocalizationProvider>
  );
};

const NewsSelectMenu = ({
  SetDeadlineDate,
  deadlineDate,
  CreateFormSave,
  addQuestion,
  WriteNewsHandleBack,
  handleOpenThemeModal,
}) => {
  const [anchorElInput, setAnchorElInput] = useState(null); // 入力メニューのアンカー要素
  // const [anchorElFormInformatiion, setAnchorElFormInformatiion] = useState(null); // 確認メニューのアンカー要素
  const [anchorElAddForm, setAnchorElAddForm] = useState(null); // フォーム追加メニューのアンカー要素

  const openInputMenu = Boolean(anchorElInput);
  // const openFormInformatiionMenu = Boolean(anchorElFormInformatiion);
  const openAddFormMenu = Boolean(anchorElAddForm);

  // 入力メニューのクリックイベント
  const handleClickInputMenu = (event) => {
    setAnchorElInput(event.currentTarget);
  };

  const handleCloseInputMenu = async () => {
    setAnchorElInput(null);
  };

  //フォーム追加ボタン
  const handleClickAddFormMenu = (event) => {
    setAnchorElAddForm(event.currentTarget);
  };

  const handleCloseAddFormMenu = () => {
    setAnchorElAddForm(null);
  };

  const FormSelectArray = [
    { lavel: "テキスト", icon: <TranslateIcon />, click: () => addQuestion("text") },
    { lavel: "日時", icon: <WatchLaterIcon />, click: () => addQuestion("date") },
    { lavel: "ラジオボタン", icon: <RadioIcon />, click: () => addQuestion("radio") },
    { lavel: "ドロップダウン", icon: <ArrowDropDownCircleIcon />, click: () => addQuestion("dropdown") },
    { lavel: "評価", icon: <AssessmentIcon />, click: () => addQuestion("rating") },
    { lavel: "画像ピッカー", icon: <BurstModeIcon />, click: () => addQuestion("imagepicker") },
    { lavel: "テキストボックス", icon: <NotesIcon />, click: () => addQuestion("comment") },
    { lavel: "数値", icon: <MoneyIcon />, click: () => addQuestion("number") },
    { lavel: "クローズドクエスチョン", icon: <FlakyIcon />, click: () => addQuestion("boolean") },
    { lavel: "チェックボックス", icon: <CheckBoxIcon />, click: () => addQuestion("checkbox") },
    { lavel: "ランキング", icon: <StarIcon />, click: () => addQuestion("ranking") },
  ];

  return (
    <div className="Buttons">
      <div className="Back_Button">
        <Tooltip title="ニュース記事の編集に戻る">
          <ArrowBackIcon onClick={WriteNewsHandleBack} />
        </Tooltip>
      </div>

      <br />

      <div className="FormSelectButton formselect">
        <div className="ButtonContainer">
          <Button
            id="addform-button"
            aria-controls={openAddFormMenu ? "menu-addform" : undefined}
            aria-haspopup="true"
            aria-expanded={openAddFormMenu ? "true" : undefined}
            onClick={handleClickAddFormMenu}
          >
            <Typography className="FormSelectMenu_Text">フォームを追加する</Typography>
          </Button>
          <Menu
            id="menu-addform"
            anchorEl={anchorElAddForm}
            open={openAddFormMenu}
            onClose={handleCloseAddFormMenu}
            MenuListProps={{
              "aria-labelledby": "addform-button",
            }}
            className="Menu_Addform"
            anchorOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            PaperProps={{
              sx: {
                padding: "15px", // 必要に応じてパディングも追加
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)", // 影の調整例
              },
            }}
          >
            <div className="QuestionMenu">
              <Stack
                direction="row"
                flexWrap="wrap"
                className="QuestionMenu_Hamburger"
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  paddingBottom: "20px",
                }}
              >
                {FormSelectArray.map((form, index) => (
                  <Button
                    key={index}
                    startIcon={form.icon}
                    onClick={async () => {
                      await handleCloseAddFormMenu();
                      form.click();
                    }}
                    variant="outlined"
                    sx={{
                      marginLeft: "10px", // 左マージンを追加して間隔を調整
                      width: "170px", // ボタンの幅
                      justifyContent: "flex-start",
                    }}
                  >
                    <Typography
                      sx={{
                        flex: 1,
                        textAlign: "center",
                        fontSize: "10px",
                      }}
                    >
                      {form.lavel}
                    </Typography>
                  </Button>
                ))}
              </Stack>
            </div>
          </Menu>
        </div>
        <div className="ButtonContainer">
          {/* ボタン群 */}
          <Tooltip title="応募フォームの締切日を設定してください">
            <Button
              id="input-button"
              aria-controls={openInputMenu ? "menu-input" : undefined}
              aria-haspopup="true"
              aria-expanded={openInputMenu ? "true" : undefined}
              onClick={handleClickInputMenu}
            >
              <Typography className="FormSelectMenu_Text">応募締切日</Typography>
            </Button>
          </Tooltip>
          <Menu
            id="menu-input"
            anchorEl={anchorElInput}
            open={openInputMenu}
            onClose={handleCloseInputMenu}
            MenuListProps={{
              "aria-labelledby": "input-button",
            }}
            className="menu_deadline"
          >
            <Box sx={{ p: 2, minWidth: 300 }}>
              <InputDateWithTime date={deadlineDate} SetDeadlineDate={SetDeadlineDate} />
            </Box>
          </Menu>
        </div>
        <div className="ButtonContainer">
          <Button onClick={CreateFormSave}>
            <Typography className="FormSelectMenu_Text">下書き保存</Typography>
          </Button>
        </div>
        <div>
          <Tooltip title="編集する">
            <IconButton onClick={handleOpenThemeModal}>
              <ModeEditIcon />
            </IconButton>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

NewsSelectMenu.propTypes = {
  SetDeadlineDate: PropTypes.func.isRequired,
  deadlineDate: PropTypes.string.isRequired,
  CreateFormSave: PropTypes.func.isRequired,
  addQuestion: PropTypes.func.isRequired,
  questions: PropTypes.string,
  WriteNewsHandleBack: PropTypes.func.isRequired,
  handleOpenThemeModal: PropTypes.func.isRequired
};

// PropTypesの型定義
InputDateWithTime.propTypes = {
  date: PropTypes.object,
  SetDeadlineDate: PropTypes.func.isRequired,
  format: PropTypes.string,
};

// デフォルト値の設定（必要であれば）
InputDateWithTime.defaultProps = {
  format: "YYYY/MM/DD HH:mm",
};

export default NewsSelectMenu;
