import Container from "@mui/material/Container";
import { Typography } from "@mui/material";

export default function FaqPage() {
  return (
    <Container maxWidth="md">
      <Typography
        fontSize={50}
        fontWeight="bold"
        textAlign="center"
        paddingTop={9}
      >
        Frequently Asked Questions
      </Typography>
    </Container>
  );
}
