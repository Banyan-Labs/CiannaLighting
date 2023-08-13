import { parseFileName } from 'helpers/utils';
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
    const handleClick = (index: any) => index === activeIndex ? setActiveIndex(0) : setActiveIndex(index);
    const checkActive = (index: any, className: any) =>
        activeIndex === index ? className : '';
    const getFileNames = (file: any) => {
        const fileName = file?.split('/uploads/')[1];
        const { originalName } = parseFileName(fileName);
        let displayName = '';

        if (originalName) {
            displayName = decodeURI(originalName)?.replace(/%2B/g, ' ');
        }

        return displayName;
    };

    return (
        <>
            <div className="tabs__catalog m-0 px-1 col-12 col-lg-12 col-xl-12 d-flex flex-column">
                <button
                    className={`tab__catalog ${checkActive(1, 'active2')}`}
                    onClick={() => handleClick(1)}
                >
                    Details
                </button>
                <div className={`panel__catalog ${checkActive(1, 'active2')}`}>
                    <Details catalogItem={catalogItem} />
                </div>
                <button
                    className={`tab__catalog ${checkActive(2, 'active2')}`}
                    onClick={() => handleClick(2)}
                >
                    Options
                </button>
                <div className={`panel__catalog ${checkActive(2, 'active2')}`}>
                    <Options catalogItem={catalogItem} />
                </div>
                <button
                    className={`tab__catalog ${checkActive(3, 'active2')}`}
                    onClick={() => handleClick(3)}
                >
                    Specifications
                </button>
                <div className={`panel__catalog ${checkActive(3, 'active2')}`}>
                    <Specifications
                        catalogItem={catalogItem}
                        setCatalogItem={setCatalogItem}
                    />
                </div>
                <button
                    className={`tab__catalog ${checkActive(4, 'active2')}`}
                    onClick={() => handleClick(4)}
                >
                    Attachments
                </button>
                <div className={`panel__catalog ${checkActive(4, 'active2')}`}>
                    <div className="d-flex flex-shrink-0 flex-wrap light_details px-3 mb-3">
                        <div className="col-12">
                            <h4 className="light_details_title">Drawing Files</h4>
                            {Item?.drawingFiles.map(
                                (ef: string, index = ef.indexOf(ef)) => {
                                    const displayName = getFileNames(ef);

                                    return (
                                        <a
                                            key={index}
                                            href={ef}
                                        >
                                            {displayName || `Drawing file #${index + 1}`}
                                        </a>
                                    );
                                }
                            )}
                        </div>

                        <div className="col-12">
                            <h4 className="light_details_title">Renderings</h4>
                            {Item?.renderings?.map(
                                (ef: string, index = ef.indexOf(ef)) => {
                                    const displayName = getFileNames(ef);

                                    return (
                                        <a
                                            key={index}
                                            href={ef}
                                        >
                                            {displayName || `Rendering #${index + 1}`}
                                        </a>
                                    );
                                }
                            )}
                        </div>

                        <div className="col-12">
                            <h4 className="light_details_title">Cut Sheets</h4>
                            {Item?.cutSheets?.map(
                                (ef: string, index = ef.indexOf(ef)) => {
                                    const displayName = getFileNames(ef);

                                    return (
                                        <a
                                            key={index}
                                            href={ef}
                                        >
                                            {displayName || `Cut sheet #${index + 1}`}
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
