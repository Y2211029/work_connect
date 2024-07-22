import { useState, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

import Modal from "react-modal";
import Box from "@mui/material/Box";

import { useCreateTagbutton } from "src/hooks/use-createTagbutton";

import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

// import CreateTagElements from "src/components/tag/CreateTagElements";

//------------------------------------------------------------------------------------

// ここでアプリケーションのルートエレメントを設定
Modal.setAppElement("#root");

const DetailItem = () => {
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

  const url = "http://localhost:8000/get_work_detail";

  // console.log("currentSlideIndex", currentSlideIndex);

  // Laravel側から作品一覧データを取得
  useEffect(() => {
    async function workListFunction() {
      let workImagesArray = [];
      try {
        // Laravel側から作品一覧データを取得
        const response = await axios.get(url, {
          params: { id: id },
          headers: {
            "Content-Type": "json",
          },
        });

        setWorkDetail(response.data[0]);
        // console.log("response.data", response.data[0]);

        response.data[0].images.forEach((value) => {
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
  }, [id]); // 空の依存配列を渡すことで初回のみ実行されるようにする

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

  useEffect(() => {
    //ジャンル
    setWorkGenre(tagCreate(workDetail.work_genre));
    // 開発言語
    setWorkProgrammingLanguage(tagCreate(workDetail.programming_language));
    // 開発環境
    setWorkDevelopmentEnvironment(tagCreate(workDetail.development_environment));
    console.log("workDetail", workDetail);
  }, [workDetail]);

  const renderTitle = (
    <div>
      {/* 作品タイトル */}
      <h2 className="WorkDetail-title">{workDetail.work_name}</h2>
      {workDetail.icon && workDetail.user_name && (
        <div>
          <img src={`/assets/images/avatars/avatar_${workDetail.icon}.jpg`} alt="" />
          <span>{workDetail.user_name}</span>
        </div>
      )}
      {/* 作品制作者アイコン */}
    </div>
  );

  const renderIntro = workDetail.work_intro && (
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

  const renderGenre = WorkGenre && WorkGenre.length > 0 && (
    <>
      <p>ジャンル</p>
      {WorkGenre}
    </>
  );

  return (
    <>
      <Link to="/">作品一覧に戻る</Link>

      {renderTitle}

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

        {WorkProgrammingLanguage && WorkProgrammingLanguage.length > 0 && (
          <>
            <p>開発言語</p>
            {WorkProgrammingLanguage}
          </>
        )}

        {WorkDevelopmentEnvironment && WorkDevelopmentEnvironment.length > 0 && (
          <>
            <p>開発環境</p>

            {WorkDevelopmentEnvironment}
          </>
        )}

        {workDetail.work_url && (
          <>
            <p>作品URL</p>
            <a target="_blank" href={workDetail.work_url}>
              {workDetail.work_url}
            </a>
          </>
        )}
      </Box>
      {/* 各項目の表示、ここまで */}
    </>
  );
};

export default DetailItem;
