import React from 'react';
import { useLocation } from 'react-router-dom';
import { useEffect, useState, useRef } from "react";
import PropTypes from 'prop-types';
import axios from "axios";
import { useSessionStorage } from "src/hooks/use-sessionStorage";
import { Link } from "react-router-dom";
import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
import { styled } from '@mui/material/styles';
import { ColorRing } from "react-loader-spinner";

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from "@mui/material/Typography";
import SendIcon from '@mui/icons-material/Send';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import Modal from '@mui/material/Modal';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import { green } from '@mui/material/colors';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import PersonIcon from '@mui/icons-material/Person';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import WestIcon from '@mui/icons-material/West';
import EastIcon from '@mui/icons-material/East';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';


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
const FollowGroup = ({
  title,
  followStatusCount,
  followStatus,
  groupingOpen,
  handleClick,
  chatViewId,
  chatOpen }) => {
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
                background: element.id === chatViewId ? '#cce5ff' : 'initial',
                '&:hover': {
                  background: element.id === chatViewId ? '#cce5ff' : '#eee',
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
              <Box>
                {element.unread !== 0 ? (
                  <Box
                    sx={{
                      backgroundColor: '#ff6060',   // バッジの背景色
                      color: 'white',           // テキスト色
                      borderRadius: '50%',      // 丸いデザインにする
                      width: '22px',            // 幅を小さくする
                      height: '22px',           // 高さを小さくする
                      display: 'flex',          // 中央揃えのためにflexを使う
                      justifyContent: 'center', // 中央揃え
                      alignItems: 'center',     // 中央揃え
                      fontSize: '13px',         // フォントサイズを小さくする
                    }}
                  >
                    {element.unread} {/* ①のような表示 */}
                  </Box>
                ) : (
                  ""
                )}
            </Box>
            </ListItemButton>
          ))}
        </List>
      </Collapse>
    </>
  );
};

// 「ここから未読」のコンポーネント
const UnreadStart = () => {
  return (
    <Typography
      display="flex"
      justifyContent="center"
      alignItems="center"
      variant="caption"
      component="div"
      sx={{
        position: 'relative',
        margin: '0 10px',
        backgroundColor: '#F9FAFB',
        zIndex: 1,
        fontSize: '13px',
        '&::before': {
          content: '""',
          position: 'absolute',
          left: 0,
          top: '50%',
          width: '45%',
          borderBottom: '1px dashed #000',
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          right: 0,
          top: '50%',
          width: '45%',
          borderBottom: '1px dashed #000',
        },
      }}
    >
      ここから未読
    </Typography>
  );
};

// モーダルのコンポーネント
const ChatEditModal = ({
  modalOpen,
  handleModalClose,
  chatEditData,
  chatEditChange,
  chatEditUpDate }) => {
  return(
    <Modal
        open={modalOpen}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
    >
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        bgcolor: 'background.paper',
        border: '2px solid #DAE2ED',
        borderRadius: '10px',
        boxShadow: 24,
        p: 4,}}>

        <Typography
          id="modal-modal-title"
          variant="h6"
          sx={{
            mb: 0.5,
          }}>
          チャットの編集
        </Typography>

        <Textarea
          multiline
          minRows={1} // 最小行数を設定
          maxRows={4} // 最大行数を設定
          sx={{
            height: '100%', // 親要素の高さの50%に設定
            width: '100%', // 必要に応じて幅を調整
            fontSize: '1rem',
          }}
          InputProps={{
            sx: {
              height: '100%' // TextFieldの内部要素も親の高さに合わせる
            }
          }}
          value={chatEditData}
          onChange={chatEditChange}
        />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            mt: 0.5,
          }}
        >
          <Button
          variant="text"
          sx={{ marginRight: '10px' }}
          onClick={handleModalClose}
          >
            キャンセル
          </Button>
          <Button
          variant="contained"
          size="medium"
          onClick={chatEditUpDate}
          >
            更新
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

// メインのコンポーネント
const ChatView = () => {

  /// セッションストレージ取得
  const { getSessionData , updateSessionData } = useSessionStorage();
  /// セッションストレージからaccountDataを取得し、idを初期値として設定(ログイン中のIDを取得)
  const [accountData, setAccountData] = useState(getSessionData("accountData"));

  // フォローリストのグループ化を管理する変数
  const [GroupingOpen_1, setGroupingOpen_1] = React.useState(true);
  const [GroupingOpen_2, setGroupingOpen_2] = React.useState(true);
  const [GroupingOpen_3, setGroupingOpen_3] = React.useState(true);

  // フォローリストのネストをクリックしたときの処理
  const groupinghandleClick_1 = () => {
    setGroupingOpen_1(!GroupingOpen_1);
  };
  const groupinghandleClick_2 = () => {
    setGroupingOpen_2(!GroupingOpen_2);
  };
  const groupinghandleClick_3 = () => {
    setGroupingOpen_3(!GroupingOpen_3);
  };

  // フォロー状態を管理
  const [FollowStatus_1, setFollowStatus_1] = useState([]);
  const [FollowStatus_2, setFollowStatus_2] = useState([]);
  const [FollowStatus_3, setFollowStatus_3] = useState([]);

  // フォロー状態を管理
  const [FollowStatusCount_1, setFollowStatusCount_1] = useState(null);
  const [FollowStatusCount_2, setFollowStatusCount_2] = useState(null);
  const [FollowStatusCount_3, setFollowStatusCount_3] = useState(null);

  // チャットに表示するユーザー名やアイコンなどを管理する変数
  // chatViewIdはチャットの取得に必須
  const [chatViewId, setChatViewId] = useState(accountData.ChatOpenId ? accountData.ChatOpenId : null);
  const [chatViewUserName, setChatViewUserName] = useState(accountData.ChatOpenUserName ? accountData.ChatOpenUserName : null);
  const [chatViewCompanyName, setChatViewCompanyName] = useState(accountData.ChatOpenCompanyName ? accountData.ChatOpenCompanyName : null);
  const [chatViewIcon, setChatViewIcon] = useState(accountData.ChatOpenIcon ? accountData.ChatOpenIcon : null);
  const [chatViewFollowStatus, setChatViewFollowStatus] = useState(accountData.ChatOpenFollowStatus ? accountData.ChatOpenFollowStatus : null);


  /// ログイン中のidが入る変数
  const MyUserId = accountData.id;

  /// DBからのレスポンスが入る変数(リスト)
  const [ResponseChannelListData, setResponseChannelListData] = useState([]);

  /// DBからのレスポンスが入る変数(チャット)
  const [ResponseData, setResponseData] = useState([]);

  // ポップメニューの変数設定
  const [popMenuId, setPopMenuId] = useState(null);
  const [popMenuMessage, setPopMenuMessage] = useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const anchorElOpen = Boolean(anchorEl);

  // モーダルの変数設定
  const [modalOpen, setModalOpen] = React.useState(false);
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  // デフォルトでチャットを一番下にスクロールする
  const chatBoxscroll = useRef(null);
  // スクロールの高さが変わったときに、元のスクロールの高さを保持しておく
  const [prevScrollHeight, setPrevScrollHeight] = useState(0);
  // テキストの文章を保持する変数
  const [TextData, setTextData] = useState(null);

  // テキストの文章を保持する変数(モーダル)
  const [chatEditData, setChatEditData] = useState(null);

  // 外部からのリンクでチャットを開けるよう、パラメータを取得する。
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const ParamsuserName = searchParams.get('userName');

  // useStateだと無限ループが発生するためletで初期値設定
  // 「ここから未読」の位置を保持する変数
  let unreadMessageFlag = false;
  let unreadid = accountData.GetStartUnread ? accountData.GetStartUnread : 0;

  // useStateだと無限ループが発生するためletで初期値設定
  // メッセージの送信日時を記憶しておく
  let PrevChatDate = null;

  // チャットアイコンの設定
  const avatarSrc = chatViewIcon
  ? `http://localhost:8000/storage/images/userIcon/${chatViewIcon}`
  : (() => {
      switch (chatViewFollowStatus) {
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
  const update_chat = "http://localhost:8000/update_chat";

  /// ResponseChannelListDataが変化したとき
  /// フォローリストを作成
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
          console.log(JSON.stringify(response, null, 2));
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
    // ResponseChannelListDataが存在しているか確認
    if (ResponseChannelListData && ResponseChannelListData.length > 0) {

      ResponseChannelListData.forEach((item) => {
        if (item.user_name === ParamsuserName) {
            // element.idが存在するときのみ実行
            if (item.id) {
              updateSessionData("accountData", "ChatOpenId", item.id);
              setChatViewId(item.id);
            }
            if (item.user_name) {
              updateSessionData("accountData", "ChatOpenUserName", item.user_name);
              setChatViewUserName(item.user_name);
            }
            if (item.company_name) {
              updateSessionData("accountData", "ChatOpenCompanyName", item.company_name);
              setChatViewCompanyName(item.company_name);
            }
            if (item.icon) {
              updateSessionData("accountData", "ChatOpenIcon", item.icon);
              setChatViewIcon(item.icon);
            } else {
              updateSessionData("accountData", "ChatOpenIcon", "");
            }
            if (item.follow_status) {
              updateSessionData("accountData", "ChatOpenFollowStatus", item.follow_status);
              setChatViewFollowStatus(item.follow_status);
            }
        } else {
          // 見つからない場合、404ページにリダイレクト
          location.href = "/404";
        }
      });
    }
  }, [ResponseChannelListData]);

  /// 一番最初に実行(「ここから未読」の位置を記憶しておくGetStartUnreadを初期化しておく)
  useEffect(() => {
    updateSessionData("accountData", "GetStartUnread", 0);
    updateSessionData("accountData", "Commit", false);
  }, []);

  /// 1回のみ実行(1秒単位でデータを取得)
  useEffect(() => {
    // セッションストレージ取得
    setAccountData(getSessionData("accountData"));
    GetChat(chatViewId);
    // チャットのスクロールを下にする
    scrollToBottom();
    const interval = setInterval(() => {
     // セッションストレージ取得
    setAccountData(getSessionData("accountData"));
    console.log("passing222__"+chatViewId);
    GetChat(chatViewId);
    // 既読をつける
    AlreadyReadChat(chatViewId);

    }, 2000);

    // コンポーネントがアンマウントされたらintervalをクリア
    return () => clearInterval(interval);
  }, [chatViewId]);

  // chatEditDataが変更されたとき
  useEffect(() => {
    updateSessionData("accountData", "ChatEditData", chatEditData);
  }, [chatEditData]);

  /// ListItemButtonが押された時の処理
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

  // 現在のURLのクエリパラメータを削除する
  window.history.replaceState(null, null, window.location.pathname);

  // ページをリロードする
  window.location.reload();
  };


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

  /// 最新のチャットを取得する処理
  const GetChat = (id) => {
    async function GetData() {
      console.log('チャットデータを取得中...'+id);

      try {
        // Laravel側からデータを取得
        const response = await axios.get(get_chat, {
          params: {
            MyUserId: MyUserId, // ログイン中のID
            PairUserId: id // チャット相手のID
          },
        });
        if (response.data !== "null") {
          //console.log("チャットのレスポンスは"+JSON.stringify(response.data, null, 2));
          setResponseData(response.data);

        } else {
          console.log("まだチャットしてない");
          setResponseData("null");
        }
      } catch (err) {
        console.log("err:", err);

      }
    }
    // DBからデータを取得
    if (id) {
      GetData();
    } else {
      console.log("できません");
    }
  };

  /// チャットを送信する処理
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
          updateSessionData("accountData", "GetStartUnread", 0);
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

  /// チャットを削除する処理
  const DeleteChat = (id) => {
    async function PostData() {
      try {
        console.log("TextData:");
        const response = await axios.post(delete_chat, {
          Id: id, // ログイン中のID
        });
        if (response.data) {
          console.log("チャットの削除に成功しました");
          // 削除状態終了
          // 3秒遅延させて実行
          setTimeout(() => {
            updateSessionData("accountData", "Commit", false);
          }, 3000);
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

  /// 既読をつける処理
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

  /// チャットを更新する処理
  const UpDateChat = () => {
    async function PostData() {
      try {
        const response = await axios.post(update_chat, {
          Id: getSessionData("accountData").ChatEditId, // チャットのid
          Data: getSessionData("accountData").ChatEditData, // チャットの内容
        });
        if (response.data) {
          console.log("チャットの既読に成功しました");
          // 更新状態終了
          // 3秒遅延させて実行
          setTimeout(() => {
            updateSessionData("accountData", "Commit", false);
          }, 3000);
        }
      } catch (err) {
        console.log("err:", err);
      }
    }
    // DBからデータを取得

    PostData();

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
    console.log(year);
    // 月と日を整数に変換し、形式を整える
    const formattedDate = `${parseInt(month, 10)}月${parseInt(day, 10)}日`; // "10月7日"

    // 曜日を取得
    const date = new Date(`${ChatDate}T00:00:00+09:00`); // UTCからDateオブジェクトに変換
    const options = { weekday: 'long' }; // 曜日のオプション
    const dayOfWeek = date.toLocaleDateString('ja-JP', options); // 日本語の曜日を取得

    return `${formattedDate} (${dayOfWeek})`; // 返り値(例: 10月7日 (日曜日) )
  };

  // 送信時間から時:分だけを取り出す関数
  const GetTime = (time) => {

    // 文字列を切り取って時間と分を取得
    const timeString = time.slice(11, 16);

    // timeStringの最初の2文字を取得
    let hour = timeString.slice(0, 2);

    // 最初の文字が 0 の場合は切り取る
    if (hour.startsWith('0')) {
      hour = hour.slice(1);
    }

    return `${hour}:${timeString.slice(3)}`; // 返り値
  };

  // 「ここから未読」を表示する関数
  const GetStartUnread = (read,id) => {

    if (read === "未読" && unreadMessageFlag === false) {
      /* 1度きりの表示なので2回目以降は出さないようにする。
         ただし、チャット自体はリアルタイムで更新するので、
         リロードがかかるまでは表示できるようにしておく。 */
      unreadMessageFlag = true;
      unreadid = id;
      updateSessionData("accountData", "GetStartUnread", unreadid);
    }
    // 「ここから未読」を表示
    if(unreadid === id){
      // コンポーネント呼び出し
      return <UnreadStart />;
    }

    return "";
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

      // scrollHeightが変わったときのみスクロール
      // リアルタイムで情報を取得するためgetSessionData("accountData")から取得する
      if (currentScrollHeight !== prevScrollHeight && getSessionData("accountData").Commit === false) {
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

  // onChange={chatEditChange}で実行
  const chatEditChange = (e) => {
    const newValue = e.target.value;
    // newValueをセット
    setChatEditData(newValue);
  };

  ///////////////////// ポップメニューに関する処理 /////////////////////
  // 開く
  const popMenu = (e) => {
    // 変数の上書き
    setAnchorEl(e.currentTarget);
    setPopMenuId(e.currentTarget.id);
    setPopMenuMessage(e.currentTarget.dataset.message);
    setChatEditData(e.currentTarget.dataset.message);
  };
  // 閉じる
  const popMenuClose = () => {
    setAnchorEl(null);
  };

  // チャットの編集(モーダルを開く)
  const popMenuEdit = (id,message) => {
    console.log(id+":"+message);

    // 開いたチャットのidを保存しておく
    updateSessionData("accountData", "ChatEditId", id);
    // モーダルを開く
    handleModalOpen();
    // ポップメニューを閉じる
    popMenuClose();
  };
  // チャットの編集(更新ボタンを押したとき)
  const chatEditUpDate = () => {
    if (confirm("チャットを更新してよろしいですか？")) {
      // OK（はい）が押された場合の処理
      // 更新状態スタート
      updateSessionData("accountData", "Commit", true);

      // 関数呼び出し
      UpDateChat();
      // アラート
      alert("チャットを更新しました。");
      // モーダルを閉じる
      handleModalClose();

    } else {
      // キャンセル（いいえ）が押された場合の処理
    }
  };
  // チャットの削除
  const popMenuDelete = (id) => {
    if (confirm("チャットを削除してよろしいですか？")) {
      // OK（はい）が押された場合の処理

      // 削除状態スタート
      updateSessionData("accountData", "Commit", true);

      // 関数呼び出し
      DeleteChat(id);
      // アラート
      alert("チャットを削除しました。");

      // ポップメニューを閉じる
      popMenuClose();

    } else {
      // キャンセル（いいえ）が押された場合の処理
    }
  };

  return (
    <>
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
        chatViewId={chatViewId}
        chatOpen={ChatOpen}
      />

      <FollowGroup
        title="フォローしています"
        followStatusCount={FollowStatusCount_2}
        followStatus={FollowStatus_2}
        groupingOpen={GroupingOpen_2}
        handleClick={groupinghandleClick_2}
        chatViewId={chatViewId}
        chatOpen={ChatOpen}
      />

      <FollowGroup
        title="フォローされています"
        followStatusCount={FollowStatusCount_3}
        followStatus={FollowStatus_3}
        groupingOpen={GroupingOpen_3}
        handleClick={groupinghandleClick_3}
        chatViewId={chatViewId}
        chatOpen={ChatOpen}
      />


    </List>

    <div style={{
      width: 1200,
      height: 'auto',
      maxHeight: 730,
      marginLeft: '2%',
      marginRight: '2%',
      border: '#DAE2ED 2px solid',
      borderRadius: '10px'}}>

      {/****** チャット編集のモーダル呼び出し ******/}
      <ChatEditModal
        modalOpen={modalOpen}
        handleModalClose={handleModalClose}
        chatEditData={chatEditData}
        chatEditChange={chatEditChange}
        chatEditUpDate={chatEditUpDate}
      />

      {/****** チャット相手のアイコン、名前を表示させる ******/}
      {(chatViewId) ? (
        // 選択状態
        <Box sx={{
          padding: '5px 0',
          borderBottom: '#DAE2ED 2px solid',
          fontSize: '25px'
          }}>

          {/* 企業名もしくはユーザーネームを表示(企業は企業名、学生はユーザーネーム) */}
          <Tooltip title={
            (chatViewCompanyName ?
              chatViewCompanyName :
             chatViewUserName) + "さんのマイページ"}>
            <Link
              to={`/Profile/${chatViewUserName}`}
            >
              <img src={avatarSrc}

              style={{
                width: '40px',
                height: '40px',
                margin: '0 5px',
                borderRadius: '50%' }}
              />
              {chatViewCompanyName ?
               chatViewCompanyName :
               chatViewUserName}
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


          &emsp;←選んでください
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

    {(ResponseData && ResponseData.length > 0 && ResponseData !== "null") ? (ResponseData.map((element, index) => (
      // チャット履歴があるとき
      // element.send_user_id(チャットの送信者のid)とMyUserId(自分のid)が一致すれば右側、そうでなければ左側
      <div key={index}>

        {/* 日にち(毎回表示するわけではない。同じ日にちが2回以上続く場合は省略) */}
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

        {/* ここから未読 */}
        {/* メッセージが相手、かつcheck_readが未読 */}
        {element.send_user_id !== MyUserId ? (
          GetStartUnread(element.check_read,element.id)

        ):(null)}


        {element.check_read !== '削除' ? (
          <>
            {/* 時間 */}
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
                data-message={element.message}
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
                <MenuItem onClick={() => popMenuEdit(popMenuId,popMenuMessage)} ><EditIcon />&nbsp;編集</MenuItem>
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

    ))):(ResponseData === "null") ? (
        // ローディング
        <div>
          メッセージがありません
        </div>
    ):(chatViewId !== null) ? (
      // ローディング
      <div>
        <Box
          sx={{
            marginTop: '20%',
            display: 'flex', // Flexboxを使用
            justifyContent: 'center', // 水平方向中央
            alignItems: 'center', // 垂直方向中央
          }}
        >
          <ColorRing
              style={{
                visible: true,
                margin: "0px",
                height: "10",
                width: "10",
                ariaLabel: "color-ring-loading",
                wrapperClass: "custom-color-ring-wrapper",
                colors:
                ["#e15b64",
                  "#f47e60",
                  "#f8b26a",
                  "#abbd81",
                  "#849b87"]
              }}
            />
        </Box>
      </div>
    ):(null)}



      </Box>

      {/****** チャット送信フォーム ******/}
      {(chatViewId) ? (
      // 選択状態
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        borderTop: '#DAE2ED 2px solid',
        width: '100%',
        height: '10.5%'
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
    </>
  )
}

// PropTypesの定義
FollowGroup.propTypes = {
  title: PropTypes.string.isRequired,
  followStatusCount: PropTypes.number.isRequired,
  followStatus: PropTypes.arrayOf(PropTypes.object).isRequired,
  groupingOpen: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
  chatViewId: PropTypes.object.isRequired,
  chatOpen: PropTypes.func.isRequired,
};
UnreadStart.propTypes = {
};
ChatEditModal.propTypes = {
  modalOpen: PropTypes.bool.isRequired,
  handleModalClose: PropTypes.func.isRequired,
  chatEditData: PropTypes.string.isRequired,
  chatEditChange: PropTypes.func.isRequired,
  chatEditUpDate: PropTypes.func.isRequired,
};

export default ChatView;