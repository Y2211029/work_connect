import { useState } from 'react';
import dayjs from 'dayjs';
import isBetweenPlugin from 'dayjs/plugin/isBetween';
import PropTypes from 'prop-types';

import { styled } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

dayjs.extend(isBetweenPlugin);

const CustomPickersDay = styled(PickersDay, {
    shouldForwardProp: (prop) => prop !== 'isInRange',
})(({ theme, isInRange }) => ({
    ...(isInRange && {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.primary.contrastText,
        borderRadius: '50%',
        '&:hover, &:focus': {
            backgroundColor: theme.palette.primary.main,
        },
    }),
}));

function Day(props) {
    const { day, selectedStartDay, selectedEndDay, ...other } = props;

    // 範囲内の日付判定
    const isInRange =
        selectedStartDay &&
        selectedEndDay &&
        day.isBetween(selectedStartDay, selectedEndDay, null, '[]');

    return (
        <CustomPickersDay
            {...other}
            day={day}
            disableMargin
            isInRange={isInRange}
        />
    );
}

export default function RangeCalendar() {
    const [startDay, setStartDay] = useState(null);
    const [endDay, setEndDay] = useState(null);
    const [open, setOpen] = useState(null);

    // // 最小の日付（例えば 2000年01月01日）を設定
    // const startDate = new Date(2004, 0, 1); // 月は0から始まるので1月は0

    // // 日付を0埋めした形式で設定
    // const startDayZero = String(startDate.getDate()).padStart(2, '0');

    // // useStateで初期値を設定
    // const [startDayNum, setStartDayNum] = useState(startDayZero);

    const handleDayClick = (newValue) => {
        // スタート、エンドどちらにも値があるときはリセットする。

        // startdayがnullのときまたは、startDay・endDayに値が入ってるとき
        if (!startDay || (startDay && endDay) || (startDay && endDay && startDay >= endDay)) {
            //startDay（始めに選択した日）よりもendDay（最後に選択した日）
            // が後ろだったら最後の日をstartDayとする。
            setStartDay(newValue);
            setEndDay(null);

        } else {
            console.log("あいうえお", newValue)
            setEndDay(newValue);
        }
    };
    // まず最初日、最後日のデータが入っている前提で。
    // 最初日よりも最後日のデータが小さいときはsetStartDayとsetEndDayをリセットする


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
                }}
            />
        </LocalizationProvider>
    )



    return (
        <>
            <Grid item xs={12} sm={6} md={4}>
                <Box sx={{ marginTop: "20px", marginBottom: "10px" }}>
                    <div style={{ fontWeight: "Bold", color: "#666" }}>開催日</div>
                    <div style={{ color: "#444" }}>
                        <Button variant="outlined" onClick={() => setOpen(!open)}>
                            開催日
                        </Button>
                    </div>
                </Box>
            </Grid>
            <div>
                {open && renderCalender}
            </div>
        </>
    );
}


// PropTypesの型定義
Day.propTypes = {
    day: PropTypes.String,
    selectedStartDay: PropTypes.String,
    selectedEndDay: PropTypes.String,
    hoveredDay: PropTypes.String,
    format: PropTypes.string,
};
