import { useEffect, forwardRef } from "react";
import PropTypes from "prop-types";
import { useSessionStorage } from "src/hooks/use-sessionStorage";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Tooltip from '@mui/material/Tooltip';
import Stack from "@mui/material/Stack";

// ----------------------------------------------------------------------

const PostCard = forwardRef(({ post },) => {
  const { article_title } = post;

  const { getSessionData } = useSessionStorage();
  const accountData = getSessionData("accountData");
  const data = {
    account_id: accountData.id,
  };

  console.log(data);

  useEffect(() => {
    const css =
      `.sv-action__content .sd-btn--action.sd-navigation__complete-btn {
        display: none;
      }`;
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = css;
    document.head.appendChild(styleSheet);
  }, []);

  return (
    <Stack
      direction="row" // 横並び
      justifyContent="center"
      alignItems="flex-start"
    >
        <Box className="title-box">
          <Stack
            direction="column" // 縦に並べる
            alignItems="center" // 中央揃え
          >
            <Tooltip title={article_title} arrow>
              <Typography
                className="article-title"
              >
                {article_title}
              </Typography>
            </Tooltip>
            <Avatar
              className="answerer-avatar"
            />
          </Stack>
        </Box>
    </Stack>
  );
});

// displayName を設定
PostCard.displayName = 'PostCard';

PostCard.propTypes = {
  post: PropTypes.shape({
    article_title: PropTypes.string,
  }).isRequired,
};

export default PostCard;
