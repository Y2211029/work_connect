import { useTheme } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';

const UserIcon = () => {

    // useTheme初期化
    const theme = useTheme();
  
    return (
        <>
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
              image="/assets/workImages/thumbnail/cover_14.jpg"
              alt="Placeholder"
            />
            
          </Card>
          </>
    );
  };
  
  export default UserIcon;