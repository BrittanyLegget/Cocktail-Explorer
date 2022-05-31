import { Container, Typography } from "@mui/material";
import { CocktailCard } from "../../../components/CocktailCard";
import { ViewAllBySpirit } from "../../../components/ViewAllBySpiritButton";

export default function LearnSpirit({ data, spirits }) {
  return (
    <Container maxWidth="md">
      {/* Spirit name and description */}
      <Typography sx={{ typography: "title" }}>{data.name}</Typography>
      <Typography
        sx={{ typography: "subtitle", fontSize: 20, paddingBottom: 10 }}
      >
        {data.description}
      </Typography>

      {/*Top 2 recipe cards from selected spirit type */}
      <Typography sx={{ typography: "title", color: "gray", fontSize: 40 }}>
        {data.name} Recipes:
      </Typography>
      <CocktailCard data={spirits} />
      <ViewAllBySpirit name={data.name} id={data.id} />
    </Container>
  );
}

export async function getServerSideProps(context) {
  //Get spirit from url parameter
  const query = context.query.spirit_id;

  //Get recipes by selected spirit type
  const res = await fetch(
    `https://spring-street-app.uw.r.appspot.com/spirits/${query}`
  );
  const data = await res.json();

  //Get top 2 recipes by selected spirit type
  const spr = await fetch(
    `https://spring-street-app.uw.r.appspot.com/cocktails/spirit/excp/${query}`
  );
  const spirits = await spr.json();

  return {
    props: { data, spirits },
  };
}
