import { useState } from 'react';
import PropTypes from "prop-types";
import TextField from "@mui/material/TextField";

const WorkTitle = (props) => {

  const [inputValue, setInputValue] = useState('');
  const [hasError, setHasError] = useState(false);

  const handleChange = (e) => {
    setInputValue(e.target.value);
    setHasError(e.target.value === ''); // 空の場合にエラーを表示

    props.callSetWorkData("WorkTitle", e.target.value);
  };

  return (
    <div>
      <p>
        タイトル*
        <TextField
          fullWidth
          margin="normal"
          name="Title"
          value={inputValue}
          onChange={handleChange}
          // required
          type="text"
          variant="outlined"
          error={hasError}
          sx={{
            backgroundColor: "#fff", // 背景色を指定
            borderRadius: "8px", // 角の丸みを設定
            marginTop: "6px",
            marginBottom: "0",
            '& .MuiOutlinedInput-root': {
              '&.Mui-error fieldset': { borderColor: 'red' }, // エラー時の枠の色を赤に設定
            },
          }}
        />
      </p>
      <input
        type="text"
        name="title"
        id="title"
        className="kadomaru"
        onChange={handleChange}
      />
    </div>
  );
};

WorkTitle.propTypes = {
  callSetWorkData: PropTypes.func,
};

export default WorkTitle;
