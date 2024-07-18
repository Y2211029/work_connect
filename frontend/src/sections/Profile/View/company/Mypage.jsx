import { useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Iframe from 'react-iframe';
import axios from 'axios';

// Define Item styling
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'left',
  color: theme.palette.text.secondary,
  fontSize: '25px',
}));

function CreateTagElements({ itemContents }) {
  return <button className="greeting">{itemContents}</button>;
}

CreateTagElements.propTypes = {
  itemContents: PropTypes.string.isRequired,
};

// Custom hook for showing tag list
const useTagListShow = (tagName, sessionData) => {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    if (sessionData && sessionData[tagName]) {
      const commaArray = sessionData[tagName].split(',');
      const devtagComponents = commaArray.map((item) => (
        <CreateTagElements key={item} itemContents={item} />
      ));
      setTags(devtagComponents);
    }
  }, [sessionData, tagName]);

  return tags;
};

const ProfileMypage = () => {
  const [sessionId, setSessionId] = useState(null);
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    // Get data from sessionStorage
    const dataString = sessionStorage.getItem("accountData");
    if (dataString) {
      const dataObject = JSON.parse(dataString);
      if (dataObject) {
        setSessionId(dataObject.id);
      }
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (sessionId && !profileData) {
        try {
          const response = await axios.get(
            `http://localhost:8000/c_mypage/${sessionId}`
          );
          console.log(response.data);
          setProfileData(response.data);
        } catch (error) {
          console.error("Error fetching data!", error);
        }
      }
    };
    fetchData();
  }, [sessionId, profileData]);

  const sessionData1 = useMemo(
    () => ({
      '1': '東京本社（渋谷）,横浜支社,東海支社（浜松),中部事務所（名古屋）,西日本支社（大阪）,前橋支社,札幌営業所',
    }),
    []
  );

  const sessionData2 = useMemo(
    () => ({
      '2': 'プログラマ,システムエンジニア',
    }),
    []
  );

  const tag_1 = useTagListShow('1', sessionData1);
  const tag_2 = useTagListShow('2', sessionData2);

    // デストラクチャリングで個々の変数に分ける
    const {
      // id,
      company_name,
      company_namecana,
      user_name,
      icon_id,
      intro,
      address,
      video_url,
      map_url,
      hp_url
      // selected_occupation,
      // prefecture,
      // 他の必要なプロパティも追加できます
    } = profileData || {};


  return (
    <Box sx={{ marginLeft: '25%', width: '50%' }}>
      <Stack spacing={3}>
        <Box>
          <Typography variant="h6">サムネイル・アイコン</Typography>
          <Item>
            <img
              src={icon_id}
              alt="サムネイル・アイコン"
            />
          </Item>
        </Box>
        <Box>
          <Typography variant="h6">企業名</Typography>
          <Item>{company_name}</Item>
        </Box>
        <Box>
          <Typography variant="h6">企業名(カタカナ)</Typography>
          <Item>{company_namecana}</Item>
        </Box>
        <Box>
          <Typography variant="h6">企業採用担当者</Typography>
          <Item>{user_name}</Item>
        </Box>
        <Box>
          <Typography variant="h6">企業概要</Typography>
          <Item>{intro}
        </Item>
        </Box>
        <Box>
          <Typography variant="h6">勤務地</Typography>
          <Item>{tag_1}</Item>
        </Box>
        <Box>
          <Typography variant="h6">業種</Typography>
          <Item>{tag_2}</Item>
        </Box>
        <Box>
          <Typography variant="h6">紹介動画</Typography>
          <Item>
            <Iframe
              url={video_url}
              width="100%"
              height="1000px"
            />
          </Item>
        </Box>
        <Box>
          <Typography variant="h6">本社所在地</Typography>
          <Item>{address}</Item>
          <Item>
            <Iframe
              url={map_url}
              width="100%"
              height="1000px"
            />
          </Item>
        </Box>
        <Box>
        <a href={hp_url} target="blank">
          {company_name}さんのホームページはこちらから!
        </a>
          </Box>
      </Stack>
    </Box>
  );
};

export default ProfileMypage;
