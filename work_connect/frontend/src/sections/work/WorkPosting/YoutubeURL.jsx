import PropTypes from "prop-types";

const YoutubeURL = (props) => {
  return (
    <div>
      <p>Youtube URLを入力してください。</p>
      <input
        type="text"
        name="text"
        className="kadomaru"
        onChange={props.onChange}
        value={props.value}
      />
    </div>
  );
};

YoutubeURL.propTypes = {
  callSetWorkData: PropTypes.func,
  onChange: PropTypes.func.isRequired, // 追加
  value: PropTypes.string.isRequired, // 追加
};

export default YoutubeURL;
