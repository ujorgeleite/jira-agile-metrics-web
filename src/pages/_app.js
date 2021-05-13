import React from "react";
import { DownloadFiles } from "../components/DownloadFiles";
import { InputFiles } from "../components/InputFiles";
import { FileContextProvider } from "../context/FileContext";

import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <FileContextProvider>
      <div>
        <h1>Jira Agile Metrics</h1>
        <div className="home-container">
          <Component {...pageProps} />
        </div>
        <InputFiles />
        <DownloadFiles />
      </div>
    </FileContextProvider>
  );
}

export default MyApp;
