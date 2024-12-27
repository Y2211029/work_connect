import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Popover from '@mui/material/Popover';
import Box from '@mui/material/Box';
import PropTypes from "prop-types";
import './NewsSelectMenu.css';
import Tooltip from "@mui/material/Tooltip";

// 応募締め切り日を設定:MUI
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import moment from 'moment';
import 'moment/locale/ja';

// 募集職種のタグを設定
import Select from "react-select";
import GetTagAllList from "src/components/tag/GetTagAllList";

// 通知に添えるメッセージ
import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
import { styled, useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

//現在の編集状況
import NewsMenuTable from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
// import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import ErrorIcon from '@mui/icons-material/Error';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';

//下書きリスト
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported';
import DeleteIcon from '@mui/icons-material/Delete';
import { Stack } from '@mui/system';

const blue = {
    100: '#DAECFF',
    200: '#b6daff',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
    900: '#003A75',
};

const grey = {
    50: '#F3F6F9',
    100: '#E5EAF2',
    200: '#DAE2ED',
    300: '#C7D0DD',
    400: '#B0B8C4',
    500: '#9DA8B7',
    600: '#6B7A90',
    700: '#434D5B',
    800: '#303740',
    900: '#1C2025',
};

const Textarea = styled(BaseTextareaAutosize)(
    ({ theme }) => `
  box-sizing: border-box;
  width: 100%;
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  padding: 8px 12px;
  border-radius: 8px;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};
  
  &:hover {
    border-color: ${blue[400]};
  }
  
  &:focus {
    border-color: ${blue[400]};
    box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
  }
  
  // firefox
  &:focus-visible {
    outline: 0;
  }
`,
);




const InputDateWithTime = ({ date, setEventDay, format = 'YYYY/MM/DD HH:mm' }) => {
    moment.locale('ja'); // 日本語設定
    return (
        <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale="ja">
            <DateTimePicker
                value={moment(date)} // 親コンポーネントから渡された日付を使用
                onChange={(newDate) => {
                    if (newDate) {
                        const formattedDate = moment(newDate).format('YYYY-MM-DD HH:mm:ss');
                        setEventDay(formattedDate);
                    }
                }}
                format={format}
                ampm={false}
                clearable
            />
        </LocalizationProvider>
    );
};

const ShowUsedImages = ({ usedImages }) => {
    if (!Array.isArray(usedImages)) {
        console.error('usedImagesは配列ではありません:', usedImages);
        return <p>画像のデータにエラーがあります</p>;
    }

    // 画像を2枚ずつのグループに分ける
    const rows = [];
    for (let i = 0; i < usedImages.length; i += 2) {
        rows.push(usedImages.slice(i, i + 2));
    }

    return (
        <>
            {usedImages.length > 0 ? (
                <NewsMenuTable>
                    <TableBody>
                        {rows.map((row, rowIndex) => (
                            <TableRow key={rowIndex}>
                                {row.map((imageObj, index) => (
                                    <TableCell key={index} align="center">
                                        <img
                                            src={imageObj}
                                            alt={`使用された画像 ${index + 1}`}
                                            style={{ maxWidth: '100px', height: 'auto' }}
                                        />
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </NewsMenuTable>
            ) : (
                <p>画像が使用されていません</p>
            )}
        </>
    );
};



const NewsSelectMenu = ({
    setEventDay,
    eventDay,
    setSelectedOccupation,
    selectedOccupation,
    notificationMessage,
    setNotificationMessage,
    title,
    imageUrl,
    charCount,
    followerCounter,
    usedImages,
    news_save,
    news_upload,
    isContentReady,
    isFollowerValid,
    draftlist = [],
    RewriteNewsDelete,
    RewriteNewsEnter,
    selected_draft,
    CreateFormJump
}) => {
    const [anchorElInput, setAnchorElInput] = useState(null); // 入力メニューのアンカー要素
    const [anchorElConfirmation, setAnchorElConfirmation] = useState(null); // 確認メニューのアンカー要素
    const [popoverAnchorEl, setPopoverAnchorEl] = useState(null); // ポップオーバーのアンカー要素
    const [selectedMenu, setSelectedMenu] = useState('input');
    const [menuState, setMenuState] = useState(null);
    const openInputMenu = Boolean(anchorElInput);
    const openConfirmationMenu = Boolean(anchorElConfirmation);

    const { GetTagAllListFunction } = GetTagAllList();
    const [options, setOptions] = useState([]);
    const [Message, setMessage] = useState(notificationMessage);
    const theme = useTheme();

    useEffect(() => {
        let optionArrayPromise = GetTagAllListFunction("company_selected_occupation");
        optionArrayPromise.then((result) => {
            setOptions(result);
        });
    }, []);

    // 入力メニューのクリックイベント
    const handleClickInputMenu = (event) => {
        setAnchorElInput(event.currentTarget);
        document.body.style.overflow = 'hidden';
    };

    const handleCloseInputMenu = () => {
        setAnchorElInput(null);
        setPopoverAnchorEl(null); // 閉じたとき右側の表示も閉じる
        document.body.style.overflow = '';
    };

    // 確認メニューのクリックイベント
    const handleClickConfirmationMenu = (event) => {
        setAnchorElConfirmation(event.currentTarget);
    };

    const handleCloseConfirmationMenu = () => {
        setAnchorElConfirmation(null);
        setPopoverAnchorEl(null); // 閉じたとき右側の表示も閉じる
    };

    const handleMenuItemClick = (event, type, state) => {
        setSelectedMenu(type); // 選択したメニュータイプを更新
        setMenuState(state);
        setPopoverAnchorEl(event.currentTarget); // ポップオーバーの位置を設定
    };

    const NotificationMessageChange = (e) => {
        const newValue = e.target.value;
        setMessage(newValue);
        setNotificationMessage(newValue);
    };


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

    const AddDraftNews = () => {
        window.location.reload(false);
    }

    //エディタの編集状況を見て、チェックボックスで表示する
    const EditorStatusCheck = (check_element, key) => {
        console.log("check_element内容", check_element);

        let labels = [];
        if (key === 'selectedOccupation' && Array.isArray(check_element)) {
            labels = check_element.map(item => item.label);
            console.log("labels", labels);
        }

        const ShowTags = (tags) => {
            return tags.map((region, index) => (
                <div key={index} style={{ paddingLeft: '3px' }}>
                    <Button
                        variant="outlined"
                        sx={{ width: "100%", fontSize: "10px", borderColor: "#637381", color: "#637381", "&:hover": { borderColor: "#637381" }, cursor: "pointer" }}
                    >
                        {region}
                    </Button>
                </div>
            ));
        };


        return (
            <NewsMenuTable>
                <TableBody>
                    <TableRow>
                        <TableCell>
                            {check_element !== null ? (
                                <CheckBoxIcon color="primary" aria-label="設定完了しています" />
                            ) : (
                                <ErrorIcon color="error" aria-label="設定完了していません" />
                            )}
                        </TableCell>
                        <TableCell>
                            {
                                check_element !== null ? (
                                    key === 'title' || key === 'notificationMessage' ? (
                                        <p>{check_element}</p>
                                    ) : key === 'eventDay' ? (
                                        <p>{moment(check_element).format('YYYY/MM/DD HH時mm分~')}</p>
                                    ) : key === 'selectedOccupation' ? (
                                        <Box className="news_job_acordion_menu">
                                            {ShowTags(labels)}
                                        </Box> // labelsが空でない場合に表示
                                    ) : check_element ? (
                                        <p>設定完了しています</p>
                                    ) : (
                                        <p>設定完了していません</p>
                                    )
                                ) : (
                                    <p>設定完了していません</p>
                                )
                            }
                        </TableCell>
                    </TableRow>
                </TableBody>
            </NewsMenuTable>
        );
    };

    //エディタのコンテンツを見て、チェックボックスで表示する
    const EditorContentsStatusCheck = () => {
        return (
            <NewsMenuTable>
                <TableBody>
                    <TableRow>
                        <TableCell>
                            {charCount ? (
                                <CheckBoxIcon color="primary" aria-label="設定完了しています" />
                            ) : (
                                <ErrorIcon color="error" aria-label="設定完了していません" />
                            )}
                        </TableCell>
                        <TableCell>
                            {charCount ? (
                                <p>現在の文字数: {charCount}文字</p>
                            ) : (
                                <p>テキストが<br></br>打ち込まれていません</p>
                            )}
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            {usedImages && usedImages.length > 0 ? (
                                <CheckBoxIcon color="primary" aria-label="設定完了しています" />
                            ) : (
                                <QuestionMarkIcon color="error" aria-label="設定完了していません" />
                            )}
                        </TableCell>
                        <TableCell>
                            {usedImages && usedImages.length > 0 ? (
                                <>
                                    <p>使用画像</p>
                                    <ShowUsedImages usedImages={usedImages} />
                                </>
                            ) : (
                                <p>画像を使用していません</p>
                            )}
                        </TableCell>
                    </TableRow>
                </TableBody>
            </NewsMenuTable>
        );
    };
    
    //menustateによってPopOverのサイズを変更する
    const getPopoverSize = (menuState) => {
        switch (menuState) {
            case 'eventday':
                return { width: '300px', minHeight: '100px' }; 
            case 'jobtype':
                return { width: '400px', minHeight: '300px' }; 
            case 'message':
                return { width: '350px', minHeight: '100px' }; 
            case 'createform':
                return { width: '300px', minHeight: '100px' }; 
            case 'editing_status':
                    return { width: '350px', minHeight: '100px' }; 
            default:
                return { width: '300px', minHeight: '200px' }; 
        }
    };
    


    const renderPopoverContent = () => {


        if (selectedMenu === 'input') {
            switch (menuState) {
                case 'eventday':
                    return (
                        <Box sx={{ p: 2, minWidth: 300 }}>
                            <InputDateWithTime date={eventDay} setEventDay={setEventDay} />
                        </Box>
                    );
                case 'jobtype':
                    return (
                        <Select
                            id="prefecturesDropdown"
                            value={selectedOccupation}
                            onChange={setSelectedOccupation}
                            options={options}
                            closeMenuOnSelect={false}
                            placeholder="▼"
                            isMulti
                            menuPortalTarget={document.body}
                            isSearchable={true}
                            styles={{
                                menuPortal: (base) => ({
                                    ...base,
                                    zIndex: 9999,
                                }),
                                menu: (base) => ({
                                    ...base,
                                    maxHeight: '500px',
                                }),
                            }}
                        />
                    );
                case 'message':
                    return (
                        <Box sx={{ p: 2, minWidth: 300 }}>
                            <Textarea
                                name="NotificationMessage"
                                maxRows={12}
                                aria-label="maximum height"
                                placeholder="100字以内"
                                value={Message}
                                onChange={NotificationMessageChange}
                                maxLength={100}
                                sx={{
                                    border: Message === "" ? "1px red solid" : `1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]}`,
                                }}
                            />
                            <Typography variant="body2" color="textSecondary" align="right" sx={{ marginTop: 0 }}>
                                {Message ? Message.length : <span style={{ color: 'red', opacity: 0.7 }}>0</span>} / 100
                            </Typography>
                        </Box>
                    );
                case 'createform':
                    return (
                        <Box sx={{ p: 2, minWidth: 300 }}>
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

                                                                
                                                                <Stack direction={'row'}>
                                                                <p className="draftlist">
                                                                    質問数: {question_count}
                                                                </p>

                                                                <div style={{ alignItems: 'center', cursor: 'pointer' }}>
                                                                    <DeleteIcon />
                                                                    <p style={{ margin: 0}}>削除</p>
                                                                </div>
                                                                </Stack>

                                                                <Tooltip title="クリックすると応募フォーム作成画面へ行きます" placement="left">
                                                                    <Typography id="createFormJump" className="createFormJump"
                                                                        onClick={() => {
                                                                            CreateFormJump();
                                                                        }}>
                                                                        応募フォームを作成する
                                                                    </Typography>
                                                                </Tooltip>
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

                                        <Typography id="createFormJump" className='createFormJump'
                                            onClick={() => {
                                                CreateFormJump();
                                            }}>
                                            応募フォームを作成する
                                        </Typography>

                                    </>

                                )}

                            </div>
                        </Box>
                    )
                default:
                    return null;
            }
        } else if (selectedMenu === 'confirmation') {
            switch (menuState) {
                case 'editing_status':
                    return (
                        <Box sx={{ p: 2, minWidth: 300 }}>
                            <div className="editingstatus">
                                <p>現在の編集状況</p>
                                <p>タイトル</p>
                                {EditorStatusCheck(title, 'title')}
                                <p>サムネイル</p>
                                {EditorStatusCheck(imageUrl, 'imageurl')}
                                {followerCounter > 0 && (
                                    <>
                                        <p>通知に添えるメッセージ</p>
                                        {EditorStatusCheck(notificationMessage, 'notificationMessage')}
                                    </>
                                )}
                                <p>開催日</p>
                                {EditorStatusCheck(eventDay, 'eventDay')}
                                <p>募集職種</p>
                                {EditorStatusCheck(selectedOccupation, 'selectedOccupation')}
                                <p>記事内容</p>
                                {EditorContentsStatusCheck()}
                            </div>
                        </Box>
                    );
                case 'draft_list':
                    console.log("下書きリスト", draftlist);
                    return (
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
                default:
                    return null;
            }

        }
    };

    return (
        <div>

            {/* ボタン群 */}

            
            <Button
                id="input-button"
                aria-controls={openInputMenu ? 'menu-input' : undefined}
                aria-haspopup="true"
                aria-expanded={openInputMenu ? 'true' : undefined}
                onClick={handleClickInputMenu}
                sx={{ border: '1px solid', mx: 1 }}
            >
                入力メニュー
            </Button>
            <Menu
                id="menu-input"
                anchorEl={anchorElInput}
                open={openInputMenu}
                onClose={handleCloseInputMenu}
                MenuListProps={{
                    'aria-labelledby': 'input-button',
                }}
            >
                <MenuItem onClick={(e) => handleMenuItemClick(e, 'input', 'eventday')}>開催日</MenuItem>
                <MenuItem onClick={(e) => handleMenuItemClick(e, 'input', 'jobtype')}>募集職種</MenuItem>
                <MenuItem onClick={(e) => handleMenuItemClick(e, 'input', 'message')}>通知メッセージ</MenuItem>
                <MenuItem onClick={(e) => handleMenuItemClick(e, 'input', 'createform')}>応募用フォーム</MenuItem>
            </Menu>

            {/* 確認メニューのボタン */}
            <Button
                id="confirmation-button"
                aria-controls={openConfirmationMenu ? 'menu-confirmation' : undefined}
                aria-haspopup="true"
                aria-expanded={openConfirmationMenu ? 'true' : undefined}
                onClick={handleClickConfirmationMenu}
                sx={{ border: '1px solid', mx: 1 }}
            >
                確認メニュー
            </Button>
            <Menu
                id="menu-confirmation"
                anchorEl={anchorElConfirmation}
                open={openConfirmationMenu}
                onClose={handleCloseConfirmationMenu}
                MenuListProps={{
                    'aria-labelledby': 'confirmation-button',
                }}
            >
                <MenuItem onClick={(e) => handleMenuItemClick(e, 'confirmation', 'editing_status')}>編集状況</MenuItem>
                <MenuItem onClick={(e) => handleMenuItemClick(e, 'confirmation', 'draft_list')}>下書きリスト</MenuItem>

            </Menu>



            <Button
                variant="outlined"
                onClick={news_save}
                sx={{
                    border: '1px solid',
                    zIndex: '5',
                    mx: 1,
                    backgroundColor: 'rgba(255, 255, 255, 1)',
                }}
            >
                下書き保存
            </Button>

            {(isContentReady && isFollowerValid) ? (
                <Button variant="outlined" onClick={news_upload} sx={{ border: '1px solid', mx: 1 }}>
                    ニュースを公開する
                </Button>
            ) : (
                <Tooltip title="まだ公開できません">
                    <Button variant="outlined" className="Not_Upload_Button" sx={{ border: '1px solid', mx: 1 }}>
                        ニュースを公開する
                    </Button>
                </Tooltip>
            )}




            <Popover
                open={Boolean(popoverAnchorEl)}
                anchorEl={popoverAnchorEl}
                onClose={() => setPopoverAnchorEl(null)}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                PaperProps={{
                    sx: {
                        position: 'absolute',
                        width: getPopoverSize(menuState).width,
                        minHeight: getPopoverSize(menuState).minHeight,
                        top: 0,
                        marginLeft: '9%',
                    },
                }}
            >
                {renderPopoverContent()}
            </Popover>



        </div>
    );
};

NewsSelectMenu.propTypes = {
    setEventDay: PropTypes.func.isRequired,
    eventDay: PropTypes.object.isRequired,
    setSelectedOccupation: PropTypes.func.isRequired,
    selectedOccupation: PropTypes.array.isRequired,
    notificationMessage: PropTypes.string.isRequired,
    setNotificationMessage: PropTypes.func.isRequired,
    usedImages: PropTypes.arrayOf(PropTypes.string).isRequired,
    title: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    charCount: PropTypes.number.isRequired,
    followerCounter: PropTypes.number.isRequired,
    news_save: PropTypes.func.isRequired,
    news_upload: PropTypes.func.isRequired,
    isContentReady: PropTypes.bool.isRequired,
    isFollowerValid: PropTypes.bool.isRequired,
    draftlist: PropTypes.array.isRequired,
    RewriteNewsDelete: PropTypes.func.isRequired, //下書きニュースを削除する
    RewriteNewsEnter: PropTypes.func.isRequired, //下書き中で編集するニュースを選択して、遷移する
    selected_draft: PropTypes.array.isRequired, //現在下書き中のニュース＆フォームの情報
    CreateFormJump: PropTypes.func.isRequired
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

ShowUsedImages.propTypes = {
    usedImages: PropTypes.arrayOf(PropTypes.string).isRequired
};



export default NewsSelectMenu;
