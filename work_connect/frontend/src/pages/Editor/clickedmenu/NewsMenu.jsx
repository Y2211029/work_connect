// import { useState } from "react";
import Modal from "react-modal";
import PropTypes from "prop-types";
import "../Editor.css";

//ニュースメニューをインポート
import ReleaseNews from "./ReleaseNews"


//MUIアイコン
import DrawIcon from '@mui/icons-material/Draw';
import SaveIcon from '@mui/icons-material/Save';
import CampaignIcon from '@mui/icons-material/Campaign';
import DisplaySettingsIcon from '@mui/icons-material/DisplaySettings';
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported';
import DeleteIcon from '@mui/icons-material/Delete';
import NewsMenuTable from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TooltipTitle from '@mui/material/Tooltip';
import AutoModeIcon from '@mui/icons-material/AutoMode';
import EditNotificationsIcon from '@mui/icons-material/EditNotifications';
import Typography from "@mui/material/Typography";

//時間
import moment from 'moment';

const modalStyle = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // オーバーレイの背景色
    zIndex: 2, // オーバーレイの z-index
  },
  content: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    border: 'none',
    borderRadius: '0',
    padding: '1.5rem',
    overflow: 'hidden',
    zIndex: 1, // コンテンツの z-index
  },
};


const NewsMenu = ({
  IsOpen,
  CloseModal,
  NewsMenuEnter,
  CreateFormJump,
  RewriteNewsEnter,
  EditorStatusCheck,
  EditorContentsStatusCheck,
  HandleChange,
  NewsSave,
  genre,
  clickedMenu,
  draftlist,
  newsid,
  imageUrl,
  title,
  RewriteNewsDelete,
  NotificationMessageHandleChange,
  NewsUpLoad,
  message,
  charCount }) => {

    const menuItems = [
      { key: "draftList", icon: <DrawIcon />, text: "下書きリスト" },
      { key: "saveNews", icon: <SaveIcon />, text: "ニュースを保存する" },
      { key: "editingstatus", icon: <AutoModeIcon />, text: "現在の編集状況" },
      { key: "notificationMessage", icon: <EditNotificationsIcon />, text: "通知に添えるメッセージ" },
      // 条件を満たした場合のみ追加
      ...(genre !== "blogs" ? [{ key: "createForm", icon: <DisplaySettingsIcon />, text: "応募フォームを作成する" }] : []),
      ...(title && imageUrl && message && charCount ? [{ key: "releaseNews", icon: <CampaignIcon />, text: "ニュースを公開する" }] : []),
    ];


  //関数
  const FormattedDate = (time) => {
    return moment(time).format('YYYY/MM/DD HH:mm:ss');
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

  const AddDraftNews = () => {
    console.log("クリックしました");
    window.location.reload(false);
  }


  return (
    <Modal
      isOpen={IsOpen}
      onRequestClose={CloseModal} // モーダルを閉じるコールバック
      shouldCloseOnOverlayClick={true} // オーバーレイクリックでモーダルを閉じる
      contentLabel="Example Modal"
      style={modalStyle}
    >
      <div className="menu-content">
        <div className="menu-container">
          {menuItems.map(({ key, icon, text }) => (
            <div
              key={key}
              className="menu-item"
              onClick={() => NewsMenuEnter(key)}
              style={{ backgroundColor: clickedMenu === key ? "rgba(201, 201, 204, .48)" : "transparent" }}
            >
              <div className="icon-text-container">
                {icon}
                <p>{text}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="hover-content">
          {clickedMenu === "draftList" && (
            <div className="draftlistScroll">
              <div className="add_draft_news">
                <Typography >
                  <div onClick={AddDraftNews}>
                    新たな下書き
                  </div>
                </Typography>
              </div>
              {draftlist.length > 0 ? (
                draftlist.map(draft => (
                  <NewsMenuTable className="draftlisttable" key={draft.id}>
                    <TableHead>
                      <TableRow>
                        <TableCell style={{ backgroundColor: "#fff", border: "none" }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            {/* 画像を左側に配置 */}
                            <div className="news_img">
                              {header_img_show(draft)}
                            </div>
                            {/* テキストと削除ボタンを右側に配置 */}
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                              <div style={{ marginBottom: '8px' }}>
                                最終更新日: {FormattedDate(draft.updated_at)}
                              </div>
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
                          <TooltipTitle title={draft.article_title}>
                            <p
                              className="draftlist"
                              onClick={() => RewriteNewsEnter(draft.id)}
                              style={{
                                cursor: 'pointer',
                                wordBreak: 'break-all',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                maxWidth: '200px',
                              }}
                            >
                              {draft.article_title}
                            </p>
                          </TooltipTitle>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </NewsMenuTable>
                ))
              ) : (
                <p>下書き中の記事はありません</p>
              )}
            </div>
          )}

          {clickedMenu === "editingstatus" && (
            <div className="editingstatusscroll">
              <p>現在の編集状況</p>
              <p>タイトル</p>
              {EditorStatusCheck(title)}
              <p>サムネイル</p>
              {EditorStatusCheck(imageUrl)}
              <p>通知に添えるメッセージ</p>
              {EditorStatusCheck(message)}
              <p>コンテンツ</p>
              {EditorContentsStatusCheck()}
            </div>
          )}

          {clickedMenu === "saveNews" && (
            <div className="news_button">
              <button id="save" className="save" onClick={NewsSave}>下書きを保存する</button>
            </div>
          )}

          {clickedMenu === "notificationMessage" && (
            <ReleaseNews
              MessageData={message}
              handleChange={HandleChange}
              NotificationMessageHandleChange={NotificationMessageHandleChange}
            />
          )}

          {clickedMenu === "releaseNews" && (
            <p><button onClick={NewsUpLoad}>投稿</button></p>
          )}

          {clickedMenu === "createForm" && (
            <div className="create_form">
              <p>インターンシップや求人・説明会のニュースでは、<br></br>
                応募フォームを作成することができます。
              </p>
              <button id="createFormJump" className="save" onClick={() => CreateFormJump(newsid)}>応募フォームを作成する</button>

            </div>
          )}
        </div>
        <p>
          <button className="CancelButton" onClick={CloseModal}>×</button>
        </p>
      </div>
    </Modal>
  );
};

NewsMenu.propTypes = {
  IsOpen: PropTypes.bool.isRequired,      //モーダルを閉じる
  CloseModal: PropTypes.func.isRequired,  //モーダル閉じる関数
  NewsMenuEnter: PropTypes.func.isRequired, //ニュースメニューのタブを変更する関数
  CreateFormJump: PropTypes.func.isRequired, //ニュース保存後に応募フォーム作成画面に遷移する
  RewriteNewsDelete: PropTypes.func.isRequired, //下書きニュースを削除する
  RewriteNewsEnter: PropTypes.func.isRequired, //下書き中で編集するニュースを選択して、遷移する
  EditorStatusCheck: PropTypes.func.isRequired, //サムネイル・タイトルの編集状況をチェック
  EditorContentsStatusCheck: PropTypes.func.isRequired, //文字数や使用画像をチェック
  message: PropTypes.string.isRequired,
  NewsSave: PropTypes.func.isRequired,
  HandleChange: PropTypes.func.isRequired,
  NewsUpLoad: PropTypes.func.isRequired,
  NotificationMessageHandleChange: PropTypes.func.isRequired,
  genre: PropTypes.string.isRequired,      //ニュースのジャンル
  clickedMenu: PropTypes.string.isRequired, //今見ているニュースのタブ
  draftlist: PropTypes.array.isRequired, //下書きリスト
  newsid: PropTypes.number.isRequired, //ニュースID
  title: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired, //サムネイル画像
  charCount: PropTypes.number.isRequired //文字数カウント
};

export default NewsMenu;
