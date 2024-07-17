import PropTypes from "prop-types";

// タグ検索に使用するボタンを作成する。
function CreateTagElements({ itemContents }) {
  return <button className="greeting">{itemContents}</button>;
}

CreateTagElements.propTypes = {
  itemContents: PropTypes.string.isRequired,
};

export default CreateTagElements;
