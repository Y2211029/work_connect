import { useState, useEffect } from "react";
import Select from "react-select";
import PropTypes from 'prop-types';
import { useSessionStorage } from "src/hooks/use-sessionStorage";

// 現在の年とその前後5年間の年度を生成する関数
const generateYearOptions = (range) => {
  const currentYear = new Date().getFullYear();
  const options = [];
  for (let i = currentYear; i <= currentYear + range; i++) {
    options.push({ value: i, label: `${i}年` });
  }
  return options;
};

const GraduationYearDropdown = ({GraduationData}) => {

  // 卒業年度を表示する範囲を設定(引数が5なら現在~5年後まで)
  const yearOptions = generateYearOptions(5);

  const [ Graduation, setGraduation ] = useState( GraduationData );
  const { getSessionData, updateSessionData } = useSessionStorage();

  // valueの初期値をセット
  useEffect(() => {
    // セッションデータ取得
      const SessionData = getSessionData("accountData");
      console.log(SessionData);
      console.log("SessionData.Graduation:::"+SessionData.Graduation);
      if (GraduationData !== undefined) {
        // DBからのデータをオブジェクト化する
        const ObjectGraduationData = { value: GraduationData, label: `${GraduationData}年` };
        if (SessionData.Graduation === undefined) {
          console.log("SessionData.Graduation === undefined");

        }
        if (SessionData.Graduation !== undefined && SessionData.Graduation !== "") {
          console.log("qqqqqqqqqqqqqqqqq");
          // セッションストレージから最新のデータを取得
          setGraduation(SessionData.Graduation);
        } else {
          console.log("rrrrrrrrrrrrrrrrrrr");
          // DBから最新のデータを取得
          setGraduation(ObjectGraduationData);
        }
      }

  }, [GraduationData]);

  const handleChange = (Option) => {
    setGraduation(Option);
    console.log("Option", Option);

    updateSessionData("accountData", "Graduation", `${Option.value}`);
  };

    // 編集中のデータを保存しておく
    useEffect(() => {
      updateSessionData("accountData", "Graduation", Graduation);
    }, [Graduation]);

  return (
      <Select
        name="yearOptions"
        options={yearOptions}
        value={Graduation}
        onChange={handleChange}
        placeholder="Select..."
        required
      />
  );
};

GraduationYearDropdown.propTypes = {
  GraduationData: PropTypes.func,
};

export default GraduationYearDropdown;
