import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditNoteIcon from "@mui/icons-material/EditNote";
import Tooltip from "@mui/material/Tooltip";
import Popover from "@mui/material/Popover";
import IconButton from "@mui/material/IconButton";

const EditButtons = ({ workId, videoId }) => {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef(null); // ボタンの参照を取得
  const navigate = useNavigate();

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

  const handleButtonClick = (e, action) => {
    e.preventDefault(); // リンク遷移を防止
    const page = queryParams.get("page");
    if (action === "edit") {
      if (page === "work") {
        navigate(`/WorkEdit/${workId}`); // 作品編集
      } else if(page === "movie") {
        navigate(`/VideoEdit/${videoId}`); // 作品編集
      }
    } else if (action === "delete") {
      navigate("/VideoList"); // 削除
    }
  };

  return (
    <>
      <div className="button-container" ref={buttonRef}>
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
  workId: PropTypes.string.isRequired,
  videoId: PropTypes.string.isRequired,
};

export default EditButtons;