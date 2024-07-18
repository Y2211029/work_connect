import { useState } from 'react';
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
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <img src={image} alt="" style={{ width: '100px', height: 'auto' }} />
    </div>
  );
};

// PropTypesを使用してプロパティの型を定義
SortableItem.propTypes = {
  id: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

const ImageUpload = () => {
  const [items, setItems] = useState([]);

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    const newItems = files.map((file, index) => ({
      id: `${file.name}-${index}`,
      image: URL.createObjectURL(file),
    }));
    setItems(newItems);
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
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, 100px)', gap: '10px' }}>
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