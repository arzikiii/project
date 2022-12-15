import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "../modules/theme";
import { LayoutProps } from "./Layout";

export const LayoutWrapper: React.FC<LayoutProps> = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
