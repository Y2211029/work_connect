import { useContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { useSessionStorage } from "src/hooks/use-sessionStorage";
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import { AllItemsContext } from "src/layouts/dashboard/index";
import ListView from "src/components/view/list-view";


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

  const [value, setValue] = useState(getInitialNewsTabState);
  const [currentView, setCurrentView] = useState("");

  useEffect(() => {
    updateSessionData("accountData", "NewsTabState", value);

    let newView;
    if (value === 0) {
      newView = <ListView type={"joboffers"} />;
    } else if (value === 1) {
      newView = <ListView type={"internships"} />;
    } else if (value === 2) {
      newView = <ListView type={"blogs"} />;
    }
    setCurrentView(newView);

  }, [value]);

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

      {currentView}
    </Box>
  );
}
