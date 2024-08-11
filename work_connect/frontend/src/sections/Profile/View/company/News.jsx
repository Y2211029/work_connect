import { useEffect, useState } from 'react';
import axios from 'axios';
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import './ProfileNews.css';

const ProfileNews = () => {
    const [sessionId, setSessionId] = useState(null);
    const [filteredData, setFilteredData] = useState([]);
    const [newsData, setNewsData] = useState(null);
    const [selectedGenre, setSelectedGenre] = useState("all");
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const dataString = sessionStorage.getItem("accountData");
        if (dataString) {
            const dataObject = JSON.parse(dataString);
            if (dataObject) {
                setSessionId(dataObject.id);
            }
        }
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            if (sessionId) {
                try {
                    const response = await axios.get(
                        `http://localhost:8000/Internship_JobOffer/special_company_news/${sessionId}`
                    );
                    setNewsData(response.data);
                    setFilteredData(response.data);
                } catch (error) {
                    console.error("Error fetching data!", error);
                } finally {
                    setLoading(false);
                }
            }
        };
        fetchData();
    }, [sessionId]);

    useEffect(() => {
        if (selectedGenre === "all") {
            setFilteredData(newsData);
        } else {
            setFilteredData(newsData?.filter(post => post.genre === selectedGenre));
        }
    }, [selectedGenre, newsData]);

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

    return (
        <>
            <Helmet>
                <title>ニュース一覧</title>
            </Helmet>

            <div className="news-select-button">
                {["ブログ", "インターンシップ", "求人"].map((genre) => (
                    <div className="select-button" key={genre}>
                        <button
                            className="select-button-label"
                            onClick={() => setSelectedGenre(genre)}
                        >
                            {genre}
                        </button>
                    </div>
                ))}
            </div>

            <div className="news-container">
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    filteredData?.map(post => {
                        const id = post.id;
                        const genre = post.genre;
                        const created_at = formatDate(post.created_at)
                        const company_name = post.company_name;
                        const article_title = post.article_title;
                        const header_img = post.header_img;


                        return (
                            <div key={id} className="news-item" onClick={() => news_detail_jump(id)}>
                                <figure>
                                    <div className="genre-update">
                                        <p className="news-font">{genre}</p>
                                        <p className="news-font">{created_at}</p>
                                    </div>
                                    <p className="news-font">{company_name}</p>
                                    <p className="news-font">{article_title}</p>
                                    <img src={`./header_img/${header_img}`} className="news-img" alt={article_title} />
                                </figure>
                            </div>
                        );
                    })
                )}
            </div>
        </>
    );
};

export default ProfileNews;
