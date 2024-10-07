import { useEffect, forwardRef, useState } from "react";
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
import Tooltip from '@mui/material/Tooltip';
import Stack from "@mui/material/Stack";

// ----------------------------------------------------------------------

const PostCard = forwardRef(({ post },) => {
  const { company_id, wright_form, news_id, article_title, answerer_name, icon_id } = post;

  const { getSessionData } = useSessionStorage();
  const accountData = getSessionData("accountData");
  const data = {
    account_id: accountData.id,
  };

  const [showForm, setShowForm] = useState(false); // 修正: useStateを正しく宣言

  useEffect(() => {
    console.log("company_id", company_id);
    console.log("news_id", news_id);
    console.log("account_id", data.account_id);
    console.log("フォームフィールド", wright_form);
  }, [company_id, wright_form, data.account_id]);

  useEffect(() => {
    const css =
      `.sv-action__content .sd-btn--action.sd-navigation__complete-btn {
        display: none;
      }`;
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = css;
    document.head.appendChild(styleSheet);
  }, []);

  const transformFormFields = (fields) => {
    if (!fields || !Array.isArray(fields)) {
      console.error("フォームフィールドがありません。fields:", fields);
      return {
        title: "アンケートタイトル",
        pages: [],
      };
    }

    return {
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
            readOnly: true
          })),
        }
      ]
    };
  };

  const surveyData = transformFormFields(wright_form);
  const survey = new Model(surveyData);
  console.log(survey);

  const renderTitle = (
    <Tooltip title={article_title} arrow>
      <Typography
        className="article-title"
        onClick={() => setShowForm(true)}
      >
        {article_title}
      </Typography>
    </Tooltip>
  );

  const renderAnswererProfile = (
    <div className="answerer-profile">
      <div className="profile-header">
        <Link to={`/Profile/${answerer_name}`} className="profile-link">
          <Typography className="answerer-name">
            {answerer_name}さん
          </Typography>
        </Link>
        <Avatar
          alt={answerer_name}
          src={icon_id}
          className="answerer-avatar"
        />
      </div>
      <Box className="survey-box">
        <Survey model={survey} className="survey" />
      </Box>
    </div>
  );


  return (
    <Stack
      direction="row"
      justifyContent="center"
      alignItems="flex-start"
    >
      <Box className="title-box">
        {renderTitle}
      </Box>

      <Stack display={showForm ? "block" : "none"} className="form-stack" direction="column" alignItems="flex-start">
        {renderAnswererProfile}
      </Stack>
    </Stack>
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
    })).isRequired,
  }).isRequired,
};

export default PostCard;
