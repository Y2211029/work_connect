import "../../../App.css";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
// sessionStrage呼び出し
import { useSessionStorage } from "src/hooks/use-sessionStorage";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
const WorkSelect = () => {
  const location = useLocation();
  const queryParam = new URLSearchParams(location.search);
  const type = queryParam.get('type');

  let navigation = useNavigate();
  const [edit, setEdit] = useState(false);
  console.log("WorkSelect_location", location);
  console.log("WorkSelect_location", location.search);

  useEffect(() => {
    if (type == "edit") {
      setEdit(true);
    }
  }, [type])


  // const handleOpenModal = () => {
  //   // setShowModal(true);
  //   navigation("/WorkPosting");
  // };
  const handleOpenModal2 = () => {
    // setShowModal(true);
    console.log(UserName);

    navigation("/Profile/" + UserName);
  };

  // ユーザーネーム取得
  const { getSessionData } = useSessionStorage();
  const accountData = getSessionData("accountData");
  const UserName = accountData.user_name;



  return (
    <div className="work_after_posting">
      {edit ? "更新しました" : "投稿しました"}
      {/* <Button onClick={handleOpenModal} variant="contained">
        続けて投稿する
      </Button> */}
      <Button onClick={handleOpenModal2} variant="contained">
        マイページ
      </Button>
    </div>
  );
};

export default WorkSelect;
