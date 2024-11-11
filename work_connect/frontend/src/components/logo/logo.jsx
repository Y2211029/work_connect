// ;
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useContext } from "react";
import { AllItemsContext } from "src/layouts/dashboard/index";
import "src/logoAnimation.css";
const StyledH3 = styled.h3`
margin-top: 24px;
margin-bottom: 24px;
margin-left: 20px;
margin-right: 20px;
`;

function Logo() {
  const { AllItems, setAllItems } = useContext(AllItemsContext);
  const { /*DataList,*/ IsSearch, Page, sortOption } = AllItems;
  // サイドバークリック 一覧アイテム・並び替え・検索タグ 初期化
  const handleReset = () => {
    console.log("あいうえおかきくけこ")
    if (sortOption !== "orderNewPostsDate" || Page > 1 || IsSearch.Check == true) {
      setAllItems((prevItems) => ({
        ...prevItems,
        IsLoading: true, // 一時的にローディングを解除
      }));
      console.log("あいうえお")
      setAllItems((prevItems) => ({
        ...prevItems, //既存のパラメータ値を変更するためにスプレッド演算子を使用
        ResetItem: true,
        DataList: [], //検索してない状態にするために初期化 //searchbar.jsxのsearchSourceも初期化
        IsSearch: { searchToggle: 0, Check: false, searchResultEmpty: false },
        Page: 1, //スクロールする前の状態にするために初期化
        sortOption: "orderNewPostsDate", //並び替える前の状態にするために初期化
      }));
      // 必要に応じて、スクロール位置や他の状態もリセット
    }
  };

  return (
    <StyledH3>
      <Link to="/" style={{ textDecoration: "none" }} onClick={handleReset}>
        <h1>
          <span>W</span>
          <span>o</span>
          <span>r</span>
          <span>k</span>
          <span>&</span>
          <span>C</span>
          <span>n</span>
          <span>n</span>
          <span>e</span>
          <span>c</span>
          <span>t</span>
        </h1>
      </Link>
    </StyledH3 >
    // <StyledH3>
    //   <Link to="/" style={{ textDecoration: "none" }} onClick={handleReset}>
    //     <span style={{ color: "#4285f4" }}>W</span>ork&<span style={{ color: "#4285f4" }}>C</span>
    //     onnect
    //   </Link>
    // </StyledH3>
  )
}

export default Logo;
