import { createTheme } from "@mui/material/styles";
import { colors, Theme } from "@mui/material";

export const themeModes = {
  dark: "dark",
  light: "light",
};

export type ThemeModes = "dark" | "light";

type Mode = {
  mode: ThemeModes;
};

interface Custom {
  (mode: Mode): Theme;
}

const custom: Custom = ({ mode }) => {
  const customPallete =
    mode === themeModes.dark
      ? {
          primary: {
            main: "#ff0000",
            constrastText: "#ffffff",
          },
          secondary: {
            main: "#f44336",
            constrastText: "#ffffff",
          },
          background: {
            default: "rgb(15,23,42)",
            paper: "#131313",
          },
        }
      : {
          primary: {
            main: "#ff0000",
          },
          secondary: {
            main: "#f44336",
          },
          background: {
            default: colors.grey["100"],
          },
        };
  return createTheme({
    palette: {
      mode,
      ...customPallete,
    },
    components: {
      MuiButton: {
        defaultProps: { disableElevation: true },
      },
    },
  });
};

const themeConfigs = {
  custom,
};

export default themeConfigs;
