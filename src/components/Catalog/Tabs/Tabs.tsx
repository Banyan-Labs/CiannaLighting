import React, { FC, useState } from "react";
import Options from "./Options";
import Specifications from './Specifications'

interface catalogPros {
    catalogItem: any;
    setCatalogItem: any;
}

const Tabs: FC<catalogPros> = ({
    catalogItem,
    setCatalogItem,
}) => {
    const Item = catalogItem
    const [activeIndex, setActiveIndex] = useState(1);
    const handleClick = (index: any) => setActiveIndex(index);
    const checkActive = (index: any, className: any) => activeIndex === index ? className : "";
    return (
        <>
            <div className="tabs">
                <button
                    className={`tab ${checkActive(1, "active2")}`}
                    onClick={() => handleClick(1)}
                >
                    Details
                </button>
                <button
                    className={`tab ${checkActive(2, "active2")}`}
                    onClick={() => handleClick(2)}
                >
                    Options
                </button>
                <button
                    className={`tab ${checkActive(3, "active2")}`}
                    onClick={() => handleClick(3)}
                >
                    Specifications
                </button>
                <button
                    className={`tab ${checkActive(4, "active2")}`}
                    onClick={() => handleClick(4)}
                >
                    Attachments
                </button>
            </div>
            <div className="panels">
                <div className={`panel ${checkActive(1, "active2")}`}>
                    <div className="catalog-details-left-container col-6">
                        <h4 className="d-flex justify-content-between m-0">Name: <span>Acrylic Pendant</span></h4>
                        <h4 className="d-flex justify-content-between m-0">Id: <span>{Item.item_ID}</span> </h4>
                        <h4 className="d-flex row justify-content-between m-0">Description: <span className="span-description">{Item?.itemDescription}</span> </h4>

                    </div>
                    <div className="catalog-details-right-container col-6 d-flex justify-content-between" >
                            <div className="design-holder">
                        <h4 className='m-0'>
                            Design Styles:
                            </h4>
                            <div className="d-flex row">
                            {catalogItem?.designStyle
                                .map(
                                    (
                                        ef: string,
                                        index = ef.indexOf(ef)
                                    ) => {
                                        return (
                                            <span key={index}>{ef}</span>
                                        );
                                    }
                                )}
                                </div>
                        </div>
                        
                        <div className="design-holder m-0">
                        <h4 className='m-0'>
                            Use Packages:
                             </h4>
                             <div className="d-flex row">
                            {catalogItem?.usePackages
                                .map(
                                    (
                                        ef: string,
                                        index = ef.indexOf(ef)
                                    ) => {
                                        return (
                                            <span key={index}>{ef}</span>
                                        );
                                    }
                                )}
                            </div>
                        </div>
                    </div>
                    </div>
                <div className={`panel ${checkActive(2, "active2")}`}>
                   <Options catalogItem={catalogItem}
                            setCatalogItem={setCatalogItem}
                            />
                </div>
                <div className={`panel ${checkActive(3, "active2")}`}>
                    <Specifications 
                    catalogItem={catalogItem}
                    setCatalogItem={setCatalogItem}
                    /> 
                </div>
                <div className={`panel ${checkActive(4, "active2")}`}>
                </div>
            </div>
        </>
    );
};

export default Tabs;