import { useContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import { AllItemsContext } from "src/layouts/dashboard/index";
import { useParams, useNavigate } from "react-router-dom";

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
  const { setAllItems } = useContext(AllItemsContext);
  const [value, setValue] = useState(1);
  const { user_name } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (value === 1) {
      navigate(`/Profile/${user_name}/News/JobOffers`);
    } else if (value === 2) {
      navigate(`/Profile/${user_name}/News/Internships`);
    } else if (value === 3) {
      navigate(`/Profile/${user_name}/News/Blogs`);
    }else if(value === 4){
      navigate(`/Profile/${user_name}/News/Forms`);
    }
  }, [value, navigate, user_name]);

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
        <LinkTab label="求人" value={1} />
        <LinkTab label="インターンシップ" value={2} />
        <LinkTab label="ブログ" value={3} />
        <LinkTab label="フォームを見る" value={4} />
      </Tabs>
    </Box>
  );
}
