//import * as React from 'react';
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useSessionStorage } from "src/hooks/use-sessionStorage";
import { useParams } from 'react-router-dom';
import Iframe from 'react-iframe'; //紹介動画やマップを埋め込む

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

  // セッションストレージからaccountDataを取得し、idを初期値として設定(ログイン中のIDを取得)
  const getUserId = () => {
    const accountData = getSessionData("accountData");
    return accountData.id ? accountData.id : 0;
  };

  //ログイン中のid
  const MyUserId = useState(getUserId);

  // ProfileUserNameが変化したとき
  useEffect(() => {
    // データを取得する関数
    async function GetData() {
      try {

        const response = await axios.get(url, {
          params: {
            ProfileUserName: user_name, // プロフィールとして表示されている人のユーザーネーム
            MyUserId: MyUserId, //ログイン中のID
          },
        });
        if (response) {
          setResponseData(response.data[0]);
          setFollowStatus(response.data[0].follow_status);
          //console.log("ResponseData:", response.data[0]);
        }
      } catch (err) {
        console.log("err:", err);
      }
    }

    // user_name が定義されている場合にのみデータを取得
    if (user_name) {
      GetData();
    }
  }, [ResponseData,user_name]); // user_name を依存配列に含める

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

  const ShowTagsCompanyInformation = (tags) => {
    return (
      <Button
        className="custom-button"
        variant="outlined"
        sx={{ borderColor: '#637381', color: '#637381', '&:hover': { borderColor: '#637381' }, cursor: 'pointer', }}
      >
        {tags}
      </Button>
    );
  };


  // ExtractTagsメソッドで抽出したタグを<Item>内で表示する
  const prefecture_tag = ExtractTags(ResponseData, 'prefecture');
  const selected_occupation_tag = ExtractTags(ResponseData, 'selected_occupation');
  const industry_tag = ExtractTags(ResponseData, 'industry');
  const programming_language_tag = ExtractTags(ResponseData, 'programming_language');
  const development_environment_tag = ExtractTags(ResponseData, 'development_environment');
  const software_tag = ExtractTags(ResponseData, 'software');
  const qualification_tag = ExtractTags(ResponseData, 'qualification');

  const profile_id = ResponseData.id;
  const hp_url_button = `${ResponseData.company_name}さんのホームページはこちら`;

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
    } else if(followStatus) {
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
        ) : (ResponseData.id && MyUserId[0]) && (ResponseData.id.charAt(0) !== MyUserId[0].charAt(0)) ? (

         // ResponseData.id(プロフィールのID)の1文字目 と MyUserId(ログイン中のID)の1文字目が一致しない場合はフォローの状況を表示
         // 学生側はS、企業側はCで始まる。
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', }} >
            <Tooltip title="フォロー">
              {/* <IconButton
                sx={{
                  marginLeft: 'auto', // 右揃え
                  '&:hover': { backgroundColor: '#f0f0f0', title: 'a' },
                }}
              >
                フォローする
                <ModeEditIcon sx={{ fontSize: 40 }} />
              </IconButton> */}

              {renderFollow()}
            </Tooltip>
            {/* {showEdit ? <ProfileMypageEdit /> : <ProfileMypage />} */}
          </Box>
        ):(
          null
        )}


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
            image={
              ResponseData.icon ?
              `http://localhost:8000/storage/images/userIcon/${ResponseData.icon}`
              :""}
            alt="Loading..."
          />

        </Card>

        <Box>
          <Typography variant="h6">企業名</Typography>
          <Item>{ResponseData.company_name ? ResponseData.company_name : "Loading..."}</Item>
        </Box>
        <Box>
          <Typography variant="h6">企業名(カタカナ)</Typography>
          <Item>{ResponseData.company_namecana ? ResponseData.company_namecana : "Loading..."} </Item>
        </Box>
        {/* <Box>
          <Typography variant="h6">企業採用担当者</Typography>
          <Item>{ResponseData.user_name ? ResponseData.user_name : "Loading..."} </Item>
        </Box> */}
        <Box>
          <Typography variant="h6">企業概要</Typography>
          <Item>{ResponseData.intro ? ResponseData.intro : "Loading..."} </Item>
        </Box>

        <Box>
          <Typography variant="h6">本社所在地</Typography>
          <Item>{ResponseData.address ? ResponseData.address : "Loading..."} </Item>
        </Box>
        <Box>
          <Typography variant="h6">本社所在地マップ</Typography>
          <Item>
            {ResponseData.map_url ? (
              <Iframe
                url={ResponseData.map_url}
                width="100%"
                height="400px"
              />
            ) : (
              "Loading..."
            )}
          </Item>
        </Box>


        {/* 詳細項目がない場合「さらに表示」を表示しない */}
        {(ResponseData.prefecture ||
          ResponseData.selected_occupation ||
          ResponseData.industry ||
          ResponseData.programming_language ||
          ResponseData.development_environment ||
          ResponseData.software ||
          ResponseData.qualification ||
          ResponseData.hp_url ||
          ResponseData.video_url ||
          ResponseData.companyInformation) && (
            <Box>
              <Showmore>
                <Button variant="outlined" ref={showmore} onClick={ShowmoreClick}
                  sx={{ borderColor: '#5956FF', color: '#5956FF', '&:hover': { borderColor: '#5956FF' }, cursor: 'pointer' }}>
                  {showMoreText}
                </Button>
              </Showmore>
            </Box>
          )}
        {/* ResponseData.prefectureがあるときのみ表示 */}
        {ResponseData.prefecture && !close && (
          <Box ref={el => (detail.current[0] = el)} id="detail">
            <Typography variant="h6">勤務地</Typography>
            <Item>{ShowTags(prefecture_tag)}</Item>
          </Box>
        )}
        {/* ResponseData.selected_occupationがあるときのみ表示 */}
        {ResponseData.selected_occupation && !close && (
          <Box ref={el => (detail.current[1] = el)} id="detail">
            <Typography variant="h6">社員の職種・募集職種</Typography>
            <Item>{ShowTags(selected_occupation_tag)}</Item>
          </Box>
        )}
        {/* ResponseData.industryがあるときのみ表示 */}
        {ResponseData.industry && !close && (
          <Box ref={el => (detail.current[2] = el)} id="detail">
            <Typography variant="h6">業界キーワード</Typography>
            <Item>{ShowTags(industry_tag)}</Item>
          </Box>
        )}
        {/* ResponseData.development_environmentがあるときのみ表示 */}
        {ResponseData.development_environment && !close && (
          <Box ref={el => (detail.current[3] = el)} id="detail">
            <Typography variant="h6">開発環境</Typography>
            <Item>{ShowTags(development_environment_tag)}</Item>
          </Box>
        )}
        {/* ResponseData.programming_languageがあるときのみ表示 */}
        {ResponseData.programming_language && !close && (
          <Box ref={el => (detail.current[4] = el)} id="detail">
            <Typography variant="h6">プログラミング言語</Typography>
            <Item>{ShowTags(programming_language_tag)}</Item>
          </Box>
        )}
        {/* ResponseData.qualificationがあるときのみ表示 */}
        {ResponseData.qualification && !close && (
          <Box ref={el => (detail.current[5] = el)} id="detail">
            <Typography variant="h6">社員が取得している資格・取得支援資格・歓迎資格・必須資格</Typography>
            <Item>{ShowTags(qualification_tag)}</Item>
          </Box>
        )}
        {/* ResponseData.softwareがあるときのみ表示 */}
        {ResponseData.software && !close && (
          <Box ref={el => (detail.current[6] = el)} id="detail">
            <Typography variant="h6">ソフトウェア</Typography>
            <Item>{ShowTags(software_tag)}</Item>
          </Box>
        )}
        {/* ResponseData.hp_urlがあるときのみ表示 */}
        {ResponseData.hp_url && !close && (
          <Box ref={el => (detail.current[7] = el)} id="detail">
            <Typography variant="h6">ホームページURL</Typography>
            <Item><a href={ResponseData.hp_url} target="_blank">{ShowTagsCompanyInformation(hp_url_button)}</a></Item>
          </Box>
        )}
        {/* ResponseData.video_urlがあるときのみ表示 */}
        {ResponseData.video_url && !close && (
        <Box ref={el => (detail.current[8] = el)} id="detail">
          <Typography variant="h6">紹介動画</Typography>
          <Item>
            {ResponseData.video_url ? (
              <Iframe
                url={ResponseData.video_url}
                width="100%"
                height="400px"
              />
            ) : (
              "Loading..."
            )}
          </Item>
        </Box>
        )}

        {/* {ResponseData.companyInformation && !close && (
          <Box ref={el => (detail.current[3] = el)} id="detail">
            <Typography variant="h6">企業情報</Typography>
            <table className="company_information_table">
              <tbody>
                {ResponseData.companyInformation.map((info, index) => (
                  <tr key={index}>
                    <th>
                      <Typography variant="title">
                        {ShowTagsCompanyInformation(info.title)}
                      </Typography>
                    </th>
                    <td>
                      <Typography variant="contents">
                        {info.contents}
                      </Typography>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Box>
        )} */}

        {/* </span> */}
      </Stack>
    </Box>



  );

};

export default ProfileMypage;
ProfileMypage.displayName = 'Parent';

