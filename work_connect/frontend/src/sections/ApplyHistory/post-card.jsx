import { forwardRef } from "react";
import PropTypes from "prop-types";
import "./applyHistory.css"; // デザイン用のCSSファイル

const PostCard = forwardRef(({
    apply_histories,
    companies_name,
    news_id,
    news_title,
    news_genre,
    img,
    write_form_id,
    form_writed_at
}, ref) => {
    console.log("PostCard通っています");
    console.log(img);
    console.log("apply_histories",apply_histories);

    return (
        <div className="post-card" ref={ref}>
            {/* ヘッダー部分 */}
            <div className="post-card-header">
                <img
                    src={img}
                    id={news_id}
                    alt={`${news_title} ヘッダー画像`}
                    className="post-card-img"
                />
            </div>

            {/* コンテンツ部分 */}
            <div className="post-card-content">
                <h2 className="post-card-title">{news_title}</h2>
                <p className="post-card-genre">ジャンル: {news_genre}</p>
                <p className="post-card-company">会社名: {companies_name}</p>
                <p className="post-card-date">応募日: {new Date(form_writed_at).toLocaleDateString()}</p>

                    <div className="post-card-form">
                        <h3>応募内容:</h3>
                        <ul>

                                <li id={write_form_id}>
                                    <strong>{news_title}:</strong>
                                </li>

                        </ul>
                    </div>
            </div>
        </div>
    );
});

PostCard.displayName = "PostCard";

PostCard.propTypes = {
    apply_histories: PropTypes.shape({
        companies_name: PropTypes.string.isRequired,
        news_id: PropTypes.number.isRequired,
        news_title: PropTypes.string.isRequired,
        news_genre: PropTypes.string.isRequired,
        img: PropTypes.string.isRequired,
        write_form_id: PropTypes.number.isRequired,
        write_form: PropTypes.arrayOf(
            PropTypes.shape({
                title: PropTypes.string.isRequired,
                response: PropTypes.string,
            })
        ).isRequired,
        form_writed_at: PropTypes.string.isRequired,
    }).isRequired,
    companies_name: PropTypes.string.isRequired,
    news_id: PropTypes.number.isRequired,
    news_title: PropTypes.string.isRequired,
    news_genre: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
    write_form_id: PropTypes.number.isRequired,
    write_form: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired,
            response: PropTypes.string,
        })
    ),
    form_writed_at: PropTypes.string.isRequired,
};


export default PostCard;
