//import * as React from 'react';
import { useEffect, useState, useRef, forwardRef,useImperativeHandle } from "react";
import PropTypes from "prop-types";
import { useSessionStorage } from "src/hooks/use-sessionStorage";

// muiインポート
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { styled , useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
//import TextField from "@mui/material/TextField";


// コンポーネントをインポート
import StudentName from "./EditRequiredFields/StudentName";
import StudentKanaName from "./EditRequiredFields/StudentKanaName";
import Intro from "./EditRequiredFields/Intro";
import GraduationYear from "./EditRequiredFields/GraduationYear";
import DesiredOccupation from "./EditDetailFields/DesiredOccupation";
import SchoolName from "./EditRequiredFields/SchoolName";
import DepartmentName from "./EditDetailFields/DepartmentName";
import FacultyName from "./EditDetailFields/FacultyName";
import Environment from "./EditDetailFields/Environment";
import Hobby from "./EditDetailFields/Hobby";
import Prefecture from "./EditDetailFields/Prefecture";
import ProgrammingLanguage from "./EditDetailFields/ProgrammingLanguage";
import Qualification from "./EditDetailFields/Qualification";
import Software from "./EditDetailFields/Software";



// Showmoreのスタイルを定義
const Showmore = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(1),
    textAlign: 'center',
    fontSize: '20px',
  }));

// 初期化
let close = true;

const ProfileMypageEdit = forwardRef((props,ref) => {

  
  // 親コンポーネント(Mypage.jsx)から渡されたデータ
  useImperativeHandle(ref, () => ({
    openEdit(){
      Edit.current.style.display = '';
    }
  }));

  // 「さらに表示」ボタンの初期設定
  const [showMoreText, setShowMoreText] = useState(
    <><KeyboardArrowDownIcon /> さらに表示</>
  );
  
  // useTheme,useRef初期化
  const theme = useTheme();
  const Edit = useRef(null);
  const detail = useRef([]);
  const showmore = useRef(null);


  // 編集状態のチェック
  const { getSessionData, updateSessionData } = useSessionStorage();
  const [EditCheck, setEditCheck] = useState(0);
  useEffect(() => {
    //const sessionData = getSessionData("accountData");
    if (Edit.current) {
      if (EditCheck === 0) {
        Edit.current.style.display = 'none';
      } else if (EditCheck === 1) {
        Edit.current.style.display = '';
      }
    }
  }, [EditCheck]);
  useEffect(() => {
    updateSessionData("accountData", "EditCheck", EditCheck);
  }, [EditCheck]);


  // デフォルトで非表示にする項目
  useEffect(() => {
    if (Edit.current) {
      Edit.current.style.display = 'none';
    }
    detail.current.forEach(ref => {
      if (ref) ref.style.display = 'none';
    });
  }, []);

  // 戻るボタンを押したときの処理
  const handleBackClick = () => {
      // マイページ編集画面のとき
      console.log("click!");
      //setEditCheck(prev => (prev === 0 ? 1 : 0));
      setEditCheck(0);
      
  };

  // 「さらに表示」が押された時の処理
  const ShowmoreClick = () => {
    
    if(close == false){
      // 「閉じる」のとき、詳細項目を非表示にして、ボタンを「さらに表示」に変更
      close = true;
      detail.current.forEach(ref => {
        if (ref){
          ref.style.display = 'none';
        }
      });
      setShowMoreText(<><KeyboardArrowDownIcon /> さらに表示</>);
      
    } else if(close == true){
      // 「さらに表示」のとき、詳細項目を表示して、ボタンを「閉じる」に変更
      close = false;
      detail.current.forEach(ref => {
        if (ref){
          ref.style.display = '';
        }
      });
      setShowMoreText(<><KeyboardArrowUpIcon /> 閉じる</>);
      
    }
    
  };
  
    return (
        
          <Stack spacing={3} ref={Edit}>
            {/* 戻るボタン */}
            
            <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                <Tooltip title="戻る">
                    <IconButton
                    onClick={handleBackClick}
                    sx={{
                        '&:hover': { backgroundColor: '#f0f0f0' },
                    }}
                    >
                    <ArrowBackOutlinedIcon sx={{ fontSize: 40 }} />
                    </IconButton>
                </Tooltip>
            </Box>
            
            
            <Card sx={{
              textAlign: 'center',
              display: 'flex',
              justifyContent: 'center',
              backgroundColor: theme.palette.background.default,
              boxShadow: 'none'
            }}>
              <CardMedia
                component="img"
                sx={{
                  height: 350,
                  width: 350,
                  objectFit: 'cover', // 画像をカード内でカバーするように設定
                  borderRadius: '50%', // 画像を丸くする
                }}
                image="/assets/workImages/thumbnail/cover_19.jpg"
                alt="Placeholder"
              />
              
            </Card>
            
            <Box>
              <Typography variant="h6">名前</Typography>
              <StudentName />
            </Box>
            <Box>
              <Typography variant="h6">名前(カタカナ)</Typography>
              <StudentKanaName />
            </Box>
            <Box>
              <Typography variant="h6">自己紹介</Typography>
                <Intro />
            </Box>
            <Box>
              <Typography variant="h6">卒業年度</Typography>
              <GraduationYear />
            </Box>
            <Box>
              <Typography variant="h6">学校名(大学名)</Typography>
              <SchoolName />
            </Box>
            <Box>
              <Showmore>
                <Button variant="outlined" ref={showmore} onClick={ShowmoreClick} 
                sx={{ borderColor: '#5956FF', color: '#5956FF', '&:hover': { borderColor: '#5956FF' }, cursor: 'pointer' }}>
                  {showMoreText}
                </Button>
              </Showmore>
            </Box>
            <Box ref={el => (detail.current[0] = el)} id="detail">

              <Typography variant="h6">学部</Typography>
              <DepartmentName />
            </Box>
            <Box ref={el => (detail.current[1] = el)} id="detail">
              <Typography variant="h6">学科</Typography>
              <FacultyName />
            </Box>
            <Box ref={el => (detail.current[2] = el)} id="detail">
              <Typography variant="h6">開発環境</Typography>
              <Environment />
            </Box>
            <Box ref={el => (detail.current[3] = el)} id="detail">
              <Typography variant="h6">趣味</Typography>
              <Hobby />
            </Box>
            <Box ref={el => (detail.current[4] = el)} id="detail">
              <Typography variant="h6">希望勤務地</Typography>
              <Prefecture />
            </Box>
            <Box ref={el => (detail.current[5] = el)} id="detail">
              <Typography variant="h6">希望職種</Typography>
              <DesiredOccupation />
            </Box>
            <Box ref={el => (detail.current[6] = el)} id="detail">
              <Typography variant="h6">プログラミング言語</Typography>
              <ProgrammingLanguage />
            </Box>
            <Box ref={el => (detail.current[7] = el)} id="detail">
              <Typography variant="h6">取得資格</Typography>
              <Qualification />
            </Box>
            <Box ref={el => (detail.current[8] = el)} id="detail">
              <Typography variant="h6">ソフトウェア</Typography>
              <Software />
            </Box>
            {/* </span> */}
          </Stack>
        
      );

});

ProfileMypageEdit.propTypes = {
  Profile: PropTypes.shape({
    current: PropTypes.instanceOf(Element),
  }).isRequired,
};



export default ProfileMypageEdit;
ProfileMypageEdit.displayName = 'Child';