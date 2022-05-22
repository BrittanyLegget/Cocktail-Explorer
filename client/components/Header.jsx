import { AppBar, Container, Toolbar, Fab } from "@mui/material";
import KeyboardArrowUp from "@mui/icons-material/KeyboardArrowUp";
import { styled } from "@mui/system";
import MuiNextLink from "./MUINextLink";
import Navbar from './Navbar'
import SideDrawer from "./SideDrawer";
import HideOnScroll from "./HideOnScroll";
import BackToTop from "./BackToTop";
import { Logo } from "../components/logo";


const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

export const navLinks = [
  { title: `Home`, path: `/` },
  { title: `Learn About Spirits`, path: `/Learn` },
  { title: `Discover Recipes`, path: `/Recipes` },
  { title: `FAQ`, path: `/FAQ` },

];

const HeaderBar = () => {
  return (
    <>
    <HideOnScroll>    
      <AppBar position="fixed" elevation={1}>
        <Toolbar>
          <Container
            maxWidth="xlg"
            sx={{ display: `flex`, justifyContent: `space-between` }}
          >
          <Logo />
          <MuiNextLink activeClassName="active" href="/" sx={{color: (theme) => theme.palette.common.black,}}></MuiNextLink>
          <Navbar navLinks={navLinks} />
          <SideDrawer navLinks={navLinks} />
          </Container>  
        </Toolbar>  
      </AppBar>  
    </HideOnScroll> 

    <Offset id="back-to-top-anchor" />
      <BackToTop>
        <Fab color="secondary" size="large" aria-label="back to top">
        <KeyboardArrowUp />
        </Fab> 
      </BackToTop>
    </>
  );
};

export default HeaderBar;
