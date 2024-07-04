import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";

import WorkListItem from "src/_mock/workListItem";

import PostCard from "src/sections/WorkList/post-card";

// import LoginStatusCheck from "../../../components/account/loginStatusCheck/loginStatusCheck";

// import AppCurrentVisits from "src/sections/overview/app-current-visits";
// ----------------------------------------------------------------------

export default function WorkOfListView() {
  const postsFromWork = WorkListItem();
  console.log("postsFromBlog", postsFromWork);
  /*--------------------------------------------*/
  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">作品一覧</Typography>
      </Stack>
      {/* 並べ替えボタン */}
      <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
        {/* <PostSearch posts={posts} /> */}

        {/* 変なエラー出るんで一旦コメントアウトしてます。 */}
        {/* <PostSort
    options={[
      // （仮）
      { value: "投稿日が新しい順", label: "投稿日が新しい順" },
      { value: "投稿日が古い順", label: "投稿日が古い順" },
      { value: "おすすめ順", label: "おすすめ順" },
    ]}
  /> */}
      </Stack>

      <Grid container spacing={3}>
        {postsFromWork.map((post, index) => (
          <PostCard key={post.id} post={post} index={index} />
        ))}
      </Grid>
    </Container>
  );
}
