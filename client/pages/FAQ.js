import Container from "@mui/material/Container";
import { Typography } from "@mui/material";
import { styled } from "@mui/system";

// Styles
const StandardTypography = styled(Typography)({
  fontWeight: "bold",
  textAlign: "center",
  paddingTop: "10px",
});

export default function FaqPage() {
  return (
    <Container maxWidth="md">
      <StandardTypography fontSize={50}>
        Frequently Asked Questions
      </StandardTypography>
    </Container>
  );
}
