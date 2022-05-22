import {
  Container,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Grid,
  Button,
  Typography,
} from "@mui/material";
import styled from "@emotion/styled";
import Router from "next/router";

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

const ViewAllStyledButton = styled(StyledButton)({
  size: "large",
  type: "submit",
  width: 500,
  height: 50,
  justifyContent: "space-around",
  fontSize: 20,

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
      {/* Spirit name and description */}
      <StandardTypography fontSize={50}>{data.name}</StandardTypography>
      <StandardTypography fontSize={20} paddingBottom={10}>
        {data.description}
      </StandardTypography>

      {/*Top 2 recipe cards from selected spirit type */}
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
                    <StyledButton onClick={() => handleSubmit(c.name, c.id)}>
                      Go to Recipe
                    </StyledButton>
                  </CardActions>
                </div>
              </Card>
            );
          })}
      </Grid>
      <Container maxWidth="md" sx={{ paddingBottom: 20 }}>
        <ViewAllStyledButton
          color="secondary"
          variant="outlined"
          onClick={() => handleViewAllSubmit(data.name, data.id)}
        >
          See All
        </ViewAllStyledButton>
      </Container>
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
