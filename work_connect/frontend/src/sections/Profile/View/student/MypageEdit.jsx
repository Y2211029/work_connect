//import * as React from 'react';
import { useEffect, useState, useRef, forwardRef,useImperativeHandle } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { useParams } from 'react-router-dom';
//import { useSessionStorage } from "src/hooks/use-sessionStorage";

// muiインポート
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
//import TextField from "@mui/material/TextField";


// コンポーネントをインポート

// --- アイコン --- //
import UserIcon from "./EditDetailFields/UserIcon";
// --- 必須項目 --- //
import StudentName from "./EditRequiredFields/StudentName";
import StudentKanaName from "./EditRequiredFields/StudentKanaName";
import Intro from "./EditRequiredFields/Intro";
import GraduationYear from "./EditRequiredFields/GraduationYear";
import SchoolName from "./EditRequiredFields/SchoolName";
// --- 詳細項目 --- //
import DepartmentName from "./EditDetailFields/DepartmentName";
import FacultyName from "./EditDetailFields/FacultyName";
import Environment from "./EditDetailFields/Environment";
import Hobby from "./EditDetailFields/Hobby";
import Prefecture from "./EditDetailFields/Prefecture";
import DesiredOccupation from "./EditDetailFields/DesiredOccupation";
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

// Saveのスタイルを定義
const Save = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  padding: theme.spacing(1),
  textAlign: 'right',
  fontSize: '20px',
}));

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

  // useRef初期化
  const Edit = useRef(null);
  const detail = useRef([]);
  const showmore = useRef(null);
  const [close, setClose] = useState(true);
  // Laravelとの通信用URL
  const url = "http://localhost:8000/get_profile_mypage";

  // ログイン中のuser_nameではない
  // ＊＊＊他ルートからアクセスしたときに表示したいユーザのuser_nameをここで指定＊＊＊
  const { user_name } = useParams();

  // DBからのレスポンスが入る変数
  const [ResponseData, setResponseData] = useState([]);


  // 編集状態のチェック
  //const { updateSessionData } = useSessionStorage();

  // // セッションストレージからaccountDataを取得し、MypageEditStateを初期値として設定
  // const getInitialMypageEditState = () => {
  //   const accountData = getSessionData("accountData");
  //   return accountData.MypageEditState ? accountData.MypageEditState : 0;
  // };

  //const [MypageEditState] = useState(getInitialMypageEditState);

  // MypageEditStateが変化したとき
  // useEffect(() => {
  //   //const sessionData = getSessionData("accountData");
  //   if (Edit.current) {
  //     if (MypageEditState === 0) {
  //       Edit.current.style.display = 'none';
  //     } else if (MypageEditState === 1) {
  //       Edit.current.style.display = '';
  //     }
  //   }
  //   updateSessionData("accountData", "MypageEditState", MypageEditState);
  // }, [MypageEditState]);

  // ProfileUserNameが変化したとき
  useEffect(() => {
    async function GetData(user_name) {

      try {
        // Laravel側からデータを取得
        const response = await axios.get(url, {
          params: {
            ProfileUserName: user_name,
          },
        });
        if(response){
          setResponseData(response.data[0]);
        }
        // console.log("ResponseData:", ResponseData);
      } catch (err) {
        console.log("err:", err);
      }
    }
    // DBからデータを取得
    if(user_name){
      GetData(user_name);
    }
  }, [user_name]);

  // 初回レンダリング時の一度だけ実行させる
  useEffect(() => {
    detail.current.forEach(ref => {
      if (ref) ref.style.display = 'none';
    });
    Edit.current.style.display = 'none';
  }, []);

  // 戻るボタンを押したときの処理
  const handleBackClick = () => {
      // マイページ編集画面のとき
      console.log("click!");
      //MypageEditStateを0に更新
      //updateSessionData("accountData", "MypageEditState", 0);
      // リロード
      window.location.reload();
  };

  // 「さらに表示」が押された時の処理
  const ShowmoreClick = () => {
    console.log("「さらに表示」click!");
    if(close){
      // 「さらに表示」のとき、詳細項目を表示して、ボタンを「閉じる」に変更
      setClose(false);
      detail.current.forEach(ref => {
        if (ref){
          ref.style.display = '';
        }
      });
      setShowMoreText(<><KeyboardArrowUpIcon /> 閉じる</>);
    } else {
      // 「閉じる」のとき、詳細項目を非表示にして、ボタンを「さらに表示」に変更
      setClose(true);
      detail.current.forEach(ref => {
        if (ref){
          ref.style.display = 'none';
        }
      });
      setShowMoreText(<><KeyboardArrowDownIcon /> さらに表示</>);
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

            <UserIcon />

            <Box>
              <Typography variant="h6">名前</Typography>
              <StudentName StudentSurnameData={ResponseData.student_surname} StudentnameData={ResponseData.student_name}/>
            </Box>
            <Box>
              <Typography variant="h6">名前(カタカナ)</Typography>
              <StudentKanaName StudentKanaSurnameData={ResponseData.student_kanasurname} StudentKananameData={ResponseData.student_kananame}/>
            </Box>
            <Box>
              <Typography variant="h6">自己紹介</Typography>
                <Intro IntroData={ResponseData.intro}/>
            </Box>
            <Box>
              <Typography variant="h6">卒業年度</Typography>
              <GraduationYear GraduationData={ResponseData.graduation_year}/>
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
            <Box>
              <Save>
                <Button variant="outlined"
                sx={{ borderColor: '#1877F2', color: '#1877F2', '&:hover': { borderColor: '#1877F2' }, cursor: 'pointer' }}
                size="large">
                  保存
                </Button>
              </Save>
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