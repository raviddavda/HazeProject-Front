import { Box, Divider, Typography } from "@mui/material";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import ROUTES from "../../routes/ROUTES";

const NotFoundPage = () => {
  return (
    <Fragment>
      <Typography color="primary" variant="h2" component="h2">
        404 PAGE NOT FOUND
      </Typography>
      <Typography variant="h5" component="h5">
        Oops... the page you were looking for does not exist.
      </Typography>
      <Divider sx={{ m: 2 }} />
      <Box>
        <Link to={ROUTES.HOME}>Click here to go back to Home Page.</Link>
      </Box>
    </Fragment>
  );
};

export default NotFoundPage;
