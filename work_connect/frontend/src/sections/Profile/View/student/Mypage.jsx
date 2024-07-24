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
  // 複数選択タグを表示するための関数
const useTagListShow = (tagName, sessionData) => {
  const [tags, setTags] = useState([]);
  useEffect(() => {
    if (sessionData && sessionData[tagName]) {
      const commaArray = sessionData[tagName].split(",");
      const devtagComponents = commaArray.map((item) => (
        <CreateTagElements key={item} itemContents={item} />
      ));
      setTags(devtagComponents);
    }
  }, []);
  return tags;
};

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
  const url = "http://localhost:8000/get_profile_mypage";
  const ProfileId = useState("S_000000000001");

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

  // 初回レンダリング時の一度だけ実行させる
  useEffect(() => {
    async function GetData(ProfileId) {
      try {
        // Laravel側からデータを取得
        const response = await axios.get(url, {
          params: {
            ProfileId: ProfileId,
          },
        });

        // response.dataは配列の中にオブジェクトがある形になっています
        // console.log("response.data:", response.data);

        // ジャンルはタグのため、カンマ区切りの文字列を配列に変換する
        // response.data.forEach((element) => {
        //   element.genre !== null
        //     ? (element.genre = element.genre.split(",").map((item) => <CreateTagElements key={item} itemContents={item} />))
        //     : "";
        // });

        // setMovieOfList(response.data);
        console.log("MovieListObject:", response.data);
      } catch (err) {
        console.log("err:", err);
      }
    }
    // DBからデータを取得
    GetData(ProfileId);

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
    const tag_1 = useTagListShow("1", {"1":"プログラマー,システムエンジニア"});// sessiondata
    const tag_2 = useTagListShow("2", {"2":"windows"});// sessiondata
    const tag_3 = useTagListShow("3", {"3":"ゲーム"});// sessiondata
    const tag_4 = useTagListShow("4", {"4":"大阪府,東京都"});// sessiondata
    const tag_5 = useTagListShow("5", {"5":"php,js"});// sessiondata
    const tag_6 = useTagListShow("6", {"6":"ITパスポート,基本情報技術者試験"});// sessiondata
    const tag_7 = useTagListShow("7", {"7":"Figma"});// sessiondata

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
              <Item>坂東 航希</Item>
            </Box>
            <Box>
              <Typography variant="h6">名前(カタカナ)</Typography>
              <Item>バンドウ コウキ</Item>
            </Box>
            <Box>
              <Typography variant="h6">自己紹介</Typography>
              <Item>情報処理・ネットワーク専攻3年の坂東航希です。よろしくお願いいたします。</Item>
            </Box>
            <Box>
              <Typography variant="h6">卒業年度</Typography>
              <Item>2025年</Item>
            </Box>
            
            <Box>
              <Typography variant="h6">学校名(大学名)</Typography>
              <Item>清風情報工科学院</Item>
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
              <Item>情報学部</Item>
            </Box>
            <Box ref={el => (detail.current[1] = el)} id="detail">
              <Typography variant="h6">学科</Typography>
              <Item>電子工学科</Item>
            </Box>
            <Box ref={el => (detail.current[2] = el)} id="detail">
              <Typography variant="h6">開発環境</Typography>
              <Item><span>{tag_2}</span></Item>
            </Box>
            <Box ref={el => (detail.current[3] = el)} id="detail">
              <Typography variant="h6">趣味</Typography>
              <Item><span>{tag_3}</span></Item>
            </Box>
            <Box ref={el => (detail.current[4] = el)} id="detail">
              <Typography variant="h6">希望勤務地</Typography>
              <Item><span>{tag_4}</span></Item>
            </Box>
            <Box ref={el => (detail.current[5] = el)} id="detail">
              <Typography variant="h6">希望職種</Typography>
              <Item><span>{tag_1}</span></Item>
            </Box>
            <Box ref={el => (detail.current[6] = el)} id="detail">
              <Typography variant="h6">プログラミング言語</Typography>
              <Item><span>{tag_5}</span></Item>
            </Box>
            <Box ref={el => (detail.current[7] = el)} id="detail">
              <Typography variant="h6">取得資格</Typography>
              <Item><span>{tag_6}</span></Item>
            </Box>
            <Box ref={el => (detail.current[8] = el)} id="detail">
              <Typography variant="h6">ソフトウェア</Typography>
              <Item><span>{tag_7}</span></Item>
            </Box>
            {/* </span> */}
          </Stack>
        </Box>
        
      );

};

export default ProfileMypage;
ProfileMypage.displayName = 'Parent';

