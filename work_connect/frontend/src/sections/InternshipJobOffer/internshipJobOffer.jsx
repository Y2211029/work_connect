import { useState, useEffect } from "react";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";

const newsContainer = {
  display: "flex",
  flexWrap: "wrap",
  gap: "20px",
  marginLeft: "4%",
  marginTop: "10%",
};

const newsItem = {
  flex: "1 1 calc(50% - 20px)",
  boxSizing: "border-box",
  border: "solid 2px #329eff",
  width: "100px",
  height: "400px",
  maxWidth: "600px",
  cursor: "pointer",
}

const news_img = {
  width: "100%", // 幅を100%に設定
  height: "200px",
  border: "solid 2px #329eff",
};

const news_font = {
  fontSize: "15px",
  color: "black",
  margin: "5px 0", // フォントのマージンを設定
};

const genre_update = {
  display: "flex",
  paddingLeft: "20px",
  marginTop: "0%",
};

const news_select_button = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  border: "1px solid",
  width: "1000px",
  height: "100px",
  paddingLeft: "10px",
  gap: "10px",
  marginLeft: "400px",
};

const select_button = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "300px",
};

const select_button_label = {
  textAlign: "center",
  width: "200px",
};

export default function InternshipJobOfferPage() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("all");
  const navigate = useNavigate(); // useNavigateをここで呼び出す

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/Internship_JobOffer');
        setData(response.data);
        setFilteredData(response.data);
      } catch (error) {
        console.error('データの取得中にエラーが発生しました！', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (selectedGenre === "all") {
      setFilteredData(data);
    } else {
      setFilteredData(data.filter(post => post.genre === selectedGenre));
    }
  }, [selectedGenre, data]);

  const formatDate = (dateString) => {
    const dateObj = new Date(dateString);
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth() + 1;
    const day = dateObj.getDate();
    return `${year}/${month}/${day}`;
  };

  const news_detail_jump = (news_id) => {
    const entity = { id: news_id }; // オブジェクトとして扱う
    navigate("/news_detail", { state: entity }); // パラメータを渡して遷移
  };

  return (
    <>
      <Helmet>
        <title>ニュース一覧</title>
      </Helmet>

      {/* ニュース切り替えボタン */}
      <div className="news_select_button" style={news_select_button}>
        <div className="blog_select_button" style={select_button}>
          <button style={select_button_label} onClick={() => setSelectedGenre("ブログ")}>ブログ</button>
        </div>
        <div className="internship_select_button" style={select_button}>
          <button style={select_button_label} onClick={() => setSelectedGenre("インターンシップ")}>インターンシップ</button>
        </div>
        <div className="job_select_button" style={select_button}>
          <button style={select_button_label} onClick={() => setSelectedGenre("求人")}>求人</button>
        </div>
      </div>

      <div style={newsContainer}>
        {filteredData && filteredData.length > 0 ? (
          filteredData.map(post => {
            const news_id = post.id;
            const title = post.article_title;
            const header_img = post.header_img;
            const genre = post.genre;
            const updated_at = post.updated_at;
            const company_name = "シナジーマーケティング株式会社";

            return (
              <div key={post.id} style={newsItem} onClick={() => news_detail_jump(news_id)}>
                <figure>
                  <div className="genre_update" style={genre_update}>
                    <p style={news_font}>{genre}</p>
                    <p style={news_font}>{formatDate(updated_at)}</p>
                  </div>
                  <p style={news_font}>{company_name}</p>
                  <p style={news_font}>{title}</p>
                  <img src={header_img} style={news_img} alt={title} />
                </figure>
              </div>
            );
          })
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
}
