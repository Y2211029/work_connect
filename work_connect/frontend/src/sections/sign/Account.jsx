import { useContext } from "react";
import { emailContext } from "src/components/account/students/EmailContext";

const Account = () => {
  const AccountData = useContext(emailContext);
console.log('Account内AccountDataです:', AccountData);

const objAccountData = {};
//
for (const [key, value] of AccountData) {
  objAccountData[key] = value;
}

console.log('Account内objAccountDataです:', objAccountData);

  return (
    <>
      <h1>テスト</h1>
      <form action="" style={{ width: "100%", margin: "auto" }}>
        <p>{objAccountData.email}</p>
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
