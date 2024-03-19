import HeaderComponent from "./header/HeaderComponent";
import Main from "./main/Main";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { darkThemeActions } from "../store/theme";
import tmc from "twin-moon-color";
import { useDispatch, useSelector } from "react-redux";
import { red, green, blue } from "@mui/material/colors";
import FooterComponent from "./footer/FooterComponent";

const LayoutComponent = ({ children }) => {
  const isDarkTheme = useSelector((bigPie) => bigPie.themeSlice.darkTheme);
  const dispatch = useDispatch();

  const themes = tmc({
    primary: blue[1100],
    secondary: blue[300],
    heart: red[500],
    tick: green[500],
  });

  const handleThemeChange = (checked) => {
    if (checked) {
      localStorage.setItem("darkMode", true);
    } else {
      localStorage.removeItem("darkMode");
    }
    dispatch(darkThemeActions.changeTheme());
  };

  return (
    <ThemeProvider
      theme={isDarkTheme ? createTheme(themes.dark) : createTheme(themes.light)}
    >
      <CssBaseline />
      <HeaderComponent
        isDarkTheme={isDarkTheme}
        onThemeChange={handleThemeChange}
      />
      <Main>{children}</Main>
      <FooterComponent />
    </ThemeProvider>
  );
};

export default LayoutComponent;
