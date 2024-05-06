import { Typography } from "@mui/material";

const Title = ({ children }: { children: string }) => {
  return (
    <Typography component="h2" variant="h6" color="primary" gutterBottom>
      {children}
    </Typography>
  );
};

export default Title;
