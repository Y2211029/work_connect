import { useSessionStorage } from "src/hooks/use-sessionStorage";

// インポート
import Chat_router from "src/sections/Chat/student/index";
import Chat_router2 from "src/sections/Chat/company/index";

export default function Chat() {

    // セッションストレージ取得
    const { getSessionData } = useSessionStorage();

    const accountData = getSessionData("accountData");

    if(accountData.id && accountData.id[0]  === "S"){
        // 学生側
        return (
        <>
            <Chat_router />
        </>
        );
    } else if(accountData.id && accountData.id[0]  === "C"){
        // 企業側
        return (
        <>
            <Chat_router2 />
        </>
        );
    } else {
        console.log("routerエラー");
    }

}
