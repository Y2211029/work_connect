import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { arrayMove, SortableContext, useSortable, rectSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const SortableItem = ({ id, image }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    margin: '10px',
    textAlign: 'center',
    boxSizing: 'border-box',
  };

  const imgStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  };

  const containerStyle = {
    width: '400px', // 16:9の比率に基づいた幅
    height: '225px', // 16:9の比率に基づいた高さ
    overflow: 'hidden', // 親要素のサイズを超える部分を隠す
    position: 'relative', // 必要に応じて絶対配置をサポート
    boxSizing: 'border-box',
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <div style={containerStyle}>
        <img src={image} alt="" style={imgStyle} />
      </div>
    </div>
  );
};

SortableItem.propTypes = {
  id: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

const ImageUpload = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const savedItems = localStorage.getItem('items');
    if (savedItems) {
      setItems(JSON.parse(savedItems));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items));
  }, [items]);

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    const newItems = files.map((file, index) => ({
      id: `${file.name}-${index}-${Date.now()}`,
      image: URL.createObjectURL(file),
    }));
    setItems((prevItems) => [...prevItems, ...newItems]);
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

  return (
    <div>
      <p>画像</p>
      <input type="file" multiple onChange={handleImageUpload} />
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={items.map(item => item.id)} strategy={rectSortingStrategy}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '10px' }}>
            {items.map((item) => (
              <SortableItem key={item.id} id={item.id} image={item.image} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default ImageUpload;
