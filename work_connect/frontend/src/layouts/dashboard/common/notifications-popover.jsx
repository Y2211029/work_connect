import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
// import { set } from "date-fns";
// import { set, sub } from "date-fns";
// import { faker } from "@faker-js/faker";

import List from "@mui/material/List";
import Badge from "@mui/material/Badge";
// import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
// import Tooltip from "@mui/material/Tooltip";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import Box from "@mui/material/Box";

import { MyContext } from "..";
import { fToNow } from "../../../utils/format-time";

import Iconify from "../../../components/iconify";
import Scrollbar from "../../../components/scrollbar/scrollbar";

import axios from "axios";

import { useSessionStorage } from "src/hooks/use-sessionStorage";

import { WebScokectContext } from "src/layouts/dashboard/index";

// ----------------------------------------------------------------------

// var noticeDeleteFlg = true;

export default function NotificationsPopover() {
  // 通知をクリックしたときに適したページに飛ばす用
  const navigate = useNavigate();

  // laravelから取得した通知を入れる用
  const [NOTIFICATIONS, setNOTIFICATIONS] = useState([]);

  // セッションからログインしているアカウントのデータ取得
  const { getSessionData } = useSessionStorage();
  const accountData = getSessionData("accountData");

  // 表示する用の通知を入れる用
  const [notifications, setNotifications] = useState(NOTIFICATIONS);

  const Display = useContext(MyContext);

  // 通知選択可能状態を管理する用
  const [NoticeSelectMode, setNoticeSelectMode] = useState(false);

  // 未読の件数を取得
  const totalUnRead = notifications.filter(
    (item) => item.isUnRead === true
  ).length;

  // 通知モーダルを開く用
  const [open, setOpen] = useState(null);

  // websocket通信のデータ保存先
  const notificationContext = useContext(WebScokectContext);


  // 通知モーダルを開いたときに動く
  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  // 通知モーダルが閉じたときに動く
  const handleClose = () => {
    setOpen(null);
  };


  // 通知を未読から既読にする命令をLaravelに送信
  async function noticeAlreadyReadFunction() {
    // console.log("NoticeIdNoticeIdNoticeIdNoticeId: ", NoticeId);
    try {
      // 未読通知を既読にする用URL
      const url = "http://localhost:8000/post_notice_already_read";

      // console.log("accountData: ", accountData);
      // Laravel側か通知一覧データを取得
      await axios.post(url, {
        myId: accountData.id,
      });
    } catch (err) {
      console.log("err:", err);
    }
  }

  // 未読の通知をすべて既読状態にする
  const handleMarkAllAsRead = () => {
    // console.log("handleMarkAllAsRead!!!");

    setNotifications(
      notifications.map((notification) => ({
        ...notification,
        isUnRead: false,
      }))
    );

    noticeAlreadyReadFunction();
  };

  // Laravalから取得した通知を一時保存しておく用
  const [NoticeArray, setNoticeArray] = useState([]);
  // const [NoticeId, setNoticeId] = useState([]);
  // const [ResponseData, setResponseData] = useState([]);

  // Laravelから通知データを取得し、NoticeArrayにセットする
  async function noticeListFunction() {
    // console.log("NoticeIdNoticeIdNoticeIdNoticeId: ", NoticeId);
    try {
      // 通知一覧データを取得する用URL
      const url = "http://localhost:8000/get_notice";

      // ログインしているアカウントの情報を取得
      const accountData = getSessionData("accountData");

      // console.log("accountData: ", accountData);
      // Laravel側か通知一覧データを取得
      const response = await axios.get(url, {
        params: {
          myId: accountData.id,
        },
      });

      var noticeData = [];

      noticeData = response.data.filter((value) => {
        return !DeleteNotice.includes(value.id);
      });

      // console.log("!DeleteNotice.includes(value.id):noticeData: ", noticeData);

      setNoticeArray(noticeData);
      // if (noticeDeleteFlg) {
      //   setNoticeArray(noticeData);
      // } else {
      //   noticeDeleteFlg = true;
      // }
    } catch (err) {
      console.log("err:", err);
    }
  }

  useEffect(() => {
    noticeListFunction();
  }, []);

  // 通知監視用
  useEffect(() => {
    console.log("notificationContext.notification", notificationContext.WebSocketState.notification.noticeData);

    let noticeContextDataObject = {};
    noticeContextDataObject = notificationContext.WebSocketState.notification.noticeData;

    console.log("noticeContextDataObject", noticeContextDataObject);

    if(noticeContextDataObject != undefined) {
      if (NoticeArray == undefined) {
        console.log("setNoticeArray(noticeContextDataObject) : undefined");
        console.log("setNoticeArray(noticeContextDataObject) : undefined");
        setNoticeArray(noticeContextDataObject);
      } else {
      console.log("setNoticeArray(noticeContextDataObject) : ", noticeContextDataObject);
      setNoticeArray((prevItems) => {
          return [...prevItems, noticeContextDataObject];  // スプレッド構文で配列を展開して追加
        });
      }
    }

  }, [notificationContext.WebSocketState.notification.noticeData]);

  // useEffect(() => {
  //   console.log("NoticeArray", NoticeArray);
    
  // }, [NoticeArray])
  // Laravelから取得した通知データをもとに表示に適した形に変換する
  useEffect(() => {
    console.log("NoticeArray", NoticeArray);
    // console.log("useEffect[NoticeArray]:NoticeId:", NoticeId);
    // console.log("NoticeArray:", NoticeArray);

    var noticeData = [];

    NoticeArray.map((value) => {
      const id = value.id;
      const title = value.category;

      var description = value.detail;
      if (value.category == "フォロー") {
        if (value.detail == "相互フォロー") {
          if (value.send_user_id[0] == "S") {
            description =
              value.student_name +
              value.student_surname +
              "さんと相互フォローになりました";
          } else if (value.send_user_id[0] == "C") {
            description = value.company_name + "と相互フォローになりました";
          }
        } else if (value.detail == "") {
          if (value.send_user_id[0] == "S") {
            description =
              value.student_name +
              value.student_surname +
              "さんにフォローされました";
          } else if (value.send_user_id[0] == "C") {
            description = value.company_name + "にフォローされました";
          }
        }
      }
      const avatar = `http://localhost:8000/storage/images/userIcon/${value.icon}`; // ここにアイコンのURLを入れる
      const type = "friend_interactive";
      const createdAt = value.created_at;
      // const createdAt = set(new Date(), { hours: 10, minutes: 30 });
      // const isUnRead = value.already_read;
      var isUnRead = true;
      if (value.already_read == 1) {
        isUnRead = false;
      }

      var selectCheckBox = false;
      const findNotice = NOTIFICATIONS.find(
        (NOTIFICATIONS) => NOTIFICATIONS.id === value.id
      );
      if (findNotice != undefined) {
        if (findNotice.selectCheckBox) {
          selectCheckBox = true;
        }
      }

      const userName = value.user_name;

      const oneNoticeData = {
        id: id,
        title: title,
        description: description,
        avatar: avatar,
        type: type,
        createdAt: createdAt,
        isUnRead: isUnRead,
        selectCheckBox: selectCheckBox,
        userName: userName,
      };
      noticeData.push(oneNoticeData);
    });

    // if (noticeDeleteFlg) {
      setNOTIFICATIONS(noticeData);
    // }
  }, [NoticeArray]);

  // 表示するのに適した形になった通知データを表示用配列にセット
  useEffect(() => {
    console.log("NOTIFICATIONS: ", NOTIFICATIONS);
    setNotifications(NOTIFICATIONS);
  }, [NOTIFICATIONS]);

  // 通知モーダルが閉じられたときに未読の通知をすべて既読状態にする
  useEffect(() => {
    // console.log("open!!!");
    if (!open) {
      handleMarkAllAsRead();
    }
  }, [open]);

  const [DeleteNotice, setDeleteNotice] = useState([]);

  useEffect(() => {
    // console.log("DeleteNotice: ", DeleteNotice);

    // console.log("notifications: ", notifications);
    notifications.filter((value) => {
      return value.isUnRead == true && !DeleteNotice.includes(value.id);
    });
    // console.log("test: ", test);
  }, [DeleteNotice]);

  // 削除ボタンを押した通知を削除する
  const deleteSingleNotice = async (e) => {
    // console.log("delete!! ", e.target.dataset.notice);
    // noticeDeleteFlg = false;
    try {
      const noticeId = e.target.dataset.notice;

      setNOTIFICATIONS(NOTIFICATIONS.filter((value) => value.id != noticeId));
      setNotifications(notifications.filter((value) => value.id != noticeId));
      setDeleteNotice((prevNoticeId) => [...prevNoticeId, noticeId]);

      // 通知削除用URL
      const url = "http://localhost:8000/post_notice_delete";

      // console.log("accountData: ", accountData);
      // Laravel側か通知一覧データを取得
      await axios.post(url, {
        noticeId: noticeId,
      });
    } catch (err) {
      console.log("err:", err);
    }
  };

  // 選択状態の通知を削除する
  const deleteSelectNotice = async () => {
    // console.log("delete!! ", e.target.dataset.notice);
    // noticeDeleteFlg = false;
    try {
      const selectNoticeArray = NOTIFICATIONS.filter(
        (value) => value.selectCheckBox == true
      );
      const noticeIdArray = [];
      selectNoticeArray.map((value) => {
        noticeIdArray.push(value.id);
      });

      noticeIdArray.map((noticeId) => {
        setNOTIFICATIONS(NOTIFICATIONS.filter((value) => value.id != noticeId));
        setNotifications(notifications.filter((value) => value.id != noticeId));
        setDeleteNotice((prevNoticeId) => [...prevNoticeId, noticeId]);
      });

      // 通知削除用URL
      const url = "http://localhost:8000/post_select_notice_delete";

      // console.log("accountData: ", accountData);
      // Laravel側か通知一覧データを取得
      await axios.post(url, {
        noticeIdArray: noticeIdArray,
      });
    } catch (err) {
      console.log("err:", err);
    }
  };

  // 通知を複数選択可能/不可能状態にする
  const startNoticeSelectMode = () => {
    // console.log("startNoticeSelectMode!!!!!!");
    if (NoticeSelectMode) {
      setNoticeSelectMode(false);
    } else {
      setNoticeSelectMode(true);
    }
  };

  // 1つの通知をクリックしたときにその通知を選択状態にする
  const clickOneNotice = (e) => {
    // console.log("clickOneNotice!!!!", clickElement);
    if (!e.target.classList.contains("deleteSingleNoticeButton")) {
      // console.log("通知をクリックしました");
      if (NoticeSelectMode) {
        const haveNoticeIdElement = e.target.closest("[data-notice_id]");
        if (haveNoticeIdElement != null) {
          const noticeId = haveNoticeIdElement.dataset.notice_id;
          // console.log("e.target.dataset.notice_id: ", noticeId);
          // console.log("selectNotice: ", selectNotice);
          const noticeItemArray = [];
          NOTIFICATIONS.forEach((item) => {
            if (item.id == noticeId) {
              if (item.selectCheckBox) {
                noticeItemArray.push({ ...item, selectCheckBox: false });
              } else {
                noticeItemArray.push({ ...item, selectCheckBox: true });
              }
              // console.log("item.id == noticeId!!!!!!!");
            } else {
              noticeItemArray.push(item);
            }
          });
          setNOTIFICATIONS(noticeItemArray);
        }
      } else {
        const haveNoticeIdElement = e.target.closest("[data-notice_id]");
        const noticeId = haveNoticeIdElement.dataset.notice_id;
        var userName = "";
        NOTIFICATIONS.filter((value) => value.id == noticeId).map((value) => {
          userName = value.userName;
        });

        navigate(`/Profile/${userName}?page=mypage`);
      }
    }
  };

  function NotificationItem({ notification }) {
    const { avatar, title } = renderContent(notification);

    return (
      <ListItemButton
        sx={{
          py: 1.5,
          px: 2.5,
          mt: "1px",
          ...(notification.isUnRead && {
            bgcolor: "action.selected",
          }),
        }}
        onClick={clickOneNotice}
        data-notice_id={notification.id}
      >
        <ListItemAvatar>
          <Avatar sx={{ bgcolor: "background.neutral" }} src={avatar}>{avatar}</Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={title}
          secondary={
            <Typography
              variant="caption"
              sx={{
                mt: 0.5,
                display: "flex",
                alignItems: "center",
                color: "text.disabled",
              }}
            >
              <Iconify
                icon="eva:clock-outline"
                sx={{ mr: 0.5, width: 16, height: 16 }}
              />
              {fToNow(notification.createdAt)}
            </Typography>
          }
        />
        {!NoticeSelectMode ? (
          <>
            <button
              type="button"
              data-notice={notification.id}
              onClick={deleteSingleNotice}
              className="deleteSingleNoticeButton"
            >
              ✕
            </button>
          </>
        ) : (
          <>
            <input
              type="checkbox"
              name=""
              id=""
              checked={notification.selectCheckBox}
              readOnly
              data-notice_check_box={notification.id}
            />
          </>
        )}
      </ListItemButton>
    );
  }

  return (
    <>
      <IconButton
        color={open ? "primary" : "default"}
        style={{ display: Display }}
        onClick={handleOpen}
      >
        <Badge badgeContent={totalUnRead} color="error">
          <Iconify width={24} icon="solar:bell-bing-bold-duotone" />
        </Badge>
      </IconButton>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            mt: 1.5,
            ml: 0.75,
            width: 360,
            maxHeight: "50vh",
          },
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", py: 2, px: 2.5 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle1">通知</Typography>
            {NOTIFICATIONS.filter((value) => value.selectCheckBox == true)
              .length > 0 && NoticeSelectMode ? (
              <button
                type="button"
                className="noticeDeleteButton"
                style={{ border: "0px" }}
                onClick={deleteSelectNotice}
              >
                選択した通知を削除
              </button>
            ) : (
              ""
            )}
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              未読： {totalUnRead} 件
            </Typography>
            <button
              type="button"
              className="noticeSelectButton"
              style={{ border: "0px" }}
              onClick={startNoticeSelectMode}
            >
              選択
            </button>
          </Box>

          {/* {totalUnRead > 0 && (
            <Tooltip title=" Mark all as read">
              <IconButton color="primary" onClick={handleMarkAllAsRead}>
                <Iconify icon="eva:done-all-fill" />
              </IconButton>
            </Tooltip>
          )} */}
        </Box>

        <Divider sx={{ borderStyle: "dashed" }} />

        <Scrollbar sx={{ height: { xs: 340, sm: "auto" } }}>
          {notifications.filter((value) => {
            return value.isUnRead == true && !DeleteNotice.includes(value.id);
          }).length > 0 ? (
            <List
              disablePadding
              subheader={
                <ListSubheader
                  disableSticky
                  sx={{ py: 1, px: 2.5, typography: "overline" }}
                >
                  未読
                </ListSubheader>
              }
            >
              {notifications
                .filter((value) => {
                  return (
                    value.isUnRead == true && !DeleteNotice.includes(value.id)
                  );
                })
                .reverse()
                .map((notification) => (
                  <>
                    <NotificationItem
                      key={notification.id}
                      notification={notification}
                    />
                  </>
                ))}
            </List>
          ) : (
            ""
          )}
          {notifications.filter((value) => {
            return value.isUnRead == false && !DeleteNotice.includes(value.id);
          }).length > 0 ? (
            <List
              disablePadding
              subheader={
                <ListSubheader
                  disableSticky
                  sx={{ py: 1, px: 2.5, typography: "overline" }}
                >
                  既読
                </ListSubheader>
              }
            >
              {notifications
                .filter((value) => {
                  return (
                    value.isUnRead == false && !DeleteNotice.includes(value.id)
                  );
                })
                .reverse()
                .map((notification) => (
                  <NotificationItem
                    key={notification.id}
                    notification={notification}
                  />
                ))}
            </List>
          ) : (
            ""
          )}
        </Scrollbar>

        <Divider sx={{ borderStyle: "dashed" }} />

        {/* <Box sx={{ p: 1 }}>
          <Button fullWidth disableRipple>
            View All
          </Button>
        </Box> */}
      </Popover>
    </>
  );
}

function renderContent(notification) {
  const title = (
    <Typography variant="subtitle2">
      {notification.title}
      <Typography
        component="span"
        variant="body2"
        sx={{ color: "text.secondary" }}
      >
        <br></br> {notification.description}
      </Typography>
    </Typography>
  );

  if (notification.type === "order_placed") {
    return {
      avatar: (
        <img
          alt={notification.title}
          src="/assets/icons/ic_notification_package.svg"
        />
      ),
      title,
    };
  }
  if (notification.type === "order_shipped") {
    return {
      avatar: (
        <img
          alt={notification.title}
          src="/assets/icons/ic_notification_shipping.svg"
        />
      ),
      title,
    };
  }
  if (notification.type === "mail") {
    return {
      avatar: (
        <img
          alt={notification.title}
          src="/assets/icons/ic_notification_mail.svg"
        />
      ),
      title,
    };
  }
  if (notification.type === "chat_message") {
    return {
      avatar: (
        <img
          alt={notification.title}
          src="/assets/icons/ic_notification_chat.svg"
        />
      ),
      title,
    };
  }
  return {
    avatar: notification.avatar ? (
      <img alt={notification.title} src={notification.avatar} />
    ) : null,
    title,
  };
}

NotificationsPopover.propTypes = {
  notification: PropTypes.object,
};
