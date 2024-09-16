import 'survey-core/defaultV2.min.css';
import { useState, useEffect } from "react";
import { Model } from 'survey-core';
import { Survey } from 'survey-react-ui';
import "./CreateForm.css";
import { useSessionStorage } from "src/hooks/use-sessionStorage";
import { useParams } from 'react-router-dom';


//フォームメニュー
import Text from "./SelectOptionMenu/Text";

//MUI
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';

//データ保存
import axios from "axios";

export default function CreateForm() {
  const [questions, setQuestions] = useState([
    { name: "Question1", title: "新しい質問1", type: "text" },
  ]);

  const [modalopen, setModalOpen] = useState(false);
  const [selectmenu, setSelectMenu] = useState("");
  const { getSessionData } = useSessionStorage();
  const [createformid, setCreateFormId] = useState(0);


  const accountData = getSessionData("accountData");
  const data = {
    id: accountData.id,
  };
  const { news_id } = useParams();
  const [ create_news_id ] = useState(news_id);

  const addQuestion = () => {
    const newQuestion = {
      id: `${questions.length + 1}`,
      name: `Question${questions.length + 1}`,
      title: `設定中`,
      type: "text",
    };
    setQuestions([...questions, newQuestion]);
    ModalOpen("text");
  };

  const ModalOpen = (genre) => {
    setSelectMenu(genre);
    setModalOpen(true);
  };

  // 保存時に質問を更新するための関数
  const handleSaveSettings = (settings) => {
    const updatedQuestions = questions.map((q, index) =>
      index === questions.length - 1
        ? { ...q,
          title:settings.title,
          inputtype:settings.inputType,
          maxLength: settings.maxLength,
          minLength: settings.minLength,
          placeholder: settings.placeholder,
          autocomplete: settings.autocomplete,
          isrequired: settings.isrequired,
          description: settings.description,
          validators: settings.validators
        }
        : q
    );
    setQuestions(updatedQuestions);
    setModalOpen(false); // モーダルを閉じる
  };

  const surveyJson = {
    elements: questions.map((q) => ({
      name: q.name,
      title: q.title,
      type: q.type,
      maxLength: q.maxLength || undefined,
      minLength: q.minLength || undefined,
      placeholder: q.placeholder || undefined,
      autocomplete: q.autocomplete || undefined,
      isRequired: q.isrequired || false,
      description: q.description || undefined,
      validators: q.validators || undefined,
    })),
  };

  const survey = new Model(surveyJson);

  useEffect(() => {
    // 完了ボタンを非表示にする
    const css = `
      .sv-action__content .sd-btn--action.sd-navigation__complete-btn {
        display: none;
      }
    `;
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = css;
    document.head.appendChild(styleSheet);
  }, []);

  //フォームの編集データを保存
  const CreateFormSave = async () => {
    console.log("フォーム内容", questions);

    // フォームの保存先URL
    const create_form_save_url = `http://localhost:8000/create_form_save`;

    try {
      console.log(questions);
      console.log(data.id);
      console.log(create_news_id);
      const response = await axios.post(create_form_save_url, {
        create_form_id: createformid, // フォームのID
        create_form: questions,       // フォームの内容
        company_id: data.id,          // 企業ID
        create_news_id: create_news_id, // どのニュースの応募用フォームなのか
      });
      // レスポンスの処理
      console.log("サーバーからのレスポンス", response.data);
      setCreateFormId(response.data.create_form_id);
      console.log(response.data.create_form_id);
    } catch (error) {
      // エラーハンドリング
      console.error("フォーム保存エラー", error);
    }
  };

  return (
    <>
      <Stack direction="row" alignItems="center" spacing={1}>
      <Survey model={survey} />
      {modalopen && (
        <div className="FormOptionModal">
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h4"></Typography>
            {selectmenu === "text" && <Text onSave={handleSaveSettings} />} {/* Textコンポーネントを呼び出し */}
          </Stack>
        </div>
      )}
      </Stack>


      <Button variant="outlined" onClick={CreateFormSave}
            sx={{width:"40px", borderColor: '#5956FF', color: '#5956FF', '&:hover': { borderColor: '#5956FF' }, cursor: 'pointer'}}>
            あいうえお
        </Button>


      <button className="TextFormButton" onClick={addQuestion}>テキストフォームを追加</button>
    </>
  );
}

// PropTypesバリデーション
Text.propTypes = {
  onSave: PropTypes.func.isRequired,
};
