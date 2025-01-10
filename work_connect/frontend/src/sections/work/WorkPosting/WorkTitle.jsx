import { useState } from "react";
import PropTypes from "prop-types";
import TextField from "@mui/material/TextField";

const WorkTitle = (props) => {
  // const [workTitle, setWorkTitle] = useState(null);
  const [hasError, setHasError] = useState(false);

  const handleChange = (e) => {
    // setWorkTitle(e.target.value);
    setHasError(e.target.value === ""); // 空の場合にエラーを表示
    props.callSetWorkData("WorkTitle", e.target.value);
  };

  return (
    <p>
      タイトル<span className="requiredInput">*</span>
      <TextField
        fullWidth
        margin="normal"
        name="Title"
        value={props.workData}
        onChange={handleChange}
        required
        type="text"
        variant="outlined"
        error={hasError}
        sx={{
          backgroundColor: "#fff",
        }}
        placeholder="タイトルを入力"
        className="WorkInputElements"
      />
    </p>
  );
};

WorkTitle.propTypes = {
  callSetWorkData: PropTypes.func,
  workData: PropTypes.string.isRequired,
};

export default WorkTitle;
