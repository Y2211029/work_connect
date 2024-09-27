import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import ChatIcon from "@mui/icons-material/Chat";
import IconButton from '@mui/material/IconButton';

import { MyContext } from "src/layouts/dashboard/index";
const ChatPng = () => {
  const Display = useContext(MyContext);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/Chat`);
  };

  return (
    <>
    <IconButton
      onClick={handleClick}
      sx={{
        marginLeft: 'auto', // 右揃え
        '&:hover': { backgroundColor: '#f0f0f0', title: 'a' },
      }}
    >
      <ChatIcon color="action" style={{ display: Display.HomePage }} />
    </IconButton>
    </>
  );
};

export default ChatPng;
