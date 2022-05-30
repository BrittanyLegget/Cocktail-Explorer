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

// Styles
const StyledButton = styled(Button)({
  margin: "auto",
  display: "block",

  ":hover": {
    color: "black",
    borderColor: "white",
    backgroundColor: "#cfd8dc",
  },
});

const StandardTypography = styled(Typography)({
  fontSize: "50px",
  fontWeight: "bold",
  textAlign: "center",
  paddingBottom: "20px",
});

export function FeaturedDrink({data}){

//Click Handler to view full recipe
function handleSubmit(name, id) {
let url = `/Cocktail/${name}/${id}`;
Router.push(url);
}

  return(
    <Container maxWidth="lg" >
      <StandardTypography>Featured Cocktail</StandardTypography>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
        style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
}}
      >
        <Card sx={{ width: 325, margin: 3 }}>
            <CardHeader title={data.name} />
            <CardMedia
            component="img"
            image={data.image}
            alt={data.image}
            style={{ height: "200px", paddingTop: "2%" }}
            title={data.name}
            />
            <CardContent>
            <Typography variant="body2" color="text.secondary">
                {data.ingredients}
            </Typography>
            </CardContent>
            <CardActions disableSpacing>
            <StyledButton
                size="small"
                color="secondary"
                variant="outlined"
                type="submit"
                onClick={() => handleSubmit(data.name, data.id)}
            >
                Go to Recipe
            </StyledButton>
            </CardActions>
        </Card>       
      </Grid>
    </Container>
)}