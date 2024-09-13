// import React from 'react';

////////////////////////////////////////////////////////////////////////////////////
import { SendBirdProvider, Channel, ChannelList } from 'sendbird-uikit';
import 'sendbird-uikit/dist/index.css';  // 必要なスタイルを読み込みます
////////////////////////////////////////////////////////////////////////////////////

import { useSessionStorage } from "src/hooks/use-sessionStorage";
import Box from '@mui/material/Box';

function App() {

    // セッションストレージ取得
    const { getSessionData } = useSessionStorage();

    const accountData = getSessionData("accountData");

    const Mail = accountData.id;
    const UserName = accountData.user_name;

    console.log("accountData.mail:"+accountData.mail);

    // ここにSendbirdのAPP_ID、ユーザーID、ニックネームを設定します
    const APP_ID = '16458E4D-ABD8-463B-9886-894F6671DFE4';  // ダッシュボードから取得したApp IDを入れてください
    const USER_ID = Mail; // ユーザーIDを設定（固定または動的に）
    const NICKNAME = UserName;  // 任意のニックネームを設定

    return (
        <SendBirdProvider appId={APP_ID} userId={USER_ID} nickname={NICKNAME}>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, height: '100vh', gap: 0 }}>
          <Box sx={{ flex: '0 0 30%', margin: 0, padding: 0 }}>
            <ChannelList sx={{ width: '100%'}}/>
          </Box>
          <Box sx={{ flex: '0 0 70%', margin: 0, padding: 0 }}>
            <Channel />
          </Box>
        </Box>
      </SendBirdProvider>

    );
}

export default App;
