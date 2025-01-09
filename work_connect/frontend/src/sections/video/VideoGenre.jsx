import { useEffect, useState } from "react";
import CreatableSelect from "react-select/creatable";
import InsertTag from "src/components/tag/InsertTag";
import axios from "axios";
import PropTypes from "prop-types";

const VideoGenre = (props) => {
  const { InsertTagFunction } = InsertTag();
  const url = "http://localhost:8000/get_video_genre_tag";
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState([]);

  useEffect(() => {
    async function VideoGenreFunction() {
      try {
        // Laravel側から企業一覧データを取得
        const response = await axios.get(url, {
          params: { All: "tags" },
        });

        // response.dataは配列の中にオブジェクトがある形になっています
        // console.log("response.data:", response.data);

        // 希望職業、希望勤務地、取得資格、プログラミング言語、開発環境、ソフトウェア、趣味、その他
        // はタグのため、カンマ区切りの文字列を配列に変換する

        const responseData = response.data;
        const VideoGenreArray = [];
        console.log(responseData);
        responseData.map((value) => {
          VideoGenreArray.push({ value: value.name, label: value.name });
        });
        setOptions(VideoGenreArray);
        console.log(VideoGenreArray);
        console.log("CompanyListObject:", response.data);
      } catch (err) {
        console.log("err:", err);
      }
    }
    VideoGenreFunction();
  }, []);

  useEffect(() => {
    console.log("movieData:", props.movieData);

    if (props.movieData != undefined) {
      const option = [];
      console.log(true);
      const genreArray = props.movieData.split(",");
      if (genreArray[0] != "") {
        genreArray.map((value) => {
          option.push({ value: value, label: value });
          // setSelectedOption((prevOptions) => [...prevOptions, { value: value, label: value }]);
        });
      }
      console.log("selectedOption", option);

      setSelectedOption(option);
    }
  }, [props.movieData]);

  const handleChange = (selectedOption, actionMeta) => {
    console.log(actionMeta);
    console.log(selectedOption);
    if (actionMeta && actionMeta.action === "create-option") {
      const inputValue = actionMeta;
      console.log(inputValue);
      const newOption = {
        value: inputValue.option.value,
        label: inputValue.option.label,
      };
      setOptions([...options, newOption]);
      // 10は動画投稿の作品ジャンルです。
      InsertTagFunction(inputValue.option.value, 10);
    }
    let valueArray = [];
    selectedOption.map((value) => {
      valueArray.push(value.value);
    });
    props.callSetVideoData("VideoGenre", valueArray.join(","));
  };

  return (
    <CreatableSelect
      // プレフィックス＝接頭語
      // CreatableSelect内のInput要素のClass名の頭にMyPageEditItemsをつけるという意味
      classNamePrefix="MyPageEditItems"
      options={options}
      value={selectedOption}
      placeholder="▼"
      isClearable
      isMulti
      onChange={handleChange}
    />
  );
};

VideoGenre.propTypes = {
  callSetVideoData: PropTypes.func,
  movieData: PropTypes.string.isRequired,
};

export default VideoGenre;
