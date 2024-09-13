//import React from 'react';

////////////////////////////////////////////////////////////////////////////////////
import { SendBirdProvider, Channel, ChannelList } from 'sendbird-uikit';
import 'sendbird-uikit/dist/index.css';  // 必要なスタイルを読み込みます
////////////////////////////////////////////////////////////////////////////////////

function App() {
  // ここにSendbirdのAPP_ID、ユーザーID、ニックネームを設定します
  const APP_ID = 'YOUR_APP_ID';  // ダッシュボードから取得したApp IDを入れてください
  const USER_ID = 'sample_user'; // ユーザーIDを設定（固定または動的に）
  const NICKNAME = 'Sample User';  // 任意のニックネームを設定

  return (
    <SendBirdProvider appId={APP_ID} userId={USER_ID} nickname={NICKNAME}>
        <div className="sendbird-container" style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            <div className="sendbird-channel-list" style={{ flex: '1 1 auto' }}>
                <ChannelList />
            </div>
            <div className="sendbird-channel" style={{ flex: '2 1 auto' }}>
                <Channel />
            </div>
        </div>
    </SendBirdProvider>
  );
}

export default App;
