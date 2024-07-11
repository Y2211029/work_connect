import PropTypes from "prop-types";

const YoutubeURL = (props) => {
  const handleChange = (e) =>{
    props.callSetWorkData("YoutubeURL", e.target.value)
  }
  return (
    <div>
      <p>Youtube URLを入力してください。</p>
      <input type="text" name="text" className="kadomaru" onChange={handleChange} />
    </div>
  );
};

YoutubeURL.propTypes = {
  callSetWorkData: PropTypes.func,
};

export default YoutubeURL;