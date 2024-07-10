
const Obsession = () => {
  return (
    <div>
      <p>
        こだわりポイント&nbsp;<span className="red_txt">必須</span>
        &nbsp;
        <span className="alert_red_txt" id="alert_a_5">
          入力してください
        </span>
        <span className="alert_red_txt" id="alert_b_5">
          使えない文字が含まれています
        </span>
      </p>
      <textarea
        id="obsession"
        name="obsession"
        className="kadomaru"
        rows="10"
        cols="60"
      ></textarea>
    </div>
  );
};

export default Obsession;
