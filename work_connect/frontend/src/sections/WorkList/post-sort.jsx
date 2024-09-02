<<<<<<< HEAD
import PropTypes from "prop-types";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";

// PropTypes の設定
PostSort.propTypes = {
  options: PropTypes.array.isRequired,
  sortOption: PropTypes.string.isRequired,
  onSort: PropTypes.func.isRequired,
};

export default function PostSort({ options, sortOption, onSort }) {
  // console.log("sortOption", sortOption);
  return (
    <TextField
      select
      size="small"
      value={sortOption} // 動的に選択された値を表示
      onChange={onSort} // 変更時にハンドラを呼び出す
    >
=======
import PropTypes from 'prop-types';

import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';

// ----------------------------------------------------------------------

PostSort.propTypes = {
  options: PropTypes.array,
  onSort: PropTypes.func,
};

export default function PostSort({ options, onSort }) {
  return (
    // valueの部分に並び替えデータを差し替える。
    <TextField select size="small" value="orderNewPostsDate" onChange={onSort}>
>>>>>>> a8f81805d7881191f4c8b687c9cc54c98922b3f3
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
}
