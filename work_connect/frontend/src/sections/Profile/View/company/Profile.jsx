import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import ProfileMypage from './Mypage';
import ProfileNews from './News';

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
      aria-current={props.selected && 'page'}
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
  const [value, setValue] = React.useState(initialTabValue); // 初期値をプロパティから設定

  const handleChange = (event, newValue) => {
    if (
      event.type !== 'click' ||
      (event.type === 'click' && samePageLinkNavigation(event))
    ) {
      setValue(newValue); // タブの変更を処理
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="nav tabs example"
        role="navigation"
      >
        <LinkTab label="マイページ" href="/mypage" />
        <LinkTab label="ニュース" href="/news" />
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
  value:PropTypes.number,
}
