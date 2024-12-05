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
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import IconButton from "@mui/material/IconButton";

dayjs.extend(isBetweenPlugin);

const CustomPickersDay = styled(PickersDay, {
  shouldForwardProp: (prop) => prop !== "isSelected" && prop !== "isHovered",
})(({ theme, isSelected, isHovered }) => ({
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
}));

function Day(props) {
  const { day, selectedDay, hoveredDay, onPointerEnter, onPointerLeave, ...other } = props;

  return (
    <CustomPickersDay
      {...other}
      day={day}
      sx={{ px: 2.5 }}
      disableMargin
      selected={day.isSame(selectedDay, "day")}
      isSelected={day.isSame(selectedDay, "day")}
      isHovered={day.isSame(hoveredDay, "day")}
      onPointerEnter={() => onPointerEnter(day)}
      onPointerLeave={onPointerLeave}
    />
  );
}

export default function DeadlineCalender(props) {
  const [hoveredDay, setHoveredDay] = useState(null);
  const [value, setValue] = useState(null);
  const [open, setOpen] = useState(false);

  const calendarRef = useRef(null);
  const inputRef = useRef(null);


  const handleOpen = () => {
    setOpen(!open);
  };

  const handleDateChange = (newValue) => {
    setValue(newValue);
    setOpen(false); // Close the calendar when a date is selected

    props.handleDeadLineChange(newValue.format("YYYY年MM月DD日"));
  };

  // Handle click outside the calendar and input field
  const handleClickOutside = (event) => {
    if (calendarRef.current && !calendarRef.current.contains(event.target) && inputRef.current && !inputRef.current.contains(event.target)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    // Add event listener for clicks outside
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Clean up event listener on unmount
      document.removeEventListener("mousedown", handleClickOutside);
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
      setValue(dayjs(props.searchSource, "YYYY年MM月DD日"));
    }
  }, [props.searchSource]);

  const renderCalender = (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        value={value}
        onChange={handleDateChange}
        showDaysOutsideCurrentMonth
        displayWeekNumber
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
        sx={{ position: "absolute", backgroundColor: "white", boxShadow: "0px 4px 18px -10px #777777", borderRadius: "10px", zIndex: "1300" }}
      />
    </LocalizationProvider>
  );

  return (
    <>
      <Grid item sx={{ width: "100%" }}>
        <Box sx={{ marginTop: "20px", marginBottom: "10px", position: "relative" }}>
          <div style={{ fontWeight: "Bold", color: "#666" }}>応募締め切り</div>
          <div style={{ color: "#444" }}>
            <TextField
              //   label="応募締切日"
              margin="normal"
              name="deadline"
              onClick={handleOpen}
              value={value ? value.format("YYYY年MM月DD日") : "日付を選択してください"}
              variant="outlined"
              sx={{
                width: { xs: "100%", sm: "100%", md: "fit-content" },
                "& .css-10cqtbj-MuiInputBase-input-MuiOutlinedInput-input": {
                  fontSize: { xs: "12px", sm: "14px", md: "16px" },
                },
              }}
              inputRef={inputRef} // Reference for input field
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton aria-label="toggle calendar visibility" onClick={handleOpen} edge="end">
                      <CalendarMonthIcon />
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
