import { useEffect, useState, useRef } from "react";
import "./Editor.css";
import { useParams } from "react-router-dom";

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
import IndentTune from "editorjs-indent-tune"; //インデントを1個ずつ決められる
import NoticeTune from "editorjs-notice";
import Strikethrough from "@sotaproject/strikethrough"; //取り消し線
import ColorPlugin from "editorjs-text-color-plugin"; //テキストのカラーを変更できる(現在赤と黄色しか選べない)
import Tooltip from "editorjs-tooltip"; //ホバーすると操作方法や注釈を表示する
import ChangeCase from "editorjs-change-case"; //大文字と小文字を変更
import Hyperlink from "editorjs-hyperlink";
import Button from "editorjs-button";
import Code from "@rxpm/editor-js-code";
import ImageTool from "editorjs-image-with-link"; //トリミングはできないが、Cropper.jsを使用する
import SKMFlipBox from "skm-flipbox"; //画像のスライドができるカルーセル
import AudioPlayer from "editorjs-audio-player"; //音声を挿入できる
import ImageGallery from "@rodrigoodhin/editorjs-image-gallery";
import Carousel from "editorjs-carousel";

import IconButton from "@mui/material/IconButton";

//MUIアイコン
import ImageSearchIcon from "@mui/icons-material/ImageSearch";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
// import TableContainer from '@mui/material/TableContainer';
import { Helmet } from "react-helmet-async";

//データ保存
import axios from "axios";

//ルーティング
import { useNavigate } from "react-router-dom";

//過去に投稿したニュースを取得
// import specialCompanyNewsItem from "src/_mock/specialCompanyNewsItem";

//時間
import moment from "moment-timezone";

//クリエイトフォーム
import CreateForm from "./CreateForm";
import NewsSelectMenu from "./NewsSelectMenu";

const Editor = () => {
  const editorInstance = useRef(null);
  const fileInputRef = useRef(null); // ファイル入力の参照を定義
  const editorHolder = useRef(null);
  const [imageUrl, setImageUrl] = useState(null); // 画像のURLを保持するステート
  const [displayInput, setDisplayInput] = useState(true); // input要素の表示状態を管理するステート
  const [title, setTitle] = useState(null);
  const [csrfToken, setCsrfToken] = useState("");
  const [sessionId, setSessionId] = useState(null);
  const [news_id, setNewsId] = useState(0); // ニュースの情報が格納されているDBのidを格納する
  const [draft_list, setDraftList] = useState([]); // ニュースの下書きリストを保持するステート
  const [selected_draft, setSelectedDraft] = useState(null); // 選択された下書きを保持するステート
  const [charCount, setCharCount] = useState(0);
  const [usedImages, setUsedImages] = useState([]);
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [eventDay, setEventDay] = useState(moment.utc());
  const [isSaved, setIsSaved] = useState(false);
  const [CreateFormOpen, setCreateFormOpen] = useState(false);
  const [formSummary, setFormSummary] = useState(null);
  const [followerCounter, setFollowerCounter] = useState(0);
  const [selectedOccupation, setSelectedOccupation] = useState([]);
  const [newsTitle, setNewsTitle] = useState("ブログ");

  const news_save_url = "http://localhost:8000/news_save";
  const thumbnail_image_save_url = "http://127.0.0.1:8000/thumbnail_image_save";

  const csrf_url = "http://localhost:8000/csrf-token";

  const isContentReady = !!(
    title &&
    imageUrl &&
    charCount &&
    !moment(eventDay).isSame(moment(), 'day') &&
    selectedOccupation.length > 0
  );

  const isFollowerValid = (followerCounter > 0 && notificationMessage) || followerCounter === 0 || followerCounter === undefined;

  const navigate = useNavigate();
  const { genre } = useParams();
  console.log(genre);

  //ニュースを投稿した際の処理
  const news_upload = async () => {
    const news_upload_confirm = confirm("本当にニュースを公開しますか?");
    if (!news_upload_confirm) {
      return; // ユーザーがキャンセルした場合は処理を終了
    }

    alert("ニュースを投稿しました");

    try {
      if (!editorInstance.current || typeof editorInstance.current.save !== "function") {
        console.error("Editor instance or save function not available");
        return;
      }

      // ニュース内容を保存
      const outputData = await editorInstance.current.save();

      // デバッグ用ログ
      console.log("sessionId:", sessionId);
      console.log("news_id:", news_id);
      console.log("title:", title);
      console.log("header_img:", imageUrl);
      console.log("outputData:", outputData);
      console.log("notificationMessage:", notificationMessage);
      console.log("followerCounter:", followerCounter);

      // WebSocketサーバーに送信
      const response = await axios.post("http://localhost:8000/news_upload", {
        company_id: sessionId, // 企業ID
        news_id: news_id, // ニュースID
        title: title, // ニュースタイトル
        header_img: imageUrl, // ニュースサムネイル画像
        value: outputData, // ニュースの内容
        message: notificationMessage, // 採用担当者からの一言メッセージ
        genre: genre, // ジャンル
        followerCounter: followerCounter, // 通知が必要かどうかの判断材料
      }, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      // レスポンスの確認
      console.log("成功:", response.data);
      navigate(`/NewsDetail/${news_id}`); // 投稿後、ニュース詳細ページへ移動

    } catch (error) {
      console.error("エラー:", error);
      alert("ニュース投稿中にエラーが発生しました。");
    }
  };


  const titlechange = (event) => {
    setTitle(event.target.value); // テキストエリアの値をstateに反映
  };

  // 下書きを新規保存・更新する処理
  const news_save = async () => {
    console.log("通りました");

    try {
      console.log(title);

      if (!editorInstance.current || typeof editorInstance.current.save !== "function") {
        console.error("Editor instance or save function not available");
        return;
      }

      const labels = selectedOccupation.map((item) => item.label);
      const OpenJobs = labels.join(", ");

      console.log("保存するときのニュース内容", formSummary);
      console.log("タイトル", title);
      console.log("ニュースID", news_id);
      console.log("通知メッセージ", notificationMessage);
      console.log("応募職種", OpenJobs);
      console.log("開催日", eventDay);
      console.log("企業ID", sessionId);
      console.log("ジャンル", genre);

      const response = await axios.post(
        news_save_url,
        {
          value: formSummary, // ニュース記事
          title: title, // タイトル
          news_id: news_id, // ID
          message: notificationMessage, //通知に添えるメッセージ
          selectedOccupation: OpenJobs,
          eventDay: eventDay, //開催日
          company_id: sessionId, // 企業ID
          genre: genre, //ジャンル
        },
        {
          headers: {
            "X-CSRF-TOKEN": csrfToken,
          },
        }
      );

      setDraftList(response.data.news_draft_list); // 下書きリスト最新に更新
      console.log("レスポンスのドラフトリスト", response.data.news_draft_list);
      console.log("news_idの中身",response.data.id);
      setNewsId(response.data.id); // news_idを更新する
      setIsSaved(true); // 保存済みとして状態を設定
      setFormSummary(formSummary);
      console.log("成功");
      console.log(response);
      alert("下書きを保存しました!");
      return response.data; // 保存されたnews_idを返す
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    const contents_image_save_url = "http://localhost:8000/contents_image_save";
    try {
      const response = await axios.post(contents_image_save_url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        return { success: 1, file: { url: response.data.url } };
      } else {
        return { success: 0, message: "Failed to upload image" };
      }
    } catch (error) {
      console.error(error);
      return { success: 0, message: "Failed to upload image", error };
    }
  };

  const handleImageDelete = async () => {
    console.log("削除しました!");
  };

  const handleFileSelect = async (event) => {
    const file = event.target.files[0];
    if (file && csrfToken) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("news_id", news_id);
      formData.append("session_id", sessionId);
      formData.append("genre", genre);

      console.log("file", file);
      console.log("news_id", news_id);
      console.log("session_id", sessionId);

      try {
        const response = await axios.post(thumbnail_image_save_url, formData, {
          headers: {
            "X-CSRF-TOKEN": csrfToken,
            "Content-Type": "multipart/form-data",
          },
        });
        console.log(response.data);
        const path = response.data.image;
        const id = response.data.id;
        const news_draft_list = response.data.news_draft_list;
        console.log(path);
        console.log(id);
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

  const rewrite_news = async (id) => {
    // ドラフトリストから選択したIDのアイテムを取得
    const select_draft_list = draft_list.find((d) => d.id === id);
    console.log("Selected draft:", select_draft_list);
    if (!select_draft_list) {
      console.error("Draft not found for ID:", id);
      console.log("Selected draft:", selected_draft); // デバッグ用
      return;
    }

    // 取得したアイテムを状態にセット
    setSelectedDraft(select_draft_list);
    // タイトルや画像URLを状態にセット
    setTitle(select_draft_list.article_title); // タイトル上書き
    if (!select_draft_list.header_img || select_draft_list.header_img.trim() === "") {
      // header_img が null、undefined、または空文字列の場合
      setImageUrl("");
      setDisplayInput(true);
      console.log("画像NULL");
      console.log("画像パス", select_draft_list.header_img);
    } else {
      // header_img が空でない場合
      setImageUrl(select_draft_list.header_img); // ヘッダー画像上書き
      setDisplayInput(false);
      console.log("画像NULLじゃない");
      console.log("画像パス", select_draft_list.header_img);
    }

    // エディタの内容を更新
    if (editorInstance.current && typeof editorInstance.current.render === "function") {
      try {
        console.log("カレント", editorInstance.current);
        // select_draft_list.summaryがエディタが理解できる形式であることを確認
        const content = select_draft_list.summary ? JSON.parse(select_draft_list.summary) : {};
        editorInstance.current.render(content); // エディタにデータをセット
        setFormSummary(content);
        console.log("コンテンツ", content);
        await editorInstance.current.save();
        await countChars(); //countChars関数を用いて、最初から記事の内容を書いている場合、その文字数を反映させる
      } catch (error) {
        console.error("Error parsing or rendering content:", error);
      }
    } else {
      console.log("Editor instance or render function not available");
    }
    // news_idをセット
    setNewsId(select_draft_list.id);
    moment.locale("ja"); // 日本語ロケール設定
    setEventDay(moment.utc(select_draft_list.event_day).format("YYYY/MM/DD HH:mm"));

    // まず変換関数を定義
    const transformOpenJobs = (openJobsString) => {
      return openJobsString.split(",").map((job) => ({
        value: job,
        label: job,
      }));
    };

    // 変換関数を使用して、stateにセットする
    const OpenJobs = select_draft_list.open_jobs;
    setSelectedOccupation(transformOpenJobs(OpenJobs));
    console.log("応募職種配列", transformOpenJobs(OpenJobs));
  };

  const rewrite_news_delete = async (id) => {
    if (confirm("本当に削除しますか") && id) {
      console.log("delete_id", id);
      console.log("company_id", sessionId);
      try {
        const response = await axios.post(`http://localhost:8000/rewrite_news_delete`, {
          delete_id: id,
          company_id: sessionId,
          genre: genre,
        });
        console.log(response.data);
        setDraftList(response.data.news_draft_list); // 下書きリスト最新に更新
        alert("削除しました");
      } catch (error) {
        console.error("Error sending data!", error);
      }
    }
  };

  //テキストの文字数(テーブルやリスト・コードなど)使用したプラグインの名前を格納
  const countChars = async () => {
    console.log("countChars関数のニュース内容", editorInstance.current);
    if (editorInstance.current) {
      const outputData = await editorInstance.current.save();
      let text = "";
      let image = "";
      console.log("外部データ", outputData);
      console.log("ブロック", outputData.blocks);
      let usedImages = new Set(); // 使用した画像を格納

      outputData.blocks.forEach((block) => {
        if (["paragraph", "header", "list", "quote", "title", "toggle"].includes(block.type)) {
          text += block.data.text || "";
        }

        switch (block.type) {
          case "alert":
            text += block.data.message || "";
            break;
          case "raw":
            text += block.data.html || "";
            break;
          case "code":
            text += block.data.code || "";
            break;
          case "table":
            // テーブルブロックの各セルの文字をカウント
            block.data.content.forEach((row) => {
              row.forEach((cell) => {
                text += cell || "";
              });
            });
            break;
          case "nestedchecklist":
            block.data.items.forEach((item) => {
              text += item.content || "";
            });
            break;
          case "checklist":
            block.data.items.forEach((item) => {
              text += item.text || "";
            });
            break;
          //画像
          case "image":
            image = block.data.file.url;
            console.log("画像URL", image);
            usedImages.add(image);
            break;
        }
      });

      const plainText = text
        .replace(/&nbsp;/g, " ") //空白を取り除く
        .replace(/<\/?s[^>]*>/g, "") // <s>タグを取り除く
        .replace(/<\/?mark[^>]*>/g, "") // <mark>タグを取り除く
        .replace(/<\/?font[^>]*>/g, "") // <font>タグを取り除く
        .replace(/<\/?u[^>]*>/g, "") // <u>タグを取り除く
        .replace(/<\/?code[^>]*>/g, "") // <u>タグを取り除く
        .replace(/<\/?a[^>]*>/g, "") // <a>タグを取り除く
        .replace(/\s+/g, "") // すべてのスペースや空白を取り除く
        .replace(/&lt;.*?&gt;/g, ""); // エスケープされたHTMLタグを取り除く

      console.log("文字数", plainText.length);
      console.log("文字", text);
      console.log("リプレイス後の文字", plainText);
      setCharCount(plainText.length); // 文字数を設定
      // 使用された画像を配列に変換
      const usedImagesArray = Array.from(usedImages);
      console.log("使用された画像", usedImagesArray);
      setUsedImages(usedImagesArray);
      setFormSummary(outputData);
    }
  };

  // const postsFrominternshipJobOffer = specialCompanyNewsItem();
  // console.log("postsFromCompany", postsFrominternshipJobOffer);

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
  }, []); // 空の依存配列を渡して初回のみ実行

  useEffect(() => {
    async function newsDraftList() {
      if (sessionId) {
        const news_draft_list_url = `http://localhost:8000/news_draft_list/${sessionId}/${genre}`;
        console.log("news_draft_list_url", news_draft_list_url);
        try {
          const response = await axios.get(news_draft_list_url);
          console.log("ドラフトリスト:", response.data); // 配列そのものが返ってくる
          setDraftList(response.data); // 直接配列をセット
          const Follower_Counter = response.data[0]?.follower_counter;
          console.log("フォロワーカウンター", Follower_Counter);
          setFollowerCounter(Follower_Counter);
        } catch (error) {
          console.error("Error fetching news draft list:", error);
        }
      }
    }

    newsDraftList();
  }, [sessionId,CreateFormOpen]); 

  useEffect(() => {
    if (editorHolder.current && !editorInstance.current) {
      console.log("editorHolder.current入りました");
      editorInstance.current = new EditorJS({
        holder: editorHolder.current,
        onChange: countChars,
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
                facebook: true, //このfacebook投稿は利用できません。削除されたか、プライバシー設定が変更された可能性があります。と表示され埋め込みできない
                instagram: true, //埋め込み可能
                youtube: true, //埋め込み可能
                twitter: true, //埋め込み可能
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
                  embedUrl: "/api/embed/?url=<%= remote_id %>",
                  html: "<iframe height='150' scrolling='no' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'></iframe>",
                  height: 150,
                  width: 600,
                  id: (groups) => groups.join(""),
                },
                ogp: {
                  regex: /(https?:\/\/[\w!?/+\-_~;.,*&@#$%()'[\]]+)/,
                  embedUrl: "/api/embed/?url=<%= remote_id %>",
                  html: "<iframe height='150' scrolling='no' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'></iframe>",
                  height: 150,
                  width: 600,
                  id: (groups) => groups.join(""),
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
                "#FFF",
              ],
              defaultColor: "#FF1300",
              type: "text",
              customPicker: true,
            },
          },
          Marker: {
            class: ColorPlugin,
            config: {
              defaultColor: "#FFBF00",
              type: "marker",
              icon: `<svg fill="#000000" height="200px" width="200px" version="1.1" id="Icons" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M17.6,6L6.9,16.7c-0.2,0.2-0.3,0.4-0.3,0.6L6,23.9c0,0.3,0.1,0.6,0.3,0.8C6.5,24.9,6.7,25,7,25c0,0,0.1,0,0.1,0l6.6-0.6 c0.2,0,0.5-0.1,0.6-0.3L25,13.4L17.6,6z"></path> <path d="M26.4,12l1.4-1.4c1.2-1.2,1.1-3.1-0.1-4.3l-3-3c-0.6-0.6-1.3-0.9-2.2-0.9c-0.8,0-1.6,0.3-2.2,0.9L19,4.6L26.4,12z"></path> </g> <g> <path d="M28,29H4c-0.6,0-1-0.4-1-1s0.4-1,1-1h24c0.6,0,1,0.4,1,1S28.6,29,28,29z"></path> </g> </g></svg>`,
            },
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
                js: "JavaScript", // JavaScript
                py: "Python", // Python
                java: "Java", // Java
                cpp: "C++", // C++
                cs: "C#", // C#
                php: "PHP", // PHP
                rb: "Ruby", // Ruby
                go: "Go", // Go
                ts: "TypeScript", // TypeScript
                swift: "Swift", // Swift
                kt: "Kotlin", // Kotlin
                rs: "Rust", // Rust
                md: "Markdown", // Markdown
                html: "HTML", // HTML
                css: "CSS", // CSS
                sql: "SQL", // SQL
                sh: "Shell", // Shell
                r: "R", // R
                scala: "Scala", // Scala
                perl: "Perl", // Perl
                dart: "Dart", // Dart
              },
              defaultMode: "js",
            },
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
                uploadByURL: handleImageUpload,
                deleteByFile: handleImageDelete,
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
                "Edit Images": "画像URLを表示・非表示",
                "Activate/Deactivate dark mode": "ダークモードを有効化/無効化",
                "Default layout": "デフォルトのレイアウト",
                "Set horizontal layout": "水平レイアウト",
                "Set square layout": "正方形レイアウト",
                "Set layout with gap": "隙間のあるレイアウト",
                "Set layout with fixed size": "固定サイズのレイアウト",
              },
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
              alertTypes: ["primary", "secondary", "info", "success", "warning", "danger", "light", "dark"],
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
              tuneName: "indentTune",
            },
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
              placeholder: "この機能で、\n折りたたみメニュー(アコーディオンメニュー)を作成できます",
            },
          },
          tooltip: {
            class: Tooltip,
            inlineToolbar: true,
            config: {
              location: "left",
              underline: true,
              placeholder: "注釈を書いてください",
              highlightColor: "#FFEFD5",
              backgroundColor: "#154360",
              textColor: "#FDFEFE",
              holder: "editor",
            },
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
              locale: "ja",
            },
          },
          hyperlink: {
            class: Hyperlink,
            config: {
              shortcut: "CMD+L",
              target: "_blank",
              rel: "nofollow",
              availableTargets: ["_blank", "_self"],
              availableRels: ["author", "noreferrer"],
              validate: false,
            },
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
              },
            },
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
                  Delete: "削除",
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
                "Notice caption": "強調表示をする",
              },
              hyperlink: {
                Save: "Salvar",
                "Select target": "Seleziona destinazione",
                "Select rel": "Wählen rel",
              },
              button: {
                "Button Text": "ボタンに表示するテキスト",
                "Link Url": "ボタンのジャンプ先のURL",
                Set: "設定する",
                "Default Button": "デフォルト",
              },
              textVariant: {
                "Call-out": "コールアウト",
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
              Hyperlink: "ハイパーリンク",
            },
          },
        },
      });
    }
    // エディタのクリーンアップ
    return () => {
      if (editorInstance.current) {
        editorInstance.current.destroy();
        editorInstance.current = null;
      }
    };
  }, []);

  // 画像を削除する処理
  const thumbnail_img_delete = async () => {
    if (fileInputRef.current) {
      console.log("fileInputRef.current", fileInputRef.current);
      console.log("value", fileInputRef.current.value);
      fileInputRef.current.value = null; // ファイル入力の値をリセット
      const header_img_delete_url = `http://localhost:8000/thumbnail_img_delete/${news_id}`;
      console.log("ニュースID", news_id);
      console.log(header_img_delete_url);
      console.log("セッションID", sessionId);
      console.log("ジャンル", genre);
      try {
        const response = await axios.get(header_img_delete_url, {
          params: {
            Company_Id: sessionId,
            genre: genre,
          },
        });
        if (response.data.success) {
          setImageUrl(null); // 画像URLをリセット
          setDisplayInput(true); // ファイルアップロードアイコン表示

          // ドラフトリストを更新する
          setDraftList((prevDraftList) => prevDraftList.map((draft) => (draft.id === news_id ? { ...draft, header_img: null } : draft)));
        }
      } catch (error) {
        console.error("画像削除中にエラーが発生しました:", error);
      }
    }
  };

  useEffect(() => {
    let NewsTitle;

    if (genre === "Blog") {
      NewsTitle = "ブログ";
    } else if (genre === "Internship") {
      NewsTitle = "インターンシップ";
    } else if (genre === "JobOffer") {
      NewsTitle = "求人";
    } else if (genre === "Session") {
      NewsTitle = "説明会";
    }

    setNewsTitle(NewsTitle);
  }, [genre]);

  const CreateFormJump = async () => {
    setCreateFormOpen(true);
    if (!isSaved) {
      // const savedNewsData = await news_save(); // 保存されていなければ保存してから取得
      // console.log("セーブ後のデータ",savedNewsData);
      console.log("issaved");
    } else {
      console.log("notissaved");
    }
  };

  const handleBack = async () => {
    console.log("フォームサマリ", formSummary); // 確認用ログ
    setCreateFormOpen(false); // フォームのモーダルを閉じる

    if (editorInstance.current) {
      try {
        const content = formSummary || JSON.parse(selected_draft.summary); // formSummaryがなければselect_draft_listを使用
        console.log("handleBack内のコンテンツ:", content);

        // エディタをリセットしてから再描画
        await editorInstance.current.destroy(); // エディタを破棄
        editorInstance.current = new EditorJS({
          holder: editorHolder.current,
          onChange: countChars,
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
                  facebook: true, //このfacebook投稿は利用できません。削除されたか、プライバシー設定が変更された可能性があります。と表示され埋め込みできない
                  instagram: true, //埋め込み可能
                  youtube: true, //埋め込み可能
                  twitter: true, //埋め込み可能
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
                    embedUrl: "/api/embed/?url=<%= remote_id %>",
                    html: "<iframe height='150' scrolling='no' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'></iframe>",
                    height: 150,
                    width: 600,
                    id: (groups) => groups.join(""),
                  },
                  ogp: {
                    regex: /(https?:\/\/[\w!?/+\-_~;.,*&@#$%()'[\]]+)/,
                    embedUrl: "/api/embed/?url=<%= remote_id %>",
                    html: "<iframe height='150' scrolling='no' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'></iframe>",
                    height: 150,
                    width: 600,
                    id: (groups) => groups.join(""),
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
                  "#FFF",
                ],
                defaultColor: "#FF1300",
                type: "text",
                customPicker: true,
              },
            },
            Marker: {
              class: ColorPlugin,
              config: {
                defaultColor: "#FFBF00",
                type: "marker",
                icon: `<svg fill="#000000" height="200px" width="200px" version="1.1" id="Icons" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M17.6,6L6.9,16.7c-0.2,0.2-0.3,0.4-0.3,0.6L6,23.9c0,0.3,0.1,0.6,0.3,0.8C6.5,24.9,6.7,25,7,25c0,0,0.1,0,0.1,0l6.6-0.6 c0.2,0,0.5-0.1,0.6-0.3L25,13.4L17.6,6z"></path> <path d="M26.4,12l1.4-1.4c1.2-1.2,1.1-3.1-0.1-4.3l-3-3c-0.6-0.6-1.3-0.9-2.2-0.9c-0.8,0-1.6,0.3-2.2,0.9L19,4.6L26.4,12z"></path> </g> <g> <path d="M28,29H4c-0.6,0-1-0.4-1-1s0.4-1,1-1h24c0.6,0,1,0.4,1,1S28.6,29,28,29z"></path> </g> </g></svg>`,
              },
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
                  js: "JavaScript", // JavaScript
                  py: "Python", // Python
                  java: "Java", // Java
                  cpp: "C++", // C++
                  cs: "C#", // C#
                  php: "PHP", // PHP
                  rb: "Ruby", // Ruby
                  go: "Go", // Go
                  ts: "TypeScript", // TypeScript
                  swift: "Swift", // Swift
                  kt: "Kotlin", // Kotlin
                  rs: "Rust", // Rust
                  md: "Markdown", // Markdown
                  html: "HTML", // HTML
                  css: "CSS", // CSS
                  sql: "SQL", // SQL
                  sh: "Shell", // Shell
                  r: "R", // R
                  scala: "Scala", // Scala
                  perl: "Perl", // Perl
                  dart: "Dart", // Dart
                },
                defaultMode: "js",
              },
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
                  uploadByURL: handleImageUpload,
                  deleteByFile: handleImageDelete,
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
                  "Edit Images": "画像URLを表示・非表示",
                  "Activate/Deactivate dark mode": "ダークモードを有効化/無効化",
                  "Default layout": "デフォルトのレイアウト",
                  "Set horizontal layout": "水平レイアウト",
                  "Set square layout": "正方形レイアウト",
                  "Set layout with gap": "隙間のあるレイアウト",
                  "Set layout with fixed size": "固定サイズのレイアウト",
                },
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
                alertTypes: ["primary", "secondary", "info", "success", "warning", "danger", "light", "dark"],
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
                tuneName: "indentTune",
              },
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
                placeholder: "この機能で、\n折りたたみメニュー(アコーディオンメニュー)を作成できます",
              },
            },
            tooltip: {
              class: Tooltip,
              inlineToolbar: true,
              config: {
                location: "left",
                underline: true,
                placeholder: "注釈を書いてください",
                highlightColor: "#FFEFD5",
                backgroundColor: "#154360",
                textColor: "#FDFEFE",
                holder: "editor",
              },
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
                locale: "ja",
              },
            },
            hyperlink: {
              class: Hyperlink,
              config: {
                shortcut: "CMD+L",
                target: "_blank",
                rel: "nofollow",
                availableTargets: ["_blank", "_self"],
                availableRels: ["author", "noreferrer"],
                validate: false,
              },
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
                },
              },
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
                    Delete: "削除",
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
                  "Notice caption": "強調表示をする",
                },
                hyperlink: {
                  Save: "Salvar",
                  "Select target": "Seleziona destinazione",
                  "Select rel": "Wählen rel",
                },
                button: {
                  "Button Text": "ボタンに表示するテキスト",
                  "Link Url": "ボタンのジャンプ先のURL",
                  Set: "設定する",
                  "Default Button": "デフォルト",
                },
                textVariant: {
                  "Call-out": "コールアウト",
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
                Hyperlink: "ハイパーリンク",
              },
            },
          },
        });

        // 新しいデータでエディタをレンダリング
        await editorInstance.current.isReady;
        await editorInstance.current.render(content); // 渡されたコンテンツをレンダリング

        setFormSummary(content);
        const savedData = await editorInstance.current.save();
        console.log("保存されたデータ:", savedData);
        // await countChars(); // countChars関数を用いて文字数を反映
      } catch (error) {
        console.error("handleBack内でのエラー:", error);
      }



    } else {
      console.error("editorInstanceが無効です");
    }
  };

  return (
    <div className="newsPosting">
      <Helmet>
        <title>ニュースの投稿 | Work&Connect</title>
      </Helmet>

      {/* ニュースタイトルを表示 */}
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h5" className="News_Title">
          {newsTitle ? `${newsTitle}ニュースの編集` : "ニュースの編集"}
        </Typography>
      </Stack>

      {/* CreateForm の表示 */}
      {CreateFormOpen && <CreateForm newsid={news_id} HandleBack={handleBack} title={title} />}

      {!CreateFormOpen && (
        <>
          <div>
            <NewsSelectMenu
              setEventDay={setEventDay}
              eventDay={eventDay}
              selected_draft={selected_draft}
              setSelectedOccupation={setSelectedOccupation}
              selectedOccupation={selectedOccupation}
              notificationMessage={notificationMessage}
              setNotificationMessage={setNotificationMessage}
              title={title}
              imageUrl={imageUrl}
              charCount={charCount}
              followerCounter={followerCounter}
              usedImages={usedImages}
              news_save={news_save}
              news_upload={news_upload}
              isContentReady={isContentReady}
              isFollowerValid={isFollowerValid}
              draftlist={draft_list}
              RewriteNewsDelete={rewrite_news_delete}
              RewriteNewsEnter={rewrite_news}
              CreateFormJump={CreateFormJump}
            />
          </div>

          {/* アップロードされた画像の表示 */}
          {imageUrl && (
            <div className="uploaded-image" id="uploaded-image">
              <div className="NewsThumnbnailElements">
                <img src={`${imageUrl}`} alt="Uploaded" />
                <HighlightOffIcon className="thumbnail_img_delete_icon" onClick={thumbnail_img_delete} />
              </div>
            </div>
          )}

          {/* 画像選択のフォーム */}
          <form>
            <input id="fileInput" type="file" accept="image/*" style={{ display: "none" }} ref={fileInputRef} onChange={handleFileSelect} />
          </form>

          <Stack spacing={2} className="SelectMenu">
            {/* カバー画像アップロード */}
            <div className="image_search_icon_main">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => document.getElementById("fileInput").click()}
                // sx={{ width: { xs: "95%", sm: "90%", md: "80%" } }}
                variant="outlined"
                className="image_search_icon_button_icon"
                style={{ display: displayInput ? "block" : "none" }}
              >
                <ImageSearchIcon className="cover_img_upload" style={{ display: displayInput ? "block" : "none" }} />
              </IconButton>
            </div>

            {/* 記事タイトルの入力エリア */}
            <textarea className="editor_title" id="editor_title" wrap="soft" placeholder="記事タイトル" value={title} onChange={titlechange} />
          </Stack>

          {/* エディターコンポーネント */}
          <div className="editor-wrapper">
            <div ref={editorHolder} id="editor" />
          </div>
        </>
      )}
    </div>
  );
};

export default Editor;
