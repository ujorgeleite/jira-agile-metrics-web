import React from "react";
import { DownloadFiles } from "../components/DownloadFiles";
import { InputFiles } from "../components/InputFiles";
import { FileContextProvider } from "../context/FileContext";

import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <FileContextProvider>
      <div>
        <header>
          <h1>Jira Agile Metrics </h1>
        </header>
        <div className="home-container">
          <Component {...pageProps} />
        </div>
        <div className="home-list">
          <div className="home-list__container">
            <InputFiles />
            <DownloadFiles />
          </div>
        </div>
      </div>
    </FileContextProvider>
  );
}

export default MyApp;
