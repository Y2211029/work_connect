import { useSessionStorage } from "../../../hooks/use-sessionStorage";

export default function TopPageListView() {
  // 登録項目確認の際に利用
  const { deleteSessionData } = useSessionStorage();
  deleteSessionData("accountData");

  return (
    <>
      <h1>topPageです。</h1>
      <h1>ログインしていないときの画面です。</h1>
      <h1>作品投稿・動画投稿・本登録（テスト表示）・本登録ボタン・通知、検索。ハンバーガーボタンを非表示にします。</h1>
    </>
  );
}
