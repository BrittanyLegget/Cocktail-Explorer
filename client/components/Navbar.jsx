import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import MuiNextLink from "./MUINextLink";

const Navbar = ({ navLinks }) => {
  
  return (
    <Toolbar
      component="nav"
      sx={{
        display: { xs: `none`, md: `flex` },
      }}
    >
      {/* Place navigation links on Navbar */}
      <Stack direction="row" spacing={4}>
        {navLinks.map(({ title, path }, i) => (
          <MuiNextLink
            key={`${title}${i}`}
            href={path}
            variant="button"
            sx={{ color: `black`, fontSize: "14px", fontWeight: "800" }}
          >
            {title}
          </MuiNextLink>  
        ))}     
      </Stack>
    </Toolbar>
  );
};

export default Navbar;