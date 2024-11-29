import 'survey-core/defaultV2.min.css';
import { useState, useEffect } from "react";
import { Model } from 'survey-core';
import { Survey } from 'survey-react-ui';
import "./CreateForm.css";
import { useSessionStorage } from "src/hooks/use-sessionStorage";
import Modal from "react-modal";
import MUIButton from "@mui/material/Button";


// フォームメニュー
import Text from "./SelectOptionMenu/Text";
import DateForm from "./SelectOptionMenu/Date";
import Number from "./SelectOptionMenu/Number";
import Radio from "./SelectOptionMenu/Radio";
import FormDesign from "./SelectOptionMenu/FormDesign";
import DropDown from "./SelectOptionMenu/DropDown";
import CheckBox from "./SelectOptionMenu/CheckBox";
import Boolean from "./SelectOptionMenu/Boolean";
import Comment from "./SelectOptionMenu/Comment";
import Rating from "./SelectOptionMenu/Rating";
import Ranking from "./SelectOptionMenu/Ranking";
import ImagePicker from "./SelectOptionMenu/ImagePicker";

// MUI
import Stack from "@mui/material/Stack";
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import TranslateIcon from '@mui/icons-material/Translate';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import MoneyIcon from '@mui/icons-material/Money';
import RadioIcon from '@mui/icons-material/Radio';
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';
// import BrushIcon from '@mui/icons-material/Brush';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import FlakyIcon from '@mui/icons-material/Flaky';
import NotesIcon from '@mui/icons-material/Notes';
import AssessmentIcon from '@mui/icons-material/Assessment';
import StarIcon from '@mui/icons-material/Star';
import BurstModeIcon from '@mui/icons-material/BurstMode';
import Typography from "@mui/material/Typography";

//モバイルUI
import { useMediaQuery } from 'react-responsive';
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

import MenuIcon from '@mui/icons-material/Menu';


// データ保存
import axios from "axios";
import FormMenu from './clickedmenu/FormMenu';
import dayjs from "dayjs";
import "dayjs/locale/ja";

const CreateForm = ({ newsid, HandleBack }) => {
  console.log("ニュースid", newsid);
  console.log("HandleBack関数", HandleBack);
  const createform_search_url = "http://127.0.0.1:8000/createform_search";
  const [questions, setQuestions] = useState([]);
  const [deadlineDate, setDeadlineDate] = useState(dayjs());
  const isMobile = useMediaQuery({ query: '(max-width: 650px)' });
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => {
    setDrawerOpen(open);
    console.log("toggleDrawer発火");
  };


  useEffect(() => {
    const getcreateform = async () => {
      let createform = [];  // createformを初期化

      try {
        const response = await axios.get(createform_search_url, {
          params: { newsid: newsid }, // GETリクエストのパラメータとしてnewsidを送信
        });

        if (Array.isArray(response.data.create_form) && response.data.create_form.length > 0) {
          createform = JSON.parse(response.data.create_form[0].create_form);
          const log = response.data.create_form[0].company_id;
          console.log("クリエイトフォーム", createform);
          console.log("なんかみるログ", log);
        } else {
          createform = [
            {
              id: `1`,
              name: `Question1`,
              title: `デフォルトの質問`,
              type: 'text',
              inputType: 'text',
            }
          ];
        }
      } catch (error) {
        console.error("Error fetching create form data:", error);
        // エラーハンドリング、必要に応じてcreateformを空配列で返すなど
        createform = [
          {
            id: `1`,
            name: `Question1`,
            title: `エラーが発生しました`,
            type: 'text',
            inputType: 'text',
          },
        ];
      }

      setQuestions(createform); // 質問データをステートにセット
    };

    getcreateform();
  }, []); // 空の依存配列で最初のレンダリング時に実行



  // const [survey, setSurvey] = useState(null); // Survey モデルを state に保存
  const [modalopen, setModalOpen] = useState(false);
  const [buttonOpen, setButtonOpen] = useState(true);


  const [selectmenu, setSelectMenu] = useState("");
  const { getSessionData } = useSessionStorage();
  const [questionData, setQuestionData] = useState(null);
  const [formmenushow, setFormMenuShow] = useState(false);
  const accountData = getSessionData("accountData");
  const data = {
    id: accountData.id,
  };
  const [create_news_id] = useState(newsid);

  const modalStyle = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.7)', // オーバーレイの背景色
      zIndex: 1200, // オーバーレイの z-index
      width: '110%',
      height: '100%',
    },
    content: {
      position: 'absolute',
      top: '45%',
      left: '45%',
      height: '100%',
      transform: 'translate(-50%, -50%)',
      border: 'none',
      padding: '1.5rem',
      overflow: 'hidden',
      zIndex: 1200, // コンテンツの z-index
    },
  };




  // 質問を追加する関数 //dropdown
  const addQuestion = (Questions_Genre) => {
    console.log("クリックしたジャンル", Questions_Genre);
    const { type, inputType } = getQuestionType(Questions_Genre);

    // 新しい質問データを作成
    const newQuestion = {
      id: `${questions.length + 1}`,
      name: `Question${questions.length + 1}`,
      title: `設定中`,
      type: type,  // 質問のタイプを決定
      inputType: inputType,  // 質問のタイプを決定
    };

    console.log(type);
    console.log(inputType);

    // 新規追加なので `questionData` を初期化
    setQuestionData(newQuestion);

    // 新しい質問を追加
    setQuestions([...questions, newQuestion]);

    // モーダルを開く
    setButtonOpen(false);
    openModal(Questions_Genre);
  };


  const openModal = (Questions_Genre) => {
    setSelectMenu(Questions_Genre);
    setModalOpen(true);
  };

  const EditopenModal = (Questions_Genre, questionData) => {
    setSelectMenu(Questions_Genre);
    setQuestionData(questionData);
    setButtonOpen(false);
    setModalOpen(true);
  };

  // 質問のタイプを決定する関数
  const getQuestionType = (Questions_Genre) => {
    const type = (() => {
      switch (Questions_Genre) {
        case "radio":
          return "radiogroup";
        case "dropdown":
          return "dropdown";
        // case "Number":
        //   return "text";
        // case "Date":
        //     return "text";
        case "checkbox":
          return "checkbox";
        case "boolean":
          return "boolean";
        case "comment":
          return "comment";
        case "rating":
          return "rating";
        case "ranking":
          return "ranking";
        case "imagepicker":
          return "imagepicker";
        default:
          return "text";
      }
    })();

    //ラジオ・チェックボックス

    const inputType = (() => {
      switch (Questions_Genre) {
        case "number":
          return "number";
      }
    })();

    console.log('Question Type:', type);
    return { type, inputType };
  };

  const handleSaveSettings = (settings) => {
    console.log("受け取った設定", settings);
    console.log("inputType 確認: ", settings.inputType); // 追加
    const updatedQuestions = questions.map((q, index) =>
      index === questions.length - 1
        ? {
          ...q,
          title: settings.title || q.title,
          type: settings.type || q.type,
          inputType: settings.inputType || q.inputType,
          maxLength: settings.maxLength || q.maxLength,
          minLength: settings.minLength || q.minLength,
          placeholder: settings.placeholder || q.placeholder,
          autocomplete: settings.autocomplete || q.autocomplete,
          isrequired: settings.isrequired || q.isrequired,
          description: settings.description || q.description,
          validators: settings.validators || q.validators,
          defaultValueExpression: settings.defaultValueExpression || q.defaultValueExpression,
          minValueExpression: settings.minValueExpression || q.minValueExpression,
          min: settings.min || q.min,
          max: settings.max || q.max,
          defaultValue: settings.defaultValue || q.defaultValue,
          step: settings.step || q.step,
          showNoneItem: settings.showNoneItem || q.showNoneItem,
          showOtherItem: settings.showOtherItem || q.showOtherItem,
          choices: settings.choices || q.choices,
          colCount: settings.colCount || q.colCount,
          noneText: settings.noneText || q.noneText,
          otherText: settings.otherText || q.otherText,
          clearText: settings.clearText || q.clearText,
          separateSpecialChoices: settings.separateSpecialChoices || q.separateSpecialChoices,
          showClearButton: settings.showClearButton || q.showClearButton,
          fitToContainer: settings.fitToContainer || q.fitToContainer,

          showSelectAllItem: settings.showSelectAllItem || q.showSelectAllItem,
          selectallText: settings.selectallText || q.selectallText,

          rows: settings.rows || q.rows,
          autoGrow: settings.autoGrow || q.autoGrow,
          allowResize: settings.allowResize || q.allowResize,
          renderAs: settings.renderAs || q.renderAs,
          titleLocation: settings.titleLocation || q.titleLocation,

          rateType: settings.rateType || q.rateType,
          displayMode: settings.displayMode || q.displayMode,
          scaleColorMode: settings.scaleColorMode || q.scaleColorMode,
          rateCount: settings.rateCount || q.rateCount,
          rateValues: settings.rateValues || q.rateValues,
          rateMax: settings.rateMax || q.rateMax,

          multiSelect: settings.multiSelect || q.multiSelect,
          showLabel: settings.showLabel || q.showLabel,

        }
        : q
    );

    console.log("更新した質問", updatedQuestions);
    setQuestions(updatedQuestions);
    setQuestionData(null);

    survey.applyTheme({
      themeName: settings.themeName,
      colorPalette: settings.colorPalette,
    });

    console.log("handleSaveSettings通ってます");
    console.log("modalopen", modalopen);

    setModalOpen(false);
    setButtonOpen(true);
  };



  const surveyJson = {
    elements: questions && questions.length > 0 ? questions.map((q) => {
      // 各質問のデータをログに出力
      console.log("質問データ:", {
        name: q.name,
        title: q.title,
        type: q.type,
        inputType: q.inputType,
        maxLength: q.maxLength || undefined,
        minLength: q.minLength || undefined,
        placeholder: q.placeholder || undefined,
        autocomplete: q.autocomplete || undefined,
        isRequired: q.isrequired || false,
        description: q.description || undefined,
        validators: q.validators || undefined,
        defaultValueExpression: q.defaultValueExpression || undefined,
        minValueExpression: q.minValueExpression || undefined,
        min: q.min || undefined,
        max: q.max || undefined,
        defaultValue: q.defaultValue || undefined,
        step: q.step || undefined,
        showNoneItem: q.showNoneItem || undefined,
        showOtherItem: q.showOtherItem || undefined,
        choices: q.choices || undefined,
        colCount: q.colCount || undefined,
        noneText: q.noneText || undefined,
        otherText: q.otherText || undefined,
        clearText: q.clearText || undefined,
        separateSpecialChoices: q.separateSpecialChoices || undefined,
        showClearButton: q.showClearButton || undefined,
        fitToContainer: q.fitToContainer || undefined,
      });

      return {
        name: q.name,
        title: q.title,
        type: q.type || undefined,
        inputType: q.inputType || undefined,
        maxLength: q.maxLength || undefined,
        minLength: q.minLength || undefined,
        placeholder: q.placeholder || undefined,
        autocomplete: q.autocomplete || undefined,
        isRequired: q.isrequired || false,
        description: q.description || undefined,
        validators: q.validators || undefined,
        defaultValueExpression: q.defaultValueExpression || undefined,
        minValueExpression: q.minValueExpression || undefined,
        min: q.min || undefined,
        max: q.max || undefined,
        defaultValue: q.defaultValue || undefined,
        step: q.step || undefined,
        showNoneItem: q.showNoneItem || undefined,
        showOtherItem: q.showOtherItem || undefined,
        choices: q.choices || undefined,
        colCount: q.colCount || undefined,
        noneText: q.noneText || undefined,
        otherText: q.otherText || undefined,
        clearText: q.clearText || undefined,
        separateSpecialChoices: q.separateSpecialChoices || undefined,
        showClearButton: q.showClearButton || undefined,
        fitToContainer: q.fitToContainer || undefined,
        showSelectAllItem: q.showSelectAllItem || undefined,
        selectallText: q.selectallText || undefined,
        rows: q.rows || undefined,
        autoGrow: q.autoGrow || undefined,
        allowResize: q.allowResize || undefined,
        renderAs: q.renderAs || undefined,
        titleLocation: q.titleLocation || undefined,
        rateType: q.rateType || undefined,
        displayMode: q.displayMode || undefined,
        scaleColorMode: q.scaleColorMode || undefined,
        rateCount: q.rateCount || undefined,
        rateValues: q.rateValues || undefined,
        rateMax: q.rateMax || undefined,
        multiSelect: q.multiSelect || undefined,
        showLabel: q.showLabel || undefined,
        themeSettings: {
          themeName: q.themeName || "default", // デフォルト値を設定
          colorPalette: q.colorPalette || "light",
        },
      };
    }) : [], // questionsがnullまたは空の場合は空の配列を返す
  };


  // surveyJsonの内容をログに出力
  console.log("Survey JSON:", surveyJson);


  console.table(surveyJson.elements);
  const survey = new Model(surveyJson);
  survey.locale = "jp";  // 日本語に設定




  survey.onAfterRenderQuestion.add(function (survey, options) {
    // ボタンの作成
    const deleteButton = document.createElement("button");
    const editButton = document.createElement("button");

    // ボタンのテキスト設定
    deleteButton.textContent = "削除";
    editButton.textContent = "編集";

    // 削除ボタンのクリックイベント
    deleteButton.onclick = function () {
      // 削除する質問の ID を取得
      const questionId = options.question.name;
      console.log(questionId);

      // `questions` ステートから削除対象の質問を除外
      const updatedQuestions = questions.filter(q => q.name !== questionId);

      // ID と name を振り直す
      const reassignedQuestions = updatedQuestions.map((q, index) => ({
        ...q,
        id: (index + 1).toString(), // 新しいID
        name: `Question${index + 1}`, // 新しいname
      }));

      // ステートを更新して再描画
      setQuestions(reassignedQuestions);

      // SurveyJS 内でも削除
      const page = options.question.page;
      page.removeQuestion(options.question);

      console.log(reassignedQuestions); // 再割り当てされた質問を確認
    };

    // 編集ボタンのクリックイベント
    editButton.onclick = function () {
      const questionData = options.question;

      // 質問の入力タイプを取得
      const questionInputType = questionData.inputType;
      console.log("questionData.type", questionData.jsonObj.type);
      let questionType;

      // 入力タイプが存在する場合の処理
      // imagepicker の場合、questionInputTypeがradioかcheckboxになってしまい、別のフォームが開く
      if (questionData.jsonObj.type === "imagepicker") {
        questionType = "imagepicker";
        console.log("ImagePickerのフォームを表示します");
      } else if (questionInputType) {
        // NumberかDateの場合、そのままinputTypeを使用
        questionType = questionInputType;
        console.log("inputTypeを使用:", questionType);
      } else {
        // 入力タイプが存在しない場合、通常のtypeを使用
        questionType = questionData.getType ? questionData.getType() : questionData.type;
      }

      console.log("編集対象の質問データ:", questionData);
      console.log("質問タイプ:", questionType);

      // 編集モーダルを開く
      EditopenModal(questionType, questionData);
    };

    // HTML要素にボタンを追加
    options.htmlElement.appendChild(deleteButton);
    options.htmlElement.appendChild(editButton);
  });



  useEffect(() => {
    // 完了ボタンを非表示にする
    const css = `
        .sv-action__content .sd-btn--action.sd-navigation__complete-btn {
          display: none;
        }
      `;
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = css;
    document.head.appendChild(styleSheet);
  }, []);



  // フォームの編集データを保存
  const CreateFormSave = async () => {
    console.log("フォーム内容", questions);
    console.log("締切日", deadlineDate);
    const create_form_save_url = `http://localhost:8000/create_form_save`;

    try {
      const response = await axios.post(create_form_save_url, {
        create_form: questions,
        company_id: data.id,
        create_news_id: create_news_id,
        deadline: deadlineDate,
      });
      console.log("サーバーからのレスポンス", response.data);
      // window.location.reload()
      alert("保存が完了しました");
    } catch (error) {
      console.error("フォーム保存エラー", error);
    }
  };



  // キャンセル時の処理
  const CreateFormCancel = () => {
    setQuestions(questions.filter(q => q !== questionData));  // キャンセル時に追加した質問を削除
    setQuestionData(null);  // `questionData` をクリア
    setModalOpen(false);
    setButtonOpen(true);
  };

  const WriteNewsHandleBack = async (event) => {
    event.preventDefault(); // デフォルトの挙動を防ぐ
    HandleBack();
  };



  const FormSelectArray = [
    { lavel: 'テキスト', icon: <TranslateIcon />, click: 'text' },
    { lavel: '日時', icon: <WatchLaterIcon />, click: 'date' },
    { lavel: '数値', icon: <MoneyIcon />, click: 'number' },
    { lavel: 'ラジオボタン', icon: <RadioIcon />, click: 'radio' },
    { lavel: 'ドロップダウン', icon: <ArrowDropDownCircleIcon />, click: 'dropdown' },
    { lavel: 'チェックボックス', icon: <CheckBoxIcon />, click: 'checkbox' },
    { lavel: 'クローズドクエスチョン', icon: <FlakyIcon />, click: 'boolean' },
    { lavel: 'テキストボックス', icon: <NotesIcon />, click: 'comment' },
    { lavel: '評価', icon: <AssessmentIcon />, click: 'rating' },
    { lavel: 'ランキング', icon: <StarIcon />, click: 'ranking' },
    { lavel: '画像ピッカー', icon: <BurstModeIcon />, click: 'imagepicker' },
    // isMobileがtrueのときだけ「保存する」を追加
    ...(isMobile ? [{ lavel: '保存する', icon: <BurstModeIcon />, click: 'save' }] : []),
  ];

  const SelectMenuArray = [
    //テキスト
    { menu: "text", component: Text },
    { menu: "username", component: Text },
    { menu: "email", component: Text },
    { menu: "password", component: Text },
    { menu: "url", component: Text },
    //日時
    { menu: "date", component: DateForm },
    { menu: "time", component: DateForm },
    { menu: "datetime-local", component: DateForm },
    { menu: "month", component: DateForm },
    { menu: "week", component: DateForm },
    //数値
    { menu: "number", component: Number },
    { menu: "range", component: Number },
    { menu: "tel", component: Number },
    //ラジオボタン
    { menu: "radio", component: Radio },
    { menu: "radiogroup", component: Radio },
    //ドロップダウン
    { menu: "dropdown", component: DropDown },
    { menu: "tagbox", component: DropDown },
    //チェックボックス
    { menu: "checkbox", component: CheckBox },
    //クローズドクエスチョン
    { menu: "boolean", component: Boolean },
    //ロングテキストボックス
    { menu: "comment", component: Comment },
    //(10段階)評価
    { menu: "rating", component: Rating },
    //ランキング
    { menu: "ranking", component: Ranking },
    //画像ピッカー
    { menu: "imagepicker", component: ImagePicker },
    //デザインを変更する
    { menu: "FormDesign", component: FormDesign },

  ];


  const FormMenuShow = () => {
    setFormMenuShow(true);
    console.log("開く");
    document.body.style.overflow = 'hidden';
  }

  const closeModal = () => {
    setFormMenuShow(false);
    console.log("閉じる");
    document.body.style.overflow = 'auto';
  };


  return (
    <>
      <Stack direction="row" spacing={2} style={{ width: "1000px" }}>

        <div className="FormDemo"> {/* フォーム部分 */}


          {/*フォームメニューのボタン */}
          <Stack direction="row" alignItems="center" spacing={1}>
            <div className="back_news_draft" onClick={WriteNewsHandleBack}>
              <Typography>← ニュースの下書きに戻る</Typography>
            </div>
            {/* <MUIButton onClick={NewsMenuShow} variant="contained" sx={buttonStyle}> */}
            <MUIButton variant="contained" onClick={FormMenuShow} className='FormMenuButton'>
              フォームメニュー
            </MUIButton>
          </Stack>


          <FormMenu
            IsOpen={formmenushow}
            CloseModal={closeModal}
            questions={questions}
            SetDeadlineDate={setDeadlineDate}
            deadlineDate={deadlineDate}
          // genre={genre}
          // draftlist={draft_list}
          // CreateFormJump={CreateFormJump}
          // newsid={news_id}
          // RewriteNewsDelete={rewrite_news_delete}
          // RewriteNewsEnter={rewrite_news}
          // EditorStatusCheck={EditorStatusCheck}
          // EditorContentsStatusCheck={EditorContentsStatusCheck}
          // NewsSave={news_save}
          // imageUrl={imageUrl}
          // title={title}
          // NewsUpLoad={news_upload}
          // NotificationMessageHandleChange={notification_messagehandleChange}
          // message={notificationMessage}
          // charCount={charCount}
          // selected_draft={selected_draft}
          // followerCounter={followerCounter}
          />


          {!questions || questions.length === 0 ? (
            <p>フォームがありません</p>
          ) : (
            <>
              <div className="SurveyModal">
                <Survey model={survey} />
              </div>

            </>
          )}
        </div>

        <Modal
          isOpen={modalopen}
          onRequestClose={CreateFormCancel} // モーダルを閉じるコールバック
          shouldCloseOnOverlayClick={true} // オーバーレイクリックでモーダルを閉じる
          contentLabel="Example Modal"
          style={modalStyle}
        >
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            {SelectMenuArray.map((menu, index) => {
              const Component = menu.component; // 各メニューに対応するコンポーネントを取得
              return (
                selectmenu === menu.menu && (
                  <Component
                    key={index}
                    onSave={handleSaveSettings}
                    onCancel={CreateFormCancel}
                    questionData={questionData ? questionData : null} // 編集時のみquestionDataを渡す
                  />
                )
              );

            })}
          </Stack>
        </Modal>




        {buttonOpen && (
          <>
            <Stack spacing={2} className="SelectMenu">

              {isMobile ? (
                <div className="Menu">
                  {/* ハンバーガーメニュー用のボタン */}
                  <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    onClick={() => toggleDrawer(true)}
                  >
                    <MenuIcon className="Menu" />
                  </IconButton>

                  {/* ドロワーメニュー */}
                  <Drawer
                    anchor="left"
                    open={drawerOpen}
                    onClose={() => toggleDrawer(false)}
                  >
                    <List>
                      {FormSelectArray.map((form, index) => (
                        <ListItem
                          button
                          key={index}
                          onClick={() => {
                            // メニュー選択時のアクション
                            console.log(form.lavel);
                            setDrawerOpen(false); // ドロワーを閉じる
                          }}
                        >
                          <ListItemText primary={form.lavel} />
                        </ListItem>
                      ))}
                    </List>
                  </Drawer>
                </div>
              ) : (
                <>
                  {FormSelectArray.map((form, index) => (
                    <Button
                      key={index}
                      startIcon={form.icon}
                      onClick={() => addQuestion(form.click)}
                      variant="outlined"
                      sx={{
                        textAlign: "center",
                        width: "250px",
                        marginLeft: "40%",
                      }}
                    >
                      {form.lavel}
                    </Button>
                  ))}

                  {/* 保存ボタン */}
                  <Button
                    variant="outlined"
                    onClick={CreateFormSave}
                    sx={{
                      borderColor: "#5956FF",
                      color: "#5956FF",
                      "&:hover": { borderColor: "#5956FF" },
                      cursor: "pointer",
                      textAlign: "center",
                      width: "150px",
                      left: "40%",
                    }}
                  >
                    保存する
                  </Button>
                </>
              )}
            </Stack>
          </>
        )}

      </Stack>
    </>
  );
}


// displayName を設定
CreateForm.displayName = 'CreateForm';

// PropTypesバリデーション
Text.propTypes = {
  onSave: PropTypes.func.isRequired,
};

CreateForm.propTypes = {
  newsid: PropTypes.number,
  HandleBack: PropTypes.func.isRequired,
};



export default CreateForm;

