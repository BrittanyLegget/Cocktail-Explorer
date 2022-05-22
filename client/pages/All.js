import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Grid, Button } from "@mui/material";
import styled from "@emotion/styled";
import Router from "next/router";
import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";

// Styles
const StandardTypography = styled(Typography)({
  fontWeight: "bold",
  textAlign: "center",
  paddingTop: "3px",
});

const StyledButton = styled(Button)({
  margin: "auto",
  display: "block",
  size: "small",
  color: "secondary",
  variant: "outlined",
  type: "submit",

  ":hover": {
    color: "black",
    borderColor: "white",
    backgroundColor: "#cfd8dc",
  },
});

//Click Handler to view full recipe
function handleSubmit(name, id) {
  let url = `/Cocktail/${name}/${id}`;
  Router.push(url);
}

export default function RecipeCard({ data }) {
  const [count, setCount] = useState();

  useEffect(() => {
    let responseBody = {};

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
          <StandardTypography fontSize={50}>
            Vewing all {count} recipes
          </StandardTypography>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {/* Map over all recipes, creating cards */}
            {data &&
              data.cocktails.map((c, index) => {
                return (
                  <Card sx={{ width: 325, margin: 3 }}>
                    <div key={index}>
                      <CardHeader title={c.name} />
                      <CardMedia
                        component="img"
                        image={c.image}
                        alt={c.image}
                        style={{ height: "200px", paddingTop: "2%" }}
                        title={c.name}
                      />
                      <CardContent>
                        <Typography variant="body2" color="text.secondary">
                          {c.ingredients}
                        </Typography>
                      </CardContent>
                      <CardActions disableSpacing>
                        <StyledButton
                          onClick={() => handleSubmit(c.name, c.id)}
                        >
                          Go to Recipe
                        </StyledButton>
                      </CardActions>
                    </div>
                  </Card>
                );
              })}
          </Grid>
        </>
      )}
    </Container>
  );
}

export async function getServerSideProps(context) {
  //Get spirit from url parameter
  const query = context.query.spirit_id;
  const res = await fetch(
    `https://spring-street-app.uw.r.appspot.com/cocktails`
  );
  const data = await res.json();

  // const res2 = await fetch("http://localhost:3000/api/microservice");
  // const count = await res2.json();

  return {
    props: { data },
  };
}
