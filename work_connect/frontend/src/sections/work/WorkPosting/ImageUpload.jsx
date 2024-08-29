import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import {
  DndContext,
  DragOverlay,
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
import {
  restrictToWindowEdges,
} from "@dnd-kit/modifiers";
import { CSS } from "@dnd-kit/utilities";

const SortableItem = ({ id, image, onDelete, activeId }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    margin: "10px",
    textAlign: "center",
    boxSizing: "border-box",
    position: "relative",
    opacity: id === activeId ? 0 : 1,
  };

  const imgStyle = {
    // position: 'absolute',
    // float: 'left',
    width: "100%",
    height: "100%",
    objectFit: "cover",
    // zindex: 100000,
    aspectRatio: "16 / 9",
  };

  const containerStyle = {
    width: "100%",
    maxWidth: "400px",
    height: "225px",
    overflow: "hidden",
    position: "relative",
    boxSizing: "border-box",
    zIndex: 10000,
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
  activeId: PropTypes.string,
};

const ImageUpload = ({ onImagesUploaded, coleSetImage }) => {
  const [items, setItems] = useState([]);
  const [activeId, setActiveId] = useState(null);
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
    coleSetImage(event.target.files);
    const files = Array.from(event.target.files);
    const newItems = files.map((file, index) => ({
      id: `${file.name}-${index}-${Date.now()}`,
      image: URL.createObjectURL(file),
      name: file.name,
    }));

    setItems((prevItems) => {
      const updatedItems = [...prevItems, ...newItems];
      onImagesUploaded(updatedItems); // 新しい項目リスト全体を渡す
      return updatedItems;
    });
  };

  const handleDelete = (id) => {
    console.log(`Deleting item with id: ${id}`);
    setItems((items) => {
      const updatedItems = items.filter((item) => item.id !== id);
      onImagesUploaded(updatedItems); // 削除後の項目リスト全体を渡す
      return updatedItems;
    });
  };

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    setActiveId(null);

    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        const updatedItems = arrayMove(items, oldIndex, newIndex);
        onImagesUploaded(updatedItems); // 並べ替え後の項目リスト全体を渡す
        return updatedItems;
      });
    }
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
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

  const activeItem = items.find((item) => item.id === activeId);

  const overlayStyle = {
    width: "100%",
    maxWidth: "400px", // 縮小された幅
    height: "225px", // 縮小された高さ (16/9 アスペクト比)
    overflow: "hidden",
    position: "relative",
    boxSizing: "border-box",
    zIndex: 9999,
  };

  const overlayImgStyle = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    aspectRatio: "16 / 9",
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
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToWindowEdges]}
      >
          <SortableContext
            items={items.map((item) => item.id)}
            strategy={rectSortingStrategy}
          >
            <div
              style={{
                // display: "grid",
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

ImageUpload.propTypes = {
  onImagesUploaded: PropTypes.func.isRequired,
  coleSetImage: PropTypes.func.isRequired,
};

export default ImageUpload;
