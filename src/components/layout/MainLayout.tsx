import { Box } from "@mui/material";
import GlobalLoading from "../common/GlobalLoading";
import Footer from "../common/Footer";
import Topbar from "../common/Topbar";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <GlobalLoading />
      <Box display="flex" minHeight="100vh">
        <Topbar />
        <Box component="main" flexGrow={1} overflow="hidden" minHeight="100vh">
          {children}
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default MainLayout;
