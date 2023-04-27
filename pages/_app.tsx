import "@/styles/globals.css";
import type { AppProps } from "next/app";
import axios from "axios";
import { useEffect } from "react";
import Spinner from "react-bootstrap/Spinner";

export const IS_PRODUCTION = process.env.environment === "PRODUCTION";

export function SpinnerLoader() {
  return (
    <div
      style={{
        position: "fixed",
        backgroundColor: "#3c3c3cd9",
        zIndex: 10,
        inset: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Spinner variant="light" animation="border" />
    </div>
  );
}

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    axios.defaults.baseURL = IS_PRODUCTION
      ? "https://api.eatrofoods.com/"
      : `http://${process.env.development_url}:5000/`;
  }, []);
  return <Component {...pageProps} />;
}
