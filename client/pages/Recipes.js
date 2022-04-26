import Container from "@mui/material/Container";
import { Typography, Divider, Link } from "@mui/material";
import { Stack } from "@mui/material";
import { Button } from "@mui/material";

export default function RecipePage({ data }) {
  return (
    <Container maxWidth="md">
      <Typography
        fontSize={50}
        fontWeight="bold"
        textAlign="center"
        paddingTop={9}
      >
        Search for recipes by spirit by selecting one below
      </Typography>
      <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem />}
        spacing={2}
        justifyContent="space-between"
        paddingTop={5}
      >
        {data &&
          data.spirits.map((s, index) => {
            return (
              <div key={index}>
                <Link href={`/Recipes/${s.name}/${s.id}`} underline="hover">
                  <Typography fontSize={22} fontWeight="bold" color="#bf360c">
                    {s.name}
                  </Typography>
                </Link>
              </div>
            );
          })}
      </Stack>
      {/* <Typography
        fontSize={30}
        fontWeight="bold"
        textAlign="center"
        paddingTop={9}
      >
        Or Browse All
      </Typography>

      <Button variant="contained" color="secondary">
        Browse All
      </Button> */}
    </Container>
  );
}

export async function getServerSideProps() {
  const res = await fetch(`https://spring-street-app.uw.r.appspot.com/spirits`);
  const data = await res.json();
  console.log(data);
  return {
    props: { data },
  };
}
