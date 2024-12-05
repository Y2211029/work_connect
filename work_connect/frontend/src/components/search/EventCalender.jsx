import { useState, useEffect, useRef } from "react";
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

function Day(props) {
  const { day, selectedStartDay, selectedEndDay, ...other } = props;

  const isInRange = selectedStartDay && selectedEndDay && day.isBetween(selectedStartDay, selectedEndDay, null, "[]");

  return <CustomPickersDay {...other} day={day} disableMargin isInRange={isInRange} />;
}

export default function EventCalender(props) {
  const [startDay, setStartDay] = useState(null);
  const [endDay, setEndDay] = useState(null);
  const [open, setOpen] = useState(false);
  const calendarRef = useRef(null);
  const inputRef = useRef(null);

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleDayClick = (newValue) => {
    if (!startDay || (startDay && endDay) || (startDay && endDay && startDay >= endDay)) {
      setStartDay(newValue);
      setEndDay(null);
    } else {
      setEndDay(newValue);
    }

    props.handleEventChange(newValue.format("YYYY年MM月DD日"));
  };

  const handleClickOutside = (event) => {
    if (calendarRef.current && !calendarRef.current.contains(event.target) && inputRef.current && !inputRef.current.contains(event.target)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // 型チェックと配列長のチェック
  useEffect(() => {
    console.log("props", props);

    // searchSourceが空の配列かどうかを判定
    if (Array.isArray(props.searchSource) && props.searchSource.length === 0) {
      setStartDay(null);
      setEndDay(null);
    }
  }, [props.searchSource]);

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
        sx={{ position: "absolute", backgroundColor: "white", boxShadow: "0px 4px 18px -10px #777777", borderRadius: "10px", zIndex: "1300" }}
      />
    </LocalizationProvider>
  );

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
                    ? `${startDay.format("YYYY年MM月DD日")}〜${endDay.format("YYYY年MM月DD日")}`
                    : startDay.format("YYYY年MM月DD日")
                  : "日付を選択してください"
              }
              variant="outlined"
              sx={{
                width: { xs: "100%", sm: "90%", md: "80%" },
                "& .css-10cqtbj-MuiInputBase-input-MuiOutlinedInput-input": {
                  fontSize: { xs: "12px", sm: "14px", md: "16px" },
                },
                minWidth: endDay ? "356px" : "200px",
              }}
              inputRef={inputRef}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton aria-label="toggle calendar visibility" onClick={handleOpen} edge="end">
                      <EventIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            {open && renderCalender}
          </div>
        </Box>
      </Grid>
    </>
  );
}

// PropTypesの型定義
Day.propTypes = {
  day: PropTypes.instanceOf(dayjs),
  selectedStartDay: PropTypes.instanceOf(dayjs),
  selectedEndDay: PropTypes.instanceOf(dayjs),
};

EventCalender.propTypes = {
  searchSource: PropTypes.array,
  handleEventChange: PropTypes.func,
};
