import React, { FC } from "react";
import "./style/design-styles.scss";

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

const DesignStyles: FC = ({}) => {
  return (
    <>
      <div className="catalog-design-styles">
        Design Styles
        <div className="catalog-design-styles-buttons">{designStyles}</div>
        <div className="catalog-design-styles-divider" />
      </div>
    </>
  );
};

export default DesignStyles;
