import React from 'react';
import { useEffect, useState, useRef } from "react";
import PropTypes from 'prop-types';
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
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import { green } from '@mui/material/colors';

// import "../css/App.css";


import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
// import InboxIcon from '@mui/icons-material/MoveToInbox';
import PersonIcon from '@mui/icons-material/Person';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import WestIcon from '@mui/icons-material/West';
import EastIcon from '@mui/icons-material/East';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
//import { display } from '@mui/system';

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
  border: 2px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[400]};
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

// フォローリストのコンポーネント
const FollowGroup = ({ title, followStatusCount, followStatus, groupingOpen, handleClick, accountData, chatOpen }) => {
  return (
    <>
      {/* 見出し部分 */}
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <PersonIcon />
          {title === "相互フォロー" && <SyncAltIcon />}
          {title === "フォローしています" && <EastIcon />}
          {title === "フォローされています" && <WestIcon />}
        </ListItemIcon>
        <ListItemText
          primary={
            <Typography sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}>
              {title} ({followStatusCount})
            </Typography>
          }
        />
        {groupingOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>

      {/* フォローリスト部分 */}
      <Collapse in={groupingOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {/* ユーザーリスト */}
          {followStatus.map((element) => (
            <ListItemButton
              key={element.id}
              sx={{
                pl: 4,
                background: element.id === accountData.ChatOpenId ? '#cce5ff' : 'initial',
                '&:hover': {
                  background: element.id === accountData.ChatOpenId ? '#cce5ff' : '#eee',
                },
              }}
              onClick={() => chatOpen(element)}>
              {/* アイコン */}
              <ListItemIcon>
                <img
                  src={element.icon ?
                    `http://localhost:8000/storage/images/userIcon/${element.icon}` :
                    'assets/images/avatars/avatar_4.jpg'}
                  alt={element.user_name}
                  style={{ width: '40px', height: '40px', borderRadius: '50%', border: '3px solid #bbb' }}
                />
              </ListItemIcon>
              {/* ユーザー名 */}
              <ListItemText primary={element.company_name ? element.company_name : element.user_name} />
            </ListItemButton>
          ))}
        </List>
      </Collapse>
    </>
  );
};

const ChatView = () => {

  const [GroupingOpen_1, setGroupingOpen_1] = React.useState(true);
  const [GroupingOpen_2, setGroupingOpen_2] = React.useState(true);
  const [GroupingOpen_3, setGroupingOpen_3] = React.useState(true);

  const [FollowStatus_1, setFollowStatus_1] = useState([]);
  const [FollowStatus_2, setFollowStatus_2] = useState([]);
  const [FollowStatus_3, setFollowStatus_3] = useState([]);

  const [FollowStatusCount_1, setFollowStatusCount_1] = useState(null);
  const [FollowStatusCount_2, setFollowStatusCount_2] = useState(null);
  const [FollowStatusCount_3, setFollowStatusCount_3] = useState(null);

  const groupinghandleClick_1 = () => {
    setGroupingOpen_1(!GroupingOpen_1);
  };
  const groupinghandleClick_2 = () => {
    setGroupingOpen_2(!GroupingOpen_2);
  };
  const groupinghandleClick_3 = () => {
    setGroupingOpen_3(!GroupingOpen_3);
  };
  // セッションストレージ
  const { getSessionData , updateSessionData } = useSessionStorage();
  // セッションストレージからaccountDataを取得し、idを初期値として設定(ログイン中のIDを取得)
  const [accountData, setAccountData] = useState(getSessionData("accountData"));

  // ログイン中のid
  const MyUserId = accountData.id;

  // DBからのレスポンスが入る変数(リスト)
  const [ResponseChannelListData, setResponseChannelListData] = useState([]);

  // DBからのレスポンスが入る変数(チャット)
  const [ResponseData, setResponseData] = useState([]);

  // ポップメニューの変数設定
  const [popMenuId, setPopMenuId] = useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const anchorElOpen = Boolean(anchorEl);

  // デフォルトでチャットを一番下にスクロールする
  const chatBoxscroll = useRef(null);
  // スクロールの高さが変わったときに、元のスクロールの高さを保持しておく
  const [prevScrollHeight, setPrevScrollHeight] = useState(0);

  // テキストの文章を保持する変数
  const [TextData, setTextData] = useState(null);

  // useStateだと無限ループが発生するためletで初期値設定
  // メッセージの送信日時を記憶しておく
  let PrevChatDate = null;

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

  // Laravelとの通信用URL
  const get_channel_list = "http://localhost:8000/get_channel_list";
  const get_chat = "http://localhost:8000/get_chat";
  const post_chat = "http://localhost:8000/post_chat";
  const delete_chat = "http://localhost:8000/delete_chat";
  const already_read_chat = "http://localhost:8000/already_read_chat";

  // ResponseChannelListDataが変化したとき
  useEffect(() => {
    async function GetData() {
      try {
        // Laravel側からデータを取得
        const response = await axios.get(get_channel_list, {
          params: {
            MyUserId: MyUserId, //ログイン中のID
          },
        });
        if (response) {
          console.log(response.data);
          setResponseChannelListData(response.data);
          // follow_statusが「相互フォローしています」の相手はfollow_item_1に入れる
          const follow_item_1 = response.data.filter(item => item.follow_status === '相互フォローしています');
          setFollowStatus_1(follow_item_1);
          setFollowStatusCount_1(follow_item_1.length);
          // follow_statusが「相互フォローしています」の相手はfollow_item_2に入れる
          const follow_item_2 = response.data.filter(item => item.follow_status === 'フォローしています');
          setFollowStatus_2(follow_item_2);
          setFollowStatusCount_2(follow_item_2.length);
          // follow_statusが「相互フォローしています」の相手はfollow_item_3に入れる
          const follow_item_3 = response.data.filter(item => item.follow_status === 'フォローされています');
          setFollowStatus_3(follow_item_3);
          setFollowStatusCount_3(follow_item_3.length);

        }
      } catch (err) {
        console.log("err:", err);
        alert("フォロワーがいません");
      }
    }
    // DBからデータを取得
    if (MyUserId) {
      GetData();
    }
  }, [ResponseChannelListData]);

  // ListItemButtonが押された時の処理
  const ChatOpen = (element) => {

    // element.idが存在するときのみ実行
    element.id && updateSessionData("accountData", "ChatOpenId", element.id);
    // element.user_nameが存在するときのみ実行
    element.user_name && updateSessionData("accountData", "ChatOpenUserName", element.user_name);
    // element.company_nameが存在するときのみ実行
    element.company_name && updateSessionData("accountData", "ChatOpenCompanyName", element.company_name);
    // element.iconが存在するときのみ実行
    element.icon ? updateSessionData("accountData", "ChatOpenIcon", element.icon) : updateSessionData("accountData", "ChatOpenIcon", "");
    // element.follow_statusが存在するときのみ実行
    element.follow_status && updateSessionData("accountData", "ChatOpenFollowStatus", element.follow_status);

   };

  // 1回のみ実行(1秒単位でデータを取得)
  useEffect(() => {
    // セッションストレージ取得
    setAccountData(getSessionData("accountData"));
    GetChat();
    // チャットのスクロールを下にする
    scrollToBottom();
    const interval = setInterval(() => {
     // セッションストレージ取得
    setAccountData(getSessionData("accountData"));
    GetChat();
    // 既読をつける
    AlreadyReadChat(accountData.ChatOpenId);
    }, 3000);

    // コンポーネントがアンマウントされたらintervalをクリア
    return () => clearInterval(interval);
  }, []);



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
    // チャットのスクロールを下にする
    scrollToBottom();
  };

  // 最新のチャットを取得する処理
  const GetChat = () => {
    async function GetData() {
      console.log('チャットデータを取得中...'+getSessionData("accountData").ChatOpenId);
      try {
        // Laravel側からデータを取得
        const response = await axios.get(get_chat, {
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
        const response = await axios.post(post_chat, {
          MyUserId: MyUserId, // ログイン中のID
          PairUserId: getSessionData("accountData").ChatOpenId, // チャット相手のID
          Message: TextData // メッセージ
        });
        if (response.data) {
          console.log("送信成功しました");
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

  // チャットを削除する処理
  const DeleteChat = (id) => {
    async function PostData() {
      try {
        console.log("TextData:");

        const response = await axios.post(delete_chat, {
          Id: id, // ログイン中のID
        });
        if (response.data) {
          console.log("チャットの削除に成功しました");
        }
      } catch (err) {
        console.log("err:", err);
      }
    }
    // DBからデータを取得
    if (id) {
      PostData();
    }
  };

  // 既読をつける処理
  const AlreadyReadChat = (id) => {
    async function PostData() {
      try {
        console.log("TextData:");

        const response = await axios.post(already_read_chat, {
          MyUserId: MyUserId, //ログイン中のID
          PairUserId: id, // 相手のID
        });
        if (response.data) {
          console.log("チャットの既読に成功しました");
        }
      } catch (err) {
        console.log("err:", err);
      }
    }
    // DBからデータを取得
    if (id) {
      PostData();
    }
  };


  // 送信時間から日にちを取り出す関数

  const GetDay = (time) => {
    // 日付部分を切り取る
    const ChatDate = time.slice(0, 10); // "2024-10-07" などを取得
    if(PrevChatDate && PrevChatDate === ChatDate){
      // 前のデータと日付が同じ場合は、日付を表示しないのでreturnで空文字列を返す
      return "";
    }
    // メッセージの送信日時を更新しておく
    PrevChatDate = ChatDate;

    const [year, month, day] = ChatDate.split('-'); // 年、月、日を分割
    console.log("テストですテストですテストですテストです"+year);
    // 月と日を整数に変換し、形式を整える
    const formattedDate = `${parseInt(month, 10)}月${parseInt(day, 10)}日`; // "10月7日"

    // 曜日を取得
    const date = new Date(`${ChatDate}T00:00:00+09:00`); // UTCからDateオブジェクトに変換
    const options = { weekday: 'long' }; // 曜日のオプション
    const dayOfWeek = date.toLocaleDateString('ja-JP', options); // 日本語の曜日を取得

    return `${formattedDate} (${dayOfWeek})`; // "10月7日 (日曜日)" の形式で返す
  };

  // 送信時間から時:分だけを取り出す関数
  const GetTime = (time) => {
    // 文字列を切り取って時間と分を取得
    const timeString = time.slice(11, 16); // "14:07" などを取得

    // timeStringの最初の2文字を取得
    let hour = timeString.slice(0, 2); // "14" の場合、"14" を取得

    // 最初の文字が 0 の場合は切り取る
    if (hour.startsWith('0')) {
      hour = hour.slice(1); // "14" なら "4" になる
    }

    return `${hour}:${timeString.slice(3)}`; // 分はそのまま返す
  };

  // チャットのスクロールを下にする関数
  const scrollToBottom = () => {
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
  };

  ///////////////////// ポップメニューの処理 /////////////////////
  // 開く
  const popMenu = (e) => {
    setAnchorEl(e.currentTarget);
    // PopMenuIdを上書きする
    setPopMenuId(e.currentTarget.id);
    console.log("e.idは"+e.currentTarget.id);
  };
  // 閉じる
  const popMenuClose = () => {
    setAnchorEl(null);
  };
  // 削除
  const popMenuDelete = (id) => {
    if (confirm("チャットを削除してよろしいですか？")) {
      // OK（はい）が押された場合の処理
      // 関数呼び出し
      DeleteChat(id);
      // アラート
      alert("チャットを削除しました。");
      // リロード
      window.location.reload();
    } else {
      // キャンセル（いいえ）が押された場合の処理
    }
  };


  return (
    <div style={{
      display: 'flex'
      }}>
    <List
      sx={(theme) => ({
        width: 360,
        height: '80%',
        marginLeft: '0', // デフォルトは0に設定
        bgcolor: 'background.paper',
        maxHeight: 500,  // スクロール可能な最大の高さ
        overflow: 'auto', // 自動でスクロールバーを表示
        border: '#DAE2ED 2px solid',
        borderRadius: '10px',
        [theme.breakpoints.down('1200')]: { // 1200px以下のとき
          marginLeft: '2%',
        },
      })}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        // ヘッダー
        <ListSubheader component="div" id="nested-list-subheader">
          チャット
        </ListSubheader>
      }
    >

      <FollowGroup
        title="相互フォロー"
        followStatusCount={FollowStatusCount_1}
        followStatus={FollowStatus_1}
        groupingOpen={GroupingOpen_1}
        handleClick={groupinghandleClick_1}
        accountData={accountData}
        chatOpen={ChatOpen}
      />

      <FollowGroup
        title="フォローしています"
        followStatusCount={FollowStatusCount_2}
        followStatus={FollowStatus_2}
        groupingOpen={GroupingOpen_2}
        handleClick={groupinghandleClick_2}
        accountData={accountData}
        chatOpen={ChatOpen}
      />

      <FollowGroup
        title="フォローされています"
        followStatusCount={FollowStatusCount_3}
        followStatus={FollowStatus_3}
        groupingOpen={GroupingOpen_3}
        handleClick={groupinghandleClick_3}
        accountData={accountData}
        chatOpen={ChatOpen}
      />


    </List>

    <div style={{
      width: 1200,
      height: 'auto',
      maxHeight: 700,
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
        maxHeight: 700,
        overflow: 'auto',
          }}>

    {(ResponseData && ResponseData.length > 0) ? (ResponseData.map((element, index) => (
      // チャット履歴があるとき
      // element.send_user_id(チャットの送信者のid)とMyUserId(自分のid)が一致すれば右側、そうでなければ左側
      <div key={index}>

        <Typography
          display="flex"
          justifyContent="center"
          variant="caption"
          component="div"
          sx={{
            margin: '0 10px',
            position: 'sticky',
            top: '0',
            backgroundColor: '#F9FAFB',
            zIndex: 1,
            fontSize: '16px'
          }}
        >
          {GetDay(element.send_datetime)}
        </Typography>

        {element.check_read !== '削除' ? (
          <>
            <Typography
              display="flex"
              justifyContent={element.send_user_id === MyUserId ? 'flex-end' : 'flex-start'}
              variant="caption"
              component="div"
              sx={{
                margin:'5px 15px 0 65px'
                }}>
              {GetTime(element.send_datetime)}
            </Typography>

            <Box
              display="flex"
              justifyContent={element.send_user_id === MyUserId ? 'flex-end' : 'flex-start'}
              sx={{
                margin:0
                }}
              mb={2}
            >
            {/* アイコン (相手のメッセージのみ) */}
            {(element.send_user_id !== MyUserId)?(
            <img src={avatarSrc}
            style={{
              width: '40px',
              height: '40px',
              margin: '0 10px',
              borderRadius: '50%' }}
            />
            ):(null)}
            {/* 既読マーク (自分のメッセージのみ) */}
            {(element.send_user_id === MyUserId && element.check_read === '既読')?(
              <Box
              display="flex"
              justifyContent="flex-end"
              alignItems="flex-end"
              sx={{
                margin:'0 5px 10px 0'
              }}><Tooltip title={"既読"}>
                <CheckIcon sx={{ color: green[500] ,fontSize: 20 }}/>
                </Tooltip>
              </Box>
            ):(
             null)}

              <Paper
                id={element.id}
                aria-controls={anchorElOpen ? 'demo-positioned-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={anchorElOpen ? 'true' : undefined}
                onClick={element.send_user_id === MyUserId ? (e) => popMenu(e) : null}
                sx={{
                  padding: '10px',
                  margin:element.send_user_id === MyUserId ?'0 10px 10px 0':'0 0 10px 0',
                  color: 'black',
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

            {/* チャットのメッセージを押したときのメニュー (自分のメッセージのみ) */}
            {(element.send_user_id === MyUserId)?(
              <Menu
                id="demo-positioned-menu"
                aria-labelledby="demo-positioned-button"
                anchorEl={anchorEl}
                open={anchorElOpen}
                onClose={popMenuClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
                <MenuItem onClick={popMenuClose}><EditIcon />&nbsp;編集</MenuItem>
                <MenuItem onClick={() => popMenuDelete(popMenuId)} sx={{color:'red'}}><DeleteIcon color="error"/>&nbsp;削除</MenuItem>
              </Menu>
            ):(null)}


          </>
          ) : (
            <Typography
              variant="caption"
              justifyContent={element.send_user_id === MyUserId ? 'flex-end' : 'flex-start'}
              sx={{
                margin: '10px',
                color: 'gray',
                display:'flex',
                }}>
              このメッセージは削除されました
            </Typography>
          )}
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
          //label="メッセージを入力"
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
    </div>
  )
}

// PropTypesの定義
FollowGroup.propTypes = {
  title: PropTypes.string.isRequired,
  followStatusCount: PropTypes.number.isRequired,
  followStatus: PropTypes.arrayOf(PropTypes.object).isRequired,
  groupingOpen: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
  accountData: PropTypes.object.isRequired,
  chatOpen: PropTypes.func.isRequired,
};

export default ChatView;