import { forwardRef, useState } from "react";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Summary from "./Summary";
import Question from "./Question";
import Individual from "./Individual";
import './checkform.css';

const PostCard = forwardRef(({ post }) => {
  const { application_form } = post;
  console.log("application_form", application_form);

  const [writeformshow, setWriteFormShow] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(0);
  const [viewingStudentName, setViewStudentName] = useState("");

  const handleClick = (index) => {
    setOpen(!open);
    if (selectedIndex === index) return;
    setWriteFormShow(true);
    setSelectedIndex(index);
  };

  const handleTabClick = (event, newValue) => {
    setValue(newValue);
  };

  const groupedResponses = application_form[selectedIndex]?.user_name.reduce((acc, user) => {
    user.write_form.elements.forEach((response) => {
      if (!acc[response.title]) {
        acc[response.title] = { responses: [], type: response.type, contents: response.contents };
      }
      acc[response.title].responses.push(response.response);
    });
    return acc;
  }, {});

  return (
    <>
      {application_form.length > 0 ? (
        <div style={{ width: '90%', margin: 'auto' }}>
          <List
            sx={(theme) => ({
              width: '100%',
              height: '100%',
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
              <ListSubheader component="div" id="nested-list-subheader" className="news-list">
                ニュース一覧
              </ListSubheader>
            }
          >
            {application_form.map((posts, index) => (
              <ListItemButton
                onClick={() => handleClick(index)}
                key={index}
                id={index}
                sx={{
                  backgroundColor: selectedIndex === index ? 'gray' : 'transparent',
                  '&:hover': {
                    backgroundColor: selectedIndex === index ? 'darkgray' : 'lightgray',
                  },
                }}
              >
                <ListItemText
                  primary={
                    <>
                      <Typography className="circle_number">
                        {posts.user_name.length}
                      </Typography>
                      <Tooltip title={posts.article_title}>
                        <Typography
                          textOverflow="ellipsis"
                          sx={{
                            fontSize: '0.8rem',
                            overflow: 'hidden',
                            whiteSpace: 'nowrap',
                            textOverflow: 'ellipsis',
                          }}
                        >
                          {posts.article_title}
                        </Typography>
                      </Tooltip>
                    </>
                  }
                />
              </ListItemButton>
            ))}
          </List>
        </div>

      ) : (
        <Typography>
        応募フォームはありません
        </Typography>
      )}

      {writeformshow && selectedIndex !== null && application_form.length > 0 && (
        <div className="writeformshow">

          <div className="write-form">
            <Box className="FormSelect-Box">
              <Tabs value={value} aria-label="nav tabs example" role="navigation" centered>
                <Tab label="要約" onClick={(e) => handleTabClick(e, 0)} />
                <Tab label="回答別" onClick={(e) => handleTabClick(e, 1)} />
                <Tab label="個別" onClick={(e) => handleTabClick(e, 2)} />
              </Tabs>
            </Box>

            {value === 0 && (
              <Summary
                application_form={application_form}
                selectedIndex={selectedIndex}
                GroupedResponses={groupedResponses}
                HandleTabClick={handleTabClick}
                setViewStudentName={setViewStudentName}
              />
            )}
            {value === 1 && (
              <Question
                application_form={application_form}
                selectedIndex={selectedIndex}
                GroupedResponses={groupedResponses}
              />
            )}
            {value === 2 && (
              <Individual
                application_form={application_form}
                selectedIndex={selectedIndex}
                GroupedResponses={groupedResponses}
                viewingStudentName={viewingStudentName}
              />
            )}
          </div>

        </div>
      )}
    </>
  );
});

PostCard.displayName = 'PostCard';

PostCard.propTypes = {
  post: PropTypes.shape({
    application_form: PropTypes.arrayOf(
      PropTypes.shape({
        article_title: PropTypes.string.isRequired,
        user_name: PropTypes.arrayOf(
          PropTypes.shape({
            news_created_at: PropTypes.string.isRequired,
            user_name: PropTypes.string.isRequired,
            write_form: PropTypes.arrayOf(
              PropTypes.shape({
                id: PropTypes.string.isRequired,
                title: PropTypes.string.isRequired,
                type: PropTypes.string.isRequired,
                response: PropTypes.string.isRequired,
                contents: PropTypes.string.isRequired,
              })
            ).isRequired,
            write_form_id: PropTypes.number.isRequired,
          })
        ).isRequired,
      })
    ).isRequired,
  }).isRequired,
};

export default PostCard;
