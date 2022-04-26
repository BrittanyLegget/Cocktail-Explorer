import Container from "@mui/material/Container";
import Image from "next/image";
import styled from "@emotion/styled";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import { Grid, Button, Typography } from "@mui/material";
import Router from "next/router";

const NewSectionText = styled(Typography)({
  fontSize: "40px",
  fontWeight: "400",
  textAlign: "center",
  paddingTop: "5px",
  color: "gray",
  paddingBottom: "30px",
});

const StyledButton = styled(Button)({
  margin: "auto",
  display: "block",

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

//Click Handler to view full recipe
function handleViewAllSubmit(name, id) {
  let url = `/Recipes/${name}/${id}`;
  Router.push(url);
}

/* Page Displays description of spirit based gathered from url paramter*/
export default function LearnSpirit({ data, spirits }) {
  return (
    <Container maxWidth="md">
      <Typography
        fontSize={50}
        fontWeight="bold"
        textAlign="center"
        paddingTop={5}
      >
        {data.name}
      </Typography>
      <Typography
        fontSize={20}
        fontWeight="bold"
        textAlign="center"
        paddingTop={5}
        paddingBottom={10}
      >
        {data.description}
      </Typography>

      <NewSectionText>{data.name} Recipes:</NewSectionText>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
        paddingBottom={1}
        sx={{ justifyContent: "space-around" }}
      >
        {spirits &&
          spirits.cocktails.map((c, index) => {
            return (
              <Card sx={{ width: 345, margin: 3 }}>
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
                      size="small"
                      color="secondary"
                      variant="outlined"
                      type="submit"
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
      <Container maxWidth="md" sx={{ paddingBottom: 20 }}>
        <StyledButton
          size="large"
          color="secondary"
          variant="outlined"
          type="submit"
          style={{
            width: 500,
            height: 50,
            justifyContent: "space-around",
            fontSize: 20,
          }}
          onClick={() => handleViewAllSubmit(data.name, data.id)}
        >
          See All
        </StyledButton>
      </Container>
    </Container>
  );
}

export async function getServerSideProps(context) {
  //Get spirit from url parameter
  const query = context.query.spirit_id;
  const res = await fetch(
    `https://spring-street-app.uw.r.appspot.com/spirits/${query}`
  );
  const data = await res.json();

  //recipe
  // const ctl = await fetch(
  //   `https://spring-street-app.uw.r.appspot.com/cocktails/${query}`
  // );
  // const cocktails = await ctl.json();

  //2 recipes for same spirit type
  const spr = await fetch(
    `https://spring-street-app.uw.r.appspot.com/cocktails/spirit/excp/${query}`
  );
  const spirits = await spr.json();

  return {
    props: { data, spirits },
  };
}
