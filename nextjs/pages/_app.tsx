import type { AppProps } from "next/app";
import { Header } from "../components/Header";
import { Footer } from "@/components/Footer";
import Head from "next/head";

const FarmFlowApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <link rel="icon" href="/icon.png" />
      </Head>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </>
  );
};

export default FarmFlowApp;
