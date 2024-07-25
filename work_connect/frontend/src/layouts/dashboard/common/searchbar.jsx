import { useContext, useEffect, useState } from "react";

import Slide from "@mui/material/Slide";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import ClickAwayListener from "@mui/material/ClickAwayListener";

import CreatableSelect from "react-select/creatable";

import { bgBlur } from "src/theme/css";

import Iconify from "src/components/iconify";

import axios from "axios";
import GetTagList from "../../../components/tag/GetTagList";
import { MyContext } from "src/layouts/dashboard/index";
import { DataListContext } from "src/layouts/dashboard/index";

import { useLocation } from "react-router-dom";

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
  const location = useLocation();

  const [PathName, setPathName] = useState('');

  // Topページであれば検索ボタンを非表示にする。
  const Display = useContext(MyContext);
  // 検索結果を反映させるためのContext
  const { setDataList } = useContext(DataListContext);

  const [open, setOpen] = useState(false);

  const [searchSource, setsearchSource] = useState({
    searchText: "",
    work_genre: [],
    programming_language: [],
    development_environment: [],
    video_genre: [],
    school_name: [],
    department_name: [],
    faculty_name: [],
    major_name: [],
    course_name: [],
    student_programming_language: [],
    student_development_environment: [],
    software: [],
    acquisition_qualification: [],
    desired_work_region: [],
    hobby: [],
    other: [],
    graduation_year: [],
    desired_occupation: [],
    selected_occupation: [],
  });

  const [options, setOptions] = useState({
    searchText: "",
    work_genre: [],
    programming_language: [],
    development_environment: [],
    video_genre: [],
    school_name: [],
    department_name: [],
    faculty_name: [],
    major_name: [],
    course_name: [],
    student_programming_language: [],
    student_development_environment: [],
    software: [],
    acquisition_qualification: [],
    desired_work_region: [],
    hobby: [],
    other: [],
    graduation_year: [],
    desired_occupation: [],
    selected_occupation: [],
  });

  const { GetTagListFunction } = GetTagList();

  const getTag = (urlIn, option) => {
    let optionArray = [];
    let optionArrayPromise = GetTagListFunction(urlIn);
    optionArrayPromise.then(result => {
      result.map((value) => {
        optionArray.push({value:value.name,label:value.name});
      });
      setOptions(prevOptions => ({
        ...prevOptions,
        [option]: optionArray
      }));
    })
  }
  
  
  useEffect(()=>{
    setPathName(location.pathname);
    console.log(PathName);
    // タグ一覧取得
    
    if (PathName == "/") { // 作品一覧の場合
      // 作品ジャンルのタグ一覧を取得
      getTag("genre", "work_genre");
    
      // プログラミング言語のタグ一覧を取得
      getTag("language", "programming_language");
      
      // 開発環境のタグ一覧を取得
      getTag("environment", "development_environment");

    } else if (PathName == "/VideoList") { // 動画一覧の場合
      // 動画ジャンルのタグ一覧を取得
      getTag("video_genre", "video_genre");
      
    } else if (PathName == "/StudentList") { // 学生一覧の場合
      // プログラミング言語のタグ一覧を取得
      getTag("student_programming_language", "student_programming_language");

      // 開発環境のタグ一覧を取得
      getTag("student_development_environment", "student_development_environment");

      // ソフトウェアのタグ一覧を取得
      getTag("software", "software");

      // 取得資格のタグ一覧を取得
      getTag("acquisition_qualification", "acquisition_qualification");

      // 趣味のタグ一覧を取得
      getTag("hobby", "hobby");

    } else if (PathName == "/CompanyList") { // 学生一覧の場合
      // プログラミング言語のタグ一覧を取得
      getTag("selected_occupation", "selected_occupation");

    }
  },[PathName])
  
  useEffect(() => {
    console.log("options: ", options);
  }, [options]);

  const handleOpen = () => {
    setPathName(location.pathname);
    setOpen(!open);
  };

  // Laravel側から絞り込んだ作品一覧データを取得
  async function searchSourceList() {
    try {
      if (PathName == "/") { // 作品一覧の場合
        const url = "http://localhost:8000/search_work";

        let work_genre = [];
        let programming_language = [];
        let development_environment = [];

        searchSource.work_genre.map((value) => {
          work_genre.push(value.value);
        });
        searchSource.programming_language.map((value) => {
          programming_language.push(value.value);
        });
        searchSource.development_environment.map((value) => {
          development_environment.push(value.value);
        });

        const response = await axios.get(url, {
          params: {
            searchText: searchSource.searchText,
            work_genre: work_genre,
            programming_language: programming_language,
            development_environment: development_environment,
          },
        });
        console.log("response.data", response.data);

        // WorkListItem.jsxにデータを渡す
        setDataList(response.data);
      } else if (PathName == "/VideoList") { // 動画一覧の場合
        const url = "http://localhost:8000/search_video";

        let video_genre = [];

        searchSource.video_genre.map((value) => {
          video_genre.push(value.value);
        });

        const response = await axios.get(url, {
          params: {
            searchText: searchSource.searchText,
            video_genre: video_genre,
          },
        });
        console.log("response.data", response.data);

        // VideoListItem.jsxにデータを渡す
        setDataList(response.data);
      } else if (PathName == "/StudentList") { // 学生一覧の場合
        const url = "http://localhost:8000/search_student";

        let student_programming_language = [];
        let student_development_environment = [];
        let software = [];
        let acquisition_qualification = [];
        let hobby = [];

        searchSource.student_programming_language.map((value) => {
          student_programming_language.push(value.value);
        });
        searchSource.student_development_environment.map((value) => {
          student_development_environment.push(value.value);
        });
        searchSource.software.map((value) => {
          software.push(value.value);
        });
        searchSource.acquisition_qualification.map((value) => {
          acquisition_qualification.push(value.value);
        });
        searchSource.hobby.map((value) => {
          hobby.push(value.value);
        });

        const response = await axios.get(url, {
          params: {
            searchText: searchSource.searchText,
            student_programming_language: student_programming_language,
            student_development_environment: student_development_environment,
            software: software,
            acquisition_qualification: acquisition_qualification,
            hobby: hobby,
          },
        });
        console.log("response.data", response.data);

        // StudentListItem.jsxにデータを渡す
        setDataList(response.data);
      } else if (PathName == "/CompanyList") { // 学生一覧の場合
        const url = "http://localhost:8000/search_company";

        let selected_occupation = [];

        searchSource.selected_occupation.map((value) => {
          selected_occupation.push(value.value);
        });

        const response = await axios.get(url, {
          params: {
            searchText: searchSource.searchText,
            selected_occupation: selected_occupation,
          },
        });
        console.log("response.data", response.data);

        // StudentListItem.jsxにデータを渡す
        setDataList(response.data);
      }
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
    searchSourceList();
    setOpen(false);
  };

  // 検索欄に入力したとき
  const handleChangeText = (e) => {
    // console.log("e.target.value", e.target.value);
    setsearchSource({
      ...searchSource,
      searchText: e.target.value,
    });
  };

  const tagAction = (optionName, selectedOption) => {
    let tagArray = [];
    selectedOption.map((value) => {
      tagArray.push(value.value);
    });
    setsearchSource(prevOptions => ({
      ...prevOptions,
        [optionName]: selectedOption
    }));
  }

  // 作品ジャンルのタグを操作したとき
  const handleChangeWorkGenre = (selectedOption) => {
    tagAction("work_genre", selectedOption);
  };
  
  // 作品のプログラミング言語のタグを操作したとき
  const handleChangeProgrammingLanguage = (selectedOption) => {
    tagAction("programming_language", selectedOption);
  };
  
  // 作品の開発環境のタグを操作したとき
  const handleChangeDevelopmentEnvironment = (selectedOption) => {
    tagAction("development_environment", selectedOption);
  };
  
  // 動画ジャンルのタグを操作したとき
  const handleChangeVideoGenre = (selectedOption) => {
    tagAction("video_genre", selectedOption);
  };
  
  // 学生のプログラミング言語のタグを操作したとき
  const handleChangeStudentProgrammingLanguage = (selectedOption) => {
    tagAction("student_programming_language", selectedOption);
  };

  // 学生の開発環境のタグを操作したとき
  const handleChangeStudentDevelopmentEnvironment = (selectedOption) => {
    tagAction("student_development_environment", selectedOption);
  };

  // ソフトウェアのタグを操作したとき
  const handleChangeSoftware = (selectedOption) => {
    tagAction("software", selectedOption);
  };

  // 取得資格のタグを操作したとき
  const handleChangeAcquisitionQualification = (selectedOption) => {
    tagAction("acquisition_qualification", selectedOption);
  };

  // 趣味のタグを操作したとき
  const handleChangeHobby = (selectedOption) => {
    tagAction("hobby", selectedOption);
  };

  // 企業の勤務地のタグを操作したとき
  const handleChangeSelectedOccupation = (selectedOption) => {
    tagAction("selected_occupation", selectedOption);
  };

  useEffect(() => {
    console.log("searchSource: ", searchSource);
  }, [searchSource]);

  useEffect(() => {
    console.log("options: ", options);
  }, [options]);


  return (
    <ClickAwayListener onClickAway={handleClose}>
      <div>
        {!open && (
          <IconButton onClick={handleOpen} style={{ display: Display }}>
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
                  value={searchSource.searchText}
                  onChange={handleChangeText}
                />
                <Button variant="contained" onClick={handleSearch}>
                  Search
                </Button>
              </div>
              {PathName === "/"  ?
              <>
              <div style={{display: "", marginTop: "20px", marginBottom: "10px"}}>
                <div style={{fontWeight: "Bold", color: "#666"}}>ジャンル</div>
                <div style={{color: "#444"}}>
                  <CreatableSelect options={options.work_genre} value={searchSource.work_genre} isClearable isMulti onChange={handleChangeWorkGenre}/>
                </div>
              </div>
              <div style={{display: "", marginTop: "20px", marginBottom: "10px"}}>
                <div style={{fontWeight: "Bold", color: "#666"}}>プログラミング言語</div>
                <div style={{color: "#444"}}>
                  <CreatableSelect options={options.programming_language} value={searchSource.programming_language} isClearable isMulti onChange={handleChangeProgrammingLanguage}/>
                </div>
              </div>
              <div style={{display: "", marginTop: "20px", marginBottom: "10px"}}>
                <div style={{fontWeight: "Bold", color: "#666"}}>開発環境</div>
                <div style={{color: "#444"}}>
                  <CreatableSelect options={options.development_environment} value={searchSource.development_environment} isClearable isMulti onChange={handleChangeDevelopmentEnvironment}/>
                </div>
              </div>
              </> : PathName === "/VideoList" ?
              <>
              <div style={{display: "", marginTop: "20px", marginBottom: "10px"}}>
                <div style={{fontWeight: "Bold", color: "#666"}}>ジャンル</div>
                <div style={{color: "#444"}}>
                  <CreatableSelect options={options.video_genre} value={searchSource.video_genre} isClearable isMulti onChange={handleChangeVideoGenre}/>
                </div>
              </div>
              </> : PathName === "/StudentList" ?
              <>
              <div style={{display: "", marginTop: "20px", marginBottom: "10px"}}>
                <div style={{fontWeight: "Bold", color: "#666"}}>プログラミング言語</div>
                <div style={{color: "#444"}}>
                  <CreatableSelect options={options.student_programming_language} value={searchSource.student_programming_language} isClearable isMulti onChange={handleChangeStudentProgrammingLanguage}/>
                </div>
              </div>
              <div style={{display: "", marginTop: "20px", marginBottom: "10px"}}>
                <div style={{fontWeight: "Bold", color: "#666"}}>開発環境</div>
                <div style={{color: "#444"}}>
                  <CreatableSelect options={options.student_development_environment} value={searchSource.student_development_environment} isClearable isMulti onChange={handleChangeStudentDevelopmentEnvironment}/>
                </div>
              </div>
              <div style={{display: "", marginTop: "20px", marginBottom: "10px"}}>
                <div style={{fontWeight: "Bold", color: "#666"}}>ソフトウェア</div>
                <div style={{color: "#444"}}>
                  <CreatableSelect options={options.software} value={searchSource.software} isClearable isMulti onChange={handleChangeSoftware}/>
                </div>
              </div>
              <div style={{display: "", marginTop: "20px", marginBottom: "10px"}}>
                <div style={{fontWeight: "Bold", color: "#666"}}>取得資格</div>
                <div style={{color: "#444"}}>
                  <CreatableSelect options={options.acquisition_qualification} value={searchSource.acquisition_qualification} isClearable isMulti onChange={handleChangeAcquisitionQualification}/>
                </div>
              </div>
              <div style={{display: "", marginTop: "20px", marginBottom: "10px"}}>
                <div style={{fontWeight: "Bold", color: "#666"}}>趣味</div>
                <div style={{color: "#444"}}>
                  <CreatableSelect options={options.hobby} value={searchSource.hobby} isClearable isMulti onChange={handleChangeHobby}/>
                </div>
              </div>
              </> : PathName === "/CompanyList" ?
              <>
              <div style={{display: "", marginTop: "20px", marginBottom: "10px"}}>
                <div style={{fontWeight: "Bold", color: "#666"}}>職種</div>
                <div style={{color: "#444"}}>
                  <CreatableSelect options={options.selected_occupation} value={searchSource.selected_occupation} isClearable isMulti onChange={handleChangeSelectedOccupation}/>
                </div>
              </div>
              </> : ""
              }
            </div>
          </StyledSearchbar>
        </Slide>
      </div>
    </ClickAwayListener>
  );
}
