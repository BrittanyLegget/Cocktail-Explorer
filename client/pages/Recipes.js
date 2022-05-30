import { Typography, Container } from "@mui/material";
import { styled } from "@mui/system";
import { ViewAllRecipes } from "../components/ViewAllRecipes";
import { SpiritTypeLinks } from "../components/SpiritTypeLinks";

export default function RecipePage({ data }) {
  return (
    <Container maxWidth="md">
      <Typography sx={{ typography: "title" }}>
        Search for recipes by spirit by selecting one below
      </Typography>
      <SpiritTypeLinks data={data} />

      <Typography sx={{ typography: "subTitle" }}>
        Or Browse All Recipes
      </Typography>
      <ViewAllRecipes />
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
