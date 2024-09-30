import 'survey-core/defaultV2.min.css';
import { useState, useEffect } from "react";
import { Model } from 'survey-core';
import { Survey } from 'survey-react-ui';
import "./CreateForm.css";
import { useSessionStorage } from "src/hooks/use-sessionStorage";
import { useParams } from 'react-router-dom';



// フォームメニュー
import Text from "./SelectOptionMenu/Text";
import DateForm from "./SelectOptionMenu/Date";
import Number from "./SelectOptionMenu/Number";
import Radio from "./SelectOptionMenu/Radio";
import FormDesign from "./SelectOptionMenu/FormDesign";
import DropDown from "./SelectOptionMenu/DropDown";
import CheckBox from "./SelectOptionMenu/CheckBox";



// MUI
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import TranslateIcon from '@mui/icons-material/Translate';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import MoneyIcon from '@mui/icons-material/Money';
import RadioIcon from '@mui/icons-material/Radio';
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';
import BrushIcon from '@mui/icons-material/Brush';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

// データ保存
import axios from "axios";

export default function CreateForm() {
  const [questions, setQuestions] = useState([
    { name: "Question1", title: "デモ質問", type: "text", placeholder: "この質問はテキストを入力できます" },
  ]);

  // const [survey, setSurvey] = useState(null); // Survey モデルを state に保存
  const [modalopen, setModalOpen] = useState(false);
  const [selectmenu, setSelectMenu] = useState("");
  const { getSessionData } = useSessionStorage();
  const [createformid, setCreateFormId] = useState(0);
  const [questionData, setQuestionData] = useState(null);



  const accountData = getSessionData("accountData");
  const data = {
    id: accountData.id,
  };
  const { news_id } = useParams();
  const [create_news_id] = useState(news_id);

  // 質問を追加する関数
  const addQuestion = (Questions_Genre) => {
    console.log(Questions_Genre);
    const newQuestion = {
      id: `${questions.length + 1}`,
      name: `Question${questions.length + 1}`,
      title: `設定中`,
      type: getQuestionType(Questions_Genre),  // 質問のタイプを決定
      inputType: getQuestionType(Questions_Genre),  // 質問のタイプを決定
    };
    setQuestions([...questions, newQuestion]);
    openModal(Questions_Genre);
  };


  const openModal = (Questions_Genre) => {
    setSelectMenu(Questions_Genre);
    setModalOpen(true);
  };

  const EditopenModal = (Questions_Genre, questionData) => {
    setSelectMenu(Questions_Genre);
    setQuestionData(questionData);
    setModalOpen(true);
  };

  // 質問のタイプを決定する関数
  const getQuestionType = (Questions_Genre) => {
    const type = (() => {
      switch (Questions_Genre) {
        case "Radio":
          return "radiogroup";
        case "DropDown":
          return "dropdown";
        case "Number":
          return "number";
        case "CheckBox":
          return "checkbox";
        default:
          return "text";
      }
    })();
    console.log('Question Type:', type);  // タイプが正しく返されているか確認
    return type;
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
        }
        : q
    );

    console.log("更新した質問", updatedQuestions);
    setQuestions(updatedQuestions);

    survey.applyTheme({
      themeName: settings.themeName,
      colorPalette: settings.colorPalette,
    });

    setModalOpen(false);
  };

  const surveyJson = {
    elements: questions.map((q) => {
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


        themeSettings: {
          themeName: q.themeName || "default", // デフォルト値を設定
          colorPalette: q.colorPalette || "light",
        }
      };
    }),
  };

  // surveyJsonの内容をログに出力
  console.log("Survey JSON:", surveyJson);


  console.table(surveyJson.elements);
  const survey = new Model(surveyJson);

  survey.onAfterRenderQuestion.add(function (survey, options) {
    var deleteButton = document.createElement("button");
    var editButton = document.createElement("button");
    deleteButton.textContent = "削除";
    editButton.textContent = "編集";
    deleteButton.onclick = function () {
      var page = options.question.page;
      page.removeQuestion(options.question);
    };
    editButton.onclick = function () {
      const questionData = options.question;
      const questionType = questionData.getType ? questionData.getType() : questionData.inputType || questionData.type;
      console.log("編集対象の質問データ:", questionData);
      console.log("質問タイプ:", questionType);
      EditopenModal(questionType, questionData);
    };
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

    const create_form_save_url = `http://localhost:8000/create_form_save`;

    try {
      const response = await axios.post(create_form_save_url, {
        create_form_id: createformid,
        create_form: questions,
        company_id: data.id,
        create_news_id: create_news_id,
      });
      console.log("サーバーからのレスポンス", response.data);
      setCreateFormId(response.data.create_form_id);
    } catch (error) {
      console.error("フォーム保存エラー", error);
    }
  };

  return (
    <>
      <Stack direction="row" alignItems="center" spacing={1}>
        {questions.length === 0 ? (
          <p>フォームがありません</p> // 質問がない場合に表示
        ) : (
          <Survey model={survey} /> // 質問がある場合にSurveyを表示
        )}
        {modalopen && (
          <div className="FormOptionModal">
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
              <Typography variant="h4"></Typography>
              {selectmenu === "text" && <Text onSave={handleSaveSettings} questionData={questionData} />}
              {selectmenu === "Date" && <DateForm onSave={handleSaveSettings} />}
              {selectmenu === "Number" && <Number onSave={handleSaveSettings} />}
              {selectmenu === "Radio" && <Radio onSave={handleSaveSettings} />}
              {selectmenu === "FormDesign" && <FormDesign onSave={handleSaveSettings} />}
              {selectmenu === "DropDown" && <DropDown onSave={handleSaveSettings} />}
              {selectmenu === "CheckBox" && <CheckBox onSave={handleSaveSettings} />}
            </Stack>
          </div>
        )}
      </Stack>

      <Button variant="outlined" onClick={CreateFormSave}
        sx={{ width: "40px", borderColor: '#5956FF', color: '#5956FF', '&:hover': { borderColor: '#5956FF' }, cursor: 'pointer' }}>
        保存する
      </Button>

      <Stack
      direction="row"
      border="solid"
      alignItems="center"
      style={{ maxWidth: "250px", overflow: "hidden", marginBottom: "5px"}} 
      >      
      <TranslateIcon onClick={() => addQuestion("text")} style={{ cursor: 'pointer' }} />
      <Typography onClick={() => addQuestion("text")}
        component="span"
        style={{
          cursor: 'pointer',
          marginLeft: 8,
          borderWidth: "2px",
          flexShrink: 0, // テキストが縮小しないようにする
          whiteSpace: "nowrap", // テキストを折り返さずに表示
          overflow: "hidden", // 溢れたテキストを隠す
          textOverflow: "ellipsis" // 溢れたテキストに省略記号を表示
        }}
      >
        テキストを追加
      </Typography>
    </Stack>

    <Stack
      direction="row"
      border="solid"
      borderCollapse="collapse"
      alignItems="center"
      style={{ maxWidth: "250px", overflow: "hidden", marginBottom: "5px"}} 
      >      
      <WatchLaterIcon onClick={() => addQuestion("Date")} style={{ cursor: 'pointer' }} />
      <Typography onClick={() => addQuestion("Date")}
        component="span"
        style={{
          cursor: 'pointer',
          marginLeft: 8,
          borderWidth: "2px",
          flexShrink: 0, // テキストが縮小しないようにする
          whiteSpace: "nowrap", // テキストを折り返さずに表示
          overflow: "hidden", // 溢れたテキストを隠す
          textOverflow: "ellipsis" // 溢れたテキストに省略記号を表示
        }}
      >
        日時を追加
      </Typography>
    </Stack>
      
    <Stack
      direction="row"
      border="solid"
      borderCollapse="collapse"
      alignItems="center"
      style={{ maxWidth: "250px", overflow: "hidden", marginBottom: "5px" }} 
      >      
      <MoneyIcon onClick={() => addQuestion("Number")} style={{ cursor: 'pointer' }} />
      <Typography onClick={() => addQuestion("Number")}
        component="span"
        style={{
          cursor: 'pointer',
          marginLeft: 8,
          borderWidth: "2px",
          flexShrink: 0, // テキストが縮小しないようにする
          whiteSpace: "nowrap", // テキストを折り返さずに表示
          overflow: "hidden", // 溢れたテキストを隠す
          textOverflow: "ellipsis" // 溢れたテキストに省略記号を表示
        }}
      >
        数値を追加
      </Typography>
    </Stack>

    <Stack
      direction="row"
      border="solid"
      borderCollapse="collapse"
      alignItems="center"
      style={{ maxWidth: "250px", overflow: "hidden", marginBottom: "5px" }} 
      >      
      <RadioIcon onClick={() => addQuestion("Radio")} style={{ cursor: 'pointer' }} />
      <Typography onClick={() => addQuestion("Radio")}
        component="span"
        style={{
          cursor: 'pointer',
          marginLeft: 8,
          borderWidth: "2px",
          flexShrink: 0, // テキストが縮小しないようにする
          whiteSpace: "nowrap", // テキストを折り返さずに表示
          overflow: "hidden", // 溢れたテキストを隠す
          textOverflow: "ellipsis" // 溢れたテキストに省略記号を表示
        }}
      >
        ラジオボタンを追加
      </Typography>
    </Stack> 

    <Stack
      direction="row"
      border="solid"
      borderCollapse="collapse"
      alignItems="center"
      style={{ maxWidth: "250px", overflow: "hidden", marginBottom: "5px" }} 
      >      
      <ArrowDropDownCircleIcon onClick={() => addQuestion("DropDown")} style={{ cursor: 'pointer' }} />
      <Typography onClick={() => addQuestion("DropDown")}
        component="span"
        style={{
          cursor: 'pointer',
          marginLeft: 8,
          borderWidth: "2px",
          flexShrink: 0, // テキストが縮小しないようにする
          whiteSpace: "nowrap", // テキストを折り返さずに表示
          overflow: "hidden", // 溢れたテキストを隠す
          textOverflow: "ellipsis" // 溢れたテキストに省略記号を表示
        }}
      >
      ドロップダウンを追加      
      </Typography>
    </Stack> 

    <Stack
      direction="row"
      border="solid"
      borderCollapse="collapse"
      alignItems="center"
      style={{ maxWidth: "250px", overflow: "hidden", marginBottom: "5px" }} 
      >      
      <CheckBoxIcon onClick={() => addQuestion("CheckBox")} style={{ cursor: 'pointer' }} />
      <Typography onClick={() => addQuestion("CheckBox")}
        component="span"
        style={{
          cursor: 'pointer',
          marginLeft: 8,
          borderWidth: "2px",
          flexShrink: 0, // テキストが縮小しないようにする
          whiteSpace: "nowrap", // テキストを折り返さずに表示
          overflow: "hidden", // 溢れたテキストを隠す
          textOverflow: "ellipsis" // 溢れたテキストに省略記号を表示
        }}
      >
      チェックボックスを追加      
      </Typography>
    </Stack> 

    <Stack
      direction="row"
      border="solid"
      borderCollapse="collapse"
      alignItems="center"
      style={{ maxWidth: "250px", overflow: "hidden", marginBottom: "5px" }} 
      >      
      <BrushIcon onClick={() => addQuestion("FormDesign")} style={{ cursor: 'pointer' }} />
      <Typography onClick={() => addQuestion("FormDesign")}
        component="span"
        style={{
          cursor: 'pointer',
          marginLeft: 8,
          borderWidth: "2px",
          flexShrink: 0, // テキストが縮小しないようにする
          whiteSpace: "nowrap", // テキストを折り返さずに表示
          overflow: "hidden", // 溢れたテキストを隠す
          textOverflow: "ellipsis" // 溢れたテキストに省略記号を表示
        }}
      >
      デザインを変更     
      </Typography>
    </Stack> 
    </>
  );

}

// PropTypesバリデーション
Text.propTypes = {
  onSave: PropTypes.func.isRequired,
};
