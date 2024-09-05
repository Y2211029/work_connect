import { useEffect, useState, useRef } from "react";
import "./Editor.css";

// プラグインのインポート
import EditorJS from "@editorjs/editorjs";
import Title from "title-editorjs";
import Paragraph from "editorjs-paragraph-with-alignment";
import Embed from "@editorjs/embed";
import Table from "@editorjs/table";
import CheckList from "@editorjs/checklist";
import Delimiter from "@editorjs/delimiter";
import Raw from "@editorjs/raw";
import Header from "editorjs-header-with-anchor";
import Quote from "@editorjs/quote";
import InlineCode from "@editorjs/inline-code";
import TextVariantTune from "@editorjs/text-variant-tune";
import createGenericInlineTool, { UnderlineInlineTool } from "editorjs-inline-tool";
import Alert from "editorjs-alert";
import ToggleBlock from "editorjs-toggle-block"; //アコーディオンメニューができる
import EditorjsNestedChecklist from "@calumk/editorjs-nested-checklist";
import IndentTune from 'editorjs-indent-tune'; //インデントを1個ずつ決められる
import NoticeTune from 'editorjs-notice';
import Strikethrough from '@sotaproject/strikethrough'; //取り消し線
import ColorPlugin from 'editorjs-text-color-plugin'; //テキストのカラーを変更できる(現在赤と黄色しか選べない)
import Tooltip from 'editorjs-tooltip'; //ホバーすると操作方法や注釈を表示する
import ChangeCase from 'editorjs-change-case'; //大文字と小文字を変更
import Hyperlink from 'editorjs-hyperlink';
import Button from 'editorjs-button';
import Code from '@rxpm/editor-js-code';
import ImageTool from 'editorjs-image-with-link'; //トリミングはできないが、Cropper.jsを使用する
import SKMFlipBox from 'skm-flipbox'; //画像のスライドができるカルーセル
import AudioPlayer from 'editorjs-audio-player'; //音声を挿入できる
import ImageGallery from '@rodrigoodhin/editorjs-image-gallery';
import Carousel from 'editorjs-carousel';


//画像
import ImageSearchIcon from '@mui/icons-material/ImageSearch';
import CancelIcon from '@mui/icons-material/Cancel';

//データ保存
import axios from "axios";

//ルーティング
import { useNavigate } from 'react-router-dom';





const Editor = () => {

  const editorInstance = useRef(null);
  const fileInputRef = useRef(null); // ファイル入力の参照を定義
  const editorHolder = useRef(null);
  const [imageUrl, setImageUrl] = useState(null); // 画像のURLを保持するステート
  const [displayInput, setDisplayInput] = useState(true); // input要素の表示状態を管理するステート
  const [textValue, setTextValue] = useState('');
  const [csrfToken, setCsrfToken] = useState("");
  const [sessionId, setSessionId] = useState(null);
  const [show, setShow] = useState(false);
  const [news_id, setNewsId] = useState(0); // ニュースの情報が格納されているDBのidを格納する
  const [draft_list, setDraftList] = useState([]); // ニュースの下書きリストを保持するステート
  const [selected_draft, setSelectedDraft] = useState(null); // 選択された下書きを保持するステート
  const textareaRef = useRef(null);
  const [selectedGenre, setSelectedGenre] = useState('');

  const news_save_url = "http://127.0.0.1:8000/news_save";
  const thumbnail_image_save_url = "http://127.0.0.1:8000/thumbnail_image_save";
  const news_upload_url = "http://localhost:8000/news_upload";
  const csrf_url = "http://localhost:8000/csrf-token";
  const navigate = useNavigate();


  // ラジオボタンの選択を変更する
  const handleRadioChange = (event) => {
    console.log(event.target.value);
    setSelectedGenre(event.target.value);
  };

  //ニュースを投稿した際の処理
  const news_upload = async () => {
    alert("ニュースを投稿しました");

    try {
      if (!editorInstance.current || typeof editorInstance.current.save !== "function") {
        console.error("Editor instance or save function not available");
        return;
      }

      //採用担当者からの一言メッセージを変数に入れる
      const newsContent = textareaRef.current.value;

      const outputData = await editorInstance.current.save();

      console.log("sessionId",sessionId);
      console.log("news_id",news_id);
      console.log("textValue",textValue);
      console.log("header_img",imageUrl);
      console.log("outputData",outputData);
      console.log("newsContent",newsContent);
      console.log("selectedGenre",selectedGenre);

      const response = await axios.post(news_upload_url, {
        company_id: sessionId, // 企業ID
        news_id: news_id,     //ニュースid
        title: textValue,     //ニュースタイトル
        header_img: imageUrl, //ニュースサムネイル画像
        value: outputData,  //ニュースの内容
        message: newsContent, //採用担当者からの一言メッセージ
        genre: selectedGenre, //インターンor求人orブログ
      }, {
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': csrfToken,
        }
      });

      console.log(response.data.id);
      setNewsId(response.data.id);
      console.log("成功");
      navigate('/Internship_JobOffer');
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const titlechange = (event) => {
    setTextValue(event.target.value); // テキストエリアの値をstateに反映
  };




  // 下書きを新規保存・更新する処理
  const news_save = async () => {
    try {
      alert("下書きを保存しました!");
      console.log(textValue);

      if (!editorInstance.current || typeof editorInstance.current.save !== "function") {
        console.error("Editor instance or save function not available");
        return;
      }

      const outputData = await editorInstance.current.save();
      console.log("Article data: ", outputData);
      console.log(sessionId);

      const response = await axios.post(news_save_url, {
        value: outputData,    // ニュース記事
        title: textValue,     // タイトル
        news_id: news_id,     // ID
        company_id: sessionId // 企業ID
      }, {
        headers: {
          "X-CSRF-TOKEN": csrfToken,
        },
      });

      setDraftList(response.data.news_draft_list); // 下書きリスト最新に更新
      setNewsId(response.data.id); // news_idを更新する
      console.log("成功");
    } catch (error) {
      console.error("Error:", error);
    }
  };




  const news_release_setting = () => {
    setShow(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setShow(false);
    document.body.style.overflow = 'auto';
  };


  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    const contents_image_save_url = "http://localhost:8000/contents_image_save";
    try {
      const response = await axios.post(contents_image_save_url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        return { success: 1, file: { url: response.data.url } };
      } else {
        return { success: 0, message: 'Failed to upload image' };
      }
    } catch (error) {
      console.error(error);
      return { success: 0, message: 'Failed to upload image', error };
    }
  };


  const handleFileSelect = async (event) => {
    const file = event.target.files[0];
    if (file && csrfToken) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('news_id', news_id);
      formData.append('session_id', sessionId);

      console.log('file', file);
      console.log('news_id', news_id);
      console.log('session_id', sessionId);

      try {
        const response = await axios.post(thumbnail_image_save_url, formData, {
          headers: {
            "X-CSRF-TOKEN": csrfToken,
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log(response.data);
        const path = `./header_img/${response.data.image}`;
        const id = response.data.id;
        const news_draft_list = response.data.news_draft_list;
        console.log(path);
        console.log(id)
        setDraftList(news_draft_list); //下書きリスト最新に更新
        setNewsId(id);
        setImageUrl(path);
        setDisplayInput(false);
        console.log("成功");
      } catch (error) {
        console.error("データの取得中にエラーが発生しました", error);
      }
    }
  };

  const rewrite_news = (id) => {
    // ドラフトリストから選択したIDのアイテムを取得
    const select_draft_list = draft_list.find(d => d.id === id);
    console.log('Selected draft:', select_draft_list);
    if (!select_draft_list) {
      console.error("Draft not found for ID:", id);
      console.log('Selected draft:', selected_draft); // デバッグ用
      return;
    }

    // 取得したアイテムを状態にセット
    setSelectedDraft(select_draft_list);
    // タイトルや画像URLを状態にセット
    setTextValue(select_draft_list.article_title); // タイトル上書き
    if (!select_draft_list.header_img || select_draft_list.header_img.trim() === '') {
      // header_img が null、undefined、または空文字列の場合
      setDisplayInput(true);
      console.log("画像NULL");
    } else {
      // header_img が空でない場合
      setImageUrl(`./header_img/${select_draft_list.header_img}`); // ヘッダー画像上書き
      setDisplayInput(false);
      console.log("画像NULLじゃない");
    }

    // エディタの内容を更新
    if (editorInstance.current && typeof editorInstance.current.render === "function") {
      try {
        // select_draft_list.summaryがエディタが理解できる形式であることを確認
        const content = select_draft_list.summary ? JSON.parse(select_draft_list.summary) : {};
        editorInstance.current.render(content); // エディタにデータをセット
      } catch (error) {
        console.error("Error parsing or rendering content:", error);
      }
    } else {
      console.log("Editor instance or render function not available");
    }

    // news_idをセット
    setNewsId(select_draft_list.id);
  };

  useEffect(() => {


    async function getSessionId() {
      try {
        // Get data from sessionStorage
        const dataString = sessionStorage.getItem("accountData");
        if (dataString) {
          const dataObject = JSON.parse(dataString);
          if (dataObject) {
            setSessionId(dataObject.id);
          }
        }
      } catch (error) {
        console.error("Error fetching CSRF token:", error);
      }
    }
    getSessionId(); // ページがロードされた時点でsessionstorageからidを取得

    async function fetchCsrfToken() {
      try {
        const response = await axios.get(csrf_url); // CSRFトークンを取得するAPIエンドポイント
        console.log(response.data.csrf_token); // ログ
        console.log("fetching CSRF token:OK"); // ログ
        const csrfToken = response.data.csrf_token;
        setCsrfToken(csrfToken); // 状態を更新
      } catch (error) {
        console.error("Error fetching CSRF token:", error);
      }
    }
    fetchCsrfToken(); // ページがロードされた時点でCSRFトークンを取得



    if (editorHolder.current) {
      editorInstance.current = new EditorJS({
        holder: editorHolder.current,
        placeholder: "コンテンツを入力してください",
        tools: {
          paragraph: {
            class: Paragraph,
            inlineToolbar: true,
            tunes: ["textVariant", "indentTune", "noticeTune"],
          },
          embed: {
            class: Embed,
            config: {
              services: {
                facebook: true,  //このfacebook投稿は利用できません。削除されたか、プライバシー設定が変更された可能性があります。と表示され埋め込みできない
                instagram: true, //埋め込み可能
                youtube: true,  //埋め込み可能
                twitter: true,  //埋め込み可能
                twitch: true,
                miro: true,
                vimeo: true,
                gfycat: true,
                imgur: true,
                vine: true,
                aparat: true,
                codepen: true,
                pinterest: true,
                github: true,
                coub: true,
                note: {
                  regex: /https?:\/\/note\.com\/[^/]+\/n\/([^/?]+)/,
                  embedUrl: '/api/embed/?url=<%= remote_id %>',
                  html: "<iframe height='150' scrolling='no' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'></iframe>",
                  height: 150,
                  width: 600,
                  id: (groups) => groups.join(''),
                },
                ogp: {
                  regex: /(https?:\/\/[\w!?/+\-_~;.,*&@#$%()'[\]]+)/,
                  embedUrl: '/api/embed/?url=<%= remote_id %>',
                  html: "<iframe height='150' scrolling='no' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'></iframe>",
                  height: 150,
                  width: 600,
                  id: (groups) => groups.join(''),
                },
              },
            },
          },
          Color: {
            class: ColorPlugin,
            config: {
              colorCollections: [
                "#FF1300",
                "#EC7878",
                "#9C27B0",
                "#673AB7",
                "#3F51B5",
                "#0070FF",
                "#03A9F4",
                "#00BCD4",
                "#4CAF50",
                "#8BC34A",
                "#CDDC39",
                "#FFF"
              ],
              defaultColor: "#FF1300",
              type: "text",
              customPicker: true,
            }
          },
          Marker: {
            class: ColorPlugin,
            config: {
              defaultColor: '#FFBF00',
              type: 'marker',
              icon: `<svg fill="#000000" height="200px" width="200px" version="1.1" id="Icons" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M17.6,6L6.9,16.7c-0.2,0.2-0.3,0.4-0.3,0.6L6,23.9c0,0.3,0.1,0.6,0.3,0.8C6.5,24.9,6.7,25,7,25c0,0,0.1,0,0.1,0l6.6-0.6 c0.2,0,0.5-0.1,0.6-0.3L25,13.4L17.6,6z"></path> <path d="M26.4,12l1.4-1.4c1.2-1.2,1.1-3.1-0.1-4.3l-3-3c-0.6-0.6-1.3-0.9-2.2-0.9c-0.8,0-1.6,0.3-2.2,0.9L19,4.6L26.4,12z"></path> </g> <g> <path d="M28,29H4c-0.6,0-1-0.4-1-1s0.4-1,1-1h24c0.6,0,1,0.4,1,1S28.6,29,28,29z"></path> </g> </g></svg>`
            }
          },
          table: {
            class: Table,
            inlineToolbar: true,
          },
          code: {
            class: Code,
            inlineToolbar: true,
            config: {
              modes: {
                'js': 'JavaScript',     // JavaScript
                'py': 'Python',         // Python
                'java': 'Java',         // Java
                'cpp': 'C++',           // C++
                'cs': 'C#',             // C#
                'php': 'PHP',           // PHP
                'rb': 'Ruby',           // Ruby
                'go': 'Go',             // Go
                'ts': 'TypeScript',     // TypeScript
                'swift': 'Swift',       // Swift
                'kt': 'Kotlin',         // Kotlin
                'rs': 'Rust',           // Rust
                'md': 'Markdown',       // Markdown
                'html': 'HTML',         // HTML
                'css': 'CSS',           // CSS
                'sql': 'SQL',           // SQL
                'sh': 'Shell',          // Shell
                'r': 'R',               // R
                'scala': 'Scala',       // Scala
                'perl': 'Perl',         // Perl
                'dart': 'Dart',         // Dart
              },
              defaultMode: 'js'
            }
          },
          carousel: {
            class: Carousel,
            inlineToolbar: true,
            config: {
              uploader: {
                uploadByFile: handleImageUpload,
              },
            },
          },
          image: {
            class: ImageTool,
            config: {
              uploader: {
                uploadByFile: handleImageUpload,
              },
            },
          },
          slide: {
            class: SKMFlipBox,
            inlineToolbar: true,
          },
          audioPlayer: {
            class: AudioPlayer,
            inlineToolbar: true,
          },
          imageGallery: {
            class: ImageGallery,
            inlineToolbar: true,
            config: {
              placeholder: "画像アドレスをコピーして貼付してください(最後はjpg)",
              actions: {
                "Edit Images": '画像URLを表示・非表示',
                "Activate/Deactivate dark mode": 'ダークモードを有効化/無効化',
                "Default layout": 'デフォルトのレイアウト',
                "Set horizontal layout": '水平レイアウト',
                "Set square layout": '正方形レイアウト',
                "Set layout with gap": '隙間のあるレイアウト',
                "Set layout with fixed size": '固定サイズのレイアウト',
              }
            },
          },
          raw: {
            class: Raw,
            inlineToolbar: true,
            config: {
              placeholder: "HTMLのコードを書いてください",
            },
          },
          header: {
            class: Header,
            config: {
              placeholder: "Enter a header",
              levels: [1, 2, 3, 4, 5, 6],
              defaultLevel: 3,
              allowAnchor: true,
              anchorLength: 100,
            },
          },
          title: {
            class: Title,
            inlineToolbar: true,
          },
          alert: {
            class: Alert,
            inlineToolbar: true,
            config: {
              alertTypes: [
                "primary",
                "secondary",
                "info",
                "success",
                "warning",
                "danger",
                "light",
                "dark",
              ],
              defaultType: "primary",
              messagePlaceholder: "Enter something",
            },
          },
          quote: Quote,
          checklist: CheckList,
          delimiter: Delimiter,
          inlineCode: InlineCode,
          textVariant: TextVariantTune,
          noticeTune: NoticeTune,
          indentTune: {
            class: IndentTune,
            config: {
              customBlockIndentLimits: {
                someOtherBlock: { max: 5 },
              },
              maxIndent: 10,
              indentSize: 30,
              multiblock: true,
              tuneName: 'indentTune',
            }
          },
          bold: {
            class: createGenericInlineTool({
              sanitize: {
                strong: {},
              },
              shortcut: "CMD+B",
              tagName: "STRONG",
              toolboxIcon: '<span style="font-weight: bold;">B</span>',
            }),
          },
          italic: {
            class: createGenericInlineTool({
              sanitize: {
                italic: {},
              },
              shortcut: "CMD+L",
              tagName: "I",
              toolboxIcon: '<span style="font-weight: bold;">L</span>',
            }),
          },
          underline: UnderlineInlineTool,
          toggle: {
            class: ToggleBlock,
            inlineToolbar: true,
            config: {
              placeholder:
                "この機能で、\n折りたたみメニュー(アコーディオンメニュー)を作成できます",
            },
          },
          tooltip: {
            class: Tooltip,
            inlineToolbar: true,
            config: {
              location: 'left',
              underline: true,
              placeholder: '注釈を書いてください',
              highlightColor: '#FFEFD5',
              backgroundColor: '#154360',
              textColor: '#FDFEFE',
              holder: 'editor',
            }
          },
          strikethrough: {
            class: Strikethrough,
            inlineToolbar: true,
          },
          changeCase: {
            class: ChangeCase,
            inlineToolbar: true,
            config: {
              showLocaleOption: true,
              locale: 'ja'
            }
          },
          hyperlink: {
            class: Hyperlink,
            config: {
              shortcut: 'CMD+L',
              target: '_blank',
              rel: 'nofollow',
              availableTargets: ['_blank', '_self'],
              availableRels: ['author', 'noreferrer'],
              validate: false,
            }
          },
          button: {
            class: Button,
            inlineToolbar: true,
            config: {
              css: {
                btnColor: "btn--gray",
                btnBorder: "solid",
              },
              textValidation: (text) => {
                // ボタンテキストが空でないことを確認する
                if (text.trim() !== "") {
                  return true;
                } else {
                  console.log("error! Button text is empty.");
                  return false;
                }
              },
              linkValidation: (text) => {
                // リンクURLがhttp://またはhttps://で始まることを確認する
                if (text.startsWith("https://") || text.startsWith("http://")) {
                  return true;
                } else {
                  console.log("error! Invalid URL:", text);
                  return false;
                }
              }
            }
          },
          nestedchecklist: EditorjsNestedChecklist,
        },
        tunes: ["indentTune", "noticeTune"],
        autofocus: true,
        i18n: {
          messages: {
            ui: {
              blockTunes: {
                toggler: {
                  "Click to tune": "クリックして調整",
                  "or drag to move": "またはドラッグして移動",
                  "Move up": "上に移動する",
                  "Move down": "下に移動する",
                  "Delete": "削除",
                },
              },
              inlineToolbar: {
                converter: {
                  "Convert to": "変換",
                },
              },
              toolbar: {
                toolbox: {
                  Add: "追加",
                },
              },
            },
            tools: {
              noticeTune: {
                'Notice caption': '強調表示をする'
              },
              hyperlink: {
                Save: 'Salvar',
                'Select target': 'Seleziona destinazione',
                'Select rel': 'Wählen rel'
              },
              button: {
                'Button Text': 'ボタンに表示するテキスト',
                'Link Url': 'ボタンのジャンプ先のURL',
                'Set': "設定する",
                'Default Button': "デフォルト",
              },
              textVariant: {
                'Call-out': 'コールアウト',
              },
            },
            toolNames: {
              //メニュー
              Text: "テキスト",
              Table: "テーブル",
              Code: "コード",
              Carousel: "カルーセル",
              Image: "画像",
              FlipBox: "スライド(テキストのみ)",
              AudioPlayer: "オーディオ",
              "Image Gallery": "画像ギャラリー",
              "Raw HTML": "HTML",
              Heading: "見出し",
              Title: "タイトル",
              Alert: "警告",
              Quote: "引用",
              Checklist: "チェックリスト",
              Delimiter: "区切り",
              Toggle: "折りたたみメニュー",
              Button: "ボタン",
              "Nested Checklist": "リスト",
              Embed: "埋め込み",

              //サブメニュー
              Bold: "太字",
              Italic: "斜体",
              Link: "リンク",
              Color: "カラー",
              Marker: "マーカー",
              InlineCode: "インラインコード",
              Underline: "下線",
              Tooltip: "ツールチップ",
              Strikethrough: "取り消し線",
              ChangeCase: "大文字:小文字 変換",
              Hyperlink: 'ハイパーリンク',
            },
          },
        },
      });
    }

  }, []); // 空の依存配列を渡して初回のみ実行

  useEffect(() => {
    async function newsDraftList() {
      if (sessionId) {
        const news_draft_list_url = `http://localhost:8000/news_draft_list/${sessionId}`;
        console.log(news_draft_list_url);
        try {
          const response = await axios.get(news_draft_list_url);
          console.log("ドラフトリスト:", response.data); // 配列そのものが返ってくる
          setDraftList(response.data); // 直接配列をセット
        } catch (error) {
          console.error("Error fetching news draft list:", error);
        }
      }
    }

    newsDraftList();
  }, [sessionId]); // sessionIdが変更されたときに実行される


  // 画像を削除する処理
  const thumbnail_img_delete = async () => {
    if (fileInputRef.current) {
      console.log("fileInputRef.current",fileInputRef.current);
      console.log("value",fileInputRef.current.value);
      fileInputRef.current.value = null; // ファイル入力の値をリセット
      const header_img_delete_url = `http://localhost:8000/thumbnail_img_delete/${news_id}`;
      console.log(news_id);
      console.log(header_img_delete_url);
      console.log(sessionId);
      try {
        const response = await axios.get(header_img_delete_url, {
          params: {
            Company_Id: sessionId,
          },
        });
        if (response.data.success) {
          setImageUrl(null); // 画像URLをリセット
          setDisplayInput(true); // ファイルアップロードアイコン表示

          // ドラフトリストを更新する
          setDraftList(prevDraftList =>
            prevDraftList.map(draft =>
              draft.id === news_id ? { ...draft, header_img: null } : draft
            )
          );
        }
      } catch (error) {
        console.error("画像削除中にエラーが発生しました:", error);
      }
    }
  };

  return (
    <div className="editor">

      <p>Draft List: </p>
      {draft_list.length > 0 ? (
        draft_list.map(draft => (
          <p key={draft.id} onClick={() => rewrite_news(draft.id)}>
            {draft.article_title}
          </p>
        ))
      ) : (
        <p>下書き中の記事はありません</p>
      )}

      <div className="news_button">
        <button id="save" className="save" onClick={news_save}>下書きを保存する</button>
        <button id="news_release" className="news_release" onClick={news_release_setting}>公開へ進む</button>

        {/* 公開へ進むボタンを押すと出現するモーダル */}
        {show && (
          <div id="news_release_modal" className="news_release_modal">
            <div className="news_release_modal_content">
              <p><button onClick={closeModal}>キャンセル</button></p>
              <p>公開設定</p>

              <p>どのジャンルで公開しますか?</p>
              <input
                type="radio"
                name="news_genre"
                id="blog"
                value="ブログ"
                checked={selectedGenre === 'ブログ'}
                onChange={handleRadioChange }
              />
              <label className="label" htmlFor="blog">ブログ</label>

              <input
                type="radio"
                name="news_genre"
                id="internship"
                value="インターンシップ"
                checked={selectedGenre === 'インターンシップ'}
                onChange={handleRadioChange}
              />
              <label className="label" htmlFor="internship">インターンシップ</label>

              <input
                type="radio"
                name="news_genre"
                id="job"
                value="求人"
                checked={selectedGenre === '求人'}
                onChange={handleRadioChange }
              />
              <label className="label" htmlFor="job">求人</label>              <br></br><br></br><br></br>
              <p>学生さんへのメッセージや記事の内容を一言でご記入ください!</p>
              <textarea id="news_textarea"
                className="news_textarea"
                ref={textareaRef}
              >
              </textarea>
              {/* <p>{news_id}</p> */}
              <p><button onClick={news_upload}>投稿</button></p>
            </div>
          </div>
        )}
      </div>

      {/* アップロードされた画像の表示 */}
      {
        imageUrl && (
          <div className="uploaded-image" id="uploaded-image">
            <img src={`${imageUrl}`} alt="Uploaded" style={{ width: '100%', height: '300px' }} />
            <CancelIcon onClick={thumbnail_img_delete} />
          </div>
        )

      }

      {/* 画像を選ぶ */}
      <form>
        <input
          id="fileInput"
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          ref={fileInputRef}
          onChange={handleFileSelect}
        />

      </form>


      <ImageSearchIcon
        className="cover_img_upload"
        style={{ display: displayInput ? 'block' : 'none' }}
        onClick={() => document.getElementById('fileInput').click()}
      />

      <h1>ニュースの編集</h1>
      <textarea className="editor_title"
        id="editor_title"
        wrap="soft"
        placeholder="記事タイトル"
        value={textValue} // 状態の値をテキストエリアにセット
        onChange={titlechange} // テキストエリアの変更を監視し、stateを更新
      />

      <div className="editor-wrapper">
        <div ref={editorHolder} id="editor" className="editor" />
      </div>
    </div >
  );
};

export default Editor;
