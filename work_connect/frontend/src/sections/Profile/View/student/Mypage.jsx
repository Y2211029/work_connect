//import * as React from 'react';
import { useEffect, useState, useRef} from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { useSessionStorage } from "src/hooks/use-sessionStorage";

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
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

import ProfileMypageEdit from './MypageEdit';


// Itemのスタイルを定義
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'left',
  color: theme.palette.text.secondary,
  fontSize: '25px',
}));

// Showmoreのスタイルを定義
const Showmore = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  padding: theme.spacing(1),
  textAlign: 'center',
  fontSize: '20px',
}));

function CreateTagElements({ itemContents }) {
  return <button className="greeting">{itemContents}</button>;
}
CreateTagElements.propTypes = {
  itemContents: PropTypes.string.isRequired,
};
  //複数選択タグを表示するための関数
// const useTagListShow = (tagName, sessionData) => {
//   const [tags, setTags] = useState([]);
//   useEffect(() => {
//     if (sessionData && sessionData[tagName]) {
//       const commaArray = sessionData[tagName].split(",");
//       const devtagComponents = commaArray.map((item) => (
//         <CreateTagElements key={item} itemContents={item} />
//       ));
//       setTags(devtagComponents);
//     }
//   }, []);
//   return tags;
// };

const ProfileMypage = () => {

  // 「さらに表示」ボタンの初期設定
  const [showMoreText, setShowMoreText] = useState(
    <><KeyboardArrowDownIcon /> さらに表示</>
  );

  // useTheme,useRef初期化
  const theme = useTheme();
  const Profile = useRef(null);
  const detail = useRef([]);
  const showmore = useRef(null);
  const childRef = useRef(null);
  const [close, setClose] = useState(true);
  // Laravelとの通信用URL
  const url = "http://localhost:8000/get_profile_mypage";
  // ユーザーIDとは別のマイページのデータ取得用のID
  const ProfileId = useState("S_000000000001");
  const [ResponseData, setResponseData] = useState([]);

  // 編集状態のチェック
  const { getSessionData, updateSessionData } = useSessionStorage();
  // セッションストレージからaccountDataを取得し、MypageEditStateを初期値として設定
  const getInitialMypageEditState = () => {
    const accountData = getSessionData("accountData");
    return accountData.MypageEditState ? accountData.MypageEditState : 0;
  };
  const [MypageEditState, setMypageEditState] = useState(getInitialMypageEditState);
    
  // MypageEditStateが変化したとき
  useEffect(() => {
    if (Profile.current) {
      if (MypageEditState === 0) {
        Profile.current.style.display = '';
      } else if (MypageEditState === 1) {
        // 編集画面をオープン
        childRef.current?.openEdit();
        // プロフィール画面を閉じる
        Profile.current.style.display = 'none';
      }
    }
    updateSessionData("accountData", "MypageEditState", MypageEditState);
  }, [MypageEditState]);

  // ProfileIdが変化したとき
  useEffect(() => {
    async function GetData(ProfileId) {
      
      try {
        // Laravel側からデータを取得
        const response = await axios.get(url, {
          params: {
            ProfileId: ProfileId[0],
          },
        });
        if(response){
          setResponseData(response.data[0]);
        }
        console.log("ResponseData:", ResponseData);
      } catch (err) {
        console.log("err:", err);
      }
    }
    // DBからデータを取得
    GetData(ProfileId);
  }, [ProfileId]);
  
  // 初回レンダリング時の一度だけ実行させる
  useEffect(() => {
    // 詳細項目の非表示
    detail.current.forEach(ref => {
      if (ref) ref.style.display = 'none';
    });
  }, []);

  // 編集ボタンを押したときの処理
  const handleEditClick = () => {
      // 編集画面をオープン
      childRef.current?.openEdit();
      // プロフィール画面を閉じる
      Profile.current.style.display = 'none';
      setMypageEditState(1);
     
  };
  
  // 「さらに表示」が押された時の処理
  const ShowmoreClick = () => {
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




    // タグを仮で入れてます
    //const tag_3 = useTagListShow("desired_work_region", { desired_work_region: ResponseData?.desired_work_region });
    // const tag_1 = useTagListShow("2", {"2":"windows"});// sessiondata
    // const tag_2 = useTagListShow("3", {"3":"ゲーム"});// sessiondata
    // console.log("desired_work_region"+ResponseData.desired_work_region);
    // ResponseData.desired_work_region = useTagListShow("desired_work_region", ResponseData.desired_work_region);// sessiondata
    //useTagListShow("desired_work_region", sessionData);
    // const tag_4 = useTagListShow("1", {"1":"プログラマー,システムエンジニア"});// sessiondata   
    // const tag_5 = useTagListShow("5", {"5":"php,js"});// sessiondata
    // const tag_6 = useTagListShow("6", {"6":"ITパスポート,基本情報技術者試験"});// sessiondata
    // const tag_7 = useTagListShow("7", {"7":"Figma"});// sessiondata
    // カンマ区切りの文字列を配列に変換
    const desiredWorkRegions = ResponseData?.desired_work_region
        ? ResponseData.desired_work_region.split(',').map(region => region.trim())
        : [];

    return (
      
        <Box sx={{ marginLeft: '18%', width: '64%' , marginTop: '30px',}}>
          {/* 編集のコンポーネントをここで呼び出し */}
          <ProfileMypageEdit ref={childRef} />
          <Stack spacing={3} ref={Profile}>
            {/* 編集ボタン */}
            
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', }} >
                <Tooltip title="編集する">
                  <IconButton
                    onClick={handleEditClick}
                    sx={{ marginLeft: 'auto', // 右揃え
                      '&:hover': { backgroundColor: '#f0f0f0', title:'a' },
                    }}
                  >
                    <ModeEditIcon sx={{ fontSize: 40 }} />
                  </IconButton>
                </Tooltip>
                {/* {showEdit ? <ProfileMypageEdit /> : <ProfileMypage />} */}
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
              <Item>{ResponseData.student_surname ? ResponseData.student_surname : "Loading..."} {ResponseData.student_name}</Item>
            </Box>
            <Box>
              <Typography variant="h6">名前(カタカナ)</Typography>
              <Item>{ResponseData.student_kanasurname ? ResponseData.student_kanasurname : "Loading..."} {ResponseData.student_kananame}</Item>
            </Box>
            <Box>
              <Typography variant="h6">自己紹介</Typography>
              <Item>{ResponseData.intro ? ResponseData.intro : "Loading..."}</Item>
            </Box>
            <Box>
              <Typography variant="h6">卒業年度</Typography>
              <Item>{ResponseData.graduation_year ? ResponseData.graduation_year+"年" : "Loading..."}</Item>
            </Box>
            
            <Box>
              <Typography variant="h6">学校名(大学名)</Typography>
              <Item>{ResponseData.school_name ? ResponseData.school_name : "Loading..."}</Item>
            </Box>
            {/* 詳細項目がない場合「さらに表示」を表示しない */}
            {(ResponseData.department_name || 
            ResponseData.faculty_name || 
            ResponseData.development_environment || 
            ResponseData.hobby || 
            ResponseData.desired_work_region || 
            ResponseData.desired_occupation || 
            ResponseData.programming_language || 
            ResponseData.acquisition_qualification || 
            ResponseData.software) && (
            <Box>
              <Showmore>
                <Button variant="outlined" ref={showmore} onClick={ShowmoreClick} 
                sx={{ borderColor: '#5956FF', color: '#5956FF', '&:hover': { borderColor: '#5956FF' }, cursor: 'pointer' }}>
                  {showMoreText}
                </Button>
              </Showmore>
            </Box>
            )}
            {/* ResponseData.department_nameがあるときのみ表示 */}
            {ResponseData.department_name && !close && (
            <Box ref={el => (detail.current[0] = el)} id="detail">

              <Typography variant="h6">学部</Typography>
              <Item>{ResponseData.department_name}</Item>
            </Box>
            )}
            {/* ResponseData.faculty_nameがあるときのみ表示 */}
            {ResponseData.faculty_name && !close && (
            <Box ref={el => (detail.current[1] = el)} id="detail">
              <Typography variant="h6">学科</Typography>
              <Item>{ResponseData.faculty_name}</Item>
            </Box>
            )}
            {/* ResponseData.development_environmentがあるときのみ表示 */}
            {ResponseData.development_environment && !close && (
            <Box ref={el => (detail.current[2] = el)} id="detail">
              <Typography variant="h6">開発環境</Typography>
              <Item>{ResponseData.development_environment}</Item>
            </Box>
            )}
            {/* ResponseData.hobbyがあるときのみ表示 */}
            {ResponseData.hobby && !close && (
            <Box ref={el => (detail.current[3] = el)} id="detail">
              <Typography variant="h6">趣味</Typography>
              <Item>{ResponseData.hobby}</Item>
            </Box>
            )}
            {/* ResponseData.desired_work_regionがあるときのみ表示 */}
            {ResponseData.desired_work_region && !close && (
            <Box ref={el => (detail.current[4] = el)} id="detail">
              <Typography variant="h6">希望勤務地</Typography>
                <Item>
                {desiredWorkRegions.map((region, index) => (
                        <Button
                            key={index}
                            variant="outlined"
                            onClick={() => console.log(`Clicked region: ${region}`)}
                        >
                            {region}
                        </Button>
                    ))}
                </Item>
            </Box>
            )}
            {/* ResponseData.desired_occupationがあるときのみ表示 */}
            {ResponseData.desired_occupation && !close && (
            <Box ref={el => (detail.current[5] = el)} id="detail">
              <Typography variant="h6">希望職種</Typography>
              <Item>{ResponseData.desired_occupation}</Item>
            </Box>
            )}
            {/* ResponseData.programming_languageがあるときのみ表示 */}
            {ResponseData.programming_language && !close && (
            <Box ref={el => (detail.current[6] = el)} id="detail">
              <Typography variant="h6">プログラミング言語</Typography>
              <Item>{ResponseData.programming_language}</Item>
            </Box>
            )}
            {/* ResponseData.acquisition_qualificationがあるときのみ表示 */}
            {ResponseData.acquisition_qualification && !close && (
            <Box ref={el => (detail.current[7] = el)} id="detail">
              <Typography variant="h6">取得資格</Typography>
              <Item>{ResponseData.acquisition_qualification}</Item>
            </Box>
            )}
            {/* ResponseData.softwareがあるときのみ表示 */}
            {ResponseData.software && !close && (
            <Box ref={el => (detail.current[8] = el)} id="detail">
              <Typography variant="h6">ソフトウェア</Typography>
              <Item>{ResponseData.software}</Item>
            </Box>
            )}
            
            {/* </span> */}
          </Stack>
        </Box>
        
      );

};

export default ProfileMypage;
ProfileMypage.displayName = 'Parent';

