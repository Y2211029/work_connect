import { useState, useEffect } from 'react';
import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
import PropTypes from 'prop-types'; // prop-types をインポート
import { useSessionStorage } from "src/hooks/use-sessionStorage";

import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

const blue = {
  100: '#DAECFF',
  200: '#b6daff',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  900: '#003A75',
};

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};

const Textarea = styled(BaseTextareaAutosize)(
  ({ theme }) => `
  box-sizing: border-box;
  width: 100%;
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  padding: 8px 12px;
  border-radius: 8px;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};

  &:hover {
    border-color: ${blue[400]};
  }

  &:focus {
    border-color: ${blue[400]};
    box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
  }

  // firefox
  &:focus-visible {
    outline: 0;
  }
`,
);

const IntroComponent = ({IntroData}) => {

  const [Intro, setIntro] = useState(IntroData);
  const { getSessionData, updateSessionData } = useSessionStorage();

  // valueの初期値をセット
  useEffect(() => {
    // セッションデータ取得
    const SessionData = getSessionData("accountData");
    /// 編集の途中ならセッションストレージからデータを取得する。
    /// (リロードした時も、データが残った状態にする。)
    if (SessionData.Intro !== undefined && SessionData.Intro !== "") {
      // セッションストレージから最新のデータを取得
      setIntro(SessionData.Intro);
    } else {
      // DBから最新のデータを取得
      setIntro(IntroData);
    }
  }, [IntroData]);

  const handleChange = (e) => {
    const newValue = e.target.value;
    setIntro(newValue);
  };

  useEffect(() => {
    updateSessionData("accountData", "Intro", Intro);
  }, [Intro]);

  return (
    <div>
      <Textarea
        name="Intro"
        maxRows={12}
        aria-label="maximum height"
        placeholder="500字以内"
        value={Intro}
        onChange={handleChange}
        maxLength={500}
      />

      <Typography variant="body2" color="textSecondary" align="right" sx={{ marginTop: 0 }}>
        {/* 文字数カウント */}
        {Intro ? Intro.length : ""} / 500
      </Typography>
    </div>
  );
};

// プロパティの型を定義
IntroComponent.propTypes = {
  IntroData: PropTypes.string.isRequired,
};

export default IntroComponent;
