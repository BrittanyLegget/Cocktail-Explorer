import { Typography, Container } from "@mui/material";
import { LearnSpiritTypeLinks } from "../components/LearnSpiritTypeLinks";

export default function LearnPage({ data }) {
  console.log({ data });
  return (
    <Container maxWidth="md">
      <Typography sx={{ typography: "title" }}>
        Select a spirit below to learn more
      </Typography>
      <LearnSpiritTypeLinks data={data} />
    </Container>
  );
}

//Get all spirits types
export async function getServerSideProps() {
  const res = await fetch(process.env.API_URL + "/spirits");
  const data = await res.json();

  return {
    props: { data },
  };
}
