import axios from "axios";

/*--------------------------------------------*/
/*          指定のタグ一覧取得処理              */
/*--------------------------------------------*/
/* 
import LoginStatusCheck from "～/loginStatusCheck";
const { loginStatusCheckFunction } = LoginStatusCheck();
loginStatusCheckFunction();
*/
/* ↑この3行でこの関数を使用可能です */
/*--------------------------------------------*/
function GetTagList() {
  // セッションストレージのaccountData.idが正しいidでなければトップページに飛ばす
  const GetTagListFunction = async (kind) => {
    if (kind != undefined) {
        const url = `http://localhost:8000/get_${kind}_tag`;
        await axios.get(url, {});
    }
  };

  return { GetTagListFunction };
}
/*-------------------------------------------*/

export default GetTagList;
