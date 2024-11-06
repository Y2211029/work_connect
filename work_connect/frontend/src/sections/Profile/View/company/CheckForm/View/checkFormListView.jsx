// import ListView from "src/components/view/list-view";
// import { useParams } from 'react-router-dom';
// import SpecialCompanyNewsView from "./specialCompanyNews-view";
// import News from "../News";
import Profile from "../../Profile";

const SpecialCheckFormListView = () => {
    let value = 3;
    console.log("checkFormListView通ってます!?");
    console.log("checkFormListViewのvalue", value);

    const path = window.location.pathname; // 例: "/Profile/株式会社アーキテクト/Checkform"
    const companyName = decodeURIComponent(path.split('/')[2]); // 企業名は2番目の要素
    console.log("企業名:", decodeURIComponent(companyName)); // URLデコード

    //どの企業のプロフィールを見るのかを知るため、IDを取得し、
    //Profile.jsxでの「応募フォーム」タブを表示させるか表示させないかを判断
    // useEffect(() => {
    //     async function GetData(ProfileUserName) {
    
    //       try {
    //         // Laravel側からデータを取得
    //         const response = await axios.get(url, {
    //           params: {
    //             ProfileUserName: ProfileUserName[0],
    //           },
    //         });
    //         if (response && response.data && response.data.companyList) {
    //           setResponseData(response.data.companyList[0]);
    //         } else {
    //           console.log("Company list data not found in the response.");
    //         }
    //         console.log("ResponseData:", response.data.companyList[0]);
    //         console.log("ResponseData:", response.data.companyInformation);
    //       } catch (err) {
    //         console.log("err:", err);
    //       }
    //     }
    //     // DBからデータを取得
    //     GetData(ProfileUserName);
    //   }, []);
    
    return <Profile value={value} companyname={companyName}/>;
};

export default SpecialCheckFormListView;