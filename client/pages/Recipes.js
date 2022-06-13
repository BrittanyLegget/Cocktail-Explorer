import { Typography, Container } from "@mui/material";
import { RecipeSpiritTypeLinks } from "../components/RecipeSpiritTypeLinks";
import { ViewAllRecipes } from "../components/ViewAllRecipes";

export default function RecipePage({ data }) {
  return (
    <Container maxWidth="md">
      <Typography sx={{ typography: "title" }}>
        Search for recipes by spirit by selecting one below
      </Typography>
      <RecipeSpiritTypeLinks data={data} />

      <Typography sx={{ typography: "subTitle" }}>
        Or Browse All Recipes
      </Typography>
      <ViewAllRecipes />
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
