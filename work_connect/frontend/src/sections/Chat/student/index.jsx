import { useEffect, useState } from "react";
import axios from "axios";
import { useSessionStorage } from "src/hooks/use-sessionStorage";

import { App as SendbirdApp } from '@sendbird/uikit-react';
import { GroupChannelList } from '@sendbird/uikit-react/GroupChannelList';
//import { useGroupChannelListContext } from '@sendbird/uikit-react/GroupChannelList/context';

import '@sendbird/uikit-react/dist/index.css';
import "../css/App.css";

function App() {

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
          console.log(response.data);
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

  // ResponseChatDataが変化したとき
  // useEffect(() => {
  //   async function GetData() {
  //     try {
  //       // Laravel側からデータを取得
  //       const response = await axios.get(chat_url, {
  //         params: {
  //           MyUserId: MyUserId, //ログイン中のID
  //         },
  //       });
  //       if (response) {
  //         console.log(response.data[0].follow_status);
  //         //setResponseChannelListData(response.data[0]);
  //       }
  //     } catch (err) {
  //       console.log("err:", err);
  //     }
  //   }
  //   // DBからデータを取得
  //   if (MyUserId) {
  //     GetData();
  //   }
  // }, [ResponseChatData]);

  const customStringSet = {
    // ここで「Enter message」を空に設定
    MESSAGE_INPUT__PLACE_HOLDER: '',
  };

  //const sendbirdState = useGroupChannelListContext();

  return (
    <div style={{ width:'100%', height:'100%' }}>
      <SendbirdApp

        // enableLegacyChannelModules
        // APP_IDを設定
        appId={'16458E4D-ABD8-463B-9886-894F6671DFE4'}

        userId={'USER_ID'}

        // テーマを設定
        theme="light" // 'dark' or 'light' theme

        stringSet={customStringSet}

        >
        {/* Sendbirdのコンテキストを使用してGroupChannelListを表示 */}

        <GroupChannelList
          customChannelListQuery={() => ResponseChannelListData}
          onChannelSelect={(channel) => {
            console.log('Selected channel:', channel);
          }}
        />


        </SendbirdApp>


    </div>
  )
}

export default App;