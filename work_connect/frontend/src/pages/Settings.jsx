import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { useSortable, SortableContext, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import Box from '@mui/material/Box';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import axios from 'axios';
import './setting.css';
import { Link } from "react-router-dom";

const Settings = () => {
  const [rows, setRows] = useState([]);
  const [sessionId, setSessionId] = useState(null);
  const [companyInformation, setCompanyInformation] = useState([]);

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const dataString = sessionStorage.getItem("accountData");
    if (dataString) {
      const dataObject = JSON.parse(dataString);
      if (dataObject) {
        setSessionId(dataObject.id);
      }
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (sessionId) {
        try {
          const response = await axios.get(
            `http://localhost:8000/setting_company_information/${sessionId}`
          );
          console.log(response.data);
          setCompanyInformation(response.data.company_information);
        } catch (error) {
          console.error("Error fetching data!", error);
        }
      }
    };
    fetchData();
  }, [sessionId]);

  useEffect(() => {
    if (companyInformation) {
      const set_information_data = () => {
        setRows(companyInformation.map(info => ({
          id: `row${info.id}`, // Assuming `info.id` is a unique identifier
          title: info.title,
          contents: info.contents,
          public_status: info.public_status,
        })));
      };

      set_information_data();
    }
  }, [companyInformation]); // Add companyInformation as a dependency

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = rows.findIndex(row => row.id === active.id);
      const newIndex = rows.findIndex(row => row.id === over.id);

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
        <td {...listeners}>
          <Box
            ref={setActivatorNodeRef}
            sx={{
              width: '20px',
              justifyContent: 'center',
              display: 'flex',
              verticalAlign: 'middle',
              cursor: isDragging ? 'grabbing' : 'grab',
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
    id: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]).isRequired,
    children: PropTypes.arrayOf(PropTypes.element).isRequired,
  };

  const ChangeToggle = async (e, rowId) => {
    const newStatus = e.target.checked ? 1 : 0;
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.id === rowId ? { ...row, public_status: newStatus } : row
      )
    );

    const row = rows.find(r => r.id === rowId);
    if (row) {
      console.log(`Title: ${row.title}, Contents: ${row.contents}, Number: ${row.id}`);
      console.log(row);
      try {
        const response = await axios.post(
          `http://localhost:8000/company_information/${sessionId}`,
          {
            title: row.title,
            contents: row.contents,
            row_number: row.id.replace('row', ''), // Convert "row1" to "1"
            public_status: newStatus,
          }
        );
        console.log(response.data);
      } catch (error) {
        console.error("Error sending data!", error);
      }
    }
  };

  // フォーカス外したときに保存
  const handleInputBlur = async (e, rowId, inputName) => {
    const value = e.target.value;

    setRows((prevRows) =>
      prevRows.map((row) =>
        row.id === rowId ? { ...row, [inputName]: value } : row
      )
    );

    // 入力が空の場合にエラーメッセージを設定
    if (!value) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [rowId]: { ...prevErrors[rowId], [inputName]: 'このフィールドは必須です' },
      }));
    } else {
      setErrors((prevErrors) => {
        const { [inputName]: restErrors } = prevErrors[rowId] || {};
        return {
          ...prevErrors,
          [rowId]: restErrors,
        };
      });

      // 入力内容が変更されたときにデータを送信
      const row = rows.find(r => r.id === rowId);
      if (row) {
        try {
          const response = await axios.post(
            `http://localhost:8000/company_information/${sessionId}`,
            {
              ...(inputName === "title" && { title: value }),
              ...(inputName === "contents" && { contents: value }),
              row_number: row.id.replace('row', ''), // Convert "row1" to "1"
              public_status: row.public_status,
            }
          );
          console.log(response.data);
        } catch (error) {
          console.error("Error sending data!", error);
        }
      }
    }
  };

  const addNewRow = () => {
    const newRowId = `row${rows.length + 1}`;
    const newRow = {
      id: newRowId,
      title: '新規タイトル',
      contents: '新規内容',
      public_status: 0,
    };
    setRows((prevRows) => [...prevRows, newRow]); // 新しい行を配列の最後に追加
  };

  return (
    <div className="setting">

      <div>
        <Link to={`/Settings/ChangeEmail`}>メールアドレス変更</Link>
      </div>

      <p>企業の詳細な情報</p>

      <p onClick={addNewRow} style={{ cursor: 'pointer', color: 'blue' }}>
        企業情報を追加する
      </p>

      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={rows.map(row => row.id)} strategy={verticalListSortingStrategy}>
          <table className="company_information_table">
            <thead>
              <tr>
                <th></th> {/* This is where you should place the drag handle */}
                <th>企業情報</th>
                <th>内容</th>
                <th>公開状態</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <SortableRow key={row.id} id={row.id}>
                  <td>
                    <input
                      type="text"
                      defaultValue={row.title}
                      onBlur={(e) => handleInputBlur(e, row.id, 'title')}
                      placeholder="タイトル"
                    />
                    {errors[row.id]?.title && (
                      <span className="error">{errors[row.id].title}</span>
                    )}
                  </td>
                  <td>
                    <input
                      type="text"
                      defaultValue={row.contents}
                      onBlur={(e) => handleInputBlur(e, row.id, 'contents')}
                      placeholder="内容"
                    />
                    {errors[row.id]?.contents && (
                      <span className="error">{errors[row.id].contents}</span>
                    )}
                  </td>
                  <td>
                    <div className="toggle_button">
                      <input
                        id={`toggle_${row.id}`}
                        className="toggle_input"
                        type="checkbox"
                        checked={row.public_status === 1}
                        onChange={(e) => ChangeToggle(e, row.id)}
                      />
                      <label htmlFor={`toggle_${row.id}`} className="toggle_label" />
                    </div>
                  </td>
                </SortableRow>
              ))}
            </tbody>
          </table>
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default Settings;
