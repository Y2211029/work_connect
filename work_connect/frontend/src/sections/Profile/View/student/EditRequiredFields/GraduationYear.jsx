import { useState, useEffect } from "react";
import Select from "react-select";
import PropTypes from 'prop-types';
import { useSessionStorage } from "src/hooks/use-sessionStorage";

// 現在の年とその前後5年間の年度を生成する関数
const currentYear = new Date().getFullYear();
const options = [];
for (let i = currentYear; i <= currentYear + 5; i++) {
  options.push({ value: `${i}年卒業`, label: `${i}年卒業` });
}

const GraduationYearDropdown = ({ GraduationData }) => {
  // 卒業年度を表示する範囲を設定(引数が5なら現在~5年後まで)
  //const yearOptions = generateYearOptions(5);
  const [Graduation, setGraduation] = useState(GraduationData);
  const { getSessionData, updateSessionData } = useSessionStorage();

  // valueの初期値をセット
  useEffect(() => {
    if (getSessionData("accountData") !== undefined) {
      const SessionData = getSessionData("accountData");

      /// 編集の途中ならセッションストレージからデータを取得する。
      /// (リロードした時も、データが残った状態にする。)
      if (SessionData.Graduation !== undefined && SessionData.Graduation !== "") {
        // セッションストレージから最新のデータを取得
        setGraduation({
          value: SessionData.Graduation,
          label: SessionData.Graduation,
        });
      } else if (GraduationData !== undefined) {
        // DBから最新のデータを取得
        setGraduation({
          value: GraduationData,
          label: GraduationData,
        });
        // セッションストレージの初期値をセット
        updateSessionData("accountData", "Graduation", GraduationData);
      }
    }
  }, [GraduationData]);

  const handleChange = (Option) => {
    setGraduation(Option);
    updateSessionData("accountData", "Graduation", `${Option.value}`);
    // 編集中状態をオン(保存もしくはログアウトされるまで保持)
    updateSessionData("accountData", "GraduationEditing", true);
  };


  return (
    <Select
      className="MyPageEditItems"
      name="yearOptions"
      options={options}
      value={Graduation}
      onChange={handleChange}
      placeholder="▼"
      closeMenuOnSelect={false}
      required
      styles={{
        // 12/5 
        // App.cssにそれぞれ
        // MyPageEditItems_control
        // MyPageEditItems_placeholder、
        // MyPageEditItems_menu
        // と移動し書き換えました。

        // control: (base) => ({
        //   ...base,
        //   fontSize: '20px', // テキストサイズを調整
        // }),
        // placeholder: (base) => ({
        //   ...base,
        //   fontSize: '20px', // プレースホルダーのサイズを調整
        // }),
        // menu: (base) => ({
        //   ...base,
        //   fontSize: '20px', // ドロップダウンメニューの文字サイズ
        // }),
      }}
    />

  );
};

GraduationYearDropdown.propTypes = {
  GraduationData: PropTypes.string,
};

export default GraduationYearDropdown;

