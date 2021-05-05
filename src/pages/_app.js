import React from "react";
import { InputFiles } from "../components/InputFiles";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <div>
        <Component {...pageProps} />
      </div>
      <InputFiles />
    </div>
  );
}

export default MyApp;
