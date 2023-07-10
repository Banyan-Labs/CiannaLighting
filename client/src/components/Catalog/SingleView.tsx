import React, { FC } from 'react';
import { BsChevronLeft } from 'react-icons/bs';

import Tabs from './Tabs/Tabs';
import Pictures from './Tabs/Pictures';

import './style/catalog.scss';

interface catalogPros {
    catalogItem: any;
    setCatalogItem: any;
}

const SingleView: FC<catalogPros> = ({ catalogItem, setCatalogItem }) => {
    return (
        <div className="single-view-container col-12">
            <p className="catalog-back" onClick={() => setCatalogItem(null)}>
                <BsChevronLeft
                    onClick={() => setCatalogItem(null)}
                    className="chevron-icon-catalog"
                />{' '}
                Back to Catalog
            </p>
            <div className="d-flex m-0 p-2 row justify-content-center">
                <div className="main-img-catalog-container m-2 col-12 col-lg-8 col-xl-4">
                    {!catalogItem.isActive && (<span >*** This Light is Currently Unavailable ***</span>)}
                    <img
                        className="img-fluid"
                        src={catalogItem.images[0]}
                        alt="img of light"
                    />
                </div>
                <div className="main-right-tab-container col-12 col-xl-7">
                    <Tabs
                        catalogItem={catalogItem}
                        setCatalogItem={setCatalogItem}
                    />
                </div>
            </div>
            <div className="col-12">
                <Pictures catalogItem={catalogItem} />
            </div>
        </div>
    );
};

export default SingleView;
