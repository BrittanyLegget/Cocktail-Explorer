import { Hero } from "../components/Hero";
import heroImage from "../public/m-s-meeuwesen-QYWYnzvPTAQ-unsplash.jpg";
import { FeaturedDrink } from "../components/FeaturedDrink";

export default function Home({ data }) {
  return (
    <>
      <Hero
        imgSrc={heroImage}
        imgAlt="hero"
        title="Spring Street Spirits"
        subtitle="Learn About Spirits & Discover Amazing Recipes"
      />
      <FeaturedDrink data={data} />;
    </>
  );
}

export async function getServerSideProps(context) {
  const res = await fetch(process.env.API_URL + "/cocktails/featured");
  const data = await res.json();

  return {
    props: { data },
  };
}
