import { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';
import * as wanakana from 'wanakana';
import { useSessionStorage } from "src/hooks/use-sessionStorage";


const SchoolNameDropdown = () => {
  const [schools, setSchools] = useState([]);
  const [selectedSchool, setSelectedSchool] = useState('');
  const [loading, setLoading] = useState(false); // ローディング状態
  const accessToken = "268|G5fHGAGA7Col8FetXAQ6EMNHnjDIA5TInN2uByIB";

  const { setSessionData } = useSessionStorage();

  
  useEffect(() => {
    const schoolTypeCodes = ["H1", "H2"]; // 複数のschool_type_codeを配列として定義
    const fetchData = async () => {
      setLoading(true);
      let allSchools = [];
      let page = 1;
      let hasMore = true;

      try {
        for (const code of schoolTypeCodes) {
          hasMore = true;
          page = 1;

          while (hasMore) {
            const response = await axios.get(`https://api.edu-data.jp/api/v1/school?school_type_code=${code}&pref_code=27&page=${page}&school_status_code=1,2`, {
              headers: {
                Authorization: `Bearer ${accessToken}`, // アクセストークンをBearerトークンとしてヘッダーに含める
                Accept: 'application/json'
              }
            });

            // console.log(`API response for code ${code} and page ${page}:`, response.data); // レスポンスデータを詳細にログ出力

            if (Array.isArray(response.data.schools.data)) {
              allSchools = [...allSchools, ...response.data.schools.data]; // 取得したデータを蓄積
              hasMore = response.data.schools.data.length > 0; // データが存在する限り繰り返す
              page += 1; // 次のページを設定
            } else {
              console.error('Unexpected response format:', response.data);
              hasMore = false;
            }
          }
        }

        setSchools(allSchools);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // 最初のレンダリング時のみ実行される

  useEffect(() => {
    setSessionData("schoolName", selectedSchool.label);
  }, [setSessionData,selectedSchool])
  
  // ドロップダウンで選択された値を状態に設定
  const handleChange = (selectedOption) => {
    setSelectedSchool(selectedOption);

   
  };

  // ドロップダウンのオプションを設定
  const options = schools.map((school) => ({
    value: school.school_code,
    label: school.school_name
  }));

  // カスタムフィルタリング関数
  const filterOption = (option, inputValue) => {
    // 入力値とオプションのラベルを正規化して比較する
    const normalizedLabel = wanakana.toHiragana(option.label.normalize('NFKC').toLowerCase());
    const normalizedInput = wanakana.toHiragana(inputValue.normalize('NFKC').toLowerCase());
    return normalizedLabel.startsWith(normalizedInput);
  };

  return (
    <div>
      <p>学校名</p>
      <Select
        id="schoolDropdown"
        value={selectedSchool}
        onChange={handleChange}
        options={options}
        placeholder="Select..."
        filterOption={filterOption}
        isLoading={loading} // ローディング状態を表示
      />
    </div>
  );
};

export default SchoolNameDropdown;
