import { useSessionStorage } from "../../../hooks/use-sessionStorage";
import Container from "@mui/material/Container";
// import Typography from "@mui/material/Typography";

export default function TopPageListView() {
  // 登録項目確認の際に利用
  const { deleteSessionData } = useSessionStorage();
  deleteSessionData("accountData");

  return (
    <>
      {/* <Typography>サイトにアクセスすると一番初めに表示されるページです。</Typography> */}
      {/* <h1>作品投稿・動画投稿・本登録（テスト表示）・本登録ボタン・通知、検索。ハンバーガーボタンを非表示にします。</h1> */}
      <Container>
        <h1 style={{ position: "fixed", textAlign: "center", color: "white" }}>Work&Connect</h1>
      </Container>
      <img src="/assets/images/covers/cover_25_1Figma.jpg" alt="" />
      <img src="/assets/images/covers/cover_25_2Figma.jpg" alt="" />
    </>
  );
}
