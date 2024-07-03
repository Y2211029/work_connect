import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";

import VideoListItem from "src/_mock/videoListItem";

import PostCard from "src/sections/VideoList/post-card";

// import PostSort from "src/sections/VideoList/post-sort";

// import Button from '@mui/material/Button';
// import Iconify from 'src/components/iconify';
// import PostSearch from 'src/sections/VideoList/post-search';

// ----------------------------------------------------------------------

export default function VideoListView() {
  const postsFromBlog = VideoListItem();
  console.log("postsFromBlog", postsFromBlog);
  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">動画一覧</Typography>
        {/* 
        <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />}>
          New Post
        </Button> */}
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
        {postsFromBlog.map((post, index) => (
          <PostCard key={post.id} post={post} index={index} />
        ))}
      </Grid>
    </Container>
  );
}
