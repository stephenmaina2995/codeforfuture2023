import type { AppProps } from "next/app";
import { Header } from "../components/Header";
import { Footer } from "@/components/Footer";
import Head from "next/head";
import "../styles/globals.css";

const FarmFlowApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <link rel="icon" href="/icon.png" />
      </Head>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="relative flex flex-col flex-1 px-2">
          <Component {...pageProps} />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default FarmFlowApp;
