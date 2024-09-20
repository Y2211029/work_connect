import ChatPartnerList from './ChatPartnerList';
import ChatView from './ChatView';

import "../css/App.css";

const ChatApp = () => {

    return (
    <div style={{ display: 'flex', width:'100%', height:'100%' }}>
      <ChatPartnerList />
      <ChatView />
    </div>
  )
}

export default ChatApp;