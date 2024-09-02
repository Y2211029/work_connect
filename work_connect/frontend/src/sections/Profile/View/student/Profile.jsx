import * as React from 'react';
import { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { useSessionStorage } from "src/hooks/use-sessionStorage";

import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';


import ProfileMypage from './Mypage';
import ProfileWorks from './Works';
import ProfileVideos from './Videos';



function samePageLinkNavigation(event) {
  if (
    event.defaultPrevented ||
    event.button !== 0 || // ignore everything but left-click
    event.metaKey ||
    event.ctrlKey ||
    event.altKey ||
    event.shiftKey
  ) {
    return false;
  }
  return true;
}

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={(event) => {
        // Routing libraries handle this, you can remove the onClick handle when using them.
        if (samePageLinkNavigation(event)) {
          event.preventDefault();
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

export default function NavTabs() {

  // タブ状態のチェック
  const { getSessionData, updateSessionData } = useSessionStorage();

  /* セッションストレージからaccountDataを取得し、ProfileTabStateを初期値として設定
     ProfileTabStateがない場合は0をセットする */
  const getInitialProfileTabState = () => {
    const accountData = getSessionData("accountData");
    return accountData.ProfileTabState ? accountData.ProfileTabState : 0;
  };
  
  const [ProfileTabState, setProfileTabState] = useState(getInitialProfileTabState);
  const [value, setValue] = React.useState(getInitialProfileTabState);

  // ProfileTabStateが変化したとき
  useEffect(() => {
    updateSessionData("accountData", "ProfileTabState", ProfileTabState);
  }, [ProfileTabState]);

  const handleChange = (event, newValue) => {

    // event.type can be equal to focus with selectionFollowsFocus.
    if (
      event.type !== 'click' ||
      (event.type === 'click' && samePageLinkNavigation(event))
    ) {
      setValue(newValue);
    }
    if(newValue === 0){
      // マイページが押されたとき
      setProfileTabState(0);
    } else if(newValue === 1){
      // 作品が押されたとき
      setProfileTabState(1);
    } else if(newValue === 2){
      // 動画が押されたとき
      setProfileTabState(2);
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
        <Tab label="マイページ" />
        <Tab label="作品" />
        <Tab label="動画" />
      </Tabs>
      {value === 0 && <ProfileMypage />}
      {value === 1 && <ProfileWorks />}
      {value === 2 && <ProfileVideos />}
    </Box>
  );
  
}

