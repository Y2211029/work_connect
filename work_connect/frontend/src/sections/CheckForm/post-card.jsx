import { useEffect, forwardRef, useState } from "react";
import PropTypes from "prop-types";
import { useSessionStorage } from "src/hooks/use-sessionStorage";
import Typography from "@mui/material/Typography";
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

//Survey.js
import { Model } from 'survey-core';
import { Survey } from 'survey-react-ui';
import 'survey-core/defaultV2.min.css';
import ListView from "src/components/view/list-view";
import './writeform.css';



// ----------------------------------------------------------------------

function samePageLinkNavigation(event) {
  return !(
    event.defaultPrevented ||
    event.button !== 0 ||
    event.metaKey ||
    event.ctrlKey ||
    event.altKey ||
    event.shiftKey
  );
}

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={(event) => {
        if (samePageLinkNavigation(event)) {
          event.preventDefault();
        }
      }}
      aria-current={props.selected ? 'page' : undefined}
      {...props}
    />
  );
}

LinkTab.propTypes = {
  selected: PropTypes.bool,
};

const PostCard = forwardRef(({ post },) => {
  const { article_title, user_name } = post;

  const { getSessionData, updateSessionData } = useSessionStorage();
  const accountData = getSessionData("accountData") || {};
  const data = {
    account_id: accountData.id,
  };

  const [open, setOpen] = useState(false);
  const [surveyModel, setSurveyModel] = useState(null);
  const [value, setValue] = useState(0);
  const [FormTabState, setFormTabState] = useState(getInitialFormTabState());


  // ログイン中のid
  const MyUserId = data.account_id;
  console.log(MyUserId);

  const handleClick = () => {
    setOpen(!open);
  };

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

  useEffect(() => {
    updateSessionData("accountData", "FormTabState", FormTabState);
  }, [FormTabState]);


  function getInitialFormTabState() {
    const accountData = getSessionData("accountData");
    return accountData.FormTabState || 0; // 初期値をセッションから取得
  }


  const FormOpen = (user) => {
    if (user) {
      updateSessionData("accountData", "ChatOpenId", user.wright_form_id);
      updateSessionData("accountData", "ChatOpenUserName", user.user_name);
      updateSessionData("accountData", "ChatOpenCompanyName", user.company_name || "");
      updateSessionData("accountData", "ChatOpenIcon", user.icon || "");
      updateSessionData("accountData", "ChatOpenFollowStatus", user.follow_status || "");

      const surveyData = transformFormFields(user.wright_form,user.user_name);
      const survey = new Model(surveyData);

      // Survey モデルを状態に保存
      setSurveyModel(survey);
    }
  };

  const transformFormFields = (fields,user_name) => {
    if (!Array.isArray(fields) || fields.length === 0) {
      console.error("フォームフィールドがありません。fields:", fields);
      return {
        title: user_name,
        pages: [],
      };
    }

    return {
      title: user_name,  
      pages: [
        {
          name: "page1",
          elements: fields.map(field => ({
            type: field.type || "text", // typeがない場合のデフォルトを追加
            name: field.name || "default_name", // nameがない場合のデフォルトを追加
            title: field.title || "無題の質問", // titleがない場合のデフォルトを追加
            ...(field.inputType && { inputType: field.inputType }),
            ...(field.validators && { validators: field.validators }),
            ...(field.response && { defaultValue: field.response }),
            readOnly: true, // 全てのフィールドをreadOnlyに設定
          })),
        },
      ],
    };
  };

  const handleTabClick = (event, newValue) => {
    if (
      event.type !== 'click' ||
      (event.type === 'click' && samePageLinkNavigation(event))
    ) {
      setValue(newValue);
      setFormTabState(newValue);  // インデックスをそのまま保存

      let category;
      switch (newValue) {
        case 1:
          category = 'application_form_list';
          break;
        case 2:
          category = 'statistical_data';
          break;
        default:
          category = 'application_form_list';
      }

      // ページ遷移または状態の更新処理
      pageCheck(`category=${category}`);
    }
  };

  
  function pageCheck(pageStr) {
    const url = new URL(window.location.href);
    const urlStr = url.pathname.split('?')[0]; // クエリパラメータを取り除く
    window.history.pushState({}, '', `${urlStr}&${pageStr}`);
  }

  return (
    <>

      <Box sx={{ width: '100%' }}>
        <Tabs
          aria-label="nav tabs example"
          role="navigation"
        >
          <Tab label="フォームを見る" onClick={(e) => handleTabClick(e, 1)} />
          <Tab label="統計データを見る" onClick={(e) => handleTabClick(e, 2)} />
        </Tabs>
        {value === 1 &&  <ListView type="specialforms" ParamUserName={user_name} />}
        {value === 2 && <ListView type="specialstatisticaldata" ParamUserName={user_name} />}
      </Box>

    <List
      sx={(theme) => ({
        width: '100%',
        height: '100%',
        maxWidth: 360,
        marginLeft: '0',
        bgcolor: 'background.paper',
        overflow: 'auto',
        border: '#DAE2ED 2px solid',
        borderRadius: '10px',
        [theme.breakpoints.down('1200')]: {
          marginLeft: '2%',
        },
      })}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          ニュース一覧
        </ListSubheader>
      }
    >
    
      <ListItemButton
        onClick={handleClick}
      >
        <ListItemText
          primary={
            <Typography sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}>
              {article_title}
            </Typography>
          }
        />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>

      {/* 送信者の名前一覧 */}
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding 
                  sx={{
                    pl: 4,
                    background: user_name.some(u => u.wright_form_id === accountData.ChatOpenId) ? '#cce5ff' : 'blue',
                    '&:hover': {
                      background: user_name.some(u => u.wright_form_id === accountData.ChatOpenId) ? '#cce5ff' : '#eee',
                    },
                  }}
        >
          {user_name.map((user, index) => (
            <Typography
              key={user.wright_form_id || index} // ユーザーIDまたはインデックスをキーにする
              sx={{ fontWeight: 'bold', fontSize: '1.1rem', textAlign: "center" }}
              onClick={() => FormOpen(user)}
            >
              {user.user_name}さん {/* ユーザー名を表示 */}
            </Typography>
          ))}
        </List>
      </Collapse>
    </List>

    {surveyModel &&
    <Box>

    <Survey model={surveyModel} />
    </Box>
    }

    </>
  );
});

// displayName を設定
PostCard.displayName = 'PostCard';

PostCard.propTypes = {
  post: PropTypes.shape({
    article_title: PropTypes.string,
    user_name: PropTypes.arrayOf( // 配列の定義に変更
      PropTypes.shape({
        wright_form_id: PropTypes.number,
        user_name: PropTypes.string,
        company_name: PropTypes.string,
        icon: PropTypes.string,
        follow_status: PropTypes.bool,
      })
    ).isRequired,
  }).isRequired,
  user: PropTypes.shape({
    wright_form_id: PropTypes.string,
    user_name: PropTypes.string,
    company_name: PropTypes.string,
    icon: PropTypes.string,
    follow_status: PropTypes.bool,
    wright_form: PropTypes.arrayOf(PropTypes.shape({
      type: PropTypes.string,
      name: PropTypes.string,
      title: PropTypes.string,
      inputType: PropTypes.string,
      validators: PropTypes.array,
      response: PropTypes.string,
    })),
  }).isRequired,
};


export default PostCard;
