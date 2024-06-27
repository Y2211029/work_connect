import { useState, useEffect } from "react";
import axios from "axios";
import { Helmet } from "react-helmet-async";

const newsContainer = {
  display: "flex",
  flexWrap: "wrap",
  gap: "20px", 
  marginLeft: "4%",
};

const newsItem = {
  flex: "1 1 calc(50% - 20px)", 
  boxSizing: "border-box",
  border: "solid 2px #329eff",
  width:"100px",
  height:"400px",
  maxWidth:"600px",
};

const news_img = {
  width: "300px",
  height: "200px",
  border: "solid 2px #329eff",

};

const news_font = {
  fontSize: "px",
  padding: "auto",
};

const genre_update = {
  display: "flex",
  paddingLeft:"20px",
  marginLeft:"50%",
  marginTop:"0%",
};



export default function InternshipJobOfferPage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/Internship_JobOffer');
        console.log(response.data);
        setData(response.data);
      } catch (error) {
        console.error('データの取得中にエラーが発生しました！', error);
      }
    };

    fetchData();
  }, []);

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

      <div style={newsContainer}>
        {data && data.length > 0 ? (
          data.map(post => {
            const title = post.article_title;
            const header_img = post.header_img;
            const genre = post.genre;
            const updated_at = post.updated_at;
            const company_name = "シナジーマーケティング株式会社";

            return (
              <div key={post.id} style={newsItem}>
                <figure>
                  <div className="genre_update" style={genre_update}>
                  <p>{genre}</p>
                  <p>{formatDate(updated_at)}</p>
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
