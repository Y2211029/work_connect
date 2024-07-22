import PropTypes from "prop-types";

const Introduction = (props) => {
  const handleChange = (e) =>{
    props.callSetWorkData("Introduction", e.target.value)
  }
  return (
    <div>
      <p>
        作品紹介文&nbsp;<span className="red_txt">必須</span>
        &nbsp;
        <span className="alert_red_txt" id="alert_a_4">
          入力してください
        </span>
        <span className="alert_red_txt" id="alert_b_4">
          使えない文字が含まれています
        </span>
      </p>
      <textarea
        id="intro"
        name="intro"
        className="kadomaru"
        rows="10"
        cols="60"
        onChange={handleChange}
      ></textarea>
    </div>
  );
};

Introduction.propTypes = {
  callSetWorkData: PropTypes.func,
};
export default Introduction;
