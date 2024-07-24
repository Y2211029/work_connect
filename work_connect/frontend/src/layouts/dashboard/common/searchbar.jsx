import { useContext, useEffect, useState } from "react";

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
import GetTagList from "../../../components/tag/GetTagList";

import { DataListContext } from "src/layouts/dashboard/index";

// ----------------------------------------------------------------------

const HEADER_MOBILE = 64;
// const HEADER_DESKTOP = 92;
const HEADER_DESKTOP = "auto";

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
  marginTop: 20,
  marginBottom: 20,
  paddingTop: 20,
  paddingBottom: 20,
}));

// ----------------------------------------------------------------------

export default function Searchbar() {

  // 検索結果を反映させるためのContext
  const {setDataList} = useContext(DataListContext);

  const [open, setOpen] = useState(false);

  const [searchWork, setSearchWork] = useState({
    work_genre: [],
    programming_language: [],
    development_environment: [],
    searchText: "",
  });

  const [options, setOptions] = useState({
    work_genre: [],
    programming_language: [],
    development_environment: [],
    searchText: "",
  });


  const { GetTagListFunction } = GetTagList();

  useEffect(()=>{
    // タグ一覧取得
    
    // 作品ジャンルのタグ一覧を取得
    let work_genre = [];
    let work_genre_promise = GetTagListFunction("genre");
    work_genre_promise.then(result => {
      result.map((value) => {
        work_genre.push({value:value.name,label:value.name});
      });
      // console.log("result: ",result);
      // console.log("tempArray: ",tempArray);
      setOptions(prevOptions => ({
        ...prevOptions,
        work_genre: work_genre
      }));
    })

    // プログラミング言語のタグ一覧を取得
    let programming_language = [];
    let programming_language_promise = GetTagListFunction("language");
    programming_language_promise.then(result => {
      result.map((value) => {
        programming_language.push({value:value.name,label:value.name});
      });
      // console.log("result: ",result);
      // console.log("tempArray: ",tempArray);
      setOptions(prevOptions => ({
        ...prevOptions,
        programming_language: programming_language
      }));
    })

    // 開発環境のタグ一覧を取得
    let development_environment = [];
    let development_environment_promise = GetTagListFunction("environment");
    development_environment_promise.then(result => {
      result.map((value) => {
        development_environment.push({value:value.name,label:value.name});
      });
      // console.log("result: ",result);
      // console.log("tempArray: ",tempArray);
      setOptions(prevOptions => ({
        ...prevOptions,
        development_environment: development_environment
      }));
    })
  },[])

  useEffect(() => {
    console.log("options: ", options);
  }, [options]);

  const handleOpen = () => {
    setOpen(!open);
  };

  // Laravel側から絞り込んだ作品一覧データを取得
  async function SearchWorkList() {
    try {
      const url = "http://localhost:8000/search_work";

      let work_genre = [];
      let programming_language = [];
      let development_environment = [];

      searchWork.work_genre.map((value) => {
        work_genre.push(value.value);
      });
      searchWork.programming_language.map((value) => {
        programming_language.push(value.value);
      });
      searchWork.development_environment.map((value) => {
        development_environment.push(value.value);
      });

      const response = await axios.get(url, {
        params: {
          work_genre: work_genre,
          programming_language: programming_language,
          development_environment: development_environment,
          searchText: searchWork.searchText,
        },
      });
      console.log("response.data", response.data);

      // WorkListItem.jsxにデータを渡す
      setDataList(response.data);
    } catch (err) {
      console.log("err:", err);
    }
  }

  // 検索バーを閉じる
  const handleClose = () => {
    setOpen(false);
  };
  
  // 検索ボタンを押したとき
  const handleSearch = () => {
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

  // 作品ジャンルのタグを操作したとき
  const handleChangeWorkGenre = (selectedOption) => {
    let tagArray = [];
    selectedOption.map((value) => {
      tagArray.push(value.value);
    });
    setSearchWork(prevOptions => ({
      ...prevOptions,
        work_genre: selectedOption
      }
    ));
  };

  // プログラミング言語のタグを操作したとき
  const handleChangeProgrammingLanguage = (selectedOption) => {
    let tagArray = [];
    selectedOption.map((value) => {
      tagArray.push(value.value);
    });
    setSearchWork(prevOptions => ({
      ...prevOptions,
        programming_language: selectedOption
      }
    ));
  };

  // 開発環境のタグを操作したとき
  const handleChangeDevelopmentEnvironment = (selectedOption) => {
    let tagArray = [];
    selectedOption.map((value) => {
      tagArray.push(value.value);
    });
    setSearchWork(prevOptions => ({
      ...prevOptions,
        development_environment: selectedOption
      }
    ));
  };

  useEffect(() => {
    console.log("searchWork: ", searchWork);
  }, [searchWork]);

  useEffect(() => {
    console.log("options: ", options);
  }, [options]);


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
            <div style={{display: ""}}>
              <div style={{display: "flex"}}>
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
                <Button variant="contained" onClick={handleSearch}>
                  Search
                </Button>
              </div>
              <div style={{display: "", marginTop: "20px", marginBottom: "10px"}}>
                <div style={{fontWeight: "Bold", color: "#666"}}>ジャンル</div>
                <div style={{color: "#444"}}>
                  <CreatableSelect options={options.work_genre} value={searchWork.work_genre} isClearable isMulti onChange={handleChangeWorkGenre}/>
                </div>
              </div>
              <div style={{display: "", marginTop: "20px", marginBottom: "10px"}}>
                <div style={{fontWeight: "Bold", color: "#666"}}>プログラミング言語</div>
                <div style={{color: "#444"}}>
                  <CreatableSelect options={options.programming_language} value={searchWork.programming_language} isClearable isMulti onChange={handleChangeProgrammingLanguage}/>
                </div>
              </div>
              <div style={{display: "", marginTop: "20px", marginBottom: "10px"}}>
                <div style={{fontWeight: "Bold", color: "#666"}}>開発環境</div>
                <div style={{color: "#444"}}>
                  <CreatableSelect options={options.development_environment} value={searchWork.development_environment} isClearable isMulti onChange={handleChangeDevelopmentEnvironment}/>
                </div>
              </div>
            </div>
          </StyledSearchbar>
        </Slide>
      </div>
    </ClickAwayListener>
  );
}
