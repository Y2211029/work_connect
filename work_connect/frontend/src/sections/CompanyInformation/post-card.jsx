import { forwardRef, useState, useEffect } from "react";
import PropTypes from "prop-types";
import Tooltip from '@mui/material/Tooltip';
import IconButton from "@mui/material/IconButton";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import './CompanyInformation.css'; // CSSファイルをインポート

const PostCard = forwardRef(({ post }) => {
  const { title_contents } = post; // title_contents を取得
  console.log("title_contentsの内容", title_contents);

  const [MyUserId, setMyUserId] = useState(0);

  useEffect(() => {
    const accountData = JSON.parse(sessionStorage.getItem("accountData"));
    setMyUserId(accountData?.id || 0);
  }, []);

  // データがない場合は早期リターン
  if (!title_contents || title_contents.length === 0) {
    return <div>No post available</div>;
  }

  const handleEditClick = (postId) => {
    console.log(`編集ボタンがクリックされました: ${postId}`);
    // 編集処理を追加する
  };

  const renderEditButton = (companyId) => (
    companyId === MyUserId && (
      <Tooltip title="編集する">
        <IconButton onClick={() => handleEditClick(companyId)}>
          <ModeEditIcon />
        </IconButton>
      </Tooltip>
    )
  );

  return (
    <TableContainer component={Paper} style={{ marginTop: '16px', marginBottom: '20px' }}>
      <Table style={{ width: '70%', borderCollapse: 'collapse' }}>
        <TableHead>
          <TableRow>
            <TableCell style={{ fontWeight: 'bold' }}>タイトル</TableCell>
            <TableCell style={{ fontWeight: 'bold' }}>内容</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {title_contents.map((item) => (
            <TableRow key={item.id}>
              <TableCell>
                {item.title}
                {item.id}
                {renderEditButton(item.company_id,item.id)} {/* 編集ボタンを各行に表示 */}
              </TableCell>
              <TableCell>{item.contents}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
});

PostCard.displayName = "PostCard";

PostCard.propTypes = {
  post: PropTypes.shape({
    company_id: PropTypes.string, // ここで company_id を追加
    id: PropTypes.number.isRequired,
    title_contents: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        contents: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
};

export default PostCard;
