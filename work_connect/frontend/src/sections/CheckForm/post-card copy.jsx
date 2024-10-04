import { useContext, useState, useEffect, forwardRef } from "react";
import { Typography, Box, Avatar, Tabs, Tab, Stack} from "@mui/material";
import PropTypes from "prop-types";
import { useSessionStorage } from "src/hooks/use-sessionStorage";
import { Model } from 'survey-core';
import { Survey } from 'survey-react-ui';
import 'survey-core/defaultV2.min.css';
import './writeform.css';
import { Link } from "react-router-dom";
import { AllItemsContext } from "src/layouts/dashboard/index";

// ----------------------------------------------------------------------

const PostCard = forwardRef(({ post }, ref) => {
  const { company_id, wright_form, news_id, article_title, answerer_name, icon_id } = post;

  const { getSessionData, updateSessionData } = useSessionStorage();
  const accountData = getSessionData("accountData");
  const data = {
    account_id: accountData.id,
  };

  const getInitialProfileTabState = () => {
    return accountData.ProfileTabState || 0;
  };

  const [ProfileTabState, setProfileTabState] = useState(getInitialProfileTabState());
  const [value, setValue] = useState(ProfileTabState);
  const { setAllItems } = useContext(AllItemsContext);
  const [ShowForm, setShowForm] = useState(false);

  useEffect(() => {
    if (wright_form) {
      console.log("company_id", company_id);
      console.log("news_id", news_id);
      console.log("account_id", data.account_id);
      console.log("フォームフィールド", wright_form);
    }
  }, [company_id, wright_form, data.account_id]);

  useEffect(() => {
    updateSessionData("accountData", "ProfileTabState", ProfileTabState);
  }, [ProfileTabState, updateSessionData]);

  useEffect(() => {
    const css = `
      .sv-action__content .sd-btn--action.sd-navigation__complete-btn {
        display: none;
      }
    `;
    let styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = css;
    document.head.appendChild(styleSheet);

    return () => {
      document.head.removeChild(styleSheet);
    };
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
      title: "アンケートタイトル",
      pages: [
        {
          name: "page1",
          elements: fields.map(field => ({
            type: field.type,
            name: field.name,
            title: field.title,
            ...(field.inputType && { inputType: field.inputType }),
            ...(field.validators && { validators: field.validators }),
            ...(field.response && { defaultValue: field.response }),
            readOnly: true,
          })),
        },
      ],
    };
  };

  const surveyData = transformFormFields(wright_form);
  const survey = new Model(surveyData);

  const renderTitle = (
    <Typography
      style={{
        color: "common.black",
        height: 30,
        fontWeight: "Bold",
        padding: "5px",
      }}
    >
      {article_title}
    </Typography>
  );

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

  const renderAnswererProfile = (
    <Link to={`/Profile/${answerer_name}`}>
      {answerer_name}さんのプロフィール
    </Link>
  );

  const renderSurvey = (
    <Survey model={survey} />
  );

  function pageCheck(pageStr) {
    let url = new URL(window.location.href);
    let urlStr = location.pathname;
    if (url.searchParams.get('page') != null) {
      let urlStrArray = urlStr.split('?');
      urlStr = urlStrArray[0];
    }
    window.history.pushState('', '', urlStr + `?page=${pageStr}`);
  }

  function samePageLinkNavigation(event) {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.altKey ||
      event.shiftKey
    ) {
      return false;
    }
    return true;
  }

  const handleTabClick = (event, newValue) => {
    if (
      event.type !== 'click' ||
      (event.type === 'click' && samePageLinkNavigation(event))
    ) {
      setValue(newValue);
      setProfileTabState(newValue);
      pageCheck(newValue === 0 ? 'newsform' : newValue === 1 ? 'statistical_data' : 'default_page');

      setAllItems((prevItems) => ({
        ...prevItems,
        ResetItem: true,
        DataList: [],
        IsSearch: { searchToggle: 0, Check: false, searchResultEmpty: false },
        Page: 1,
        sortOption: "orderNewPostsDate",
      }));
    }
  };

  const NewsTitleClick = () => {
    setShowForm(true);
  };

  return (
    <Stack spacing={2}>
      <Box sx={{ width: '100%' }}>
        <Tabs
          value={value}
          aria-label="nav tabs example"
          role="navigation"
        >
          <Tab label="フォームを見る" onClick={(e) => handleTabClick(e, 0)} />
          <Tab label="統計データを見る" onClick={(e) => handleTabClick(e, 1)} />
        </Tabs>
      </Box>

      <span onClick={NewsTitleClick}>
        {renderTitle}
      </span>

      {ShowForm && (
        <Box ref={ref} display="flex" flexDirection="column" gap={2}>
          {renderAnswererName}
          {renderAvatar}
          {renderAnswererProfile}
          {renderSurvey}
        </Box>
      )}
    </Stack>
  );
});

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
      inputType: PropTypes.string,
      validators: PropTypes.array,
    })).isRequired,
  }).isRequired,
};

export default PostCard;
