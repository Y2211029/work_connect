import { useState } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { useSortable, SortableContext, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable';
import DragHandleIcon from "@mui/icons-material/DragHandle"; // つまみのアイコン
import { CSS } from '@dnd-kit/utilities';
import Box from '@mui/material/Box';
import './Profile.css';

// ----------------------------------------------------------------------

//列並び替え(企業の情報)
export default function Sort() {
  const [rows, setRows] = useState([
    ['Row 1 Column 1', 'Row 1 Column 2'],
    ['Row 2 Column 1', 'Row 2 Column 2'],
    ['Row 3 Column 1', 'Row 3 Column 2']
  ]);

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = rows.findIndex(row => row[0] === active.id);
      const newIndex = rows.findIndex(row => row[0] === over.id);

      setRows((items) => arrayMove(items, oldIndex, newIndex));
    }
  };

  const SortableRow = ({ id, children }) => {
    const { attributes, listeners, setNodeRef, transform, transition, setActivatorNodeRef, isDragging } = useSortable({
      id,
    });

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
      cursor: isDragging ? 'grabbing' : 'grab',
    };

    return (
      <tr ref={setNodeRef} style={style} {...attributes}>
        <td>
          <Box
            ref={setActivatorNodeRef}
            {...listeners}
            sx={{
              width: "20px",
              justifyContent: "center",
              display: "flex",
              cursor: isDragging ? "grabbing" : "grab"
            }}
          >
            <DragHandleIcon />
          </Box>
        </td>
        {children}
      </tr>
    );
  };

  SortableRow.propTypes = {
    id: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
  };


  return (
    <>
      <Helmet>
        <title> プロフィール | Minimal UI </title>
      </Helmet>

      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={rows.map(row => row[0])} strategy={verticalListSortingStrategy}>
          <table className="information_table">
            <thead>
              <tr>
                <th></th> {/* For the drag handle column */}
                <th>情報名</th>
                <th>内容</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <SortableRow key={row[0]} id={row[0]}>
                  {row.map((column, colIndex) => (
                    <td key={colIndex}>{column} </td>
                  ))}
                </SortableRow>
              ))}
            </tbody>
          </table>
        </SortableContext>
      </DndContext>
    </>
  );
}
