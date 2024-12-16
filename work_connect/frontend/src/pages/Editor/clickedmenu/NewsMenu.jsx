import { useEffect, useState } from "react";
import Modal from "react-modal";
import PropTypes from "prop-types";
import "../Editor.css";

//募集職種のタグを設定
import Select from "react-select";
import GetTagAllList from "src/components/tag/GetTagAllList";


//ニュースメニューをインポート
import ReleaseNews from "./ReleaseNews"


//MUIアイコン
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported';
import DeleteIcon from '@mui/icons-material/Delete';
import NewsMenuTable from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Tooltip from '@mui/material/Tooltip';
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

//時間
import moment from 'moment-timezone';

// 応募締め切り日を設定:MUI
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import "dayjs/locale/ja";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";



const InputDateWithTime = ({ date, setEventDay, format = "YYYY/MM/DD HH:mm" }) => {
  dayjs.locale("ja");
  dayjs.extend(utc);
  dayjs.extend(timezone);
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"ja"}>
      <DateTimePicker
        value={dayjs(date)} // 親コンポーネントから渡された date を使用
        onChange={(newDate) => {
          if (newDate) {
            const formattedDate = dayjs(newDate).tz("Asia/Tokyo").format("YYYY-MM-DD HH:mm:ss");
            console.log("更新後の時間", formattedDate);
            setEventDay(formattedDate);
          }
        }}
        format={format}
        slotProps={{ calendarHeader: { format: "YYYY/MM" } }}
        ampm={false}
        clearable
      />
    </LocalizationProvider>
  );
};


const NewsMenu = ({
  menuKey,
  CreateFormJump,
  RewriteNewsEnter,
  draftlist = [],
  RewriteNewsDelete,
  NotificationMessageHandleChange,
  NewsUpLoad,
  setEventDay,
  eventDay,
  setSelectedOccupation,
  selectedOccupation,
  message,
  selected_draft, }) => {

  console.log("menuKey", menuKey);
  console.log("イベントデイ", eventDay);
  console.log("募集職種", selectedOccupation);

  const [options, setOptions] = useState([]);
  const { GetTagAllListFunction } = GetTagAllList();

  let selectedOccupationArray = null;

  if (selectedOccupation) {
    selectedOccupationArray = selectedOccupation.split(',').map((occupation) => ({
      label: occupation,
      value: occupation,
    }));
  }


  console.log("selectedOccupationArray配列", selectedOccupationArray);

  useEffect(() => {
    let optionArrayPromise = GetTagAllListFunction("company_selected_occupation");
    optionArrayPromise.then((result) => {
      setOptions(result);
    });
    console.log("options", options);
    console.log("optionArrayPromise", optionArrayPromise);
  }, []);


  const handleChange = (selectedOption) => {
    // setSelectedOccupation(selectedOption);
    console.log("selectedOption", selectedOption);
    let devTagArray = [];
    selectedOption.map((item) => {
      devTagArray.push(item.label);
    });
    const devTag = devTagArray.join(",");
    console.log("選んだ内容", devTag);
    setSelectedOccupation(devTag);
  };

  //関数
  const FormattedDate = (time) => {
    console.log("時間", time);
    return moment(time).tz('Asia/Tokyo').format('YYYY/MM/DD HH:mm:ss');
  };

  const header_img_show = (draft) => {
    console.log("サムネイル画像", draft.header_img);
    if (draft.header_img === null) {
      return (
        <ImageNotSupportedIcon fontSize="large" />
      );
    } else {
      return <img src={`${draft.header_img}`} alt="Draft Image" />;
    }
  };

  console.log("選んだ内容", selected_draft);

  const AddDraftNews = () => {
    window.location.reload(false);
  }

  useEffect(() => {
    Modal.setAppElement('#root');
  }, []);

  const draftListrender = (
    <div className="draftlistScroll">
      <div className="add_draft_news">
        <Button variant="outlined" onClick={AddDraftNews} >
          新たな下書き
        </Button>
      </div>
      {draftlist.length > 0 ? (
        draftlist.map(draft => (
          <NewsMenuTable className="draftlisttable" key={draft.id}>
            <TableHead>
              <TableRow>
                <TableCell style={{ backgroundColor: "#fff", border: "none" }}>
                  <div className="Last_updated_date">
                    最終更新日: {FormattedDate(draft.updated_at)}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    {/* 画像を左側に配置 */}
                    <div className="news_img">
                      {header_img_show(draft)}
                    </div>
                    {/* テキストと削除ボタンを右側に配置 */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                      <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                        <DeleteIcon />
                        <p style={{ margin: 0, marginLeft: '4px' }} onClick={() => RewriteNewsDelete(draft.id)}>削除</p>
                      </div>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Tooltip title={draft.article_title}>
                    <p
                      className="draftlist"
                      onClick={() => {
                        RewriteNewsEnter(draft.id);
                      }}
                    >
                      {draft.article_title}
                    </p>
                  </Tooltip>
                </TableCell>
              </TableRow>
            </TableBody>
          </NewsMenuTable>
        ))
      ) : (
        <p>下書き中の記事はありません</p>
      )}
    </div>
  )


  const notificationMessagerender = (
    <ReleaseNews
      MessageData={message}
      NotificationMessageHandleChange={NotificationMessageHandleChange}
    />
  )

  const eventDayrender = (
    <InputDateWithTime
      date={eventDay} // 親コンポーネントから渡された値を使用
      setEventDay={setEventDay}
    />
  );

  const openJobsrender = (
    <Select
      id="prefecturesDropdwon"
      value={selectedOccupationArray}
      onChange={handleChange}
      options={options}
      placeholder="▼"
      isMulti
    />
  )


  console.log("ドラフトリスト", draftlist);

  const createFormrender = (
    <div className="create_form">
      {/* selected_draftが存在し、create_form配列が空でない場合に表示 */}
      {selected_draft?.create_form?.length > 0 ? (
        (() => {
          // データを取得・処理
          const DateTime = selected_draft.create_form[0].createformDateTime;
          const createFormArray = JSON.parse(selected_draft.create_form[0].create_form || "[]");
          const question_count = createFormArray.length;

          return (
            <>
              <NewsMenuTable className="draftlisttable">
                <TableBody>
                  <TableRow>
                    <TableCell style={{ backgroundColor: "#fff", border: "none" }}>
                      <div className="Last_updated_date">
                        最終更新日: {FormattedDate(DateTime)}
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        {/* テキストと削除ボタンを右側に配置 */}
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>

                        </div>
                      </div>

                      <p className="draftlist">
                        質問数: {question_count}
                      </p>

                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Tooltip title="クリックすると応募フォーム作成画面へ行きます" placement="left">
                        <Typography id="createFormJump"
                          onClick={() => {
                            CreateFormJump();
                          }}>
                          応募フォームを作成する
                        </Typography>
                      </Tooltip>
                    </TableCell>
                    <TableCell>
                      <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                        <DeleteIcon />
                        <p style={{ margin: 0, marginLeft: '4px' }}>削除</p>
                      </div>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </NewsMenuTable>
            </>
          );
        })()
      ) : (
        <>
          <p>編集中のフォームはありません</p>

          <Typography id="createFormJump"
            onClick={() => {
              CreateFormJump();
            }}>
            応募フォームを作成する
          </Typography>

        </>

      )}

      {/* ボタン */}
      <button
        id="createFormJump"
        className="save"
        onClick={() => {
          CreateFormJump();
        }}
      >
        応募フォームを作成する
      </button>
    </div>
  );

  const releaseNewsrender = (
    <p><button onClick={NewsUpLoad}>投稿</button></p>
  )


  // `menuKey` に基づいてレンダリングする内容を切り替え
  const renderComponentByKey = (key) => {
    console.log("renderComponentByKey関数キー", key);
    switch (key) {
      case 'draftList':
        return draftListrender;
      case 'notificationMessage':
        return notificationMessagerender;
      case 'createForm':
        return createFormrender;
      case 'releaseNews':
        return releaseNewsrender;
      case 'eventDay':
        return eventDayrender;
      case 'openJobs':
        return openJobsrender;
      default:
        return null;
    }
  };



  return (
    <div>
      {renderComponentByKey(menuKey)}
    </div>
  );
};

NewsMenu.propTypes = {
  menuKey: PropTypes.string.isRequired,
  IsOpen: PropTypes.bool.isRequired,      //モーダルを閉じる
  CloseModal: PropTypes.func.isRequired,  //モーダル閉じる関数
  CreateFormJump: PropTypes.func.isRequired, //ニュース保存後に応募フォーム作成画面に遷移する
  RewriteNewsDelete: PropTypes.func.isRequired, //下書きニュースを削除する
  RewriteNewsEnter: PropTypes.func.isRequired, //下書き中で編集するニュースを選択して、遷移する
  NewsSave: PropTypes.func.isRequired,
  setSelectedOccupation: PropTypes.func.isRequired,
  selectedOccupation: PropTypes.array.isRequired,
  setOpenJobs: PropTypes.func.isRequired,
  devTag: PropTypes.string.isRequired,
  NewsUpLoad: PropTypes.func.isRequired,
  NotificationMessageHandleChange: PropTypes.func.isRequired,
  setEventDay: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  eventDay: PropTypes.string.isRequired,
  draftlist: PropTypes.array.isRequired, //下書きリスト
  newsid: PropTypes.number.isRequired, //ニュースID
  title: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired, //サムネイル画像
  selected_draft: PropTypes.array.isRequired, //現在下書き中のニュース＆フォームの情報
  followerCounter: PropTypes.number.isRequired,
};

// PropTypesの型定義
InputDateWithTime.propTypes = {
  date: PropTypes.object,
  setEventDay: PropTypes.func.isRequired,
  format: PropTypes.string,
};

// デフォルト値の設定（必要であれば）
InputDateWithTime.defaultProps = {
  format: "YYYY/MM/DD HH:mm",
};

export default NewsMenu;
