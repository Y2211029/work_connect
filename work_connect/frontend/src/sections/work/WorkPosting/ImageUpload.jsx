"use client";
import { useState, useEffect, useRef, useContext } from "react";
import PropTypes from "prop-types";
import { TextareaAutosize as BaseTextareaAutosize } from "@mui/base/TextareaAutosize";
import { styled } from "@mui/system";
import {
  DndContext, // DnDのコンテキストを提供
  DragOverlay, // ドラッグ中のオーバーレイ表示
  closestCenter, // ドロップ位置の判定を中心に基づいて行う
  PointerSensor, // マウスやタッチ操作をセンサーとして使用
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove, // 配列の要素を並べ替える
  SortableContext, // 並べ替え可能なリストを提供
  useSortable, // 各アイテムを並べ替え可能にする
  rectSortingStrategy, // レイアウトの計算戦略
} from "@dnd-kit/sortable";
import { restrictToWindowEdges } from "@dnd-kit/modifiers"; // ドラッグを画面端までに制限
import { CSS } from "@dnd-kit/utilities";
import { WorkImageContext } from "src/layouts/dashboard";

// カラーパレットの定義（ブルーとグレーの色を設定）
const blue = {
  100: "#DAECFF",
  200: "#b6daff",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  900: "#003A75",
};

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};

// テキストエリアのスタイル定義
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
  color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
  border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
  box-shadow: 0px 2px 2px ${theme.palette.mode === "dark" ? grey[900] : grey[50]};

  &:hover {
    border-color: ${blue[400]};
  }

  &:focus {
    border-color: ${blue[400]};
    box-shadow: 0 0 0 3px ${theme.palette.mode === "dark" ? blue[600] : blue[200]};
  }

  &:focus-visible {
    outline: 0;
  }
`
);

// 並べ替え可能なアイテムのコンポーネント
const SortableItem = ({
  id,
  image,
  description,
  onDelete,
  onDescriptionChange,
  activeId,
}) => {
  // useSortable フックを使ってドラッグ＆ドロップ操作を管理
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  // ドラッグ中の変形や透明度などのスタイルを設定
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    margin: "10px",
    textAlign: "center",
    boxSizing: "border-box",
    position: "relative",
    opacity: id === activeId ? 0 : 1, // ドラッグ中のアイテムは透明に
  };

  const imgStyle = {
    width: "100%",
    height: "100%",
    objectFit: "cover", // 画像をアスペクト比に基づいてトリミング
    aspectRatio: "16 / 9", // 16:9のアスペクト比で表示
  };

  const containerStyle = {
    width: "fit-contents",
    // maxWidth: "400px",
    height: "fit-contents",
    overflow: "hidden",
    position: "relative",
    boxSizing: "border-box",
    zIndex: 4,
  };

  // const buttonStyle = {
  //   position: "absolute", // 削除ボタンを右上に配置
  //   top: "5px",
  //   right: "5px",
  //   background: "red",
  //   color: "white",
  //   border: "none",
  //   borderRadius: "50%", // 丸いボタン
  //   width: "25px",
  //   height: "25px",
  //   cursor: "pointer",
  //   zIndex: 2,
  // };

  // 画像削除のハンドラ
  const handleDelete = (e) => {
    e.preventDefault();
    onDelete(id);
  };

  // 並べ替え可能なアイテムの表示とテキストエリアの設定
  return (
    <div ref={setNodeRef} style={style} {...attributes} draggable={true}>
      <div style={containerStyle}>
        <img src={image} alt="" style={imgStyle} {...listeners} />
        <button type="button" className="workImageDeleteButton" /*style={buttonStyle}*/ onClick={handleDelete}>
          ×
        </button>
      </div>
      <Textarea
        value={description}
        onChange={(e) => onDescriptionChange(id, e.target.value)} // 説明文の変更を処理
        placeholder="画像の説明を入力してください"
      />
    </div>
  );
};

// PropTypesを使用してプロパティの型チェックを定義
SortableItem.propTypes = {
  id: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  onDescriptionChange: PropTypes.func.isRequired,
  activeId: PropTypes.string,
};

// 画像アップロード機能を提供するコンポーネント
const ImageUpload = ({
  handleValueChange,
  onImagesUploaded,
  callSetImage,
  workData,
  workDetailData,
}) => {
  const [activeId, setActiveId] = useState(null); // ドラッグ中のアイテムIDを管理
  const fileInputRef = useRef(null); // ファイルインプットの参照を保持
  // AllItemsContextから状態を取得
  const { workImage, setWorkImage } = useContext(WorkImageContext);
  // レンダリングを行うかの判定で使用
  const [hasRun, setHasRun] = useState(true);

  // 10/21追加
  const [items, setItems] = useState([]); // 画像アイテムの状態管理
  console.log("items", workData);

  useEffect(() => {
    if (items) {
      handleInputChange();
    }
  }, [items]);

  const handleInputChange = () => {
    handleValueChange(items);
  };

  // 画像リストを初期化する関数
  const resetItems = () => {
    setWorkImage([]); // アイテムをリセット
    setItems([]); // 10/21追加
    localStorage.removeItem("workImage"); // ローカルストレージもリセット
  };

  useEffect(() => {
    resetItems(); // 初回レンダリング時にリセット
    if (workData) {
      setWorkImage(workData);
      console.log("workDetailData:", workDetailData);
      handleGetImageUpload(workDetailData);
      console.log("workData:", workData);
    }
  }, [workData, workDetailData]);

  useEffect(() => {
    console.log("workImage", workImage);
    if (!hasRun) {
      resetItems();
      setHasRun(true);
    }
    callSetImage(workImage); // アップロードしたファイルを処理
  }, [workImage, hasRun]);

  // 画像アップロードの処理
  const handleImageUpload = (event) => {
    // setWorkImage(event.target.files); // File型のデータを追加
    const files = Array.from(event.target.files); // アップロードされたファイルを配列に変換

    const dt = new DataTransfer();
    files.forEach((file) => {
      dt.items.add(file);
    });
    console.log("files:", dt.files);
    setWorkImage((prevImages) => [...prevImages, ...dt.files]);
    // callSetImage(workImage); // アップロードしたファイルを処理

    const newItems = files.map((file, index) => ({
      id: `${file.name}-${index}-${Date.now()}`, // 一意のIDを生成
      image: URL.createObjectURL(file), // ローカルURLを作成
      name: file.name,
      description: "", // 初期状態は空の説明
    }));
    setItems((prevItems) => {
      // 配列型
      const updatedItems = [...prevItems, ...newItems];
      onImagesUploaded(updatedItems); // 親コンポーネントに通知
      console.log("updatedItems:", updatedItems);
      return updatedItems;
    });
  };

  // 画像アップロードの処理
  const handleGetImageUpload = (workDetailData) => {
    console.log("aaaaaa", workDetailData);

    if (workDetailData != undefined && workData.length >= 1) {
      console.log(workData);
      const newItems = workDetailData.map((file, index) => {
        console.log("workData[index]", workData[index]);
        // URL.revokeObjectURL(URL.createObjectURL(workData[index]));
        return ({
          id: `${file.image}-${index}-${Date.now()}`, // 一意のIDを生成
          // image: URL.createObjectURL(workData[index]), // ローカルURLを作成
          image: file.imageSrc,
          name: file.image,
          description: file.annotation, // 初期状態は空の説明
        })
      });
      setItems((prevItems) => {
        // 配列型
        const updatedItems = [...prevItems, ...newItems];
        onImagesUploaded(updatedItems); // 親コンポーネントに通知
        console.log("updatedItems:", updatedItems);
        return updatedItems;
      });
    }
  };

  // アイテム削除の処理
  const handleDelete = (id) => {
    event.preventDefault(); // デフォルトの動作を防止
    event.stopPropagation(); // イベントのバブリングを防止

    console.log("id", id);

    // アイテムを削除するロジック
    setWorkImage((workImage) => {
      const updateId = id.split(".")[0];
      console.log("updateId", updateId);

      const dt = new DataTransfer();
      const workImageArray = Array.from(workImage);
      console.log("workImageArray", workImageArray[0].name.split(".")[0]);
      workImageArray.forEach((file) => {
        if (file.name.split(".")[0] !== updateId) {
          dt.items.add(file);
        }
      });

      if (dt.files.length == 0) {
        // 選択ファイル数が0のとき配列とinput内をリセットする

        setHasRun(false);
      }

      fileInputRef.current.files = dt.files; // input内のFileListを更新
      console.log("fileInputRef.current.files", fileInputRef.current.files);

      onImagesUploaded(dt.files);
      return dt.files;
    });

    // 10/21追加
    setItems((items) => {
      const updatedItems = items.filter((item) => item.id !== id); // 削除対象をフィルタリング
      onImagesUploaded(updatedItems); // 親コンポーネントに更新を通知
      return updatedItems;
    });
  };

  // 説明の変更を処理する関数
  const handleDescriptionChange = (id, value) => {
    // setWorkImage((workImage) => {
    //   const updatedItems =
    //     workImage &&
    //     workImage.map((item) =>
    //       item.id === id ? { ...item, description: value } : item
    //     );
    //   onImagesUploaded(updatedItems); // 親コンポーネントに更新を通知
    //   return updatedItems;
    // });
    // 10/21追加
    setItems((items) => {
      const updatedItems =
        items &&
        items.map((item) =>
          item.id === id ? { ...item, description: value } : item
        );
      onImagesUploaded(updatedItems); // 親コンポーネントに更新を通知
      return updatedItems;
    });
  };

  // ドラッグ開始のハンドラ
  const handleDragStart = (event) => {
    setActiveId(event.active.id); // ドラッグ中のアイテムIDを保存
  };

  // ドラッグ終了のハンドラ
  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveId(null);

    if (over && active.id !== over.id) {
      setItems((items) => {
        console.log("Current workImage:", items); // workImageが配列か確認
        if (!Array.isArray(items)) {
          console.error("Error: workImage is not an array.");
          return items; // 配列でない場合はそのまま返す
        }

        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        const updatedItems = arrayMove(items, oldIndex, newIndex);

        // DataTransferオブジェクトを作成
        const dataTransfer = new DataTransfer();
        console.log("updatedItems:", updatedItems);

        updatedItems.forEach((item) => {
          // itemがFileオブジェクトでない場合、Fileとして生成（例）
          const file =
            item instanceof File
              ? item
              : new File([item.content], item.name, { type: item.type });

          dataTransfer.items.add(file);
        });

        // FileList型として取得
        const fileList = dataTransfer.files;
        console.log("fileList:", fileList);

        // callSetImage(fileList); // アップロードしたファイルを処理
        // onImagesUploaded(updatedItems);
        setItems(updatedItems);

        return updatedItems;
      });

      setWorkImage((workImage) => {
        console.log("Current workImage:", workImage); // workImageが配列か確認

        if (!Array.isArray(workImage)) {
          console.error("Error: workImage is not an array.");
          return workImage; // 配列でない場合はそのまま返す
        }
        // 正規表現でファイル名部分を抽出
        const match1 = active.id.match(/^(.+?\.[a-zA-Z0-9]+)(?:-[^-]+)+$/);
        const activeId = match1 ? match1[1] : active.id;
        const match2 = over.id.match(/^(.+?\.[a-zA-Z0-9]+)(?:-[^-]+)+$/);
        const overId = match2 ? match2[1] : over.id;
        console.log("activeId:", activeId);
        console.log("overId:", overId);

        const oldIndex = workImage.findIndex(
          (image) => image.name === activeId
        );
        const newIndex = workImage.findIndex((image) => image.name === overId);
        const updatedWorkImage = arrayMove(workImage, oldIndex, newIndex);

        // DataTransferオブジェクトを作成
        const dataTransfer = new DataTransfer();
        console.log("updatedWorkImage:", updatedWorkImage);

        updatedWorkImage.forEach((file) => {
          dataTransfer.items.add(file);
        });

        // FileList型として取得
        const fileList = dataTransfer.files;
        console.log("fileList:", fileList);

        // callSetImage(fileList); // アップロードしたファイルを処理
        onImagesUploaded(updatedWorkImage);
        setWorkImage(updatedWorkImage);

        return updatedWorkImage;
      });
    }
  };

  // ドラッグセンサーの設定
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 10 }, // ドラッグ開始までの距離
      filter: (event) => !event.target.closest("button"), // ボタン上ではドラッグ無効
    })
  );

  const handleButtonClick = () => {
    fileInputRef.current.click(); // アップロードボタンをクリックで発火
  };

  const inputStyle = {
    display: "none", // ファイルインプットを隠す
  };

  // const buttonStyle = {
  //   display: "flex",
  //   flexDirection: "column",
  //   borderWidth: "2px",
  //   borderStyle: "dashed",
  //   borderColor: "#4BA2FB",
  //   borderRadius: "5px",
  //   height: "12.0625rem",
  //   justifyContent: "center",
  //   alignItems: "center",
  //   cursor: "pointer",
  //   width: "100%",
  //   minWidth: "300px",
  //   "&:hover" : {
  //     bgColor:"#a9a9a9",
  //   }
  // };

  const activeItem = items.find((item) => item.id === activeId); // ドラッグ中のアイテム

  const overlayStyle = {
    width: "fit-contents",
    // maxWidth: "400px",
    height: "fit-contents",
    overflow: "hidden",
    position: "relative",
    zIndex: 3,
  };

  const overlayImgStyle = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    aspectRatio: "16 / 9",
  };

  return (
    <div className="ImageUproadElements">
      <p>画像<span className="requiredInput">*</span>
        <input
          type="file"
          multiple
          id="inputElement"
          onChange={handleImageUpload} // 画像アップロードのイベントハンドラ
          ref={fileInputRef} // ファイルインプットの参照
          style={inputStyle} // 見えないようにスタイルを設定
        />
        <button type="button" onClick={handleButtonClick} className="imageUproadButton">
          アップロード
        </button>
      </p>
      <DndContext
        sensors={sensors} // センサー設定を渡す
        collisionDetection={closestCenter} // 衝突検知を中心ベースに設定
        onDragStart={handleDragStart} // ドラッグ開始時の処理
        onDragEnd={handleDragEnd} // ドラッグ終了時の処理
        modifiers={[restrictToWindowEdges]} // ドラッグが画面内に制限されるようにする
      >
        <SortableContext
          items={items.map((item) => item.id)} // 安全に配列を扱う
          strategy={rectSortingStrategy}
        >
          <div style={{ gap: "10px" }}>
            {items.map((item) => (
              <SortableItem
                key={item.id}
                id={item.id}
                image={item.image}
                description={item.description}
                onDelete={handleDelete}
                onDescriptionChange={handleDescriptionChange}
                activeId={activeId}
              />
            ))}
          </div>
        </SortableContext>
        <DragOverlay>
          {activeItem ? (
            <div style={overlayStyle}>
              <img src={activeItem.image} alt="" style={overlayImgStyle} />
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>

    </div>
  );
};

// PropTypesを使用してプロパティの型チェックを定義
ImageUpload.propTypes = {
  onImagesUploaded: PropTypes.func.isRequired,
  callSetImage: PropTypes.func.isRequired,
  handleValueChange: PropTypes.func.isRequired,
  props: PropTypes.func.isRequired,
  workData: PropTypes.string.isRequired,
  workDetailData: PropTypes.array.isRequired,
};

export default ImageUpload;
