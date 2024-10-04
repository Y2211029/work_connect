import axios from "axios";
import { useEffect, useState } from "react";

const ChangeEmail = () => {

    const [CheckEmailComplete, SetCheckEmailComplete] = useState("");

    useEffect(() => {
        async function renderCheckEmail() {
            try {
                const currentUrl = window.location.href;  // 'url' の代わりに 'currentUrl' として定義
                const urlObj = new URL(currentUrl);
                const params = new URLSearchParams(urlObj.search);

                // APIエンドポイントURL
                const apiUrl = `http://localhost:8000/check_email`; // 'url' の代わりに 'apiUrl' 
                const response = await axios.post(apiUrl, {
                    kind: params.get("kind"),
                    urltoken: params.get("urltoken"),
                    email: params.get("key"),
                });
                SetCheckEmailComplete(response.data);

                console.log("response", response);
            } catch (e) {
                console.log("ChangeEmailerror", e);
            }
        }
        renderCheckEmail();
    }, [])

    return (
        <>
            <h1>{CheckEmailComplete && CheckEmailComplete}</h1>
            {/* <p>再度ログインしなおしてください。</p> */}
        </>

    )
}

export default ChangeEmail