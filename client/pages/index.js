import { Container, Box, Grid, Stack, Card } from "@mui/material";
import { Hero } from "../components/Hero";
import heroImage from "../public/m-s-meeuwesen-QYWYnzvPTAQ-unsplash.jpg";

export default function Home() {
  return (
    <Hero
      imgSrc={heroImage}
      imgAlt="hero"
      title="Spring Street Spirits"
      subtitle="Learn About Spirits & Discover Amazing Recipes"
    />
  );
}
