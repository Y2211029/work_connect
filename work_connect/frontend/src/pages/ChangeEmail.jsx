import axios from "axios";
import { useState } from "react";
import { useSessionStorage } from "src/hooks/use-sessionStorage";

const ChangeEmail = () => {

    const { getSessionData } = useSessionStorage();

    let sessionData = getSessionData("accountData");
    let sessionEmail = sessionData.mail;
    let sessionId = sessionData.id;

    console.log("sessionEmail", sessionEmail);
    // 確認メール送信ボタンクリック
    // バックエンド側
    // メール取得
    // パスワード取得
    // ユーザーネーム取得
    // データベースと照らし合わせて正しいか確認
    // trueだったらメールアドレス変更して戻り値に（”success”）を返す。
    // falseだったら戻り値に（"パスワードが違います。"）
    // ※時間があればpasswordを間違えれるのは3回までにする

    const [NewEmail, SetNewEmail] = useState("");
    const [CheckEmail, SetCheckEmail] = useState("");

    async function handleClickCheckMail() {
        try {
            if (NewEmail === CheckEmail) {
                const url = `http://localhost:8000/change_email`;
                const response = await axios.post(url, {
                    id: sessionId,
                    email: NewEmail,
                });

                console.log("response", response);
            } else {
                console.log("メールアドレスが一致していません。");
            }
        } catch(e) {
            console.log("ChangeEmailerror",e);
        }
    }


    return (
        <>
            <h1>メールアドレス変更</h1>
            <p>現在のメールアドレス:{sessionEmail}</p>
            <p>新しいメールアドレス: <input type="email" onChange={(e) => { SetNewEmail(e.target.value) }} value={NewEmail} /></p>
            <p>新しいメールアドレス（確認）: <input type="email" onChange={(e) => { SetCheckEmail(e.target.value) }} value={CheckEmail} /></p>
            <p>パスワードの入力：<input type="email" name="" id="" /></p>
            <button onClick={handleClickCheckMail}>確認メールを送信します。</button>
        </>

    )
}

export default ChangeEmail