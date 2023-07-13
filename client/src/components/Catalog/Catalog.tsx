import React, { FC, useState } from 'react';

import Cards from './Cards';
import { useAppDispatch } from '../../app/hooks';
import { filterCatalogItems } from '../../redux/actions/lightActions';
import DesignStyles from './DesignStyles/DesignStyles';
import SingleView from './SingleView';
import { UsePackage } from 'app/constants';

import './style/catalog.scss';

const usePackageImages: Record<string, string> = { 
    BRIDES_ROOM: '/pexels-kseniia-lopyreva-4959835.jpg', 
    CELESTIAL_ROOM: '/celestial-room.jpeg', 
    BAPTISTRY: '/baptistry.jpeg', 
    HALLWAY: '/hallway.jpeg', 
    FOYER: '/reception.jpeg', 
    BALLROOM: '/stairway.jpeg',
};

const Catalog: FC = () => {
    const [catalogItem, setCatalogItem] = useState(null);
    const [catalogType, setCatalogType] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [renderPage, setRenderPage] = useState('');
    const dispatch = useAppDispatch();

    const fetchData1 = async (e: any) => {
        dispatch(
            filterCatalogItems({
                usePackages: [e.currentTarget.value],
            })
        );
    };

    const usePackages = Object.keys(UsePackage).map((packageItem: string, index) => {
        const usePackage = UsePackage[packageItem];
        const image = usePackageImages[packageItem];

        return (
            <div className="use-package-container" key={index}>
                <button
                    key={usePackage}
                    style={{
                        backgroundImage: `url(/images${image})`,
                        backgroundPosition: 'top',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        cursor: 'pointer',
                    }}
                    className="use-package-image"
                    value={usePackage}
                    onClick={(e) => {
                        fetchData1(e);
                        setCatalogType(usePackage);
                        setRenderPage('usePackages');
                    }}
                ></button>

                <p style={{ fontSize: '14px' }}>{usePackage}</p>
            </div>
        );
    });

    return (
        <>
            {catalogItem === null ? (
                <>
                    <div className="catalog-container">
                        <div className="catalog-main-container">
                            <DesignStyles
                                catalogType={catalogType}
                                setCatalogType={setCatalogType}
                                setRenderPage={setRenderPage}
                                renderPage={renderPage}
                            />

                            <div className="catalog-use-packages">
                                <span>Use Packages</span>
                                <div className="catalog-use-packages-buttons">
                                    {usePackages}
                                </div>
                            </div>

                            <Cards
                                currentPage={currentPage}
                                setCurrentPage={setCurrentPage}
                                catalogItem={catalogItem}
                                setCatalogItem={setCatalogItem}
                                catalogType={catalogType}
                                setRenderPage={setRenderPage}
                                renderPage={renderPage}
                            />
                        </div>
                    </div>
                </>
            ) : (
                <div className="d-flex col-12">
                    <SingleView
                        catalogItem={catalogItem}
                        setCatalogItem={setCatalogItem}
                    />
                </div>
            )}
        </>
    );
};

export default Catalog;
