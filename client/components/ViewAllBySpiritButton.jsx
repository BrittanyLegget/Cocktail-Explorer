
import Router from "next/router";
import { Container,Button } from "@mui/material";
import styled from "@emotion/styled";

const ViewAllStyledButton = styled(Button)({
  margin: "auto",
  display: "block",
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

export function ViewAllBySpirit({name, id}){

  //Click Handler to view full recipe
  function handleViewAllSubmit(name, id) {
  let url = `/Recipes/${name}/${id}`;
  Router.push(url);
}

  return(
  <Container maxWidth="md" sx={{ paddingBottom: 20 }}>
        <ViewAllStyledButton
          color="secondary"
          variant="outlined"
          onClick={() => handleViewAllSubmit(name, id)}
        >
          See All {name} Recipes
        </ViewAllStyledButton>
  </Container>
)}