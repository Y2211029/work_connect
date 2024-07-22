import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import DetailItem from "../Detail-item";

const WorkDetail = () => {
  return (
    // <div className="wrapper">
    // </div>
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">作品詳細</Typography>
      </Stack>
      <DetailItem />
    </Container>
  );
};

export default WorkDetail;
