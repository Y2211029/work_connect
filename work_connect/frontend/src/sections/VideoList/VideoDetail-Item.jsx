import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Iframe from "react-iframe";
import axios from "axios";

import Box from "@mui/material/Box";

import { useCreateTagbutton } from "src/hooks/use-createTagbutton";
import { useSessionStorage } from "src/hooks/use-sessionStorage";

const VideoDetailItem = () => {
  // ログイン情報の取得
  const { getSessionData } = useSessionStorage();
  // 動画IDの取得
  const { id } = useParams();
  // -----動画データ-----
  const [VideoDetail, setVideoDetail] = useState([]);
  const [CommentPost, setCommentPost] = useState({
    display: "none",
    text: "",
  });
  const [videoComment, setVideoComment] = useState([]);
  const [AccountData, setAccountData] = useState({});
  const [Comment, setComment] = useState({});
  const [CommentCancel, setCommentCancel] = useState("");

  // -----タグ-----
  const { tagCreate } = useCreateTagbutton();
  // ジャンル
  const [VideoGenre, setVideoGenre] = useState("");

  // 動画データ
  const videoDetailUrl = "http://localhost:8000/get_movie_detail";
  // 動画コメント投稿
  const videoCommentPostUrl = "http://localhost:8000/post_movie_comment_post";
  // 動画コメントデータ
  const videoCommentUrl = "http://localhost:8000/post_movie_comment";
  // 動画コメント削除
  const videoCommentDelete = "http://localhost:8000/post_movie_comment_delete";

  // Laravel側から動画詳細データを取得
  useEffect(() => {
    setAccountData(getSessionData("accountData"));

    async function VideoListFunction() {
      try {
        // Laravel側から動画詳細データを取得
        const response = await axios.get(videoDetailUrl, {
          params: { id: id },
          headers: {
            "Content-Type": "json",
          },
        });

        setVideoDetail(response.data["動画"][0]);
        setVideoComment(response.data["動画コメント"]);

        console.log("response.data[動画][0]", response.data);
        // console.log("response.data[動画][0]", response.data);
      } catch (err) {
        console.log("err:", err);
      }
    }
    VideoListFunction();
  }, [id]); // 空の依存配列を渡すことで初回のみ実行されるようにする

  useEffect(() => {
    const initialCommentState = {};
    videoComment.forEach((value) => {
      initialCommentState[value.id] = {
        display: "none",
        text: value.content,
        readOnly: true,
      };
    });
    setComment(initialCommentState);
  }, [videoComment]);

  useEffect(() => {
    console.log("commentが変更されました。", Comment);
  }, [Comment]);

  // タグ作成
  useEffect(() => {
    //ジャンル
    setVideoGenre(tagCreate(VideoDetail.genre));
    console.log("VideoDetail", VideoDetail);
  }, [VideoDetail]);

  // 動画タイトル
  const renderTitle = VideoDetail.title && VideoDetail.title.length > 0 && (
    <>
      <p>{VideoDetail.title}</p>
    </>
  );

  // 動画投稿者アイコン
  const renderIcon = VideoDetail.icon && VideoDetail.icon.length > 0 && (
    <>
      <Link to="/">
        <img src={`/assets/images/avatars/avatar_${VideoDetail.icon}.jpg`} alt="" />
      </Link>
    </>
  );

  // 動画作成者ユーザーネーム
  const renderUserName = VideoDetail.user_name && VideoDetail.user_name.length > 0 && (
    <>
      <span>{VideoDetail.user_name}</span>
    </>
  );

  // コメント欄表示
  const handleTextOpen = () => {
    setCommentPost({ ...CommentPost, display: "block" });
  };

  // コメント投稿キャンセル
  const handlePostCancel = () => {
    setCommentPost({ ...CommentPost, display: "none", text: "" });
  };

  // コメント投稿内容
  const handlePostChange = (value) => {
    console.log("valuevaluevaluevalue", value);
    setCommentPost({ ...CommentPost, text: value });
  };

  const videoCommentSave = async (text, movieId, userId) => {
    try {
      // Laravel側から作品詳細データを取得
      await axios.post(videoCommentPostUrl, {
        movieCommentContent: text,
        movie_id: movieId,
        user_id: userId,
      });
      // コメント投稿後にページを再読み込み
      window.location.reload();
    } catch (err) {
      console.log("err:", err);
    }
  };

  // コメント投稿
  const handlePost = () => {
    setCommentPost({ ...CommentPost, display: "none" });
    if (CommentPost.text.trim() !== "") {
      videoCommentSave(CommentPost.text, id, AccountData.id);
    } else {
      alert("空白のまま投稿はできません。");
    }
  };

  // コメント編集ボタンクリック
  const handleClick = (commentId) => {
    setComment({
      ...Comment,
      [commentId]: {
        ...Comment[commentId],
        display: "block",
        readOnly: false,
      },
    });

    setCommentCancel(Comment[commentId].text);
  };

  const handleCancel = (commentId) => {
    setComment({
      ...Comment,
      [commentId]: {
        ...Comment[commentId],
        display: "none",
        text: CommentCancel,
        readOnly: true,
      },
    });
  };

  // コメント入力内容変更
  const handleChenge = (text, commentId) => {
    setComment({
      ...Comment,
      [commentId]: {
        ...Comment[commentId],
        text: text,
      },
    });
  };

  // コメント保存
  const handleSave = (commentId) => {
    setComment({
      ...Comment,
      [commentId]: {
        ...Comment[commentId],
        display: "none",
        readOnly: true,
      },
    });

    async function videoCommentSave() {
      try {
        await axios.post(videoCommentUrl, {
          movieCommentContent: Comment[commentId].text,
          commentId: commentId,
        });
      } catch (err) {
        console.log("err:", err);
      }
    }
    videoCommentSave();
  };

  // コメント削除
  const handleDelete = (commentId) => {
    async function videoCommentDeletefunc() {
      try {
        // Laravel側から作品詳細データを取得
        await axios.post(videoCommentDelete, {
          commentId: commentId,
        });
        alert("コメントを削除しました。");
        // コメント削除にページを再読み込み
        window.location.reload();
      } catch (err) {
        console.log("err:", err);
      }
    }
    videoCommentDeletefunc();
  };
  // 動画URL
  const renderYoutubeFrame = (
    <>
      <Iframe
        url={"https://www.youtube.com/embed/hge3fr50o0o?iv_load_policy=3&modestbranding=1&fs=0"}
        width="100%"
        height="500px"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
      />
    </>
  );

  // 動画紹介文
  const renderIntro = VideoDetail.intro && VideoDetail.intro.length > 0 && (
    <>
      <p>紹介文</p>
      <textarea
        style={{
          width: "100%",
          height: "300px",
        }}
        value={VideoDetail.intro}
        readOnly // 読み取り専用にする場合
      />
    </>
  );

  // 動画ジャンル
  const renderGenre = VideoGenre && VideoGenre.length > 0 && (
    <>
      <p>ジャンル</p>
      {VideoGenre}
    </>
  );

  const renderComment = videoComment && Object.keys(Comment).length > 0 && (
    <>
      {videoComment && Object.keys(Comment).length > 0 && <h3>コメント一覧</h3>}
      {videoComment.map((item, index) =>
        (item.commenter_id === AccountData.id && item.commenter_user_name === AccountData.user_name) ||
        (item.commenter_id === AccountData.id && item.commenter_company_name === AccountData.company_name) ? (
          <div key={index}>
            <hr />
            {/* {console.log("comment", Comment)} */}
            <button onClick={() => handleClick(item.id)}>編集</button>
            <button onClick={() => handleCancel(item.id)} className={`comment_${item.id}`} style={{ display: Comment[item.id]?.display }}>
              キャンセル
            </button>
            <button onClick={() => handleSave(item.id)} className={`comment_${item.id}`} style={{ display: Comment[item.id]?.display }}>
              保存
            </button>
            <button onClick={() => handleDelete(item.id)} className={`comment_${item.id}`} style={{ display: Comment[item.id]?.display }}>
              削除
            </button>
            <p>{item.commenter_user_name || item.commenter_company_name}</p>
            <textarea
              style={{
                width: "50%",
                height: "100px",
              }}
              value={Comment[item.id].text}
              readOnly={Comment[item.id].readOnly} // 読み取り専用にする場合
              onChange={(e) => handleChenge(e.target.value, item.id)}
            />
          </div>
        ) : (
          <div key={index}>
            <hr />
            <p>{item.commenter_user_name || item.commenter_company_name}</p>
            <textarea
              style={{
                width: "50%",
                height: "100px",
              }}
              value={item.content}
              readOnly // 読み取り専用にする場合
            />
          </div>
        )
      )}
    </>
  );

  return (
    <>
      <Link to="/VideoList">動画一覧に戻る</Link>

      <div>
        {renderTitle}
        <div>
          {renderIcon}
          {renderUserName}
        </div>
      </div>
      {/* 各項目の表示、ここから */}
      <Box>
        {renderYoutubeFrame}
        {renderGenre}
        {renderIntro}
        <div>
          <button onClick={handleTextOpen}>コメントする</button>
          <br />
          <div
            style={{
              display: CommentPost.display,
            }}
          >
            <textarea
              style={{
                width: "50%",
                height: "100px",
              }}
              value={CommentPost.text}
              onChange={(e) => handlePostChange(e.target.value)}
            />
            <br />
            <button onClick={() => handlePostCancel()}>キャンセル</button>
            <button onClick={() => handlePost()}>投稿</button>
          </div>
        </div>
        {renderComment}
      </Box>
      {/* 各項目の表示、ここまで */}
    </>
  );
};

export default VideoDetailItem;
