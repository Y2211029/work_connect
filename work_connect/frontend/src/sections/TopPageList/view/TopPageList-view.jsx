import { useContext, useEffect } from "react";
import { useSessionStorage } from "../../../hooks/use-sessionStorage";
import "react-device-frameset/styles/marvel-devices.min.css";
// import $ from "jquery";

import { TopPageModalContext } from "../../../layouts/dashboard";

import Button from "@mui/material/Button";

// ゲストモード時、作品投稿・動画投稿・通知
import { MyContext } from "src/layouts/dashboard/index";

// 新規登録
export default function TopPageListView() {
  const { IsModalContextState, setIsModalContextState } = useContext(TopPageModalContext);
  const { modalOpen } = IsModalContextState;
  const Display = useContext(MyContext);
  // 登録項目確認の際に利用
  const { deleteSessionData } = useSessionStorage();
  deleteSessionData("accountData");

  useEffect(() => {
    console.log("modalOpen", modalOpen);
  }, [modalOpen]); // 空の依存配列を渡して、初回のみ実行するようにする

  const handleChange = (e) => {
    if (e.target.id === "LoginButton") {
      setIsModalContextState((prev) => ({
        ...prev,
        modalType: "学生",
        modalOpen: true,
      }));
    }
  };

  return (
    <>
      <div className="top_page_wrapper">
        <div className="top_page_content">
          <div className="top_page_content_first">
            <div>
              <p className="top_page_message">
                あなたの<span className="top_page_messege_span">アピール</span>が
              </p>
              <p className="top_page_message">
                <span className="top_page_messege_span_second">未来を創る</span>
              </p>
            </div>
            <div>
              <div className="top_page_controller">
                <Button
                  id="LoginButton"
                  variant="contained"
                  className="top_page_button login"
                  onClick={handleChange}
                  sx={{ display: Display.HomePage == "none" ? { xs: "none", md: "none", lg: "flex" } : "none" }}
                >
                  始めよう
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
