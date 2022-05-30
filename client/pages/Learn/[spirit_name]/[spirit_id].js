import { Container, Typography } from "@mui/material";
import styled from "@emotion/styled";
import { CocktailCard } from "../../../components/CocktailCard";
import { ViewAllBySpirit } from "../../../components/ViewAllBySpiritButton";

// Styles
const StandardTypography = styled(Typography)({
  fontWeight: "bold",
  textAlign: "center",
  paddingTop: "10px",
});

const NewSectionText = styled(Typography)({
  fontSize: "40px",
  fontWeight: "400",
  textAlign: "center",
  color: "gray",
  paddingBottom: "30px",
});

export default function LearnSpirit({ data, spirits }) {
  return (
    <Container maxWidth="md">
      {/* Spirit name and description */}
      <StandardTypography fontSize={50}>{data.name}</StandardTypography>
      <StandardTypography fontSize={20} paddingBottom={10}>
        {data.description}
      </StandardTypography>

      {/*Top 2 recipe cards from selected spirit type */}
      <NewSectionText>{data.name} Recipes:</NewSectionText>
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
