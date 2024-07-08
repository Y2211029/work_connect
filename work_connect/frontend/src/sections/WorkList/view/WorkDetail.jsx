import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import CreateTagElements from "src/components/tag/CreateTagElements";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";

//------------------------------------------------------------------------------

const WorkDetail = () => {
  const { id } = useParams();
  const options = {
    type: "loop",
    gap: "1rem",
    autoplay: true,
    pauseOnHover: false,
    resetProgress: false,
    height: "15rem",
  };

  /*
  このIDを使用してデータベースに作品が存在するか確認
  存在しなければ404に飛ばす。

  */
  // 作品一覧（詳細）のデータを保持するステート
  const [WorkOfDetail, setWorkOfDetail] = useState({});
  const [WorkImages, setWorkImages] = useState([]);

  // サムネイル
  const [ThumbnailJudgement, setThumbnailJudgement] = useState([]);
  // サムネイル以外の画像
  const [NotThumbnail, setNotThumbnail] = useState([]);

  const [WorkSlide, setWorkSlide] = useState([]);

  // 作品の一覧（詳細）データを取得する用URL
  const url = "http://localhost:8000/get_work_detail";

  useEffect(() => {
    async function workListFunction() {
      let workImagesArray = [];
      try {
        // Laravel側かaら作品一覧データを取得
        const response = await axios.get(url, {
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

        setWorkOfDetail(response.data[0]);
        setWorkImages(response.data[0].images);
        console.log(WorkImages);
        console.log(ThumbnailJudgement);
        console.log(NotThumbnail);

        response.data[0].images.forEach((value) => {
          if (value.thumbnail_judgement === 1) {
            // サムネイルの場合
            setThumbnailJudgement(value);
            workImagesArray.unshift(value); //unshift 配列の先頭に追加
          } else {
            // サムネイル以外の場合
            setNotThumbnail((prevState) => [...prevState, value]);
            workImagesArray.push(value); // push 配列の末尾に追加
          }
        });

        setWorkSlide(workImagesArray);

        // console.log("setWorkSlide(ThumbnailJudgement, NotThumbnail)", response.data[0]);
        console.log("response:", response.data[0]);
      } catch (err) {
        console.log("err:", err);
      }
    }
    workListFunction();
  }, []); // 空の依存配列を渡すことで初回のみ実行されるようにする

  useEffect(() => {
    console.log(WorkOfDetail);
    console.log("WorkSlide", WorkSlide);
  }, [WorkSlide]); // 空の依存配列を渡すことで初回のみ実行されるようにする

  /*
  スライドコンポーネント
  ギャラリーコンポーネント

  サムネイル判定
  */

  /*
    posts配列から項目取得
  */

  /*
  スライドコンポーネント
  */

  /*
    ※必須項目
    持ってくるもの
    ※作品タイトル
    ※サムネイル
    ※➡︎スライド画像
    ※➡︎スライド画像紹介文
    ※アイコン
    ※ジャンル(タグ)
    ※紹介文
    プログラミング言語(タグ)
    開発環境(タグ)
    その他
    
    コメント

    必要な要素
    ・ローディング
  */
  return (
    <div className="wrapper">
      <h2 id="autoplay-example-heading">Autoplay</h2>
      <Splide options={options} aria-labelledby="autoplay-example-heading" hasTrack={false}>
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

        <button className="splide__toggle">
          <span className="splide__toggle__play">Play</span>
          <span className="splide__toggle__pause">Pause</span>
        </button>
      </Splide>
    </div>
    // <div>
    //   <h1>作品詳細</h1>
    //   <p>ID: {id}</p>

    //   {WorkOfDetail["work_name"]}
    //   {WorkOfDetail["work_intro"]}
    //   {WorkOfDetail["thumbnail"]}
    //   {WorkSlide.map((image, index) => (
    //     <div key={index}>
    //       <p>ID: {image.id}</p>
    //       <p>スライド画像: {image.image}</p>
    //       <p>注釈: {image.annotation}</p>
    //       {/* <p>サムネイルジャッジ: {image.thumbnail_judgement}</p> */}
    //     </div>
    //   ))}
    // </div>
  );
};

export default WorkDetail;
