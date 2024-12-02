import { useState, useEffect } from "react";
// import axios from "axios";
import Select from "react-select";
import { useSessionStorage } from "src/hooks/use-sessionStorage";
import PropTypes from 'prop-types';
import schoolList from 'src/data/school_list.json';

// const schoolTypeCodes = ["H1", "F1"]; // 複数のschool_type_codeを配列として定義
// const accessToken = "268|G5fHGAGA7Col8FetXAQ6EMNHnjDIA5TInN2uByIB";
const options = schoolList;

////////////////////////////////////////
// 学校情報を取得
const fetchSchoolData = async () => {
  // let allSchools = [];
  // try {
  //   for (const code of schoolTypeCodes) {
  //     let page = 1;
  //     let hasMore = true;

  //     while (hasMore) {
  //       const response = await axios.get(
  //         // `https://api.edu-data.jp/api/v1/school?school_type_code=${code}&pref_code=27&page=${page}&school_status_code=1,2`,
  //         `https://api.edu-data.jp/api/v1/school?school_type_code=${code}&page=${page}&school_status_code=1,2`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${accessToken}`,
  //             Accept: "application/json",
  //           },
  //         }
  //       );

  //       const data = response.data.schools.data || [];
  //       if (Array.isArray(data)) {
  //         options.push(
  //           ...data
  //             .filter(school => school.school_name) // 空でない学校名をフィルタリング
  //             .map(school => ({
  //               value: school.school_name,
  //               label: school.school_name
  //             }))
  //         );

  //         allSchools = [...allSchools, ...data];
  //         hasMore = data.length > 0;
  //         page += 1;
  //       } else {
  //         console.error("Unexpected response format:", response.data);
  //         hasMore = false;
  //       }
  //     }
  //   }
  // } catch (error) {
  //   console.error("Error fetching data:", error);
  // }
};

fetchSchoolData();
////////////////////////////////////////

const SchoolNameDropdown = ({ SchoolNameData }) => {
  const [selectedSchool, setSelectedSchool] = useState(null);
  const { getSessionData, updateSessionData } = useSessionStorage();

  // valueの初期値をセット
  useEffect(() => {
    const SessionData = getSessionData("accountData");

    /// 編集の途中ならセッションストレージからデータを取得する。
    /// (リロードした時も、データが残った状態にする。)
    if (SessionData.SchoolName !== undefined && SessionData.SchoolName !== "") {
      // セッションストレージから最新のデータを取得
      setSelectedSchool({
        value: SessionData.SchoolName,
        label: SessionData.SchoolName,
      });
    } else if (SchoolNameData !== undefined) {
      // DBから最新のデータを取得
      setSelectedSchool({
        value: SchoolNameData,
        label: SchoolNameData,
      });
      // セッションストレージの初期値をセット
      updateSessionData("accountData", "SchoolName", SchoolNameData);
    }
  }, [SchoolNameData]);

  const handleChange = (option) => {
    setSelectedSchool(option);

    // ここでURL内のuser_nameとセッション内のuser_nameを比べて、同じなら下2個の処理を行うようにする
    updateSessionData("accountData", "SchoolName", option ? option.label : "");
    // 編集中状態をオン(保存もしくはログアウトされるまで保持)
    updateSessionData("accountData", "SchoolNameEditing", true);
  };

  return (
    <div>
      <Select
        id="schoolDropdown"
        value={selectedSchool}
        onChange={handleChange}
        options={options}
        placeholder="▼"
        required
        styles={{
          control: (base) => ({
            ...base,
            fontSize: '20px', // テキストサイズを調整
          }),
          placeholder: (base) => ({
            ...base,
            fontSize: '20px', // プレースホルダーのサイズを調整
          }),
          menu: (base) => ({
            ...base,
            fontSize: '20px', // ドロップダウンメニューの文字サイズ
          }),
        }}
      />
    </div>
  );
};

SchoolNameDropdown.propTypes = {
  SchoolNameData: PropTypes.string,
};

export default SchoolNameDropdown;
