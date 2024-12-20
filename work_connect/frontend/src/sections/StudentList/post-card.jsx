import { useEffect } from "react";
import { forwardRef } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

// import { follow } from "src/_mock/follow";
// import { useSessionStorage } from "src/hooks/use-sessionStorage";

import { TypographyItems } from "src/components/typography/ItemTypography";

// ----------------------------------------------------------------------

const PostCard = forwardRef(({ post }, ref) => {
  const {
    student_id,
    icon,
    userName,
    studentName,
    graduationYear,
    departmentName,
    facultyName,
    majorName,
    courseName,
    intro,
    desiredWorkRegion,
    desiredOccupation,
    followStatus: initialFollowStatus,
    author,
  } = post;

  // const [followStatus, setFollowStatus] = useState(initialFollowStatus);
  const followStatus = initialFollowStatus;
  // const { getSessionData } = useSessionStorage();
  // const accountData = getSessionData("accountData");

  // const data = {
  //   account_id: accountData.id,
  // };

  useEffect(() => {
    console.log("student_id", student_id);
    console.log("followStatus", followStatus);
  }, [student_id, followStatus]);

  // const handleFollowClick = async () => {
  //   try {
  //     const updatedFollowStatus = await follow(data.account_id, student_id);
  //     if (updatedFollowStatus) {
  //       setFollowStatus(updatedFollowStatus);
  //     }
  //   } catch (error) {
  //     console.error("フォロー処理中にエラーが発生しました！", error);
  //   }
  // };

  const renderAvatar = (
    <Avatar
      alt={author.name}
      src={icon ? `http://localhost:8000/storage/images/userIcon/${icon}` : author.avatarUrl}
      sx={{
        width: 100,
        height: 100,
        zIndex: 9,
        border: "1px solid #dcdcdc",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)", // グレーのボックスシャドウ
      }}
    />
  );

  const renderUserName = (
    <div style={{ textAlign: "center" }}>
      <Typography
        variant="caption"
        component="div"
        sx={(theme) => ({
          mb: 0,
          fontSize: "0.5rem",
          color: "common.black",
          opacity: "0.5",
          [theme.breakpoints.up("sm")]: { fontSize: "0.6rem" }, // スモールスクリーン以上でフォントサイズを変更
          [theme.breakpoints.up("md")]: { fontSize: "0.8rem" }, // 中サイズスクリーン以上でフォントサイズを変更
        })}
      >
        {userName}
      </Typography>
      <Typography variant="caption" component="div" className="userName_items">
        {studentName}
      </Typography>
    </div>
  );

  const renderFollow = followStatus !== "フォローできません" && followStatus !== "フォローする" && (
    <div className="stack_follow_status">
      <Typography opacity="0.48" sx={{ width: "100%" }} className="follow_status">
        {followStatus}
      </Typography>
    </div>
  );

  const renderGraduationYear = graduationYear !== null ? <TypographyItems ItemName="卒業年" ItemDetail={graduationYear} /> : null;

  const renderdepartmentName = departmentName !== null ? <TypographyItems ItemName="学部" ItemDetail={departmentName} /> : null;

  const renderfacultyName = facultyName !== null ? <TypographyItems ItemName="学科" ItemDetail={facultyName} /> : null;
  const rendermajorName = majorName !== null ? <TypographyItems ItemName="専攻" ItemDetail={majorName} /> : null;

  const rendercourseName = courseName !== null ? <TypographyItems ItemName="コース" ItemDetail={courseName} /> : null;

  const renderDesiredWorkRegion = desiredWorkRegion !== null ? <TypographyItems ItemName="希望勤務地" ItemDetail={desiredWorkRegion} /> : null;

  const renderDesiredOccupation = desiredOccupation !== null ? <TypographyItems ItemName="希望職種" ItemDetail={desiredOccupation} /> : null;

  const renderIntro = intro !== null ? <div>{intro}</div> : null;

  return (
    <div ref={ref}>
      <Link to={`/Profile/${userName}?page=mypage`} color="inherit" variant="subtitle2" underline="none" className="link item-Link">
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

            {/* 学生情報 */}
            <Stack direction="column" alignItems="center" justifyContent="flex-start" sx={{ width: "90%" }} spacing={1}>
              {renderGraduationYear}
              {renderdepartmentName}
              {renderfacultyName}
              {rendermajorName}
              {rendercourseName}
              {renderDesiredOccupation}
              {renderDesiredWorkRegion}
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
