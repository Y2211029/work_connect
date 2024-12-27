import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { ColorRing } from "react-loader-spinner";
import axios from "axios";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import IconButton from "@mui/material/IconButton";
import Tooltip from '@mui/material/Tooltip';
import EditCompanyInformation from './EditCompanyInformation';
import { arrayMove } from '@dnd-kit/sortable';

// ----------------------------------------------------------------------

export default function CompanyNewsPage() {

  const { user_name } = useParams();
  const [TrueTitleContents, setTitleContents] = useState([]);
  const [CompanyId, setCompanyId] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  const [editedContents, setEditedContents] = useState([]);
  const [MyUserId, setMyUserId] = useState(0);
  const [MyUserName, setMyUserName] = useState("");
  const path = location.pathname;
  const URLUserName = path.split('/')[2];
  const canEdit = (CompanyId === MyUserId) || (URLUserName === MyUserName);

  console.log("企業の詳細情報: user_name", user_name);

  useEffect(() => {
    const accountData = JSON.parse(sessionStorage.getItem("accountData"));
    setMyUserId(accountData?.id || 0);
    setMyUserName(accountData.user_name);
    console.log("MyUserName:", accountData.user_name);
  }, []);

  useEffect(() =>{
    console.log(("企業情報が更新されました", editedContents));
  },[editedContents])

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`http://localhost:8000/company_informations`, {
          params: { CompanyName: user_name }, // クエリパラメータとして渡す
        });
        console.log("レスポンス", response);
        console.log("企業情報", response.data.title_contents);
        console.log("すべての企業情報", response.data.all_company_information);
        const companyId = response.data.title_contents[0].company_id;
        setCompanyId(companyId);
        setTitleContents(response.data.title_contents);
        setEditedContents(response.data.all_company_information);
      } catch (error) {
        console.error("データの取得中にエラーが発生しました！", error);
      }
    }
    fetchData();
  }, [user_name]);

  useEffect(() => {
    if (showEdit) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showEdit]);

  const companyInformationSave = async() =>{
      console.log("企業名", MyUserName);
      console.log("企業情報の配列", editedContents);

      try {
        const response = await axios.post(`http://localhost:8000/company_informations_save`, {
          CompanyName: MyUserName,
          CompanyInformations: editedContents,
        });
        console.log("レスポンス", response);
        console.log("企業情報", response.data.title_contents);
        console.log("すべての企業情報", response.data.all_company_information);
        const companyId = response.data.company_id;
        setCompanyId(companyId);
        setTitleContents(response.data.title_contents);
        setEditedContents(response.data.all_company_information);
      } catch (error) {
        console.error("データの取得中にエラーが発生しました！", error);
      }
  }

  const handleEditClick = (postId) => {
    console.log("編集ボタンがクリックされました", postId);
    if (editedContents) {
      setShowEdit(true);
      console.log(editedContents);
      console.log("通ってます");
    }
  };

  const handlePublicStatusChange = (index) => {
    setEditedContents(prevContents => {
      const newContents = [...prevContents];
      newContents[index].public_status = newContents[index].public_status === 1 ? 0 : 1;
      return newContents;
    });
  };

  const handleTextChange = (index, field, value) => {
    setEditedContents(prevContents => {
      const newContents = [...prevContents];
      newContents[index] = {
        ...newContents[index],
        [field]: value,
      };
      return newContents;
    });
  };

  const handleDelete = (index) => {
    const result = window.confirm("本当に削除しますか?");
    if (result) {
      setEditedContents(prevContents => prevContents.filter((_, i) => i !== index));
    }
  };


  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = editedContents.findIndex(item => item.id === active.id);
      const newIndex = editedContents.findIndex(item => item.id === over.id);

      // 並び替え処理
      const reorderedItems = arrayMove(editedContents, oldIndex, newIndex);

      // row_numberを更新
      const updatedItems = reorderedItems.map((item, index) => {
        return {
          ...item,
          row_number: index + 1, // 1から順にrow_numberを設定
        };
      });

      console.log(updatedItems);

      setEditedContents(updatedItems);
    }
  };

  const handleAddRow = (index) => {
    const newRow = {
      id: editedContents.length + 1, // ユニークなIDを生成
      title: '新しいタイトル',      // 新しい行の初期タイトル
      contents: '新しい内容',   // 新しい行の初期内容
      public_status: 0, // 新しい行の公開状態（初期は非公開）
      company_id: CompanyId, // 既存の企業IDを設定
      row_number: editedContents.length + 1 // 新しい行のrow_numberを設定
    };

    setEditedContents(prevContents => {
      // 新しい行を指定されたインデックスの1つ下に追加
      const newContents = [...prevContents];
      newContents.splice(index + 1, 0, newRow);
      return newContents;
    });
  };

  //閉じるボタンを押したら更新後のtitle_contentsを取得しに行って渡す
  const modalclose = () => {
    setShowEdit(false)
    console.log("更新するデータ",editedContents);
    companyInformationSave();
  }

  const renderEditButton = (
    <>
      {canEdit ? (
        <div>
          <Tooltip title="編集する">
            <IconButton onClick={() => handleEditClick(CompanyId)}>
              <ModeEditIcon />
            </IconButton>
          </Tooltip>
        </div>
      ) : null}

      {/* 関数の場合は大文字、変数の場合は最初小文字 企業情報を編集する */}
      <EditCompanyInformation
        IsOpen={showEdit}   //モーダルを開く関数
        CloseModal={modalclose} //モーダルを閉じる関数
        editedContents={editedContents} //全ての企業情報
        HandlePublicStatusChange={handlePublicStatusChange}
        HandleAddRow={handleAddRow}
        HandleDragEnd={handleDragEnd}
        HandleDelete={handleDelete}
        HandleTextChange={handleTextChange}
      />
    </>
  )

  const renderTable = (
    <>
      {TrueTitleContents && TrueTitleContents.length > 0 ? (
        <TableContainer component={Paper} className="tableContainer">
          <Table className="Table">
            <TableHead>
              <TableRow>
                <TableCell style={{ fontWeight: 'bold', width: '40%' }}>タイトル</TableCell>
                <TableCell style={{ fontWeight: 'bold', width: '60%' }}>内容</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {TrueTitleContents.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.title || "タイトルなし"}</TableCell>
                  <TableCell>{item.contents || "内容なし"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <ColorRing
          visible={true}
          height="100"
          width="100"
          ariaLabel="color-ring-loading"
          wrapperStyle={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
          wrapperClass="custom-color-ring-wrapper"
          colors={["#41a4ff", "#FFFFFF", "#41a4ff", "#41a4ff", "#FFFFFF"]}
          style={{ flexDirection: "column" }}
        />
      )}
    </>
  )

  return (
    <>
      <Helmet>
        <title> 企業の詳細情報 | Work&Connect </title>
      </Helmet>

      {renderEditButton}
      {renderTable}

    </>
  );
}
