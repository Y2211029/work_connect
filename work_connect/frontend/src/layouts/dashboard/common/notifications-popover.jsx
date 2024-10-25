import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types";

import List from "@mui/material/List";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
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

import { useSessionStorage } from "src/hooks/use-sessionStorage";
import { WebScokectContext } from "src/layouts/dashboard/index";

// ----------------------------------------------------------------------



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
  const [TotalUnRead, setTotalUnRead] = useState(0);

  // すべての通知の件数
  const [TotalNotifications, setTotalNotifications] = useState(0);

  // 通知モーダルを開く用
  const [open, setOpen] = useState(null);

  // websocket通信のデータ保存先
  const notificationContext = useContext(WebScokectContext);

  const [NoticeArray, setNoticeArray] = useState([]);

  const [DeleteNotice, setDeleteNotice] = useState([]);
  const [NoticeOpenFlg, setNoticeOpenFlg] = useState(false);

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

    setNoticeArray(
      NoticeArray.map((notification) => ({
        ...notification,
        already_read: 1,
      }))
    );

    noticeAlreadyReadFunction();
  };

  // 削除ボタンを押した通知を削除する
  const deleteSingleNotice = async (e) => {
    try {
      const noticeId = Number(e.target.dataset.notice);
      console.log("noticeId", noticeId);

      setDeleteNotice((prevNoticeId) => [...prevNoticeId, noticeId]);

      // 通知削除用URL
      const url = "http://localhost:8000/post_notice_delete";

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
    try {
      const selectNoticeArray = NOTIFICATIONS.filter(
        (value) => value.selectCheckBox == true
      );
      const noticeIdArray = selectNoticeArray.map((value) => value.id);

      console.log("noticeIdArray", noticeIdArray);

      setDeleteNotice((prevNoticeId) => [
        ...prevNoticeId,
        ...noticeIdArray.map(Number),
      ]);

      // 通知削除用URL
      const url = "http://localhost:8000/post_select_notice_delete";

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
    if (NoticeSelectMode) {
      setNoticeSelectMode(false);
    } else {
      setNoticeSelectMode(true);
    }
  };


  const allNoticeSelect = () => {
    setNOTIFICATIONS(
      NOTIFICATIONS.map((notification) => ({
        ...notification,
        selectCheckBox: true,
      }))
    );
  };



  // 1つの通知をクリックしたときにその通知を選択状態にする
  const clickOneNotice = (e) => {
    if (!e.target.classList.contains("deleteSingleNoticeButton")) {
      if (NoticeSelectMode) {
        const haveNoticeIdElement = e.target.closest("[data-notice_id]");
        if (haveNoticeIdElement != null) {
          // 通知ID
          const noticeId = haveNoticeIdElement.dataset.notice_id;
          const noticeItemArray = [];
          NOTIFICATIONS.forEach((item) => {
            if (item.id == noticeId) {
              if (item.selectCheckBox) {
                noticeItemArray.push({ ...item, selectCheckBox: false });
              } else {
                noticeItemArray.push({ ...item, selectCheckBox: true });
              }
            } else {
              noticeItemArray.push(item);
            }
          });
          setNOTIFICATIONS(noticeItemArray);
        }
      } else {
        if (e.target) {

          const haveNoticeIdElement = e.target.closest("[data-notice_id]");
          const noticeId = haveNoticeIdElement.dataset.notice_id;
          var clickTitle = "";
          NOTIFICATIONS.filter((value) => value.id == noticeId).map((value) => {
            clickTitle = value.title;
          });

          // カテゴリーごとに分けて、リンク先を変更する。・
          if (clickTitle === "フォロー") {

            const haveNoticeIdElement = e.target.closest("[data-notice_id]");
            const noticeId = haveNoticeIdElement.dataset.notice_id;
            var userName = "";
            NOTIFICATIONS.filter((value) => value.id == noticeId).map((value) => {
              userName = value.userName;
            });
            navigate(`/Profile/${userName}?page=mypage`);
            setOpen(null);
          } else if (clickTitle === "動画") {
            // 通知の中でもdata-notice_idが含まれる要素を代入
            const haveNoticeIdElement = e.target.closest("[data-notice_id]");
            // そしてクリックしたnotice_idが代入
            const noticeId = haveNoticeIdElement.dataset.notice_id;
            var movieId = "";
            NOTIFICATIONS.filter((value) => value.id == noticeId).map((value) => {
              movieId = value.detail;
            });

            navigate(`/VideoDetail/${movieId}`);
            setOpen(null);

          }
        }
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


  // Laravelから通知データを取得し、NoticeArrayにセットする
  async function noticeListFunction() {
    console.log("noticeListFunction");
    try {
      // 通知一覧データを取得する用URL
      const url = "http://localhost:8000/get_notice";

      // ログインしているアカウントの情報を取得
      const accountData = getSessionData("accountData");
      console.log("noticeListFunction:accountData", accountData);

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

      console.log("noticeListFunction:noticeData", noticeData);

      setNoticeArray(noticeData);
    } catch (err) {
      console.log("err:", err);
    }
  }

  useEffect(() => {
    noticeListFunction();
  }, []);

  // 通知監視用
  useEffect(() => {
    let noticeContextDataObject = {};
    noticeContextDataObject = notificationContext.WebSocketState.notification.noticeData;

    console.log("noticeContextDataObject", noticeContextDataObject);

    if (noticeContextDataObject != undefined) {
      if (NoticeArray == undefined) {
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


  // Laravelから取得した通知データをもとに表示に適した形に変換する
  useEffect(() => {
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
      } else if (value.category == "作品") {
        description = value.student_name +
          value.student_surname +
          "さんが作品を投稿しました";
      } else if (value.category == "動画") {
        description = value.student_name +
          value.student_surname +
          "さんが動画を投稿しました";
      }
      const avatar = `http://localhost:8000/storage/images/userIcon/${value.icon}`; // ここにアイコンのURLを入れる
      const type = "friend_interactive";
      const createdAt = value.created_at;

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
      const detail = value.detail;
      console.log("detail", detail)

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
        detail: detail,
      };
      noticeData.push(oneNoticeData);
    });

    if (noticeData.length !== 0) {
      setNOTIFICATIONS(noticeData);
      console.log("空じゃないよ", NOTIFICATIONS);
    } else {
      setNOTIFICATIONS([]);
      console.log("空や", NOTIFICATIONS);
    }

  }, [NoticeArray]);

  // 表示するのに適した形になった通知データを表示用配列にセット
  useEffect(() => {
    if (NoticeArray.length !== 0) {
      setNotifications(NOTIFICATIONS);
    } else {
      setNotifications([]);
    }
  }, [NOTIFICATIONS]);

  useEffect(() => {
    setTotalUnRead(NoticeArray.filter(
      (item) => item.already_read === 0
    ).length);
    setTotalNotifications(notifications.length);
  }, [notifications]);


  // 通知モーダルが閉じられたときに未読の通知をすべて既読状態にする
  useEffect(() => {
    // console.log("NoticeOpenFlg",NoticeOpenFlg)
    if (!open && NoticeOpenFlg) {
      handleMarkAllAsRead();
      setNoticeSelectMode(false);
    } else {
      setNoticeOpenFlg(true);
      console.log("NoticeOpenFlg", NoticeOpenFlg)
    }
  }, [open]);

  // 
  useEffect(() => {
    if (!NoticeSelectMode) {
      setNOTIFICATIONS(NOTIFICATIONS.map((notification) => ({
        ...notification,
        selectCheckBox: false,
      })));
    }
  }, [NoticeSelectMode]);

  useEffect(() => {
    setNoticeArray(NoticeArray.filter((value) => {
      return !DeleteNotice.includes(value.id);
    }));

    setNoticeSelectMode(false);
  }, [DeleteNotice]);

  return (
    <>
      <IconButton
        color={open ? "primary" : "default"}
        style={{ display: Display }}
        onClick={handleOpen}
      >
        <Badge badgeContent={TotalUnRead} color="error">
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
              未読： {TotalUnRead} 件
            </Typography>
            <button
              type="button"
              className="noticeSelectButton"
              style={{ border: "0px", display: TotalNotifications != 0 ? "block" : "none" }}
              onClick={startNoticeSelectMode}
            >
              選択
            </button>

            <button
              type="button"
              className="noticeSelectButton"
              style={{ display: NoticeSelectMode == true ? "block" : "none" }}
              onClick={allNoticeSelect}
            >
              すべて選択
            </button>
          </Box>
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
