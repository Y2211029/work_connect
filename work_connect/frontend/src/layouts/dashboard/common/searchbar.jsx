import { useState } from "react";

import Slide from "@mui/material/Slide";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import ClickAwayListener from "@mui/material/ClickAwayListener";

import { bgBlur } from "src/theme/css";

import Iconify from "src/components/iconify";

import axios from "axios";

// ----------------------------------------------------------------------

const HEADER_MOBILE = 64;
const HEADER_DESKTOP = 92;

const StyledSearchbar = styled("div")(({ theme }) => ({
  ...bgBlur({
    color: theme.palette.background.default,
  }),
  top: 0,
  left: 0,
  zIndex: 99,
  width: "100%",
  display: "flex",
  position: "absolute",
  alignItems: "center",
  height: HEADER_MOBILE,
  padding: theme.spacing(0, 3),
  boxShadow: theme.customShadows.z8,
  [theme.breakpoints.up("md")]: {
    height: HEADER_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));

// ----------------------------------------------------------------------

export default function Searchbar() {
  const [open, setOpen] = useState(false);
  const [searchWork, setSearchWork] = useState({
    programming_language: "",
  });

  const handleOpen = () => {
    setOpen(!open);
  };

  // Laravel側から絞り込んだ作品一覧データを取得
  async function SearchWorkList() {
    try {
      const url = "http://localhost:8000/search_work";
      // const programmingLanguageArray = ['PHP', 'Java'];
      const programmingLanguageArray = searchWork.programming_language.split(",");
      const response = await axios.get(url, {
        params: {
          programming_language: programmingLanguageArray,
          development_environment: ["XAMPP", "MySQL"]
        },
      });
      console.log("response.data", response.data);
    } catch (err) {
      console.log("err:", err);
    }
  }

  // 検索ボタンを押したとき
  const handleClose = () => {
    SearchWorkList();
    setOpen(false);
  };

  // 検索欄に入力したとき
  const handleChange = (e) => {
    // console.log("e.target.value", e.target.value);
    setSearchWork(
      {
        ...searchWork,
        programming_language: e.target.value
      }
    );
  };



  return (
    <ClickAwayListener onClickAway={handleClose}>
      <div>
        {!open && (
          <IconButton onClick={handleOpen}>
            <Iconify icon="eva:search-fill" />
          </IconButton>
        )}

        <Slide direction="down" in={open} mountOnEnter unmountOnExit>
          <StyledSearchbar>
            <Input
              autoFocus
              fullWidth
              disableUnderline
              placeholder="Search…"
              startAdornment={
                <InputAdornment position="start">
                  <Iconify
                    icon="eva:search-fill"
                    sx={{ color: "text.disabled", width: 20, height: 20 }}
                  />
                </InputAdornment>
              }
              sx={{ mr: 1, fontWeight: "fontWeightBold" }}
              onChange={handleChange}
            />
            <Button variant="contained" onClick={handleClose}>
              Search
            </Button>
          </StyledSearchbar>
        </Slide>
      </div>
    </ClickAwayListener>
  );
}
