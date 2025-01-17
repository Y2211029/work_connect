import React, { useContext, useEffect, useState } from 'react';
import { ColorRing } from 'react-loader-spinner';
import axios from 'axios';

// import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import { useIntersection } from "src/routes/hooks/use-intersection";
import { useSessionStorage } from 'src/hooks/use-sessionStorage'; // エイリアスが有効な場合
import { AllItemsContext } from "src/layouts/dashboard";
import PostCard from './post-card';
import PropTypes from 'prop-types';

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

  // ローディングの状態を管理
  useEffect(() => {
    console.log("IsLoading", IsLoading)
    if (IsLoading) {
      setIsLoadItem(true);
    } else {
      setIsLoadItem(false);
    }
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
  }, [isIntersecting]);

  // 検索時にsetWorkOfListをリセット
  useEffect(() => {
    // タグを選択した状態
    if (IsSearch.Check) {
      setStudents([]);
    }
  }, [IsSearch.searchToggle, IsSearch.Check]);


  // 学生データを取得
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        let response;
        // if (ParamUserName !== null) {
        //   response = await axios.get(`/Internship_JobOffer/special_company_news/${ParamUserName}/${accountData.id}/${type}`, {
        //     params: { page: Page },
        //   });
        // } else {
          response = await axios.get(`http://localhost:8000/Internship_JobOffer/${accountData.id}/${type}`, {
            params: { page: Page },
          });
        // }
        console.log("ParamUserName", ParamUserName)
        console.log("Internship_JobOffer :  response.data", response.data)

        if (response.data.length !== 0) {
          setStudents((prevStudents) => {
            // 新しいデータを前回の学生データの後ろに追加
            const newStudents = response.data.filter(
              (newStudent) => !prevStudents.some((NewItem) => NewItem.id === newStudent.id)
            );
            console.log("newStudents", newStudents);
            return [...prevStudents, ...newStudents]; // 新しいデータを追加
          });
        }
        setIsLoadItem(false);
        setIsLoadItemColorLing(false)
      } catch (error) {
        console.error('データ取得中にエラーが発生しました:', error);
      }
    };

    // 検索状態による分岐
    if (IsSearch.Check) {
      if (DataList.length !== 0) {
        setStudents((prevStudents) => {
          // 新しいデータを前回の学生データの後ろに追加
          const newStudents = DataList.filter(
            (newStudent) => !prevStudents.some((NewItem) => NewItem.id === newStudent.id)
          );
          console.log("newStudents", newStudents);
          return [...prevStudents, ...newStudents]; // 新しいデータを追加
        });
      }

      setAllItems((prevItems) => ({
        ...prevItems,
        IsLoading: false,
      }));
      setIsLoadItemColorLing(false)
    } else {
      if (Page == 1) {
        setIsLoadItem(true); // ローディング開始
      }
      fetchStudents();
    }
  }, [accountData.id, IsSearch.Check, Page, DataList]);


  // リスト描画のメモ化
  const renderedStudents = students.map((NewItem, index) => (
    <MemoizedPostCard ref={index === students.length - 1 ? ref : null} key={NewItem.id + NewItem.company_id} NewItem={NewItem} />
  ));

  useEffect(() => {
    console.log("students", students)
  }, [students])


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
        {/* <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4">学生一覧</Typography>
        </Stack> */}
        <Grid className="column-container">
          {students.length === 0 && Page > 1 && IsSearch.Check && (
            <Typography variant="h6" color="textSecondary">0件です。</Typography>
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
