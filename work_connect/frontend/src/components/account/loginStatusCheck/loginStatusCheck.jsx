import { useNavigate } from "react-router-dom";
import axios from "axios";
/*--------------------------------------------*/ ///////////////////////////仮としてここに記述しています。 別のファイルで定義して、関数として呼び出すほうが良いかも。
/* ログイン状態をチェックする処理を追加しました。 */
/*--------------------------------------------*/
function LoginStatusCheck() {
  const navigate = useNavigate();

  const loginStatusCheckFunction = async (id) => {
    const loginStatusCheckReaponse = await axios.get(
      "http://localhost:8000/login_status_check",
      {
        params: {
          id: id,
        },
      }
    );

    console.log("loginStatusCheckReaponse: ", loginStatusCheckReaponse);
    if (loginStatusCheckReaponse.data == "false") {
      // もしログインチェックに失敗した場合は、404ページに飛ばす
      navigate("/Top");
    }
  };

  return { loginStatusCheckFunction };
}
/*-------------------------------------------*/

export default LoginStatusCheck;
