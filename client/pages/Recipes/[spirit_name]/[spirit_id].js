import { CocktailCard } from "../../../components/CocktailCard";

export default function RecipeCard({ data }) {
  return <CocktailCard data={data} />;
}

export async function getServerSideProps(context) {
  //Get spirit from url parameter
  const query = context.query.spirit_id;
  const res = await fetch(
    `https://spring-street-app.uw.r.appspot.com/cocktails/spirit/${query}`
  );
  const data = await res.json();

  return {
    props: { data },
  };
}
