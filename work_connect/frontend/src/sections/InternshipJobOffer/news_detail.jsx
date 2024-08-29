import React, { useState, useEffect } from "react";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const NewsDetailContainer = {
    position: "relative",
    marginTop: "5%",
};

const news_img = {
    width: "400px",
    height: "300px",
    border: "solid 2px #329eff",
};

const news_title = {
    textAlign: "left",
};

const news_font = {
    fontSize: "15px",
    padding: "auto",
    color: "black",
};

const news_summary = {
    maxWidth: "1000px",
    minWidth: "299px",
    paddingTop: "5%",
    marginLeft: "5%",
};

const NewsDetailHeader = {
    display: "flex",
    flexWrap: "wrap",
};

const genre_update = {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    paddingLeft: "10%",
};

const InternshipJobOfferPage = () => {
    const [csrfToken, setCsrfToken] = useState("");
    const [NewsDetail, SetNewsDetail] = useState(null);
    const [bookmarked, setBookmarked] = useState(false);
    const [isHover, SetFavoriteIcon_hover] = useState(false);  //ホバーしたら「クリックするとブックマークできます」というテキストが出現
    const [sessionId, setSessionId] = useState(null);
    const [userName, setUserName] = useState(null);
    const [email, setEmail] = useState(null);

    const csrf_url = "http://localhost:8000/csrf-token";
    const news_bookmark_url = "http://localhost:8000/news_bookmark";
    const location = useLocation();
    const parameter = location.state; // パラメータ(w_newsテーブルのidカラムの値)を代入
    console.log(csrfToken);

    useEffect(() => {
        console.log(parameter.id);
        //ニュースのデータを抽出する
        async function fetchData() {
            try {
                const response = await axios.get(
                    `http://127.0.0.1:8000/Internship_JobOffer/news_detail/${parameter.id}`
                );
                console.log(response.data);
                SetNewsDetail(response.data);
            } catch (error) {
                console.error("データの取得中にエラーが発生しました！", error);
            }
        }
        fetchData();
    }, [parameter.id]);

    useEffect(() => {
        async function fetchCsrfToken() {
            try {
                const response = await axios.get(csrf_url); // CSRFトークンを取得するAPIエンドポイント
                console.log(response.data.csrf_token); // ログ
                console.log("fetching CSRF token:OK"); // ログ
                const csrfToken = response.data.csrf_token;
                setCsrfToken(csrfToken); // 状態を更新
            } catch (error) {
                console.error("Error fetching CSRF token:", error);
            }
        }

        fetchCsrfToken(); // ページがロードされた時点でCSRFトークンを取得
    }, []);

    useEffect(() => {
    // sessionStorage に保存したデータを取得
    let dataString = sessionStorage.getItem("accountData");
    // JSON 文字列を JavaScript オブジェクトに変換
    let dataObject = JSON.parse(dataString);
        setSessionId(dataObject.id);
        setUserName(dataObject.user_name);
        setEmail(dataObject.mail);
    }, []);

    //日付をYY/MM/DDに変換する
    const formatDate = (dateString) => {
        const dateObj = new Date(dateString);
        const year = dateObj.getFullYear();
        const month = dateObj.getMonth() + 1;
        const day = dateObj.getDate();
        return `${year}/${month}/${day}`;
    };

    //ハートをクリックしたらブックマーク(ニュースを保存)し、ハートの中が赤色になる
    const news_bookmark = async () => {
        setBookmarked(!bookmarked); //usestateセット
        //ajax処理
        console.log(parameter.id);
        console.log(NewsDetail.genre);
        try {
            const response = await axios.post(
                news_bookmark_url,
                {
                    id: parameter.id,              //bookmark_idカラムに入れる
                    category: NewsDetail.genre,   //categoryカラムに入れる
                    sessionid: sessionId,         //企業or学生のid
                },
                {
                    headers: {
                        'X-CSRF-TOKEN': csrfToken,
                    },
                }
            );
            console.log(response.data);
            // SetNewsDetail(response.data);
        } catch (error) {
            console.error("データの取得中にエラーが発生しました！", error);
        }
    };



    return (
        <>
            <Helmet>
                <title>ニュース詳細 | Work&Connect</title>
            </Helmet>

            {NewsDetail ? (
                <div style={NewsDetailContainer}>
                    {/* NewsDetailHeader要素 サムネイルと会社名・お気に入りボタンを一括りにする */}
                    <div style={NewsDetailHeader}>
                        <img
                            src={NewsDetail.header_img}
                            style={news_img}
                            alt={NewsDetail.article_title}
                        />

                        <div style={genre_update}>
                            <p>{NewsDetail.genre}</p>
                            <p>{formatDate(NewsDetail.updated_at)}</p>
                            <p>シナジーマーケティング株式会社</p>
                            <p>session_idは{sessionId}</p>
                            <p>userNameは{userName}</p>
                            <p>メールアドレスは{email}</p>
                            <p>データ{sessionId}</p>

                            {bookmarked ? (
                                <FavoriteIcon
                                    style={{ fontSize: '24px' }}
                                    onClick={news_bookmark}
                                    onMouseEnter={() => SetFavoriteIcon_hover(true)}
                                    onMouseLeave={() => SetFavoriteIcon_hover(false)}
                                />
                            ) : (
                                <FavoriteBorderIcon
                                    style={{ fontSize: '24px' }}
                                    onClick={news_bookmark}
                                    onMouseEnter={() => SetFavoriteIcon_hover(true)}
                                    onMouseLeave={() => SetFavoriteIcon_hover(false)}
                                />
                            )}
                            {isHover && <div style={{ position: 'absolute', top: '30px', left: '10px', color: 'red' }}>クリックするとブックマークできます</div>}
                        </div>

                    </div>

                    <h1 style={news_title}>{NewsDetail.article_title}</h1>

                    {/* Editor.jsのプラグインによって内容を１行ずつ解釈し、それぞれにあった形でreturn */}
                    <div className="news_summary" style={news_summary}>
                        {NewsDetail.summary.blocks.map((block, index) => {
                            switch (block.type) {
                                case "paragraph":
                                    return <p key={index} style={news_font}>{block.data.text}</p>;
                                case "header":
                                    return React.createElement(
                                        `h${block.data.level}`,
                                        { key: index, style: news_font },
                                        block.data.text
                                    );
                                case "image":
                                    return (
                                        <img
                                            key={index}
                                            src={block.data.file.url}
                                            style={news_img}
                                            alt={block.data.caption}
                                        />
                                    );
                                case "embed":
                                    return (
                                        <div key={index} dangerouslySetInnerHTML={{ __html: block.data.embed }} />
                                    );
                                case "table":
                                    return (
                                        <table key={index} style={news_font}>
                                            <tbody>
                                                {block.data.content.map((row, rowIndex) => (
                                                    <tr key={rowIndex}>
                                                        {row.map((cell, cellIndex) => (
                                                            <td key={cellIndex}>{cell}</td>
                                                        ))}
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    );
                                case "checklist":
                                    return (
                                        <ul key={index} style={news_font}>
                                            {block.data.items.map((item, itemIndex) => (
                                                <li key={itemIndex} style={{ textDecoration: item.checked ? "line-through" : "none" }}>
                                                    {item.text}
                                                </li>
                                            ))}
                                        </ul>
                                    );
                                case "delimiter":
                                    return <hr key={index} />;
                                case "raw":
                                    return <div key={index} dangerouslySetInnerHTML={{ __html: block.data.html }} />;
                                case "quote":
                                    return (
                                        <blockquote key={index} style={news_font}>
                                            <p>{block.data.text}</p>
                                            <cite>{block.data.caption}</cite>
                                        </blockquote>
                                    );
                                case "inlineCode":
                                    return <code key={index} style={news_font}>{block.data.text}</code>;
                                case "alert":
                                    return <div key={index} style={news_font}>{block.data.message}</div>;
                                case "toggle":
                                    return (
                                        <details key={index} style={news_font}>
                                            <summary>{block.data.title}</summary>
                                            <div dangerouslySetInnerHTML={{ __html: block.data.content }} />
                                        </details>
                                    );
                                case "audioPlayer":
                                    return (
                                        <audio key={index} controls>
                                            <source src={block.data.url} type={block.data.mimeType} />
                                        </audio>
                                    );
                                case "carousel":
                                    return (
                                        <div key={index} style={news_font}>
                                            {block.data.slides.map((slide, slideIndex) => (
                                                <img key={slideIndex} src={slide.url} alt={slide.caption} style={news_img} />
                                            ))}
                                        </div>
                                    );
                                // 他のブロックタイプもここで処理できます
                                default:
                                    return null;
                            }
                        })}
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </>
    );
};

export default InternshipJobOfferPage;