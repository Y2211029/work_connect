<<<<<<< HEAD
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";

import specialCompanyNewsItem from "src/_mock/specialCompanyNewsItem";

import PostCard from "src/sections/InternshipJobOffer/post-card";
import PostSort from "src/sections/InternshipJobOffer/post-sort";

//internshipJobOffer

// import Button from '@mui/material/Button';
// import Iconify from 'src/components/iconify';
// import PostSearch from 'src/sections/VideoList/post-search';

// ----------------------------------------------------------------------

export default function CompanyListView() {
  const postsFrominternshipJobOffer = specialCompanyNewsItem();
  console.log("postsFromCompany", postsFrominternshipJobOffer);
  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">ニュース一覧</Typography>
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
        {postsFrominternshipJobOffer.map((post, index) => (
          <PostCard key={post.id} post={post} index={index} />
        ))}
      </Grid>
    </Container>
  );
}
=======
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";

import specialCompanyNewsItem from "src/_mock/specialCompanyNewsItem";

import PostCard from "src/sections/InternshipJobOffer/post-card";
import PostSort from "src/sections/InternshipJobOffer/post-sort";

//internshipJobOffer

// import Button from '@mui/material/Button';
// import Iconify from 'src/components/iconify';
// import PostSearch from 'src/sections/VideoList/post-search';

// ----------------------------------------------------------------------

export default function CompanyListView() {
  const postsFrominternshipJobOffer = specialCompanyNewsItem();
  console.log("postsFromCompany", postsFrominternshipJobOffer);
  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">ニュース一覧</Typography>
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
        {postsFrominternshipJobOffer.map((post, index) => (
          <PostCard key={post.id} post={post} index={index} />
        ))}
      </Grid>
    </Container>
  );
}
>>>>>>> 3c5789677e38c908589a20c4b753cb2d7d8e5230
