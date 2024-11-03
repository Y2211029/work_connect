// import { forwardRef, useState, useEffect } from "react";
// import PropTypes from "prop-types";
// import Tooltip from '@mui/material/Tooltip';
// import IconButton from "@mui/material/IconButton";
// import ModeEditIcon from '@mui/icons-material/ModeEdit';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
// import Switch from '@mui/material/Switch';
// import './CompanyInformation.css';
// import axios from "axios";
// import DeleteIcon from '@mui/icons-material/Delete';
// import SwapVertIcon from '@mui/icons-material/SwapVert';
// import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
// import { DndContext, closestCenter } from '@dnd-kit/core';
// import { SortableContext, arrayMove, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
// import { restrictToVerticalAxis } from '@dnd-kit/modifiers';

// const PostCard = forwardRef(({ post }) => {
//   const { title_contents } = post;
//   const CompanyInformationsSaveURL = "http://localhost:8000/company_informations_save";
//   const AllCompanyInformationsPullURL = "http://localhost:8000/all_company_informations_pull";

//   const [MyUserId, setMyUserId] = useState(0);
//   const [MyUserName, setMyUserName] = useState("");
//   const [showEdit, setShowEdit] = useState(false);
//   const [editedContents, setEditedContents] = useState([]);
//   const [TrueTitleContents, setTitleContents] = useState(title_contents);

//   useEffect(() => {
//     const accountData = JSON.parse(sessionStorage.getItem("accountData"));
//     setMyUserId(accountData?.id || 0);
//     setMyUserName(accountData.user_name);
//   }, []);


//   useEffect(() => {
//     async function CompanyInformationSave() {
//       console.log("保存するデータ", editedContents);
//       try {
//         const response = await axios.post(CompanyInformationsSaveURL, {
//           CompanyInformation: editedContents,
//           CompanyName: MyUserName
//         });
//         //成功したらtitle_contentsを更新する
//         if (response) {
//           console.log("saveが成功です");
//           setTitleContents(response.data.title_contents);
//         }
//       } catch (err) {
//         console.error("Error saving company information:", err.response ? err.response.data : err.message);
//       }
//     }

//     // editedContentsのタイトルまたはコンテンツがnullでないことを確認
//     const hasValidData = editedContents.every(item => item.title !== "" && item.contents !== "");

//     if (editedContents.length && hasValidData) {
//       CompanyInformationSave();
//     }
//   }, [editedContents]);

//   useEffect(() => {
//     // 編集時に公開・非公開含めたすべての企業情報を取得する
//     async function AllCompanyInformationsPull() {
//       try {
//         // Laravel側から企業一覧データを取得
//         const response = await axios.post(AllCompanyInformationsPullURL, {
//           InformationId: title_contents[0].company_id
//         });
//         setEditedContents(response.data.title_contents);
//         console.log(response.data.title_contents);
//         console.log("pullが成功です");
//       } catch (err) {
//         console.log("err:", err);
//       }
//     }
//     AllCompanyInformationsPull();
//   }, []);


//   useEffect(() => {
//     if (showEdit) {
//       document.body.style.overflow = 'hidden';
//     } else {
//       document.body.style.overflow = 'auto';
//     }

//     return () => {
//       document.body.style.overflow = 'auto';
//     };
//   }, [showEdit]);

//   if (!TrueTitleContents || TrueTitleContents.length === 0) {
//     return <div>No post available</div>;
//   }

//   const renderEditButton = (companyId) => (
//     companyId === MyUserId && (
//       <Tooltip title="編集する">
//         <IconButton onClick={() => handleEditClick(companyId)}>
//           <ModeEditIcon />
//         </IconButton>
//       </Tooltip>
//     )
//   );

//   const handleEditClick = (postId) => {
//     console.log("編集ボタンがクリックされました", postId);
//     if (editedContents) {
//       setShowEdit(true);
//     }
//   };

//   const handlePublicStatusChange = (index) => {
//     setEditedContents(prevContents => {
//       const newContents = [...prevContents];
//       newContents[index].public_status = newContents[index].public_status === 1 ? 0 : 1;
//       return newContents;
//     });
//   };

//   // const handleTextChange = (index, field, value) => {
//   //   setEditedContents(prevContents => {
//   //     const newContents = [...prevContents];
//   //     newContents[index][field] = value;
//   //     return newContents;
//   //   });
//   // };

//   const handleBlur = (index, field, value) => {
//     setTimeout(() => {
//       handleTextChange(index, field, value);
//     }, 200);  // 200ms遅延
//   };

//   const handleTextChange = (index, field, value) => {
//     setEditedContents(prevContents => {
//       const newContents = [...prevContents];
//       newContents[index] = {
//         ...newContents[index],
//         [field]: value,
//       };
//       return newContents;
//     });
//   };

//   const handleDelete = (index) => {
//     const result = window.confirm("本当に削除しますか?");
//     if (result) {
//       setEditedContents(prevContents => prevContents.filter((_, i) => i !== index));
//     }
//   };

//   const SortableRow = ({ id, children }) => {
//     const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });

//     const style = {
//       transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : 'none',
//       transition,
//       cursor: isDragging ? 'grabbing' : 'grab',
//     };

//     return (
//       <TableRow ref={setNodeRef} style={style} {...attributes}>
//         {children}
//         <TableCell>
//           <Tooltip title={"ドラッグすることで並び替えができます"}>
//             <SwapVertIcon {...listeners} style={{ cursor: 'grab' }} />
//           </Tooltip>
//         </TableCell>
//       </TableRow>
//     );
//   };

//   SortableRow.propTypes = {
//     id: PropTypes.number.isRequired,
//     children: PropTypes.func.isRequired,
//   };

//   const handleDragEnd = (event) => {
//     const { active, over } = event;

//     if (active.id !== over.id) {
//       const oldIndex = editedContents.findIndex(item => item.id === active.id);
//       const newIndex = editedContents.findIndex(item => item.id === over.id);

//       // 並び替え処理
//       const reorderedItems = arrayMove(editedContents, oldIndex, newIndex);

//       // row_numberを更新
//       const updatedItems = reorderedItems.map((item, index) => {
//         return {
//           ...item,
//           row_number: index + 1, // 1から順にrow_numberを設定
//         };
//       });

//       console.log(updatedItems);

//       setEditedContents(updatedItems);
//     }
//   };

//   const handleAddRow = (index) => {
//     const newRow = {
//       id: editedContents.length + 1, // ユニークなIDを生成
//       title: '',      // 新しい行の初期タイトル
//       contents: '',   // 新しい行の初期内容
//       public_status: 0, // 新しい行の公開状態（初期は非公開）
//       company_id: TrueTitleContents[0].company_id, // 既存の企業IDを設定
//       row_number: editedContents.length + 1 // 新しい行のrow_numberを設定
//     };

//     setEditedContents(prevContents => {
//       // 新しい行を指定されたインデックスの1つ下に追加
//       const newContents = [...prevContents];
//       newContents.splice(index + 1, 0, newRow);
//       return newContents;
//     });
//   };

//   //閉じるボタンを押したら更新後のtitle_contentsを取得しに行って渡す
//   const modalclose = () => {
//     setShowEdit(false)
//   }

//   const renderEdit = (
//     <div>
//       <div className="modal_overlay">
//         <div className="modal_window">
//           <TableContainer component={Paper} className="Modal_tableContainer">
//             <Table className="Modal_Table">
//               <TableHead>
//                 <TableRow>
//                   <TableCell style={{ fontWeight: 'bold', width: '20%' }}>タイトル</TableCell>
//                   <TableCell style={{ fontWeight: 'bold', width: '30%' }}>内容</TableCell>
//                   <TableCell style={{ fontWeight: 'bold', width: '5%' }}>公開状態</TableCell>
//                   <TableCell style={{ fontWeight: 'bold', width: '5%' }}>削除</TableCell>
//                   <TableCell style={{ fontWeight: 'bold', width: '5%' }}>追加</TableCell>
//                   <TableCell style={{ fontWeight: 'bold', width: '5%' }}>並び変え</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 <DndContext modifiers={[restrictToVerticalAxis]} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
//                   <SortableContext items={editedContents.map(item => item.id)} strategy={verticalListSortingStrategy}>
//                     {editedContents.map((item, index) => (
//                       <SortableRow key={item.id} id={item.id}>
//                         <>
//                           <TableCell>
//                             <input
//                               type="text"
//                               value={item.title}
//                               onBlur={(e) => handleBlur(index, "title", e.target.value)}
//                               />
//                           </TableCell>
//                           <TableCell>
//                             <textarea
//                               value={item.contents}
//                               onBlur={(e) => handleBlur(index, "contents", e.target.value)}
//                             />
//                           </TableCell>
//                           <TableCell>
//                             <Tooltip title={item.public_status === 1 ? "公開状態を切り替える 現在:公開中" : "公開状態を切り替える 現在:非公開中"}>
//                               <Switch
//                                 checked={item.public_status === 1}
//                                 onChange={() => handlePublicStatusChange(index)}
//                                 inputProps={{ 'aria-label': 'controlled' }}
//                               />
//                             </Tooltip>
//                           </TableCell>
//                           <TableCell>
//                             <Tooltip title={"削除します"}>
//                               <IconButton onClick={() => handleDelete(index)}>
//                                 <DeleteIcon />
//                               </IconButton>
//                             </Tooltip>
//                           </TableCell>
//                           <TableCell>
//                             <Tooltip title={"次の行にフォームを追加します"}>
//                               <IconButton onClick={() => handleAddRow(index)}>
//                                 <AddCircleOutlineIcon />
//                               </IconButton>
//                             </Tooltip>
//                           </TableCell>
//                         </>
//                       </SortableRow>
//                     ))}
//                   </SortableContext>
//                 </DndContext>
//               </TableBody>
//             </Table>
//           </TableContainer>
//           <p><button onClick={() =>modalclose()}>閉じる</button></p>
//         </div>
//       </div>
//     </div>
//   );



//   return (
//     <div>
//       {renderEditButton(TrueTitleContents[0].company_id)} {/* 編集ボタンをここに表示 */}
//       {showEdit && renderEdit}
//       <TableContainer component={Paper} className="tableContainer">
//         <Table className="Table">
//           <TableHead>
//             <TableRow>
//               <TableCell style={{ fontWeight: 'bold', width: '40%' }}>タイトル</TableCell>
//               <TableCell style={{ fontWeight: 'bold', width: '150%' }}>内容</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {TrueTitleContents.map((item) => (
//               <TableRow key={item.id}>
//                 <TableCell>{item.title}</TableCell>
//                 <TableCell>{item.contents}</TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </div>
//   );
// });

// PostCard.displayName = "PostCard";

// PostCard.propTypes = {
//   post: PropTypes.shape({
//     title_contents: PropTypes.arrayOf(
//       PropTypes.shape({
//         id: PropTypes.number.isRequired,
//         title: PropTypes.string.isRequired,
//         contents: PropTypes.string.isRequired,
//         public_status: PropTypes.number.isRequired,
//         company_id: PropTypes.string.isRequired,
//       })
//     ).isRequired,
//   }).isRequired,
// };

// export default PostCard;