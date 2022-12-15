import "../styles/globals.css";
import Head from "next/head";
import { CircularProgress, Container, Stack } from "@mui/material";
import { useRouter } from "next/router";
import { AppPropsWithLayout } from "../types";
import { AppProps } from "next/app";
import { LayoutWrapper } from "../components/PageLayout/layoutWrapper";

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  const router = useRouter();

  const LoadingPage = () => {
    return (
      <Container sx={{ height: "100vh" }}>
        <Stack justifyContent="center" alignItems="center" height="100%">
          <CircularProgress />
        </Stack>
      </Container>
    );
  };

  return <LayoutWrapper>{getLayout(<Component {...pageProps} />)}</LayoutWrapper>;
}
//TODO add auth checking
