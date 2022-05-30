import { Typography, Container } from "@mui/material";
import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import { CocktailCard } from "../components/CocktailCard";

export default function RecipeCard({ data }) {
  const [count, setCount] = useState();

  useEffect(() => {
    // Send "GET" to microservice
    async function sendGet() {
      await fetch("http://localhost:3000/api/microservice", {
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
      const response = await fetch("http://localhost:3000/api/microservice", {
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

export async function getServerSideProps(context) {
  const res = await fetch(
    `https://spring-street-app.uw.r.appspot.com/cocktails`
  );
  const data = await res.json();

  return {
    props: { data },
  };
}