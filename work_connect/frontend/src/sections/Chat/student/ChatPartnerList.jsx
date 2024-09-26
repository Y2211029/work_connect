import { useEffect, useState } from "react";
import axios from "axios";
import { useSessionStorage } from "src/hooks/use-sessionStorage";

import "../css/App.css";

import * as React from 'react';
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
import StarBorder from '@mui/icons-material/StarBorder';

export default function ChatPartnerList() {
  const [GroupingOpen_1, setGroupingOpen_1] = React.useState(false);
  const [GroupingOpen_2, setGroupingOpen_2] = React.useState(false);
  const [GroupingOpen_3, setGroupingOpen_3] = React.useState(false);

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
  const { getSessionData } = useSessionStorage();

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
    <List
      sx={{
        width: '100%',
        maxWidth: 360,
        bgcolor: 'background.paper',
        maxHeight: 600,  // スクロール可能な最大の高さ
        overflow: 'auto' // 自動でスクロールバーを表示
      }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          チャット
        </ListSubheader>
      }
    >

      <ListItemButton onClick={groupinghandleClick_1}>
        <ListItemIcon>
          <PersonIcon />
          <SyncAltIcon />
        </ListItemIcon>
        <ListItemText primary="相互フォロー" />
        {GroupingOpen_1 ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={GroupingOpen_1} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>

          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Starred" />
          </ListItemButton>

        </List>
      </Collapse>



      <ListItemButton onClick={groupinghandleClick_2}>
        <ListItemIcon>
          <PersonIcon />
          <EastIcon />
        </ListItemIcon>
        <ListItemText primary="フォローしています" />
        {GroupingOpen_2 ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={GroupingOpen_2} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>

        <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Starred" />
          </ListItemButton>

        </List>
      </Collapse>


      <ListItemButton onClick={groupinghandleClick_3}>
        <ListItemIcon>
          <PersonIcon />
          <WestIcon />
        </ListItemIcon>
        <ListItemText primary="フォローされています" />
        {GroupingOpen_3 ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={GroupingOpen_3} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>

          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="株式会社トランスミッション" />
          </ListItemButton>

        </List>
      </Collapse>


    </List>
  );
}
