import { useEffect, useState } from "react";
import CreatableSelect from "react-select/creatable";
import InsertTag from "src/components/tag/InsertTag";
import axios from "axios";
import PropTypes from "prop-types";

const Environment = (props) => {
  const { InsertTagFunction } = InsertTag();
  const url = "http://localhost:8000/get_work_environment_tag";
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState([]);
  useEffect(() => {
    async function EnvironmentFunction() {
      try {
        // Laravel側から企業一覧データを取得
        const response = await axios.get(url, {
          params: { All: "tags" },
        });

        // 希望職業、希望勤務地、取得資格、プログラミング言語、開発環境、ソフトウェア、趣味、その他
        // はタグのため、カンマ区切りの文字列を配列に変換する

        const responseData = response.data;
        const EnvironmentArray = [];
        responseData.map((value) => {
          EnvironmentArray.push({ value: value.name, label: value.name });
        });
        setOptions(EnvironmentArray);
      } catch (err) {
        console.log("err:", err);
      }
    }
    EnvironmentFunction();
    if (props.workData) {
      props.workData.map((value) => {
        selectedOption.push({ value: value.name, label: value.name });
      });
      setSelectedOption(selectedOption);
    }
    axios.get(url);
  }, []);

  useEffect(() => {
    console.log("workData:", props.workData);

    if (props.workData != undefined) {
      const option = [];
      console.log(true);
      const genreArray = props.workData.split(",");
      if (genreArray[0] != "") {
        genreArray.map((value) => {
          option.push({ value: value, label: value });
          // setSelectedOption((prevOptions) => [...prevOptions, { value: value, label: value }]);
        });
      }
      console.log("selectedOption", option);

      setSelectedOption(option);
    }
  }, [props.workData]);

  const handleChange = (selectedOption, actionMeta) => {
    if (actionMeta && actionMeta.action === "create-option") {
      const inputValue = actionMeta;
      const newOption = {
        value: inputValue.option.value,
        label: inputValue.option.label,
      };
      setOptions([...options, newOption]);
      // 13は作品投稿の開発環境です。
      InsertTagFunction(inputValue.option.value, 13);
    }
    let valueArray = [];
    selectedOption.map((value) => {
      valueArray.push(value.value);
    });
    setSelectedOption(selectedOption);
    props.callSetWorkData("Environment", valueArray.join(","));
  };

  return (
    <CreatableSelect
      // プレフィックス＝接頭語
      // CreatableSelect内のInput要素のClass名の頭にMyPageEditItemsをつけるという意味
      classNamePrefix="MyPageEditItems"
      className="WorkInputElements"
      options={options}
      value={selectedOption}
      placeholder="選択"
      isClearable
      isMulti
      onChange={handleChange}
    />
  );
};

Environment.propTypes = {
  callSetWorkData: PropTypes.func,
  workData: PropTypes.string.isRequired,
};

export default Environment;
