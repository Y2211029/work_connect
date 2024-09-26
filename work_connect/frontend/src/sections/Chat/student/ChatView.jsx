import { useEffect, useState } from "react";
import axios from "axios";
import { useSessionStorage } from "src/hooks/use-sessionStorage";

import "../css/App.css";

const ChatView = () => {

  // DBからのレスポンスが入る変数
  const [ResponseChannelListData, setResponseChannelListData] = useState([]);
  //const [ResponseChatData, setResponseChatData] = useState([]);

  // セッションストレージ取得
  const { getSessionData } = useSessionStorage();

  // セッションストレージからaccountDataを取得し、idを初期値として設定(ログイン中のIDを取得)
  const accountData = getSessionData("accountData");

  // ログイン中のid
  const MyUserId = accountData.id;

  // Laravelとの通信用URL
  const channel_list_url = "http://localhost:8000/get_channel_list";
  //const chat_url = "http://localhost:8000/get_chat";

  // ResponseChannelListDataが変化したとき
  useEffect(() => {
    async function GetData() {
      try {
        // Laravel側からデータを取得
        const response = await axios.get(channel_list_url, {
          params: {
            MyUserId: MyUserId, //ログイン中のID
          },
        });
        if (response) {
          //console.log(response.data);
          setResponseChannelListData(response.data);
        }
      } catch (err) {
        console.log("err:", err);
      }
    }
    // DBからデータを取得
    if (MyUserId) {
      GetData();
    }
  }, [ResponseChannelListData]);

  return (
    <div style={{ width:'100%', height:'100%' }}>
      あいうえお
    </div>
  )
}

export default ChatView;