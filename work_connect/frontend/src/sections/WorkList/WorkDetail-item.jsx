import { useState, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

import Modal from "react-modal";
import Box from "@mui/material/Box";

import { useCreateTagbutton } from "src/hooks/use-createTagbutton";
import { useSessionStorage } from "src/hooks/use-sessionStorage";

import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

// import CreateTagElements from "src/components/tag/CreateTagElements";

//------------------------------------------------------------------------------------

// ここでアプリケーションのルートエレメントを設定
Modal.setAppElement("#root");

const WorkDetailItem = () => {
  // ログイン情報の取得
  const { getSessionData } = useSessionStorage();
  // 作品IDの取得
  const { id } = useParams();

  // -----スライド-----
  // メインスライドのパス
  const [WorkSlide, setWorkSlide] = useState([]);
  // スライドの画像がWorkSlideにセットされたかの確認・セットされればスライドを表示
  const [WorkSlideCheck, setWorkSlideCheck] = useState(false);
  // スライドの位置
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  // -----作品データ-----
  const [workDetail, setWorkDetail] = useState([]);
  const [CommentPost, setCommentPost] = useState({
    display: "none",
    text: "",
  });
  const [workComment, setWorkComment] = useState([]);
  const [AccountData, setAccountData] = useState({});
  const [Comment, setComment] = useState({});
  const [CommentCancel, setCommentCancel] = useState("");

  // -----タグ-----
  const { tagCreate } = useCreateTagbutton();
  // ジャンル
  const [WorkGenre, setWorkGenre] = useState("");
  // 開発言語
  const [WorkProgrammingLanguage, setWorkProgrammingLanguage] = useState("");
  // 開発環境
  const [WorkDevelopmentEnvironment, setWorkDevelopmentEnvironment] = useState("");

  // -----モーダル・ギャラリ-----
  // モーダルスライドの開閉
  const [modalIsOpen, setModalIsOpen] = useState(false);
  // ギャラリーモーダルの開閉
  const [galleryIsOpen, setGalleryIsOpen] = useState(false);
  // メインスライドとモーダルスライドの連携
  const mainSplideRef = useRef(null);
  const modalSplideRef = useRef(null);

  // メインスライドのCSS
  const options = {
    type: "loop",
    gap: "1rem",
    // 自動再生off
    autoplay: false,
    pauseOnHover: false,
    resetProgress: false,
    height: "35rem",
  };

  // モーダルスライドのCSS
  const modalOptions = {
    type: "loop",
    gap: "1rem",
    autoplay: false, // モーダル内のスライドショーは自動再生しないようにする
    pauseOnHover: false,
    resetProgress: false,
    height: "35rem",
    start: currentSlideIndex,
  };

  // 作品データ
  const workDetailUrl = "http://localhost:8000/get_work_detail";
  // 作品コメント投稿
  const workCommentPostUrl = "http://localhost:8000/post_work_comment_post";
  // 作品コメントデータ
  const workCommentUrl = "http://localhost:8000/post_work_comment";
  // 作品コメント削除
  const workCommentDelete = "http://localhost:8000/post_work_comment_delete";

  // console.log("currentSlideIndex", currentSlideIndex);

  // Laravel側から作品詳細データを取得
  useEffect(() => {
    setAccountData(getSessionData("accountData"));

    // console.log("accountData", accountData);
    async function workListFunction() {
      let workImagesArray = [];
      try {
        // Laravel側から作品詳細データを取得
        const response = await axios.get(workDetailUrl, {
          params: { id: id },
          headers: {
            "Content-Type": "json",
          },
        });

        setWorkDetail(response.data["作品"][0]);
        setWorkComment(response.data["作品コメント"]);

        // console.log("response.data[作品コメント]", response.data["作品コメント"]);
        response.data["作品"][0].images.forEach((value) => {
          // console.log("valuevalue", value);
          if (value.thumbnail_judgement === 1) {
            // サムネイルの場合
            // setThumbnailJudgement(value);
            workImagesArray.unshift(value); //unshift 配列の先頭に追加
            workImagesArray[0].image = workImagesArray[0].imageSrc;
          } else {
            // サムネイル以外の場合
            // setNotThumbnail((prevState) => [...prevState, value]);
            workImagesArray.push(value); // push 配列の末尾に追加
            workImagesArray[workImagesArray.length - 1].image = workImagesArray[workImagesArray.length - 1].imageSrc;
          }
        });

        // console.log("workImagesArray:", workImagesArray);

        setWorkSlide(workImagesArray);
        // スライド画像をセットしてから表示するためのステート
        setWorkSlideCheck(true);

        // console.log("setWorkSlide(ThumbnailJudgement, NotThumbnail)", response.data[0]);
      } catch (err) {
        console.log("err:", err);
      }
    }
    workListFunction();
  }, [id]);

  useEffect(() => {
    const initialCommentState = {};
    workComment.forEach((value) => {
      initialCommentState[value.id] = {
        display: "none",
        text: value.content,
        readOnly: true,
      };
    });
    setComment(initialCommentState);
  }, [workComment]);

  useEffect(() => {
    console.log("commentが変更されました。", Comment);
  }, [Comment]);

  // スライドモーダル
  const openModal = (index) => {
    // スライドモーダルを開く
    setCurrentSlideIndex(index);
    setModalIsOpen(true);
    setGalleryIsOpen(false);
  };

  const closeModal = () => {
    // スライドモーダルを閉じる
    setModalIsOpen(false);

    // モーダルを閉じた後のスライド位置をメインスライドに反映させる
    if (mainSplideRef.current) {
      mainSplideRef.current.go(currentSlideIndex);
    }
  };

  // ギャラリーモーダル
  const openGallery = () => {
    // ギャラリモーダルを開く
    setGalleryIsOpen(true);
  };

  const closeGallery = () => {
    // ギャラリモーダルを閉じる
    setGalleryIsOpen(false);
  };

  // モーダルが開き、スライドが変更された場合、モーダルスライドの開始位置を変更する。
  useEffect(() => {
    if (modalIsOpen && modalSplideRef.current) {
      modalSplideRef.current.go(currentSlideIndex);
    }
  }, [modalIsOpen, currentSlideIndex]);

  // タグ作成
  useEffect(() => {
    //ジャンル
    setWorkGenre(tagCreate(workDetail.work_genre));
    // 開発言語
    setWorkProgrammingLanguage(tagCreate(workDetail.programming_language));
    // 開発環境
    setWorkDevelopmentEnvironment(tagCreate(workDetail.development_environment));
    // console.log("workDetail", workDetail);
    // console.log("workComment", workComment);
  }, [workDetail]);

  // 作品タイトル
  const renderTitle = workDetail.work_name && workDetail.work_name.length > 0 && (
    <>
      <h2 className="WorkDetail-title">{workDetail.work_name}</h2>
    </>
  );

  // 作品投稿者アイコン
  const renderIcon = workDetail.icon && workDetail.icon.length > 0 && (
    <>
      <Link to="/">
        <img src={`/assets/images/avatars/avatar_${workDetail.icon}.jpg`} alt="" />
      </Link>
    </>
  );

  // 作品投稿者ユーザーネーム
  const renderUserName = workDetail.user_name && workDetail.user_name.length > 0 && (
    <>
      <span>{workDetail.user_name}</span>
    </>
  );

  // 作品紹介文
  const renderIntro = workDetail.work_intro && workDetail.work_intro.length > 0 && (
    <>
      <p>紹介文</p>
      <textarea
        style={{
          width: "100%",
          height: "300px",
        }}
        value={workDetail.work_intro}
        readOnly // 読み取り専用にする場合
      />
    </>
  );

  // 作品ジャンル
  const renderGenre = WorkGenre && WorkGenre.length > 0 && (
    <>
      <p>ジャンル</p>
      {WorkGenre}
    </>
  );

  // 作品の開発言語
  const renderProgrammingLang = WorkProgrammingLanguage && WorkProgrammingLanguage.length > 0 && (
    <>
      <p>開発言語</p>
      {WorkProgrammingLanguage}
    </>
  );

  // 作品の開発環境
  const renderDevelopmentEnv = WorkDevelopmentEnvironment && WorkDevelopmentEnvironment.length > 0 && (
    <>
      <p>開発環境</p>

      {WorkDevelopmentEnvironment}
    </>
  );

  const renderWorkURL = workDetail.work_url && workDetail.work_url.length > 0 && (
    <>
      <p>作品URL</p>
      <a target="_blank" href={workDetail.work_url}>
        {workDetail.work_url}
      </a>
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

  const workCommentSave = async (text, workId, userId) => {
    try {
      // Laravel側から作品詳細データを取得
      await axios.post(workCommentPostUrl, {
        workCommentContent: text,
        work_id: workId,
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
      workCommentSave(CommentPost.text, id, AccountData.id);
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

    async function workCommentSave() {
      try {
        // Laravel側から作品詳細データを取得
        await axios.post(workCommentUrl, {
          workCommentContent: Comment[commentId].text,
          commentId: commentId,
        });
      } catch (err) {
        console.log("err:", err);
      }
    }
    workCommentSave();
  };

  // コメント削除
  const handleDelete = (commentId) => {
    async function workCommentDeletefunc() {
      try {
        // Laravel側から作品詳細データを取得
        await axios.post(workCommentDelete, {
          commentId: commentId,
        });
        alert("コメントを削除しました。");
        // コメント削除にページを再読み込み
        window.location.reload();
      } catch (err) {
        console.log("err:", err);
      }
    }
    workCommentDeletefunc();
  };

  const renderComment = workComment && Object.keys(Comment).length > 0 && (
    <>
      {workComment && Object.keys(Comment).length > 0 && <h3>コメント一覧</h3>}
      {workComment.map((item, index) =>
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
      <Link to="/">作品一覧に戻る</Link>
      <div>
        {renderTitle}
        <div>
          {renderIcon}
          {renderUserName}
        </div>
      </div>
      {/* メインスライドここから */}
      {WorkSlideCheck && (
        <Splide
          ref={mainSplideRef}
          options={options}
          aria-labelledby="autoplay-example-heading"
          hasTrack={false}
          onMoved={(splide, newIndex) => setCurrentSlideIndex(newIndex)}
        >
          <div style={{ position: "relative" }}>
            <SplideTrack>
              {WorkSlide.map((slide, index) => (
                <SplideSlide key={slide.image} onClick={() => openModal(index)}>
                  <img src={slide.image} alt={slide.image} />
                </SplideSlide>
              ))}
            </SplideTrack>
          </div>

          <div className="splide__progress">
            <div className="splide__progress__bar" />
          </div>
        </Splide>
      )}

      {/* メインスライドここまで */}

      {/* モーダルスライドここから */}
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel="Image Modal" className="modal" overlayClassName="overlay">
        <div className="Modal">
          <div>
            <button onClick={closeModal} className="close-button">
              Close
            </button>
            <button onClick={openGallery} className="oepn-gallery">
              ギャラリー
            </button>
            <Splide
              ref={modalSplideRef}
              options={modalOptions}
              aria-labelledby="modal-autoplay-example-heading"
              hasTrack={false}
              onMoved={(splide, newIndex) => setCurrentSlideIndex(newIndex)}
              start={currentSlideIndex}
            >
              <div style={{ position: "relative" }}>
                <SplideTrack>
                  {WorkSlide.map((slide) => (
                    <SplideSlide key={slide.image}>
                      <img src={slide.image} alt={slide.image} />
                    </SplideSlide>
                  ))}
                </SplideTrack>
              </div>

              <div className="splide__progress">
                <div className="splide__progress__bar" />
              </div>
            </Splide>

            {modalIsOpen && (
              <div className="annotation-container">
                <span>{WorkSlide[currentSlideIndex].annotation}</span>
              </div>
            )}
          </div>
        </div>
      </Modal>
      {/* モーダルスライドここまで */}

      {/* ギャラリーモーダルここから */}
      <Modal isOpen={galleryIsOpen} onRequestClose={closeModal} contentLabel="Image Modal" className="modal" overlayClassName="overlay">
        <div className="Modal">
          <div>
            <button onClick={closeGallery} className="close-button">
              Close
            </button>
            <button onClick={openGallery} className="oepn-gallery">
              スライド
            </button>
            {WorkSlide.map((slide, index) => (
              <SplideSlide key={slide.image}>
                <img src={slide.image} alt={slide.image} onClick={() => openModal(index)} />
              </SplideSlide>
            ))}
          </div>
        </div>
      </Modal>
      {/* ギャラリーモーダルここまで */}

      {/* 各項目の表示、ここから */}
      <Box>
        {renderIntro}
        {renderGenre}
        {renderProgrammingLang}
        {renderDevelopmentEnv}
        {renderWorkURL}
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

export default WorkDetailItem;
