import { useEffect, useState } from "react";
import axios from "axios";
import { useSessionStorage } from "src/hooks/use-sessionStorage";
import { Link } from "react-router-dom";
import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
import { styled } from '@mui/material/styles';

import Box from '@mui/material/Box';
import SendIcon from '@mui/icons-material/Send';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

import "../css/App.css";

const blue = {
  100: '#DAECFF',
  200: '#b6daff',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  900: '#003A75',
};

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};

const Textarea = styled(BaseTextareaAutosize)(
  ({ theme }) => `
  box-sizing: border-box;
  width: 100%;
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  padding: 8px 12px;
  border-radius: 8px;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};

  &:hover {
    border-color: ${blue[400]};
  }

  &:focus {
    border-color: ${blue[400]};
    box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
  }

  // firefox
  &:focus-visible {
    outline: 0;
  }
`,
);

const ChatView = () => {

  // DBからのレスポンスが入る変数
  const [ResponseChannelListData, setResponseChannelListData] = useState([]);

  // セッションデータが入る変数
  const [ChatOpenId, setChatOpenId] = useState([]);
  const [ChatOpenUserName, setChatOpenUserName] = useState([]);
  const [ChatOpenCompanyName, setChatOpenCompanyName] = useState([]);
  const [ChatOpenIcon, setChatOpenIcon] = useState([]);
  const [ChatOpenFollowStatus, setChatOpenFollowStatus] = useState([]);

  // セッションストレージ取得
  const { getSessionData } = useSessionStorage();

  // セッションストレージからaccountDataを取得し、idを初期値として設定(ログイン中のIDを取得)
  const accountData = getSessionData("accountData");

  // ログイン中のid
  const MyUserId = accountData.id;

  // Laravelとの通信用URL
  const channel_list_url = "http://localhost:8000/get_channel_list";
  //const chat_url = "http://localhost:8000/get_chat";

  // accountDataが変化したとき
  useEffect(() => {
    if (accountData.ChatOpenId) {
      setChatOpenId(accountData.ChatOpenId);
    }
    if (accountData.ChatOpenUserName) {
      setChatOpenUserName(accountData.ChatOpenUserName);
    }
    if (accountData.ChatOpenCompanyName) {
      setChatOpenCompanyName(accountData.ChatOpenCompanyName);
    }
    if (accountData.ChatOpenIcon) {
      setChatOpenIcon(accountData.ChatOpenIcon);
    }
    if (accountData.ChatOpenFollowStatus) {
      setChatOpenFollowStatus(accountData.ChatOpenFollowStatus);
    }

    // あとで消す！！！！！！！！！！！！！！！！！！！！
    console.log(ChatOpenId+ChatOpenFollowStatus);

  }, [accountData]);

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
    <div style={{
      width: '100%',
      height: 'auto',
      maxHeight: 600,
      marginLeft: '2%',
      marginRight: '2%',
      border: '#DAE2ED 2px solid',
      borderRadius: '10px'}}>

      {/****** チャット相手のアイコン、名前を表示させる ******/}
      <Box sx={{
        padding: '5px 0',
        borderBottom: '#DAE2ED 2px solid',
        fontSize: '25px'
        }}>

        {/* 企業名もしくはユーザーネームを表示(企業は企業名、学生はユーザーネーム) */}
        <Tooltip title={(ChatOpenCompanyName ? ChatOpenCompanyName : ChatOpenUserName) + "さんのマイページ"}>
          <Link
            to={`/Profile/${ChatOpenUserName}`}
          >
            <img src={
            `http://localhost:8000/storage/images/userIcon/${ChatOpenIcon}`
            }
            //alt={element.user_name}
            style={{
              width: '40px',
              height: '40px',
              margin: '0 5px',
              borderRadius: '50%' }}
            />
            {ChatOpenCompanyName ? ChatOpenCompanyName : ChatOpenUserName}
          </Link>
        </Tooltip>
      </Box>

      {/****** チャット内容 ******/}
      <Box sx={{
        height:'82%',
        maxHeight: 600,
        overflow: 'auto',
          }}>

        {Array(50).fill('こんにちは').map((message, index) => (
        <div key={index}>{message}</div>
      ))}

      </Box>

      {/****** チャット送信フォーム ******/}
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        borderTop: '#DAE2ED 2px solid',
        width: '100%',
        height: '10%'
      }}>
        <Textarea
          multiline
          minRows={1} // 最小行数を設定
          maxRows={4} // 最大行数を設定
          sx={{
            margin: '0 3%',
            height: '70%', // 親要素の高さの50%に設定
            width: '80%', // 必要に応じて幅を調整
          }}
          InputProps={{
            sx: {
              height: '100%' // TextFieldの内部要素も親の高さに合わせる
            }
          }}
          //label="内容を入力してください"
        />
        <IconButton
            //onClick={handleBackClick}
            sx={{
              '&:hover': { backgroundColor: '#c1e0ff' },
            }}
          >
        <SendIcon
        color="primary"
        sx={{ fontSize: 30,paddingBottom:'14' }}
        />
        </IconButton>
      </Box>
    </div>
  )
}

export default ChatView;