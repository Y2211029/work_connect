import ReactDOM from "react-dom"; // ポータルを使用するためにインポート
import { useState, useEffect, useRef, useMemo } from "react";
import dayjs from "dayjs";
import isBetweenPlugin from "dayjs/plugin/isBetween";
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

dayjs.extend(isBetweenPlugin);

// 日付のフォーマットを定数化
const DATE_FORMAT = "YYYY年MM月DD日";

// カスタムスタイルの PickersDay コンポーネント
const CustomPickersDay = styled(PickersDay, {
  shouldForwardProp: (prop) => prop !== "isInRange",
})(({ theme, isInRange }) => ({
  ...(isInRange && {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.contrastText,
    borderRadius: "50%",
    "&:hover, &:focus": {
      backgroundColor: theme.palette.primary.main,
    },
  }),
}));

// カレンダーの各日のレンダリングロジック
function Day(props) {
  const { day, selectedStartDay, selectedEndDay, ...other } = props;

  const isInRange =
    selectedStartDay &&
    selectedEndDay &&
    day.isBetween(selectedStartDay, selectedEndDay, null, "[]");

  return <CustomPickersDay {...other} day={day} disableMargin isInRange={isInRange} />;
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

  // カレンダーの表示/非表示と位置の計算
  const handleOpen = () => {
    if (inputRef.current) {
      const rect = inputRef.current.getBoundingClientRect();
      console.log("rectrect", rect);
      setCalendarPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
      });
    }
    setOpen(!open);
  };

  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });

      if (inputRef.current) {
        const rect = inputRef.current.getBoundingClientRect();
        setCalendarPosition({
          top: rect.bottom + window.scrollY,
          left: rect.left + window.scrollX,
        });
      }
    };

    window.addEventListener("resize", handleResize);

    // クリーンアップ
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // 一度だけ実行されるように空の依存配列

  useEffect(() => {
    console.log("windowSize", windowSize)
  }, [windowSize]);

  // 日付をクリックしたときの処理
  const handleDayClick = (newValue) => {
    if (!startDay || (startDay && endDay)) {
      setStartDay(newValue);
      setEndDay(null);
      props.handleEventChange(newValue.format(DATE_FORMAT));
    } else {
      if (newValue && startDay && startDay.isAfter(newValue, "day")) {
        setStartDay(newValue);
        setEndDay(null);
        props.handleEventChange(newValue.format(DATE_FORMAT));
      } else {
        setEndDay(newValue);
        props.handleEventChange(
          `${startDay.format(DATE_FORMAT)}～${newValue.format(DATE_FORMAT)}`
        );
      }
    }
  };

  // カレンダー以外をクリックした際に閉じる処理
  const handleClickOutside = (event) => {
    if (
      calendarRef.current &&
      !calendarRef.current.contains(event.target) &&
      inputRef.current &&
      !inputRef.current.contains(event.target)
    ) {
      setOpen(false);
    }
  };

  // Escape キーでカレンダーを閉じる
  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const parsedDates = useMemo(() => {
    if (props.searchSource !== "") {
      if (props.searchSource.includes("～")) {
        const [splitStartDay, splitEndDay] = props.searchSource.split("～");
        return {
          startDay: dayjs(splitStartDay.trim(), DATE_FORMAT),
          endDay: dayjs(splitEndDay.trim(), DATE_FORMAT),
        };
      }
    } else {
      return null;
    }
    return { startDay: dayjs(props.searchSource, DATE_FORMAT), endDay: null };
  }, [props.searchSource]);

  useEffect(() => {
    if (parsedDates !== null) {
      console.log("parsedDates", parsedDates.startDay);
      setStartDay(parsedDates.startDay);
      setEndDay(parsedDates.endDay);
    }
  }, [parsedDates]);

  const renderCalender = (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        onChange={handleDayClick}
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
              onClick={handleOpen}
              value={
                startDay
                  ? endDay
                    ? `${startDay.format(DATE_FORMAT)}〜${endDay.format(DATE_FORMAT)}`
                    : startDay.format(DATE_FORMAT)
                  : "日付を選択してください"
              }
              variant="outlined"
              sx={{
                width: { xs: "100%", sm: "100%", md: "fit-content" },
                minWidth: endDay ? "356px" : "200px",
              }}
              inputRef={inputRef}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle calendar visibility"
                      onClick={handleOpen}
                      edge="end"
                    >
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
Day.propTypes = {
  day: PropTypes.instanceOf(dayjs),
  selectedStartDay: PropTypes.instanceOf(dayjs),
  selectedEndDay: PropTypes.instanceOf(dayjs),
};

EventCalender.propTypes = {
  searchSource: PropTypes.string,
  handleEventChange: PropTypes.func,
};
