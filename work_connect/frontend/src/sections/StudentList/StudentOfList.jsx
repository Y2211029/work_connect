import React, { useContext, useEffect, useState } from "react";
import { ColorRing } from "react-loader-spinner";
import axios from "axios";

import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import { useIntersection } from "src/routes/hooks/use-intersection";
import { useSessionStorage } from "../../hooks/use-sessionStorage";
import { AllItemsContext } from "src/layouts/dashboard";
import PostCard from "./post-card";

const MemoizedPostCard = React.memo(PostCard);

const setting = {
  rootMargin: "40px",
};

const StudentOfList = () => {
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
      setNoDataMessage(null); // 検索時にメッセージをリセット
    }
  }, [IsSearch.searchToggle, IsSearch.Check]);

  // 学生データを取得
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/get_student_list/${accountData.id}`, {
          params: { page: Page },
        });

        console.log("response", response.data);
        if (response.data.message === "0件です。") {
          setStudents([]);
          setNoDataMessage("0件です。");
        } else if (response.data.count > 0) {
          setStudents((prevStudents) => {
            const newStudents = response.data.list.filter((newStudent) => !prevStudents.some((student) => student.id === newStudent.id));
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
        setNoDataMessage("エラーが発生しました。"); // エラーメッセージを表示
      }
    };

    if (IsSearch.Check) {
      if (DataList) {
        if (DataList.message === "0件です。") {
          setStudents([]);
          setNoDataMessage("0件です。");
        } else if (DataList.list) {
          setStudents((prevStudents) => {
            const newStudents = DataList.list.filter((newStudent) => !prevStudents.some((student) => student.id === newStudent.id));
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
      console.log("StudentOfList unmount");
    };
  }, [accountData.id, IsSearch.Check, Page, DataList, setAllItems]);

  // リスト描画のメモ化
  const renderedStudents = students.map((student, index) => (
    <MemoizedPostCard ref={index === students.length - 1 ? ref : null} key={student.id} student={student} />
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
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h5">学生一覧</Typography>
        </Stack>
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

export default StudentOfList;
