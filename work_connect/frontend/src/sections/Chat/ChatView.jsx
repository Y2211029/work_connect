import React from 'react';
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useSessionStorage } from "src/hooks/use-sessionStorage";
import { Link } from "react-router-dom";
import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
import { styled } from '@mui/material/styles';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from "@mui/material/Typography";
import SendIcon from '@mui/icons-material/Send';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

// import "../css/App.css";

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

  // セッションストレージ
  const { getSessionData } = useSessionStorage();
  // セッションストレージからaccountDataを取得し、idを初期値として設定(ログイン中のIDを取得)
  const [accountData, setAccountData] = useState(getSessionData("accountData"));
  // DBからのレスポンスが入る変数
  const [ResponseData, setResponseData] = useState([]);

  // デフォルトでチャットを一番下にスクロールする
  const chatBoxscroll = useRef(null);
  // スクロールの高さが変わったときに、元のスクロールの高さを保持しておく
  const [prevScrollHeight, setPrevScrollHeight] = useState(0);

  // 1回のみ実行(1秒単位でデータを取得)
  useEffect(() => {
    // セッションストレージ取得
    setAccountData(getSessionData("accountData"));
    GetChat();
    const interval = setInterval(() => {
     // セッションストレージ取得
    setAccountData(getSessionData("accountData"));
    GetChat();
    }, 1000);

    // コンポーネントがアンマウントされたらintervalをクリア
    return () => clearInterval(interval);
  }, []);

  // ResponseDataが更新されたら実行
  useEffect(() => {
    const chatBox = chatBoxscroll.current;
    // chatBoxがなければ中断
    if (!chatBox) return;

    // MutationObserverの設定
    const observer = new MutationObserver(() => {
      // 現在のscrollHeight
      const currentScrollHeight = chatBox.scrollHeight;

      // scrollHeightが変わったときにのみスクロール
      if (currentScrollHeight !== prevScrollHeight) {
        chatBox.scrollTop = chatBox.scrollHeight;
        setPrevScrollHeight(currentScrollHeight); // 更新
      }
    });
    // observerの監視対象を設定
    observer.observe(chatBox, { childList: true, subtree: true });

    // クリーンアップ
    return () => {
      observer.disconnect(); // コンポーネントがアンマウントされたときにobserverを解除
    };
  }, [ResponseData]);


  // テキストの文章を保持する変数
  const [TextData, setTextData] = useState(null);

  // ログイン中のid
  const MyUserId = accountData.id;

  // Laravelとの通信用URL
  const chat_url = "http://localhost:8000/get_chat";
  const chat_post_url = "http://localhost:8000/post_chat";

  // チャットアイコンの設定
  const avatarSrc = accountData.ChatOpenIcon
  ? `http://localhost:8000/storage/images/userIcon/${accountData.ChatOpenIcon}`
  : (() => {
      switch (accountData.ChatOpenFollowStatus) {
        case '相互フォローしています':
          return 'assets/images/avatars/avatar_1.jpg';
        case 'フォローしています':
          return 'assets/images/avatars/avatar_2.jpg';
        case 'フォローされています':
          return 'assets/images/avatars/avatar_3.jpg';
        default:
          return 'assets/images/avatars/avatar_1.jpg'; // デフォルトの画像を指定
      }
    })();

  // テキストが変更されたとき
  const textChange = (e) => {
    const newValue = e.target.value;
    // newValueをセット
    setTextData(newValue);
    console.log("newvalue:"+newValue);
  };

  // 送信ボタンが押されたとき
  const sendClick = () => {
    const newValue = TextData;
    console.log("送信内容は:"+newValue+"です");
    PostChat();
  };

  // 最新のチャットを取得する処理
  const GetChat = () => {

    async function GetData() {

      console.log('チャットデータを取得中...'+getSessionData("accountData").ChatOpenId);
      try {
        // Laravel側からデータを取得
        const response = await axios.get(chat_url, {
          params: {
            MyUserId: MyUserId, // ログイン中のID
            PairUserId: getSessionData("accountData").ChatOpenId // チャット相手のID
          },
        });
        if (response.data !== "null") {
          console.log("チャットのレスポンスは"+JSON.stringify(response.data, null, 2));
          setResponseData(response.data);
        } else {
          console.log("まだチャットしてない");
          setResponseData([]);
        }
      } catch (err) {
        console.log("err:", err);
      }
    }
    // DBからデータを取得
    if (getSessionData("accountData").ChatOpenId) {
      GetData();
    } else {
      console.log("できません");
    }
  };

  // チャットを送信する処理
  const PostChat = () => {
    async function PostData() {
      try {
        console.log("TextData:"+TextData);
        // Laravelにデータを送信
        const response = await axios.post(chat_post_url, {
          MyUserId: MyUserId, // ログイン中のID
          PairUserId: getSessionData("accountData").ChatOpenId, // チャット相手のID
          Message: TextData // メッセージ
        });
        if (response.data) {
          console.log("送信成功しました＿＿＿");
          setTextData("");
        }
      } catch (err) {
        console.log("err:", err);
      }
    }
    // DBからデータを取得
    if (TextData) {
      PostData();
    } else {
      console.log("送信できません");
    }
  };



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
      {(accountData.ChatOpenId) ? (
        // 選択状態
        <Box sx={{
          padding: '5px 0',
          borderBottom: '#DAE2ED 2px solid',
          fontSize: '25px'
          }}>

          {/* 企業名もしくはユーザーネームを表示(企業は企業名、学生はユーザーネーム) */}
          <Tooltip title={
            (accountData.ChatOpenCompanyName ?
             accountData.ChatOpenCompanyName :
             accountData.ChatOpenUserName) + "さんのマイページ"}>
            <Link
              to={`/Profile/${accountData.ChatOpenUserName}`}
            >
              <img src={avatarSrc}

              style={{
                width: '40px',
                height: '40px',
                margin: '0 5px',
                borderRadius: '50%' }}
              />
              {accountData.ChatOpenCompanyName ?
               accountData.ChatOpenCompanyName :
               accountData.ChatOpenUserName}
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
      <Box
      ref={chatBoxscroll} // refを適用
      sx={{
        height:'82%',
        maxHeight: 600,
        overflow: 'auto',
          }}>

    {(ResponseData && ResponseData.length > 0) ? (ResponseData.map((element, index) => (
      // チャット履歴があるとき
      // element.send_user_id(チャットの送信者のid)とMyUserId(自分のid)が一致すれば右側、そうでなければ左側
      <div key={index}>
        <Box
          display="flex"
          justifyContent={element.send_user_id === MyUserId ? 'flex-end' : 'flex-start'}
          mb={2}
        >
          <Paper
            sx={{
              padding: '10px',
              margin:'5px 10px 0px 10px',
              color: element.send_user_id === MyUserId ?'black':'black',
              borderRadius: '10px',
              maxWidth: '60%',
              // 背景色
              bgcolor: element.send_user_id === MyUserId ?'#dbdbff':'#dbdbdb',
              // 背景色(ホバー時)
              '&:hover': {
                bgcolor: element.send_user_id === MyUserId ? 'rgba(199, 199, 255)':'rgba(199, 199, 199)',
              },
            }}
          >
            <Typography variant="body1">
              {/* 改行に対応 */}
              {element.message.split('\n').map((msg, idx) => (
                <React.Fragment key={idx}>
                  {msg}
                  {idx < element.message.split('\n').length - 1 && <br />} {/* 最後の要素以外で改行 */}
                </React.Fragment>
              ))}
            </Typography>
          </Paper>
        </Box>

      </div>
    ))):(
      // チャット履歴がまだないとき
      <div>
        メッセージがありません
      </div>
    )}



      </Box>

      {/****** チャット送信フォーム ******/}
      {(accountData.ChatOpenId) ? (
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
          value={TextData}
          onChange={textChange}
          //label="内容を入力してください"
        />
        <IconButton
            onClick={sendClick}
            sx={{
              '&:hover': { backgroundColor: '#c1e0ff' },
            }}
          >
          <SendIcon
            color="primary"
            sx={{ fontSize: 30, paddingBottom:'14' }}
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