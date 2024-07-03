import { useSessionStorage } from "../../../hooks/use-sessionStorage";

export default function TopPageListView() {
  // 登録項目確認の際に利用
  const { deleteSessionData } = useSessionStorage();
  deleteSessionData("accountData");

  return <>ここはトップページです！！！</>;
}
