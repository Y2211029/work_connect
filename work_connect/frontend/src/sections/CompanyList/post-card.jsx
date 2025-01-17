import { forwardRef } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

import { TypographyItems } from "src/components/typography/ItemTypography";

// ----------------------------------------------------------------------

const PostCard = forwardRef((props, ref) => {
  const {
    companies: {
      icon,
      user_name,
      company_name,
      industry,
      selected_occupation,
      prefecture,
      intro,
      follow_status,
    },
  } = props;


  console.log("follow_status", follow_status);



  const renderFollow = follow_status !== "フォローできません" && follow_status !== "フォローする" && (
    <div className="stack_follow_status">
      <Typography opacity="0.48" sx={{ width: "100%" }} className="follow_status">
        {follow_status}
      </Typography>
    </div>
  );

  const renderAvatar = (
    <Avatar
      src={icon ? `http://localhost:8000/storage/images/userIcon/${icon}` : "/assets/images/avatars/avatar_0.jpg"}
      sx={{
        width: 100,
        height: 100,
        zIndex: 9,
        border: "1px solid #dcdcdc",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)", // グレーのボックスシャドウ
      }}
    />
  );

  // 企業名
  const renderUserName = (
    <Typography variant="caption" component="div" className="userName_items">
      {company_name}
    </Typography>
  );

  // 業界
  const renderIndustry = industry !== null ? <TypographyItems ItemName="業界" ItemDetail={industry} /> : null;
  // 職種
  const renderSelectedOccupation = selected_occupation !== null ? <TypographyItems ItemName="職種" ItemDetail={selected_occupation} /> : null;

  // 勤務地
  const renderPrefecture = prefecture !== null ? <TypographyItems ItemName="勤務地" ItemDetail={prefecture} /> : null;

  // 概要
  const renderIntro = intro !== null ? <div>{intro}</div> : null;

  return (
    <div ref={ref}>
      <Link to={`/Profile/${user_name}?page=mypage`} color="inherit" variant="subtitle2" underline="none" className="link item-Link">
        <Stack sx={{ display: "inline-block", width: "100%" }}>
          <div className="postCard item-stack" style={{ width: "100%", padding: "10px" }}>
            {/* フォロー状況 */}
            {renderFollow}
            {/* アバターとユーザー名 */}
            <Stack direction="column" alignItems="center" justifyContent="space-between" spacing={1} sx={{ marginTop: "10px" }}>
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
            <Stack direction="column" alignItems="center" justifyContent="flex-start" sx={{ width: "90%" }} spacing={1}>
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
  companies: PropTypes.object.isRequired,
};

export default PostCard;
