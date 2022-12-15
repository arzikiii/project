import "../styles/globals.css";
import Head from "next/head";
import { CircularProgress, Container, Stack } from "@mui/material";
import { useRouter } from "next/router";
import { AppPropsWithLayout } from "../types";
import { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  // const getLayout = Component.getLayout ?? ((page) => page);
  // const router = useRouter();

  // const LoadingPage = () => {
  //   return (
  //     <Container sx={{ height: "100vh" }}>
  //       <Stack justifyContent="center" alignItems="center" height="100%">
  //         <CircularProgress />
  //       </Stack>
  //     </Container>
  //   );
  // };

  return <Component {...pageProps} />;
}
//TODO add auth checking
