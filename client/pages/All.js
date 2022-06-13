import { Typography, Container } from "@mui/material";
import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import { CocktailCard } from "../components/CocktailCard";

export default function RecipeCard({ data }) {
  const [count, setCount] = useState();
  const microservice = "http://localhost:3000/api/microservice";

  useEffect(() => {
    // Send "GET" to microservice
    async function sendGet() {
      await fetch(microservice, {
        method: "POST",
        body: "GET",
        headers: {
          "Content-Type": "text/html",
        },
      });
    }
    sendGet();

    //Get count recipes from microservice
    async function getCount() {
      let responseBody = {};
      const response = await fetch(microservice, {
        method: "GET",
      });
      responseBody = await response.json();
      setCount(responseBody.data);

      if (responseBody.data == "GET") {
        getCount();
      }
    }
    getCount();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ paddingTop: 7 }}>
      {count === "GET" ? (
        <h4>
          <Spinner />
        </h4>
      ) : (
        <>
          <Typography sx={{ typography: "title" }}>
            Vewing all {count} recipes
          </Typography>
          <CocktailCard data={data} />;
        </>
      )}
    </Container>
  );
}

export async function getServerSideProps() {
  const res = await fetch(process.env.API_URL + "/cocktails");
  const data = await res.json();

  return {
    props: { data },
  };
}
