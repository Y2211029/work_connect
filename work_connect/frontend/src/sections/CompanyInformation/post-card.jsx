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
import Switch from '@mui/material/Switch';
import './CompanyInformation.css'; // CSSファイルをインポート
import axios from "axios";

const PostCard = forwardRef(({ post }) => {
  const { title_contents } = post;
  console.log("title_contentsの内容", title_contents);
  console.log("postの内容", post);
  const CompanyInformationsSaveURL = "http://localhost:8000/company_informations_save";

  const [MyUserId, setMyUserId] = useState(0);
  const [showEdit, setShowEdit] = useState(false);
  const [editedContents, setEditedContents] = useState(title_contents); // 編集用の状態を追加

  useEffect(() => {
    const accountData = JSON.parse(sessionStorage.getItem("accountData"));
    setMyUserId(accountData?.id || 0);
  }, []);

  // newContentsが変化したとき保存する
  useEffect(() => {
    async function CompanyInformationSave() {

      console.log("編集のデータ", editedContents);
      try {
        // Laravel側からデータを取得
        const response = await axios.post(CompanyInformationsSaveURL, {
          CompanyInformation: editedContents,
        });
        if (response) {
          console.log("成功です");
        }
        // console.log("ResponseData:", ResponseData);
      } catch (err) {
        console.error("Error saving company information:", err.response ? err.response.data : err.message);
      }
    }
    // DBへデータを保存
    CompanyInformationSave();
  }, [editedContents]);

  //モーダルが開いているときは、下画面のスクロールを無効にする
  useEffect(() => {
    if (showEdit) {
      // モーダルが表示されているときにスクロールを無効にする
      document.body.style.overflow = 'hidden';
    } else {
      // モーダルが表示されていないときにスクロールを有効に戻す
      document.body.style.overflow = 'auto';
    }

    // クリーンアップ関数で元のスタイルに戻す
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showEdit]);


  // データがない場合は早期リターン
  if (!title_contents || title_contents.length === 0) {
    return <div>No post available</div>;
  }

  const handleEditClick = (postId) => {
    console.log(`編集ボタンがクリックされました: ${postId}`);
    setShowEdit(true);
    setEditedContents(title_contents); // 編集ボタンをクリックしたときに内容を初期化
  };

  const handlePublicStatusChange = (index, value) => {
    console.log("インデックス", index);
    console.log("バリュー", value);
  }


  const renderEditButton = (companyId) => (
    companyId === MyUserId && (
      <Tooltip title="編集する">
        <IconButton onClick={() => handleEditClick(companyId)}>
          <ModeEditIcon />
        </IconButton>
      </Tooltip>
    )
  );

  // 入力内容を更新するための関数
  const handleTextChange = (index, field, value) => {
    setEditedContents(prevContents => {
      const newContents = [...prevContents];
      newContents[index][field] = value; // 特定のフィールドを更新
      return newContents;
    });
  };


  const renderEdit = (
    <div>
      <div className="modal_overlay">
        <div className="modal_window">
          {/* テキストエリアを含むテーブル */}
          <TableContainer component={Paper} className="tableContainer">
            <Table className="Table">
              <TableHead>
                <TableRow>
                  <TableCell style={{ fontWeight: 'bold', width: '30%' }}>タイトル</TableCell>
                  <TableCell style={{ fontWeight: 'bold', width: '70%' }}>内容</TableCell>
                  <TableCell style={{ fontWeight: 'bold', width: '10%' }}>公開状態</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {editedContents.map((item, index) => {
                  // Tooltipのタイトルを動的に設定
                  const Tooltip_Title = item.public_status === 1 
                    ? "公開状態を切り替える 現在:公開中"
                    : "公開状態を切り替える 現在:非公開中";
  
                  return (
                    <TableRow key={item.id}>
                      <TableCell>
                        <input
                          type="text"
                          value={item.title}
                          onChange={(e) => handleTextChange(index, "title", e.target.value)}
                        />
                      </TableCell>
                      <TableCell>
                        <textarea
                          value={item.contents}
                          onChange={(e) => handleTextChange(index, "contents", e.target.value)}
                        />
                      </TableCell>
                      <TableCell>
                        <Tooltip title={Tooltip_Title}>
                          <Switch
                            checked={item.public_status === 1}
                            onChange={() => handlePublicStatusChange(index)} // e.target.value は不要
                            inputProps={{ 'aria-label': 'controlled' }}
                          />
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <p><button onClick={() => setShowEdit(false)}>close</button></p>
        </div>
      </div>
    </div>
  );
  

  return (
    <div style={{ marginTop: '16px', marginBottom: '20px' }}>
      {/* テーブルの上に1つだけ編集ボタンを配置 */}
      {renderEditButton(title_contents[0].company_id)} {/* 編集ボタンをここに表示 */}

      {/* 編集コンテンツを表示 */}
      {showEdit && renderEdit}

      {/* テーブルコンテナ */}
      <TableContainer component={Paper} className="tableContainer">
        <Table className="Table"> {/* テーブルにクラスを適用 */}
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: 'bold', width: '30%' }}>タイトル</TableCell>
              <TableCell style={{ fontWeight: 'bold', width: '70%' }}>内容</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {title_contents.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.title}</TableCell>
                <TableCell>{item.contents}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
});

PostCard.displayName = "PostCard";

PostCard.propTypes = {
  post: PropTypes.shape({
    company_id: PropTypes.string, // ここで company_id を追加
    title_contents: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        contents: PropTypes.string.isRequired,
        company_id: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
};

export default PostCard;
