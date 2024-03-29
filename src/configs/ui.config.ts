const uiConfigs = {
  style: {
    gradientBgImage: {
      dark: {
        bagroundImage: "linear-gradient(to top, rgba(0,0,0,1), rgba(0,0,0,0))",
      },
      light: {
        bagroundImage: "linear-gradient(to top, rgba(241,245,245,1), rgba(0,0,0,0))",
      },
    },
    horizontalGradientBgImage: {
      dark: {
        bagroundImage: "linear-gradient(to right, rgba(0,0,0,1), rgba(0,0,0,0))",
      },
      light: {
        bagroundImage: "linear-gradient(to right, rgba(241,245,245,1), rgba(0,0,0,0))",
      },
    },
    typoLines: (lines: string, textAlign: string) => ({
      textAlign: textAlign || "justify",
      display: "-webkit-box",
      overflow: "hidden",
      WebkitBoxOrient: "vertical",
      WebkitLineClamp: lines,
    }),
    mainContent: {
      maxWidth: "1366px",
      margin: "auto",
      padding: 2,
    },
    backroundImage: (imgPath: string) => ({
      position: "relative",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundColor: "darkgrey",
      backgroundImage: `url(${imgPath})`,
    }),
  },
  size: {
    sideBarWith: "300px",
    contentMaxWidth: "1366px",
  },
};

export default uiConfigs;
