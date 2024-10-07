import { useEffect, useState } from "react";
import axios from "axios";
import { useSessionStorage } from "src/hooks/use-sessionStorage";


// import "../css/App.css";

import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
// import InboxIcon from '@mui/icons-material/MoveToInbox';
import PersonIcon from '@mui/icons-material/Person';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import WestIcon from '@mui/icons-material/West';
import EastIcon from '@mui/icons-material/East';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
//import StarBorder from '@mui/icons-material/StarBorder';

export default function ChatPartnerList() {

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

    // DBからのレスポンスが入る変数
  const [ResponseChannelListData, setResponseChannelListData] = useState([]);
  //const [ResponseChatData, setResponseChatData] = useState([]);

  // セッションストレージ取得
  const { getSessionData, updateSessionData } = useSessionStorage();

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

  return (
    <List
      sx={(theme) => ({
        width: '100%',
        height: '80%',
        maxWidth: 360,
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

      {/****** 相互フォローのフォローリスト ******/}

      {/* 見出し部分 */}
      <ListItemButton onClick={groupinghandleClick_1}>
        <ListItemIcon>
          <PersonIcon />
          <SyncAltIcon />
        </ListItemIcon>
        {/* フォロー状態をグループ化 */}
        <ListItemText
         primary={
          <Typography sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}>
            相互フォロー ({FollowStatusCount_1})
          </Typography>
         }
         />
        {GroupingOpen_1 ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>

      {/* フォローリスト部分(相互フォロー) */}
      <Collapse in={GroupingOpen_1} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>

        {/* 相互フォロー関係にあるユーザーをすべて取得 */}
        {FollowStatus_1.map((element) => (
          <ListItemButton
          key={element.id}
          sx={{
            pl: 4,
            // 選択中なら色付け
            background: element.id === accountData.ChatOpenId ? '#cce5ff' : 'initial',
            '&:hover': {
              background: element.id === accountData.ChatOpenId ? '#cce5ff' : '#eee',
            },
          }}
          onClick={() => ChatOpen(element)}>
            {/* アイコン */}
            <ListItemIcon>
            <img src={element.icon ?
              `http://localhost:8000/storage/images/userIcon/${element.icon}` :
              'assets/images/avatars/avatar_1.jpg'}
              alt={element.user_name}
              style={{ width: '40px', height: '40px', borderRadius: '50%', border: '3px solid #bbb'}}
              />
            </ListItemIcon>
            {/* ユーザー名 */}
            <ListItemText primary={element.company_name ? element.company_name : element.user_name} />
          </ListItemButton>
        ))}
        </List>
      </Collapse>


      {/****** フォローしていますのフォローリスト ******/}

      {/* 見出し部分 */}
      <ListItemButton onClick={groupinghandleClick_2}>
        <ListItemIcon>
          <PersonIcon />
          <EastIcon />
        </ListItemIcon>
        {/* フォロー状態をグループ化 */}
        <ListItemText
         primary={
          <Typography sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}>
            フォローしています ({FollowStatusCount_2})
          </Typography>
         }
         />
        {GroupingOpen_2 ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>

      {/* フォローリスト部分(フォローしています) */}
      <Collapse in={GroupingOpen_2} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>

        {/* フォローのみのユーザーをすべて取得 */}
        {FollowStatus_2.map((element) => (
          <ListItemButton
          key={element.id}
          sx={{
            pl: 4,
            // 選択中なら色付け
            background: element.id === accountData.ChatOpenId ? '#cce5ff' : 'initial',
            '&:hover': {
              background: element.id === accountData.ChatOpenId ? '#cce5ff' : '#eee',
            },
          }}
          onClick={() => ChatOpen(element)}>
            {/* アイコン */}
            <ListItemIcon>
            <img src={element.icon ?
              `http://localhost:8000/storage/images/userIcon/${element.icon}` :
              'assets/images/avatars/avatar_2.jpg'}
              alt={element.user_name}
              style={{ width: '40px', height: '40px', borderRadius: '50%', border: '3px solid #bbb'}}
              />
            </ListItemIcon>
            {/* ユーザー名 */}
            <ListItemText primary={element.company_name ? element.company_name : element.user_name} />
          </ListItemButton>
        ))}

        </List>
      </Collapse>

      {/****** フォローされていますのフォローリスト ******/}

      {/* 見出し部分 */}
      <ListItemButton onClick={groupinghandleClick_3}>
        <ListItemIcon>
          <PersonIcon />
          <WestIcon />
        </ListItemIcon>
        {/* フォロー状態をグループ化 */}
        <ListItemText
         primary={
          <Typography sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}>
            フォローされています ({FollowStatusCount_3})
          </Typography>
         }
         />
        {GroupingOpen_3 ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>

      {/* フォローリスト部分(フォローされています) */}
      <Collapse in={GroupingOpen_3} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>

        {/* 相互フォロー関係にあるユーザーをすべて取得 */}
        {FollowStatus_3.map((element) => (
          <ListItemButton
          key={element.id}
          sx={{
            pl: 4,
            // 選択中なら色付け
            background: element.id === accountData.ChatOpenId ? '#cce5ff' : 'initial',
            '&:hover': {
              background: element.id === accountData.ChatOpenId ? '#cce5ff' : '#eee',
            },
          }}
          onClick={() => ChatOpen(element)}>
            {/* アイコン */}
            <ListItemIcon>
            <img src={element.icon ?
              `http://localhost:8000/storage/images/userIcon/${element.icon}` :
              'assets/images/avatars/avatar_3.jpg'}
              alt={element.user_name}
              style={{ width: '40px', height: '40px', borderRadius: '50%', border: '3px solid #bbb'}}
              />
            </ListItemIcon>
            {/* ユーザー名 */}
            <ListItemText primary={element.company_name ? element.company_name : element.user_name} />
          </ListItemButton>
        ))}

        </List>
      </Collapse>


    </List>
  );
}
