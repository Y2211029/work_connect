import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import Stack from '@mui/material/Stack';
import Typography from "@mui/material/Typography";
import TooltipTitle from '@mui/material/Tooltip';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from "react-modal";
import CloseIcon from '@mui/icons-material/Close';
import moment from 'moment';
import 'moment/locale/ja';
import { postDateTimeDisplay } from "src/components/view/PostDatatime";
import axios from "axios";
import useMediaQuery from '@mui/material/useMediaQuery';

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
import { Divider } from "@mui/material";


const Graph = ({ title, responses, userNames, onRequestClose }) => {
  console.log("レスポンスの内容", responses);
  console.log("レスポンスの内容", userNames);

  const responseUserMap = responses.map((response, index) => ({
    response: response === "" || response === null ? "無回答" : response,
    userName: userNames[index],
  }));

  const responseCounts = responseUserMap.reduce((acc, { response, userName }) => {
    if (!acc[response]) {
      acc[response] = { count: 0, users: [] };
    }
    acc[response].count += 1;
    acc[response].users.push(userName);
    return acc;
  }, {});

  console.log("responseCounts", responseCounts);


  const [graphKind, setGraphKind] = useState("Bar"); // デフォルトをBarグラフに

  const transform = (labels) => {
    const MAX_LENGTH = 10;
    return labels.map((label) => {
      if (label.length > MAX_LENGTH) {
        return label.substring(0, MAX_LENGTH) + "...";
      }
      return label;
    });
  };

  const Screen = useMediaQuery("(max-width:600px) and (min-width:30px)");
  const labels = Object.keys(responseCounts);
  const transformlabels = transform(Object.keys(responseCounts));
  console.log("labels", labels);
  console.log("labels", transformlabels);
  const dataValues = Object.values(responseCounts).map(item => item.count);
  const userMappings = Object.values(responseCounts).map(item => item.users);

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: title,
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: (tooltipItem) => {
            const index = tooltipItem.dataIndex;
            const total = dataValues.reduce((a, b) => a + b, 0);
            const value = dataValues[index];
            const percentage = ((value / total) * 100).toFixed(1);
            const users = userMappings[index].join(", ");
            return [`回答数: ${value} ${percentage}%`, `${users}`];
          },
        },
      },
    },
  };



  const pieData = {
    labels,
    datasets: [
      {
        data: dataValues,
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



  const options = {
    responsive: true,
    maintainAspectRatio: false,
    aspectRatio: 1,
    plugins: {
      title: {
        display: true,
        text: title,
        font: {
          size: 15,  // タイトルのフォントサイズ
        },
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: (tooltipItem) => {
            const index = tooltipItem.dataIndex;
            const total = dataValues.reduce((a, b) => a + b, 0);
            const value = dataValues[index];
            const percentage = ((value / total) * 100).toFixed(1);
            const users = userMappings[index].join(", ");
            return [`回答数: ${value} ${percentage}%`, `${users}`];
          },
        },
      },
    },
    scales: {
      x: {
        ticks: {
          font: {
            size: 15,  // x軸ラベルのフォントサイズ
          },
        },
        scaleLabel: {
          display: true,
          labelString: 'X軸ラベル',
          font: {
            size: 15,
          },
        },
      },
      y: {
        ticks: {
          font: {
            size: 15,
          },
        },
      },
    },
  };



const data = {
  labels: Screen ? transformlabels : labels,
  datasets: [
    {
      label: "回答数",
      data: dataValues,
      borderColor: "rgba(255, 99, 132, 1)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },

  ],
};

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
  Legend,
);

const GraphArray = [
  { title: '縦棒グラフ', type: 'Bar' },
  { title: '折れ線グラフ', type: 'Line' },
  { title: '円グラフ', type: 'Pie' },
  { title: 'ドーナツグラフ', type: 'Doughnut' },
  { title: 'レーダーチャート', type: 'Radar' },
]

return (
  <>
    <Box className="GraphBox">
      <CloseIcon className="CreateForm_Cancel_Button" onClick={() => onRequestClose()} />
      <div className="Graph">
        {(() => {
          switch (graphKind) {
            case "Bar":
              return <Bar options={options} data={data} />;
            case "Line":
              return <Line options={options} data={data} />;
            case "Pie":
              return <Pie options={pieOptions} data={pieData} />;
            case "Doughnut":
              return <Doughnut options={pieOptions} data={pieData} />;
            case "Radar":
              return <Radar options={options} data={data} />;
            default:
              return <Bar options={options} data={data} />;
          }
        })()}
      </div>
      <div className="border_surround">
        <Stack spacing={2} direction="column" className="GraphSelectButton">
          {GraphArray.map((graph, idx) => (
            <Button
              key={idx}
              variant="outlined"
              onClick={() => setGraphKind(graph.type)}
              className="GraphButton"
            >
              {graph.title}
            </Button>
          ))}
        </Stack>
      </div>
    </Box>
  </>
);
};

Graph.propTypes = {
  title: PropTypes.string.isRequired,
  userNames: PropTypes.string.isRequired,
  responses: PropTypes.arrayOf(PropTypes.string).isRequired,
  onRequestClose: PropTypes.func.isRequired
};

//未読を既読に変える
const Already_Read = async (unread_data) => {
  console.log("未読から既読に変えました");
  console.log("user", unread_data);
  try {
    const response = await axios.post(
      `http://localhost:8000/change_un_read`,
      {
        unread_data: unread_data, // 未読のデータ
      }
    );

    // 成功時にレスポンスデータをログ表示
    if (response && response.data) {
      console.log("成功:", response.data);
    }
  } catch (error) {
    console.error("処理中にエラーが発生しました！", error);
  }
};


const UnreadStart = ({ onRead, unread_data }) => {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onRead(unread_data); // 可視範囲に入ったら関数を実行
        }
      },
      {
        root: null, // ビューポート
        threshold: 1.0, // 完全に見えたら発火
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [onRead]);

  return (
    <Typography
      ref={ref}
      display="flex"
      justifyContent="center"
      alignItems="center"
      variant="caption"
      component="div"
      sx={{
        position: "relative",
        margin: "0 10px",
        backgroundColor: "#F9FAFB",
        zIndex: 1,
        fontSize: "13px",
        "&::before": {
          content: '""',
          position: "absolute",
          left: 0,
          top: "50%",
          width: "45%",
          borderBottom: "1px dashed #000",
        },
        "&::after": {
          content: '""',
          position: "absolute",
          right: 0,
          top: "50%",
          width: "45%",
          borderBottom: "1px dashed #000",
        },
      }}
    >
      ここから未読
    </Typography>
  );
};
UnreadStart.propTypes = {
  onRead: PropTypes.func.isRequired,
  unread_data: PropTypes.array.isRequired,
};


const Summary = ({
  application_form,
  selectedIndex,
  GroupedResponses,
  HandleTabClick,
  setViewStudentName
}) => {
  console.log("グループドレスポンス", GroupedResponses);

  const [showGpaph, setShowGraph] = useState(false);
  const [modalData, setModalData] = useState({ title: "", responses: [], userNames: [] });

  const showGpaphCancel = () => {
    setShowGraph(false);
  }

  const ShowGraph = (title, responses, userNames) => {
    setModalData({ title, responses, userNames }); // モーダル用のデータをセット
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
    const formattedDate = moment(time).format('YYYY/MM/DD HH時mm分');

    if (targetDateObj >= twentyFourHoursAgo) {
      return (
        <>
          <TooltipTitle title={'24時間以内に応募されました'}>
            <p style={{ color: 'red', marginLeft: '5%' }}>New!</p>
            <p>応募日:{formattedDate}</p>
            <p>{postDateTimeDisplay(time)}</p>
          </TooltipTitle>
        </>
      )
    } else {
      return (
        <>
          <p>応募日:{formattedDate} ({postDateTimeDisplay(time)})</p>
        </>
      );
    }
  }


  const unread_data = application_form[selectedIndex].user_name.filter(app => app.check_read === "未読");

  const lastUnreadId = application_form[selectedIndex].user_name.reduceRight(
    (acc, user, index) => (user.check_read === "未読" && acc === -1 ? index : acc),
    -1 // 初期値として -1 を指定
  );

  console.log("unread_id", lastUnreadId);
  console.log("application_form[selectedIndex].user_name", application_form[selectedIndex].user_name);

  return (
    <>
      <div className="summary-form">
        <Stack direction="column" spacing={2}>
          <div>
            <Typography className="writeform-title">
              回答者: {application_form[selectedIndex].user_name.length}名
            </Typography>
            {application_form[selectedIndex].user_name.map((user, index) =>
            (

              <>

                <Typography
                  key={user.write_form_id || index}
                  className="writeform-answereddata"
                  onClick={(e) => IndividualJump(e, 2, user.user_name)}
                >
                  <Stack direction={"row"}>
                    <TooltipTitle title={`クリックすると${user.user_name}さんの回答が見られます`}>
                      <p>{user.user_name}さん</p>
                      {time_check(user.writeformDateTime)}
                    </TooltipTitle>
                  </Stack>
                  {console.log("user.check_read:", user.check_read)}


                </Typography>

                <Divider />

                {index === lastUnreadId && (
                  <UnreadStart onRead={Already_Read} unread_data={unread_data} />
                )}
              </>

            ))}
          </div>

          {GroupedResponses &&
            Object.entries(GroupedResponses).map(([title, { responses, contents, userNames }], index) => (
              <div key={index} className="writeform-responce-container">
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
                  <Typography onClick={() => ShowGraph(title, responses, userNames)} className="showgraph-length">
                    グラフを見る
                  </Typography>
                </Stack>

                {responses.map((response, idx) => (
                  <Typography key={idx} className="writeform-answereddata">
                    {response ? response : "無回答"}
                  </Typography>
                ))}

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
          <Graph title={modalData.title} responses={modalData.responses} userNames={modalData.userNames} onRequestClose={showGpaphCancel} />
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
              userNames: PropTypes.array.isRequired,
            })
          ).isRequired,
          write_form_id: PropTypes.number.isRequired,
        })
      ).isRequired,
    })
  ).isRequired,

  selectedIndex: PropTypes.number,
  GroupedResponses: PropTypes.object.isRequired,
  HandleTabClick: PropTypes.func.isRequired,
  setViewStudentName: PropTypes.func.isRequired
}

export default Summary;


