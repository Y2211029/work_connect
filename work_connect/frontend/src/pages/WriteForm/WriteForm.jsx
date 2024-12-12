import { useEffect, useState } from "react";
import { Helmet } from 'react-helmet-async';
import { useParams } from "react-router-dom";
import axios from "axios";
import { Model } from 'survey-core';
import { Survey } from 'survey-react-ui';
import 'survey-core/defaultV2.min.css';
import Button from '@mui/material/Button';
import Stack from "@mui/material/Stack";
import PropTypes from "prop-types";
import { useSessionStorage } from "src/hooks/use-sessionStorage";
import './writeform.css';

// ----------------------------------------------------------------------

export default function WriteFormPage() {

  const { newsdetail_id } = useParams()
  const [title, SetTitle] = useState(null);
  const [companyId, SetCompanyId] = useState(null);
  const [newsId, SetNewsId] = useState(null);
  const [createForm, SetCreateForm] = useState([]);
  const writeformsaveurl = `http://localhost:8000/write_form_save`;

  console.log("ニュースid", newsdetail_id);

  const { getSessionData } = useSessionStorage();
  const accountData = getSessionData("accountData");
  const data = {
    account_id: accountData.id,
    account_username: accountData.user_name,
  };


  useEffect(() => {
    //ニュースのデータを抽出するc
    async function fetchData() {
      try {
        const response = await axios.get(`http://localhost:8000/write_form_get`, {
          params: {
            NewsId: newsdetail_id, //今ログインしている人のid
          },
        });
        console.log("レスポンスデータ", response.data);
        const WriteForm = response.data;
        SetTitle(WriteForm.title);
        SetCompanyId(WriteForm.company_id);
        SetCreateForm(WriteForm.create_form);
        SetNewsId(WriteForm.news_id);
      } catch (error) {
        console.error("データの取得中にエラーが発生しました！", error);
      }
    }
    fetchData();
  }, [newsdetail_id]);

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

  // フォームフィールドをSurveyの形式に変換する
  const transformFormFields = (fields) => {
    // fieldsが存在するかチェック
    console.error("バリデーション", fields.validators);

    if (!fields || !Array.isArray(fields)) {
      console.error("フォームフィールドがありません。fields:", fields);

      return {
        title: { title },
        pages: [],
      };
    }

    return {
      title: title,
      pages: [
        {
          name: "page1",
          elements: fields.map(field => ({
            type: field.type,
            name: field.name,
            title: field.title,
            ...(field.inputType && { inputType: field.inputType }), // inputType を確認
            ...(field.validators && { validators: field.validators }), // validators を確認
            ...(field.response && { defaultValue: field.response }),  // response を defaultValue に設定
            ...(field.choices && { choices: field.choices }), // choices を追加
            ...(field.placeholder && { placeholder: field.placeholder }), // placeholder を追加
            ...(field.description && { description: field.description }), //descriptionを追加
            ...(field.autocomplete && { autocomplete: field.autocomplete }),
            ...(field.autoGrow && { autoGrow: field.autoGrow }),
            ...(field.otherText && { otherText: field.otherText }),
            ...(field.showOtherItem && { showOtherItem: field.showOtherItem }),
            ...(field.clearText && { clearText: field.clearText }),
            ...(field.showClearButton && { showClearButton: field.showClearButton }),
            ...(field.colCount && { colCount: field.colCount }),
            ...(field.maxLength && { maxLength: field.maxLength }),
            ...(field.rows && { rows: field.rows }),
            ...(field.isrequired && { isrequired: field.isrequired }),
          })),
        }
      ]
    };
  };



  // フォームフィールドデータをSurvey形式に変換
  const surveyData = transformFormFields(createForm);

  // Survey モデルの生成
  const survey = new Model(surveyData);

  const WriteFormSave = () => {
    // Surveyモデルのバリデーション実行
    const isValid = survey.validate();

    if (isValid) {
      console.log("フォームは有効です。保存処理を実行します。");

      // フォームのデータを取得
      const formData = survey.data;
      console.log("保存するデータ:", formData);

      // フォーム定義とユーザーの回答を統合する
      const transformFormFieldsWithResponses = (fields, responses) => {
        return fields.map(field => ({
          ...field,
          response: responses[field.name] || null // ユーザーの回答をフォーム定義に追加
        }));
      };

      // フォーム定義とユーザーの回答を統合
      const formDefinitionWithResponses = transformFormFieldsWithResponses(createForm, formData);

      // 統合データを表示（確認用）
      console.log("フォーム定義と回答を統合したデータ:", formDefinitionWithResponses);

      // Axiosを使用してデータを保存する
      axios.post(writeformsaveurl, {
        FormData: formDefinitionWithResponses,
        NewsId: newsId,
        RecipientCompanyId: companyId,
        MyId: data.account_id,
      })
        .then(response => {
          console.log('保存成功', response);
          //応募履歴ページに飛ばす
          window.location.href = `/Profile/${data.account_username}?page=apply_history`;
        })

        .catch(error => {
          console.error('保存エラー', error);
        });
    } else {
      console.log("フォームにエラーがあります。修正してください。");

      // フォームの全質問を取得し、それぞれのエラーメッセージを表示
      const questions = survey.getAllQuestions();
      questions.forEach((question) => {
        // 各質問にエラーメッセージがある場合に表示
        if (question.errors && question.errors.length > 0) {
          question.errors.forEach((error) => {
            console.log(`質問「${question.title}」のエラー: ${error.text}`);
          });
        }
      });
    }
  };

  const NewsDetailBack = () => {
    window.location.href = `/NewsDetail/${newsdetail_id}`;
  };


  return (
    <>
      <Helmet>
        <title> 応募する | Work&Connect </title>
      </Helmet>

      <Button
        variant="outlined"
        onClick={() => NewsDetailBack()}
        sx={{
          position: 'sticky',
          top: '100px',
          width: '150px',
          borderColor: '#5956FF',
          color: '#5956FF',
          '&:hover': { borderColor: '#5956FF' },
          cursor: 'pointer',
        }}
      >
        ニュースに戻る
      </Button>

      <div className="WriteForm_Container">
        <Stack sx={{ display: "inline-block" }}>
          <div className="WriteForm">
            <Survey model={survey} />
          </div>
        </Stack>
        <Button variant="outlined" onClick={WriteFormSave}
        sx={{ position: 'relative', left:'300px', width: "100px", borderColor: '#5956FF', color: '#5956FF', '&:hover': { borderColor: '#5956FF' }, cursor: 'pointer' }}>
        応募する
      </Button>
      </div>



    </>
  );

}

// displayName を設定
WriteFormPage.displayName = 'WriteFormPage';

WriteFormPage.propTypes = {
  post: PropTypes.shape({
    company_id: PropTypes.string,
    news_id: PropTypes.string,
    article_title: PropTypes.string,
    create_form: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      inputtype: PropTypes.string,
      validators: PropTypes.array,
    })).isRequired,
  }).isRequired,
};

