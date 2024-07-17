import axios from "axios";

/*--------------------------------------------*/
/* ログイン状態をチェックする処理を追加しました。 */
/*--------------------------------------------*/
/* 
import LoginStatusCheck from "～/loginStatusCheck";
const { loginStatusCheckFunction } = LoginStatusCheck();
loginStatusCheckFunction();
*/
/* ↑この3行でこの関数を使用可能です */
/*--------------------------------------------*/
function InsertTag() {

  // セッションストレージのaccountData.idが正しいidでなければトップページに飛ばす
  const InsertTagFunction = async (name, item_id) => {

    if (name != undefined) {
      if (item_id != undefined) {
        await axios.post(
          "http://localhost:8000/insert_tag",
          {
            name: name,
            item_id: item_id
          }
        );
      }
    }
  };

  return { InsertTagFunction };
}
/*-------------------------------------------*/

export default InsertTag;
