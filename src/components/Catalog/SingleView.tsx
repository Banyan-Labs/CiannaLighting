import React, { FC } from 'react';
import './style/catalog.scss';
interface catalogPros {
    catalogItem: any;
    setCatalogItem: any;
}
import { BsChevronLeft } from 'react-icons/bs';
import avatar2 from '../../assets/stairway.jpeg';
import Tabs from './Tabs/Tabs';
import Pictures from './Tabs/Pictures';

const SingleView: FC<catalogPros> = ({ catalogItem, setCatalogItem }) => {
    return (
        <div className="single-view-container">
            Hello
            <p className="catalog-back" onClick={() => setCatalogItem(null)}>
                <BsChevronLeft
                    onClick={() => setCatalogItem(null)}
                    className="chevron-icon-catalog"
                />{' '}
                Back to Catalog
            </p>
            <div className="col-12 d-flex m-0">
                <div className=" main-img-catalog-container ">
                    <img src={avatar2} alt="img of light" />
                </div>
                <div className="main-right-tab-container">
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
