import { useEffect, useState } from 'react';
import CreatableSelect from 'react-select/creatable';
import InsertTag from 'src/components/tag/InsertTag';
import axios from 'axios';

const Environment = () => {
  const {InsertTagFunction} = InsertTag();
  const url = 'http://localhost:8000/get_environment_tag'
  const [options, setOptions] = useState([]);
  useEffect(()=>{
    async function EnvironmentFunction() {
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
        const EnvironmentArray = [];
        console.log(responseData);
        responseData.map((value) => {
          EnvironmentArray.push({value:value.name,label:value.name});
        });
        setOptions(EnvironmentArray);
        console.log(EnvironmentArray);
        console.log("CompanyListObject:", response.data);
      } catch (err) {
        console.log("err:", err);
      }
    }
    EnvironmentFunction();
    axios.get(url)
  },[])

  const handleChange = (selectedOption, actionMeta) => {
    console.log(actionMeta);
    if (actionMeta && actionMeta.action === 'create-option') {

      const inputValue = actionMeta;
      console.log(inputValue);  
      const newOption = { value: inputValue.option.value, label: inputValue.option.label };
      setOptions([...options, newOption]);
      // 13は作品投稿の開発環境です。 
      InsertTagFunction(inputValue.option.value, 13);
    }
  };

  return(
    <CreatableSelect options={options} isClearable isMulti onChange={handleChange}/>
  );
};
export default Environment;