import PropTypes from "prop-types";

import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
// import Avatar from "@mui/material/Avatar";
// import { alpha } from "@mui/material/styles";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";
import { useSessionStorage } from "src/hooks/use-sessionStorage";
import { useNavigate } from "react-router-dom";

// import { fDate } from "src/utils/format-time";

import { fShortenNumber } from "src/utils/format-number";

import Iconify from "src/components/iconify";

// ----------------------------------------------------------------------

export default function PostCard({ post, index }) {
  const {news_id, company_name, article_title, genre, header_img, news_created_at, view, comment} = post;

  const navigate = useNavigate();
  const latestPostLarge = index === -1;

  const { getSessionData } = useSessionStorage();
  const accountData = getSessionData("accountData");
  const data = {
    account_id: accountData.id,
  };

  console.log(data);
  console.log(news_id);


  const handleProfileJump = () => {
    navigate(`/Profile/${company_name}`);
  }

  const handleNewsDetailJump = (news_id) => {
    const entity = { id: news_id }; // オブジェクトとして扱う
    navigate("/news_detail", { state: entity }); // パラメータを渡して遷移
  };


  // const latestPost = index === 1 || index === 2;

  const renderTitle = (
    <Link
      onClick={() => handleNewsDetailJump(news_id)}
      color="inherit"
      variant="subtitle2"
      underline="hover"
      sx={{
        height: 44,
        overflow: "hidden",
        WebkitLineClamp: 2,
        display: "-webkit-box",
        WebkitBoxOrient: "vertical",
        // ...(latestPostLarge && { typography: "h5", height: 60 }),
        // ...((latestPostLarge || latestPost) && {
        //   color: "common.white",
        // }),
      }}
    >
      {article_title}
    </Link>
  );

  //企業名
  const renderCompanyName = (
    <Link
      onClick={handleProfileJump}
      color="inherit"
      variant="subtitle2"
      underline="hover"
      sx={{
        height: 44,
        overflow: "hidden",
        WebkitLineClamp: 2,
        display: "-webkit-box",
        WebkitBoxOrient: "vertical",
        // ...(latestPostLarge && { typography: "h5", height: 60 }),
        // ...((latestPostLarge || latestPost) && {
        //   color: "common.white",
        // }),
      }}
    >
      {company_name}
    </Link>
  );



  // ジャンル(インターンシップor求人orブログ)
  const renderGenre = genre !== null ? <Typography opacity="0.48">{genre}</Typography> : null;

  // 投稿日
  const renderNewsCreatedAt = news_created_at !== null ? <Typography opacity="0.48">{news_created_at}に投稿されました</Typography> : null;

  const renderInfo = (
    <Stack
      direction="row"
      flexWrap="wrap"
      spacing={1.5}
      justifyContent="flex-end"
      sx={{
        mt: 3,
        color: "text.disabled",
      }}
    >
      {[
        { number: comment, icon: "eva:message-circle-fill" },
        { number: view, icon: "eva:eye-fill" },
        // { number: share, icon: "eva:share-fill" },
      ].map((info, _index) => (
        <Stack
          key={_index}
          direction="row"
          sx={
            {
              // ...((latestPostLarge || latestPost) && {
              //   opacity: 0.48,
              //   color: "common.white",
              // }),
            }
          }
        >
          <Iconify width={16} icon={info.icon} sx={{ mr: 0.5 }} />
          <Typography variant="caption">{fShortenNumber(info.number)}</Typography>
        </Stack>
      ))}
    </Stack>
  );

  const renderCover = (
    <Box
      component="img"
      // alt={title}
      //C:\xampp\apps\work_connect\work_connect\frontend\public\header_img\DT_2024-08-11_13-54-04.jpg
      src={header_img}
      sx={{
        top: 0,
        width: 1,
        height: 1,
        objectFit: "cover",
        position: "absolute",
      }}
    />
  );

  // const renderDate = (
  //   <Typography
  //     variant="caption"
  //     component="div"
  //     sx={{
  //       mb: 2,
  //       color: "text.disabled",
  //       ...((latestPostLarge || latestPost) && {
  //         opacity: 0.48,
  //         color: "common.white",
  //       }),
  //     }}
  //   >
  //     {fDate(createdAt, "yyyy MM dd")}
  //   </Typography>
  // );


  return (
    <Grid xs={12} sm={latestPostLarge ? 12 : 6} md={latestPostLarge ? 6 : 3}>
      <Card>
        <Box
          sx={{
            position: "relative",
            pt: "calc(100% * 3 / 4)",
            // ...((latestPostLarge || latestPost) && {
            //   pt: "calc(100% * 4 / 3)",
            //   "&:after": {
            //     top: 0,
            //     content: "''",
            //     width: "100%",
            //     height: "100%",
            //     position: "absolute",
            //     bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
            //   },
            // }),
            // ...(latestPostLarge && {
            //   pt: {
            //     xs: "calc(100% * 4 / 3)",
            //     sm: "calc(100% * 3 / 4.66)",
            //   },
            // }),
          }}
        >

          {renderCover}


        </Box>

        <Box
          sx={{
            p: (theme) => theme.spacing(4, 3, 3, 3),
            // ...((latestPostLarge || latestPost) && {
            //   width: 1,
            //   bottom: 0,
            //   position: "absolute",
            // }),
          }}
        >

          {renderTitle}

          {renderCompanyName}

          {renderGenre}

          {renderNewsCreatedAt}

          {renderInfo}
        </Box>
      </Card>
    </Grid>
  );
}

PostCard.propTypes = {
  post: PropTypes.object.isRequired,
  index: PropTypes.number,
};
