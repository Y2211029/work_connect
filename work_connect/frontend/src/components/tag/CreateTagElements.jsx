import PropTypes from "prop-types";

// タグ検索に使用するボタンを作成する。
function CreateTagElements({ itemContents }) {
<<<<<<< HEAD
  return itemContents;
=======
  return <button className="greeting">{itemContents}</button>;
>>>>>>> a8f81805d7881191f4c8b687c9cc54c98922b3f3
}

CreateTagElements.propTypes = {
  itemContents: PropTypes.string.isRequired,
};

export default CreateTagElements;
