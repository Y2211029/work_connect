import { useState } from "react";
import PropTypes from "prop-types";
import TextField from "@mui/material/TextField";

const VideoYoutubeURL = (props) => {
  const [error, setError] = useState(false); // エラー状態を管理

  const handleChange = (event) => {
    const value = event.target.value;
    props.onChange(event); // 親コンポーネントに変更を通知

    // 入力が空の場合、エラーを true にする
    if (value.trim() === "") {
      setError(true);
    } else {
      setError(false);
    }
  };

  return (
    <div>
      <p>動画<span className="requiredInput">*</span>

        <TextField
          fullWidth
          margin="normal"
          type="text"
          name="text"
          variant="outlined"
          onChange={handleChange}
          value={props.value}
          error={error}
          sx={{
            backgroundColor: "#fff", // 背景色を指定
            borderRadius: "8px", // 角の丸みを設定
            marginTop: "6px",
            marginBottom: "0",
          }}
          placeholder="YouTubeの|URL|ID|iframe|のいずれかを入力"
        />
      </p>
    </div>
  );
};

VideoYoutubeURL.propTypes = {
  callSetVideoData: PropTypes.func,
  onChange: PropTypes.func.isRequired, // 追加
  value: PropTypes.string.isRequired, // 追加
};

export default VideoYoutubeURL;
