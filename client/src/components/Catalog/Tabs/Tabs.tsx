import React, { FC, useState } from 'react';
import Details from './Details';
import Options from './Options';
import Specifications from './Specifications';

interface catalogPros {
    catalogItem: any;
    setCatalogItem: any;
}

const Tabs: FC<catalogPros> = ({ catalogItem, setCatalogItem }) => {
    const Item = catalogItem;
    const [activeIndex, setActiveIndex] = useState(1);
    const handleClick = (index: any) => setActiveIndex(index);
    const checkActive = (index: any, className: any) =>
        activeIndex === index ? className : '';
    return (
        <>
            <div className="tabs__catalog m-0 px-1 col-12 col-lg-12 col-xl-12">
                <button
                    className={`tab__catalog ${checkActive(1, 'active2')}`}
                    onClick={() => handleClick(1)}
                >
                    Details
                </button>
                <button
                    className={`tab__catalog ${checkActive(2, 'active2')}`}
                    onClick={() => handleClick(2)}
                >
                    Options
                </button>
                <button
                    className={`tab__catalog ${checkActive(3, 'active2')}`}
                    onClick={() => handleClick(3)}
                >
                    Specifications
                </button>
                <button
                    className={`tab__catalog ${checkActive(4, 'active2')}`}
                    onClick={() => handleClick(4)}
                >
                    Attachments
                </button>
            </div>
            <div className="panels__catalog">
                <div className={`panel__catalog ${checkActive(1, 'active2')}`}>
                    <Details catalogItem={catalogItem} />
                </div>
                <div className={`panel__catalog ${checkActive(2, 'active2')}`}>
                    <Options catalogItem={catalogItem} />
                </div>
                <div className={`panel__catalog ${checkActive(3, 'active2')}`}>
                    <Specifications
                        catalogItem={catalogItem}
                        setCatalogItem={setCatalogItem}
                    />
                </div>
                <div className={`panel__catalog ${checkActive(4, 'active2')}`}>
                    <div className="d-flex col-12 row m-0 attachments_container">
                        <div className="d-flex flex-column h-50 align-items-center m-0">
                            <h4 className="m-0">Drawing Files:</h4>
                            {Item?.drawingFiles.map(
                                (ef: string, index = ef.indexOf(ef)) => {                                    
                                    const fileName =  ef.match(/(?<=\/\d+-)(\w+)(?=\.\w+)(?!\/)/g);                                    
                                    return (
                                        <a
                                            className="m-2"
                                            key={index}
                                            href={ef}
                                        >
                                            {fileName ? fileName[0] : '' }
                                        </a>
                                    );
                                }
                            )}
                        </div>

                        <div className="d-flex flex-column h-50 align-items-center m-0">
                            <h4 className="m-0">PDF:</h4>
                            {Item?.pdf.map(
                                (ef: string, index = ef.indexOf(ef)) => {                                    
                                    const fileName =  ef.match(/(?<=\/\d+-)(\w+)(?=\.\w+)(?!\/)/g);                                    
                                    return (
                                        <a
                                            className="m-2"
                                            key={index}
                                            href={ef}
                                        >
                                            {fileName ? fileName[0]: '' }
                                        </a>
                                    );
                                }
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Tabs;
