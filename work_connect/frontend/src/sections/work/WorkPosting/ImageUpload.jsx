import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const SortableItem = ({ id, image, onDelete }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    margin: "10px",
    textAlign: "center",
    boxSizing: "border-box",
    position: "relative",
  };

  const imgStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    aspectRatio: '16 / 9',
  };

  const containerStyle = {
    width: '450px',
    height: '253px', // 320 * 9 / 16 = 180
    overflow: 'hidden',
    position: 'relative',
    boxSizing: 'border-box',
    zIndex: 1, // 他の要素の上に表示されるように設定
  };

  const buttonStyle = {
    position: "absolute",
    top: "5px",
    right: "5px",
    background: "red",
    color: "white",
    border: "none",
    borderRadius: "50%",
    width: "25px",
    height: "25px",
    cursor: "pointer",
    zIndex: 2,
  };

  const handleDelete = (event) => {
    event.preventDefault();
    onDelete(id);
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <div style={containerStyle}>
        <img src={image} alt="" style={imgStyle} {...listeners} />
        <button type="button" style={buttonStyle} onClick={handleDelete}>
          ×
        </button>
      </div>
    </div>
  );
};

SortableItem.propTypes = {
  id: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};

const ImageUpload = () => {
  const [items, setItems] = useState([]);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const savedItems = localStorage.getItem("items");
    if (savedItems) {
      setItems(JSON.parse(savedItems));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    const newItems = files.map((file, index) => ({
      id: `${file.name}-${index}-${Date.now()}`,
      image: URL.createObjectURL(file),
    }));
    setItems((prevItems) => [...prevItems, ...newItems]);
  };

  const handleDelete = (id) => {
    console.log(`Deleting item with id: ${id}`);
    setItems((items) => items.filter((item) => item.id !== id));
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  // useSensors と PointerSensor を使用
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
      // ボタンの上ではドラッグアンドドロップを無効にする
      filter: (event) => !event.target.closest("button"),
    })
  );

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const inputStyle = {
    display: "none",
  };

  const buttonStyle = {
    display: "flex",
    flexDirection: "column",
    borderWidth: "2px",
    borderStyle: "dashed",
    borderColor: "rgb(88, 99, 248)",
    borderRadius: "5px",
    boxSizing: "borderBox",
    height: "12.0625rem",
    webkitBoxPack: "center",
    justifyContent: "center",
    webkitBoxAlign: "center",
    alignItems: "center",
    cursor: "pointer",
    width: "100%",
  };

  return (
    <div>
      <p>画像</p>
      <input
        type="file"
        multiple
        onChange={handleImageUpload}
        ref={fileInputRef}
        style={inputStyle}
      />
      <button type="button" onClick={handleButtonClick} style={buttonStyle}>
        アップロード
      </button>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={items.map((item) => item.id)}
          strategy={rectSortingStrategy}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
              gap: "10px",
            }}
          >
            {items.map((item) => (
              <SortableItem
                key={item.id}
                id={item.id}
                image={item.image}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default ImageUpload;
