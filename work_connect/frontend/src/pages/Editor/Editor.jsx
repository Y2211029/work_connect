import { useEffect, useState, useRef } from "react";
import "./Editor.css";

// プラグインのインポート
import EditorJS from "@editorjs/editorjs";
import Title from "title-editorjs";
import Paragraph from "editorjs-paragraph-with-alignment";
import Embed from "@editorjs/embed";
import Table from "@editorjs/table";
import Code from "@editorjs/code";
import CheckList from "@editorjs/checklist";
import Delimiter from "@editorjs/delimiter";
import Raw from "@editorjs/raw";
import Header from "editorjs-header-with-anchor";
import Quote from "@editorjs/quote";
import Marker from "@editorjs/marker";
import InlineCode from "@editorjs/inline-code";
import TextVariantTune from "@editorjs/text-variant-tune";
import Image from "@editorjs/image";
import LinkTool from "@editorjs/link";
import createGenericInlineTool, { UnderlineInlineTool } from "editorjs-inline-tool";
import Alert from "editorjs-alert";
import ToggleBlock from "editorjs-toggle-block";
import EditorjsNestedChecklist from "@calumk/editorjs-nested-checklist";
import { Instagram, Twitter } from "@mui/icons-material";

import ImageSearchIcon from '@mui/icons-material/ImageSearch';
import CancelIcon from '@mui/icons-material/Cancel';

const Editor = () => {
  const editorInstance = useRef(null);
  const editorHolder = useRef(null);
  const [imageUrl, setImageUrl] = useState(null); // 画像のURLを保持するステート
  const [displayInput, setDisplayInput] = useState(true); // input要素の表示状態を管理するステート
  const [textValue, setTextValue] = useState('');

  const titlechange = (event) => {
    setTextValue(event.target.value); // テキストエリアの値をstateに反映
  };


  const buttonAlert = () => {
    alert("下書きを保存しました!");
    console.log(imageUrl)
    console.log(textValue)
    if (editorInstance.current && typeof editorInstance.current.save === "function") {
      editorInstance.current
        .save()
        .then((outputData) => {
          console.log("Article data: ", outputData);
        })
        .catch((error) => {
          console.log("Saving failed: ", error);
        });
    } else {
      console.error("Editor.jsが初期化されていないか、保存関数が利用できません");
    }
  };

  const handleImageUpload = async (file) => {
    const toBase64 = (file) =>
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });

    try {
      const base64Image = await toBase64(file);
      console.log(base64Image);
      return { success: 1, file: { url: base64Image } };
    } catch (error) {
      console.error(error);
      return { success: 0, message: "Failed to upload image", error };
    }
  };

  // ファイル選択時の処理
  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      handleCoverImageUpload(file);
    }
  };

  // ファイルをBase64形式に変換して、画像URLを設定する処理
  const handleCoverImageUpload = async (file) => {
    try {
      const base64Image = await toBase64(file);
      setImageUrl(base64Image); // 画像のURLを設定
      setDisplayInput(false); // 画像をアップロードした後にinput要素を非表示にする
    } catch (error) {
      console.error('画像のアップロードに失敗しました:', error);
    }
  };

  // ファイルをBase64に変換する関数
  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  useEffect(() => {
    const handleUrlUpload = async (fileUrl) => {
      try {
        const response = await fetch(fileUrl);
        const blob = await response.blob();
        const base64Image = await blobToBase64(blob);
        return { success: 1, file: { url: base64Image } };
      } catch (error) {
        console.error(error);
        return { success: 0, message: "Failed to upload image", error };
      }
    };

    const blobToBase64 = (blob) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
          const base64data = reader.result;
          resolve(base64data);
        };
        reader.onerror = reject;
      });
    };

    if (editorHolder.current) {
      editorInstance.current = new EditorJS({
        holder: editorHolder.current,
        placeholder: "コンテンツを入力してください",
        tools: {
          paragraph: {
            class: Paragraph,
            inlineToolbar: true,
            tunes: ["textVariant"],
          },
          embed: {
            class: Embed,
            config: {
              services: {
                facebook: true,
                Instagram: true,
                youtube: true,
                Twitter: true,
                twitch: true,
                miro: true,
                vimeo: true,
                gfycat: true,
                imgur: true,
                vine: true,
                aparat: true,
                codepen: {
                  regex: /https?:\/\/codepen.io\/([^/?&]*)\/pen\/([^/?&]*)/,
                  embeddedUrl:
                    "https://codepen.io/<%= remote_id %>?height=300&theme-id=0&default-tab=css,result&embed-version=2",
                  html: "<iframe height='300' scrolling='no' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'></iframe>",
                },
                pinterest: true,
                github: true,
                coub: true,
              },
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
              placeholder: "コードを書いてください",
            },
          },
          linkTool: {
            class: LinkTool,
            config: {
              endpoint: "/editorjs_link",
            },
          },
          image: {
            class: Image,
            config: {
              uploader: {
                uploadByFile: handleImageUpload,
                uploadByURL: handleUrlUpload,
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
          marker: Marker,
          checklist: CheckList,
          delimiter: Delimiter,
          inlineCode: InlineCode,
          textVariant: TextVariantTune,
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
          nestedchecklist: EditorjsNestedChecklist,
        },
        autofocus: true,
        i18n: {
          messages: {
            ui: {
              blockTunes: {
                toggler: {
                  "Click to tune": "クリックして調整",
                  "or drag to move": "またはドラッグして移動",
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
            toolNames: {
              Text: "テキスト",
              "Nested Checklist": "リスト",
              Heading: "見出し",
              Embed: "埋め込み",
              Checklist: "チェックリスト",
              Title: "タイトル",
              Quote: "引用",
              Code: "コード",
              Alert: "警告",
              Delimiter: "区切り",
              "Raw HTML": "HTML",
              Table: "テーブル",
              Link: "リンク",
              Marker: "マーカー",
              Bold: "太字",
              Underline: "下線",
              Italic: "斜体",
              InlineCode: "インラインコード",
              Image: "画像",
              Toggle: "折りたたみメニュー",
            },
          },
        },
      });
    }
  }, []); // 空の依存配列を渡して初回のみ実行

  return (
    <div className="editor">

      {/* アップロードされた画像の表示 */}
      {imageUrl && (
        <div className="uploaded-image" id="uploaded-image">
          <img src={imageUrl} alt="Uploaded" style={{ maxWidth: '100%', maxHeight: '300px' }} />
          <CancelIcon 
          className="cancelIcon"
          />
        </div>
      )}

      {/* 画像を選ぶ */}
      <input
        id="fileInput"
        type="file"
        accept="image/*"
        style={{ display: 'none' }} // displayInput の状態によって表示を制御
        onChange={handleFileSelect} // ファイル選択時の処理
      />

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
      <button id="save" className="save" onClick={buttonAlert}>下書きを保存する</button>
      <Instagram />
      <Twitter />
    </div>
  );
};

export default Editor;
