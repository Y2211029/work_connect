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

  // セッションストレージ取得
  const { getSessionData } = useSessionStorage();

  // // セッションストレージからaccountDataを取得し、idを初期値として設定(ログイン中のIDを取得)
  // const [accountData, setAccountData] = useState(getSessionData("accountData"));

  // // セッションストレージのデータを定期的に取得
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     const updatedAccountData = getSessionData("accountData");
  //     setAccountData(updatedAccountData);
  //   }, 100); // 1秒ごとに更新

  //   // コンポーネントがアンマウントされたらintervalをクリア
  //   return () => clearInterval(interval);
  // }, []);

  // // DBからのレスポンスが入る変数
  // const [ResponseChannelListData, setResponseChannelListData] = useState([]);

  // セッションデータが入る変数
  const [ChatOpenId, setChatOpenId] = useState(null);
  const [ChatOpenUserName, setChatOpenUserName] = useState(null);
  const [ChatOpenCompanyName, setChatOpenCompanyName] = useState(null);
  const [ChatOpenIcon, setChatOpenIcon] = useState(null);
  const [ChatOpenFollowStatus, setChatOpenFollowStatus] = useState(null);



  // // ログイン中のid
  const MyUserId = getSessionData("accountData").id;

  // // Laravelとの通信用URL
  const chat_url = "http://localhost:8000/get_chat";


  // 初回レンダリング時のみ実行
  useEffect(() => {
    // 1秒ごとにチャットの読み込みを実行
    const intervalId = setInterval(() => {
      // チャットの取得
      GetChat();
    }, 1000);

    // クリーンアップ（コンポーネントがアンマウントされたときに実行）
    return () => clearInterval(intervalId);
  }, []);

  const GetChat = () => {

    async function GetData() {
      console.log('チャットデータを取得中...'+ChatOpenFollowStatus);
      try {
        // Laravel側からデータを取得
        const response = await axios.get(chat_url, {
          params: {
            MyUserId: MyUserId, // ログイン中のID
            PairUserId: getSessionData("accountData").ChatOpenId // チャット相手のID
          },
        });
        if (response) {
          console.log(response.data);
        }
      } catch (err) {
        console.log("err:", err);
      }
    }
    // DBからデータを取得
    if (MyUserId && getSessionData("accountData").ChatOpenId) {
      GetData();
    } else {
      console.log("できません");
    }

  };

  // accountDataが変化したとき
  useEffect(() => {

    if (getSessionData("accountData").ChatOpenId) {
      setChatOpenId(getSessionData("accountData").ChatOpenId);
    }
    if (getSessionData("accountData").ChatOpenUserName) {
      setChatOpenUserName(getSessionData("accountData").ChatOpenUserName);
    }
    if (getSessionData("accountData").ChatOpenCompanyName) {
      setChatOpenCompanyName(getSessionData("accountData").ChatOpenCompanyName);
    }
    if (getSessionData("accountData").ChatOpenIcon) {
      setChatOpenIcon(getSessionData("accountData").ChatOpenIcon);
    }
    if (getSessionData("accountData").ChatOpenFollowStatus) {
      setChatOpenFollowStatus(getSessionData("accountData").ChatOpenFollowStatus);
    }

  }, [getSessionData("accountData")]);

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
      {(ChatOpenId) ? (
        // 選択状態
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
      ) : (
        // 未選択状態
        <Box sx={{
          padding: '5px 0',
          borderBottom: '#DAE2ED 2px solid',
          fontSize: '25px'
          }}>


          &nbsp;
        </Box>
      )}

      {/****** チャット内容 ******/}
      <Box sx={{
        height:'82%',
        maxHeight: 600,
        overflow: 'auto',
          }}>

        {/* {Array(50).fill('こんにちは').map((message, index) => (
        <div key={index}>{message}</div>
      ))} */}

      </Box>

      {/****** チャット送信フォーム ******/}
      {(ChatOpenId) ? (
      // 選択状態
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
      ) : (
        // 未選択状態
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          borderTop: '#DAE2ED 2px solid',
          width: '100%',
          height: '10%'
        }}>

        </Box>
      )}
    </div>
  )
}

export default ChatView;