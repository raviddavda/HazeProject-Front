import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import ROUTES from "../routes/ROUTES";
import Tooltip from "@mui/material/Tooltip";

const GameComponent = ({ _id, title, img, alt, like, email, onFavGame }) => {
  const handleFavGame = () => {
    onFavGame(_id);
  };

  return (
    <Card>
      <CardActionArea component={Link} to={`${ROUTES.GAMEPAGE}/${_id}`}>
        <CardMedia
          component="img"
          image={img}
          alt={alt}
          sx={{ height: "220px", width: "350px" }}
        />
      </CardActionArea>
      <CardContent>
        <CardHeader title={title} sx={{ p: 0, mb: 1 }} />
        <Divider />
        <Box display="flex" justifyContent="space-between">
          <Box>
            <Tooltip title="Like" arrow>
              <IconButton onClick={handleFavGame}>
                <FavoriteIcon color={like ? "heart" : ""} />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

GameComponent.propTypes = {
  _id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string,
  address: PropTypes.string,
  img: PropTypes.string,
  alt: PropTypes.string,
  like: PropTypes.any,
};
GameComponent.defaultProps = {
  img: "https://www.livemint.com/lm-img/img/2023/08/14/1600x900/garena_free_fire_max_1688877791610_1691982307589.jpg",
  alt: "running",
};

export default GameComponent;
