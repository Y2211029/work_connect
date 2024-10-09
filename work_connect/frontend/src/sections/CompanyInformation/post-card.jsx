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

const PostCard = forwardRef(function PostCard({ post },) {
  const { company_id,title_contents } = post;

  const [MyUserId, setMyUserId] = useState(0);

  useEffect(() => {
    const accountData = JSON.parse(sessionStorage.getItem("accountData"));
    setMyUserId(accountData?.id || 0);
  }, []);

  // post が存在しない場合は早期リターン
  if (!title_contents || title_contents.length === 0) {
    return <div>No post available</div>;
  }

  console.log(title_contents);
  console.log(company_id);


  const handleEditClick = (postId) => {
    console.log(`編集ボタンがクリックされました: ${postId}`);
    // 編集処理をここに追加
  };

  const renderEditButton = (companyId) => (
    companyId === MyUserId && (
      <div className="company-info-edit">
        <Tooltip title="編集する">
          <IconButton onClick={() => handleEditClick(companyId)}>
            <ModeEditIcon />
          </IconButton>
        </Tooltip>
      </div>
    )
  );

  const renderTable = (
    <TableContainer component={Paper} style={{ marginTop: '16px', marginBottom: '20px' }}>
      <Table style={{ width: '70%', borderCollapse: 'collapse' }}>
        <TableHead>
          <TableRow>
            <TableCell style={{ fontWeight: 'bold' }}>タイトル</TableCell>
            <TableCell style={{ fontWeight: 'bold' }}>内容</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {title_contents.map((item, index) => ( // title_contentsをループして行を生成
            <TableRow key={index}>
              <TableCell>
                {item.title}
                {renderEditButton(company_id)} {/* 編集ボタンを各タイトルの横に表示 */}
              </TableCell>
              <TableCell>{item.contents}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  return <>{renderTable}</>;
});

PostCard.propTypes = {
  post: PropTypes.shape({
    company_id: PropTypes.string,
    company_name: PropTypes.string,
    title_contents: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        contents: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
};


export default PostCard;
