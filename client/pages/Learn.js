import { Typography, Container } from "@mui/material";
import { SpiritTypeLinks } from "../components/SpiritTypeLinks";

export default function LearnPage({ data }) {
  console.log({ data });
  return (
    <Container maxWidth="md">
      <Typography sx={{ typography: "title" }}>
        Select a spirit below to learn more
      </Typography>
      <SpiritTypeLinks data={data} />
    </Container>
  );
}

//Get all spirits types
export async function getServerSideProps() {
  const res = await fetch(`https://spring-street-app.uw.r.appspot.com/spirits`);
  const data = await res.json();

  return {
    props: { data },
  };
}
