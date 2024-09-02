<<<<<<< HEAD
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";

import internshipJobOfferItem from "src/_mock/internshipJobOfferItem";

import PostCard from "src/sections/InternshipJobOffer/post-card";
import PostSort from "src/sections/InternshipJobOffer/post-sort";

//internshipJobOffer

// import Button from '@mui/material/Button';
// import Iconify from 'src/components/iconify';
// import PostSearch from 'src/sections/VideoList/post-search';

// ----------------------------------------------------------------------

export default function CompanyListView() {
  const postsFrominternshipJobOffer = internshipJobOfferItem();
  console.log("postsFromCompany", postsFrominternshipJobOffer);
  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">インターンシップ/求人一覧</Typography>
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

import internshipJobOfferItem from "src/_mock/internshipJobOfferItem";

import PostCard from "src/sections/InternshipJobOffer/post-card";
import PostSort from "src/sections/InternshipJobOffer/post-sort";

//internshipJobOffer

// import Button from '@mui/material/Button';
// import Iconify from 'src/components/iconify';
// import PostSearch from 'src/sections/VideoList/post-search';

// ----------------------------------------------------------------------

export default function CompanyListView() {
  const postsFrominternshipJobOffer = internshipJobOfferItem();
  console.log("postsFromCompany", postsFrominternshipJobOffer);
  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">インターンシップ/求人一覧</Typography>
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
>>>>>>> a8f81805d7881191f4c8b687c9cc54c98922b3f3
