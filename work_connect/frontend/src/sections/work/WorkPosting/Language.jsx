import { useEffect, useState } from 'react';
import CreatableSelect from 'react-select/creatable';
import InsertTag from 'src/components/tag/InsertTag';
import axios from 'axios';
import PropTypes from "prop-types";

const Language = (props) => {
  const {InsertTagFunction} = InsertTag();
  const url = 'http://localhost:8000/get_work_language_tag'
  const [options, setOptions] = useState([]);
  useEffect(()=>{
    async function LanguageFunction() {
      try {
        // Laravel側から企業一覧データを取得
        const response = await axios.get(url, {
          params: {All:"tags"},
        });

        // response.dataは配列の中にオブジェクトがある形になっています
        // console.log("response.data:", response.data);

        // 希望職業、希望勤務地、取得資格、プログラミング言語、開発環境、ソフトウェア、趣味、その他
        // はタグのため、カンマ区切りの文字列を配列に変換する

        const responseData = response.data;
        const languageArray = [];
        console.log(responseData);
        responseData.map((value) => {
          languageArray.push({value:value.name,label:value.name});
        });
        setOptions(languageArray);
        console.log(languageArray);
        console.log("CompanyListObject:", response.data);
      } catch (err) {
        console.log("err:", err);
      }
    }
    LanguageFunction();
    axios.get(url)
  },[])

  const handleChange = (selectedOption, actionMeta) => {
    console.log(actionMeta);
    if (actionMeta && actionMeta.action === 'create-option') {

      const inputValue = actionMeta;
      console.log(inputValue);
      const newOption = { value: inputValue.option.value, label: inputValue.option.label };
      setOptions([...options, newOption]);
      // 12は作品投稿のプログラミング言語です。
      InsertTagFunction(inputValue.option.value, 12);
    }
    let valueArray = [];
    selectedOption.map((value) => {
      valueArray.push(value.value)
    })
    props.callSetWorkData("Language", valueArray.join(","));
  };

  return(
    <CreatableSelect options={options} isClearable isMulti onChange={handleChange}/>
  );

};

Language.propTypes = {
  callSetWorkData: PropTypes.func,
};

export default Language;