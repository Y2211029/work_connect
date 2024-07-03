/*--------------------------------------------*/ ///////////////////////////仮としてここに記述しています。 別のファイルで定義して、関数として呼び出すほうが良いかも。
/* ログイン状態をチェックする処理を追加しました。 */
/*--------------------------------------------*/
export const loginStatusCheck = async (id) => {
  const loginStatusCheckReaponse = await axios.get("http://localhost:8000/login_status_check", {
    params: {
      id: id,
    },
  });

  console.log("loginStatusCheckReaponse: ", loginStatusCheckReaponse);
  if (loginStatusCheckReaponse.data == "false") {
    // もしログインチェックに失敗した場合は、404ページに飛ばす
    navigate("/404");
  }
};
/*-------------------------------------------*/

export default PreSignModal;

