import React, { useContext, useEffect, useState } from 'react';
import { ColorRing } from 'react-loader-spinner';
import axios from 'axios';

import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import { useIntersection } from "src/routes/hooks/use-intersection";
import { useSessionStorage } from '../../hooks/use-sessionStorage';
import { AllItemsContext } from "src/layouts/dashboard";
import PostCard from './post-card';


const MemoizedPostCard = React.memo(PostCard);

const setting = {
  rootMargin: "40px",
};

const CompanyOfList = () => {
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
        const response = await axios.get(`http://localhost:8000/get_company_list/${accountData.id}`, {
          params: { page: Page },
        });
        console.log("Params", Page)

        if (response.data.length !== 0) {
          setStudents((prevStudents) => {
            // 新しいデータを前回の学生データの後ろに追加
            const newStudents = response.data.filter(
              (newStudent) => !prevStudents.some((companies) => companies.id === newStudent.id)
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
            (newStudent) => !prevStudents.some((companies) => companies.id === newStudent.id)
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
  const renderedStudents = students.map((companies, index) => (
    <MemoizedPostCard ref={index === students.length - 1 ? ref : null} key={companies.id} companies={companies} />
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
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4">企業一覧</Typography>
        </Stack>
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

export default CompanyOfList;
