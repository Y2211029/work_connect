import React, { useContext, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { ColorRing } from "react-loader-spinner";
import axios from "axios";
import PropTypes from "prop-types";

import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import { useIntersection } from "src/routes/hooks/use-intersection";
import { AllItemsContext } from "src/layouts/dashboard";
import PostCard from "./post-card";
import PostSort from "./post-sort";

const MemoizedPostCard = React.memo(PostCard);

const setting = {
  rootMargin: "40px",
};

const WorkOfList = ({ ParamUserName }) => {
  const location = useLocation();
  const prevLocation = useRef(location);
  const { AllItems, setAllItems } = useContext(AllItemsContext);
  const { IsLoading, IsSearch, Page, DataList, sortOption } = AllItems;
  const [students, setStudents] = useState([]);
  const [isIntersecting, ref] = useIntersection(setting);
  const [isLoadItem, setIsLoadItem] = useState(false);
  const [isLoadItemColorLing, setIsLoadItemColorLing] = useState(false);
  const [noDataMessage, setNoDataMessage] = useState(null);

  useEffect(() => {
    const handlePopState = () => {
      if (location.pathname === prevLocation.current.pathname) {
        alert("ブラウザバックが検知されました");
      }
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [location]);

  useEffect(() => {
    prevLocation.current = location;
  }, [location]);

  // 並べ替え
  const handleSortChange = (event) => {
    const newValue = event.target.value;
    setAllItems((prevItems) => ({
      ...prevItems,
      IsLoading: true,
      Page: 1,
      sortOption: newValue,
    }));
    setStudents([]);
    setNoDataMessage(null);
  };

  useEffect(() => {
    setIsLoadItem(IsLoading);
  }, [IsLoading]);

  // スクロールしたら次のデータを取得
  useEffect(() => {
    if (isIntersecting) {
      setIsLoadItemColorLing(true);
      setAllItems((prevItems) => ({
        ...prevItems,
        Page: prevItems.Page + 1,
      }));
    }
  }, [isIntersecting, setAllItems]);

  // 検索時にsetWorkOfListをリセット
  useEffect(() => {
    if (IsSearch.Check) {
      setStudents([]);
      setNoDataMessage(null);
    }
  }, [IsSearch.searchToggle, IsSearch.Check]);

  useEffect(() => {
    return () => {
      setAllItems((prevItems) => ({
        ...prevItems,
        sortOption: "orderNewPostsDate", // 並び替えを新しい順にリセット
      }));
    };
  }, [location.pathname]);

  // 学生データを取得
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/get_work_list`, {
          params: { page: Page, sort: sortOption, userName: ParamUserName },
        });

        if (response.data.message === "0件です。") {
          setStudents([]);
          setNoDataMessage("0件です。");
        } else if (response.data.count > 0) {
          console.log("WorkOfList - response.data.list", response.data.list);
          setStudents((prevStudents) => {
            const newStudents = response.data.list.filter((newStudent) => !prevStudents.some((works) => works.work_id === newStudent.work_id));

            return [...prevStudents, ...newStudents];
          });

          setNoDataMessage(null);
        } else {
          if (Page === 1) {
            setStudents([]);
          }
        }
        setIsLoadItem(false);
        setIsLoadItemColorLing(false);
      } catch (error) {
        console.error("データ取得中にエラーが発生しました:", error);
        setIsLoadItem(false);
        setIsLoadItemColorLing(false);
        setNoDataMessage("エラーが発生しました。");
      }
    };

    console.log("検索結果:VideoOfList:", DataList);
    if (IsSearch.Check) {
      if (DataList) {
        if (DataList.message === "0件です。") {
          setStudents([]);
          setNoDataMessage(DataList.message);
        } else if (DataList.list) {
          setStudents((prevStudents) => {
            const newStudents = DataList.list.filter((newStudent) => !prevStudents.some((works) => works.work_id === newStudent.work_id));
            return [...prevStudents, ...newStudents];
          });
          setNoDataMessage(null);
        }
      }

      setAllItems((prevItems) => ({
        ...prevItems,
        IsLoading: false,
      }));
      setIsLoadItemColorLing(false);
    } else {
      if (Page === 1) {
        setIsLoadItem(true);
      }
      fetchStudents();
    }
    return () => {
      setAllItems((prev) => ({
        ...prev,
        Page: 1,
      }));
      console.log("WorkOfList unmount");
    };
  }, [IsSearch.Check, Page, DataList, sortOption, ParamUserName, setAllItems]);

  // リスト描画のメモ化
  const renderedStudents = students.map((works, index) => (
    <MemoizedPostCard ref={index === students.length - 1 ? ref : null} key={`${works.work_id} - ${index}`} works={works} />
  ));

  useEffect(() => {
    console.log("WorkOfList", students);
  }, [students]);

  return (
    <>
      {isLoadItem && (
        <ColorRing
          visible={true}
          height="100"
          width="100"
          ariaLabel="color-ring-loading"
          wrapperStyle={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
          wrapperClass="custom-color-ring-wrapper"
          colors={["#41a4ff", "#FFFFFF", "#41a4ff", "#41a4ff", "#FFFFFF"]}
          style={{ flexDirection: "column" }}
        />
      )}
      <div className="list-view-Container">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h5">{ParamUserName != undefined ? ParamUserName + "の" : ""}作品一覧</Typography>
        </Stack>
        {IsSearch.searchResultEmpty !== true && (
          <Stack mb={5} direction="row" alignItems="center" justifyContent="flex-end">
            <PostSort
              options={[
                { value: "orderNewPostsDate", label: "投稿日が新しい順" },
                { value: "orderOldPostsDate", label: "投稿日が古い順" },
              ]}
              sortOption={sortOption}
              onSort={handleSortChange}
            />
          </Stack>
        )}

        <Grid className="column-container">
          {noDataMessage && (
            <Typography variant="h6" color="textSecondary">
              {noDataMessage}
            </Typography>
          )}
          {renderedStudents}
          {isLoadItemColorLing && (
            <ColorRing
              visible={true}
              height="50"
              width="50"
              ariaLabel="color-ring-loading"
              wrapperStyle={{}}
              wrapperClass="color-ring-wrapper"
              colors={["#41a4ff", "#FFFFFF", "#41a4ff", "#41a4ff", "#FFFFFF"]}
            />
          )}
        </Grid>
      </div>
    </>
  );
};

export default WorkOfList;
WorkOfList.propTypes = {
  ParamUserName: PropTypes.string,
};
