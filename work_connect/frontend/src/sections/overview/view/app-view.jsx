// import { faker } from '@faker-js/faker';

import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";

// import AppCurrentVisits from "src/sections/overview/app-current-visits";
// ----------------------------------------------------------------------

export default function AppView() {
  const WorkOfList = {
    WorkItem1: {
      title: "Connect",
      img: "test",
      tag: ["tagTest", "tagTest", "tagTest", "tagTest", "tagTest"],
      introductory: "この作品紹介文です。",
      userNama: "ryutyan",
      postDate: "3ヶ月",
    },
    WorkItem2: {
      title: "Connect",
      img: "test",
      tag: ["tagTest", "tagTest", "tagTest", "tagTest", "tagTest"],
      introductory: "この作品紹介文です。",
      userNama: "ryutyan",
      postDate: "3ヶ月",
    },
    WorkItem3: {
      title: "Connect",
      img: "test",
      tag: ["tagTest", "tagTest", "tagTest", "tagTest", "tagTest"],
      introductory: "この作品紹介文です。",
      userNama: "ryutyan",
      postDate: "3ヶ月",
    },
    WorkItem4: {
      title: "Connect",
      img: "test",
      tag: ["tagTest", "tagTest", "tagTest", "tagTest", "tagTest"],
      introductory: "この作品紹介文です。",
      userNama: "ryutyan",
      postDate: "3ヶ月",
    },
  };

  console.log("WorkOfList", WorkOfList);

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        作品一覧
      </Typography>

      {Object.keys(WorkOfList).map((key) => {
        const WorkItem = WorkOfList[key];
        return (
          <Grid container spacing={8} key={key}>
            <Grid xs={12} md={6} lg={4}>
              <h3>{WorkItem.title}</h3>
              <h3>{WorkItem.img}</h3>
              <h3>{WorkItem.tag}</h3>
              <h3>{WorkItem.introductory}</h3>
              <h3>{WorkItem.userNama}</h3>
              <h3>{WorkItem.postDate}</h3>
            </Grid>
          </Grid>
        );
      })}
    </Container>
  );
}
