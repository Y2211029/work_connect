// import { useState } from "react";
import Modal from "react-modal";
import PropTypes from "prop-types";


//MUIアイコン
import Tooltip from '@mui/material/Tooltip';
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import DeleteIcon from '@mui/icons-material/Delete';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableContainer from '@mui/material/TableContainer';
import Switch from '@mui/material/Switch';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { SortableContext, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import Paper from '@mui/material/Paper';
import SwapVertIcon from '@mui/icons-material/SwapVert';




const modalStyle = {
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)', // オーバーレイの背景色
        zIndex: 2, // オーバーレイの z-index
        width: '110%',
        height: '100%',
    },
    content: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        border: 'none',
        borderRadius: '0',
        padding: '1.5rem',
        overflow: 'hidden',
        zIndex: 2, // コンテンツの z-index
    },
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
            {children}
            <TableCell>
                <Tooltip title={"ドラッグすることで並び替えができます"}>
                    <SwapVertIcon {...listeners} style={{ cursor: 'grab' }} />
                </Tooltip>
            </TableCell>
        </TableRow>
    );
};

SortableRow.propTypes = {
    id: PropTypes.number.isRequired,
    children: PropTypes.func.isRequired,
};



const EditCompanyInformation = ({
    IsOpen,
    CloseModal,
    editedContents,
    HandlePublicStatusChange,
    HandleAddRow,
    HandleDragEnd,
    HandleDelete,
    HandleTextChange
}) => {




    return (
        <Modal
            isOpen={IsOpen}
            onRequestClose={CloseModal} // モーダルを閉じるコールバック
            shouldCloseOnOverlayClick={true} // オーバーレイクリックでモーダルを閉じる
            contentLabel="Example Modal"
            style={modalStyle}
        >
            <div>
                <div className="modal_overlay">
                    <div className="modal_window">
                        <TableContainer component={Paper} className="Modal_tableContainer">
                        <Button variant="outlined" onClick={CloseModal}>
                            閉じる
                        </Button>
                            <Table className="Modal_Table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell style={{ fontWeight: 'bold', width: '20%' }}>タイトル</TableCell>
                                        <TableCell style={{ fontWeight: 'bold', width: '30%' }}>内容</TableCell>
                                        <TableCell style={{ fontWeight: 'bold', width: '5%' }}>公開状態</TableCell>
                                        <TableCell style={{ fontWeight: 'bold', width: '5%' }}>削除</TableCell>
                                        <TableCell style={{ fontWeight: 'bold', width: '5%' }}>追加</TableCell>
                                        <TableCell style={{ fontWeight: 'bold', width: '5%' }}>並び変え</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <DndContext modifiers={[restrictToVerticalAxis]} collisionDetection={closestCenter} onDragEnd={HandleDragEnd}>
                                        <SortableContext items={editedContents.map(item => item.id)} strategy={verticalListSortingStrategy}>
                                            {editedContents.map((item, index) => (
                                                <SortableRow key={item.id} id={item.id}>
                                                    <>
                                                        <TableCell>
                                                            <input
                                                                type="text"
                                                                value={item.title}
                                                                onChange={(e) => HandleTextChange(index, "title", e.target.value)}
                                                            />
                                                        </TableCell>
                                                        <TableCell>
                                                            <textarea
                                                                value={item.contents}
                                                                onChange={(e) => HandleTextChange(index, "contents", e.target.value)}
                                                            />
                                                        </TableCell>
                                                        <TableCell>
                                                            <Tooltip title={item.public_status === 1 ? "公開状態を切り替える 現在:公開中" : "公開状態を切り替える 現在:非公開中"}>
                                                                <Switch
                                                                    checked={item.public_status === 1}
                                                                    onChange={() => HandlePublicStatusChange(index)}
                                                                    inputProps={{ 'aria-label': 'controlled' }}
                                                                />
                                                            </Tooltip>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Tooltip title={"削除します"}>
                                                                <IconButton onClick={() => HandleDelete(index)}>
                                                                    <DeleteIcon />
                                                                </IconButton>
                                                            </Tooltip>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Tooltip title={"次の行にフォームを追加します"}>
                                                                <IconButton onClick={() => HandleAddRow(index)}>
                                                                    <AddCircleOutlineIcon />
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
                    </div>
                </div>
            </div>
        </Modal>
    );
};

EditCompanyInformation.propTypes = {
    IsOpen: PropTypes.bool.isRequired,
    CloseModal: PropTypes.func.isRequired,
    editedContents: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired,
            contents: PropTypes.string.isRequired,
            company_name: PropTypes.string.isRequired,
            id: PropTypes.number.isRequired,
            company_id: PropTypes.string.isRequired,
            // 他の必要なプロパティがあれば追加
        })
    ).isRequired,
    HandlePublicStatusChange: PropTypes.func.isRequired,
    HandleAddRow: PropTypes.func.isRequired,
    HandleDragEnd: PropTypes.func.isRequired,
    HandleDelete: PropTypes.func.isRequired,
    HandleTextChange: PropTypes.func.isRequired
};

export default EditCompanyInformation;
