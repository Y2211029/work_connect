import { useState } from "react";

import Slide from "@mui/material/Slide";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import ClickAwayListener from "@mui/material/ClickAwayListener";

import CreatableSelect from 'react-select/creatable';

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
    work_genre: "",
    programming_language: "",
    development_environment: "",
    searchText: "",
  });

  const [options, setOptions] = useState({
    work_genre: "",
    programming_language: "",
    development_environment: "",
    searchText: "",
  });

  // プログラミング言語のタグ一覧を取得
  useEffect(()=>{
    async function WorkGenreFunction() {
      try {
        const url = 'http://localhost:8000/get_language_tag';

        // Laravel側から企業一覧データを取得
        const response = await axios.get(url, {
          params: {},
        });

        // response.dataは配列の中にオブジェクトがある形になっています
        // console.log("response.data:", response.data);

        // 希望職業、希望勤務地、取得資格、プログラミング言語、開発環境、ソフトウェア、趣味、その他
        // はタグのため、カンマ区切りの文字列を配列に変換する

        const responseData = response.data;
        const WorkGenreArray = [];
        console.log(responseData);
        responseData.map((value) => {
          WorkGenreArray.push({value:value.name,label:value.name});
        });
        setOptions(WorkGenreArray);
        console.log(WorkGenreArray);
        console.log("CompanyListObject:", response.data);
      } catch (err) {
        console.log("err:", err);
      }
    }
    WorkGenreFunction();
  },[])

  const handleOpen = () => {
    setOpen(!open);
  };

  // Laravel側から絞り込んだ作品一覧データを取得
  async function SearchWorkList() {
    try {
      const url = "http://localhost:8000/search_work";
      // const programmingLanguageArray = ['PHP', 'Java'];
      const work_genre_array = searchWork.work_genre.split(",");
      const programming_language_array = searchWork.programming_language.split(",");
      const development_environment_array = searchWork.development_environment.split(",");
      const response = await axios.get(url, {
        params: {
          work_genre: work_genre_array,
          programming_language: programming_language_array,
          development_environment: development_environment_array,
          searchText: searchWork.searchText,
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
  const handleChangeText = (e) => {
    // console.log("e.target.value", e.target.value);
    setSearchWork(
      {
        ...searchWork,
        searchText: e.target.value
      }
    );
  };

  // プログラミング言語のタグを操作したとき
  const handleChangeProgrammingLanguage = (selectedOption) => {
    // console.log("e.target.value", e.target.value);
    setSearchWork(
      {
        ...searchWork,
        programming_language: selectedOption
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
              value={searchWork.searchText}
              onChange={handleChangeText}
            />
            <Button variant="contained" onClick={handleClose}>
              Search
            </Button>
          </StyledSearchbar>
          <div>プログラミング言語</div>
          <CreatableSelect options={options.programming_language} isClearable isMulti onChange={handleChangeProgrammingLanguage}/>
        </Slide>
      </div>
    </ClickAwayListener>
  );
}
