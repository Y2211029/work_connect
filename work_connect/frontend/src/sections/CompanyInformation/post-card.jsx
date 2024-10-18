import { forwardRef, useState, useEffect } from "react";
import PropTypes from "prop-types";
import Tooltip from '@mui/material/Tooltip';
import IconButton from "@mui/material/IconButton";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Switch from '@mui/material/Switch';
import './CompanyInformation.css'; // CSSファイルをインポート
import axios from "axios";
import DeleteIcon from '@mui/icons-material/Delete';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, arrayMove, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';

const PostCard = forwardRef(({ post }) => {
  const { title_contents } = post;
  const CompanyInformationsSaveURL = "http://localhost:8000/company_informations_save";

  const [MyUserId, setMyUserId] = useState(0);
  const [showEdit, setShowEdit] = useState(false);
  const [editedContents, setEditedContents] = useState(title_contents);

  useEffect(() => {
    const accountData = JSON.parse(sessionStorage.getItem("accountData"));
    setMyUserId(accountData?.id || 0);
  }, []);

  useEffect(() => {
    setEditedContents(title_contents);
  }, [title_contents]);

  useEffect(() => {
    async function CompanyInformationSave() {
      try {
        const response = await axios.post(CompanyInformationsSaveURL, {
          CompanyInformation: editedContents,
        });
        if (response) {
          console.log("成功です");
        }
      } catch (err) {
        console.error("Error saving company information:", err.response ? err.response.data : err.message);
      }
    }

    if (editedContents.length) {
      CompanyInformationSave();
    }
  }, [editedContents]);

  useEffect(() => {
    if (showEdit) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showEdit]);

  if (!title_contents || title_contents.length === 0) {
    return <div>No post available</div>;
  }

  const renderEditButton = (companyId) => (
    companyId === MyUserId && (
      <Tooltip title="編集する">
        <IconButton onClick={() => handleEditClick(companyId)}>
          <ModeEditIcon />
        </IconButton>
      </Tooltip>
    )
  );

  const handleEditClick = (postId) => {
    console.log("編集ボタンがクリックされました", postId);
    setShowEdit(true);
    setEditedContents(title_contents);
  };

  const handlePublicStatusChange = (index) => {
    setEditedContents(prevContents => {
      const newContents = [...prevContents];
      newContents[index].public_status = newContents[index].public_status === 1 ? 0 : 1;
      return newContents;
    });
  };

  const handleTextChange = (index, field, value) => {
    setEditedContents(prevContents => {
      const newContents = [...prevContents];
      newContents[index][field] = value;
      return newContents;
    });
  };

  const handleDelete = (index) => {
    const result = window.confirm("本当に削除しますか?");
    if (result) {
      setEditedContents(prevContents => prevContents.filter((_, i) => i !== index));
    }
  };

const SortableRow = ({ id, children }) => {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });

    const style = {
      transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : 'none',
      transition,
      cursor: isDragging ? 'grabbing' : 'grab',
    };

    return (
      <TableRow ref={setNodeRef} style={style} {...attributes}>
        {children} {/* childrenにlistenersを渡さない */}
        <TableCell>
          <Tooltip title={"ドラッグすることで並び替えができます"}>
            <SwapVertIcon {...listeners} style={{ cursor: 'grab' }} /> {/* SwapVertIconにのみlistenersを適用 */}
          </Tooltip>
        </TableCell>
      </TableRow>
    );
};

  SortableRow.propTypes = {
    id: PropTypes.number.isRequired,
    children: PropTypes.func.isRequired,
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    console.log('Drag ended:', { active, over });

    if (active.id !== over.id) {
      const oldIndex = editedContents.findIndex(item => item.id === active.id);
      const newIndex = editedContents.findIndex(item => item.id === over.id);

      setEditedContents((items) => arrayMove(items, oldIndex, newIndex));
    }
  };

  const renderEdit = (
    <div>
      <div className="modal_overlay">
        <div className="modal_window">
          <TableContainer component={Paper} className="Modal_tableContainer">
            <Table className="Modal_Table">
              <TableHead>
                <TableRow>
                  <TableCell style={{ fontWeight: 'bold', width: '20%' }}>タイトル</TableCell>
                  <TableCell style={{ fontWeight: 'bold', width: '20%' }}>内容</TableCell>
                  <TableCell style={{ fontWeight: 'bold', width: '5%' }}>公開状態</TableCell>
                  <TableCell style={{ fontWeight: 'bold', width: '5%' }}>削除</TableCell>
                  <TableCell style={{ fontWeight: 'bold', width: '5%' }}>並び変え</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <DndContext modifiers={[restrictToVerticalAxis]} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                  <SortableContext items={editedContents.map(item => item.id)} strategy={verticalListSortingStrategy}>
                    {editedContents.map((item, index) => (
                      <SortableRow key={item.id} id={item.id}>
                        <>
                          <TableCell>
                            <input
                              type="text"
                              value={item.title}
                              onChange={(e) => handleTextChange(index, "title", e.target.value)}
                            />
                          </TableCell>
                          <TableCell>
                            <textarea
                              value={item.contents}
                              onChange={(e) => handleTextChange(index, "contents", e.target.value)}
                            />
                          </TableCell>
                          <TableCell>
                            <Tooltip title={item.public_status === 1 ? "公開状態を切り替える 現在:公開中" : "公開状態を切り替える 現在:非公開中"}>
                              <Switch
                                checked={item.public_status === 1}
                                onChange={() => handlePublicStatusChange(index)}
                                inputProps={{ 'aria-label': 'controlled' }}
                              />
                            </Tooltip>
                          </TableCell>
                          <TableCell>
                            <Tooltip title={"削除します"}>
                              <IconButton onClick={() => handleDelete(index)}>
                                <DeleteIcon />
                              </IconButton>
                            </Tooltip>
                          </TableCell>
                        </>
                      </SortableRow>
                    ))}
                  </SortableContext>
                </DndContext>
              </TableBody>
            </Table>
          </TableContainer>
          <p><button onClick={() => setShowEdit(false)}>close</button></p>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      {renderEditButton(title_contents[0].company_id)} {/* 編集ボタンをここに表示 */}
      {showEdit && renderEdit}
      <TableContainer component={Paper} className="tableContainer">
        <Table className="Table">
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: 'bold', width: '40%' }}>タイトル</TableCell>
              <TableCell style={{ fontWeight: 'bold', width: '150%' }}>内容</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {title_contents.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.title}</TableCell>
                <TableCell>{item.contents}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
});

PostCard.displayName = "PostCard";

PostCard.propTypes = {
  post: PropTypes.shape({
    title_contents: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        contents: PropTypes.string.isRequired,
        public_status: PropTypes.number.isRequired,
        company_id: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
};

export default PostCard;
