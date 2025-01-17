import 'survey-core/defaultV2.min.css';
import { useState, useEffect } from "react";
import { Model } from 'survey-core';
import { Survey } from 'survey-react-ui';
import "./CreateForm.css";
import { useSessionStorage } from "src/hooks/use-sessionStorage";
import Modal from "react-modal";
import { ColorRing } from "react-loader-spinner";

//Survey.js スタイル
import * as themes from "survey-core/themes";

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
import Theme_Color_Setting from "./SelectOptionMenu/Theme_Color_Setting";

// MUI
import Stack from "@mui/material/Stack";
import PropTypes from 'prop-types';
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import ModeEditIcon from '@mui/icons-material/ModeEdit';

// データ保存
import axios from "axios";
import dayjs from "dayjs";
import "dayjs/locale/ja";

import FormSelectMenu from "./clickedmenu/FormSelectMenu";

Modal.setAppElement('#root');

const CreateForm = ({ newsid, HandleBack}) => {

  console.log("ニュースid", newsid);
  console.log("HandleBack関数", HandleBack);
  const createform_search_url = "http://127.0.0.1:8000/createform_search";
  const [questions, setQuestions] = useState({});
  const [deadlineDate, setDeadlineDate] = useState(dayjs());
  const [backGroundColor, setBackGroundColor] = useState('#808080')
  const [titleColor, setTitleColor] = useState('#000000');
  const [barColor, setBarColor] = useState('#000000');
  const [questionColor, setQuestionColor] = useState('#000000');
  const [theme, setTheme] = useState('default');
  const [applyTheme, setApplyTheme] = useState('DefaultLight');
  const [alignment, setAlignment] = useState('Light');
  const [editingStatus, setEditingStatus] = useState('New'); //編集中のフォームデータが新規なのか再編集なのかチェック


  console.log(theme);

  const customCss = {}; // 初期値は空オブジェクト

  // スタイルを動的に追加する関数
  const applyCustomCss = (key, value) => {
    customCss[key] = value; // カスタムCSS変数を更新
    const rootElement = document.documentElement; // HTMLのルート要素
    rootElement.style.setProperty(key, value); // CSS変数を適用
  };

  const capitalizeFirstLetter = (str) => {
    if (!str) return "";  // strがnullやundefinedなら空文字を返す
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  useEffect(() => {
    // 背景色のスタイルを更新
    applyCustomCss('--sjs-general-backcolor-dim', backGroundColor); //背景色 //テーマによる
    applyCustomCss('--sjs-font-surveytitle-color', titleColor); //タイトルカラー
    applyCustomCss('--sjs-font-questiontitle-color', questionColor); //質問のタイトルカラー
    applyCustomCss('--sjs-primary-backcolor', barColor); //テーマによる //タイトルと質問の間の線のカラー
    console.log("更新されました");
  }, [backGroundColor, titleColor, barColor, questionColor]);



  useEffect(() => {
    const getcreateform = async () => {
      let createform = {};  // オブジェクト型で初期化
      console.log("news_id", newsid);

      try {
        const response = await axios.post(createform_search_url, {
          newsid: newsid, // POST ボディに含める
        });

        console.log("レスポンスのクリエイトフォーム", response.data.create_form);
        if (Array.isArray(response.data.create_form) && response.data.create_form.length > 0) {
          console.log("持ってきた内容", response.data.create_form);
          setDeadlineDate(response.data.create_form.deadline);
          createform = typeof response.data.create_form[0].create_form === "string"
            ? JSON.parse(response.data.create_form[0].create_form)
            : response.data.create_form[0].create_form;
          console.log("クリエイトフォーム", createform)
          setBackGroundColor(createform.themeSettings.backgroundColor || '#FFFFFF');
          setTitleColor(createform.themeSettings.titleColor || '#000000');
          setQuestionColor(createform.themeSettings.questionTitleColor || '#000000');
          setBarColor(createform.themeSettings.barColor || '#000000');
          setTheme(createform.themeSettings.themeName || 'default');

          const themeName = capitalizeFirstLetter(createform.themeSettings.themeName);
          const colorPalette = capitalizeFirstLetter(createform.themeSettings.colorPalette);

          setApplyTheme(`${themeName}${colorPalette}`);
          console.log("setApplyTheme", `${themeName}${colorPalette}`);
          if (createform.themeSettings.colorPalette?.includes("light")) {
            setAlignment("Light");
          } else {
            setAlignment("Dark");
          }
        } else {
          console.warn("create_form が空か存在しません。デフォルト値を設定します。");
          createform = {
            title: 'タイトル未設定',
            elements: [
              {
                id: "1",
                name: "Question1",
                title: "デフォルトの質問",
                type: "text",
                inputType: "username",
                isRequired: false,
              }
            ],
            themeSettings: {
              themeName: theme,
              colorPalette: alignment,
              backgroundColor: backGroundColor || "#FFFFFF",
            },
          };
        }
      } catch (error) {
        console.error("Error fetching create form data:", error);
        createform = {
          title: 'タイトル未設定',
          elements: [
            {
              id: "1",
              name: "Question1",
              title: "エラーが発生しました",
              type: "text",
              inputType: "text",
              isRequired: false,
            }
          ],
          themeSettings: {
            themeName: "error",
            colorPalette: "light",
          },
        };
      }

      setQuestions(createform); // 質問データをステートにセット
    };

    getcreateform();
  }, []); // 空の依存配列で最初のレンダリング時に実行

  useEffect(() => {
    console.log("deadlineDateが更新されました", deadlineDate);
  }, [setDeadlineDate])

  const [modalopen, setModalOpen] = useState(false);
  const [themeColorModalOpen, setThemeColorModalOpen] = useState(false);
  const [selectmenu, setSelectMenu] = useState("");
  const { getSessionData } = useSessionStorage();
  const [questionData, setQuestionData] = useState(null);
  const accountData = getSessionData("accountData");
  const data = {
    id: accountData.id,
  };
  const [create_news_id] = useState(newsid);

  // 質問を追加する関数 //dropdown
  const addQuestion = (Questions_Genre) => {
    console.log("クリックしたジャンル", Questions_Genre);

    // ジャンルからタイプ情報を取得
    const { type, inputType } = getQuestionType(Questions_Genre);

    // `questions` が文字列の場合はパース
    let currentQuestions = questions;
    console.log("currentQuestions", currentQuestions);
    console.log("currentQuestions 型:", typeof currentQuestions);

    // questionsが文字列型ならパースする
    if (typeof currentQuestions === "string") {
      try {
        currentQuestions = JSON.parse(currentQuestions);  // パースしてオブジェクトに変換
      } catch (error) {
        console.error("questions のパースに失敗しました:", error);
        currentQuestions = { elements: [] };  // パース失敗時に空の配列を初期化
      }
    }

    // `elements` に追加する新しい質問データ
    const newQuestion = {
      name: `Question${currentQuestions.elements.length + 1}`,  // 修正: 正しいインデックスを使用
      title: `新しい質問 ${currentQuestions.elements.length + 1}`,
      type: type,  // 質問のタイプ
      inputType: inputType,  // 入力タイプ
      isRequired: false,  // 必要に応じてデフォルト値を設定
    };

    console.log("新しい質問のタイプ:", type);
    console.log("新しい質問の入力タイプ:", inputType);

    // 質問を更新
    const updatedQuestions = {
      ...currentQuestions,
      elements: [...currentQuestions.elements, newQuestion],
    };
    console.log("更新された質問リスト:", updatedQuestions);

    // ステートを更新
    setQuestions(updatedQuestions);  // 文字列としてステートを更新

    // `newQuestion` をモーダル用に設定
    setQuestionData(newQuestion);

    //新規作成の状況
    setEditingStatus('New');

    // モーダルを開く
    openModal(Questions_Genre);
  };

  const openModal = (Questions_Genre) => {
    setSelectMenu(Questions_Genre);
    setModalOpen(true);
  };

  const EditopenModal = (Questions_Genre, questionData) => {
    setSelectMenu(Questions_Genre);
    setQuestionData(questionData);
    setEditingStatus('ReEdit');
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
        default:
          return "text";
      }
    })();

    console.log('Question Type:', type);
    return { type, inputType };
  };

  const handleSaveSettings = (settings) => {
    console.log("受け取った設定", settings);
    console.log("inputType 確認: ", settings.inputType);
    console.log("質問の長さ", questions.length);

    // questionsが文字列型ならパースする
    let currentQuestions = questions;
    if (typeof currentQuestions === "string") {
      try {
        currentQuestions = JSON.parse(currentQuestions);
      } catch (error) {
        console.error("questions のパースに失敗しました:", error);
        currentQuestions = { elements: [] };  // パース失敗時に空の配列を初期化
      }
    }

    // 最後の質問に設定を適用
    const updatedQuestions = {
      ...currentQuestions,
      elements: currentQuestions.elements.map((q, index) =>
        index === currentQuestions.elements.length - 1 // 最後の質問に設定を適用
          ? {
            ...q,
            title: settings.title || q.title,
            type: settings.type || q.type,
            inputType: settings.inputType || q.inputType,
            maxLength: settings.maxLength || q.maxLength,
            minLength: settings.minLength || q.minLength,
            placeholder: settings.placeholder || q.placeholder,
            autocomplete: settings.autocomplete || q.autocomplete,
            isRequired: settings.isRequired || q.isRequired,
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
      ),
    };

    console.log("更新した質問", updatedQuestions);
    // 更新したquestionsをJSON形式に変換してセット
    setQuestions(updatedQuestions);
    setQuestionData(null);
    setModalOpen(false); // モーダルを閉じる
  };



  console.table(questions);
  const survey = new Model(questions);
  survey.locale = "jp";  // 日本語に設定
  const themeObject = themes[applyTheme];
  if (themeObject) {
    console.log('themeobjectがありました', themeObject);
    themeObject.cssVariables["--sjs-general-backcolor-dim"] = backGroundColor;  // 背景色設定
    themeObject.cssVariables["--sjs-primary-backcolor"] = barColor;            // バーの色設定
    themeObject.cssVariables["--sjs-font-surveytitle-color"] = titleColor;     // タイトルの色設定
    themeObject.cssVariables["--sjs-font-questiontitle-color"] = questionColor; // 質問タイトルの色設定
    survey.applyTheme(themeObject); // テーマを再適用
    console.log("テーマオブジェクトの中身", themeObject);
  } else {
    console.error(`テーマ '${applyTheme}' が見つかりません`);
  }



  survey.onAfterRenderQuestion.add(function (survey, options) {
    // ボタンの作成
    const deleteButton = document.createElement("button");
    const editButton = document.createElement("button");

    // ボタンのテキスト設定
    deleteButton.textContent = "削除";
    editButton.textContent = "編集";

    deleteButton.className = 'Delete_Button';
    editButton.className = 'Edit_Button';

    // 削除ボタンのクリックイベント
    deleteButton.onclick = function () {
      // 削除する質問の ID を取得
      const targetId = options.question.jsonObj.id;

      // `questions.elements` 配列から `targetId` に一致する要素を除外
      const updatedQuestions = questions.elements.filter(q => q.id !== targetId);

      // ID と name を振り直す
      const reassignedQuestions = updatedQuestions.map((q, index) => ({
        ...q,
        id: (index + 1).toString(), // 新しいID
        name: `Question${index + 1}`, // 新しいname
      }));

      console.log("降りなおした後のreassignedQuestions",reassignedQuestions);

      // ステートを更新して再描画
      setQuestions({
        ...questions, // 他のプロパティ (title, themeSettings) を保持
        elements: reassignedQuestions, // 更新された質問を elements に設定
      });
      
      // SurveyJS 内でも削除
      const page = options.question.page;
      console.log("page",page);
      console.log("options.question",options.question);
      page.removeQuestion(options.question);

      console.log("reassignedQuestions",reassignedQuestions); // 再割り当てされた質問を確認
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

  console.log("利用可能なテーマ:", Object.keys(themes));
  console.log("利用可能なテーマ:", themes);





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

  useEffect(()=>{
    console.log("質問が変更しました",questions);
  },[questions])




  // フォームの編集データを保存
  const CreateFormSave = async () => {
    console.log("フォーム内容", questions);
    console.log("締切日", deadlineDate);
    console.log("背景色", backGroundColor);
    console.log("テーマ", theme);
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
    console.log("編集中のデータ", questionData);

    // questionsが文字列ならパースしてオブジェクトにする
    let currentQuestions = questions;
    if (typeof currentQuestions === "string") {
      try {
        currentQuestions = JSON.parse(currentQuestions);
      } catch (error) {
        console.error("questions のパースに失敗しました:", error);
        currentQuestions = { elements: [] }; // パース失敗時に空の配列を初期化
      }
    }

    // 新規作成の場合のみ質問を削除
    if (editingStatus === "New") {
      const updatedQuestions = {
        ...currentQuestions,
        elements: currentQuestions.elements.filter(
          (q) => q.name !== questionData.name
        ),
      };

      // 更新した質問リストをステートに反映
      setQuestions(updatedQuestions);
    }

    // `questionData` をクリア
    setQuestionData(null);

    // モーダルを閉じる
    setModalOpen(false);
  };

  const ThemeColorSave = (selectedOption, alignment, backgroundColor, titleColor, questionColor, barColor) => {
    if (selectedOption && alignment) {
      console.log("更新後のテーマ", selectedOption.value);
      console.log("alignment", alignment);
      console.log("alignment小文字か", alignment.toLowerCase());
      console.log("backgroundColor", backgroundColor);
      console.log("titleColor", titleColor);
      console.log("questionColor", questionColor);
      console.log("barColor", barColor);

      // 結合されたテーマ名を生成
      const themeKey = `${selectedOption.theme}${alignment}`; // キャメルケースを維持
      console.log("生成されたテーマキー", themeKey);

      if (themes[themeKey]) {
        const themeObject = themes[themeKey]; // 現在のテーマを取得
        console.log("適用するテーマオブジェクト", themeObject);
        survey.applyTheme(themeObject); // テーマを再適用
        themeObject.cssVariables["--sjs-general-backcolor-dim"] = backGroundColor;  // 背景色設定
        themeObject.cssVariables["--sjs-primary-backcolor"] = barColor;            // バーの色設定
        themeObject.cssVariables["--sjs-font-surveytitle-color"] = titleColor;     // タイトルの色設定
        themeObject.cssVariables["--sjs-font-questiontitle-color"] = questionColor; // 質問タイトルの色設定
      } else {
        console.error(`テーマ '${themeKey}' が themes オブジェクトに存在しません`);
      }

      // ThemeNameとColorPaletteをsurveyJsonに設定
      questions.themeSettings.themeName = selectedOption.value;
      questions.themeSettings.colorPalette = alignment.toLowerCase();
      questions.themeSettings.backgroundColor = backgroundColor; //背景色
      questions.themeSettings.titleColor = titleColor; //ニュースタイトルのテキストカラー
      questions.themeSettings.questionTitleColor = questionColor; //質問見出しのテキストカラー
      questions.themeSettings.barColor = barColor; //ニュースタイトルと質問の間のバーのカラー
      questions.themeSettings.themeKey = themeKey;

      // 状態更新
      setBackGroundColor(backgroundColor);
      setTitleColor(titleColor);
      setBarColor(barColor);
      setQuestionColor(questionColor);

      setTheme(selectedOption.value);
      setApplyTheme(themeKey); // 見た目の更新用
      setAlignment(alignment); // ライト or ダークの更新
      setThemeColorModalOpen(false); // モーダルを閉じる
    }
  };

  const ThemeColorReset = () => {

    const theme = 'default';
    const alignment = 'Light';
    const alignment_lower = 'light';
    const titleColor = '#000000';
    const barColor = '#000000';
    const questionColor = '#000000';
    const backgroundColor = '#808080';
    const applyTheme = 'DefaultLight';

    questions.themeSettings.colorPalette = alignment_lower;
    questions.themeSettings.backgroundColor = backgroundColor; //背景色
    questions.themeSettings.titleColor = titleColor; //ニュースタイトルのテキストカラー
    questions.themeSettings.questionTitleColor = questionColor //質問見出しのテキストカラー
    questions.themeSettings.barColor = barColor //ニュースタイトルと質問の間のバーのカラー

    console.log("更新後のthemeSettings", questions.themeSettings);

    if (themes[applyTheme]) {
      const themeObject = themes[applyTheme]; // 現在のテーマを取得
      console.log("適用するテーマオブジェクト", themeObject);
      survey.applyTheme(themeObject); // テーマを再適用
      themeObject.cssVariables["--sjs-general-backcolor-dim"] = backGroundColor;  // 背景色設定
      themeObject.cssVariables["--sjs-primary-backcolor"] = barColor;            // バーの色設定
      themeObject.cssVariables["--sjs-font-surveytitle-color"] = titleColor;     // タイトルの色設定
      themeObject.cssVariables["--sjs-font-questiontitle-color"] = questionColor; // 質問タイトルの色設定
    } else {
      console.error(`テーマ '${applyTheme}' が themes オブジェクトに存在しません`);
    }

    console.log("テーマオブジェクトの中身", themeObject);

    // 状態更新
    setBackGroundColor(backgroundColor);
    setTitleColor(titleColor);
    setBarColor(barColor);
    setQuestionColor(questionColor);

    setTheme(theme);
    setApplyTheme(applyTheme); // 見た目の更新用
    setAlignment(alignment); // ライト or ダークの更新
    setThemeColorModalOpen(false); // モーダルを閉じる

  }


  useEffect(() => {
    if (applyTheme) {
      console.log("選択されたテーマ", applyTheme); // 選択されたテーマ名
      console.log("テーマの型", typeof applyTheme); // 型の確認

      // themesオブジェクトからテーマオブジェクトを取得
      const themeObject = themes[applyTheme];
      if (themeObject) {
        console.log('themeobjectがありました', themeObject);
        survey.applyTheme(themeObject); // テーマを再適用
      } else {
        console.error(`テーマ '${applyTheme}' が見つかりません`);
      }
    }
  }, [themeColorModalOpen]);

  const ThemeColorCancel = () => {
    setThemeColorModalOpen(false);
  }

  const WriteNewsHandleBack = async (event) => {
    event.preventDefault(); // デフォルトの挙動を防ぐ
    HandleBack();
  };

  const handleOpenThemeModal = () => {
    if (applyTheme) {
      console.log("applythemeがあります", applyTheme);
      const themeObject = themes[applyTheme]; // 現在のテーマを取得
      if (themeObject) {
        survey.applyTheme(themeObject); // テーマを再適用
      } else {
        console.error(`テーマ '${applyTheme}' が見つかりません`);
      }
    }
    setThemeColorModalOpen(true); // モーダルを開く
  };

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


  return (
    <>
      <Stack direction="row" spacing={2} >
        <FormSelectMenu
          SetDeadlineDate={setDeadlineDate}
          deadlineDate={deadlineDate}
          CreateFormSave={CreateFormSave}
          addQuestion={addQuestion}
          questions={questions}
          WriteNewsHandleBack={WriteNewsHandleBack}
        />

        <Modal
          isOpen={modalopen}
          onRequestClose={CreateFormCancel} // モーダルを閉じるコールバック
          shouldCloseOnOverlayClick={true} // オーバーレイクリックでモーダルを閉じる
          contentLabel="Example Modal"
          overlayClassName="modal-overlay" /* オーバーレイに適用 */
          className="modal-content" /* コンテンツに適用 */
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

        <Modal
          isOpen={themeColorModalOpen}
          onRequestClose={ThemeColorCancel} // モーダルを閉じるコールバック
          shouldCloseOnOverlayClick={true} // オーバーレイクリックでモーダルを閉じる
          contentLabel="Example Modal"
          overlayClassName="modal-overlay" /* オーバーレイに適用 */
          className="modal-content" /* コンテンツに適用 */
        >
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Theme_Color_Setting
              onSave={ThemeColorSave}
              onReset={ThemeColorReset}
              onClose={ThemeColorCancel}
              BackGroundColor={backGroundColor}
              TitleColor={titleColor}
              BarColor={barColor}
              QuestionColor={questionColor}
              setTheme={setTheme}
              theme={theme}
              light_dark={alignment}
              applytheme={applyTheme}
            />
          </Stack>
        </Modal>
      </Stack>

      <div className="FormDemo"> {/* フォーム部分 */}
        <div>
          <Tooltip title="編集する">
            <IconButton onClick={handleOpenThemeModal}>
              <ModeEditIcon />
            </IconButton>
          </Tooltip>
        </div>

        {!questions || questions.length === 0 ? (
          <ColorRing
            visible={true}
            height="100"
            width="100"
            ariaLabel="color-ring-loading"
            wrapperStyle={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
            wrapperClass="custom-color-ring-wrapper" // カスタムクラスを指定
            colors={["#41a4ff", "#FFFFFF", "#41a4ff", "#41a4ff", "#FFFFFF"]}
            style={{ flexDirection: "column" }}
          />
        ) : (
          <div className="ShowForm">
            <div className="SurveyModal">
              <Survey model={survey} />
            </div>
          </div>
        )}
      </div>

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
  title: PropTypes.string
};



export default CreateForm;