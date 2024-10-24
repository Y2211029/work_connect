// src/index.js
const cors = require("cors"); // corsパッケージのインポート
const express = require("express");
const WebSocket = require("ws");
const http = require("http");
const axios = require("axios");
// Expressアプリを初期化
const app = express();

app.use(
  cors({
    origin: "http://localhost:5174", // Reactのサーバーオリジンを許可
  })
);

// WebSocket用のHTTPサーバーを作成
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// WebSocket接続を保存するためのオブジェクト
let clients = {};

// WebSocketの接続時の処理
wss.on("connection", (ws, req) => {
  const userId = new URL(
    req.url,
    `http://${req.headers.host}`
  ).searchParams.get("userId");
  clients[userId] = ws;

  ws.on("close", () => {
    delete clients[userId];
  });
});

// フォローAPIの実装
app.use(express.json());

app.post("/follow", async (req, res) => {
  const { followerId, followedId } = req.body;

  // laravelにフォロー情報を送信。
  try {
    const response = await axios.post("http://localhost:8000/follow", {
      sender_id: followerId,
      recipient_id: followedId,
    });



    if (response.data.message == "フォロー処理が完了しました") {
      if (response.data.follow_status == "フォローしています" || response.data.follow_status == "相互フォローしています") {
        res.json(response.data);
        if (clients[followedId]) {
          clients[followedId].send(
            JSON.stringify({
              kind: "notification",
              type: "follow",
              message: `ユーザー${followerId}があなたをフォローしました！`,
              follow_status: response.data.follow_status,
              noticeData: response.data.notice_data[0],
              followData: {
                kind: "follow",
                type: "follow",
                message: `ユーザー${followerId}があなたをフォローしました！`,
                follow_status: response.data.follow_status,
              },
            })
          );
        }
      } else if (response.data.follow_status == "フォローされています" || response.data.follow_status == "フォローする") {
        res.json(response.data);
        if (clients[followedId]) {
          clients[followedId].send(
            JSON.stringify({
              kind: "follow",
              type: "follow",
              message: `ユーザー${followerId}があなたをフォローしました！`,
              follow_status: response.data.follow_status,
            })
          );
        }
      }
    } else {
      res.json("何らかの原因でエラーが起きました");
      if (clients[followedId]) {
        clients[followedId].send(
          JSON.stringify({
            type: "follow",
            message: `何らかの原因でエラーが起きました`,
            follow_status: response.data.follow_status,
          })
        );
      }
    }
    // res.sendStatus(200); 
  } catch (error) {
    console.error("Error sending follow notification:", error);
  }
});

app.post("/video_posting", async (req, res) => {
  console.log("req.body.body.workData", req.body.body);

  // laravelにフォロー情報を送信。
  try {
    const response = await axios.post(
      "http://localhost:8000/video_posting",
      req.body.body,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    // console.log(formData);
    // console.log(response.data.message);



    if (response.data.message == "Work data saved successfully") {
      res.json(response.data);
      console.log("response.data.notice_data[0]", response.data.noticeData[0]);
      response.data.follower.map((value) => {
        if (clients[value]) {
          clients[value].send(
            JSON.stringify({
              kind: "notification",
              type: "videoPosting",
              message: `ユーザー${req.body.body.creatorId}が動画を投稿しました！`,
              noticeData: response.data.noticeData[0],
            })
          );
        }
      })
    } else {
      res.json("何らかの原因でエラーが起きました");
      if (clients[followedId]) {
        clients[followedId].send(
          JSON.stringify({
            type: "follow",
            message: `何らかの原因でエラーが起きました`,
            follow_status: response.data.follow_status,
          })
        );
      }
    }
    // res.sendStatus(200); 
  } catch (error) {
    console.error("Error sending follow notification:", error);
  }
});

// サーバーを起動
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
