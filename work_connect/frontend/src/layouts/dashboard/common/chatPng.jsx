import { useContext } from "react";
import ChatIcon from "@mui/icons-material/Chat";

import { MyContext } from "src/layouts/dashboard/index";
const ChatPng = () => {
  const Display = useContext(MyContext);

  return (
    <>
      <ChatIcon color="action" style={{ display: Display }} />
    </>
  );
};

export default ChatPng;
