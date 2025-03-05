import Layout from "@/components/layout";
import { ModalProvider } from "@/components/layout/ModalContext";
import "@/styles/globals.css";
import "@/styles/slick.css";
import "@/styles/tableContent.css";
import "@/styles/tailwind.css";
import "@fontsource/roboto";

import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <ModalProvider>
        <Component {...pageProps} />
      </ModalProvider>
    </Layout>
  );
}
