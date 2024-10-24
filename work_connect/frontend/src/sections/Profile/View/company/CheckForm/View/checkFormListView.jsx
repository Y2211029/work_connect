import ListView from "src/components/view/list-view";
import { useParams } from 'react-router-dom';
// import SpecialCompanyNewsView from "./specialCompanyNews-view";
// import News from "../News";
import Profile from "../Profile";

const SpecialCheckFormListView = () => {
    const { user_name} = useParams();
    const searchParams = new URLSearchParams(window.location.search); // クエリパラメータを取得
    const category = searchParams.get("category");
    let value = 0;
    console.log("checkFormListView通ってます!?");

    if (category === "application_form_list") {
        value = 1;
        return (
            <>
                <Profile value={value} />
                <ListView type="specialforms" ParamUserName={user_name} />
            </>
        );
    } else if (category === "statistical_data") {
        value = 1;
        return (
            <>
                <Profile value={value} />
                <ListView type="specialstatisticaldata" ParamUserName={user_name} />
            </>
        );
    } else {
        return <div>該当するフォームがありません。</div>;
    }
};

export default SpecialCheckFormListView;