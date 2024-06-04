import React from "react";
import Select from "react-select";

const options = [
  { value: "旅行", label: "旅行" },
  { value: "読書", label: "読書" },
  { value: "ドライブ", label: "ドライブ" },
  { value: "映画鑑賞", label: "映画鑑賞" },
  { value: "筋トレ", label: "筋トレ" },
  { value: "カラオケ", label: "カラオケ" },
  { value: "スポーツ観戦", label: "スポーツ観戦" },
  { value: "ゲーム", label: "ゲーム" },
  { value: "プログラミング", label: "プログラミング" },
  { value: "DIY", label: "DIY" },
  { value: "釣り", label: "釣り" },
  { value: "料理", label: "料理" },
  { value: "ツーリング", label: "ツーリング" },
  { value: "音楽鑑賞", label: "音楽鑑賞" },
];

const Hobby = () => {
  return (
    <>
      <p>趣味</p>
      <Select options={options} isMulti />
    </>
  );
};

export default Hobby;
