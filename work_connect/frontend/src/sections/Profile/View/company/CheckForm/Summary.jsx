import { useState } from "react";
import PropTypes from "prop-types";
import Stack from '@mui/material/Stack';
import Typography from "@mui/material/Typography";
import TooltipTitle from '@mui/material/Tooltip';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from "react-modal";

// Chart.js
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadarController,
  ScatterController,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale
} from "chart.js";
import { Bar, Line, Pie, Doughnut, Radar } from "react-chartjs-2";

// グラフ表示用のコンポーネント
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement, // 円グラフ系
  RadarController, // レーダーチャート
  RadialLinearScale,
  ScatterController, // 散布図
  Title,
  Tooltip,
  Legend
);
const Graph = ({ title, responses }) => {
  const responseCounts = responses.reduce((acc, response) => {
    acc[response] = (acc[response] || 0) + 1;
    return acc;
  }, {});

  const [graphKind, setGraphKind] = useState("Bar"); // デフォルトをBarグラフに

  const labels = Object.keys(responseCounts);
  const dataValues = Object.values(responseCounts);

  const Total = ({ title }) => {
    return (
      <>
        {title}
      </>
    );
  };
  

  const pieData = {
    labels, // 各セクションのラベル
    datasets: [
      {
        data: dataValues, // 各セクションの値
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(153, 102, 255, 0.5)",
          "rgba(255, 159, 64, 0.5)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: "top", // 凡例の位置
      },
      title: {
        display: true,
        text: title,
      },
    },
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      title: {
        display: true,
        text: title,
      },
    },
  };

  const bar_y_options = {
    responsive: true,
    indexAxis: 'y',
    maintainAspectRatio: true,
    plugins: {
      title: {
        display: true,
        text: title,
      },
    },
  }

  const data = {
    labels,
    datasets: [
      {
        label: "回答数",
        data: dataValues,
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  const GraphSwitch = (type) => {
    setGraphKind(type); // グラフの種類を切り替え
  };

  const ShowGraphSwitch = () => {
    switch (graphKind) {
      case "Bar":
        return <Bar options={options} data={data} />;
      case "Bar-y":
      return <Bar options={bar_y_options} data={data} />;
      case "Line":
        return <Line options={options} data={data} />;
      case "Pie":
        return <Pie options={pieOptions} data={pieData} />;
      case "Doughnut":
        return <Doughnut options={pieOptions} data={pieData} />;
      case "Radar":
        return <Radar options={options} data={data} />;
      case "Total":
        return <Total title={title}/>;
      default:
        return <Bar options={options} data={data} />;
    }
  };

  const GraphArray = [
    { title: '縦棒グラフ', type: 'Bar' },
    { title: '横棒グラフ', type: 'Bar-y' },
    { title: '折れ線グラフ', type: 'Line' },
    { title: '円グラフ', type: 'Pie' },
    { title: 'ドーナツグラフ', type: 'Doughnut' },
    { title: 'レーダーチャート', type: 'Radar' },
    { title: '集計', type: 'Total' },

  ]

  return (
    <>
      <Box sx={{ display: 'flex', width: '100%', height: '400px', alignItems: "center", overflow: "hidden" }}>
        <div style={{ width: "80%", height: "70%", transformOrigin: "top left" }}>
          {graphKind}
          {ShowGraphSwitch()}
        </div>
        <Stack spacing={2} direction="column" className="GraphSelectButton">
          {GraphArray.map((graph, idx) => (
            <Button
              key={idx}
              variant="outlined"
              onClick={() => GraphSwitch(graph.type)}
            >
              {graph.title}
            </Button>
          ))}

        </Stack>
      </Box>
    </>
  );
};

Graph.propTypes = {
  title: PropTypes.string.isRequired,
  responses: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const Summary = ({
  application_form,
  selectedIndex,
  GroupedResponses,
  HandleTabClick,
  setViewStudentName
}) => {
  console.log(GroupedResponses);

  const [showGpaph, setShowGraph] = useState(false);
  const [modalData, setModalData] = useState({ title: "", responses: [] });

  const showGpaphCancel = () => {
    setShowGraph(false);
  }

  const ShowGraph = (title, responses) => {
    setModalData({ title, responses }); // モーダル用のデータをセット
    setShowGraph(true); // モーダルを表示
  }



  const IndividualJump = (e, number, studentName) => {
    console.log("IndividualJump通りました");
    console.log(studentName);
    setViewStudentName(studentName)
    HandleTabClick(e, number);
  };

  console.log("application_form", application_form);
  console.log("時間", application_form[0].user_name[0].news_created_at);

  const time_check = (time) => {
    const targetDate = time; // 対象の日付
    const currentDate = new Date(); // 現在の日付

    // 現在の日付から24時間前の日付を計算
    const twentyFourHoursAgo = new Date(currentDate - 24 * 60 * 60 * 1000);

    // 文字列の日付をDateオブジェクトに変換
    const targetDateObj = new Date(targetDate);

    if (targetDateObj >= twentyFourHoursAgo) {
      return (
        <>
          <TooltipTitle title={'24時間以内に応募されました'}>
            <p style={{ color: 'red', marginLeft: '5%' }}>New!</p>
          </TooltipTitle>
        </>
      )
    } else {
      return null;
    }
  }



  return (
    <>
      <div className="summary-form">
        <Stack direction="column" spacing={2}>
          <div className="c">
            <Typography className="writeform-title">
              回答者: {application_form[selectedIndex].user_name.length}名
            </Typography>
            {application_form[selectedIndex].user_name.map((user, index) => (
              <Typography
                key={user.write_form_id || index}
                className="writeform-answereddata"
                onClick={(e) => IndividualJump(e, 2, user.user_name)}
              >
                <Stack direction={"row"}>
                  <TooltipTitle title={`クリックすると${user.user_name}の回答が見られます`}>
                    <p>{user.user_name}さん</p>
                  </TooltipTitle>
                  {time_check(user.news_created_at)}
                </Stack>

              </Typography>
            ))}
          </div>
          {GroupedResponses &&
            Object.entries(GroupedResponses).map(([title, { responses, contents }], index) => (
              <div key={index} className="writeform-container">
                <Typography className="writeform-title">
                  {title}
                </Typography>
                <Typography className="writeform-contents">
                  {contents}
                </Typography>
                <Stack direction="row">
                <Typography className="writeform-length">
                  {responses.length}件の回答
                </Typography>
                <Typography onClick={() => ShowGraph(title, responses)} className="showgraph-length">
                  グラフを見る
                </Typography>
                </Stack>

                {responses.map((response, idx) => (
                  <Typography key={idx} className="writeform-answereddata">
                    {response}
                  </Typography>
                ))}

                {/* <Graph title={title} responses={responses} /> */}

              </div>
            ))}
        </Stack>

        <Modal
          isOpen={showGpaph}
          onRequestClose={showGpaphCancel} // モーダルを閉じるコールバック
          shouldCloseOnOverlayClick={true} // オーバーレイクリックでモーダルを閉じる
          contentLabel="グラフモーダル"
          overlayClassName="modal-overlay" /* オーバーレイに適用 */
          className="modal-content" /* コンテンツに適用 */
        >
          <Graph title={modalData.title} responses={modalData.responses} />
        </Modal>
      </div>



    </>

  )
}

Summary.propTypes = {
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

  selectedIndex: PropTypes.number,
  GroupedResponses: PropTypes.func.isRequired,
  HandleTabClick: PropTypes.func.isRequired,
  setViewStudentName: PropTypes.func.isRequired
}

export default Summary;


