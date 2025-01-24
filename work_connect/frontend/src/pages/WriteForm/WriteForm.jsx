import { useEffect, useState } from "react";
import { Helmet } from 'react-helmet-async';
import { useParams } from "react-router-dom";
import axios from "axios";
import { Model } from 'survey-core';
import { Survey } from 'survey-react-ui';
import 'survey-core/defaultV2.min.css';
import Button from '@mui/material/Button';
import PropTypes from "prop-types";
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';
import { useSessionStorage } from "src/hooks/use-sessionStorage";
import './writeform.css';
import { ColorRing } from "react-loader-spinner";

import * as themes from "survey-core/themes";

// ----------------------------------------------------------------------

export default function WriteFormPage() {

  const { newsdetail_id } = useParams()
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
  let backGroundColor;
  let barColor;
  let titleColor;
  let questionTitleColor;

  useEffect(() => {
    //ニュースのデータを抽出する
    async function fetchData() {
      try {
        const response = await axios.get(`http://localhost:8000/write_form_get`, {
          params: {
            NewsId: newsdetail_id, //今ログインしているニュースのid
          },
        });
        console.log("レスポンスデータ", response.data);
        const WriteForm = response.data;
        SetCompanyId(WriteForm.company_id);
        SetCreateForm(WriteForm.create_form);
        SetNewsId(WriteForm.news_id);
      } catch (error) {
        console.error("データの取得中にエラーが発生しました！", error);
      }
    }
    fetchData();
  }, [newsdetail_id]);

  // Survey モデルの生成
  const survey = new Model(createForm);
  console.log("createForm.themeSettings",createForm.themeSettings);

  if (createForm.themeSettings) {
    const themeObject = themes[createForm.themeSettings.themeKey];
    console.log('themeobjectがありました', themeObject);
    backGroundColor = createForm.themeSettings.backgroundColor;
    barColor = createForm.themeSettings.barColor;
    titleColor = createForm.themeSettings.titleColor;
    questionTitleColor = createForm.themeSettings.questionTitleColor;
    themeObject.cssVariables["--sjs-general-backcolor-dim"] = backGroundColor;  // 背景色設定
    themeObject.cssVariables["--sjs-primary-backcolor"] = barColor;            // バーの色設定
    themeObject.cssVariables["--sjs-font-surveytitle-color"] = titleColor;     // タイトルの色設定
    themeObject.cssVariables["--sjs-font-questiontitle-color"] = questionTitleColor; // 質問タイトルの色設定

    survey.applyTheme(themeObject); // テーマを再適用
    console.log("テーマオブジェクトの中身", themeObject);
  } else {
    console.log("クリエイトフォームの中身", createForm);
    // backGroundColor = createForm.cssVariables["--sjs-border-default"];
    console.log("サーベイ:", survey);
    console.log("現在のテーマオブジェクト:", survey.cssValue);
    // console.log("テーマCSS変数:", survey.theme.cssVariables);
  }

  useEffect(() => {
    // 完了ボタンを非表示にする
    const css = `
      .sv-action__content .sd-btn--action.sd-navigation__complete-btn {
        display: none;
      }
      .Form{
        background-color: ${backGroundColor};
      }
    `;
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = css;
    document.head.appendChild(styleSheet);
  }, [backGroundColor]);


  const WriteFormSave = () => {
    const isValid = survey.validate();
    const Apply_Check  = confirm("本当に応募しますか?");

    if (isValid && Apply_Check) {
      console.log("フォームは有効です。保存処理を実行します。");



      // フォームのデータを取得
      const formData = survey.data;
      console.log("保存するデータ:", formData);
      console.log("サーベイ:", survey);
      console.log("フォームデータ:", createForm);

      // フォーム定義とユーザーの回答を統合する
      const transformFormFieldsWithResponses = (fields, responses) => {
        return fields.map(field => {
          // ユーザーの回答を取得
          const response = responses[field.name] || null; // 回答がなければ null
          return {
            ...field,
            response // フィールドに対応する回答を追加
          };
        });
      };

      // フォーム定義とユーザーの回答を統合
      const formDefinitionWithResponses = {
        title: createForm.title, // タイトルをそのまま保持
        elements: transformFormFieldsWithResponses(createForm.elements, formData) // フィールドと回答を統合
      };

      // 統合データを表示（確認用）
      console.log("Survey.js形式のデータ:", formDefinitionWithResponses);

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

      {survey ? (
        <>
          <Box className="WriteFormActionButton">
            <Tooltip title="戻る">
              <IconButton
                onClick={() => NewsDetailBack()}
                sx={{
                  '&:hover': { backgroundColor: '#f0f0f0' },
                }}
              >
                <ArrowBackOutlinedIcon className="NewsDetailBackButton" sx={{ fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" } }} />
              </IconButton>
            </Tooltip>

            <Button variant="outlined" onClick={WriteFormSave} className="FormApplyButton">
            応募する
          </Button>

          </Box>

          {/* <div className="WriteForm_Container">
          <Stack direction={"row"} sx={{ display: "inline-block" }}>
          <div className="Form">
            <div className="WriteForm">
              <Survey model={survey} />
            </div>
          </div>
          </Stack>
        </div> */}


          <div className="Form">
            <div className="ShowForm">
              <div className="SurveyModal">
                <Survey model={survey} />
              </div>
            </div>
          </div>

        </>
      ) : (
        <ColorRing
          visible={true}
          height="100"
          width="100"
          ariaLabel="color-ring-loading"
          wrapperStyle={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
          wrapperClass="custom-color-ring-wrapper" // カスタムクラスを指定
          colors={["#41a4ff", "#FFFFFF", "#41a4ff", "#41a4ff", "#FFFFFF"]}
          style={{ flexDirection: "column" }}
        />
      )}
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

