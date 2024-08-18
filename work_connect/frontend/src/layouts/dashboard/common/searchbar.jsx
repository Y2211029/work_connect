import { useLocation } from "react-router-dom";
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
import GetTagList from "src/components/tag/GetTagList";
import { MyContext } from "src/layouts/dashboard/index";
import { AllItemsContext } from "src/layouts/dashboard/index";
// import { PageContext } from "src/layouts/dashboard/index";
// import { SearchCheckContext } from "src/layouts/dashboard/index";
// import { SortOption } from "src/layouts/dashboard/index";

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
  const [PathName, setPathName] = useState("");
  // Topページであれば検索ボタンを非表示にする。
  const Display = useContext(MyContext);
  // AllItemsContextから状態を取得
  const { AllItems, setAllItems } = useContext(AllItemsContext);
  const { Page, IsSearch, ResetItem, sortOption } = AllItems;

  // 検索結果を反映させるためのContext
  // const { setDataList } = useContext(DataListContext);
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
    hobby: [],
    other: [],
    graduation_year: [],
    desired_occupation: [],
    desired_work_region: [],
    selected_occupation: [],
    prefecture: [],
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
    hobby: [],
    other: [],
    graduation_year: [],
    desired_occupation: [],
    desired_work_region: [],
    selected_occupation: [],
    prefecture: [],
  });

  const { GetTagListFunction } = GetTagList();

  const getTag = (urlIn, option) => {
    console.log("urlIn", urlIn);
    console.log("option", option);
    let optionArray = [];
    let optionArrayPromise = GetTagListFunction(urlIn);
    optionArrayPromise.then((result) => {
      console.log("result: ", result);
      result.map((value) => {
        optionArray.push({ value: value.name, label: value.name });
      });
      console.log("optionArray", optionArray);
      setOptions((prevOptions) => ({
        ...prevOptions,
        [option]: optionArray,
      }));
    });
  };

  useEffect(() => {
    console.log("options", options);
  }, [options]);

  useEffect(() => {
    setPathName(location.pathname);
    // console.log(PathName);
    // タグ一覧取得

    if (PathName == "/") {
      // 作品一覧の場合
      // console.log("aaaaaaaaaaaaaaaaaaaaaaaa");
      // 作品ジャンルのタグ一覧を取得
      getTag("work_genre", "work_genre");

      // プログラミング言語のタグ一覧を取得
      getTag("work_language", "programming_language");

      // 開発環境のタグ一覧を取得
      getTag("work_environment", "development_environment");
    } else if (PathName == "/VideoList") {
      // 動画一覧の場合
      // 動画ジャンルのタグ一覧を取得
      getTag("video_genre", "video_genre");
    } else if (PathName == "/StudentList") {
      // 学生一覧の場合
      // 希望職種のタグ一覧を取得
      getTag("desired_occupation", "desired_occupation");

      // 希望勤務地のタグ一覧を取得
      getTag("desired_work_region", "desired_work_region");

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
    } else if (PathName == "/CompanyList") {
      // 学生一覧の場合
      // 職種のタグ一覧を取得
      getTag("selected_occupation", "selected_occupation");

      // 勤務地のタグ一覧を取得
      getTag("prefecture", "prefecture");
    }
  }, [PathName]);

  // useEffect(() => {
  //   console.log("options: ", options);
  // }, [options]);

  const handleOpen = () => {
    setPathName(location.pathname);
    setOpen(!open);
  };

  const responseItems = (data) => {
    // 作品などのデータがあるとき
    if (data.length > 0) {
      setAllItems((prevItems) => ({
        ...prevItems,
        DataList: data,
        IsSearch: { ...prevItems.IsSearch, searchResultEmpty: false },
      }));
    }

    //ローディングアニメーション止めるため
    if (data.length === 0) {
      setAllItems((prevItems) => ({
        ...prevItems,
        DataList: [],
      }));
    }

    // ”検索結果0件だ”を表示するため
    if (data.length === 0 && Page === 1) {
      setAllItems((prevItems) => ({
        ...prevItems,
        IsSearch: { ...prevItems.IsSearch, searchResultEmpty: true },
      }));
    }
  };

  // Laravel側から絞り込んだ作品一覧データを取得
  async function searchSourceList() {
    try {
      if (PathName == "/") {
        // 作品一覧の場合
        // const url = `http://localhost:8000/search_work`;
        const url = `http://localhost:8000/search_work?page=${Page}&sort=${sortOption}`;
        // const url = `http://localhost:8000/search_work?page=${Page}&sort=${`;
        // console.log("searchbar : Page = ", Page);

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

        // console.log("search.response.data", response.data);

        // WorkOfList-view.jsxにデータを渡す
        const responseData = response.data;
        responseItems(responseData);
      } else if (PathName == "/VideoList") {
        // 動画一覧の場合
        const url = `http://localhost:8000/search_video?page=${Page}&sort=${sortOption}`;

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

        // videoList-view.jsxにデータを渡す
        const responseData = response.data;
        responseItems(responseData);
      } else if (PathName == "/StudentList") {
        // 学生一覧の場合
        const url = `http://localhost:8000/search_student?page=${Page}`;

        let desired_occupation = [];
        let desired_work_region = [];
        let student_programming_language = [];
        let student_development_environment = [];
        let software = [];
        let acquisition_qualification = [];
        let hobby = [];

        searchSource.desired_occupation.map((value) => {
          desired_occupation.push(value.value);
        });
        searchSource.desired_work_region.map((value) => {
          desired_work_region.push(value.value);
        });
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
            desired_occupation: desired_occupation,
            desired_work_region: desired_work_region,
            student_programming_language: student_programming_language,
            student_development_environment: student_development_environment,
            software: software,
            acquisition_qualification: acquisition_qualification,
            hobby: hobby,
          },
        });
        console.log("response.data", response.data);

        // StudentList-view.jsxにデータを渡す
        const responseData = response.data;
        responseItems(responseData);
      } else if (PathName == "/CompanyList") {
        // 学生一覧の場合
        const url = `http://localhost:8000/search_company?page=${Page}`;

        let selected_occupation = [];
        let prefecture = [];

        searchSource.selected_occupation.map((value) => {
          selected_occupation.push(value.value);
        });
        searchSource.prefecture.map((value) => {
          prefecture.push(value.value);
        });

        const response = await axios.get(url, {
          params: {
            searchText: searchSource.searchText,
            selected_occupation: selected_occupation,
            prefecture: prefecture,
          },
        });
        console.log("response.data", response.data);

        // company-view.jsxにデータを渡す
        const responseData = response.data;
        responseItems(responseData);
      } else if (PathName == "/Profile") {
        // 学生一覧の場合
        const url = `http://localhost:8000/search_company?page=${Page}`;

        let selected_occupation = [];
        let prefecture = [];

        searchSource.selected_occupation.map((value) => {
          selected_occupation.push(value.value);
        });
        searchSource.prefecture.map((value) => {
          prefecture.push(value.value);
        });

        const response = await axios.get(url, {
          params: {
            searchText: searchSource.searchText,
            selected_occupation: selected_occupation,
            prefecture: prefecture,
          },
        });
        console.log("response.data", response.data);

        // company-view.jsxにデータを渡す
        const responseData = response.data;
        responseItems(responseData);
      }
    } catch (err) {
      console.log("err:", err);
    }
  }

  // サイドバーが押されたらログインされて一番初めに表示される作品一覧の状態にするために、
  // 検索させないよう初期化する。
  useEffect(() => {
    if (ResetItem) {
      setsearchSource((prevSearchtags) => ({
        ...prevSearchtags,
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
      }));
    }
  }, [ResetItem]);

  // 検索バーを閉じる
  const handleClose = () => {
    setOpen(false);
  };

  // 空だったらtrue
  const isAllEmpty = (obj) => Object.values(obj).every((value) => value.length === 0);

  // 検索ボタンを押したとき
  const handleSearch = () => {
    setAllItems((prevItems) => ({
      ...prevItems,
      DataList: [],
      IsSearch: {
        ...prevItems.IsSearch,
        searchToggle: prevItems.IsSearch.searchToggle === 0 ? 1 : 0,
        Check: !isAllEmpty(searchSource), // Checkがfalseになることを確認
        searchResultEmpty: false,
      },
      Page: 1,
      sortOption: "orderNewPostsDate",
    }));
    // 検索バーを閉じる
    setOpen(false);
  };

  // ページが変更された時に次のデータを取得する
  useEffect(() => {
    // 検索タグが入力されているかつ、pageが変更されたて値があれば検索する
    if (IsSearch.Check && Page) {
      searchSourceList();
    }
  }, [IsSearch.Check, Page, IsSearch.searchToggle, sortOption]);

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
    setsearchSource((prevOptions) => ({
      ...prevOptions,
      [optionName]: selectedOption,
    }));
  };

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

  // 希望職種タグを操作したとき
  const handleChangeDesiredOccupation = (selectedOption) => {
    tagAction("desired_occupation", selectedOption);
  };

  // 希望勤務地タグを操作したとき
  const handleChangeDesiredWorkRegion = (selectedOption) => {
    tagAction("desired_work_region", selectedOption);
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
  // 企業の勤務地のタグを操作したとき
  const handleChangePrefecture = (selectedOption) => {
    tagAction("prefecture", selectedOption);
  };

  useEffect(() => {
    console.log("searchSource: ", searchSource);
  }, [searchSource]);

  useEffect(() => {
    console.log("options: ", options);
  }, [options]);

  // useEffect(() => {
  //   console.log("searchSource: ", searchSource);
  // }, [searchSource]);

  // useEffect(() => {
  //   console.log("options: ", options);
  // }, [options]);

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
            <div style={{ display: "" }}>
              <div style={{ display: "flex" }}>
                <Input
                  autoFocus
                  fullWidth
                  disableUnderline
                  placeholder="Search…"
                  startAdornment={
                    <InputAdornment position="start">
                      <Iconify icon="eva:search-fill" sx={{ color: "text.disabled", width: 20, height: 20 }} />
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
              {PathName === "/" ? (
                <>
                  <div style={{ display: "", marginTop: "20px", marginBottom: "10px" }}>
                    <div style={{ fontWeight: "Bold", color: "#666" }}>ジャンル</div>
                    <div style={{ color: "#444" }}>
                      <CreatableSelect
                        options={options.work_genre}
                        value={searchSource.work_genre}
                        isClearable
                        isMulti
                        onChange={handleChangeWorkGenre}
                      />
                    </div>
                  </div>
                  <div style={{ display: "", marginTop: "20px", marginBottom: "10px" }}>
                    <div style={{ fontWeight: "Bold", color: "#666" }}>プログラミング言語</div>
                    <div style={{ color: "#444" }}>
                      <CreatableSelect
                        options={options.programming_language}
                        value={searchSource.programming_language}
                        isClearable
                        isMulti
                        onChange={handleChangeProgrammingLanguage}
                      />
                    </div>
                  </div>
                  <div style={{ display: "", marginTop: "20px", marginBottom: "10px" }}>
                    <div style={{ fontWeight: "Bold", color: "#666" }}>開発環境</div>
                    <div style={{ color: "#444" }}>
                      <CreatableSelect
                        options={options.development_environment}
                        value={searchSource.development_environment}
                        isClearable
                        isMulti
                        onChange={handleChangeDevelopmentEnvironment}
                      />
                    </div>
                  </div>
                </>
              ) : PathName === "/VideoList" ? (
                <>
                  <div style={{ display: "", marginTop: "20px", marginBottom: "10px" }}>
                    <div style={{ fontWeight: "Bold", color: "#666" }}>ジャンル</div>
                    <div style={{ color: "#444" }}>
                      <CreatableSelect
                        options={options.video_genre}
                        value={searchSource.video_genre}
                        isClearable
                        isMulti
                        onChange={handleChangeVideoGenre}
                      />
                    </div>
                  </div>
                </>
              ) : PathName === "/StudentList" ? (
                <>
                  <div style={{ display: "", marginTop: "20px", marginBottom: "10px" }}>
                    <div style={{ fontWeight: "Bold", color: "#666" }}>希望職種</div>
                    <div style={{ color: "#444" }}>
                      <CreatableSelect
                        options={options.desired_occupation}
                        value={searchSource.desired_occupation}
                        isClearable
                        isMulti
                        onChange={handleChangeDesiredOccupation}
                      />
                    </div>
                  </div>
                  <div style={{ display: "", marginTop: "20px", marginBottom: "10px" }}>
                    <div style={{ fontWeight: "Bold", color: "#666" }}>希望勤務地</div>
                    <div style={{ color: "#444" }}>
                      <CreatableSelect
                        options={options.desired_work_region}
                        value={searchSource.desired_work_region}
                        isClearable
                        isMulti
                        onChange={handleChangeDesiredWorkRegion}
                      />
                    </div>
                  </div>
                  <div style={{ display: "", marginTop: "20px", marginBottom: "10px" }}>
                    <div style={{ fontWeight: "Bold", color: "#666" }}>プログラミング言語</div>
                    <div style={{ color: "#444" }}>
                      <CreatableSelect
                        options={options.student_programming_language}
                        value={searchSource.student_programming_language}
                        isClearable
                        isMulti
                        onChange={handleChangeStudentProgrammingLanguage}
                      />
                    </div>
                  </div>
                  <div style={{ display: "", marginTop: "20px", marginBottom: "10px" }}>
                    <div style={{ fontWeight: "Bold", color: "#666" }}>開発環境</div>
                    <div style={{ color: "#444" }}>
                      <CreatableSelect
                        options={options.student_development_environment}
                        value={searchSource.student_development_environment}
                        isClearable
                        isMulti
                        onChange={handleChangeStudentDevelopmentEnvironment}
                      />
                    </div>
                  </div>
                  <div style={{ display: "", marginTop: "20px", marginBottom: "10px" }}>
                    <div style={{ fontWeight: "Bold", color: "#666" }}>ソフトウェア</div>
                    <div style={{ color: "#444" }}>
                      <CreatableSelect
                        options={options.software}
                        value={searchSource.software}
                        isClearable
                        isMulti
                        onChange={handleChangeSoftware}
                      />
                    </div>
                  </div>
                  <div style={{ display: "", marginTop: "20px", marginBottom: "10px" }}>
                    <div style={{ fontWeight: "Bold", color: "#666" }}>取得資格</div>
                    <div style={{ color: "#444" }}>
                      <CreatableSelect
                        options={options.acquisition_qualification}
                        value={searchSource.acquisition_qualification}
                        isClearable
                        isMulti
                        onChange={handleChangeAcquisitionQualification}
                      />
                    </div>
                  </div>
                  <div style={{ display: "", marginTop: "20px", marginBottom: "10px" }}>
                    <div style={{ fontWeight: "Bold", color: "#666" }}>趣味</div>
                    <div style={{ color: "#444" }}>
                      <CreatableSelect
                        options={options.hobby}
                        value={searchSource.hobby}
                        isClearable
                        isMulti
                        onChange={handleChangeHobby}
                      />
                    </div>
                  </div>
                </>
              ) : PathName === "/CompanyList" ? (
                <>
                  <div style={{ display: "", marginTop: "20px", marginBottom: "10px" }}>
                    <div style={{ fontWeight: "Bold", color: "#666" }}>職種</div>
                    <div style={{ color: "#444" }}>
                      <CreatableSelect
                        options={options.selected_occupation}
                        value={searchSource.selected_occupation}
                        isClearable
                        isMulti
                        onChange={handleChangeSelectedOccupation}
                      />
                    </div>
                  </div>
                  <div style={{ display: "", marginTop: "20px", marginBottom: "10px" }}>
                    <div style={{ fontWeight: "Bold", color: "#666" }}>勤務地</div>
                    <div style={{ color: "#444" }}>
                      <CreatableSelect
                        options={options.prefecture}
                        value={searchSource.prefecture}
                        isClearable
                        isMulti
                        onChange={handleChangePrefecture}
                      />
                    </div>
                  </div>
                </>
              ) : (
                ""
              )}
            </div>
          </StyledSearchbar>
        </Slide>
      </div>
    </ClickAwayListener>
  );
}
