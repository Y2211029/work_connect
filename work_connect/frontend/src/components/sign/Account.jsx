const Account = () => {
  return (
    <>
      <h1>テスト</h1>
      <form action="" style={{width: "100%" , margin: "auto" }}>
        <p>2211060@i-seifu.jp</p>
        <p>
          <label htmlFor="username">ユーザーネーム</label>
          <br />
          <input type="text" name="username" placeholder="username" />
        </p>

        <p>
          <label htmlFor="password">パスワード</label>
          <br />
          <input type="password" name="password" />
        </p>

        <p>
          <label htmlFor="passwordCheck">パスワード確認</label>
          <br />
          <input type="password" name="passwordCheck" />
        </p>
      </form>
    </>
  );
};

export default Account;
