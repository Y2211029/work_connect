import { useEffect, forwardRef } from "react";
import PropTypes from "prop-types";
import { useSessionStorage } from "src/hooks/use-sessionStorage";
import { Model } from 'survey-core';
import { Survey } from 'survey-react-ui';
import 'survey-core/defaultV2.min.css';

// ----------------------------------------------------------------------

const PostCard = forwardRef(({ post }, ref) => {
  const { company_id, create_form } = post;

  const { getSessionData } = useSessionStorage();
  const accountData = getSessionData("accountData");
  const data = {
    account_id: accountData.id,
  };

  useEffect(() => {
    console.log("company_id", company_id);
    console.log("account_id", data.account_id);
    console.log("フォームフィールド", create_form);
  }, [company_id, create_form, data.account_id]);

  // フォームフィールドをSurveyの形式に変換する
  const transformFormFields = (fields) => {
    return {
      title: "アンケートタイトル",
      pages: [
        {
          name: "page1",
          elements: fields.map(field => ({
            type: field.type,
            name: field.name,
            title: field.title,
            ...(field.inputtype && { inputType: field.inputtype }), // inputtypeがある場合に追加
            ...(field.validators && { validators: field.validators }), // validatorsがある場合に追加
          })),
        }
      ]
    };
  };

  // フォームフィールドデータをSurvey形式に変換
  const surveyData = transformFormFields(create_form);

  // Survey モデルの生成
  const survey = new Model(surveyData);

  return (
    <div ref={ref}>
      <Survey model={survey} />
    </div>
  );
});

// displayName を設定
PostCard.displayName = 'PostCard';

PostCard.propTypes = {
  post: PropTypes.shape({
    company_id: PropTypes.string,
    create_form: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      inputtype: PropTypes.string,
      validators: PropTypes.array,
    })).isRequired, // JSON 配列として修正
  }).isRequired,
};

export default PostCard;
