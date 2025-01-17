
import { useParams } from 'react-router-dom';
import Profile from "../Profile";
import NewsOfList from '../../../../InternshipJobOffer/NewsOfList';

const SpecialCompanyNewsListView = () => {
    const { user_name, Genre } = useParams();
    let value = 0;

    if (Genre === "JobOffer") {
        value = 1;
        return (
            <>
                <Profile value={value} />
                <NewsOfList type="specialjoboffers" ParamUserName={user_name} />
            </>
        );
    } else if (Genre === "Internship") {
        value = 1;
        return (
            <>
                <Profile value={value} />
                <NewsOfList type="specialinternships" ParamUserName={user_name} />
            </>
        );
    } else if (Genre === "Blog") {
        value = 1;
        return (
            <>
                <Profile value={value} />
                <NewsOfList type="specialblogs" ParamUserName={user_name} />
            </>
        );
    } else if (Genre === "Forms") {
        value = 1;
        return (
            <>
                <Profile value={value} />
                <NewsOfList type="specialforms" ParamUserName={user_name} />
            </>
        );
    } else {
        return <div>該当するニュースがありません。</div>;
    }
};

export default SpecialCompanyNewsListView;