import React, { FC, useState, useRef } from 'react';

import Cards from './Cards';
import { useAppDispatch } from '../../app/hooks';
import { filterCatalogItems } from '../../redux/actions/lightActions';
import DesignStyles from './DesignStyles/DesignStyles';
import SingleView from './SingleView';
import { UsePackage } from 'app/constants';

import './style/catalog.scss';

const usePackageImages: Record<string, string> = { 
    LOBBY: '/pexels-kseniia-lopyreva-4959835.jpg', 
    LOBBY_ALTERNATE: '/stairway.jpeg', 
    BAPTISTRY: '/baptistry.jpeg', 
    ENDOWMENT: '/hallway.jpeg', 
    SEALING: '/reception.jpeg', 
    CELESTIAL: '/celestial-room.jpeg',
    GENERAL: '/reception.jpeg', 
    VEIL_CORRIDOR: '/celestial-room.jpeg',
};

const Catalog: FC = () => {
    const ref = useRef<null | HTMLDivElement>(null);
    const [catalogItem, setCatalogItem] = useState(null);
    const [catalogType, setCatalogType] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [renderPage, setRenderPage] = useState('');
    const dispatch = useAppDispatch();

    const fetchData1 = async (e: any) => {
        await dispatch(
            filterCatalogItems({
                usePackages: [e.currentTarget.value],
            })
        );

        ref.current?.scrollIntoView({ behavior: 'smooth' });
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
                                resultsRef={ref}
                                catalogType={catalogType}
                                setCatalogType={setCatalogType}
                                setRenderPage={setRenderPage}
                                renderPage={renderPage}
                            />

                            <div className="catalog-use-packages">
                                <span>Use Packages</span>
                                <div className="catalog-use-packages-buttons flex-wrap justify-content-between mx-auto mt-5">
                                    {usePackages}
                                </div>
                            </div>

                            <Cards
                                resultsRef={ref}
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
