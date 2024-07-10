import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";

import CompanyListItem from "src/_mock/companyListItem";

import PostCard from "src/sections/CompanyList/post-card";
import PostSort from "src/sections/CompanyList/post-sort";

// import Button from '@mui/material/Button';
// import Iconify from 'src/components/iconify';
// import PostSearch from 'src/sections/VideoList/post-search';

// ----------------------------------------------------------------------

export default function CompanyListView() {
  const postsFromCompany = CompanyListItem();
  console.log("postsFromCompany", postsFromCompany);
  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">企業一覧</Typography>
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
        {postsFromCompany.map((post, index) => (
          <PostCard key={post.id} post={post} index={index} />
        ))}
      </Grid>
    </Container>
  );
}
