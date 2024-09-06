//import * as React from 'react';
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useSessionStorage } from "src/hooks/use-sessionStorage";
import { useParams } from 'react-router-dom';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { styled, useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

import ProfileMypageEdit from './MypageEdit';
import { follow } from "src/_mock/follow";

// Itemのスタイルを定義
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  border:'#DAE2ED 2px solid',
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

  // ログイン中のuser_nameではない
  // ＊＊＊他ルートからアクセスしたときに表示したいユーザのuser_nameをここで指定＊＊＊
  const { user_name } = useParams();

  // DBからのレスポンスが入る変数
  const [ResponseData, setResponseData] = useState([]);

  // セッションストレージ取得
  const { getSessionData } = useSessionStorage();

  //フォローの状況がセットされる関数
  const [followStatus, setFollowStatus] = useState([]);


  // // セッションストレージからaccountDataを取得し、MypageEditStateを初期値として設定
  // // マイページ編集時なら"1",マイページ時なら"0"
  // const getInitialMypageEditState = () => {
  //   const accountData = getSessionData("accountData");
  //   return accountData.MypageEditState ? accountData.MypageEditState : 0;
  // };
  // const [MypageEditState, setMypageEditState] = useState(getInitialMypageEditState);

  // セッションストレージからaccountDataを取得し、idを初期値として設定(ログイン中のIDを取得)
  const getUserId = () => {
    const accountData = getSessionData("accountData");
    return accountData.id ? accountData.id : 0;
  };

  //ログイン中のid
  const MyUserId = useState(getUserId);

  // // MypageEditStateが変化したとき
  // useEffect(() => {
  //   if (Profile.current) {
  //     if (MypageEditState === 0) {
  //       Profile.current.style.display = '';
  //     } else if (MypageEditState === 1) {
  //       // 編集画面をオープン
  //       childRef.current?.openEdit();
  //       // プロフィール画面を閉じる
  //       Profile.current.style.display = 'none';
  //     }
  //   }
  //   updateSessionData("accountData", "MypageEditState", MypageEditState);
  // }, [MypageEditState]);

  // ProfileUserNameが変化したとき
  useEffect(() => {
    async function GetData() {

      try {
        // Laravel側からデータを取得
        const response = await axios.get(url, {
          params: {
            kind: "s",
            ProfileUserName: user_name,    //プロフィールとして表示されている人のユーザーネーム
            MyUserId: MyUserId,           //ログイン中のID
          },
        });
        if (response) {
          console.log(response.data[0].follow_status);
          setResponseData(response.data[0]);
          setFollowStatus(response.data[0].follow_status);
          //console.log("ResponseDataaaaaaaaaaaaa:", ResponseData.icon);
        }
        // console.log("ResponseData:", ResponseData);
      } catch (err) {
        console.log("err:", err);
      }
    }
    // DBからデータを取得
    if (user_name) {
      GetData();
    }
  }, [ResponseData]);

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
    //setMypageEditState(1);

  };

  // 「さらに表示」が押された時の処理
  const ShowmoreClick = () => {
    if (close) {
      // 「さらに表示」のとき、詳細項目を表示して、ボタンを「閉じる」に変更
      setClose(false);
      detail.current.forEach(ref => {
        if (ref) {
          ref.style.display = '';
        }
      });
      setShowMoreText(<><KeyboardArrowUpIcon /> 閉じる</>);
    } else {
      // 「閉じる」のとき、詳細項目を非表示にして、ボタンを「さらに表示」に変更
      setClose(true);
      detail.current.forEach(ref => {
        if (ref) {
          ref.style.display = 'none';
        }
      });
      setShowMoreText(<><KeyboardArrowDownIcon /> さらに表示</>);
    }
  };

  // データからタグを抽出する処理
  const ExtractTags = (data, key) => {
    return data?.[key]
      ? data[key].split(',').map(region => region.trim())
      : [];
  };

  // タグを表示する処理
  const ShowTags = (tags) => {
    return tags.map((region, index) => (
      <Button key={index}
        variant="outlined"
        sx={{ borderColor: '#637381', color: '#637381', '&:hover': { borderColor: '#637381' }, cursor: 'pointer' }}>
        {region}
      </Button>
    ));
  };

  // ExtractTagsメソッドで抽出したタグを<Item>内で表示する
  const department_name_tag = ExtractTags(ResponseData, 'department_name');
  const faculty_name_tag = ExtractTags(ResponseData, 'faculty_name');
  const development_environment_tag = ExtractTags(ResponseData, 'development_environment');
  const hobby_tag = ExtractTags(ResponseData, 'hobby');
  const desired_work_region_tag = ExtractTags(ResponseData, 'desired_work_region');
  const desired_occupation_tag = ExtractTags(ResponseData, 'desired_occupation');
  const programming_language_tag = ExtractTags(ResponseData, 'programming_language');
  const acquisition_qualification_tag = ExtractTags(ResponseData, 'acquisition_qualification');
  const software_tag = ExtractTags(ResponseData, 'software');
  const profile_id = ResponseData.id;


  const handleFollowClick = async () => {
    try {
      //data.account_id = 自分のid
      //id = 今見ているプロフィールの人のid
      console.log(MyUserId[0]);
      console.log(profile_id);
      const updatedFollowStatus = await follow(MyUserId[0], profile_id);
      if (updatedFollowStatus) {
        setFollowStatus(updatedFollowStatus);
      }
    } catch (error) {
      console.error('フォロー処理中にエラーが発生しました！', error);
    }
  };


  const renderFollow = () => {
    if (followStatus && followStatus === "フォローできません") {
      return (
        <Typography opacity="0.48">
        </Typography>
      );
    } else {
      return (
        <Typography opacity="0.48" onClick={handleFollowClick}>
          {followStatus}
        </Typography>
      );
    }
  };

  return (

    <Box sx={{ marginLeft: '18%', width: '64%', marginTop: '30px', }}>
      {/* 編集のコンポーネントをここで呼び出し */}
      <ProfileMypageEdit ref={childRef} />
      <Stack spacing={3} ref={Profile}>
        {/* 編集ボタン */}

        {/* ResponseData.id(プロフィールのID) と MyUserId(ログイン中のID)が一致したら編集ボタンを表示 */}
        {ResponseData.id === MyUserId[0] ? (

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', }} >
            <Tooltip title="編集する">
              <IconButton
                onClick={handleEditClick}
                sx={{
                  marginLeft: 'auto', // 右揃え
                  '&:hover': { backgroundColor: '#f0f0f0', title: 'a' },
                }}
              >
                <ModeEditIcon sx={{ fontSize: 55 }} />
              </IconButton>
            </Tooltip>
            {/* {showEdit ? <ProfileMypageEdit /> : <ProfileMypage />} */}
          </Box>
        ) : (
          //ResponseData.id(プロフィールのID) と MyUserId(ログイン中のID)が一致しない場合はフォローの状況を表示
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Tooltip title="フォロー">
              {/* <IconButton
                sx={{
                  marginLeft: 'auto', // 右揃え
                  '&:hover': { backgroundColor: '#f0f0f0' },
                }}
                onClick={handleFollowClick()} // クリックイベントのハンドラーを設定
              >
                <ModeEditIcon sx={{ fontSize: 40 }} />
              </IconButton> */}
              {renderFollow()}

            </Tooltip>

          </Box>
        )}

        <Card sx={{
          textAlign: 'center',
          display: 'flex',
          justifyContent: 'center',
          backgroundColor: theme.palette.background.default,
          boxShadow: 'none',
          position: 'relative'
        }}>
          <CardMedia
            component="img"
            sx={{
              height: 'calc(100vw * 0.58)',
              width: 'calc(100vw * 0.58)',
              objectFit: 'cover',
              borderRadius: '50%',
              maxHeight: 350,
              maxWidth: 350,
              '@media (min-width: 600px)': {
                height: 350,
                width: 350,
              }
            }}
            image={ResponseData.icon ?
              `http://localhost:8000/storage/images/userIcon/${ResponseData.icon}` :
              ""}
            alt="Loading..."
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
          <Item sx={{fontSize: '20px'}}>{ResponseData.intro ? ResponseData.intro : "Loading..."}</Item>
        </Box>
        <Box>
          <Typography variant="h6">卒業年度</Typography>
          <Item>{ResponseData.graduation_year ? ResponseData.graduation_year + "年" : "Loading..."}</Item>
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
        {/* ResponseData.faculty_nameがあるときのみ表示 */}
        {ResponseData.faculty_name && !close && (
          <Box ref={el => (detail.current[0] = el)} id="detail">
            <Typography variant="h6">学部</Typography>
            <Item>{ShowTags(faculty_name_tag)}</Item>
          </Box>
        )}
        {/* ResponseData.department_nameがあるときのみ表示 */}
        {ResponseData.department_name && !close && (
          <Box ref={el => (detail.current[1] = el)} id="detail">

            <Typography variant="h6"></Typography>
            <Item>{ShowTags(department_name_tag)}</Item>
          </Box>
        )}
        {/* ResponseData.development_environmentがあるときのみ表示 */}
        {ResponseData.development_environment && !close && (
          <Box ref={el => (detail.current[2] = el)} id="detail">
            <Typography variant="h6">開発環境</Typography>
            <Item>{ShowTags(development_environment_tag)}</Item>
          </Box>
        )}
        {/* ResponseData.hobbyがあるときのみ表示 */}
        {ResponseData.hobby && !close && (
          <Box ref={el => (detail.current[3] = el)} id="detail">
            <Typography variant="h6">趣味</Typography>
            <Item>{ShowTags(hobby_tag)}</Item>
          </Box>
        )}
        {/* ResponseData.desired_work_regionがあるときのみ表示 */}
        {ResponseData.desired_work_region && !close && (
          <Box ref={el => (detail.current[4] = el)} id="detail">
            <Typography variant="h6">希望勤務地</Typography>
            <Item>{ShowTags(desired_work_region_tag)}</Item>
          </Box>
        )}
        {/* ResponseData.desired_occupationがあるときのみ表示 */}
        {ResponseData.desired_occupation && !close && (
          <Box ref={el => (detail.current[5] = el)} id="detail">
            <Typography variant="h6">希望職種</Typography>
            <Item>{ShowTags(desired_occupation_tag)}</Item>
          </Box>
        )}
        {/* ResponseData.programming_languageがあるときのみ表示 */}
        {ResponseData.programming_language && !close && (
          <Box ref={el => (detail.current[6] = el)} id="detail">
            <Typography variant="h6">プログラミング言語</Typography>
            <Item>{ShowTags(programming_language_tag)}</Item>
          </Box>
        )}
        {/* ResponseData.acquisition_qualificationがあるときのみ表示 */}
        {ResponseData.acquisition_qualification && !close && (
          <Box ref={el => (detail.current[7] = el)} id="detail">
            <Typography variant="h6">取得資格</Typography>
            <Item>{ShowTags(acquisition_qualification_tag)}</Item>
          </Box>
        )}
        {/* ResponseData.softwareがあるときのみ表示 */}
        {ResponseData.software && !close && (
          <Box ref={el => (detail.current[8] = el)} id="detail">
            <Typography variant="h6">ソフトウェア</Typography>
            <Item>{ShowTags(software_tag)}</Item>
          </Box>
        )}

        {/* </span> */}
      </Stack>
    </Box>

  );

};

export default ProfileMypage;
ProfileMypage.displayName = 'Parent';