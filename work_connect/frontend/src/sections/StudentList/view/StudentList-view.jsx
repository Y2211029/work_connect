import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";

import StudentListItem from "src/_mock/studentListItem";

import PostCard from "src/sections/StudentList/post-card";
import PostSort from "src/sections/StudentList/post-sort";

// import Button from '@mui/material/Button';
// import Iconify from 'src/components/iconify';
// import PostSearch from 'src/sections/VideoList/post-search';

// ----------------------------------------------------------------------

export default function StudentListView() {
  const postsFromBlog = StudentListItem();
  console.log("postsFromBlog", postsFromBlog);
  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">学生一覧</Typography>
        {/* 
        <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />}>
          New Post
        </Button> */}
      </Stack>

      <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
        {/* <PostSearch posts={posts} /> */}
        <PostSort
          options={[
            { value: "latest", label: "Latest" },
            { value: "popular", label: "Popular" },
            { value: "oldest", label: "Oldest" },
          ]}
        />
      </Stack>

      <Grid container spacing={3}>
        {postsFromBlog.map((post, index) => (
          <PostCard key={post.id} post={post} index={index} />
        ))}
      </Grid>
    </Container>
  );
}
