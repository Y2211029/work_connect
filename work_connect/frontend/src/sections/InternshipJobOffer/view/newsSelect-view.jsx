import { useContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { useSessionStorage } from "src/hooks/use-sessionStorage";
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import { AllItemsContext } from "src/layouts/dashboard/index";
import { useNavigate } from "react-router-dom";

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
  const { getSessionData, updateSessionData } = useSessionStorage();
  const { setAllItems } = useContext(AllItemsContext);

  const getInitialNewsTabState = () => {
    const accountData = getSessionData("accountData");
    return accountData.NewsTabState ? accountData.NewsTabState : 0;
  };

  const [NewsTabState, setNewsTabState] = useState(getInitialNewsTabState);
  const [value, setValue] = useState(getInitialNewsTabState);
  let navigate = useNavigate();

  useEffect(() => {
    updateSessionData("accountData", "NewsTabState", NewsTabState);
  }, [NewsTabState]);

  const handleChange = (event, newValue) => {
    if (
      event.type !== 'click' ||
      (event.type === 'click' && samePageLinkNavigation(event))
    ) {
      setValue(newValue);
    }

    setAllItems((prevItems) => ({
      ...prevItems,
      ResetItem: true,
      DataList: [],
      IsSearch: { searchToggle: 0, Check: false, searchResultEmpty: false },
      Page: 1,
      sortOption: "orderNewPostsDate",
    }));

    // `newValue` に基づいてパスを変更
    let path;
    if (newValue === 0) {
      setNewsTabState(0);
      path = "/Internship_JobOffer/joboffers";
    } else if (newValue === 1) {
      setNewsTabState(1);
      path = "/Internship_JobOffer/internships";
    } else if (newValue === 2) {
      setNewsTabState(2);
      path = "/Internship_JobOffer/blogs";
    }

    // navigate 関数を直接呼び出して遷移する
    navigate(path);

  };

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="nav tabs example"
        role="navigation"
      >
        <Tab label="求人" />
        <Tab label="インターンシップ" />
        <Tab label="ブログ" />
      </Tabs>
    </Box>
  );
}
