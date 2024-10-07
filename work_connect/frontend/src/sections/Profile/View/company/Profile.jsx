import { useState, useEffect,useContext } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import ProfileMypage from './Mypage';
import ProfileNews from './News';
import { useSessionStorage } from "src/hooks/use-sessionStorage";
import { AllItemsContext } from "src/layouts/dashboard/index";


// 同一ページ内リンク用のナビゲーション制御
function samePageLinkNavigation(event) {
  if (
    event.defaultPrevented ||
    event.button !== 0 || // 左クリックのみ許可
    event.metaKey ||
    event.ctrlKey ||
    event.altKey ||
    event.shiftKey
  ) {
    return false;
  }
  return true;
}

// カスタムリンクタブ
function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={(event) => {
        if (samePageLinkNavigation(event)) {
          event.preventDefault(); // ナビゲーションを防止
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

// Profile コンポーネントで value を NavTabs に渡す
const Profile = ({ value }) => {
  return (
    <div>
      <NavTabs initialTabValue={value} /> {/* value を initialTabValue として渡す */}
    </div>
  );
};

export default Profile;

// NavTabs コンポーネント
export function NavTabs({ initialTabValue = 0 }) {
  const { getSessionData, updateSessionData } = useSessionStorage();
  const [ProfileTabState, setProfileTabState] = useState(getInitialProfileTabState);
  const { setAllItems } = useContext(AllItemsContext);
  const [value, setValue] = useState(initialTabValue);

  useEffect(() => {
    updateSessionData("accountData", "ProfileTabState", ProfileTabState);
  }, [ProfileTabState]);

  function getInitialProfileTabState() {
    const accountData = getSessionData("accountData");
    return accountData.ProfileTabState || 0; // 初期値を設定
  }

  useEffect(() => {
    setValue(0);
  }, []);

  const handleTabClick = (event, newValue) => {

    // event.type can be equal to focus with selectionFollowsFocus.
    if (
      event.type !== 'click' ||
      (event.type === 'click' && samePageLinkNavigation(event))
    ) {
      setValue(newValue);
    }
    if (newValue === 0) {
      // マイページが押されたとき
      setProfileTabState(0);
      pageCheck('mypage');
      // 検索アイコン非表示にする
    } else if (newValue === 1) {
      // 作品が押されたとき
      setProfileTabState(1);
      pageCheck('news&category=joboffers');
    }
    setAllItems((prevItems) => ({
      ...prevItems, //既存のパラメータ値を変更するためにスプレッド演算子を使用
      ResetItem: true,
      DataList: [], //検索してない状態にするために初期化 //searchbar.jsxのsearchSourceも初期化
      IsSearch: { searchToggle: 0, Check: false, searchResultEmpty: false },
      Page: 1, //スクロールする前の状態にするために初期化
      sortOption: "orderNewPostsDate", //並び替える前の状態にするために初期化
    }));
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
        <Tab label="マイページ" onClick={(e) => handleTabClick(e, 0)} />
        <Tab label="ニュース" onClick={(e) => handleTabClick(e, 1)} />
      </Tabs>
      {value === 0 && <ProfileMypage />} {/* value が 0 の場合マイページ */}
      {value === 1 && <ProfileNews />}   {/* value が 1 の場合ニュース */}
    </Box>
  );
}

NavTabs.propTypes = {
  initialTabValue: PropTypes.number, // 初期タブを指定するためのプロパティ
};

Profile.propTypes = {
  value: PropTypes.number,
};
