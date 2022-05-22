import Container from "@mui/material/Container";
import { Typography, Divider, Link } from "@mui/material";
import { Stack } from "@mui/material";
import { styled } from "@mui/system";

// Styles
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

const LinkStyle = styled(Typography)({
  fontSize: 22,
  fontWeight: "bold",
  color: "#bf360c",
});

export default function LearnPage({ data }) {
  console.log({ data });
  return (
    <Container maxWidth="md">
      <StandardTypography fontSize={50}>
        Select a spirit below to learn more
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
                <Link href={`/Learn/${s.name}/${s.id}`} underline="hover">
                  <LinkTypography>{s.name}</LinkTypography>
                </Link>
              </div>
            );
          })}
      </Stack>
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
