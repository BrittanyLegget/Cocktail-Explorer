import { Stack, Link, Typography, Divider } from "@mui/material";
import { styled } from "@mui/system";

const LinkTypography = styled(Typography)({
  fontSize: 22,
  fontWeight: "bold",
  color: "#bf360c",
});

export function LearnSpiritTypeLinks({data}){
  return(
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
)}