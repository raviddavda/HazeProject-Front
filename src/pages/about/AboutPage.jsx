import { Divider, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";
import ROUTES from "../../routes/ROUTES";

const AboutPage = () => {
  return (
    <Box mb={8}>
      <Typography color="primary" component="h1" variant="h1">
        ABOUT
      </Typography>
      <Typography component="h5" variant="h5">
        Welcome to Haze, the ultimate destination for creating, sharing, and
        discovering innovative game page designs!
      </Typography>
      <Divider sx={{ m: 2 }} />
      <Typography color="primary" component="h2" variant="h2">
        What We Offer
      </Typography>
      <Typography mb={3}>
        <Typography
          component={Link}
          to={ROUTES.HOME}
          variant="h6"
          color="primary"
          sx={{ textDecoration: "underline", mb: 2 }}
        >
          Discover:
        </Typography>{" "}
        Explore a diverse gallery of game page designs crafted by talented
        individuals from around the world. Find inspiration, explore trending
        games, and discover innovative ideas to make your mark.
      </Typography>
      <Typography mb={3}>
        <Typography
          component={Link}
          to={ROUTES.ADDGAME}
          variant="h6"
          color="primary"
          sx={{ textDecoration: "underline", mb: 2 }}
        >
          Create:
        </Typography>{" "}
        Unleash your creativity with our intuitive and user-friendly design
        tools. Customize every aspect of your game page. Tailor your game page
        to showcase your game and all of its features effortlessly.
      </Typography>
      <Typography mb={3}>
        <Typography
          component={Link}
          to={ROUTES.REGISTER}
          variant="h6"
          color="primary"
          sx={{ textDecoration: "underline", mb: 2 }}
        >
          Get Involved:
        </Typography>{" "}
        Haze welcomes all game developers! Join our community, share your
        creations, and be part of a platform dedicated to celebrating uniqueness
        and creativity.
      </Typography>
      <Typography component="h5" variant="h5">
        Join Haze today and redefine the way you network and showcase your games
        through stunning game page designs!
      </Typography>
    </Box>
  );
};

export default AboutPage;
