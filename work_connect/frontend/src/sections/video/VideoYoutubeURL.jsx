import PropTypes from "prop-types";
import TextField from "@mui/material/TextField";

const VideoYoutubeURL = (props) => {
  return (
    <div>
      <p>Youtube URLを入力してください。</p>
      <TextField
        fullWidth
        margin="normal"
        type="text"
        name="text"
        variant="outlined"
        onChange={props.onChange}
        value={props.value}
        sx={{
          backgroundColor: "#fff", // 背景色を指定
          borderRadius: "8px", // 角の丸みを設定
          marginTop: "6px",
          marginBottom: "0",
          "& .MuiOutlinedInput-root": {
            "&.Mui-error fieldset": { borderColor: "red" }, // エラー時の枠の色を赤に設定
            "&:hover": {
              borderColor: "#3399FF",
            },
            "&:focus": {
              borderCcolor: "#3399FF",
              boxShadow: "0 0 0 3px",
            },
          },
        }}
      />
    </div>
  );
};

VideoYoutubeURL.propTypes = {
  callSetWorkData: PropTypes.func,
  onChange: PropTypes.func.isRequired, // 追加
  value: PropTypes.string.isRequired, // 追加
};

export default VideoYoutubeURL;
