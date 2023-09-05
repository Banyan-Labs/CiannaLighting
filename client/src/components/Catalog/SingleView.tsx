import React, { FC } from 'react';
import { BsChevronLeft } from 'react-icons/bs';
import { useAppDispatch } from '../../app/hooks';

import Tabs from './Tabs/Tabs';
import LightCarousel from 'components/Rooms/LightSide/LightImageCarousel';

import './style/catalog.scss';
import { filterCatalogItems } from 'redux/actions/lightActions';

interface catalogPros {
    catalogItem: any;
    setCatalogItem: any;
    showBack: boolean;
    projectView?: boolean;
}

const SingleView: FC<catalogPros> = ({
    catalogItem,
    setCatalogItem,
    showBack,
    projectView,
}) => {
    const dispatch = useAppDispatch();

    const backButton = () => {
        setCatalogItem(null);
        dispatch(filterCatalogItems({}));
    };

    return (
        <div className="col-12">
            {showBack && (
                <p
                    className="catalog-back"
                    onClick={() => backButton()}
                >
                    <BsChevronLeft
                        onClick={() => backButton()}
                        className="chevron-icon-catalog"
                    />{' '}
                    Back to Catalog
                </p>
            )}
            <div className="d-flex m-0 p-2 row justify-content-center">
                <div className={projectView ? 'main-img-catalog-container-project-view col-12 col-lg-8 col-xl-4' : 'main-img-catalog-container col-12 col-lg-8 col-xl-4'}>
                    {!catalogItem.isActive && (
                        <span>*** This Light is Currently Unavailable ***</span>
                    )}
                    <LightCarousel
                        images={catalogItem.images?.map((img: string) => ({
                            url: img,
                        }))}
                    />
                </div>
                <div className="main-right-tab-container col-12 col-xl-7">
                    <Tabs
                        catalogItem={catalogItem}
                        setCatalogItem={setCatalogItem}
                    />
                </div>
            </div>
        </div>
    );
};

export default SingleView;
