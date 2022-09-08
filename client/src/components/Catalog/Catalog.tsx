import React, { FC } from "react";
import { Navigate } from "react-router-dom";
import { AppProps } from "../../App";
import DesignStyles from "./DesignStyles/DesignStyles";

import "./style/catalog.scss";

const designStylesData = [
  "Art Deco",
  "Colonial",
  "Asian",
  "Contemporary",
  "Transitional",
  "Traditional",
  // "Traditional",
];

const designStyles = designStylesData.map((style) => {
  return (
    <>
      <div className="design-style-buttons-container">
        <button className="design-style-button">{style}</button>
      </div>
    </>
  );
});

const Catalog: FC<AppProps> = ({ user }) => {
  return (
    <>
      {Object.keys(user).length === 0 ? (
        <Navigate to="/login" />
      ) : (
        <>
          <div className="catalog-container">
            <div className="catalog-side-container">Catalog Filter</div>
            <div className="catalog-main-container">
              <DesignStyles />

              <div className="catalog-use-packages">
                Use Packages
                <div className="catalog-design-styles-buttons">
                  {/* {designStyles} */}
                </div>
                <div className="catalog-design-styles-divider" />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Catalog;
