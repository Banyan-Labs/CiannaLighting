import React, { FC, useState } from "react";

interface catalogPros {
    catalogItem: any;
    setCatalogItem: any;
}

const Tabs:FC<catalogPros> = ({ 
    catalogItem,
     setCatalogItem,
     }) => { 
    const [activeIndex, setActiveIndex] = useState(1);
  const handleClick = (index: any) => setActiveIndex(index);
  const checkActive = (index: any, className:any) => activeIndex === index ? className : "";
  return (
    <>
     <div className="tabs">
        <button
          className={`tab ${checkActive(1, "active")}`}
          onClick={() => handleClick(1)}
        >
          Options
        </button>
        <button
          className={`tab ${checkActive(2, "active")}`}
          onClick={() => handleClick(2)}
        >
          Customer Reviews
        </button>
        <button
          className={`tab ${checkActive(3, "active")}`}
          onClick={() => handleClick(3)}
        >
          Delivery &amp; Returns
        </button>
      </div> 
      <div className="panels">
        <div className={`panel ${checkActive(1, "active")}`}>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean erat ligula, feugiat at felis vitae, porttitor lacinia quam.</p>
        </div>
        <div className={`panel ${checkActive(2, "active")}`}>
          <p>Nulla lobortis quis massa quis lobortis. Nullam porta semper lorem, vel efficitur augue rutrum quis. Suspendisse potenti.</p>
        </div>
        <div className={`panel ${checkActive(3, "active")}`}>
          <p>Cras porta consectetur dolor porttitor fringilla. Cras vitae urna ac erat fermentum egestas. Donec egestas cursus scelerisque.</p>
        </div>
      </div>
    </>
  );
};

export default Tabs;