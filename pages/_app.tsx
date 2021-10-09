import "../styles/globals.css";
import { useEffect } from "react";
import type { AppProps } from "next/app";
import { registerIntercepts } from "../utils/axios";

function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    registerIntercepts();
  }, []);
  return <Component {...pageProps} />;
}
export default App;
