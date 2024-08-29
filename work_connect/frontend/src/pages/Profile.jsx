import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";

// インポート
import Profile_router from "src/sections/Profile/View/student/Profile";
import Profile_router2 from "src/sections/Profile/View/company/Profile";

export default function Profile() {

  // Laravelとの通信用URL
  const url = "http://localhost:8000/get_profile_mypage_kind";

  const { user_name } = useParams();
  const [ ProfileUserName ] = useState(user_name);

  // 表示したいプロフィールの人のuser_nameを取得
  console.log("ProfileUserName:", ProfileUserName);

  // DBからのレスポンスが入る変数
  const [ResponseData, setResponseData] = useState([]);

  // ProfileUserNameが変化したとき
  useEffect(() => {
    // 受け取ったuser_nameが学生か企業か判断する
    async function GetData(ProfileUserName) {
      
      try {
        // Laravel側からデータを取得
        const response = await axios.get(url, {
          params: {
            ProfileUserName: ProfileUserName,
          },
        });
        if(response.data){
          setResponseData(response.data[0]);
        } else {
          // ユーザが見つからなかった場合
          location.href = "/404";
        }
        console.log("response.data:", response.data);
      } catch (err) {
        console.log("err:", err);
      }
    }
    // DBからデータを取得
    GetData(ProfileUserName);
  }, [ProfileUserName]);

  if(ResponseData === "s"){
    // 学生側
    return (
      <>
        <Profile_router />
      </>
    );
  } else if(ResponseData === "c"){
    // 企業側
    return (
      <>
        <Profile_router2 />
      </>
    );
  } 
  
}
