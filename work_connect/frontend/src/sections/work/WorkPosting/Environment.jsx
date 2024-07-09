<<<<<<< HEAD
import CreatableSelect from 'react-select/creatable';

const options = [
  { value: '旅行', label: '総合政策学部' },
  { value: '読書', label: '経済学部' },
  { value: 'ドライブ', label: '経営学部' },  
  { value: '映画鑑賞', label: '商学部' },
  { value: '筋トレ', label: '社会学部' },
  { value: 'カラオケ', label: '観光学部' },  
  { value: 'スポーツ観戦', label: '国際関係学部' },
  { value: 'ゲーム', label: '国際文化学部' },
  { value: 'プログラミング', label: '国際教養学部' },  
  { value: 'DIY', label: '文学部' },
  { value: '釣り', label: '人間科学部' },  
  { value: '料理', label: '外国語学部' },
  { value: 'ツーリング', label: '教育学部' },
  { value: '音楽鑑賞', label: '子ども学部' },  
  { value: 'プログラミング', label: '社会福祉学部' },  
  { value: 'DIY', label: '家政学部' },
  { value: '釣り', label: '芸術学部' },  
  { value: '料理', label: ' 体育学部' },
  { value: 'ツーリング', label: '健康科学部' },
  { value: '音楽鑑賞', label: '教養学部' },  
  { value: 'プログラミング', label: '理学部' },  
  { value: 'DIY', label: '工学部' },
  { value: '釣り', label: '農学部' },  
  { value: '料理', label: ' 水産学部' },
  { value: 'ツーリング', label: '獣医学部' },
  { value: '音楽鑑賞', label: '医学部' },  
  { value: '音楽鑑賞', label: '歯学部' },  
  { value: '音楽鑑賞', label: '薬学部' },  
  { value: '音楽鑑賞', label: '看護学部' },  
  { value: '音楽鑑賞', label: '保健学部' },  
  { value: '音楽鑑賞', label: '医療技術学部' },  
]

const MyCreatableSelect = () => <CreatableSelect options={options} isClearable isMulti />;

MyCreatableSelect.displayName = 'MyCreatableSelect';

export default MyCreatableSelect;
=======
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
>>>>>>> f74bb114622c2917b98d0449d67e8b7e25daac84
