import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import Modal from "react-modal";
import Box from '@mui/material/Box';

import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

import CreateTagElements from "src/components/tag/CreateTagElements";

//------------------------------------------------------------------------------------

// ここでアプリケーションのルートエレメントを設定
Modal.setAppElement("#root");

const WorkDetail = () => {
  // 作品IDの取得
  const { id } = useParams();
  // 作品の項目
  // const { id } = useParams();

  const [workDetail, setWorkDetail] = useState([]);
  // スライドの位置
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  // モーダルスライドの開閉
  const [modalIsOpen, setModalIsOpen] = useState(false);
  // ギャラリーモーダルの開閉
  const [galleryIsOpen, setGalleryIsOpen] = useState(false);
  // メインスライドとモーダルスライドの連携
  const mainSplideRef = useRef(null);
  const modalSplideRef = useRef(null);

  // const WorkSlide = [
  //   { image: "/assets/workImages/thumbnail/cover_1.jpg", annotation: "作品スライドの紹介文です。1" },
  //   { image: "/assets/workImages/thumbnail/cover_2.jpg", annotation: "作品スライドの紹介文です。2" },
  //   { image: "/assets/workImages/thumbnail/cover_3.jpg", annotation: "作品スライドの紹介文です。3" },
  //   // 他のスライドも同様に追加
  // ];

  const [WorkSlide, setWorkSlide] = useState([]);

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
          // params: { id: id },
          params: { id: id },
        });

        // response.dataは配列の中にオブジェクトがある形になっています
        console.log("response.data:", response.data);

        // プログラミング言語、開発環境、その他はタグのため、カンマ区切りの文字列を配列に変換する
        response.data.forEach((element) => {
          element.work_genre !== null
            ? (element.work_genre = element.work_genre.split(",").map((item) => <CreateTagElements key={item} itemContents={item} />))
            : "";
        });

        setWorkDetail(response.data[0]);
        console.log("response.data", response.data[0]);
        // setWorkOfDetreail(response.data[0]);
        // setWorkImages(response.data[0].images);
        // console.log(WorkImages);
        // console.log(ThumbnailJudgement);
        // console.log(NotThumbnail);

        response.data[0].images.forEach((value) => {
          console.log("valuevalue", value);
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

        console.log("workImagesArray:", workImagesArray);
        setWorkSlide(workImagesArray);

        // setWorkSlide(
        //   { image: "/assets/workImages/thumbnail/cover_1.jpg" },
        //   { image: "/assets/workImages/thumbnail/cover_2.jpg" },
        //   { image: "/assets/workImages/thumbnail/cover_3.jpg" }
        // );

        // console.log("setWorkSlide(ThumbnailJudgement, NotThumbnail)", response.data[0]);
      } catch (err) {
        console.log("err:", err);
      }
    }
    workListFunction();
  }, []); // 空の依存配列を渡すことで初回のみ実行されるようにする

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
      // console.log("modalSplideRef", currentSlideIndex);
    }
  }, [modalIsOpen, currentSlideIndex]);

  return (
    <div className="wrapper">
      <h2 className="WorkDetail-title">{workDetail.work_name}</h2>

      {/* メインスライドここから */}
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
        {/* 
        <button className="splide__toggle">
          <span className="splide__toggle__play">Play</span>
          <span className="splide__toggle__pause">Pause</span>
        </button> */}
      </Splide>
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
        
      </Box>
      {/* 各項目の表示、ここまで */}
    </div>
  );
};

export default WorkDetail;
