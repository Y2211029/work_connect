// インポート
import MypageEdit_router from "src/sections/Profile/View/student/MypageEdit";
//import MypageEdit_router2 from "src/sections/Profile/View/company/MypageEdit";

export default function MypageEdit() {

 // セッションデータを取得
 const sessionData = sessionStorage.getItem('accountData');
 let user_kind = "";
 if(sessionData){
   const accountData = JSON.parse(sessionData);
   // 1文字目を取得
   user_kind = accountData.id[0];
 } 
  if(user_kind == "S"){
    // 学生側
    return (
      <>
        <MypageEdit_router />
      </>
    );
  } else if(user_kind == "C"){
    // 企業側
    return (
      <>
        {/* <MypageEdit_router2 /> */}
      </>
    );
  } 
  
}
