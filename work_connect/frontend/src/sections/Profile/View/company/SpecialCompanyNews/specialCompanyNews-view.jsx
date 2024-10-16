import { useContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import { AllItemsContext } from "src/layouts/dashboard/index";
import { useParams } from "react-router-dom";
import ListView from "src/components/view/list-view";
import { useSessionStorage } from "src/hooks/use-sessionStorage";

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

export default function NavTabs() {
  const { setAllItems } = useContext(AllItemsContext);
  const { user_name } = useParams();
  const { getSessionData, updateSessionData } = useSessionStorage();
  const [value, setValue] = useState(0);
  const [ProfileTabState, setProfileTabState] = useState(getInitialProfileTabState());

  useEffect(() => {
    updateSessionData("accountData", "ProfileTabState", ProfileTabState);
  }, [ProfileTabState, updateSessionData]);

  function getInitialProfileTabState() {
    const accountData = getSessionData("accountData");
    return accountData.ProfileTabState || 0; // 初期値をセッションから取得
  }

  useEffect(() => {
    setAllItems((prevItems) => ({
      ...prevItems,
      ResetItem: true,
      DataList: [],
      IsSearch: { searchToggle: 0, Check: false, searchResultEmpty: false },
      Page: 1,
      sortOption: "orderNewPostsDate",
    }));
  }, [setAllItems]);

  // popstate イベントでURLのクエリパラメータを確認し、タブの状態を再設定する
  useEffect(() => {
    const handlePopState = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const category = urlParams.get('category');
      let newValue;

      switch (category) {
        case 'internships':
          newValue = 1;
          break;
        case 'sessions':
          newValue = 2;
          break;
        case 'blogs':
          newValue = 3;
          break;

        case 'joboffers':
        default:
          newValue = 0;
          break;
      }

      setValue(newValue);  // 正しいタブの値を設定
      setProfileTabState(newValue);
    };

    // popstate イベントをリスニング
    window.addEventListener('popstate', handlePopState);

    // コンポーネントのアンマウント時にリスナーを削除
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const handleTabClick = (event, newValue) => {
    if (
      event.type !== 'click' ||
      (event.type === 'click' && samePageLinkNavigation(event))
    ) {
      setValue(newValue);
      setProfileTabState(newValue);  // インデックスをそのまま保存

      let category;
      switch (newValue) {
        case 0:
          category = 'joboffers';
          break;
        case 1:
          category = 'internships';
          break;
        case 3:
          category = 'blogs';
          break;
        case 2:
          category = 'sessions';
          break;
        default:
          category = 'joboffers';
      }

      // ページ遷移または状態の更新処理
      pageCheck(`news&category=${category}`);
    }
  };

  function pageCheck(pageStr) {
    const url = new URL(window.location.href);
    const urlStr = url.pathname.split('?')[0]; // クエリパラメータを取り除く
    window.history.pushState({}, '', `${urlStr}?page=${pageStr}`);
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs
        value={value}
        aria-label="nav tabs example"
        role="navigation"
      >
        <LinkTab label="求人" onClick={(e) => handleTabClick(e, 0)} />
        <LinkTab label="インターンシップ" onClick={(e) => handleTabClick(e, 1)} />
        <LinkTab label="説明会" onClick={(e) => handleTabClick(e, 2)} />
        <LinkTab label="ブログ" onClick={(e) => handleTabClick(e, 3)} />
      </Tabs>
      {value === 0 && <ListView type="specialjoboffers" ParamUserName={user_name} />}
      {value === 1 && <ListView type="specialinternships" ParamUserName={user_name} />}
      {value === 2 && <ListView type="specialsessions" ParamUserName={user_name} />}
      {value === 3 && <ListView type="specialblogs" ParamUserName={user_name} />}
    </Box>
  );
}
