import { useEffect, useState } from 'react';
import axios from 'axios';
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { useSessionStorage } from "src/hooks/use-sessionStorage";
import Button from '@mui/material/Button';
import '../css/Profile.css';

const ProfileNews = () => {
    const [newsData, setNewsData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    // セッションストレージ取得
    const { getSessionData } = useSessionStorage();

    const getUserId = () => {
        const accountData = getSessionData("accountData");
        return accountData.id ? accountData.id : 0;
    };

    useEffect(() => {
        const fetchData = async () => {
            const userId = getUserId(); // getUserIdを直接呼び出す
            try {
                const response = await axios.get(
                    `http://localhost:8000/Internship_JobOffer/special_company_news_get/${userId}`
                );
                console.log('Fetched Data:', response.data); // デバッグ: データ取得確認
                setNewsData(response.data);
                setFilteredData(response.data); // 初期表示は全データ
                setMessage(''); // メッセージを初期化
            } catch (error) {
                console.error("Error fetching data!", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []); // 依存配列が空でない場合も適切に設定する

    const news_detail_jump = (news_id) => {
        navigate("/news_detail", { state: { id: news_id } });
    };

    const formatDate = (dateString) => {
        const dateObj = new Date(dateString);
        const year = dateObj.getFullYear();
        const month = dateObj.getMonth() + 1;
        const day = dateObj.getDate();
        return `${year}/${month}/${day}`;
    };

    const genre_news_select = (genre) => {
        console.log('Selected Genre:', genre); // デバッグ: 選択されたジャンル確認
        if (genre === '全て') {
            setFilteredData(newsData); // 全てのデータを表示
            setMessage(''); // メッセージをクリア
        } else {
            const filtered = newsData.filter((item) => item.genre === genre);
            console.log('Filtered Data:', filtered); // デバッグ: フィルタリング結果確認
            if (filtered.length === 0) {
                setMessage(`「${genre}」に該当するニュースはありません。`);
            } else {
                setMessage(''); // メッセージをクリア
            }
            setFilteredData(filtered);
        }
    };

    const SelectTagsGenre = (genre) => {
        return (
            <Button
                variant="outlined"
                sx={{ borderColor: '#637381', color: '#637381', '&:hover': { borderColor: '#637381' }, cursor: 'pointer' }}
                onClick={() => genre_news_select(genre)}  // 関数の参照を渡す
            >
                {genre}
            </Button>
        );
    };

    const ShowTagsGenre = (genre) => {
        return (
            <Button
                variant="outlined"
                sx={{ borderColor: '#637381', color: '#637381', '&:hover': { borderColor: '#637381' }, cursor: 'pointer' }}
            >
                {genre}
            </Button>
        );
    };

    return (
        <>
            <Helmet>
                <title>ニュース一覧</title>
            </Helmet>

            <div className="genre_select_button">
                {SelectTagsGenre("インターンシップ")}
                {SelectTagsGenre("求人")}
                {SelectTagsGenre("ブログ")}
                {SelectTagsGenre("全て")}  {/* 全データを表示するためのボタン */}
            </div>

            <div className="news-container">
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <>
                        {message && <p className="no-data-message">{message}</p>} {/* メッセージ表示 */}
                        {filteredData.length === 0 && !message && <p>該当するニュースはありません。</p>}
                        {filteredData.map(post => {
                            const id = post.id;
                            const genre = ShowTagsGenre(post.genre);
                            const created_at = formatDate(post.created_at);
                            const article_title = post.article_title;
                            const header_img = post.header_img;

                            return (
                                <div key={id} className="news-item">
                                    <figure onClick={() => news_detail_jump(id)}>
                                        <div className="news_title">
                                            <h1 className="news_font">{article_title}</h1>
                                        </div>
                                        <img src={`./header_img/${header_img}`} className="news-img" alt={article_title} />
                                    </figure>
                                    <div className="news_meta">
                                        <p className="created_at_font">{created_at}に投稿されました</p>
                                        <p className="genre">{genre}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </>
                )}
            </div>
        </>
    );
};

export default ProfileNews;
