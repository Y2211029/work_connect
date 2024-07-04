import { useEffect, useState } from 'react';
import CreatableSelect from 'react-select/creatable';
import axios from 'axios';

const Language = () => {

  const url = 'http://localhost:8000/get_language_tag'
  const [options, setOptions] = useState([]);
  useEffect(()=>{
    async function LanguageFunction() {
      try {
        // Laravel側から企業一覧データを取得
        const response = await axios.get(url, {
          params: {},
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
    }
  };

  return(
    <CreatableSelect options={options} isClearable isMulti onChange={handleChange}
       />
  );

};
export default Language;