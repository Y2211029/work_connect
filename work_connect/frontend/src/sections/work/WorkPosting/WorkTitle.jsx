import PropTypes from "prop-types";

const WorkTitle = (props) => {
  const handleChange = (e) =>{
    props.callSetWorkData("WorkTitle", e.target.value)
  }
  return (
    <div>
      <p>
        タイトル&nbsp;<span className="red_txt">必須</span>&nbsp;
        <span className="alert_red_txt" id="alert_a_2">
          入力してください
        </span>
        <span className="alert_red_txt" id="alert_b_2">
          使えない文字が含まれています
        </span>
      </p>
      <input type="text" name="title" id="title" className="kadomaru" onChange={handleChange} />
    </div>
  );
};

WorkTitle.propTypes = {
  callSetWorkData: PropTypes.func,
};

export default WorkTitle;
