import React from "react";
import { InputFiles } from "../components/InputFiles";
import { DownloadFiles } from "../components/DownloadFiles";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <div>
        <Component {...pageProps} />
      </div>
      <InputFiles />
      <DownloadFiles/>
    </div>
  );
}

export default MyApp;
