import ReactDOM from "react-dom"; // ポータルを使用するためにインポート
import { useState, useEffect, useRef } from "react";
import dayjs from "dayjs";
import isBetweenPlugin from "dayjs/plugin/isBetween";
import "dayjs/locale/ja"; // 日本語ロケールをインポート
import { styled } from "@mui/material/styles";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import PropTypes from "prop-types";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import IconButton from "@mui/material/IconButton";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

dayjs.extend(isBetweenPlugin);
dayjs.locale("ja"); // Day.jsで日本語を有効化
// 日付のフォーマットを定数化
const DATE_FORMAT = "YYYY年MM月DD日";

const CustomPickersDay = styled(PickersDay, {
  shouldForwardProp: (prop) => prop !== "isSelected" && prop !== "isHovered",
})(({ theme, isSelected, isHovered, isSaturday, isSunday }) => ({
  borderRadius: 0,
  ...(isSelected && {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    "&:hover, &:focus": {
      backgroundColor: theme.palette.primary.main,
    },
  }),
  ...(isHovered && {
    backgroundColor: theme.palette.primary.light,
    "&:hover, &:focus": {
      backgroundColor: theme.palette.primary.light,
    },
  }),
  display: "flex", // フレックスボックスを有効化
  flexDirection: "column", // 縦並びに変更
  alignItems: "center", // 中央揃え
  justifyContent: "center", // 縦方向も中央揃え
  ...(isSaturday && {
    color: theme.palette.info.main,
  }),
  ...(isSunday && {
    color: theme.palette.error.main,
  }),
}));

function Day(props) {
  const { day, selectedDay, hoveredDay, onPointerEnter, onPointerLeave, ...other } = props;
  const isSaturday = day.day() === 6;
  const isSunday = day.day() === 0;
  return (
    <CustomPickersDay
      {...other}
      day={day}
      disableMargin
      selected={day.isSame(selectedDay, "day")}
      isSelected={day.isSame(selectedDay, "day")}
      isHovered={day.isSame(hoveredDay, "day")}
      onPointerEnter={() => onPointerEnter(day)}
      onPointerLeave={onPointerLeave}
      isSaturday={isSaturday}
      isSunday={isSunday}
    />
  );
}

export default function DeadlineCalender(props) {
  const [hoveredDay, setHoveredDay] = useState(null);
  const [value, setValue] = useState(null);
  const [open, setOpen] = useState(false);
  const [calendarPosition, setCalendarPosition] = useState({ top: 0, left: 0 });
  const calendarRef = useRef(null);
  const inputRef = useRef(null);
  const CancelIconRef = useRef(null);
  const CalendarIconlRef = useRef(null);


  // カレンダーの表示/非表示と位置の計算
  const handleOpen = () => {
    console.log("inputRef.current", inputRef.current);
    if (inputRef.current) {
      const rect = inputRef.current.getBoundingClientRect();
      setCalendarPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
      });
    }
    setOpen(!open);
  };

  // 日付を入力欄から削除
  const handleClear = () => {
    setValue(null);
    props.handleDeadLineChange("");
    console.log("handleClear");
  };

  // 検索した後も日付が保存されるように親コンポーネントに値を渡す
  const handleDateChange = (newValue) => {
    setValue(newValue);
    setOpen(false); // Close the calendar when a date is selected
    props.handleDeadLineChange(newValue.format(DATE_FORMAT));
  };

  // 入力欄、✖ボタン、カレンダーアイコン、カレンダー以外をクリックされたらカレンダーを閉じる。
  const handleClickOutside = (event) => {
    console.log("CancelIconRef.current", CancelIconRef.current);
    // 日付入力に必要な要素が表示されているかつクリックされた要素がその要素でない場合にカレンダーを閉じる

    // キャンセルアイコンが表示されているまたはクリックされた箇所が違い場合


    if (
      open &&  (
        !CancelIconRef.current.contains(event.target) &&
        calendarRef.current &&
        !calendarRef.current.contains(event.target) &&
        inputRef.current &&
        !inputRef.current.contains(event.target) &&
        CalendarIconlRef.current &&
        !CalendarIconlRef.current.contains(event.target)
      )
    ) {
      setOpen(false);
      console.log("handleClickOutside");
    }
  };

  // エンターキーで日付入力の後、カレンダーを閉じる
  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      setOpen(false);
    }
  };

  // 日付入力欄の外側にカレンダーが張り付く形で見た目を調整
  useEffect(() => {
    const handleResize = () => {
      if (inputRef.current) {
        const rect = inputRef.current.getBoundingClientRect();
        setCalendarPosition({
          top: rect.bottom + window.scrollY,
          left: rect.left + window.scrollX,
        });
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // 型チェックと配列長のチェック
  useEffect(() => {
    console.log("props", props);

    // リセットボタンが押された時に
    // searchSourceが空の配列かどうかを判定
    if (props.searchSource === "") {
      setValue(null);
    } else {
      setValue(dayjs(props.searchSource, DATE_FORMAT));
    }
  }, [props.searchSource]);

  const renderCalender = (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ja">
      <DateCalendar
        value={value}
        onChange={handleDateChange}
        slots={{ day: Day }}
        slotProps={{
          day: {
            selectedDay: value,
            hoveredDay,
            onPointerEnter: (day) => setHoveredDay(day),
            onPointerLeave: () => setHoveredDay(null),
          },
          calendarHeader: {
            format: "YYYY年MM月",
          },
        }}
        ref={calendarRef}
        sx={{
          backgroundColor: "white",
          boxShadow: "0px 4px 18px -10px #777777",
          borderRadius: "10px",
          zIndex: "1300",
          "& .css-1n0erti-MuiTypography-root-MuiDayCalendar-weekDayLabel": {
            margin: "0px", // 曜日要素のマージンをリセット
          },
          "& .MuiDayCalendar-weekDayLabel": {
            // 曜日のスタイルを変更
            "&:nth-of-type(1)": {
              color: "#FF5630", // 日曜日を赤色
            },
            "&:nth-of-type(7)": {
              color: "#00B8D9", // 土曜日を青色
            },
          },
        }}
      />
    </LocalizationProvider>
  );

  // 
  const calendarPortal = open
    ? ReactDOM.createPortal(
      <div
        style={{
          position: "absolute",
          zIndex: 2000,
          top: `${calendarPosition.top}px`,
          left: `${calendarPosition.left}px`,
        }}
      >
        {renderCalender}
      </div>,
      document.body
    )
    : null;

  return (
    <>
      <Grid item sx={{ width: "100%" }}>
        <Box sx={{ marginTop: "20px", marginBottom: "10px", position: "relative" }}>
          <div style={{ fontWeight: "Bold", color: "#666" }}>応募締め切り</div>
          <div style={{ color: "#444" }}>
            <TextField
              margin="normal"
              name="deadline"
              onClick={handleOpen}
              placeholder="****年**月**日"
              value={value ? value.format(DATE_FORMAT) : ""}
              variant="outlined"
              sx={{
                width: { xs: "100%", sm: "100%", md: "fit-content" },
                "& .css-10cqtbj-MuiInputBase-input-MuiOutlinedInput-input": {
                  fontSize: { xs: "12px", sm: "14px", md: "16px" },
                },
              }}
              inputRef={inputRef} // Reference for input field
              InputProps={{
                inputProps: {
                  autoComplete: "off",
                },
                endAdornment: (
                  <InputAdornment position="end">
                    {open && value ? (
                      <IconButton ref={CancelIconRef} aria-label="clear input" onClick={handleClear} edge="end">
                        <HighlightOffIcon />
                      </IconButton>
                    ) : (
                      ""
                    )}
                    <IconButton ref={CalendarIconlRef} aria-label="toggle calendar visibility" onClick={handleOpen} edge="end">
                      <CalendarMonthIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            {calendarPortal}
          </div>
        </Box>
      </Grid>
    </>
  );
}

// PropTypesの型定義
Day.propTypes = {
  day: PropTypes.object.isRequired,
  selectedDay: PropTypes.object.isRequired,
  hoveredDay: PropTypes.object,
  onPointerEnter: PropTypes.func.isRequired,
  onPointerLeave: PropTypes.func.isRequired,
};

DeadlineCalender.propTypes = {
  searchSource: PropTypes.String,
  handleDeadLineChange: PropTypes.func,
};
