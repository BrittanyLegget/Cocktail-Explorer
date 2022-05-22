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
import Image from "next/image";
import styled from "@emotion/styled";
import Router from "next/router";

// Styles
const StandardTypography = styled(Typography)({
  fontSize: "50px",
  fontWeight: "bold",
  textAlign: "center",
  paddingTop: "5px",
  paddingBottom: "3px",
});

const CardStyledText = styled(Typography)({
  fontSize: "20px",
  fontWeight: "bold",
  textAlign: "left",
  paddingTop: "5px",
  paddingBottom: "25px",
});

const CardHeaderText = styled(Typography)({
  fontSize: "25px",
  fontWeight: "600",
  textAlign: "left",
  paddingTop: "5px",
  fontFamily: "roboto",
  paddingBottom: "15px",
});

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

//Click Handler to view all recipes by spirit type
function handleViewAllSubmit(name, id) {
  let url = `/Recipes/${name}/${id}`;
  Router.push(url);
}

export default function LearnSpirit({ data, spirits, Type }) {
  const spiritType = Type.name;
  const spiritTypeID = Type.id;

  return (
    <Container maxWidth="md">
      {/*Recipe*/}
      <StandardTypography>{data.name}</StandardTypography>
      <Image src={data.image} alt={data.name} width={500} height={300} />
      <CardHeaderText>Ingredients:</CardHeaderText>
      <CardStyledText>{data.ingredients}</CardStyledText>
      <CardHeaderText>Instructions:</CardHeaderText>
      <CardStyledText>{data.instructions}</CardStyledText>

      {/*Top 2 recipe cards from selected spirit type */}
      <NewSectionText>Other Recipes:</NewSectionText>
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
  const query = context.query.cocktail_id;

  //recipe
  const res = await fetch(
    `https://spring-street-app.uw.r.appspot.com/cocktails/${query}`
  );
  const data = await res.json();
  const spirit = data.spirit;

  //2 recipes for same spirit type
  const spr = await fetch(
    `https://spring-street-app.uw.r.appspot.com/cocktails/spirit/excp/${spirit}`
  );
  const spirits = await spr.json();

  //Spirit Type
  const Typeres = await fetch(
    `https://spring-street-app.uw.r.appspot.com/spirits/${spirit}`
  );
  const Type = await Typeres.json();
  console.log(Type);
  return {
    props: { data, spirits, Type },
  };
}
