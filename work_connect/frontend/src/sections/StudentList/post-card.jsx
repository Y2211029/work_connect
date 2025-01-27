import { useEffect } from "react";
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
    student: {
      id,
      user_name,
      icon,
      student_surname,
      student_name,
      graduation_year,
      department_name,
      faculty_name,
      major_name,
      course_name,
      intro,
      desired_work_region,
      desired_occupation,
      follow_status,
    },
  } = props;


  useEffect(() => {
    console.log("student_id", id);
    console.log("follow_status", follow_status);
  }, [id, follow_status]);

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
        {user_name}
      </Typography>
      <Typography variant="caption" component="div" className="userName_items">
        {student_surname + student_name}
      </Typography>
    </div>
  );

  const renderFollow = follow_status !== "フォローできません" && follow_status !== "フォローする" && (
    <div className="stack_follow_status">
      <Typography opacity="0.48" sx={{ width: "100%" }} className="follow_status">
        {follow_status}
      </Typography>
    </div>
  );

  const renderGraduationYear = graduation_year !== null ? <TypographyItems ItemName="卒業年" ItemDetail={graduation_year} /> : null;

  const renderdepartmentName = department_name !== null ? <TypographyItems ItemName="学部" ItemDetail={department_name} /> : null;

  const renderfacultyName = faculty_name !== null ? <TypographyItems ItemName="学科" ItemDetail={faculty_name} /> : null;
  
  const rendermajorName = major_name !== null ? <TypographyItems ItemName="専攻" ItemDetail={major_name} /> : null;

  const rendercourseName = course_name !== null ? <TypographyItems ItemName="コース" ItemDetail={course_name} /> : null;

  const renderDesiredWorkRegion = desired_work_region !== null ? <TypographyItems ItemName="希望勤務地" ItemDetail={desired_work_region} /> : null;

  const renderDesiredOccupation = desired_occupation !== null ? <TypographyItems ItemName="希望職種" ItemDetail={desired_occupation} /> : null;

  const renderIntro = intro !== null ? <div>{intro}</div> : null;

  return (
    <div ref={ref}>
      <Link to={`/Profile/${user_name}?page=mypage`} color="inherit" variant="subtitle2" underline="none" className="link item-Link">
        <Stack sx={{ display: "inline-block", width: "100%" }}>
          <div className="postCard item-stack" style={{ width: "100%", padding: "10px" }}>
            {/* フォロー状況 */}

            {renderFollow}

            {/* アバターとユーザーネーム */}
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
  student: PropTypes.object.isRequired,
//   user_name: PropTypes.string.isRequired,
//   icon: PropTypes.string.isRequired,
//   student_surname: PropTypes.string.isRequired,
//   student_name: PropTypes.string.isRequired,
//   graduation_year: PropTypes.string.isRequired,
//   department_name: PropTypes.string,
//   faculty_name: PropTypes.string,
//   major_name: PropTypes.string,
//   course_name: PropTypes.string,
//   intro: PropTypes.string,
//   desired_work_region: PropTypes.string,
//   desired_occupation: PropTypes.string,
//   follow_status: PropTypes.string,
};

export default PostCard;
