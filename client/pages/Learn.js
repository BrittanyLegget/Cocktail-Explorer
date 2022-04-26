import Container from "@mui/material/Container";
import { Typography, Divider, Link } from "@mui/material";
import { Stack } from "@mui/material";

export default function LearnPage({ data }) {
  console.log({ data });
  return (
    <Container maxWidth="md">
      <Typography
        fontSize={50}
        fontWeight="bold"
        textAlign="center"
        paddingTop={9}
      >
        Select a spirit below to learn more
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
                <Link href={`/Learn/${s.name}/${s.id}`} underline="hover">
                  <Typography fontSize={22} fontWeight="bold" color="#bf360c">
                    {s.name}
                  </Typography>
                </Link>
              </div>
            );
          })}
      </Stack>
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
