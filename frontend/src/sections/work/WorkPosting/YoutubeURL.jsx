

const YoutubeURL = () => {
  return (
    <div>
      <p>Youtube URLを入力してください。</p>
      <input type="text" name="text" className="kadomaru" />
      <input type="hidden" name="command" value="input_url" />
    </div>
  );
};

export default YoutubeURL;