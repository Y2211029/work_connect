import { useState, useEffect, useRef, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditNoteIcon from "@mui/icons-material/EditNote";
import Tooltip from "@mui/material/Tooltip";
import Popover from "@mui/material/Popover";
import IconButton from "@mui/material/IconButton";
import { DeleteIdContext } from "src/layouts/dashboard/index";

import axios from "axios";

const EditButtons = ({ deleteId }) => {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef(null); // ボタンの参照を取得
  const navigate = useNavigate();
  const { setDeleteId } = useContext(DeleteIdContext);
  const handleGlobalClick = (e) => {
    // ボタン外をクリックした場合に閉じる
    if (buttonRef.current && !buttonRef.current.contains(e.target)) {
      setOpen(false);
    }
  };

  // グローバルクリックイベントを管理
  useEffect(() => {
    if (open) {
      document.addEventListener("click", handleGlobalClick);
    } else {
      document.removeEventListener("click", handleGlobalClick);
    }

    return () => {
      // クリーンアップ
      document.removeEventListener("click", handleGlobalClick);
    };
  }, [open]);

  const useQueryParams = () => {
    const location = useLocation();
    return new URLSearchParams(location.search);
  };
  const queryParams = useQueryParams();

  const handleButtonClick = async (e, action) => {
    e.preventDefault(); // リンク遷移を防止
    const page = queryParams.get("page");
    if (action === "edit") {
      if (page === "work") {
        navigate(`/WorkEdit/${deleteId}`); // 作品編集
      } else if (page === "movie") {
        navigate(`/VideoEdit/${deleteId}`); // 作品編集
      }
    } else if (action === "delete") {
      const confirmed = window.confirm("本当に削除しますか？");

      if (confirmed) {
        try {
          if (page === "work") {
            await axios.post(`http://localhost:8000/work_delete/${deleteId}`);
          } else if (page === "movie") {
            await axios.post(`http://localhost:8000/video_delete/${deleteId}`);
          }
          setDeleteId(deleteId);
          alert("削除しました");
          // window.location.reload();
        } catch (error) {
          alert("削除に失敗しました");
          console.error(error);
        }
      }
    }
  };

  return (
    <>
      <div ref={buttonRef}>
        <Tooltip title="編集">
          <IconButton onClick={() => setOpen(!open)}>
            <MoreVertIcon color="action" />
          </IconButton>
        </Tooltip>
        <Popover
          open={open} // Popoverの開閉状態
          anchorEl={buttonRef.current} // ボタンに基づいてPopoverを表示
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "center",
            horizontal: "right",
          }}
          PaperProps={{
            sx: {
              p: 0,
              mt: 1,
              ml: 0.75,
            },
          }}
        >
          <Tooltip title="編集">
            <Button onClick={(e) => handleButtonClick(e, "edit")}>
              <EditNoteIcon color="action" />
            </Button>
          </Tooltip>
          <Tooltip title="削除">
            <Button onClick={(e) => handleButtonClick(e, "delete")}>
              <DeleteIcon sx={{ color: "red" }} />
            </Button>
          </Tooltip>
        </Popover>
      </div>
    </>
  );
};

EditButtons.propTypes = {
  deleteId: PropTypes.string.isRequired,
};

export default EditButtons;
