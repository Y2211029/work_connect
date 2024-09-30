import { useContext, useEffect, useState } from "react";
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

// ----------------------------------------------------------------------

export default function NotificationsPopover() {
  const [NOTIFICATIONS, setNOTIFICATIONS] = useState([
    // {
    //   id: faker.string.uuid(),
    //   title: "Your order is placed",
    //   description: "waiting for shipping",
    //   avatar: null,
    //   type: "order_placed",
    //   createdAt: set(new Date(), { hours: 10, minutes: 30 }),
    //   isUnRead: true,
    // },
    // {
    //   id: faker.string.uuid(),
    //   title: "aaaaaaaaaaaaaaa",
    //   description: "bbbbbbbbbbb",
    //   avatar: null,
    //   type: "order_placed",
    //   createdAt: set(new Date(), { hours: 10, minutes: 30 }),
    //   isUnRead: true,
    // },
    // {
    //   id: faker.string.uuid(),
    //   title: faker.person.fullName(),
    //   description: "answered to your comment on the Minimal",
    //   avatar: "/assets/images/avatars/avatar_2.jpg",
    //   type: "friend_interactive",
    //   createdAt: sub(new Date(), { hours: 3, minutes: 30 }),
    //   isUnRead: true,
    // },
    // {
    //   id: faker.string.uuid(),
    //   title: "You have new message",
    //   description: "5 unread messages",
    //   avatar: null,
    //   type: "chat_message",
    //   createdAt: sub(new Date(), { days: 1, hours: 3, minutes: 30 }),
    //   isUnRead: false,
    // },
    // {
    //   id: faker.string.uuid(),
    //   title: "You have new mail",
    //   description: "sent from Guido Padberg",
    //   avatar: null,
    //   type: "mail",
    //   createdAt: sub(new Date(), { days: 2, hours: 3, minutes: 30 }),
    //   isUnRead: false,
    // },
    // {
    //   id: faker.string.uuid(),
    //   title: "Delivery processing",
    //   description: "Your order is being shipped",
    //   avatar: null,
    //   type: "order_shipped",
    //   createdAt: sub(new Date(), { days: 3, hours: 3, minutes: 30 }),
    //   isUnRead: false,
    // },
  ]);

  const { getSessionData } = useSessionStorage();
  const accountData = getSessionData("accountData");

  const [notifications, setNotifications] = useState(NOTIFICATIONS);

  const Display = useContext(MyContext);

  const totalUnRead = notifications.filter(
    (item) => item.isUnRead === true
  ).length;

  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

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

  const handleMarkAllAsRead = () => {
    console.log("handleMarkAllAsRead!!!");

    setNotifications(
      notifications.map((notification) => ({
        ...notification,
        isUnRead: false,
      }))
    );

    noticeAlreadyReadFunction();
  };

  const [NoticeArray, setNoticeArray] = useState([]);
  // const [NoticeId, setNoticeId] = useState([]);
  // const [ResponseData, setResponseData] = useState([]);

  async function noticeListFunction() {
    // console.log("NoticeIdNoticeIdNoticeIdNoticeId: ", NoticeId);
    try {
      // 通知一覧データを取得する用URL
      const url = "http://localhost:8000/get_notice";

      const accountData = getSessionData("accountData");

      // console.log("accountData: ", accountData);
      // Laravel側か通知一覧データを取得
      const response = await axios.get(url, {
        params: {
          myId: accountData.id,
        },
      });

      setNoticeArray(response.data);

      // var noticeIdArray = [];

      // response.data.map((value) => {
      //   // console.log('response.data.map!!!', value.id);
      //   noticeIdArray.push(value.id);
      // });
      // // console.log('noticeIdArray: ', noticeIdArray);

      // const arrayComparison = (expense1, expense2) => {
      //   const duplication = expense1.filter((cost1) =>
      //     expense2.find((cost2) => cost2.name === cost1.name)
      //   );

      //   const duplicationName = duplication.map((cost) => {
      //     return cost.name;
      //   });

      //   const expenseDiff = expense1.filter((cost) => {
      //     return !duplicationName.includes(cost.name);
      //   });

      //   return expenseDiff;
      // };

      // if (noticeIdArray.toString() !== NoticeId.toString()) {
      //   console.log("if (noticeIdArray.toString() !== NoticeId.toString())");
      //   // console.log("noticeIdArray.toString(): ", noticeIdArray.toString());

      //   // console.log('NoticeIdNoticeIdNoticeId');
      //   // console.log('noticeIdArray: ', noticeIdArray);
      //   console.log('NoticeId: ', NoticeId);
      //   var newNoticeId = arrayComparison(noticeIdArray, NoticeId);
      //   console.log('newNoticeId: ', newNoticeId);
      //   // newNoticeId.map((value) => {
      //   //   // console.log('newNoticeId.map((value): ', value);
      //   //   setNoticeId((prevNoticeId) => [...prevNoticeId, value]);
      //   // });
      //   // ここでまとめてNoticeIdを更新する
      //   // setNoticeId([]);
      //   if (newNoticeId.length > 0) {
      //     setNoticeId((prevNoticeId) => [...prevNoticeId, ...newNoticeId]);
      //   }

      //   setResponseData(response.data);
      // }

      // if([noticeIdArray, NoticeId].filter(item => arr1.includes(item) && arr2.includes(item)).length == NoticeId.length) {
      //   setNoticeId(noticeIdArray);
      // }
      // setNOTIFICATIONS(NOTIFICATIONS);
      // console.log("response.data:", response.data);
    } catch (err) {
      console.log("err:", err);
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      noticeListFunction();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // console.log("useEffect[NoticeArray]:NoticeId:", NoticeId);
    console.log("NoticeArray:", NoticeArray);

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
            description = value.abc + "と相互フォローになりました";
          }
        } else if (value.detail == "") {
          if (value.send_user_id[0] == "S") {
            description =
              value.student_name +
              value.student_surname +
              "さんにフォローされました";
          } else if (value.send_user_id[0] == "C") {
            description = value.abc + "にフォローされました";
          }
        }
      }
      const avatar = null; // ここにアイコンのURLを入れる
      const type = "friend_interactive";
      const createdAt = value.created_at;
      // const createdAt = set(new Date(), { hours: 10, minutes: 30 });
      // const isUnRead = value.already_read;
      var isUnRead = true;
      if (value.already_read == 1) {
        isUnRead = false;
      }

      const oneNoticeData = {
        id: id,
        title: title,
        description: description,
        avatar: avatar,
        type: type,
        createdAt: createdAt,
        isUnRead: isUnRead,
      };
      noticeData.push(oneNoticeData);
    });

    setNOTIFICATIONS(noticeData);
  }, [NoticeArray]);

  useEffect(() => {
    console.log("NOTIFICATIONS: ", NOTIFICATIONS);
    setNotifications(NOTIFICATIONS);
  }, [NOTIFICATIONS]);

  useEffect(() => {
    console.log("open!!!");
    if (!open) {
      handleMarkAllAsRead();
    }
  }, [open]);

  // useEffect(() => {
  //   // console.log("useEffect[NoticeId]:NoticeId:", NoticeId);

  //   // var newNotice = [];
  //   // ResponseData.map((value) => {
  //   //   console.log("response.data.map!!!", value);
  //   //   newNotice.push(ResponseData.find((notice) => notice.id === value));
  //   // });

  //   // NoticeIdに含まれているIDと一致するResponseDataのデータのみを抽出
  //   const newNotice = ResponseData.filter((value) => NoticeId.includes(value.id));

  //   console.log("newNotice: ", newNotice);
  //   // setNoticeArray(newNotice);
  //   // setNoticeArray((prevNoticeArray) => [...prevNoticeArray, ...newNotice]);
  // }, [ResponseData]);

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
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              未読： {totalUnRead} 件
            </Typography>
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
            return value.isUnRead == true;
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
                  return value.isUnRead == true;
                })
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
          {notifications.filter((value) => {
            return value.isUnRead == false;
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
                  return value.isUnRead == false;
                })
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

// ----------------------------------------------------------------------

NotificationItem.propTypes = {
  notification: PropTypes.shape({
    createdAt: PropTypes.instanceOf(Date),
    id: PropTypes.string,
    isUnRead: PropTypes.bool,
    title: PropTypes.string,
    description: PropTypes.string,
    type: PropTypes.string,
    avatar: PropTypes.any,
  }),
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
    >
      <ListItemAvatar>
        <Avatar sx={{ bgcolor: "background.neutral" }}>{avatar}</Avatar>
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
    </ListItemButton>
  );
}

// ----------------------------------------------------------------------

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
