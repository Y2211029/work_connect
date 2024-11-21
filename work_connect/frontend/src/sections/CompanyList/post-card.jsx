import { useState, useEffect } from "react";
import { forwardRef } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

import { follow } from "src/_mock/follow";
import { useSessionStorage } from "src/hooks/use-sessionStorage";

import { TypographyItems } from "src/components/typography/ItemTypography";

// ----------------------------------------------------------------------

const PostCard = forwardRef(({ post }, ref) => {
  const {
    company_id,
    icon,
    userName,
    companyName,
    industry,
    selectedOccupation,
    prefecture,
    intro,
    author,
    followStatus: initialFollowStatus,
  } = post;

  const [followStatus, setFollowStatus] = useState(initialFollowStatus);

  const { getSessionData } = useSessionStorage();
  const accountData = getSessionData("accountData");
  const data = {
    account_id: accountData.id,
  };

  console.log("followStatus",followStatus);


  useEffect(() => {
    console.log("company_id", company_id);
  }, [company_id]);

  const handleFollowClick = async () => {
    try {
      const updatedFollowStatus = await follow(data.account_id, company_id);
      if (updatedFollowStatus) {
        setFollowStatus(updatedFollowStatus);
      }
    } catch (error) {
      console.error("フォロー処理中にエラーが発生しました！", error);
    }
  };
  
  const renderFollow = followStatus !== "フォローできません" && (
    <Typography opacity="0.48" sx={{ width: "100%" }} onClick={handleFollowClick}>
      {followStatus}
    </Typography>
  );


  const renderAvatar = (
    <Avatar
      alt={author.name}
      src={icon ? `http://localhost:8000/storage/images/userIcon/${icon}` : author.avatarUrl}
      sx={{
        width: 100,
        height: 100,
        zIndex: 9,
        border: "1px solid #dcdcdc",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)" // グレーのボックスシャドウ
      }}
    />
  );

  // 企業名
  const renderUserName = (
    <Typography
      variant="caption"
      component="div"
      sx={{
        mb: 2,
        opacity: 0.48,
        // color: "common.white",
        color: "common.black",
      }}
    >
      {companyName}
    </Typography>
  );


  // 業界
  const renderIndustry = industry !== null ? (
    <TypographyItems ItemName="業界" ItemDetail={industry} />
  ) : null;
  // 職種
  const renderSelectedOccupation = selectedOccupation !== null ? (
    <TypographyItems ItemName="職種" ItemDetail={selectedOccupation} />
  ) : null;

  // 勤務地
  const renderPrefecture = prefecture !== null ? (
    <TypographyItems ItemName="勤務地" ItemDetail={prefecture} />
  ) : null;

  // 概要
  const renderIntro = intro !== null ? (
    <div>
      {intro}
    </div>
  ) : null;

  return (
    <div ref={ref} >
      <Link
        to={`/Profile/${userName}?page=mypage`}
        color="inherit"
        variant="subtitle2"
        underline="none"
        className="link item-Link"
      >
        <Stack sx={{ display: "inline-block", width: "100%"}}  >

          <div className="postCard item-stack" style={{ width: "100%", padding: "10px"  }} >
            {/* フォロー状況 */}
            <Stack direction="row" alignItems="center" justifyContent="flex-start" sx={{ width: "100%" }} >
              {renderFollow}
              {/* <Typography variant="body1" sx={{ padding: "3px 10px", borderRadius: "10px", backgroundColor: "#57ADFE", color: "white" }}>
                フォロー中
              </Typography> */}
            </Stack>

            {/* アバターとユーザー名 */}
            <Stack direction="column" alignItems="center" justifyContent="space-between" spacing={1}  sx={{marginTop: "10px"}}>
              {renderAvatar}
              <Typography variant="h6" sx={{ mt: 2 }}>
                {renderUserName}
              </Typography>
            </Stack>

            {/* 自己紹介 */}
            <Stack direction="column" alignItems="center" justifyContent="center" spacing={1} sx={{ padding: "5px" }}>
              <Typography variant="body2" sx={{ color: "gray", mt: 2 }}>
                {renderIntro}
              </Typography>
            </Stack>

            {/* 企業情報 */}
            <Stack direction="column" alignItems="center" justifyContent="flex-start" sx={{ width: "90%" }} spacing={1} >
              {renderIndustry}
              {renderSelectedOccupation}
              {renderPrefecture}
            </Stack>
          </div>
        </Stack>
      </Link>
    </div>
  );
});

// `displayName` の追加
PostCard.displayName = "PostCard";

PostCard.propTypes = {
  post: PropTypes.object.isRequired,
};

export default PostCard;