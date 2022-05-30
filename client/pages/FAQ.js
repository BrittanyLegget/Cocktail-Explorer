import Container from "@mui/material/Container";
import { Typography } from "@mui/material";
import { styled } from "@mui/system";

// Styles
const FaqHeader = styled(Typography)({
  fontWeight: "bold",
  paddingTop: "10px",
  fontSize: "25px",
});
const FaqText = styled(Typography)({
  paddingTop: "3px",
  paddingBottom: "10px",
  fontSize: "14px",
});

export default function FaqPage() {
  return (
    <Container maxWidth="md">
      <Typography sx={{ typography: "title" }}>
        Frequently Asked Questions
      </Typography>

      <FaqHeader>What’s the difference between liquor and liqueur?</FaqHeader>
      <FaqText>
        Liquor refers to a distilled alcoholic spirit (vodka, whiskey, etc.),
        while a liqueur is a flavored spirit with at least 2.5 percent sugar by
        U.S. law. Liqueurs are usually lower in ABV and are called “cordials” in
        the UK.
      </FaqText>

      <FaqHeader>What’s the difference between ABV and proof?</FaqHeader>
      <FaqText>
        Both “ABV” and “proof” are terms that refer to the amount of pure
        alcohol in a spirit. ABV stands for “alcohol by volume,” which measures
        the amount of ethanol in a specific bottle of alcohol by percentage. The
        proof refers to the spirit’s alcohol content on a 0 to 200 scale. To
        calculate the "proof" of a spirit, simply double the ABV. For example,
        if a rum is 50% ABV it would be 100-proof.
      </FaqText>

      <FaqHeader>
        Do different glasses serve a purpose, or are they just for looks?
      </FaqHeader>
      <FaqText>
        Glasses serve very particular purposes, which is why cocktails usually
        call for a specific one. Highball glasses and Champagne flutes funnel
        the bubbles of soda up to the top, preventing it from going flat. The
        wide opening on a lowball glass opens up the aromas of a cocktail or
        spirit, and certain speciality whiskey glasses claim to further enhance
        the experience of drinking whiskey. Some mugs are designed to keep
        drinks hot, like an Irish Coffee, while a metal Mint Julep cup keeps the
        cocktail frosty. A Hurricane glass is big enough to fit all those tiki
        ingredients, and a coupe glass delicately holds any drink that is served
        up.
      </FaqText>

      <FaqHeader>What’s a “twist”?</FaqHeader>
      <FaqText>
        A twist refers to a swath of citrus peel—usually lemon, orange or
        grapefruit with no white pith—that’s twisted over a drink so that its
        zest is expressed, releasing a light and bright citrusy flavor into the
        cocktail.
      </FaqText>

      <FaqHeader>Should a Martini be shaken or stirred?</FaqHeader>
      <FaqText>
        Technically, a Martini can be either shaken or stirred depending on your
        preference, but the classic way of preparing one is by stirring.
      </FaqText>

      <FaqHeader>How much is in one shot, finger, dram, etc.?</FaqHeader>
      <FaqText>
        A conventional shot is 1.5 oz of liquid, though be weary of double shot
        glasses that can hold up to 3 oz. A finger of liquor is about an inch of
        liquid pour into a glass. A dram technically refers to an eighth-ounce
        of liquid, but is used colloquially to refer to a neat pour of whiskey.
      </FaqText>

      <FaqHeader>What are bitters?</FaqHeader>
      <FaqText>
        Bitters are highly concentrated, potent flavoring agents made from
        steeping herbs, roots, citrus peels, seeds, spices, flowers and barks in
        high-proof alcohol. You only need to use a few dashes in a cocktail, but
        it will hugely affect the taste of your cocktail for the better.
        Contrary to the name, bitters do not actually make your drink taste
        bitter.
      </FaqText>
      <br></br>
    </Container>
  );
}
