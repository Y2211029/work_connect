// import { faker } from '@faker-js/faker';

import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";

// import AppCurrentVisits from "src/sections/overview/app-current-visits";
// ----------------------------------------------------------------------

export default function AppView() {
  const WorkOfList = {
    item1: {
      title: "Connectというwebアプリを作成しました。",
      chart: {
        series: [
          { label: "America", value: 4344 },
          { label: "Asia", value: 5435 },
          { label: "Europe", value: 1443 },
          { label: "Africa", value: 4443 },
        ],
      },
    },
    item2: {
      title: "Connectというwebアプリを作成しました。",
      chart: {
        series: [
          { label: "America", value: 4344 },
          { label: "Asia", value: 5435 },
          { label: "Europe", value: 1443 },
          { label: "Africa", value: 4443 },
        ],
      },
    },
    item3: {
      title: "Connectというwebアプリを作成しました。",
      chart: {
        series: [
          { label: "America", value: 4344 },
          { label: "Asia", value: 5435 },
          { label: "Europe", value: 1443 },
          { label: "Africa", value: 4443 },
        ],
      },
    },
    item4: {
      title: "Connectというwebアプリを作成しました。",
      chart: {
        series: [
          { label: "America", value: 4344 },
          { label: "Asia", value: 5435 },
          { label: "Europe", value: 1443 },
          { label: "Africa", value: 55555 },
        ],
      },
    },
  };

  console.log("WorkOfList", WorkOfList);

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        作品一覧
      </Typography>

      {Object.keys(WorkOfList).map((key) => {
        const item = WorkOfList[key];
        return (
          <Grid container spacing={8} key={key}>
            <Grid xs={12} md={6} lg={4}>
              
              <h3>{item.title}</h3>
              <ul>
                {item.chart.series.map((seriesItem, index) => (
                  <li key={index}>
                    {seriesItem.label}: {seriesItem.value}
                  </li>
                ))}
              </ul>
            </Grid>
          </Grid>
        );
      })}
    </Container>
  );
}
