import { forwardRef, useState } from "react";
import PropTypes from "prop-types";
import { useSessionStorage } from "src/hooks/use-sessionStorage";
import Typography from "@mui/material/Typography";
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box'; // Boxをインポート

import './writeform.css';

// Chart.js
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarController,
  BarElement,
} from "chart.js";
import { Bar } from 'react-chartjs-2'; // 棒グラフ

const PostCard = forwardRef(({ post },) => {
  const { article_title, user_name } = post;

  const { getSessionData } = useSessionStorage();
  const accountData = getSessionData("accountData") || {};
  const MyUserId = accountData.id;
  console.log(MyUserId);

  const [open, setOpen] = useState(false);
  const [writeformshow, setWriteFormShow] = useState(false);

  const handleClick = () => {
    setOpen(!open);
    setWriteFormShow(true);
  };

  // 事前にデータを加工してグループ化
  const groupedResponses = user_name.reduce((acc, user) => {
    user.write_form.forEach((form) => {
      if (!acc[form.title]) {
        acc[form.title] = {
          responses: [], // 回答を格納する配列
          type: form.type, // 各質問のタイプ
          contents: form.contents || '', // contentsを追加。存在しない場合は空文字にする
        };
      }
      acc[form.title].responses.push(form.response);
    });
    return acc;
  }, {});


  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    BarController,
    BarElement,
  );

  const Graph = ({ title, responses }) => {
    console.log("タイトル", title);
    console.log("レスポンス", responses);

    // 出現回数を集計する
    const responseCounts = responses.reduce((acc, response) => {
      acc[response] = (acc[response] || 0) + 1; // 各回答の出現回数をカウント
      return acc;
    }, {});

    // ラベルとデータを設定
    const labels = Object.keys(responseCounts); // 回答の種類
    const dataValues = Object.values(responseCounts); // 各回答の件数

    const options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: title,
        },
      },
    };

    const data = {
      labels: labels, // 集計した回答の種類をラベルに
      datasets: [
        {
          label: '回答数',
          data: dataValues, // 各回答の件数をデータに
          borderColor: "rgba(255, 99, 132, 1)",
          backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
      ],
    };

    return (
      <Box sx={{ width: '100%', height: '200px' }}>
        <Bar options={options} data={data} style={{ height: '100%', width: '100%' }} />
      </Box>
    );
  };

  Graph.propTypes = {
    title: PropTypes.string.isRequired, // titleは文字列で必須
    responses: PropTypes.arrayOf(PropTypes.string).isRequired, // responsesは文字列の配列で必須
  };

  return (
    <>
      <div style={{ width: '100%', marginRight: '16px' }}>
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
            <ListSubheader component="div" id="nested-list-subheader">
              ニュース一覧
            </ListSubheader>
          }
        >
          <ListItemButton onClick={handleClick}>
            <ListItemText
              primary={
              <>
                <Typography>
                {user_name.length}
                </Typography>
                <Typography sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}>
                  {article_title}
                </Typography>
              </>
              }
            />
          </ListItemButton>
        </List>
      </div>

      {/* writeformshow が true の場合の表示 */}
      {writeformshow && (
        <div style={{ flexGrow: 1 }}>
          <div className="write-form">
            <Stack direction="column" spacing={2}>
              <div className="writeform-container">
                <Typography className="writeform-title">
                  回答者: {user_name.length}名
                </Typography>
                {user_name.map((user, index) => (
                  <Typography key={user.write_form_id || index} className="writeform-answereddata">
                    {user.user_name}さん
                  </Typography>
                ))}
              </div>
              {/* // グループ化されたデータを使って表示 */}
              {Object.entries(groupedResponses).map(([title, { responses, type, contents }], index) => (
                <div key={index} className="writeform-container">
                  <Typography className="writeform-title">
                    {title} ({type}):
                  </Typography>
                  <Typography className="writeform-contents">
                    {contents}
                  </Typography>
                  <Typography className="writeform-length">
                    {responses.length}件の回答
                  </Typography>
                  {responses.map((response, idx) => (
                    <Typography key={idx} className="writeform-answereddata">
                      {response}
                    </Typography>
                  ))}
                  <Graph title={title} responses={responses} />
                </div>
              ))}
            </Stack>
          </div>
        </div>
      )}
    </>
  );
});

PostCard.displayName = 'PostCard';

PostCard.propTypes = {
  post: PropTypes.shape({
    article_title: PropTypes.string,
    user_name: PropTypes.arrayOf(
      PropTypes.shape({
        write_form_id: PropTypes.number,
        user_name: PropTypes.string,
        company_name: PropTypes.string,
        icon: PropTypes.string,
        follow_status: PropTypes.bool,
      })
    ).isRequired,
  }).isRequired,
  responses: PropTypes.arrayOf(PropTypes.string).isRequired,
};



export default PostCard;
