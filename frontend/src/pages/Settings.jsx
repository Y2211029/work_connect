import { useState } from 'react';
import PropTypes from 'prop-types';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { useSortable, SortableContext, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import Box from '@mui/material/Box';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import ColorPicker from './ColorPicker';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import PinterestIcon from '@mui/icons-material/Pinterest';
import RedditIcon from '@mui/icons-material/Reddit';
import YouTubeIcon from '@mui/icons-material/YouTube';
import FacebookIcon from '@mui/icons-material/Facebook';
import AppsIcon from '@mui/icons-material/Apps';

//ファイルから画像をインポート
import TikTokIcon from '../assets/sns-icons/TikTok_Icon_Black_Circle.png';
import noteIcon from '../assets/sns-icons/logo.png';

import './setting.css';

const Settings = () => {
  const [rows, setRows] = useState([
    [
      <InstagramIcon key="instagram" />,
      'Instagram',
      <input type="text" key="Instagram"></input>,
      <div className="toggle_button" key="toggle_button">
        <input id="toggle" className="toggle_input" type='checkbox' />
        <label htmlFor="toggle" className="toggle_label" />
      </div>
    ],
    [<XIcon key="X" />, 'X'],
    [<GitHubIcon key="GitHub" />, 'GitHub'],
    [<PinterestIcon key="Pinterest" />, 'Pinterest'],
    [<YouTubeIcon key="YouTube" />, 'YouTube'],
    [<FacebookIcon key="Facebook" />, 'Facebook'],
    [<LinkedInIcon key="LinkedIn" />, 'LinkedIn'],
    [<RedditIcon key="Reddit" />, 'Reddit'],
    [<img src={TikTokIcon} alt="TikTok" key="TikTok" />, 'TikTok'],
    [<img src={noteIcon} alt="note" key="note" />, 'note']

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
        <td {...listeners}>
          <Box
            ref={setActivatorNodeRef}
            sx={{
              width: "20px",
              justifyContent: "center",
              display: "flex",
              verticalAlign: "middle",
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
    id: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element,
    ]).isRequired,
    children: PropTypes.node.isRequired,
  };

  const [IconModal, setIconShow] = useState(false);

  const sns_icon_toggle = () => {
    setIconShow(!IconModal); // 現在の状態の反転
  }

  return (
    <div className="setting">
      <p>色を設定する</p>
      <ColorPicker />

      <p>アプリケーションを登録する</p>

      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={rows.map(row => row[0])} strategy={verticalListSortingStrategy}>
          <table className="information_table">
            <thead>
              <tr>
                <th></th> {/* For the drag handle column */}
                <th>アイコン</th>
                <th>SNS</th>
                <th>URL</th>
                <th>公開状態</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <SortableRow key={row[0]} id={row[0]}>
                  {row.map((column, colIndex) => (
                    <td key={colIndex}>{column}</td>
                  ))}
                </SortableRow>
              ))}
            </tbody>
          </table>
        </SortableContext>
      </DndContext>

      <p>アプリ一覧を開く</p>
      <AppsIcon onClick={sns_icon_toggle} />


      {/* モーダル */}
      {IconModal && (
        <div className="modal">
          <div className="modal-content">
            <InstagramIcon />
            <XIcon />
            <GitHubIcon />
            <LinkedInIcon />
            <PinterestIcon />
            <RedditIcon />
            <YouTubeIcon />
            <FacebookIcon />
            <img src={TikTokIcon} alt="TikTok" />
            <img src={noteIcon} alt="note" />
          </div>
        </div>
      )}

    </div>
  );
};

export default Settings;
