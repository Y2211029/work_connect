import { useState } from "react";
import PropTypes from "prop-types";
import TextField from "@mui/material/TextField";

const VideoTitle = (props) => {
  // const [inputValue, setInputValue] = useState(null);
  const [hasError, setHasError] = useState(false);

  const handleChange = (e) => {
    // setInputValue(e.target.value);
    setHasError(e.target.value === ""); // 空の場合にエラーを表示

    props.callSetVideoData("VideoTitle", e.target.value);
  };

  return (
    <div>
      <p>
        タイトル*
        <TextField
          fullWidth
          margin="normal"
          name="Title"
          value={props.movieData}
          onChange={handleChange}
          // required
          type="text"
          variant="outlined"
          error={hasError}
          sx={{
            backgroundColor: "#fff",
          }}
        />
      </p>
    </div>
  );
};

VideoTitle.propTypes = {
  callSetVideoData: PropTypes.func,
  movieData: PropTypes.string.isRequired,
};

export default VideoTitle;
