import React from "react";
import loaderGif from "../../assets/loader.gif";

export const Loader = () => {
  return (
    <div>
      <img src={loaderGif} alt="loading" />
    </div>
  );
};
