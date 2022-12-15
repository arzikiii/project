import { Stack, Container } from "@mui/material";
import Footer from "./footer";
import NavBar from "./navbar";
import { LayoutWrapper } from "./layoutWrapper";

export type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <LayoutWrapper>
      <Container sx={{ mt: 7 }}>
        <Stack display="flex" flexDirection="column" minHeight="100vh">
          <NavBar />
          <main>{children}</main>
          <Footer />
        </Stack>
      </Container>
    </LayoutWrapper>
  );
};

export default Layout;
