import React from "react";
import { HashLoader } from "react-spinners";

const LoaderSpinner = () => {
  return (
    <div className="loader-container">
      <HashLoader color="#d69e2e" />
    </div>
  );
};

export default LoaderSpinner;
