import React, { useContext, useEffect, useState } from "react";
import { ColorRing } from "react-loader-spinner";
import axios from "axios";
import PropTypes from "prop-types";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import { useIntersection } from "src/routes/hooks/use-intersection";
import { useSessionStorage } from "src/hooks/use-sessionStorage";
import { AllItemsContext } from "src/layouts/dashboard";
import PostCard from "./post-card";

const MemoizedPostCard = React.memo(PostCard);

const setting = {
  rootMargin: "40px",
};

const NewsOfList = ({ type, ParamUserName }) => {
  const { getSessionData } = useSessionStorage();
  const accountData = getSessionData("accountData");

  const { AllItems, setAllItems } = useContext(AllItemsContext);
  const { IsLoading, IsSearch, Page, DataList } = AllItems;
  const [students, setStudents] = useState([]);
  const [isIntersecting, ref] = useIntersection(setting);
  const [isLoadItem, setIsLoadItem] = useState(false);
  const [isLoadItemColorLing, setIsLoadItemColorLing] = useState(false);
  const [noDataMessage, setNoDataMessage] = useState(null);

  // ローディングの状態を管理
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

  // 学生データを取得
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        let baseURL = `http://localhost:8000/Internship_JobOffer/`;
        if (ParamUserName) {
          baseURL += `special_company_news/${ParamUserName}/${accountData.id}/${type}`;
        } else {
          baseURL += `${accountData.id}/${type}`;
        }

        const response = await axios.get(baseURL, {
          params: { page: Page },
        });

        if (response.data.message === "0件です。") {
          setStudents([]);
          setNoDataMessage("0件です。");
        } else if (response.data.count > 0) {
          console.log("response", response.data);
          setStudents((prevStudents) => {
            const newStudents = response.data.list.filter((newStudent) => !prevStudents.some((NewItem) => NewItem.id === newStudent.id));
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

    if (IsSearch.Check) {
      console.log("検索結果:NewsOfList:", DataList);
      if (DataList) {
        if (DataList.message === "0件です。") {
          setStudents([]);
          setNoDataMessage("0件です。");
        } else if (DataList.list) {
          setStudents((prevStudents) => {
            const newStudents = DataList.list.filter((newStudent) => !prevStudents.some((NewItem) => NewItem.id === newStudent.id));
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
      console.log("NewsOfList unmount");
    };
  }, [accountData.id, IsSearch.Check, Page, DataList, type, ParamUserName, setAllItems]);

  // リスト描画のメモ化
  const renderedStudents = students.map((NewItem, index) => (
    <MemoizedPostCard ref={index === students.length - 1 ? ref : null} key={`${NewItem.id}-${NewItem.company_id}-${index}`} NewItem={NewItem} />
  ));

  useEffect(() => {
    console.log("students", students);
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

export default NewsOfList;

NewsOfList.propTypes = {
  type: PropTypes.string,
  ParamUserName: PropTypes.string,
};
