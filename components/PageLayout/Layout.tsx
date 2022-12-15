import { Stack } from "@mui/material";
import Footer from "../modules/footer";
import NavBar from "../modules/navbar";
import { LayoutWrapper } from "./layoutWrapper";

export type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <LayoutWrapper>
      <Stack display="flex" flexDirection="column" minHeight="100vh">
        <NavBar />
        <main>{children}</main>
        <Footer />
      </Stack>
    </LayoutWrapper>
  );
};

export default Layout;
