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
import EventIcon from "@mui/icons-material/Event";
import IconButton from "@mui/material/IconButton";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

dayjs.extend(isBetweenPlugin);
dayjs.locale("ja"); // Day.jsで日本語を有効化

// 日付のフォーマットを定数化
const DATE_FORMAT = "YYYY年MM月DD日";

// カスタムスタイルの PickersDay コンポーネント
const CustomPickersDay = styled(PickersDay, {
  shouldForwardProp: (prop) => prop !== "isInRange",
})(({ theme, isInRange, isSaturday, isSunday }) => ({
  ...(isInRange && {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.contrastText,
    borderRadius: "50%",
    "&:hover, &:focus": {
      backgroundColor: theme.palette.primary.main,
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

// カレンダーの各日のレンダリングロジック
function Day(props) {
  // その月の日付1~31日、始めに選択した日付、後に選択した日付、あとなんか色々持ってきてる
  const { day, selectedStartDay, selectedEndDay, ...other } = props;

  // ここからここまでの範囲に青色をつけるために必要
  const isInRange = selectedStartDay && selectedEndDay && day.isBetween(selectedStartDay, selectedEndDay, null, "[]");
  console.log("isInRange", isInRange);
  // 土日の色をそれぞれ青と赤にするために必要
  const isSaturday = day.day() === 6;
  const isSunday = day.day() === 0;

  return <CustomPickersDay {...other} day={day} disableMargin isInRange={isInRange} isSaturday={isSaturday} isSunday={isSunday} />;
}

Day.propTypes = {
  day: PropTypes.instanceOf(dayjs),
  selectedStartDay: PropTypes.instanceOf(dayjs),
  selectedEndDay: PropTypes.instanceOf(dayjs),
};

export default function EventCalender(props) {
  const [startDay, setStartDay] = useState(null);
  const [endDay, setEndDay] = useState(null);
  const [open, setOpen] = useState(false);
  const [calendarPosition, setCalendarPosition] = useState({ top: 0, left: 0 });
  const calendarRef = useRef(null);
  const inputRef = useRef(null);
  const CancelIconRef = useRef(null);
  const EventCalendarIconlRef = useRef(null);

  const handleClear = () => {
    setStartDay(null);
    setEndDay(null);
    props.handleEventChange("");
    console.log("handleClear");
  };

  // カレンダーの表示/非表示と位置の計算
  const handleOpen = (event) => {
    // キャンセルボタンが押された場合は処理をスキップ
    if (CancelIconRef.current && CancelIconRef.current.contains(event.target)) {
      return;
    }

    // 画面リロードされて初めてカレンダーが表示されたとき
    // カレンダーを日付入力欄の下に配置するために必要
    if (inputRef.current) {
      // 今見えてる画面の範囲を基準として日付入力欄の位置や幅高さを取得
      const rect = inputRef.current.getBoundingClientRect();
      // 画面位置を保持
      setCalendarPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
      });
    }
    setOpen(!open);
  };

  const handleDayClick = (newValue) => {
    if (!startDay || (startDay && endDay)) {
      // 新しい日付が選択された場合、startDayを設定
      setStartDay(newValue);
      setEndDay(null);

      // 日付を検索後も保持るすために親要素に日付を渡す。
      props.handleEventChange(newValue.format(DATE_FORMAT));
    } else {
      // 既にstartDayが選択されていて、endDayがまだ選ばれていない場合
      if (newValue && startDay && startDay.isAfter(newValue, "day")) {
        // startDayがendDayよりも後の日付の場合
        setStartDay(newValue);
        setEndDay(null);
        // 日付を検索後も保持るすために親要素に日付を渡す。
        props.handleEventChange(newValue.format(DATE_FORMAT));
      } else {
        // endDayを設定する場合
        setEndDay(newValue);
        // startDayとendDayが同じ場合はendDayをnullにしてstartDayのみを表示
        if (newValue.isSame(startDay, "day")) {
          setEndDay(null); // endDayをリセット
          // 日付を検索後も保持るすために親要素に日付を渡す。
          props.handleEventChange(startDay.format(DATE_FORMAT)); // startDayのみ表示
        } else {
          // 日付を検索後も保持るすために親要素に日付を渡す。
          props.handleEventChange(`${startDay.format(DATE_FORMAT)}～${newValue.format(DATE_FORMAT)}`);
        }
        setOpen(false);
      }
    }
  };

  // 日付を表示するための要素以外をクリックしたらModalみたいに閉じる。
  const handleClickOutside = (event) => {
    if (
      calendarRef.current &&
      !calendarRef.current.contains(event.target) &&
      inputRef.current &&
      !inputRef.current.contains(event.target) &&
      CancelIconRef.current &&
      !CancelIconRef.current.contains(event.target) &&
      EventCalendarIconlRef.current &&
      !EventCalendarIconlRef.current.contains(event.target)
    ) {
      setOpen(false);
    }
  };

  useEffect(() => {
    const handleEvents = (event) => {
      if (event.type === "mousedown") handleClickOutside(event);
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", handleEvents);
    document.addEventListener("keydown", handleEvents);

    return () => {
      document.removeEventListener("mousedown", handleEvents);
      document.removeEventListener("keydown", handleEvents);
    };
  }, []);

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
    // リセットボタンが押された時に
    // searchSourceが空の配列かどうかを判定
    if (props.searchSource === "") {
      setStartDay(null);
      setEndDay(null);
    } else {
      if (props.searchSource.includes("～")) {
        // 波線を基準に左右に分割
        const [start, end] = props.searchSource.split("～").map((str) => str.trim()); // trim()で余分な空白を削除
        setStartDay(dayjs(start, DATE_FORMAT));
        setEndDay(dayjs(end, DATE_FORMAT));
      } else {
        setStartDay(dayjs(props.searchSource, DATE_FORMAT));
      }
    }
  }, [props.searchSource]);

  const renderCalender = (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ja">
      <DateCalendar
        onChange={handleDayClick}
        minDate={dayjs()} // 今日より前の日付を選択不可に設定
        maxDate={dayjs().add(1, "year")} // 現在の日付から1年後まで選択可能
        slots={{ day: Day }}
        slotProps={{
          day: () => ({
            selectedStartDay: startDay,
            selectedEndDay: endDay,
          }),
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
          <div style={{ fontWeight: "Bold", color: "#666" }}>開催日</div>
          <div style={{ color: "#444" }}>
            <TextField
              margin="normal"
              name="deadline"
              onClick={(e) => handleOpen(e)}
              placeholder="****年**月**日"
              value={startDay ? (endDay ? `${startDay.format(DATE_FORMAT)}〜${endDay.format(DATE_FORMAT)}` : startDay.format(DATE_FORMAT)) : ""}
              variant="outlined"
              sx={{
                width: { xs: "100%", sm: "100%", md: "fit-content" },
                minWidth: endDay ? "356px" : "200px",
              }}
              inputRef={inputRef}
              InputProps={{
                inputProps: {
                  autoComplete: "off",
                },
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      ref={CancelIconRef}
                      sx={{ visibility: startDay ? "visible" : "hidden" }}
                      aria-label="clear input"
                      onClick={handleClear}
                      edge="end"
                    >
                      <HighlightOffIcon />
                    </IconButton>
                    <IconButton ref={EventCalendarIconlRef} aria-label="toggle calendar visibility" onClick={handleOpen} edge="end">
                      <EventIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </div>
        </Box>
      </Grid>
      {calendarPortal}
    </>
  );
}

EventCalender.propTypes = {
  searchSource: PropTypes.string,
  // searchbar.jsx（親コンポーネント）からステートを持った関数のためプロップ型を関数にする。
  handleEventChange: PropTypes.func,
};
