import { useEffect, forwardRef } from "react";
import PropTypes from "prop-types";
import { useSessionStorage } from "src/hooks/use-sessionStorage";
import { Model } from 'survey-core';
import { Survey } from 'survey-react-ui';
import 'survey-core/defaultV2.min.css';
import './writeform.css';
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";

// ----------------------------------------------------------------------

const PostCard = forwardRef(({ post }, ref) => {
  const { company_id, wright_form, news_id, article_title, answerer_name, icon_id } = post;

  const { getSessionData } = useSessionStorage();
  const accountData = getSessionData("accountData");
  const data = {
    account_id: accountData.id,
  };

  useEffect(() => {
    console.log("company_id", company_id);
    console.log("news_id", news_id);
    console.log("account_id", data.account_id);
    console.log("フォームフィールド", wright_form);
  }, [company_id, wright_form, data.account_id]);

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
    if (!fields || !Array.isArray(fields)) {
      console.error("フォームフィールドがありません。fields:", fields);
      return {
        title: "アンケートタイトル",
        pages: [],
      };
    }

    return {
      title: "アンケートaaタイトル",
      pages: [
        {
          name: "page1",
          elements: fields.map(field => ({
            type: field.type,
            name: field.name,
            title: field.title,
            ...(field.inputType && { 
              inputType: field.inputType
            }), 
            ...(field.validators && { validators: field.validators }), 
            ...(field.response && { defaultValue: field.response }),
            readOnly: true  // ここで読み取り専用を設定
          })),
        }
      ]
    };
  };

  // フォームフィールドデータをSurvey形式に変換
  const surveyData = transformFormFields(wright_form);

  // Survey モデルの生成
  const survey = new Model(surveyData);
  console.log(survey);

  // タイトル
  const renderTitle = (
    <Typography
      style={{
        color: "common.black",
        height: 30,
        fontWeight: "Bold",
        padding: "5px",
      }}
    >
      {article_title}のフォーム一覧
    </Typography>
  );

  // 回答者
  const renderAnswererName = (
    <Typography
      style={{
        color: "common.black",
        height: 30,
        fontWeight: "Bold",
        padding: "5px",
      }}
    >
      {answerer_name}さん
    </Typography>
  );

  // 回答者アイコン
  const renderAvatar = (
    <Avatar
      alt={answerer_name}
      src={icon_id}
      sx={{
        zIndex: 9,
        width: 30,
        height: 30,
      }}
    />
  );

  // 回答者のプロフィール誘導
  const renderAnswererProfile = (
    <Link
      to={`/Profile/${answerer_name}`}
    >
      {answerer_name}さんのプロフィール
    </Link>
  );

  // フォーム
  const renderSurvey = (
    <Survey model={survey} />
  );

  return (
    <Box ref={ref} display="flex" flexDirection="column" gap={5}>
      {renderTitle}
      {renderAnswererName}
      {renderAvatar}
      {renderAnswererProfile}
      {renderSurvey}
    </Box>
  );
});

// displayName を設定
PostCard.displayName = 'PostCard';

PostCard.propTypes = {
  post: PropTypes.shape({
    company_id: PropTypes.string,
    news_id: PropTypes.string,
    article_title: PropTypes.string,
    answerer_name: PropTypes.string,
    icon_id: PropTypes.string,
    wright_form: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      inputtype: PropTypes.string,
      validators: PropTypes.array,
    })).isRequired, // JSON 配列として修正
  }).isRequired,
};

export default PostCard;
