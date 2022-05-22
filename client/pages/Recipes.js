import Container from "@mui/material/Container";
import { Typography, Divider, Link } from "@mui/material";
import { Stack } from "@mui/material";
import { Button, Box } from "@mui/material";
import Router from "next/router";
import { styled } from "@mui/system";

const StandardTypography = styled(Typography)({
  fontWeight: "bold",
  textAlign: "center",
  paddingTop: "10px",
});

const LinkTypography = styled(Typography)({
  fontSize: 22,
  fontWeight: "bold",
  color: "#bf360c",
});

export default function RecipePage({ data }) {
  function redirect() {
    let url = "/All";
    Router.push(url);
  }

  return (
    <Container maxWidth="md">
      <StandardTypography fontSize={50}>
        Search for recipes by spirit by selecting one below
      </StandardTypography>

      <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem />}
        spacing={2}
        justifyContent="space-between"
        paddingTop={5}
      >
        {/* Map over all spirit types for link generation */}
        {data &&
          data.spirits.map((s, index) => {
            return (
              <div key={index}>
                <Link href={`/Recipes/${s.name}/${s.id}`} underline="hover">
                  <LinkTypography>{s.name}</LinkTypography>
                </Link>
              </div>
            );
          })}
      </Stack>

      <StandardTypography fontSize={30} sx={{ paddingTop: 9 }}>
        Or Browse All Recipes
      </StandardTypography>
      <Box textAlign="center" paddingTop={3}>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => redirect()}
        >
          Browse All
        </Button>
      </Box>
    </Container>
  );
}

//Get all spirits types
export async function getServerSideProps() {
  const res = await fetch(`https://spring-street-app.uw.r.appspot.com/spirits`);
  const data = await res.json();
  console.log(data);

  return {
    props: { data },
  };
}
