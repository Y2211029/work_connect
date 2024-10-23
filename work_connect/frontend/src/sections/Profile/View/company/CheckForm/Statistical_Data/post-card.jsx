// PostCard.tsx
import { useEffect, forwardRef, useState } from "react";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';

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
} from "chart.js";
import { Line } from 'react-chartjs-2'; // 棒グラフ

// ----------------------------------------------------------------------

const PostCard = forwardRef(({ post }) => {
  const { article_title, user_name } = post;
  const [graphData, setGraphData] = useState({ labels: [], values: [] });
  const [showGraph, setShowGraph] = useState(false); // グラフ表示状態の管理

  useEffect(() => {
    const css =
      `.sv-action__content .sd-btn--action.sd-navigation__complete-btn {
        display: none;
      }`;
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = css;
    document.head.appendChild(styleSheet);

    // グラフデータの取得
    extractGraphData(user_name);
  }, [user_name]);

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  );

  const extractGraphData = (userData) => {
    const labels = [];
    const values = [];

    userData.forEach(user => {
      user.wright_form.forEach(form => {
        if (form.inputType === "datetime-local") {
          labels.push(form.response);
          values.push(1); // 各日付に対して1を入れる例
        }
      });
    });

    setGraphData({ labels, values });
  };

  const Graph = () => {
    const options = {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: "日時",
        },
      },
    };

    const data = {
      labels: graphData.labels,
      datasets: [
        {
          label: "データ1",
          data: graphData.values,
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
      ],
    };

    return (
      <Box>
        <Line options={options} data={data} />
      </Box>
    );
  };

  return (
    <>
      <List
        sx={(theme) => ({
          width: '100%',
          height: '100%',
          maxWidth: 360,
          marginLeft: '0',
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

        <ListItemButton
          onClick={() => setShowGraph(!showGraph)} // クリックでグラフ表示状態をトグル
        >
          <ListItemText
            primary={
              <Typography sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}>
                {article_title}
              </Typography>
            }
          />
        </ListItemButton>
      </List>

      {showGraph && <Graph />} {/* グラフ表示状態に応じて描画 */}
    </>
  );
});

// displayName を設定
PostCard.displayName = 'PostCard';

PostCard.propTypes = {
  post: PropTypes.shape({
    article_title: PropTypes.string,
    user_name: PropTypes.arrayOf( // 配列の定義に変更
      PropTypes.shape({
        wright_form_id: PropTypes.number,
        user_name: PropTypes.string,
        company_name: PropTypes.string,
        icon: PropTypes.string,
        follow_status: PropTypes.bool,
        wright_form: PropTypes.arrayOf(PropTypes.shape({
          type: PropTypes.string,
          name: PropTypes.string,
          title: PropTypes.string,
          inputType: PropTypes.string,
          validators: PropTypes.array,
          response: PropTypes.string,
        })),
      })
    ).isRequired,
  }).isRequired,
};

export default PostCard;
