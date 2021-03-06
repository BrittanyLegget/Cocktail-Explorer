import React from "react";
import Grid from "@mui/material/Grid";
import Image from "next/image";
import { Typography } from "@mui/material";

/* Home page Hero image and title component */
export function Hero({imgSrc, imgAlt, title, subtitle}){
  return(
      <Grid
        component="section"
        container
        sx={{
          position: `relative`,
          height: "100vh",
          width: `100vw`,
          overflow: `hidden`,
          zIndex: -100,
          mb: 5,
        }}
      >  
        <Image src={imgSrc} alt={imgAlt} layout="fill" objectFit="cover" />
        <Grid
          container
          sx={{
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(0,0,0, .7)",
          }}
        >
          <Grid
          container
          item
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Typography
            variant="h1"
            align="center"
            gutterBottom
            sx={{
              color: "secondary.main",
              fontWeight: 800,
            }}
          >
            {title}
          </Typography>
          <Typography
            component="p"
            variant="h4"
            align="center"
            color="common.white"
            
            sx={{
              mb: 10,
              fontWeight: 900,
            }}
          >
            {subtitle}
          </Typography>
      </Grid>
    </Grid>
  </Grid>
)}