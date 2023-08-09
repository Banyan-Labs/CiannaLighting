import React, { FC } from 'react';

import { useAppSelector } from '../../app/hooks';

import './style/catalog.scss';
import '../Dashboard/DashboardPageLower/style/dashboardNav.scss';

interface catalogProps {
    catalogItem: any;
    setCatalogItem: any;
    catalogType: any;
    currentPage: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
    setRenderPage: any;
    renderPage: any;
    resultsRef: any;
}

const Cards: FC<catalogProps> = ({
    setCatalogItem,
    catalogType,
    setRenderPage,
    renderPage,
    resultsRef,
}) => {
    const { setAllCatalog } = useAppSelector(({ project }) => project);
    const designsFound: any = [];
    const reduxData = setAllCatalog?.slice();

    const useDesigns = reduxData?.map((design, index) => {
        const allReceived =
            renderPage === 'designStyle'
                ? design?.designStyle.map((type: any) => {
                    if (!designsFound.includes(type)) {
                        designsFound.push(type);
                    }
                })
                : design?.usePackages.map((type: any) => {
                    if (!designsFound.includes(type)) {
                        designsFound.push(type);
                    }
                });

        if (renderPage === '') {
            return setRenderPage('');
        } else {
            allReceived;
        }

        return (
            <div
                className="filter-catalog-container"
                key={index}
                onClick={() => {
                    setCatalogItem(design);
                }}
            >
                <div className="catalog-item d-flex row align-items-center m-0 item-cards">
                    <div className="align-items-center d-flex image-container">
                        <img className="m-0 p-0" src={design.images[0]} />
                    </div>
                    <div className="item-bottom-sections">
                        <h4 className="">
                            <span>{design.item_ID}</span>
                            <br />
                            {!design.isActive && (
                                <span>inactive</span>
                            )}
                        </h4>
                    </div>
                </div>
            </div>
        );
    });

    return (
        <>
            {renderPage !== '' && setAllCatalog.length > 0 ? (
                <>
                    <div ref={resultsRef} className="main-catalog-filter-container d-flex m-0">
                        <div className="col-12 d-flex row m-0 p-0">
                            <h4 className="d-flex justify-content-center">
                                <b>{catalogType}</b>&nbsp;catalog items
                            </h4>
                            <div className="all-pulled-types d-flex col-12 justify-content-evenly m-0 p-0">
                                <div className="d-flex justify-content-center row col-10 col-lg-11 col-xl-12 m-0 p-0 cards-container">
                                    {useDesigns.map(
                                        (item: any, index: number) => {
                                            return (
                                                <div
                                                    key={index}
                                                    className="d-flex col-12 col-lg-6 col-xl-3 justify-content-center m-0 p-0 img-card"
                                                >
                                                    {item}
                                                </div>
                                            );
                                        }
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : catalogType && (
                <div ref={resultsRef} className="main-catalog-filter-container d-flex m-0">
                    <div className="col-12 d-flex row m-0 p-0">
                        <h4 className="d-flex justify-content-center">
                            No&nbsp;<b>{catalogType}</b>&nbsp;catalog items found.
                        </h4>
                    </div>
                </div>
            )}
        </>
    );
};

export default Cards;
