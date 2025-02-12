import { forwardRef, useState, useEffect } from "react";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Summary from "./Summary";
import Question from "./Question";
import Individual from "./Individual";
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import HandshakeIcon from '@mui/icons-material/Handshake';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import useMediaQuery from '@mui/material/useMediaQuery';
import './checkform.css';

const PostCard = forwardRef(({ post }) => {
  const { application_form } = post;
  console.log("application_form", application_form);

  const JobOffer = application_form.filter((news) => {
    // user_name の配列をチェックして genre に "JobOffer" が含まれるか確認
    return news.user_name?.some((user) => user.genre === "JobOffer");
  });

  const Internship = application_form.filter((news) => {
    return news.user_name?.some((user) => user.genre === "Internship");
  });

  const Session = application_form.filter((news) => {
    return news.user_name?.some((user) => user.genre === "Session");
  });

  const [writeformshow, setWriteFormShow] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [value, setValue] = useState(0);
  const [viewingStudentName, setViewStudentName] = useState("");
  const [JobOfferGroupingOpen, setJobOfferGroupingOpen] = useState(true);
  const [InternshipGroupingOpen, setInternshipGroupingOpen] = useState(true);
  const [SessionGroupingOpen, setSessionGroupingOpen] = useState(true);
  const [showWriteForm, setShowWriteForm] = useState(false);
  const Screen = useMediaQuery("(max-width:600px) and (min-width:301px)");

  const toggleSlide = () => {
    const writeFormElement = document.querySelector('.writeformshow');
    if (writeFormElement) {
      writeFormElement.classList.remove('active'); // 'active' クラスのみ削除
    }

    // アニメーションが完了するまで待つためにsetTimeoutで非表示にする
    setTimeout(() => {
      setShowWriteForm(false);
      setSelectedIndex(null);
      // ここで非表示にする
    }, 300); // アニメーション時間と合わせて遅延（300msの例）
  };

  const groupinghandleClick = (genre) => {
    switch (genre) {
      case "JobOffer":
        setJobOfferGroupingOpen(!JobOfferGroupingOpen);
        break;
      case "Internship":
        setInternshipGroupingOpen(!InternshipGroupingOpen);
        break;
      case "Session":
        setSessionGroupingOpen(!SessionGroupingOpen);
        break;
      default: break;
    }

  };

  const handleClick = (index) => {
    if (selectedIndex === index) return;
    setWriteFormShow(true);
    setSelectedIndex(index);
  };

  const handleTabClick = (event, newValue) => {
    setValue(newValue);
  };

  console.log("application_form[selectedIndex]", application_form[selectedIndex]?.user_name);
  const groupedResponses = application_form[selectedIndex]?.user_name.reduce((acc, user) => {
    console.log("User Write Form Elements:", user);  // user.write_form.elementsをログ出力

    user.write_form.elements.forEach((response) => {
      console.log("Response:", response);  // 各responseをログ出力

      if (!acc[response.title]) {
        acc[response.title] = { responses: [], type: response.type, contents: response.contents, userNames: [] };
      }
      acc[response.title].responses.push(response.response);
      acc[response.title].userNames.push(user.user_name);
    });

    return acc;
  }, {});

  const NewsGroup = ({ title, groupingOpen, groupinghandleClick, NewsList }) => {
    return (
      <>
        <Tooltip
          title={`${NewsList.length}記事`}
        >
          <ListItemButton onClick={() => groupinghandleClick()}>

            <ListItemIcon>
              {title === "求人" && <HandshakeIcon />}
              {title === "インターンシップ" && <Diversity3Icon />}
              {title === "説明会" && <RecordVoiceOverIcon />}
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}>
                  {title}
                </Typography>
              }
            />
            {groupingOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </Tooltip>

        <Collapse in={groupingOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {/* ニュースリスト */}
            {NewsList.map((element, index) => (
              <ListItemButton
                key={index}
                sx={{
                  backgroundColor: selectedIndex === index ? '#cce5ff' : 'initial',
                  '&:hover': {
                    backgroundColor: selectedIndex === index ? '#99ccff' : '#eee',
                  },
                }}
                onClick={() => {
                  handleClick(index);
                }}>

                {/* <Typography className="circle_number">
                        {element.user_name.length}
              </Typography> */}
                <Tooltip title={element.article_title}>
                  <ListItemText className="News_List_Title" primary={element.article_title} />
                </Tooltip>
              </ListItemButton>
            ))}
          </List>
        </Collapse>

      </>
    )
  }
  NewsGroup.propTypes = {
    title: PropTypes.string,
    groupingOpen: PropTypes.bool,
    groupinghandleClick: PropTypes.func,
    NewsList: PropTypes.array
  };

  useEffect(() => {
    // writeformshow && selectedIndex !== null && application_form.length > 0 が true になった場合
    if (writeformshow && selectedIndex !== null && application_form.length > 0) {
      // 遅延を加えてからアニメーション開始
      setTimeout(() => {
        setShowWriteForm(true);
      }, 10); // 500msの遅延を設定
    }
  }, [writeformshow, selectedIndex, application_form]); // 状態が変わるたびに確認

  useEffect(() => {
    // showWriteForm が true のときに .writeformshow に active クラスを追加
    if (showWriteForm) {
      const element = document.querySelector('.writeformshow');
      if (element) {
        console.log("エレメント", element);

        // 遅延して `active` クラスを追加
        setTimeout(() => {
          element.classList.add('active');
          console.log("activeクラスを追加しました");
        }, 10); // クラス追加の遅延
      } else {
        console.log("writeformshowが見つかりません");
      }
    }
  }, [showWriteForm]); // showWriteForm が変わるたびに実行

  return (
    <div className="CheckForm">
      {application_form.length > 0 ? (
        <div className="CheckFormList">
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

            <NewsGroup
              title={"求人"}
              groupingOpen={JobOfferGroupingOpen}
              groupinghandleClick={() => groupinghandleClick("JobOffer")}
              NewsList={JobOffer}
            />
            <NewsGroup
              title={"インターンシップ"}
              groupingOpen={InternshipGroupingOpen}
              groupinghandleClick={() => groupinghandleClick("Internship")}
              NewsList={Internship}
            />
            <NewsGroup
              title={"説明会"}
              groupingOpen={SessionGroupingOpen}
              groupinghandleClick={() => groupinghandleClick("Session")}
              NewsList={Session}
            />

          </List>
        </div>

      ) : null}

      {showWriteForm &&
        (
          <div className="writeform-container">
            <div className="writeformshow">
              <div className="write-form">
              {Screen ? (
                  <>
                    <div className="BackCheckFormList">
                    <Tooltip title="戻る">
                    <ArrowBackOutlinedIcon onClick={() => toggleSlide()} />
                    </Tooltip>
                    </div>
                  </>
                ) : ""}


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
          </div>
        )}
    </div>
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
