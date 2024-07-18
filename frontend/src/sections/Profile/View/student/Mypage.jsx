//import * as React from 'react';
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';


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
    color: '#5956FF',
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

    const tag_1 = useTagListShow("1", {"1":"プログラマー,システムエンジニア"});// sessiondata
    const tag_2 = useTagListShow("2", {"2":"windows"});// sessiondata
    const tag_3 = useTagListShow("3", {"3":"ゲーム"});// sessiondata
    const tag_4 = useTagListShow("4", {"4":"大阪府,東京都"});// sessiondata
    const tag_5 = useTagListShow("5", {"5":"php,js"});// sessiondata
    const tag_6 = useTagListShow("6", {"6":"ITパスポート,基本情報技術者試験"});// sessiondata
    const tag_7 = useTagListShow("7", {"7":"Figma"});// sessiondata

    return (
        <Box sx={{ marginLeft: '25%', width: '50%' }}>
          <Stack spacing={3}>
          {/* ModeEdit 編集 */}
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
              <Item>清風情報工科学院の坂東です。私はコミュニケーション能力を活かして、テニスサークルで渉外係をしていました。外部のサークルとの練習試合を企画することが主な仕事で、調整の窓口としてたくさんの人とやり取りをしました。

                    特に大会の前は準備の忙しい中で練習試合をすることになるので、自分のサークルと相手のサークルの両方にとって良い試合ができるよう、スケジュール管理にも気を配りました。
                    スムーズに交渉をする力と、この経験で身につけたマネジメントの力を活かして御社でも活躍したいです。</Item>
            </Box>
            <Box>
              <Typography variant="h6">卒業年度</Typography>
              <Item>2025年</Item>
            </Box>
            <Box>
              <Typography variant="h6">希望職種</Typography>
              <Item><span>{tag_1}</span></Item>
            </Box>
            <Box>
              <Typography variant="h6">学校名(大学名)</Typography>
              <Item>清風情報工科学院</Item>
            </Box>
            <Box>
              <Showmore>さらに表示</Showmore>
            </Box>
            {/* mui:KeyboardArrowDown さらに表示 */}
            {/* mui:KeyboardArrowUp 閉じる */}
            <Box>
              <Typography variant="h6">学部</Typography>
              <Item>情報学部</Item>
            </Box>
            <Box>
              <Typography variant="h6">学科</Typography>
              <Item>電子工学科</Item>
            </Box>
            <Box>
              <Typography variant="h6">開発環境</Typography>
              <Item><span>{tag_2}</span></Item>
            </Box>
            <Box>
              <Typography variant="h6">趣味</Typography>
              <Item><span>{tag_3}</span></Item>
            </Box>
            <Box>
              <Typography variant="h6">希望勤務地</Typography>
              <Item><span>{tag_4}</span></Item>
            </Box>
            <Box>
              <Typography variant="h6">プログラミング言語</Typography>
              <Item><span>{tag_5}</span></Item>
            </Box>
            <Box>
              <Typography variant="h6">取得資格</Typography>
              <Item><span>{tag_6}</span></Item>
            </Box>
            <Box>
              <Typography variant="h6">ソフトウェア</Typography>
              <Item><span>{tag_7}</span></Item>
            </Box>
          </Stack>
        </Box>
      );

};

export default ProfileMypage;